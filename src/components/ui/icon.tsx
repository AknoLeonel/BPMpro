import {
  BadgeCheck,
  ChartGantt,
  ClipboardCheck,
  ClipboardList,
  Drama,
  Eye,
  FilePenLine,
  FileStack,
  FileWarning,
  FileX2,
  Gavel,
  HandCoins,
  Handshake,
  HeartHandshake,
  Landmark,
  Lightbulb,
  type LucideProps,
  Map as MapIcon,
  Medal,
  MonitorCog,
  Stamp,
  TriangleAlert,
  Trophy,
  Waypoints,
} from "lucide-react";

const icons = {
  BadgeCheck,
  ChartGantt,
  ClipboardCheck,
  ClipboardList,
  Drama,
  Eye,
  FilePenLine,
  FileStack,
  FileWarning,
  FileX2,
  Gavel,
  HandCoins,
  Handshake,
  HeartHandshake,
  Landmark,
  Lightbulb,
  Map: MapIcon,
  Medal,
  MonitorCog,
  Stamp,
  TriangleAlert,
  Trophy,
  Waypoints,
} as const;

export type IconName = keyof typeof icons;

/** Ícones de traço fino (1.5px), no estilo do Manual de Marca. */
export function Icon({ name, strokeWidth = 1.5, ...props }: { name: IconName } & LucideProps) {
  const Component = icons[name];
  return <Component aria-hidden strokeWidth={strokeWidth} {...props} />;
}
