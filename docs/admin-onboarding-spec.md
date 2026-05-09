# Giftwell Admin Onboarding — Direction Spec

**For:** Gustavo
**From:** Brandon
**Re:** Restyling onboarding to fit Alia's Shopify-native pattern

---

## TL;DR

Keep every question and tile-picker from the existing 10-step Figma wizard. **Don't keep the wizard chrome.** Reframe the whole thing as a single inline announcement-card pinned at the top of the merchant home — modeled on Alia's "Introducing Prism AI" hero card.

Non-blocking. Dismissible. Resumable. Native to Polaris and the Shopify admin frame.

---

## Why this pattern

- Same "don't block the buyer" philosophy applied to the merchant: don't trap them in a takeover wizard
- One pattern to build instead of a parallel wizard surface
- Lives alongside the dashboard so merchants can poke around while setting up
- Matches what Alia already does — feels native, not like a plugin

---

## Pattern anatomy

```
┌─ Polaris Page ──────────────────────────────────────────────┐
│                                                             │
│  ┌─ Onboarding Card ─────────────────────────────────────┐  │
│  │  ●●●○○○○○○○   ← progress dots, one per frame         │  │
│  │                                                       │  │
│  │  Step 2 of 10                                         │  │
│  │  Catalog setup                                        │  │
│  │  What products can gifters choose from?               │  │
│  │                                                       │  │
│  │  [ tile picker / form fields for this frame ]         │  │
│  │                                                       │  │
│  │  Skip setup              ← Back     Continue →        │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─ Analytics ──────────────────────────────────────────┐   │
│  │  (regular dashboard below)                            │   │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Rules

**Keep:**
- All question content (goals / buyer status / volume / catalog approach / fee handling / branding / integrations / opt-in / etc.)
- Tile-picker pattern with title + helper + optional `Most common` / `Recommended` Polaris `Badge`
- "Skip for now" escape hatch, present from frame 1
- Final "You're live" success state with share URL + next-step links

**Kill:**
- Dark device-frame wrapper (Shopify's chrome already wraps us)
- Custom left-rail step sidebar (the dot indicator at top of the card replaces it)
- Stacked tinted callouts (no `Pro tip` / `growth engine` / 💰 / 💡 boxes — replace with inline subdued text where it actually adds info)
- Live-preview pane pinned to every frame (only Branding gets a preview, opened in a Polaris `Modal` or side `Sheet` on demand)
- Emoji in titles
- Gradient launch button (final CTA is a normal `Button variant="primary"`)
- Two flow variants — pick the 10-step version. Don't ship 12.

---

## Frame-by-frame content (keep all of this from the Figma)

| # | Frame | Inputs |
|---|-------|--------|
| 1 | Welcome & Goals | Goals (multi-tile), Buyer status (single-tile), Monthly volume (single-tile, "Most common" badge on 50–200) |
| 2 | Catalog | Approach picker (Full / Curated `Recommended` / Both) → if Curated/Both: bundle builder with product grid + sticky "N products selected" footer |
| 3 | Pricing & Fees | Fee handling (Pass `Recommended for DTC` / Absorb / Split 50/50), Volume discount tiers (repeatable rows), live order preview as a right-side `Card` *only on this frame* (it's load-bearing for the decision) |
| 4 | Branding | Brand name + logo (pre-filled from Shopify theme, editable), primary/secondary colors, background (Library / Upload / AI Generate), Effects & Particles. Live phone preview opens in a `Modal` via "Preview gift page" button |
| 5 | Integrations | Klaviyo / Mailchimp / Omnisend rows. Connect → opens config inline below the row (don't navigate away) |
| 6 | Recipient Marketing Opt-in | Enable toggle, where to show (Claim Form / Unwrapping Page), checkbox copy, EU double opt-in, privacy URL, post-opt-in actions (Klaviyo list / tags / welcome flow) |
| 7 | Landing Page | Slug (`{store}.com/gift`), add to nav/footer toggles |
| 8 | Support | Giftwell concierge enable toggle |
| 9 | Review | Green-check summary list of what's configured. `Preview gift page` / `Send test gift` / `Preview recipient email` buttons |
| 10 | Launch | "You're live!" state with copyable URL, `Open Gift Page` + `Go to Dashboard`, three next-step cards (Book strategy call / Ads playbook / Slack community) |

---

## States

1. **In progress** — onboarding card sits at top of merchant home. Persists across sessions.
2. **Dismissed (Skip setup)** — card collapses to a Polaris `Banner tone="info"`: "You're 30% through setup — Resume". Clicking re-expands the card to the last visited frame.
3. **Complete** — card shows the "You're live" success frame for the rest of the session, then is replaced by a normal dashboard on next load. A small "Setup complete ✓" entry appears in Settings → Onboarding for re-access.

---

## Code

Polaris-based. Drop into the admin app. Built around three pieces:

1. `OnboardingCard` — the shell with progress + frame switcher + footer
2. `TilePicker` — the reusable single/multi-select tile component (used in 6 of 10 frames)
3. `FrameWelcome` — one representative frame; the rest follow the same pattern

### `OnboardingCard.tsx`

```tsx
import { useState } from 'react';
import {
  Card,
  Box,
  BlockStack,
  InlineStack,
  Text,
  Button,
} from '@shopify/polaris';
import { FrameWelcome } from './frames/FrameWelcome';
import { FrameCatalog } from './frames/FrameCatalog';
import { FramePricing } from './frames/FramePricing';
import { FrameBranding } from './frames/FrameBranding';
import { FrameIntegrations } from './frames/FrameIntegrations';
import { FrameOptIn } from './frames/FrameOptIn';
import { FrameLandingPage } from './frames/FrameLandingPage';
import { FrameSupport } from './frames/FrameSupport';
import { FrameReview } from './frames/FrameReview';
import { FrameLaunched } from './frames/FrameLaunched';

