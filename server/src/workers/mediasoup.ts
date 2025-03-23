import * as mediasoup from 'mediasoup';
import { mediasoupConfig } from '../config';
import Logger from '../utils/logger';
import { runMediasoupObserver } from '../lib/observers';

const logger = new Logger('mediasoup');

async function initializeWorker() {
  runMediasoupObserver(); // Run the mediasoup-observer before creating the Worker

  const worker = await mediasoup.createWorker(mediasoupConfig.worker);

  return worker;
}

initializeWorker().catch((error) => {
  logger.error('Failed to initialize worker: ', error);
});

// export default initializeWorker;
