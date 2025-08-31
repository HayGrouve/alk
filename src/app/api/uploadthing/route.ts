import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  // Optional: Add configuration for CORS, etc.
  config: {
    // Add any additional configuration here if needed
  },
});
