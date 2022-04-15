
export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const response = await fetch(`${process.env.QUEUE_API_URL}/admin/queue/${id}/stop`, {
      credentials: "include",
      headers: {
        authorization: req.cookies[`authorization`]
      },
      method: 'POST'
    });
    const data = await response.json();
    res.json(data);
  } catch (e) {
    console.log(e)
    res.status(500).json({ e });
  }
}
