'use client';

import { useState } from 'react';
import { AuroraBackground } from '@/components/ui/aurora-background';
import {
  GridSpotBackground,
  BlurOrbBackground,
  TwinSpotBackground,
  PurpleWashBackground,
} from '@/components/ui/background-snippets';

const BACKGROUNDS = [
  () => <AuroraBackground className="absolute inset-0 -z-10 h-full w-full" />,
  GridSpotBackground,
  BlurOrbBackground,
  TwinSpotBackground,
  PurpleWashBackground,
];

/* Random background, picked once per page mount. Each visit to the dashboard
   gets a different atmosphere. useState's initializer only runs on the
   client, after first render, so SSR and hydration both stay clean. */
export function RandomBackground() {
  const [Bg] = useState(() => BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)]);
  return <Bg />;
}
