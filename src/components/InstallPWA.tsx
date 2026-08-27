"use client";

import { useEffect, useState } from "react";

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    await deferredPrompt.userChoice;

    setDeferredPrompt(null);
  };

  if (!deferredPrompt) return null;

  return (
    <button
      onClick={installApp}
      className="rounded-xl bg-[#0f6e56] px-4 py-2 text-white"
    >
      Install TravelBuddy
    </button>
  );
}