const FRAMES = [
  { id: 'welcome',      label: 'Welcome',      title: 'Welcome to Giftwell',          subtitle: "Let's get your corporate gifting set up. Takes about 10 minutes.", Component: FrameWelcome },
  { id: 'catalog',      label: 'Catalog',      title: 'What products can gifters choose from?', subtitle: null, Component: FrameCatalog },
  { id: 'pricing',      label: 'Pricing',      title: 'How should pricing work?',     subtitle: 'Configure the experience fee and volume discounts', Component: FramePricing },
  { id: 'branding',     label: 'Branding',     title: 'Customize the gift experience', subtitle: 'Your colors, your logo, your vibe',          Component: FrameBranding },
  { id: 'integrations', label: 'Integrations', title: 'Connect your tools',           subtitle: 'Sync gift data with your email and CRM',     Component: FrameIntegrations },
  { id: 'optin',        label: 'Marketing',    title: 'Turn gift recipients into customers', subtitle: 'Configure the marketing opt-in shown during the gift experience', Component: FrameOptIn },
  { id: 'landing',      label: 'Landing Page', title: 'Your gift page',               subtitle: null,                                          Component: FrameLandingPage },
  { id: 'support',      label: 'Support',      title: 'Concierge support',            subtitle: null,                                          Component: FrameSupport },
  { id: 'review',       label: 'Review',       title: 'Almost there! Review your setup', subtitle: 'Make sure everything looks good before going live', Component: FrameReview },
  { id: 'launched',     label: 'Launch',       title: "You're live!",                 subtitle: null,                                          Component: FrameLaunched },
] as const;

type Answers = Record<string, unknown>;

export function OnboardingCard({
  initialStep = 0,
  initialAnswers = {},
  onSave,
  onSkip,
  onComplete,
}: {
  initialStep?: number;
  initialAnswers?: Answers;
  onSave: (answers: Answers, step: number) => Promise<void>;
  onSkip: () => void;
  onComplete: (answers: Answers) => Promise<void>;
}) {
  const [step, setStep] = useState(initialStep);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);

  const frame = FRAMES[step];
  const Frame = frame.Component;
  const isLast = step === FRAMES.length - 1;
  const isLaunchStep = frame.id === 'review';

  const patch = (next: Answers) => setAnswers((a) => ({ ...a, ...next }));

  const handleContinue = async () => {
    if (isLaunchStep) {
      await onComplete(answers);
      setStep(step + 1); // advance to "launched" success frame
      return;
    }
    await onSave(answers, step + 1);
    setStep(Math.min(step + 1, FRAMES.length - 1));
  };

  return (
    <Card>
      <BlockStack gap="500">
        <ProgressDots total={FRAMES.length} current={step} />

        <BlockStack gap="200">
          <Text tone="subdued" variant="bodySm" as="p">
            Step {step + 1} of {FRAMES.length} — {frame.label}
          </Text>
          <Text variant="headingLg" as="h2">{frame.title}</Text>
          {frame.subtitle && <Text tone="subdued" as="p">{frame.subtitle}</Text>}
        </BlockStack>

        <Frame answers={answers} onChange={patch} />

        {frame.id !== 'launched' && (
          <InlineStack align="space-between" blockAlign="center">
            <Button variant="plain" onClick={onSkip}>Skip setup</Button>
            <InlineStack gap="200">
              {step > 0 && (
                <Button onClick={() => setStep(step - 1)}>Back</Button>
              )}
              <Button variant="primary" onClick={handleContinue}>
                {isLaunchStep ? 'Launch gift page' : 'Continue'}
              </Button>
            </InlineStack>
          </InlineStack>
        )}
      </BlockStack>
    </Card>
  );
}

