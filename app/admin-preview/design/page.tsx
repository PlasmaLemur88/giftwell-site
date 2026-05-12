'use client';

import { useState } from 'react';
import {
  Card,
  BlockStack,
  InlineStack,
  InlineGrid,
  Text,
  Button,
  Box,
  Divider,
} from '@shopify/polaris';
import { ImageIcon, UploadIcon } from '@shopify/polaris-icons';

/* ─── Data ─── */

type Theme = { id: string; name: string; preview: string };
type Poster = {
  id: string;
  title: string;
  bg: string;
  color: string;
  fontFamily?: string;
  fontStyle?: 'normal' | 'italic';
  textTransform?: 'uppercase' | 'none';
  letterSpacing?: string;
};
type Font = { id: string; name: string; cssFamily: string; locked?: boolean };

const THEMES: Theme[] = [
  { id: 'midnight',  name: 'Midnight',         preview: 'linear-gradient(180deg, #1F3A5F, #0F1A2E)' },
  { id: 'sunlit',    name: 'Sunlit',           preview: 'linear-gradient(180deg, #FFE9A0, #FFD060)' },
  { id: 'rose',      name: 'Rose',             preview: 'linear-gradient(180deg, #FFC9D5, #F58CA8)' },
  { id: 'mint',      name: 'Mint',             preview: 'linear-gradient(180deg, #A8E5C5, #6FCBA0)' },
  { id: 'lavender',  name: 'Lavender',         preview: 'linear-gradient(180deg, #DCDCFF, #A8A8F0)' },
  { id: 'noir',      name: 'Noir',             preview: 'linear-gradient(180deg, #2a2a2a, #0d0d0d)' },
  { id: 'confetti',  name: 'Confetti party',   preview: 'linear-gradient(135deg, #FFD93D 0%, #FF6B6B 50%, #6C5CE7 100%)' },
  { id: 'starfield', name: 'Starfield',        preview: 'radial-gradient(circle at 30% 20%, #6464a0 0px, transparent 1px), radial-gradient(circle at 70% 60%, #8484c0 0px, transparent 1px), linear-gradient(180deg, #1a1a3a, #0a0a20)' },
];

const POSTERS: Poster[] = [
  { id: 'cheers',          title: 'Cheers\nFor You',          bg: '#F4ECD8',                                                          color: '#1E40AF', fontFamily: 'Georgia, serif', fontStyle: 'italic' },
  { id: 'just-for-you',    title: 'Just\nFor You',            bg: 'radial-gradient(circle at 50% 30%, #2a2a4a, #0a0a20)',              color: '#fff',    fontFamily: 'Georgia, serif', fontStyle: 'italic' },
  { id: 'good-vibes',      title: 'good\nvibes\nonly',        bg: 'linear-gradient(135deg, #87CEEB, #B0E0E6 60%, #FFE4B5)',            color: '#fff',    fontFamily: 'Georgia, serif',  },
  { id: 'good-food',       title: 'good food\ngood mood',     bg: 'linear-gradient(135deg, #2d5016, #4a7c2c)',                         color: '#fff',                                                       },
  { id: 'lets-go',         title: "LET'S\nGO",                bg: 'linear-gradient(135deg, #d2691e, #1a1a1a)',                         color: '#fff',                                  textTransform: 'uppercase' },
  { id: 'movie-night',     title: 'MOVIE\nNIGHT',             bg: 'linear-gradient(180deg, #1a1a3a, #0a0a1a)',                         color: '#FFD93D',                               textTransform: 'uppercase' },
  { id: 'sending-vibes',   title: 'Sending\ngood vibes',      bg: 'linear-gradient(135deg, #C4B68A, #8B7E5E)',                         color: '#5B4E37', fontFamily: 'Georgia, serif',                              },
  { id: 'great-is-coming', title: 'GREAT\nIS ON THE WAY',     bg: 'radial-gradient(circle at 80% 20%, #5C2BD3, #1a1a3a 70%)',          color: '#fff',                                  textTransform: 'uppercase', letterSpacing: '0.02em' },
  { id: 'happy-birthday',  title: 'Happy\nBirthday!',         bg: 'linear-gradient(135deg, #FF9EC8, #FFD93D)',                         color: '#fff',    fontFamily: 'Georgia, serif', fontStyle: 'italic' },
  { id: 'congrats',        title: 'Congrats!',                bg: 'linear-gradient(135deg, #FFE9A0, #F4C430)',                         color: '#7C2D12', fontFamily: 'Georgia, serif',                              },
  { id: 'thank-you',       title: 'Thank\nYou',               bg: 'linear-gradient(180deg, #0D9488, #134E4A)',                         color: '#fff',    fontFamily: 'Georgia, serif', fontStyle: 'italic' },
  { id: 'welcome',         title: 'Welcome',                  bg: 'linear-gradient(135deg, #DCDCFF, #A8A8F0)',                         color: '#1E1B4B', fontFamily: 'Georgia, serif',                              },
];

