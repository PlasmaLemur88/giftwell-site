'use client';

import { useEffect } from 'react';
import './modal-bloom.css';

type ModalBloomProps = {
  open: boolean;
  color?: string;
};

function hexToRgba(hex: string, alpha: number): string {
  const v = hex.replace('#', '');
  if (v.length !== 6) return `rgba(124, 92, 255, ${alpha})`;
  const r = parseInt(v.slice(0, 2), 16);
  const g = parseInt(v.slice(2, 4), 16);
  const b = parseInt(v.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function ModalBloom({ open, color = '#7C5CFF' }: ModalBloomProps) {
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.setProperty('--bloom-glow', hexToRgba(color, 0.55));
    root.style.setProperty('--bloom-glow-soft', hexToRgba(color, 0.18));
    root.setAttribute('data-bloom-on', '');
    return () => {
      root.style.removeProperty('--bloom-glow');
      root.style.removeProperty('--bloom-glow-soft');
      root.removeAttribute('data-bloom-on');
    };
  }, [open, color]);

  return null;
}
