import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return await Promise.resolve(
    NextResponse.redirect(new URL("/foo/list", request.nextUrl))
  );
}
