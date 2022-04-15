
export default async function handler(req, res) {
  try {
    const response = await fetch(`${process.env.QUEUE_API_URL}/user`, {
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
}
