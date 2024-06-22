import { next } from "@vercel/edge";

export const config = {
  matcher: ["/admin/:path*"],
};

const BASIC_AUTH_ID = process.env.BASIC_AUTH_ID;
const BASIC_AUTH_PASSWORD = process.env.BASIC_AUTH_PASSWORD;

export default function middleware(request: Request) {
  const authorizationHeader = request.headers.get("authorization");

  if (authorizationHeader) {
    const basicAuth = authorizationHeader.split(" ")[1];
    const [user, password] = atob(basicAuth).toString().split(":");
    if (user === BASIC_AUTH_ID && password === BASIC_AUTH_PASSWORD) {
      return next();
    }
  }

  return new Response("Basic Auth required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}
