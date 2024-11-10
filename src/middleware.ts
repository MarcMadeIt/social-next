
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/settings(.*)", "/"]);

export default clerkMiddleware((auth, req) => {
  console.log("Middleware running for route:", req.url);
  
  if (isProtectedRoute(req)) {
    console.log("Protected route accessed:", req.url);
    try {
      auth().protect();
    } catch (err) {
      console.error("Error protecting route:", req.url, err);
    }
  }
});


export const config = {
  matcher: ["/((?!.*\\..*|_next|api|trpc).*)", "/", "/(api|trpc)(.*)"],
};
