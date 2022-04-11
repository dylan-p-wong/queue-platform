const jwt = require('jsonwebtoken');

const verifyQueue = (queue_id) => {
  return async (req, res, next) => {
    console.log(req.headers['test'])
    try {
      console.log(req.cookies['queue-token'])
      if (!req.cookies['queue-token']) {
        return res.redirect(`http://localhost:8080/queue/test`);
      }
      
      const decoded = await jwt.verify(req.cookies['queue-token'], process.env.QUEUE_SECRET);
  
      console.log(decoded)
  
      if (decoded === false) {
        return res.redirect(`http://localhost:3002/queue/${queue_id}?redirect=${req.get('Referrer')}`);
      }
    
      next();
    } catch (e) {
      console.log(e)
      next()
    }
  }
}

module.exports = {
  verifyQueue
}
