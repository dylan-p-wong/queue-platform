export default async function handler(req, res) {
  const { id } = req.query;
  try {
    const response = await fetch(`${process.env.QUEUE_API_URL}/queue/${id}/entry`, {
      credentials: "include",
      headers: {
        'Cookie': `queue-token-${id}=${req.cookies[`queue-token-${id}`]}`
      },
      method: 'POST',
      body: req.body
    });
    const data = await response.json();
    
    if (data.status === "PASSED") {
      res.setHeader('Set-Cookie', `queue-token-${id}=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`);
      return res.redirect(`${data.redirect}?redirect-token=${data.redirect_token}`);
    }

    res.json(data);
  } catch (e) {
    res.status(500).json({e});
  }
}
