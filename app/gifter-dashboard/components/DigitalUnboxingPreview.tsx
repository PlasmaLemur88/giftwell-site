'use client';

import type { UnboxingDesign } from '../data';

/**
 * A live preview of the branded digital unboxing a recipient sees when they
 * open their gift. Rendered on order cards + order detail so the dashboard
 * reads as a gallery of the gift designs the gifter set up — the way
 * Partiful event cards show the host's own flyer art.
 */
export function DigitalUnboxingPreview({
  design,
  aspectRatio = '4 / 3',
  radius = 14,
  bordered = false,
  showLabel = true,
}: {
  design: UnboxingDesign;
  aspectRatio?: string;
  radius?: number;
  bordered?: boolean;
  showLabel?: boolean;
}) {
  return (
    <div
      className="dup"
      style={{
        aspectRatio,
        borderRadius: radius,
        background: design.scene,
        border: bordered ? '1.5px solid #0F0F12' : undefined,
      }}
    >
      {/* Floating motif + sparkles */}
      <span className="dup-motif dup-motif-1" aria-hidden>{design.motif}</span>
      <span className="dup-motif dup-motif-2" aria-hidden>{design.motif}</span>
      <span className="dup-spark dup-spark-1" style={{ color: design.accent }} aria-hidden>✦</span>
      <span className="dup-spark dup-spark-2" style={{ color: design.accent }} aria-hidden>✦</span>
      <span className="dup-spark dup-spark-3" style={{ color: design.accent }} aria-hidden>✦</span>

      {/* Gift box */}
      <div className="dup-box-wrap">
        <div className="dup-box" style={{ background: design.box }}>
          <span className="dup-ribbon-v" style={{ background: design.ribbon }} />
          <span className="dup-ribbon-h" style={{ background: design.ribbon }} />
        </div>
        <span className="dup-lid" style={{ background: design.lid }} />
        <span className="dup-bow" style={{ background: design.ribbon }} />
        <span className="dup-bow-knot" style={{ background: design.ribbon }} />
      </div>

      {/* "Previewing the digital unboxing" label */}
      {showLabel && (
        <div className="dup-label">
          <span className="dup-label-kicker">
            <span className="dup-play" aria-hidden>▶</span>
            Digital unboxing
          </span>
          <span className="dup-label-theme">{design.theme}</span>
        </div>
      )}

      <style jsx>{`
        .dup {
          position: relative;
          width: 100%;
          overflow: hidden;
          box-sizing: border-box;
        }

        /* Gift box — proportional so it scales at any card size */
        .dup-box-wrap {
          position: absolute;
          left: 50%; top: 48%;
          transform: translate(-50%, -50%);
          width: 42%;
          aspect-ratio: 1 / 1;
          animation: dup-float 4.5s ease-in-out infinite;
        }
        .dup-box {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          height: 70%;
          border-radius: 5px;
          overflow: hidden;
          box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.45);
        }
        .dup-ribbon-v {
          position: absolute;
          left: 44%; width: 12%; top: 0; bottom: 0;
        }
        .dup-ribbon-h {
          position: absolute;
          left: 0; right: 0; top: 40%; height: 16%;
        }
        .dup-lid {
          position: absolute;
          left: -7%; right: -7%; top: 18%;
          height: 20%;
          border-radius: 5px;
          box-shadow: 0 6px 14px -6px rgba(0, 0, 0, 0.4);
        }
        .dup-bow {
          position: absolute;
          left: 30%; width: 40%;
          top: 0; height: 24%;
          border-radius: 50%;
        }
        .dup-bow-knot {
          position: absolute;
          left: 42%; width: 16%;
          top: 12%; height: 18%;
          border-radius: 3px;
        }

        /* Floating motif emoji */
        .dup-motif {
          position: absolute;
          font-size: 15px;
          opacity: 0.92;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.25));
        }
        .dup-motif-1 { top: 14%; left: 16%; animation: dup-drift 5s ease-in-out infinite; }
        .dup-motif-2 { top: 24%; right: 14%; font-size: 12px; animation: dup-drift 6.2s ease-in-out infinite reverse; }

        /* Sparkles */
        .dup-spark {
          position: absolute;
          font-size: 11px;
          line-height: 1;
        }
        .dup-spark-1 { top: 18%; right: 28%; animation: dup-twinkle 2.4s ease-in-out infinite; }
        .dup-spark-2 { bottom: 30%; left: 18%; font-size: 9px; animation: dup-twinkle 3s ease-in-out infinite 0.6s; }
        .dup-spark-3 { top: 38%; right: 16%; font-size: 13px; animation: dup-twinkle 2.7s ease-in-out infinite 1.1s; }

        @keyframes dup-float {
          0%, 100% { transform: translate(-50%, -50%); }
          50%      { transform: translate(-50%, -56%); }
        }
        @keyframes dup-drift {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50%      { transform: translateY(-5px) rotate(8deg); }
        }
        @keyframes dup-twinkle {
          0%, 100% { opacity: 0.35; transform: scale(0.85); }
          50%      { opacity: 1;    transform: scale(1.15); }
        }
        @media (prefers-reduced-motion: reduce) {
          .dup-box-wrap, .dup-motif, .dup-spark { animation: none; }
        }

        /* Label — reads on any scene color */
        .dup-label {
          position: absolute;
          left: 10px; bottom: 10px;
          display: flex; flex-direction: column; gap: 1px;
          background: rgba(10, 10, 14, 0.58);
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
          padding: 6px 10px;
          border-radius: 8px;
        }
        .dup-label-kicker {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 8.5px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.72);
        }
        .dup-play { font-size: 6px; }
        .dup-label-theme {
          font-size: 12px; font-weight: 600;
          color: #fff;
          letter-spacing: -0.005em;
        }
      `}</style>
    </div>
  );
}
