type EventName = 'view_home' | 'view_cafe_detail' | 'reserve_click' | 'slot_select';

function keyFor(name: EventName) {
  return `station:${name}:count`;
}

export function track(name: EventName, metadata?: Record<string, unknown>) {
  try {
    const key = keyFor(name);
    const current = Number(localStorage.getItem(key) ?? '0');
    localStorage.setItem(key, String(current + 1));
    // eslint-disable-next-line no-console
    console.log('[track]', name, { count: current + 1, ...metadata });
  } catch {
    // Ignore tracking errors in MVP
  }
}
