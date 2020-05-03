import * as express from 'express';
import * as compression from 'compression';

const app = express();

app.use(compression());

app.use('/', express.static('./src/app'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}`));