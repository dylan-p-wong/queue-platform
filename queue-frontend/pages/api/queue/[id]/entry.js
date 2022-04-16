export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const headers = {};

    if (req.cookies[`queue-token-${id}`]) {
      headers["Cookie"] = `queue-token-${id}=${req.cookies[`queue-token-${id}`]}`;
    }

    const response = await fetch(`${process.env.QUEUE_API_URL}/queue/${id}/entry`, {
      credentials: "include",
      headers,
      method: 'POST',
      body: req.body
    });
    const data = await response.json();

    if (response.headers.get('set-cookie')) {
      res.setHeader('Set-Cookie', response.headers.get('set-cookie'));
    }

    res.json(data);
  } catch (e) {
    console.log(e)
    res.status(500).json({ e });
  }
}
