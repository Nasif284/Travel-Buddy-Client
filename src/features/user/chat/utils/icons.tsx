import type { SVGProps } from "react";
type IconProps = SVGProps<SVGSVGElement>;

const Icon = ({ children, className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-5 w-5 ${className ?? ""}`} aria-hidden="true" {...props}>
    {children}
  </svg>
);

export const SearchIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="11" cy="11" r="6" />
    <path d="m20 20-4.2-4.2" />
  </Icon>
);

export const EditSquareIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 20H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h9" />
    <path d="m15 4 5 5-8.5 8.5L7 18l.5-4.5L15 4Z" />
  </Icon>
);

export const CallIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.8 2.8a2 2 0 0 1-.4 2.1L8.2 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.4 1.8.7 2.8.8a2 2 0 0 1 1.6 1.9Z" />
  </Icon>
);

export const VideoIcon = (props: IconProps) => (
  <Icon {...props}>
    <rect x="3" y="6" width="13" height="12" rx="2" />
    <path d="m16 10 5-3v10l-5-3" />
  </Icon>
);

export const InfoIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8h.01" />
  </Icon>
);

export const SmileIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
  </Icon>
);

export const AddCircleIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v8M8 12h8" />
  </Icon>
);

export const SendIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="m21 3-7.4 18-3.1-7.5L3 10.4 21 3Z" />
    <path d="m10.5 13 4.6-4.6" />
  </Icon>
);
