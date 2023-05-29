import next from 'next';
import bodyParser from 'body-parser';
import express from 'express';

import graphqlProxyMiddleware from './server/middlewares/graphql';

import { DEV, GRAPHQL_APP_URL, PORT } from './config/vars';

// Create body-parser json middleware
const bodyParserJSON = bodyParser.json();
// Create the Express-Next App
const app = next({ dev: DEV });
const handle = app.getRequestHandler();

// Start the app
app
  .prepare()
  // Start Express server and serve the
  .then(() => {
    express()
      // use proxy middleware to send graphql requests to api server
      .use(GRAPHQL_APP_URL, bodyParserJSON, graphqlProxyMiddleware)
      .use((req, res, cb) => {
        const schema = req.headers['x-forwarded-proto'];
        if (req.headers.host && req.headers.host.indexOf('localhost') < 0 && schema !== 'https') {
          res.redirect(`https://${req.headers.host}${req.url}`);
        } else {
          cb();
        }
      })
      .use((req, res) => {
        return handle(req, res);
      })
      .listen(PORT, (error?: Error) => {
        if (error) throw error;
        // eslint-disable-next-line no-console
        console.log(`> Ready on http://localhost:${PORT}`);
      });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
