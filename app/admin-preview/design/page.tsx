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
  Modal,
  Divider,
} from '@shopify/polaris';
import { PlusIcon, DeleteIcon } from '@shopify/polaris-icons';
import { Toggle } from '../components/Toggle';

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
  { id: 'good-vibes',      title: 'good\nvibes\nonly',        bg: 'linear-gradient(135deg, #87CEEB, #B0E0E6 60%, #FFE4B5)',            color: '#fff',    fontFamily: 'Georgia, serif' },
  { id: 'good-food',       title: 'good food\ngood mood',     bg: 'linear-gradient(135deg, #2d5016, #4a7c2c)',                         color: '#fff' },
  { id: 'lets-go',         title: "LET'S\nGO",                bg: 'linear-gradient(135deg, #d2691e, #1a1a1a)',                         color: '#fff',                                  textTransform: 'uppercase' },
  { id: 'movie-night',     title: 'MOVIE\nNIGHT',             bg: 'linear-gradient(180deg, #1a1a3a, #0a0a1a)',                         color: '#FFD93D',                               textTransform: 'uppercase' },
  { id: 'sending-vibes',   title: 'Sending\ngood vibes',      bg: 'linear-gradient(135deg, #C4B68A, #8B7E5E)',                         color: '#5B4E37', fontFamily: 'Georgia, serif' },
  { id: 'great-is-coming', title: 'GREAT\nIS ON THE WAY',     bg: 'radial-gradient(circle at 80% 20%, #5C2BD3, #1a1a3a 70%)',          color: '#fff',                                  textTransform: 'uppercase', letterSpacing: '0.02em' },
  { id: 'happy-birthday',  title: 'Happy\nBirthday!',         bg: 'linear-gradient(135deg, #FF9EC8, #FFD93D)',                         color: '#fff',    fontFamily: 'Georgia, serif', fontStyle: 'italic' },
  { id: 'congrats',        title: 'Congrats!',                bg: 'linear-gradient(135deg, #FFE9A0, #F4C430)',                         color: '#7C2D12', fontFamily: 'Georgia, serif' },
  { id: 'thank-you',       title: 'Thank\nYou',               bg: 'linear-gradient(180deg, #0D9488, #134E4A)',                         color: '#fff',    fontFamily: 'Georgia, serif', fontStyle: 'italic' },
  { id: 'welcome',         title: 'Welcome',                  bg: 'linear-gradient(135deg, #DCDCFF, #A8A8F0)',                         color: '#1E1B4B', fontFamily: 'Georgia, serif' },
];

