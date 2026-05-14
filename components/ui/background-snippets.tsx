/* A small library of decorative full-bleed backgrounds. Each one stands
   alone as an absolute-positioned -z-10 layer that fills its parent. */

export const GridSpotBackground = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
    <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
  </div>
);

export const BlurOrbBackground = () => (
  <div className="absolute top-0 -z-10 h-full w-full bg-white">
    <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
  </div>
);

/* A brand-tinted spot from the upper-left, complementing the upper-right
   radial in GridSpotBackground. Different vibe each session. */
export const TwinSpotBackground = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-white">
    <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_600px_at_0%_0%,#e6d9ff,transparent),radial-gradient(circle_700px_at_100%_100%,#ffd6c2,transparent)]"></div>
  </div>
);

/* The original wash, kept as one option in the rotation. */
export const PurpleWashBackground = () => (
  <div
    className="absolute inset-0 -z-10 h-full w-full"
    style={{
      background: `
        radial-gradient(ellipse 75% 240px at 50% 0%, rgba(255, 214, 194, 0.32) 0%, transparent 75%) no-repeat,
        linear-gradient(180deg,
          #5C3FE0 0px,
          #7C5CFF 60px,
          #9B7FEC 170px,
          #BFA6F0 290px,
          #DCC8F0 420px,
          #ECDFF3 540px,
          #F2E9F6 640px,
          #F6F2FA 760px,
          #F6F2FA 100%
        ) no-repeat,
        #F6F2FA
      `,
    }}
  />
);
