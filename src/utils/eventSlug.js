// Stable per-event identifier derived from date + title, so share links
// and the ICS feed keep working even when sheet rows get reordered.
export function slugify(str) {
    return (str || '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export function makeEventSlug({ date, show_title, performers }) {
    const titlePart = show_title || (performers && performers[0]) || 'event';
    return `${date}-${slugify(titlePart)}`;
}