function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <InlineStack gap="100">
      {Array.from({ length: total }).map((_, i) => (
        <Box
          key={i}
          minHeight="4px"
          width="100%"
          borderRadius="050"
          background={i <= current ? 'bg-fill-emphasis' : 'bg-surface-secondary'}
        />
      ))}
    </InlineStack>
  );
}
```

### `TilePicker.tsx` — the reusable building block

Used by Welcome, Catalog approach, Pricing fee, Opt-in placement, etc.

```tsx
import {
  Box,
  InlineGrid,
  BlockStack,
  Text,
  Badge,
  Icon,
} from '@shopify/polaris';
import { CheckIcon } from '@shopify/polaris-icons';

type TileOption = {
  id: string;
  title: string;
  description?: string;
  badge?: string;
  badgeTone?: 'success' | 'attention' | 'info';
};

type Props =
  | { mode: 'single'; options: TileOption[]; value: string | null; onChange: (id: string) => void; columns?: number }
  | { mode: 'multi';  options: TileOption[]; value: string[];      onChange: (ids: string[]) => void; columns?: number };

export function TilePicker(props: Props) {
  const { mode, options, columns = options.length } = props;
  const isSelected = (id: string) =>
    mode === 'multi' ? props.value.includes(id) : props.value === id;

  const toggle = (id: string) => {
    if (mode === 'multi') {
      const next = isSelected(id)
        ? props.value.filter((v) => v !== id)
        : [...props.value, id];
      props.onChange(next);
    } else {
      props.onChange(id);
    }
  };

  return (
    <InlineGrid gap="300" columns={{ xs: 1, sm: 2, md: columns }}>
      {options.map((opt) => {
        const selected = isSelected(opt.id);
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => toggle(opt.id)}
            aria-pressed={selected}
            style={{ all: 'unset', cursor: 'pointer', display: 'block', height: '100%' }}
          >
            <Box
              padding="400"
              borderRadius="200"
              borderWidth="025"
              borderColor={selected ? 'border-emphasis' : 'border'}
              background={selected ? 'bg-surface-selected' : 'bg-surface'}
              minHeight="100%"
              position="relative"
            >
              <BlockStack gap="200">
                <BlockStack gap="050">
                  <Text variant="bodyMd" fontWeight="semibold" as="p">
                    {opt.title}
                  </Text>
                  {opt.description && (
                    <Text tone="subdued" as="p">{opt.description}</Text>
                  )}
                </BlockStack>
                {opt.badge && (
                  <Box>
                    <Badge tone={opt.badgeTone ?? 'success'}>{opt.badge}</Badge>
                  </Box>
                )}
              </BlockStack>

              {selected && (
                <Box position="absolute" insetBlockStart="200" insetInlineEnd="200">
                  <Icon source={CheckIcon} tone="emphasis" />
                </Box>
              )}
            </Box>
          </button>
        );
      })}
    </InlineGrid>
  );
}
```

### `FrameWelcome.tsx` — pattern for every frame

```tsx
import { BlockStack, Text } from '@shopify/polaris';
import { TilePicker } from '../TilePicker';

type Answers = {
  goals?: string[];
  buyerStatus?: string;
  volume?: string;
};

