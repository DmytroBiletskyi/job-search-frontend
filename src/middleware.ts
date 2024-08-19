import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from "jwt-decode";


export function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;

    if (!token) {
        console.log('token not found');
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        const decodedToken = jwtDecode<{ exp: number }>(token);

        if (decodedToken.exp * 1000 < Date.now()) {
            console.log('token expired');
            const response = NextResponse.redirect(new URL('/login', req.url));
            response.cookies.delete('token');
            response.cookies.delete('profile')
            return response
        }
    } catch (err) {
        console.log(err);
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}
export const config = {
    matcher: ['/liked', '/profile'],
};
