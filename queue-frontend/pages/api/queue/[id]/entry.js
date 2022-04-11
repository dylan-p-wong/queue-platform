export default async function handler(req, res) {
  const { id } = req.query;

  const headers = {};

  if (req.cookies[`queue-token-${id}`]) {
    headers["Cookie"] = `queue-token-${id}=${req.cookies[`queue-token-${id}`]}`;
  }

  try {
    const response = await fetch(`http://localhost:8080/queue/${id}/entry`, {
      credentials: "include",
      headers,
    });
    const data = await response.json();

    if (response.headers.get('set-cookie')) {
      res.setHeader('Set-Cookie', response.headers.get('set-cookie'));
    }

    res.json(data);
  } catch (e) {
    res.status(500).json({ e });
  }
}
