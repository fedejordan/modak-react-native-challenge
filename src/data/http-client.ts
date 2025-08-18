import { API_BASE_URL } from '@/config/env';

export const HTTPClient = async <T>(path: string): Promise<T> => {
  const url = `${API_BASE_URL}${path}`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status} ${res.statusText} — ${url} — ${text}`);
  }
  return (await res.json()) as T;
};
