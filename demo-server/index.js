const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { verifyQueue } = require('./middleware/queue');

app.use(cors({
  origin: "http://localhost:3001",
  credentials: true
}));
app.use(morgan('dev'));
app.use(cookieParser());

app.get('/', verifyQueue('18623ecc-b2f6-11ec-917c-e0d55e84e4a9'), (req, res) => {



  res.status(200).json({ success: true });
})

app.listen(process.env.PORT || 4444, () => {
  console.log('Listening on port 4444');
});