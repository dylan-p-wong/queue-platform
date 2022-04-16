import jwt from 'jsonwebtoken';

export const withQueueProtection = (handler, queueId) => {
  return async (req, res) => {
    try {

      if (!req.cookies[`redirect-token-${queueId}`]) {
        return res.redirect(`${process.env.QUEUE_BASE_URL}/queues/${queueId}`);
      }

      const decoded = await jwt.verify(req.cookies[`redirect-token-${queueId}`], process.env.QUEUE_SECRET);
      if (decoded['queue_id'] !== queueId) {
        throw new Error("Invalid token.");
      }

    } catch(err) {
      console.log(err)
      return res.redirect(`${process.env.QUEUE_BASE_URL}/queues/${queueId}`);
    }

    return handler(req, res);
  };
};
