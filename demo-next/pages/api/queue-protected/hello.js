import { withQueueProtection } from "../../../middleware/withQueueProtection";

function handler(req, res) {
  res.status(200).json({ name: 'John Doe' });
}

export default withQueueProtection(handler, process.env.QUEUE_ID);
 