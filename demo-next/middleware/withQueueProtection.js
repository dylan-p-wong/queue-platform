import jwt from 'jsonwebtoken';

export const withQueueProtection = (handler, queueId) => {
  return async (req, res) => {
    if (!req.cookies['redirect-token']) {
      return res.redirect(`http://localhost:3001/queues/${queueId}`);
    }

    try {
      const decoded = await jwt.verify(req.cookies['redirect-token'], process.env.QUEUE_SECRET);
      
      if (decoded['queue_id'] !== queueId) {
        throw new Error("Invalid token.");
      }

    } catch(err) {
      return res.redirect(`http://localhost:3001/queues/${queueId}`);
    }

    return handler(req, res);
  };
};
