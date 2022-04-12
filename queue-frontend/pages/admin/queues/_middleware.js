import { NextResponse } from "next/server"

export async function middleware(req, ev) {

  if (req.cookies[`authorization`]) {
    const headers = {};
    headers["authorization"] = req.cookies[`authorization`];

    try {
      const response = await fetch('http://localhost:8080/auth', { credentials: 'include', headers });
      const data = await response.json();
    } catch (e) {
      return NextResponse.redirect("http://localhost:3001/auth/register");
    }
  } else {
    return NextResponse.redirect("http://localhost:3001/auth/register");
  }

  return NextResponse.next();
}