const FONTS: Font[] = [
  { id: 'default',       name: 'Default',       cssFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif', locked: true },
  { id: 'elegant',       name: 'Elegant',       cssFamily: 'Georgia, "Times New Roman", serif' },
  { id: 'playful',       name: 'Playful',       cssFamily: '"Brush Script MT", "Lucida Handwriting", cursive' },
  { id: 'sophisticated', name: 'Sophisticated', cssFamily: '"Didot", "Bodoni 72", "Playfair Display", serif' },
];

type Upload = { id: string; name: string };

/* ─── Page ─── */

export default function DesignPage() {
  // Themes
  const [themesOn, setThemesOn] = useState(true);
  const [themesSelected, setThemesSelected] = useState<Set<string>>(
    new Set(['midnight', 'sunlit', 'rose', 'mint', 'lavender', 'noir']),
  );
  const [themeUploads] = useState<Upload[]>([]);
  const [themesModal, setThemesModal] = useState(false);

  // Posters
  const [postersOn, setPostersOn] = useState(true);
  const [postersSelected, setPostersSelected] = useState<Set<string>>(
    new Set(POSTERS.map((p) => p.id)),
  );
  const [posterUploads] = useState<Upload[]>([]);
  const [postersModal, setPostersModal] = useState(false);

  // GIFs
  const [gifsOn, setGifsOn] = useState(true);
  const [allowGiphy, setAllowGiphy] = useState(true);
  const [allowGifUploads, setAllowGifUploads] = useState(true);
  const [gifUploads] = useState<Upload[]>([]);
  const [gifsModal, setGifsModal] = useState(false);

  // Fonts
  const [fonts, setFonts] = useState<Set<string>>(new Set(['default', 'elegant', 'sophisticated']));

  // Build preview rows
  const selectedThemes = THEMES.filter((t) => themesSelected.has(t.id)).slice(0, 4);
  const selectedPosters = POSTERS.filter((p) => postersSelected.has(p.id)).slice(0, 4);

  return (
    <BlockStack gap="400">
      <InlineStack align="space-between" blockAlign="center" gap="500">
        <BlockStack gap="100">
          <Text as="h1" variant="headingXl">Design</Text>
          <Text as="p" variant="bodyMd" tone="subdued">
            Curate which design options your gifters can use when they personalize a gift.
          </Text>
        </BlockStack>
        <Button variant="primary">Save</Button>
      </InlineStack>

      {/* 1. Themes */}
      <LibrarySection
        title="Themes"
        subtitle="Looping video backgrounds gifters can pick when designing a gift."
        on={themesOn}
        onToggleOn={() => setThemesOn((v) => !v)}
        selectedCount={themesSelected.size}
        totalCount={THEMES.length + themeUploads.length}
        emptyLabel="No themes selected. Gifters won't be able to pick a background."
        editLabel="Edit themes"
        onEdit={() => setThemesModal(true)}
        preview={selectedThemes.map((t) => (
          <MiniThemeTile key={t.id} theme={t} />
        ))}
      />

      {/* 2. Stock posters */}
      <LibrarySection
        title="Stock posters"
        subtitle="Greeting-card-style posters gifters can add to a gift."
        on={postersOn}
        onToggleOn={() => setPostersOn((v) => !v)}
        selectedCount={postersSelected.size}
        totalCount={POSTERS.length + posterUploads.length}
        emptyLabel="No posters selected. Gifters won't see the poster picker."
        editLabel="Edit posters"
        onEdit={() => setPostersModal(true)}
        preview={selectedPosters.map((p) => (
          <MiniPosterTile key={p.id} poster={p} />
        ))}
      />

      {/* 3. GIFs */}
      <GifsSection
        on={gifsOn}
        onToggleOn={() => setGifsOn((v) => !v)}
        allowGiphy={allowGiphy}
        uploadCount={gifUploads.length}
        onEdit={() => setGifsModal(true)}
      />

      {/* 4. Title fonts (inline) */}
      <Card padding="500">
        <BlockStack gap="400">
          <InlineStack align="space-between" blockAlign="start" gap="400" wrap={false}>
            <BlockStack gap="050">
              <Text as="h3" variant="headingMd">Title fonts</Text>
              <Text as="p" variant="bodySm" tone="subdued">
                Fonts gifters can use for the gift title. Default is always available.
              </Text>
            </BlockStack>
            <Text as="span" variant="bodySm" tone="subdued">
              {fonts.size} of {FONTS.length} selected
            </Text>
          </InlineStack>
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
        </BlockStack>
      </Card>

      {/* Modals */}
      <LibraryModal
        open={themesModal}
        onClose={() => setThemesModal(false)}
        title="Edit themes"
        uploadLabel="Upload a theme video"
        uploadHint="MP4 or WebM, ideally seamless-looping. Plays as a full-screen background behind the gift."
        items={THEMES.map((t) => ({
          id: t.id,
          name: t.name,
          render: (
            <>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: t.preview,
                  borderRadius: 10,
                }}
              />
              <PlayBadge size="md" />
            </>
          ),
        }))}
        selected={themesSelected}
        setSelected={setThemesSelected}
        uploads={themeUploads}
      />

      <LibraryModal
        open={postersModal}
        onClose={() => setPostersModal(false)}
        title="Edit posters"
        uploadLabel="Upload a poster"
        uploadHint="JPG or PNG, ideally 3:4 aspect ratio. Title will display as-is."
        items={POSTERS.map((p) => ({
          id: p.id,
          name: p.title.replace('\n', ' '),
          render: <PosterFace poster={p} />,
        }))}
        selected={postersSelected}
        setSelected={setPostersSelected}
        uploads={posterUploads}
        tileAspect="3 / 4"
      />

      <GifsModal
        open={gifsModal}
        onClose={() => setGifsModal(false)}
        allowGiphy={allowGiphy}
        setAllowGiphy={setAllowGiphy}
        allowUploads={allowGifUploads}
        setAllowUploads={setAllowGifUploads}
        uploads={gifUploads}
      />
    </BlockStack>
  );
}

