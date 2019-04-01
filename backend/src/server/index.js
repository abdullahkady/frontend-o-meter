const app = require('express')();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

app.post('/', async (req, res) => {
  const { dirPath } = req.body;
  res.status(200).json({});
});

// General error handler
// eslint-disable-next-line
app.use((err, req, res, next) => {
  // If the error has no values, put in default values
  err.status = err.status || 400;
  err.message = err.message || 'Something went wrong';
  return res.status(err.status).json({ message: err.message });
});

// Catch all invalid routes
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found !' });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
