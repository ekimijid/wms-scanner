

const CACHE_NAME = 'wms-cache';
export async function cacheable<T>(fn: () => Promise<T>, key: string, defaultValue: T) {
    let result;
    try {
        result = await fn();
        localStorage.setItem(key, JSON.stringify(result));
    } catch {
        const cached = localStorage.getItem(key);
        result = cached ? JSON.parse(cached) : defaultValue;
    }
    return result;
}
function getCache(): any {
    const cache = localStorage.getItem(CACHE_NAME) || '{}';
    return JSON.parse(cache);
}
export function clearCache() {
    localStorage.removeItem(CACHE_NAME);
}