/* ─── Section wrappers ─── */

function LibrarySection({
  title,
  subtitle,
  on,
  onToggleOn,
  selectedCount,
  totalCount,
  emptyLabel,
  editLabel,
  onEdit,
  preview,
}: {
  title: string;
  subtitle: string;
  on: boolean;
  onToggleOn: () => void;
  selectedCount: number;
  totalCount: number;
  emptyLabel: string;
  editLabel: string;
  onEdit: () => void;
  preview: React.ReactNode[];
}) {
  return (
    <Card padding="500">
      <BlockStack gap="400">
        <InlineStack align="space-between" blockAlign="start" gap="400" wrap={false}>
          <BlockStack gap="050">
            <Text as="h3" variant="headingMd">{title}</Text>
            <Text as="p" variant="bodySm" tone="subdued">{subtitle}</Text>
          </BlockStack>
          <Toggle on={on} onToggle={onToggleOn} showLabel />
        </InlineStack>

        {on ? (
          selectedCount === 0 ? (
            <InlineStack align="space-between" blockAlign="center" gap="400" wrap={false}>
              <Text as="p" variant="bodySm" tone="subdued">{emptyLabel}</Text>
              <Button onClick={onEdit} variant="primary">{editLabel}</Button>
            </InlineStack>
          ) : (
            <InlineStack align="space-between" blockAlign="center" gap="400" wrap={false}>
              <InlineStack gap="400" blockAlign="center" wrap={false}>
                <PreviewRow>{preview}</PreviewRow>
                <Text as="span" variant="bodySm" tone="subdued">
                  {selectedCount} of {totalCount}
                </Text>
              </InlineStack>
              <Button onClick={onEdit}>{editLabel}</Button>
            </InlineStack>
          )
        ) : (
          <Text as="p" variant="bodySm" tone="subdued">
            Gifters won&apos;t see this option.
          </Text>
        )}
      </BlockStack>
    </Card>
  );
}

function GifsSection({
  on,
  onToggleOn,
  allowGiphy,
  uploadCount,
  onEdit,
}: {
  on: boolean;
  onToggleOn: () => void;
  allowGiphy: boolean;
  uploadCount: number;
  onEdit: () => void;
}) {
  let summary = '';
  if (allowGiphy && uploadCount > 0) summary = `Giphy library + ${uploadCount} custom upload${uploadCount === 1 ? '' : 's'}`;
  else if (allowGiphy) summary = 'Giphy library';
  else if (uploadCount > 0) summary = `${uploadCount} custom upload${uploadCount === 1 ? '' : 's'}`;
  else summary = 'No source enabled. Gifters won’t see the GIF picker.';

  return (
    <Card padding="500">
      <BlockStack gap="400">
        <InlineStack align="space-between" blockAlign="start" gap="400" wrap={false}>
          <BlockStack gap="050">
            <Text as="h3" variant="headingMd">GIFs</Text>
            <Text as="p" variant="bodySm" tone="subdued">
              Animated GIFs gifters can add to a gift.
            </Text>
          </BlockStack>
          <Toggle on={on} onToggle={onToggleOn} showLabel />
        </InlineStack>

        {on ? (
          <InlineStack align="space-between" blockAlign="center" gap="400" wrap={false}>
            <Text as="p" variant="bodySm" tone="subdued">{summary}</Text>
            <Button onClick={onEdit}>Edit GIFs</Button>
          </InlineStack>
        ) : (
          <Text as="p" variant="bodySm" tone="subdued">
            Gifters won&apos;t see this option.
          </Text>
        )}
      </BlockStack>
    </Card>
  );
}

/* ─── Preview row (compact tiles + fade) ─── */

function PreviewRow({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: 'relative',
        flex: 1,
        minWidth: 0,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 8,
          alignItems: 'center',
        }}
      >
        {children}
      </div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          width: 56,
          background:
            'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,1) 80%)',
          pointerEvents: 'none',
        }}
        aria-hidden
      />
    </div>
  );
}

function MiniThemeTile({ theme }: { theme: Theme }) {
  return (
    <div
      title={theme.name}
      style={{
        position: 'relative',
        width: 64,
        height: 48,
        flexShrink: 0,
        borderRadius: 8,
        background: theme.preview,
        border: '1px solid var(--p-color-border)',
        overflow: 'hidden',
      }}
    >
      <PlayBadge />
    </div>
  );
}

