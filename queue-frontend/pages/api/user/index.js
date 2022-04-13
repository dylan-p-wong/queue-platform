
export default async function handler(req, res) {
  try {
    const response = await fetch(`http://localhost:8080/user`, {
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
