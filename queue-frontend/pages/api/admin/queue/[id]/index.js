
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;
  
    try {
      const response = await fetch(`http://localhost:8080/admin/queue/${id}`, {
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
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
  
    try {
      const response = await fetch(`http://localhost:8080/admin/queue/${id}`, {
        credentials: "include",
        headers: {
          authorization: req.cookies[`authorization`]
        },
        method: 'DELETE'
      });
      const data = await response.json();
      res.json(data);
    } catch (e) {
      console.log(e)
      res.status(500).json({ e });
    }
  }
}