const FONTS: Font[] = [
  { id: 'default',       name: 'Default',       cssFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif', locked: true },
  { id: 'elegant',       name: 'Elegant',       cssFamily: 'Georgia, "Times New Roman", serif' },
  { id: 'playful',       name: 'Playful',       cssFamily: '"Brush Script MT", "Lucida Handwriting", cursive' },
  { id: 'sophisticated', name: 'Sophisticated', cssFamily: '"Didot", "Bodoni 72", "Playfair Display", serif' },
];

/* ─── Page ─── */

export default function DesignPage() {
  const [themes, setThemes] = useState<Set<string>>(new Set(['midnight', 'sunlit', 'rose', 'mint', 'lavender', 'noir']));
  const [posters, setPosters] = useState<Set<string>>(
    new Set(POSTERS.map((p) => p.id)),
  );
  const [fonts, setFonts] = useState<Set<string>>(new Set(['default', 'elegant', 'sophisticated']));
  const [media, setMedia] = useState({ giphy: true, upload: true });

  return (
    <BlockStack gap="800">
      <InlineStack align="space-between" blockAlign="center" gap="500">
        <BlockStack gap="100">
          <Text as="h1" variant="headingXl">Design</Text>
          <Text as="p" variant="bodyMd" tone="subdued">
            Curate which design options your gifters can use when they personalize a gift.
          </Text>
        </BlockStack>
        <Button variant="primary">Save</Button>
      </InlineStack>

      {/* 1. Theme library */}
      <Card padding="500">
        <SectionHeader
          title="Theme library"
          subtitle="Backgrounds your gifters can pick when designing a gift's unboxing."
          right={<CountText current={themes.size} total={THEMES.length} />}
        />
        <Box paddingBlockStart="400">
          <InlineGrid gap="300" columns={4}>
            {THEMES.map((t) => (
              <ThemeTile
                key={t.id}
                theme={t}
                selected={themes.has(t.id)}
                onToggle={() => toggleSet(themes, t.id, setThemes, { minimum: 1 })}
              />
            ))}
          </InlineGrid>
        </Box>
      </Card>

      {/* 2. Stock poster library */}
      <Card padding="500">
        <SectionHeader
          title="Stock poster library"
          subtitle="Greeting-card-style posters gifters can add to a gift. Pick the ones that fit your brand."
          right={
            <InlineStack gap="200" blockAlign="center">
              <CountText current={posters.size} total={POSTERS.length} />
              <Button
                onClick={() =>
                  setPosters(
                    posters.size === POSTERS.length
                      ? new Set()
                      : new Set(POSTERS.map((p) => p.id))
                  )
                }
                variant="plain"
              >
                {posters.size === POSTERS.length ? 'Deselect all' : 'Select all'}
              </Button>
            </InlineStack>
          }
        />
        <Box paddingBlockStart="400">
          <InlineGrid gap="300" columns={4}>
            {POSTERS.map((p) => (
              <PosterTile
                key={p.id}
                poster={p}
                selected={posters.has(p.id)}
                onToggle={() => toggleSet(posters, p.id, setPosters)}
              />
            ))}
          </InlineGrid>
        </Box>
      </Card>

      {/* 3. Media sources */}
      <Card padding="500">
        <SectionHeader
          title="Media sources"
          subtitle="Other ways gifters can add a personal touch beyond the poster library."
        />
        <Box paddingBlockStart="400">
          <BlockStack gap="0">
            <MediaRow
              Icon={ImageIcon}
              name="Giphy"
              description="Let gifters add an animated GIF from Giphy's library."
              on={media.giphy}
              onToggle={() => setMedia((m) => ({ ...m, giphy: !m.giphy }))}
            />
            <Divider />
            <MediaRow
              Icon={UploadIcon}
              name="File upload"
              description="Let gifters upload their own image or short video."
              on={media.upload}
              onToggle={() => setMedia((m) => ({ ...m, upload: !m.upload }))}
            />
          </BlockStack>
        </Box>
      </Card>

      {/* 4. Title fonts */}
      <Card padding="500">
        <SectionHeader
          title="Title fonts"
          subtitle="Fonts gifters can use for the gift title. Default is always available."
          right={<CountText current={fonts.size} total={FONTS.length} />}
        />
        <Box paddingBlockStart="400">
          <InlineStack gap="200" wrap>
            {FONTS.map((f) => (
              <FontPill
                key={f.id}
                font={f}
                selected={fonts.has(f.id)}
                onToggle={() => toggleSet(fonts, f.id, setFonts)}
              />
            ))}
          </InlineStack>
        </Box>
      </Card>
    </BlockStack>
  );
}

/* ─── Section helpers ─── */

function SectionHeader({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle: string;
  right?: React.ReactNode;
}) {
  return (
    <InlineStack align="space-between" blockAlign="start" gap="400" wrap={false}>
      <BlockStack gap="050">
        <Text as="h3" variant="headingMd">{title}</Text>
        <Text as="p" variant="bodySm" tone="subdued">{subtitle}</Text>
      </BlockStack>
      {right}
    </InlineStack>
  );
}

function CountText({ current, total }: { current: number; total: number }) {
  return (
    <Text as="span" variant="bodySm" tone="subdued">
      {current} of {total} selected
    </Text>
  );
}

/* ─── Tile components ─── */

function ThemeTile({
  theme,
  selected,
  onToggle,
}: {
  theme: Theme;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      style={{ all: 'unset', cursor: 'pointer', display: 'block' }}
    >
      <BlockStack gap="200">
        <div
          style={{
            position: 'relative',
            aspectRatio: '4 / 3',
            borderRadius: 10,
            background: theme.preview,
            outline: selected
              ? '2px solid var(--p-color-border-emphasis)'
              : '1px solid var(--p-color-border)',
            outlineOffset: selected ? 2 : 0,
            opacity: selected ? 1 : 0.4,
            transition: 'opacity 120ms ease',
            overflow: 'hidden',
          }}
        >
          {selected && <CheckBadge />}
        </div>
        <Text as="span" variant="bodySm" fontWeight={selected ? 'semibold' : 'regular'}>
          {theme.name}
        </Text>
      </BlockStack>
    </button>
  );
}

function PosterTile({
  poster,
  selected,
  onToggle,
}: {
  poster: Poster;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      style={{ all: 'unset', cursor: 'pointer', display: 'block' }}
    >
      <div
        style={{
          position: 'relative',
          aspectRatio: '3 / 4',
          borderRadius: 10,
          background: poster.bg,
          color: poster.color,
          outline: selected
            ? '2px solid var(--p-color-border-emphasis)'
            : '1px solid var(--p-color-border)',
          outlineOffset: selected ? 2 : 0,
          opacity: selected ? 1 : 0.4,
          transition: 'opacity 120ms ease',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 12,
        }}
      >
        {selected && <CheckBadge />}
        <span
          style={{
            fontFamily: poster.fontFamily ?? '-apple-system, sans-serif',
            fontStyle: poster.fontStyle ?? 'normal',
            textTransform: poster.textTransform,
            letterSpacing: poster.letterSpacing,
            fontWeight: 700,
            fontSize: 15,
            lineHeight: 1.1,
            textAlign: 'center',
            whiteSpace: 'pre-line',
          }}
        >
          {poster.title}
        </span>
      </div>
    </button>
  );
}

function MediaRow({
  Icon,
  name,
  description,
  on,
  onToggle,
}: {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  name: string;
  description: string;
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <Box paddingBlock="400">
      <InlineStack align="space-between" blockAlign="center" gap="400" wrap={false}>
        <InlineStack gap="400" blockAlign="center" wrap={false}>
          <Box
            background="bg-surface-secondary"
            borderRadius="200"
            minWidth="40px"
            minHeight="40px"
          >
            <div
              style={{
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon width={20} height={20} style={{ fill: '#1a1a1f' }} />
            </div>
          </Box>
          <BlockStack gap="050">
            <Text as="p" variant="bodyMd" fontWeight="semibold">{name}</Text>
            <Text as="p" variant="bodySm" tone="subdued">{description}</Text>
          </BlockStack>
        </InlineStack>
        <Toggle on={on} onToggle={onToggle} />
      </InlineStack>
    </Box>
  );
}

function FontPill({
  font,
  selected,
  onToggle,
}: {
  font: Font;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={font.locked ? undefined : onToggle}
      aria-pressed={selected}
      disabled={font.locked}
      style={{
        all: 'unset',
        cursor: font.locked ? 'default' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 16px',
        borderRadius: 999,
        background: selected ? '#1a1a1f' : '#fff',
        color: selected ? '#fff' : '#1a1a1f',
        border: `1px solid ${selected ? '#1a1a1f' : '#dcdcde'}`,
        fontSize: 13.5,
        fontWeight: 500,
        opacity: selected ? 1 : 0.7,
        transition: 'background 120ms, color 120ms, opacity 120ms',
      }}
    >
      <span
        style={{
          fontFamily: font.cssFamily,
          fontSize: 18,
          lineHeight: 1,
        }}
      >
        Title
      </span>
      <span>{font.name}</span>
      {font.locked && <span style={{ fontSize: 11, opacity: 0.65 }}>(always)</span>}
    </button>
  );
}

/* ─── Reusable pieces ─── */

function CheckBadge() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 8,
        right: 8,
        width: 20,
        height: 20,
        borderRadius: '50%',
        background: '#1a1a1f',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 0 2px #fff',
      }}
      aria-hidden
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  );
}

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={on}
      style={{
        all: 'unset',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <span
        style={{
          width: 32,
          height: 18,
          background: on ? '#1a1a1f' : '#e1e3e5',
          borderRadius: 999,
          position: 'relative',
          transition: 'background 120ms ease',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 2,
            left: on ? 16 : 2,
            width: 14,
            height: 14,
            background: '#fff',
            borderRadius: '50%',
            transition: 'left 120ms ease',
            boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
          }}
        />
      </span>
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
    </button>
  );
}

/* ─── Set toggle helper ─── */

function toggleSet(
  set: Set<string>,
  id: string,
  setter: (s: Set<string>) => void,
  opts?: { minimum?: number }
) {
  const next = new Set(set);
  if (next.has(id)) {
    if (opts?.minimum !== undefined && next.size <= opts.minimum) return;
    next.delete(id);
  } else {
    next.add(id);
  }
  setter(next);
}
