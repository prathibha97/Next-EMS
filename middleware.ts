import { withAuth } from 'next-auth/middleware';

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      const { pathname } = req.nextUrl;
      // `/admin` requires admin role
      if (pathname === '/dashboard') {
        return token?.role === 'ADMIN';
      }
      if (pathname.startsWith('/accounts')) {
        return token?.role === 'ADMIN';
      }
      if (pathname.startsWith('/organization')) {
        return token?.role === 'ADMIN';
      }
      if (pathname.startsWith('/projects')) {
        return token?.role === 'ADMIN';
      }
      if (pathname.startsWith('/clients')) {
        return token?.role === 'ADMIN';
      }
      // other routes only requires the user to be logged in
      return !!token;
    },
  },
});

export const config = {
  matcher: [
    '/dashboard',
    '/profile',
    '/leaves',
    '/attendance',
    '/tasks',
    '/settings',
    '/meetings',
    '/organization/:path*',
    '/projects/:path*',
    '/clients/:path*',
    '/accounts/:path*',
  ],
};
