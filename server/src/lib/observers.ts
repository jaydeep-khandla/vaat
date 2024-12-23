import * as mediasoup from "mediasoup";
import Logger from "../utils/logger";
import {
  Consumer,
  DataConsumer,
  DataProducer,
  DtlsState,
  Producer,
  Router,
  Transport,
  WebRtcServer,
  WebRtcTransport,
  Worker,
} from "mediasoup/node/lib/types";

const logger = new Logger("observer");

function runMediasoupObserver() {
  mediasoup.observer.on("newworker", workerEvent); // Event function for new worker
}

function workerEvent(worker: Worker) {
  (global as any).worker = worker; // TO-DO: Find a better way to do this

  logger.info("New worker created [pid:%d]", worker.pid);

  worker.on("died", () => {
    logger.error("Worker died [pid:%d]", worker.pid);
  });

  worker.observer.on("close", () => {
    logger.error("Worker closed [pid:%d]", worker.pid);
  });

  worker.observer.on("newwebrtcserver", webRtcServerEvents); // Event function for new WebRtcServer

  worker.observer.on("newrouter", routerEvents); // Event function for new Router
}

function webRtcServerEvents(webRtcServer: WebRtcServer) {
  logger.info("New WebRtcServer created [webRtcServerId:%s]", webRtcServer.id);

  webRtcServer.observer.on("close", () => {
    logger.error("WebRtcServer closed [webRtcServerId:%s]", webRtcServer.id);
  });
}

function routerEvents(router: Router) {
  logger.info("New router created [routerId:%s]", router.id);

  router.observer.on("close", () => {
    logger.error("Router closed [routerId:%s]", router.id);
  });

  router.observer.on("newtransport", transportEvents); // Event function for new Transport
}

function transportEvents(transport: WebRtcTransport) {
  logger.info("New transport created [transportId:%s]", transport.id);

  transport.on("dtlsstatechange", (state: DtlsState) =>
    dtlsStateChnageEvent(state, transport)
  ); // Event function for dtls state change

  transport.observer.on("newproducer", producerEvents); // Event function for new Producer
  transport.observer.on("newconsumer", consumerEvents); // Event function for new Consumer
  transport.observer.on("newdataproducer", dataProducerEvents); // Event function for new DataProducer
  transport.observer.on("newdataconsumer", dataConsumerEvents); // Event function for new DataConsumer

  transport.observer.on("close", () => {
    logger.error("Transport closed [transportId:%s]", transport.id);
  });
}

function dtlsStateChnageEvent(
  state: DtlsState,
  transport: WebRtcTransport & Transport
) {
  logger.info("DTLS state changed [state:%s]", state);
  if (state === "failed") {
    logger.error("DTLS failed");
    transport.close();
  } else if (state === "closed") {
    logger.info("DTLS closed");
    transport.close();
  }
}

function producerEvents(producer: Producer) {
  logger.info("New producer created [producerId:%s]", producer.id);

  producer.observer.on("close", () => {
    logger.error("Producer closed [producerId:%s]", producer.id);
  });
}

function consumerEvents(consumer: Consumer) {
  logger.info("New consumer created [consumerId:%s]", consumer.id);

  consumer.observer.on("close", () => {
    logger.error("Consumer closed [consumerId:%s]", consumer.id);
  });
}

function dataProducerEvents(dataProducer: DataProducer) {
  logger.info("New dataProducer created [dataProducerId:%s]", dataProducer.id);

  dataProducer.observer.on("close", () => {
    logger.error("DataProducer closed [dataProducerId:%s]", dataProducer.id);
  });
}

function dataConsumerEvents(dataConsumer: DataConsumer) {
  logger.info("New dataConsumer created [dataConsumerId:%s]", dataConsumer.id);

  dataConsumer.observer.on("close", () => {
    logger.error("DataConsumer closed [dataConsumerId:%s]", dataConsumer.id);
  });
}

export { runMediasoupObserver };
