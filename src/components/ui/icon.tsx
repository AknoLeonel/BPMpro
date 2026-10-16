import {
  BookOpen,
  FileText,
  GraduationCap,
  HandCoins,
  HeartHandshake,
  LayoutDashboard,
  Leaf,
  type LucideProps,
  Palette,
  ShieldCheck,
  Stethoscope,
  Trophy,
  Workflow,
} from "lucide-react";

const icons = {
  BookOpen,
  FileText,
  GraduationCap,
  HandCoins,
  HeartHandshake,
  LayoutDashboard,
  Leaf,
  Palette,
  ShieldCheck,
  Stethoscope,
  Trophy,
  Workflow,
} as const;

export type IconName = keyof typeof icons;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Component = icons[name];
  return <Component aria-hidden {...props} />;
}
