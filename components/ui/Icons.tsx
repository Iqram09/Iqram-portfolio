import type { SVGProps } from "react";
import {
  ArrowDown as LArrowDown,
  ArrowLeft as LArrowLeft,
  ArrowRight as LArrowRight,
  ArrowUpRight as LArrowUpRight,
  Check as LCheck,
  Download as LDownload,
  FileText as LFileText,
  Mail as LMail,
  MapPin as LMapPin,
  Menu as LMenu,
  Phone as LPhone,
  Play as LPlay,
  RotateCcw as LRotateCcw,
  ShieldCheck as LShieldCheck,
  Terminal as LTerminal,
  X as LX,
  type LucideProps,
} from "lucide-react";

/**
 * Lucide icons under the names the site already uses, drawn at a lighter
 * stroke to sit with the thin-line system. Brand marks Lucide no longer ships
 * (GitHub, LinkedIn) are drawn here.
 */
type IconProps = LucideProps;
const defaults = { strokeWidth: 1.6, "aria-hidden": true, focusable: false } as const;

export function ArrowRight(p: IconProps) { return <LArrowRight size={16} {...defaults} {...p} />; }
export function ArrowLeft(p: IconProps) { return <LArrowLeft size={16} {...defaults} {...p} />; }
export function ArrowUpRight(p: IconProps) { return <LArrowUpRight size={16} {...defaults} {...p} />; }
export function ArrowDown(p: IconProps) { return <LArrowDown size={16} {...defaults} {...p} />; }
export function Download(p: IconProps) { return <LDownload size={16} {...defaults} {...p} />; }
export function FileText(p: IconProps) { return <LFileText size={16} {...defaults} {...p} />; }
export function Mail(p: IconProps) { return <LMail size={16} {...defaults} {...p} />; }
export function MapPin(p: IconProps) { return <LMapPin size={16} {...defaults} {...p} />; }
export function Menu(p: IconProps) { return <LMenu size={16} {...defaults} {...p} />; }
export function Close(p: IconProps) { return <LX size={16} {...defaults} {...p} />; }
export function Check(p: IconProps) { return <LCheck size={16} {...defaults} {...p} />; }
export function Shield(p: IconProps) { return <LShieldCheck size={16} {...defaults} {...p} />; }
export function Terminal(p: IconProps) { return <LTerminal size={16} {...defaults} {...p} />; }
export function Play(p: IconProps) { return <LPlay size={16} {...defaults} {...p} />; }
export function Refresh(p: IconProps) { return <LRotateCcw size={16} {...defaults} {...p} />; }
export function Phone(p: IconProps) { return <LPhone size={16} {...defaults} {...p} />; }

type BrandProps = SVGProps<SVGSVGElement> & { size?: number };

export function Github({ size = 16, ...rest }: BrandProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable={false} {...rest}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.3 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.17c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.13v3.16c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

export function Linkedin({ size = 16, ...rest }: BrandProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable={false} {...rest}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
