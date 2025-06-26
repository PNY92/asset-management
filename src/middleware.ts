
import { createClient } from "@/lib/supabase/middleware";
import { NextRequest, NextResponse } from "next/server";


export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname == "/login") {
      return;
    }
    const {supabase, response} = await createClient(request);

    const {
        data: {user}
    } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    return response;

}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};