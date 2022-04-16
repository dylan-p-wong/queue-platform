import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  try {
    const token = req.headers['redirect-token'];

    if (token) {
      const decoded = await jwt.verify(token, process.env.QUEUE_SECRET);
      
      res.setHeader('Set-Cookie', serialize(`redirect-token-${decoded['queue_id']}`, req.headers['redirect-token'], { 
        maxAge: decoded['exp'] - decoded['iat']
      }));
    }
  } catch (e) {
    console.log(e);
  }
  res.redirect(req.headers['referer'].split('?')[0]);  
}
