'use client';

type ToggleProps = {
  on: boolean;
  onToggle: () => void;
  ariaLabel?: string;
  showLabel?: boolean;
};

const TRACK_W = 36;
const TRACK_H = 20;
const KNOB = 16;
const PAD = 2;

export function Toggle({ on, onToggle, ariaLabel, showLabel = false }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={on}
      aria-label={ariaLabel}
      style={{
        all: 'unset',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: showLabel ? 8 : 0,
        outline: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <span
        style={{
          width: TRACK_W,
          height: TRACK_H,
          background: on ? '#1F8A4C' : '#E1E3E5',
          borderRadius: 999,
          position: 'relative',
          transition: 'background 160ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 160ms cubic-bezier(0.4, 0, 0.2, 1)',
          flexShrink: 0,
          boxShadow: on
            ? 'inset 0 0 0 1px rgba(0,0,0,0.04)'
            : 'inset 0 0 0 1px rgba(0,0,0,0.06)',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: PAD,
            left: PAD,
            width: KNOB,
            height: KNOB,
            background: '#fff',
            borderRadius: '50%',
            transform: on ? `translateX(${TRACK_W - KNOB - PAD * 2}px)` : 'translateX(0)',
            transition: 'transform 160ms cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.18), 0 1px 1px rgba(0,0,0,0.06)',
          }}
        />
      </span>
      {showLabel && (
        <span
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: on ? '#111' : '#8a8a93',
            minWidth: 22,
          }}
        >
          {on ? 'On' : 'Off'}
        </span>
      )}
    </button>
  );
}
