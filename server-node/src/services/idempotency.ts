type CachedOrder = {
  id: string;
  status: string;
  expiresAt: number;
};

const cache = new Map<string, CachedOrder>();
const TTL_MS = 24 * 60 * 60 * 1000;

export function rememberOrder(key: string, order: { id: string; status: string }) {
  cache.set(key, { ...order, expiresAt: Date.now() + TTL_MS });
}

export function findRememberedOrder(key: string): { id: string; status: string } | null {
  const cached = cache.get(key);
  if (!cached) {
    return null;
  }
  if (cached.expiresAt <= Date.now()) {
    cache.delete(key);
    return null;
  }
  return { id: cached.id, status: cached.status };
}