export function FrameWelcome({
  answers,
  onChange,
}: {
  answers: Answers;
  onChange: (patch: Partial<Answers>) => void;
}) {
  return (
    <BlockStack gap="500">
      <Question label="What are you hoping to achieve?" helper="Select all that apply">
        <TilePicker
          mode="multi"
          value={answers.goals ?? []}
          onChange={(goals) => onChange({ goals })}
          options={[
            { id: 'revenue',   title: 'Increase Revenue',   description: 'Drive high-value bulk orders from corporate buyers' },
            { id: 'customers', title: 'Acquire Customers',  description: 'Turn gift recipients into repeat customers' },
            { id: 'brand',     title: 'Brand Awareness',    description: 'Create memorable brand moments' },
          ]}
        />
      </Question>

      <Question label="Do you have corporate buyers already?">
        <TilePicker
          mode="single"
          value={answers.buyerStatus ?? null}
          onChange={(buyerStatus) => onChange({ buyerStatus })}
          options={[
            { id: 'waiting', title: 'Yes, waiting on me', description: 'Buyers ready to order once I set this up' },
            { id: 'some',    title: 'Some interest',       description: 'Had inquiries but no formal process' },
            { id: 'none',    title: 'Not yet',             description: 'Looking to capture this opportunity' },
          ]}
        />
      </Question>

      <Question label="Expected monthly volume?">
        <TilePicker
          mode="single"
          columns={4}
          value={answers.volume ?? null}
          onChange={(volume) => onChange({ volume })}
          options={[
            { id: 'lt50',    title: '< 50 gifts',     description: 'Just getting started' },
            { id: '50-200',  title: '50–200 gifts',   description: 'Growing demand', badge: 'Most common' },
            { id: '200-500', title: '200–500 gifts',  description: 'Established program' },
            { id: '500plus', title: '500+ gifts',     description: 'Enterprise scale' },
          ]}
        />
      </Question>
    </BlockStack>
  );
}

function Question({
  label,
  helper,
  children,
}: {
  label: string;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <BlockStack gap="300">
      <BlockStack gap="100">
        <Text variant="headingSm" as="h3">{label}</Text>
        {helper && <Text tone="subdued" as="p">{helper}</Text>}
      </BlockStack>
      {children}
    </BlockStack>
  );
}
```

### `ResumeSetupBanner.tsx` — dismissed state

Renders at top of admin home when the merchant clicked "Skip setup".

```tsx
import { Banner, Button, InlineStack, Text } from '@shopify/polaris';

export function ResumeSetupBanner({
  percentComplete,
  onResume,
  onDismiss,
}: {
  percentComplete: number;
  onResume: () => void;
  onDismiss: () => void;
}) {
  return (
    <Banner
      tone="info"
      title="Finish setting up your gift page"
      onDismiss={onDismiss}
    >
      <InlineStack gap="300" blockAlign="center" align="space-between">
        <Text as="p">
          You're {percentComplete}% through setup. Resume to launch your gift page.
        </Text>
        <Button onClick={onResume}>Resume setup</Button>
      </InlineStack>
    </Banner>
  );
}
```

### Page wiring (admin home)

```tsx
import { Page, BlockStack } from '@shopify/polaris';
import { OnboardingCard } from './OnboardingCard';
import { ResumeSetupBanner } from './ResumeSetupBanner';
import { Dashboard } from './Dashboard';

export function AdminHome({ onboarding, dashboard, api }) {
  // onboarding: { status: 'in_progress' | 'dismissed' | 'complete', step, answers }
  return (
    <Page>
      <BlockStack gap="400">
        {onboarding.status === 'in_progress' && (
          <OnboardingCard
            initialStep={onboarding.step}
            initialAnswers={onboarding.answers}
            onSave={api.saveOnboarding}
            onSkip={api.dismissOnboarding}
            onComplete={api.completeOnboarding}
          />
        )}

        {onboarding.status === 'dismissed' && (
          <ResumeSetupBanner
            percentComplete={Math.round((onboarding.step / 10) * 100)}
            onResume={api.resumeOnboarding}
            onDismiss={api.hideResumeBanner}
          />
        )}

        <Dashboard data={dashboard} />
      </BlockStack>
    </Page>
  );
}
```

---

## Notes / open questions for Gustavo

- The Branding frame's phone preview should open in `Modal` size `large` rather than pin to the side of the card. Wire it to the same component the gifter-side claim flow renders so it's a real preview, not a static mock.
- Pricing frame's order calculator is the one place a side panel makes sense. Do it as an `InlineGrid columns={['twoThirds', 'oneThird']}` *inside that frame only* — not a global pattern.
- Persist `answers` to the existing onboarding state on every `Continue`. Don't wait for completion.
- Skip should NOT discard answers — it just hides the card. Resume picks up exactly where they left off.
- Final "Launched" frame replaces the card; on next session, hide the card entirely and surface re-access through Settings.