function PlayBadge({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  const dim = size === 'md' ? 24 : 14;
  const icon = size === 'md' ? 11 : 7;
  const offset = size === 'md' ? 8 : 4;
  return (
    <div
      style={{
        position: 'absolute',
        bottom: offset,
        right: offset,
        width: dim,
        height: dim,
        borderRadius: '50%',
        background: 'rgba(0, 0, 0, 0.55)',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
      }}
      aria-hidden
    >
      <svg width={icon} height={icon} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    </div>
  );
}

function MiniPosterTile({ poster }: { poster: Poster }) {
  return (
    <div
      title={poster.title.replace('\n', ' ')}
      style={{
        width: 40,
        height: 56,
        flexShrink: 0,
        borderRadius: 6,
        background: poster.bg,
        color: poster.color,
        border: '1px solid var(--p-color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        overflow: 'hidden',
      }}
    >
      <span
        style={{
          fontSize: 6.5,
          lineHeight: 1.05,
          textAlign: 'center',
          whiteSpace: 'pre-line',
          fontFamily: poster.fontFamily ?? '-apple-system, sans-serif',
          fontStyle: poster.fontStyle ?? 'normal',
          textTransform: poster.textTransform,
          fontWeight: 700,
        }}
      >
        {poster.title}
      </span>
    </div>
  );
}

/* ─── Modals ─── */

type LibraryItem = { id: string; name: string; render: React.ReactNode };

function LibraryModal({
  open,
  onClose,
  title,
  uploadLabel,
  uploadHint,
  items,
  selected,
  setSelected,
  uploads,
  tileAspect = '4 / 3',
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  uploadLabel: string;
  uploadHint: string;
  items: LibraryItem[];
  selected: Set<string>;
  setSelected: (s: Set<string>) => void;
  uploads: Upload[];
  tileAspect?: string;
}) {
  const allSelected = items.every((i) => selected.has(i.id));

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      primaryAction={{ content: 'Save', onAction: onClose }}
      secondaryActions={[{ content: 'Cancel', onAction: onClose }]}
      size="large"
    >
      <Modal.Section>
        <BlockStack gap="500">
          {/* Upload affordance */}
          <Box
            background="bg-surface-secondary"
            borderRadius="200"
            borderWidth="025"
            borderColor="border"
            padding="400"
          >
            <InlineStack align="space-between" blockAlign="center" gap="400" wrap={false}>
              <BlockStack gap="050">
                <Text as="p" variant="bodyMd" fontWeight="semibold">{uploadLabel}</Text>
                <Text as="p" variant="bodySm" tone="subdued">{uploadHint}</Text>
              </BlockStack>
              <Button icon={PlusIcon}>Upload</Button>
            </InlineStack>
          </Box>

          {/* Library grid */}
          <BlockStack gap="300">
            <InlineStack align="space-between" blockAlign="center" gap="200" wrap={false}>
              <Text as="h3" variant="headingSm">Library</Text>
              <InlineStack gap="200" blockAlign="center">
                <Text as="span" variant="bodySm" tone="subdued">
                  {selected.size} of {items.length} selected
                </Text>
                <Button
                  variant="plain"
                  onClick={() =>
                    setSelected(allSelected ? new Set() : new Set(items.map((i) => i.id)))
                  }
                >
                  {allSelected ? 'Deselect all' : 'Select all'}
                </Button>
              </InlineStack>
            </InlineStack>
            <InlineGrid gap="300" columns={4}>
              {items.map((item) => (
                <LibraryTile
                  key={item.id}
                  item={item}
                  selected={selected.has(item.id)}
                  onToggle={() => toggleSet(selected, item.id, setSelected)}
                  aspect={tileAspect}
                />
              ))}
            </InlineGrid>
          </BlockStack>

          {/* Custom uploads */}
          <BlockStack gap="200">
            <Text as="h3" variant="headingSm">
              Your uploads ({uploads.length})
            </Text>
            {uploads.length === 0 ? (
              <Box
                borderRadius="200"
                borderWidth="025"
                borderColor="border"
                padding="400"
              >
                <Text as="p" variant="bodySm" tone="subdued" alignment="center">
                  No uploads yet. Use the upload area above to add your own.
                </Text>
              </Box>
            ) : (
              <Text as="p" variant="bodySm" tone="subdued">
                {uploads.length} custom item{uploads.length === 1 ? '' : 's'}
              </Text>
            )}
          </BlockStack>
        </BlockStack>
      </Modal.Section>
    </Modal>
  );
}

