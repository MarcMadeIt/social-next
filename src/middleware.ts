import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/settings(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  if (isProtectedRoute(req)) {
 
    if (!userId) {
      return redirectToSignIn({
        returnBackUrl: req.url, 
      });
    }


    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!.*\\..*|_next|api|trpc).*)',  
    '/(api|trpc)(.*)', 
  ],
};
