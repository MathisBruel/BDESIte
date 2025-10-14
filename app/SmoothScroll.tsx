"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { smoothScrollToElementById, animateScrollToY } from "@/lib/utils";

export default function SmoothScroll() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const offset = 80;

    const scrollToId = (id: string | null) => {
      if (!id) {
        void animateScrollToY(0, 600);
        return;
      }
      smoothScrollToElementById(id, offset, 600);
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      const anchor = target.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || !href.includes("#")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      const hash = url.hash.replace(/^#/, "");
      e.preventDefault();
      if (url.pathname !== pathname) {
        router.push(`${url.pathname}#${hash}`);
        setTimeout(() => scrollToId(hash), 100);
      } else {
        scrollToId(hash);
      }
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true } as any);
  }, [router, pathname]);

  return null;
}


