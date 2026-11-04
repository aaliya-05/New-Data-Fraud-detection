import addons from '@/data/addonNames.json';

type Addon = { name: string; description: string; validityDays: number };

const ADDONS = addons as Record<string, Addon>;

// Case-insensitive lookup so a stray casing difference in the source data still resolves.
const ADDONS_LOWER = new Map(Object.entries(ADDONS).map(([id, a]) => [id.toLowerCase(), a]));

// The usage datasets append the traffic bucket to the add-on id (e.g. "ADDON 10_PDL").
const BUCKET_SUFFIX = /_(PDL|PUL|OPDL|OPUL)$/i;

export function findAddon(code: string): Addon | undefined {
  const c = code.trim().toLowerCase();
  return ADDONS_LOWER.get(c) ?? ADDONS_LOWER.get(c.replace(BUCKET_SUFFIX, ''));
}

/** Friendly package name for a raw code; the code itself when it is not in the add-on list. */
export function friendlyPackageName(code: string): string {
  return findAddon(code)?.name ?? code;
}

/** Name to show for a code, switching to the raw code when `raw` is set. */
export function displayPackageName(code: string, raw = false): string {
  return raw ? code : friendlyPackageName(code);
}

/** Tooltip text with the raw code and add-on details, or undefined for unmapped codes. */
export function packageDetails(code: string): string | undefined {
  const a = findAddon(code);
  if (!a) return undefined;
  const validity = a.validityDays > 0 ? `${a.validityDays} day${a.validityDays === 1 ? '' : 's'}` : 'n/a';
  return `${code} · ${a.description} · validity ${validity}`;
}

/**
 * Label function for a set of package codes (a chart axis, a dropdown). Two
 * add-ons can share a friendly name, so a duplicate gets its code appended.
 */
export function makeLabeler(codes: string[], raw = false): (code: string) => string {
  if (raw) return (code) => code;
  const seen = new Map<string, number>();
  for (const c of new Set(codes)) {
    const n = friendlyPackageName(c);
    seen.set(n, (seen.get(n) ?? 0) + 1);
  }
  return (code) => {
    const n = friendlyPackageName(code);
    return (seen.get(n) ?? 0) > 1 ? `${n} (${code})` : n;
  };
}

type TooltipParam = { axisValueLabel?: string; marker?: string; seriesName?: string; value?: unknown };

/** Axis tooltip that runs the package header and/or series names through `label`. */
export function axisTooltipFormatter(opts: {
  headerLabel?: (v: string) => string;
  seriesLabel?: (v: string) => string;
  unit?: string;
}) {
  return (params: TooltipParam | TooltipParam[]) => {
    const list = Array.isArray(params) ? params : [params];
    if (list.length === 0) return '';
    const head = list[0].axisValueLabel ?? '';
    const lines = list.map((p) => {
      const name = opts.seriesLabel ? opts.seriesLabel(p.seriesName ?? '') : p.seriesName ?? '';
      const val = typeof p.value === 'number' ? `${p.value.toFixed(3)}${opts.unit ? ` ${opts.unit}` : ''}` : String(p.value ?? '');
      return `${p.marker ?? ''} ${name}: <b>${val}</b>`;
    });
    return `${opts.headerLabel ? opts.headerLabel(head) : head}<br/>${lines.join('<br/>')}`;
  };
}
