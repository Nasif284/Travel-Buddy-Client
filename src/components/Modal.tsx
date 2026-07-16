"use client";

import { useEffect, ReactNode } from "react";
import { close } from "@/src/assets/icons";

interface ModalLayoutProps {
  isOpen: boolean;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl";
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}

export default function ModalLayout({ isOpen, title, size = "lg", onClose, children, footer }: ModalLayoutProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  const widthMap = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
  };

  return (
    <div
      className="
        fixed inset-0 z-50
        bg-black/40 backdrop-blur-sm
        flex items-center justify-center
        p-6  
      "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          w-full
          ${widthMap[size]}
          bg-white
          rounded-3xl
          shadow-2xl
          overflow-hidden
          flex flex-col
          max-h-[90vh]
        `}
      >
        <div className="px-8 py-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black">{title}</h2>

            <button
              onClick={onClose}
              className="
                  w-10 h-10
                  rounded-full
                  hover:bg-gray-100
                  flex items-center justify-center
                "
            >
              {close}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto hide-scrollbar">{children}</div>

        {footer && <div className="border-t bg-[#f5f7f6] p-6">{footer}</div>}
      </div>
    </div>
  );
}
