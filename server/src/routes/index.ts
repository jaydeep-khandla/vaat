import { app } from '../app';
import routes from './v1';

(function createRoutes() {
  app.route('/').get((_req: any, res: any) => {
    res.sendResponse(true, 'Ahh...! We got You...', 200, null);
  });

  // Use routes
  app.use('/api/v1/', routes);
})();
