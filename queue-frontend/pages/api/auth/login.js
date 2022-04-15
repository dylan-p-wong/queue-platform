import { serialize } from 'cookie';

export default async function handler(req, res) {
  try {
    const response = await fetch(`${process.env.QUEUE_API_URL}/auth/login`, {
      credentials: "include",
      method: 'POST',
      body: req.body,
      'Content-Type': 'application/json'
    });
    const data = await response.json();

    if (data['token']) {
      res.setHeader('Set-Cookie', serialize('authorization',  data['token'], { path: '/' }));
    }

    res.redirect('/admin');
  } catch (e) {
    console.log(e)
    res.status(500).json({ e });
  }
}
