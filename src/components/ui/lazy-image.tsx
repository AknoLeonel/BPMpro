"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

/**
 * `next/image` com lazy loading nativo + skeleton até o `onLoad`
 * e entrada em fade/blur para não "piscar" a imagem.
 */
export function LazyImage({ className, alt, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {loaded ? null : <Skeleton className="absolute inset-0 rounded-none" />}
      <Image
        alt={alt}
        loading="lazy"
        {...props}
        onLoad={() => setLoaded(true)}
        data-loaded={loaded}
        className={cn(
          "h-full w-full object-cover transition-[opacity,filter,transform] duration-500 ease-out motion-reduce:transition-none",
          loaded ? "scale-100 opacity-100 blur-0" : "scale-[1.02] opacity-0 blur-md",
        )}
      />
    </div>
  );
}
