import { serialize } from 'cookie';

export default function handler(req, res) {
  res.setHeader('Set-Cookie', serialize('redirect-token', req.headers['redirect-token'], { path: '/' }));
  res.redirect(req.headers['referer'].split('?')[0]);
}
