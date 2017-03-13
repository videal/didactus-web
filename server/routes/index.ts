import { Router, Response, Request } from 'express';
import * as AggrigatorJobs from '../modules/aggrigator-jobs';
import * as AggrigatorEmails from '../modules/aggrigator-emails';
const model = require('nodejs-angelco-database');

const router: Router = Router();
router.post('/start', (request: Request, response: Response) => {
  let filters = request.body.filters;
  model.downloadTask.Save({
    filters: filters
  })
    .then(result => {
      response.json(result._id);
    });
});

router.get('/count', (request: Request, response: Response) => {
  model.company.Count()
    .then(result => {
      response.json({
        count: result
      });
    });
});

router.get('/task/:id', (request: Request, response: Response) => {
  let id = request.params.id;
  model.taskCompany.GetCountsById(id)
    .then(result => {
      let now = result.withCompanyId;
      let percent = 0;
      if (result.all !== 0) {
        percent = (now * 100) / result.all;
      }
      response.json({
        count: result,
        // tslint:disable-next-line:no-bitwise
        percent: ~~percent,
        id: id
      });
    });
});

router.get('/report/:id', (request, response) => {
  let id = request.params.id;
  model.taskCompany.GetIds(id)
    .then(result => {
      return model.company.GetCompaniesByArray(result);
    })
    .then(result => {
      return AggrigatorEmails.default(result);
    })
    .then(result => {
      response.json(result);
    })
    .catch(error => {
      response.status(402).json({ error: error });
    });
});


export { router };
