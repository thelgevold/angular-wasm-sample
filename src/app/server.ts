import * as express from 'express';
import * as compression from 'compression';

const app = express();

app.use(compression());

app.use('/', express.static('./src/app'));

app.get('/cars', async (req, res) => {
  res.json(['BMW', 'Ferrari']);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));