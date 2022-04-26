import { NextResponse } from "next/server"

export async function middleware(req, ev) {

  if (req.cookies[`authorization`]) {
    const headers = {};
    headers["authorization"] = req.cookies[`authorization`];

    try {
      const response = await fetch(`${process.env.QUEUE_API_URL}/user`, { credentials: 'include', headers });
      const data = await response.json();
    } catch (e) {
      return NextResponse.redirect(`${process.env.BASE_URL}/auth/register`);
    }
  } else {
    return NextResponse.redirect(`${process.env.BASE_URL}/auth/register`);
  }

  return NextResponse.next();
}
