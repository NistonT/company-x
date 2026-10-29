import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import "./index.css";
import { HeaderLayout } from "./layout";
import { MotionProvider, RouterProvider, StoreProvider } from "./providers";
import { Router } from "./router.tsx";

createRoot(document.getElementById("root")!).render(
  // Provider
  <RouterProvider>
    <StoreProvider>
      <MotionProvider>
        {/* Layout */}
        <HeaderLayout>
          {/* Blocks */}
          <Router />
          <Toaster position="bottom-right" richColors />
        </HeaderLayout>
      </MotionProvider>
    </StoreProvider>
  </RouterProvider>,
);
