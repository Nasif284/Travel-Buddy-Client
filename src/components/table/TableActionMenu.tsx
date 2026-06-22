"use client";

import { MoreVertIcon } from "@/src/assets/icons";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export interface ActionMenuItem {
  label: string;
  onClick: () => void;
  className?: string;
}

interface TableActionMenuProps {
  rowId: string;
  openId: string | null;
  onToggle: (id: string | null) => void;
  items: ActionMenuItem[];
}

interface DropdownPosition {
  top: number;
  right: number;
}

export function TableActionMenu({ rowId, openId, onToggle, items }: TableActionMenuProps) {
  const isOpen = openId === rowId;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState<DropdownPosition | null>(null);
  useEffect(() => {
    if (!isOpen) {
      setPosition(null);
      return;
    }

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();

      setPosition({
        top: rect.bottom + window.scrollY + 8,
        right: window.innerWidth - rect.right,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      const clickedButton = buttonRef.current?.contains(target);
      const clickedMenu = menuRef.current?.contains(target);
      if (!clickedButton && !clickedMenu) {
        onToggle(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside, true);
    return () => document.removeEventListener("mousedown", handleClickOutside, true);
  }, [isOpen, onToggle]);

  useEffect(() => {
    if (!isOpen) return;

    function handleScroll() {
      onToggle(null);
    }

    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [isOpen, onToggle]);

  const dropdown =
    isOpen && position && items.length > 0
      ? createPortal(
          <div
            ref={menuRef}
            style={{
              position: "fixed",
              top: position.top,
              right: position.right,
              zIndex: 9999,
            }}
            className="w-44 bg-white border border-zinc-200 rounded-xl shadow-lg overflow-hidden"
          >
            {items.map((item, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  item.onClick();
                  onToggle(null);
                }}
                className={`w-full px-4 py-3 text-left text-sm transition-colors ${item.className ?? "hover:bg-zinc-50 text-zinc-700"}`}
              >
                {item.label}
              </button>
            ))}
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation();
          onToggle(isOpen ? null : rowId);
        }}
        className="p-1 hover:bg-zinc-200 rounded transition-colors"
        aria-label="Row actions"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <MoreVertIcon />
      </button>

      {dropdown}
    </>
  );
}
