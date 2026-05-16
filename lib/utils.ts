/**
 * Minimal class-name joiner. Same shape as the shadcn `cn` helper without
 * the clsx/tailwind-merge dependency tree, since we don't need conditional
 * variant merging in this project.
 */
export function cn(...args: Array<string | undefined | null | false | 0>): string {
  return args.filter(Boolean).join(' ');
}
