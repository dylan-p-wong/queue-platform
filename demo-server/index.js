const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { verifyQueue } = require('./middleware/queue');

require('dotenv').config();
app.set('trust proxy', 1);
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
app.use(morgan('dev'));
app.use(cookieParser());

app.get('/', verifyQueue('18623ecc-b2f6-11ec-917c-e0d55e84e4a9'), (req, res) => {


  res.status(200).json({ success: true });
})

app.listen(process.env.PORT || 8081, '0.0.0.0', () => {
  console.log(`Listening on port ${process.env.PORT || 8081}`);
});
