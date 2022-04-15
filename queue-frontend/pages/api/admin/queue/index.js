
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const response = await fetch(`${process.env.QUEUE_API_URL}/admin/queue/`, {
        credentials: "include",
        headers: {
          authorization: req.cookies[`authorization`]
        }
      });
      const data = await response.json();
      res.json(data);
    } catch (e) {
      console.log(e)
      res.status(500).json({ e });
    }
  } else if (req.method === 'POST') {
    try {
      const response = await fetch(`${process.env.QUEUE_API_URL}/admin/queue/`, {
        credentials: "include",
        method: 'POST',
        body: req.body,
        headers: {
          authorization: req.cookies[`authorization`]
        },
        'Content-Type': 'application/json'
      });
      const data = await response.json();
      
      if (!data.id) {
        throw new Error(data.error)
      }

      res.redirect(`/admin/queues/${data.id}`);
    } catch (e) {
      console.log(e)
      res.status(500).json({ e });
    }
  }
}
