import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value || "";

  // console.log("token in middleware : ", token);

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/orders", "/profile", "/adminDashboard"],
};
