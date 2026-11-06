import { Marquee } from "@/components/motion/marquee";
import { Icon } from "@/components/ui/icon";
import { cycleColor } from "@/lib/palette";
import { areas } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/** Faixa inclinada com as áreas de atuação em movimento contínuo. */
export function AreasMarquee() {
  return (
    <div className="overflow-hidden py-8 sm:py-10">
      <div className="relative -mx-4 mt-12 -rotate-2 border-ink-900 border-y-4 bg-ink-950 py-5 sm:mt-14">
        <Marquee label="Áreas de atuação" duration={36}>
          {areas.map((area, i) => (
            <span
              key={area.title}
              className={cn(
                "inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 font-bold font-display text-lg sm:text-xl",
                cycleColor(i).solid,
              )}
            >
              <Icon name={area.icon} className="size-5" />
              {area.title}
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
