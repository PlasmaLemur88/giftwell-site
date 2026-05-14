'use client';

import { useEffect, useState } from 'react';
import { AuroraBackground } from '@/components/ui/aurora-background';
import {
  GridSpotBackground,
  BlurOrbBackground,
  TwinSpotBackground,
  PurpleWashBackground,
} from '@/components/ui/background-snippets';

export type BackgroundMode = 'dark' | 'light';

type BgChoice = {
  mode: BackgroundMode;
  Bg: () => React.ReactElement;
};

const BACKGROUNDS: BgChoice[] = [
  { mode: 'dark',  Bg: () => <AuroraBackground className="absolute inset-0 -z-10 h-full w-full" /> },
  { mode: 'dark',  Bg: PurpleWashBackground },
  { mode: 'light', Bg: GridSpotBackground },
  { mode: 'light', Bg: BlurOrbBackground },
  { mode: 'light', Bg: TwinSpotBackground },
];

/* Picks a random background on each page mount and reports its mode (dark
   or light) so the layout can flip text colors via CSS variables. SSR
   uses the dark Purple Wash so first paint always has readable white
   text; the random pick swaps in after hydration. */
export function RandomBackground({
  onModeChange,
}: {
  onModeChange?: (mode: BackgroundMode) => void;
}) {
  const [pick, setPick] = useState<BgChoice>(BACKGROUNDS[1]); // PurpleWash, dark, safe default

  useEffect(() => {
    const choice = BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];
    setPick(choice);
    onModeChange?.(choice.mode);
  }, [onModeChange]);

  const Bg = pick.Bg;
  return <Bg />;
}
