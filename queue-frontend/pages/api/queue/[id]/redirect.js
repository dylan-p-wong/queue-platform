export default async function handler(req, res) {
  const { id } = req.query;
  try {
    const response = await fetch(`http://localhost:8080/queue/${id}/entry`, {
      credentials: "include",
      headers: {
        'Cookie': `queue-token-${id}=${req.cookies[`queue-token-${id}`]}`
      }
    });
    const data = await response.json();
    
    if (data.status === "PASSED") {
      res.setHeader('Set-Cookie', `queue-token-${id}=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`);
      return res.redirect(`http://localhost:3002?redirect-token=${data.redirect_token}`);
    }

    res.json(data);
  } catch (e) {
    res.status(500).json({e});
  }
}
