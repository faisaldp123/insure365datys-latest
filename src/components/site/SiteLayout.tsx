import { lazy, Suspense, useEffect, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";

const ConsultationModal = lazy(() =>
  import("./ConsultationModal").then((m) => ({ default: m.ConsultationModal }))
);
const Toaster = lazy(() =>
  import("@/components/ui/sonner").then((m) => ({ default: m.Toaster }))
);

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [deferred, setDeferred] = useState(false);

  // Preload all sibling routes after first paint so in-app navigation is instant.
  useEffect(() => {
    const idle =
      (window as any).requestIdleCallback ||
      ((cb: () => void) => setTimeout(cb, 200));
    const handle = idle(() => {
      setDeferred(true);
      const paths = ["/", "/about", "/contact"] as const;
      paths.forEach((p) => router.preloadRoute({ to: p }).catch(() => {}));
      (["general", "motor", "health", "life"] as const).forEach((type) =>
        router
          .preloadRoute({ to: "/services/$type", params: { type } })
          .catch(() => {})
      );
    });
    return () => {
      if ((window as any).cancelIdleCallback)
        (window as any).cancelIdleCallback(handle);
    };
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      {deferred && (
        <Suspense fallback={null}>
          <ConsultationModal />
          <Toaster />
        </Suspense>
      )}
    </div>
  );
}