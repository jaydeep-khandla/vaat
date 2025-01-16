import * as mediasoup from 'mediasoup';
import Logger from '../utils/logger';
import {
  ActiveSpeakerObserver,
  AudioLevelObserver,
  Consumer,
  DataConsumer,
  DataProducer,
  DtlsState,
  Producer,
  Router,
  RtpObserver,
  RtpObserverType,
  WebRtcServer,
  WebRtcTransport,
  Worker,
} from 'mediasoup/node/lib/types';
import { mediasoupConfig } from '../config';
// import { TransportObj } from "../types/mediasoup";

const logger = new Logger('mediasoup-observer');

const webRtcServers = new Map<string, WebRtcServer>();
const routers = new Map<string, Router>();
const audioLevelObservers = new Map<string, AudioLevelObserver>();
const activeSpeakerObservers = new Map<string, ActiveSpeakerObserver>();
const transports = new Map<string, WebRtcTransport>();
const producers = new Map<string, Producer[]>();
const consumers = new Map<string, Consumer[]>();
const dataProducers = new Map<string, DataProducer[]>();
const dataConsumers = new Map<string, DataConsumer[]>();

// Set global variables
global.webRtcServers = webRtcServers;
global.routers = routers;
global.audioLevelObservers = audioLevelObservers;
global.activeSpeakerObservers = activeSpeakerObservers;
global.transports = transports;
global.producers = producers;
global.consumers = consumers;
global.dataProducers = dataProducers;
global.dataConsumers = dataConsumers;

function runMediasoupObserver() {
  mediasoup.observer.on('newworker', workerEvent); // Event function for new [worker]
}

async function workerEvent(worker: Worker) {
  global.worker = worker; // TO-DO: Find a better way to do this

  logger.info('New worker created [pid:%d]', worker.pid);

  worker.on('died', function onWorkerDied() {
    logger.error('Worker died [pid:%d]', worker.pid);
  });

  worker.observer.on('close', function onWorkerClose() {
    logger.error('Worker closed [pid:%d]', worker.pid);

    process.exit(1);
  });

  worker.observer.on('newwebrtcserver', webRtcServerEvents); // Event function for new [WebRtcServer]

  const webRtcServer = await worker.createWebRtcServer(
    mediasoupConfig.webRtcServerOptions
  );

  worker.observer.on('newrouter', routerEvents); // Event function for new Router
}

function webRtcServerEvents(webRtcServer: WebRtcServer) {
  logger.info('New WebRtcServer created [webRtcServerId:%s]', webRtcServer.id);

  webRtcServers.set(webRtcServer.id, webRtcServer);

  worker.appData.webRtcServer = webRtcServer;

  webRtcServer.observer.on('close', function onWebRtcServerClose() {
    logger.error('WebRtcServer closed [webRtcServerId:%s]', webRtcServer.id);
    webRtcServers.delete(webRtcServer.id);
  });
}

async function routerEvents(router: Router) {
  logger.info('New router created [routerId:%s]', router.id);

  routers.set(router.id, router);

  router.observer.on('newrtpobserver', (rtpObserver) =>
    rtpObserverEvents(router.id, rtpObserver)
  ); // Event function for new [RtpObserver]

  router.observer.on('close', function onRouterClose() {
    logger.error('Router closed [routerId:%s]', router.id);

    // Delete router from global
    routers.delete(router.id);

    // Close audioLevelObserver and activeSpeakerObserver
    global.audioLevelObservers.get(router.id).close();
    global.activeSpeakerObservers.get(router.id).close();
  });

  router.observer.on('newtransport', transportEvents); // Event function for new [Transport]
}

async function rtpObserverEvents(routerId: string, rtpObserver: RtpObserver) {
  logger.info(
    'New %sObserver created [rtpObserverId:%s]',
    rtpObserver.type,
    rtpObserver.id
  );

  if (rtpObserver.type === ('audioLevel' as RtpObserverType)) {
    global.audioLevelObservers.set(routerId, rtpObserver as AudioLevelObserver);
  }

  if (rtpObserver.type === ('activeSpeaker' as RtpObserverType)) {
    global.activeSpeakerObservers.set(
      routerId,
      rtpObserver as ActiveSpeakerObserver
    );
  }

  rtpObserver.observer.on('close', function onRtpObserverClose() {
    logger.error('RtpObserver closed [rtpObserverId:%s]', rtpObserver.id);

    if (rtpObserver.type === ('audioLevel' as RtpObserverType)) {
      global.audioLevelObservers.delete(routerId);
    }

    if (rtpObserver.type === ('activeSpeaker' as RtpObserverType)) {
      global.activeSpeakerObservers.delete(routerId);
    }
  });
}

function transportEvents(transport: WebRtcTransport) {
  logger.info('New transport created [transportId:%s]', transport.id);

  transports.set(transport.id, transport);

  transport.on('dtlsstatechange', (state: DtlsState) =>
    dtlsStateChnageEvent(state, transport)
  ); // Event function for dtls state change

  transport.observer.on('newproducer', producerEvents); // Event function for new [Producer]
  transport.observer.on('newconsumer', consumerEvents); // Event function for new [Consumer]
  transport.observer.on('newdataproducer', dataProducerEvents); // Event function for new [DataProducer]
  transport.observer.on('newdataconsumer', dataConsumerEvents); // Event function for new [DataConsumer]

  transport.observer.on('close', function onTransportClose() {
    logger.error('Transport closed [transportId:%s]', transport.id);
    transports.delete(transport.id);
  });
}

function dtlsStateChnageEvent(state: DtlsState, transport: WebRtcTransport) {
  logger.info('DTLS state changed [state:%s]', state);
  if (state === 'failed') {
    logger.error('DTLS failed');
    transport.close();
  } else if (state === 'closed') {
    logger.info('DTLS closed');
    transport.close();
  }
}

function producerEvents(producer: Producer) {
  logger.info('New producer created [producerId:%s]', producer.id);

  producer.observer.on('close', function onProducerClose() {
    logger.error('Producer closed [producerId:%s]', producer.id);
  });
}

function consumerEvents(consumer: Consumer) {
  logger.info('New consumer created [consumerId:%s]', consumer.id);

  consumer.observer.on('close', function onConsumerClose() {
    logger.error('Consumer closed [consumerId:%s]', consumer.id);
  });
}

function dataProducerEvents(dataProducer: DataProducer) {
  logger.info('New dataProducer created [dataProducerId:%s]', dataProducer.id);

  dataProducer.observer.on('close', function onDataProucerClose() {
    logger.error('DataProducer closed [dataProducerId:%s]', dataProducer.id);
  });
}

function dataConsumerEvents(dataConsumer: DataConsumer) {
  logger.info('New dataConsumer created [dataConsumerId:%s]', dataConsumer.id);

  dataConsumer.observer.on('close', function onDataConsumerClose() {
    logger.error('DataConsumer closed [dataConsumerId:%s]', dataConsumer.id);
  });
}

export { runMediasoupObserver };