function GifsModal({
  open,
  onClose,
  allowGiphy,
  setAllowGiphy,
  allowUploads,
  setAllowUploads,
  uploads,
}: {
  open: boolean;
  onClose: () => void;
  allowGiphy: boolean;
  setAllowGiphy: (v: boolean) => void;
  allowUploads: boolean;
  setAllowUploads: (v: boolean) => void;
  uploads: Upload[];
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit GIFs"
      primaryAction={{ content: 'Save', onAction: onClose }}
      secondaryActions={[{ content: 'Cancel', onAction: onClose }]}
    >
      <Modal.Section>
        <BlockStack gap="500">
          <BlockStack gap="200">
            <Text as="h3" variant="headingSm">Sources</Text>
            <Card padding="0">
              <Box padding="400">
                <InlineStack align="space-between" blockAlign="center" gap="400" wrap={false}>
                  <BlockStack gap="050">
                    <Text as="p" variant="bodyMd" fontWeight="semibold">Giphy library</Text>
                    <Text as="p" variant="bodySm" tone="subdued">
                      Let gifters search Giphy and add an animated GIF.
                    </Text>
                  </BlockStack>
                  <Toggle on={allowGiphy} onToggle={() => setAllowGiphy(!allowGiphy)} showLabel />
                </InlineStack>
              </Box>
              <Divider />
              <Box padding="400">
                <InlineStack align="space-between" blockAlign="center" gap="400" wrap={false}>
                  <BlockStack gap="050">
                    <Text as="p" variant="bodyMd" fontWeight="semibold">Custom uploads</Text>
                    <Text as="p" variant="bodySm" tone="subdued">
                      Let gifters use the GIFs you upload below.
                    </Text>
                  </BlockStack>
                  <Toggle on={allowUploads} onToggle={() => setAllowUploads(!allowUploads)} showLabel />
                </InlineStack>
              </Box>
            </Card>
          </BlockStack>

          <BlockStack gap="200">
            <InlineStack align="space-between" blockAlign="center" gap="200" wrap={false}>
              <Text as="h3" variant="headingSm">
                Your uploads ({uploads.length})
              </Text>
              <Button icon={PlusIcon}>Upload GIF</Button>
            </InlineStack>
            {uploads.length === 0 ? (
              <Box
                borderRadius="200"
                borderWidth="025"
                borderColor="border"
                padding="400"
              >
                <Text as="p" variant="bodySm" tone="subdued" alignment="center">
                  No uploads yet. Click Upload GIF to add your own.
                </Text>
              </Box>
            ) : (
              <BlockStack gap="200">
                {uploads.map((u) => (
                  <InlineStack key={u.id} align="space-between" blockAlign="center">
                    <Text as="span" variant="bodySm">{u.name}</Text>
                    <Button icon={DeleteIcon} variant="plain" />
                  </InlineStack>
                ))}
              </BlockStack>
            )}
          </BlockStack>
        </BlockStack>
      </Modal.Section>
    </Modal>
  );
}

/* ─── Tile components inside modal ─── */

function LibraryTile({
  item,
  selected,
  onToggle,
  aspect,
}: {
  item: LibraryItem;
  selected: boolean;
  onToggle: () => void;
  aspect: string;
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
            aspectRatio: aspect,
            borderRadius: 10,
            outline: selected
              ? '2px solid var(--p-color-border-emphasis)'
              : '1px solid var(--p-color-border)',
            outlineOffset: selected ? 2 : 0,
            opacity: selected ? 1 : 0.4,
            transition: 'opacity 120ms ease',
            overflow: 'hidden',
          }}
        >
          {item.render}
          {selected && <CheckBadge />}
        </div>
        <Text as="span" variant="bodySm" fontWeight={selected ? 'semibold' : 'regular'}>
          {item.name}
        </Text>
      </BlockStack>
    </button>
  );
}

function PosterFace({ poster }: { poster: Poster }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: poster.bg,
        color: poster.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 10,
      }}
    >
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
  );
}

/* ─── Font pill ─── */

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

/* ─── Shared primitives ─── */

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
