/**
 * Compound Golden View - Suez | El Mandara Real Estate
 * GoldenViewStorage: Multi-Tier Persistent Storage Engine
 * Resolves localStorage 5MB Quota Limits via IndexedDB
 */

// Global image URL resolution with cache busting and placeholder protection
window.getGoldenViewImageUrl = function(src, updatedAt) {
  if (!src || typeof src !== 'string' || src.trim().startsWith('[')) {
    return 'public/images/project/شارع المجمع 2.png';
  }
  // Data URLs and Blobs don't need cache busting
  if (src.startsWith('data:') || src.startsWith('blob:')) {
    return src;
  }
  // Append cache busting parameter if updatedAt exists or if requested
  if (updatedAt) {
    const separator = src.includes('?') ? '&' : '?';
    return `${src}${separator}v=${updatedAt}`;
  }
  return src;
};

window.GoldenViewStorage = (function() {
  const DB_NAME = 'CompoundGoldenViewDB';
  const DB_VERSION = 1;
  let dbPromise = null;

  function openDB() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve) => {
      if (!window.indexedDB) {
        console.warn('[GoldenViewStorage] IndexedDB not available.');
        return resolve(null);
      }
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains('config_store')) {
          db.createObjectStore('config_store', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('media_store')) {
          db.createObjectStore('media_store', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('logo_store')) {
          db.createObjectStore('logo_store', { keyPath: 'id' });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => {
        console.error('[GoldenViewStorage] IndexedDB error:', req.error);
        resolve(null);
      };
    });
    return dbPromise;
  }

  async function set(storeName, item) {
    const db = await openDB();
    if (!db) return false;
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        store.put(item);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      } catch (err) {
        console.error(`[GoldenViewStorage] Put error in ${storeName}:`, err);
        resolve(false);
      }
    });
  }

  async function get(storeName, key) {
    const db = await openDB();
    if (!db) return null;
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const req = store.get(key);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      } catch (err) {
        resolve(null);
      }
    });
  }

  async function getAll(storeName) {
    const db = await openDB();
    if (!db) return [];
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => resolve([]);
      } catch (err) {
        resolve([]);
      }
    });
  }

  return {
    async saveConfig(cfg) {
      // 1. Save full authoritative config into IndexedDB (No 5MB quota limit!)
      const dbSuccess = await set('config_store', { id: 'current', data: cfg, updatedAt: Date.now() });

      // 2. Also persist individual media items in media_store so thumbnails are never lost
      if (cfg.gallery && Array.isArray(cfg.gallery)) {
        for (const item of cfg.gallery) {
          if (item && item.id && item.imageSrc && (item.imageSrc.startsWith('data:') || item.updatedAt)) {
            await set('media_store', {
              id: item.id,
              dataUrl: item.imageSrc,
              title: item.title,
              updatedAt: item.updatedAt || Date.now()
            });
          }
        }
      }

      // 3. Save to localStorage safely without corrupting imageSrc
      try {
        localStorage.setItem('GOLDEN_VIEW_CONFIG_STORAGE', JSON.stringify(cfg));
      } catch (e) {
        // If quota exceeded due to large base64, save a version without corrupting image paths
        try {
          const safeCopy = JSON.parse(JSON.stringify(cfg));
          // Do NOT replace imageSrc with technical placeholder strings!
          localStorage.setItem('GOLDEN_VIEW_CONFIG_STORAGE', JSON.stringify(safeCopy));
        } catch (_) {
          // IndexedDB has already persisted full data
        }
      }
      return dbSuccess;
    },

    async getConfig() {
      // Priority 1: IndexedDB (Authoritative, holds complete data URLs and edits)
      const res = await get('config_store', 'current');
      if (res && res.data) {
        const cfg = res.data;
        // Verify media items
        if (cfg.gallery && Array.isArray(cfg.gallery)) {
          for (let i = 0; i < cfg.gallery.length; i++) {
            const item = cfg.gallery[i];
            if (item && item.id && (!item.imageSrc || item.imageSrc.startsWith('['))) {
              const media = await get('media_store', item.id);
              if (media && media.dataUrl) {
                item.imageSrc = media.dataUrl;
              }
            }
          }
        }
        return cfg;
      }

      // Priority 2: LocalStorage fallback
      try {
        const raw = localStorage.getItem('GOLDEN_VIEW_CONFIG_STORAGE');
        if (raw) {
          const parsed = JSON.parse(raw);
          return parsed;
        }
      } catch (e) {}

      return null;
    },

    async saveImage(id, dataUrl, filename) {
      return await set('media_store', { id, dataUrl, filename, updatedAt: Date.now() });
    },

    async getImage(id) {
      const res = await get('media_store', id);
      return res ? res.dataUrl : null;
    },

    async getAllImages() {
      return await getAll('media_store');
    },

    async saveLogo(type, dataUrl, filename) {
      return await set('logo_store', { id: type, dataUrl, filename, updatedAt: Date.now() });
    },

    async getLogo(type) {
      const res = await get('logo_store', type);
      return res ? res.dataUrl : null;
    }
  };
})();

// Automatic Storage Hydration on Script Load
(async function() {
  try {
    if (window.GoldenViewStorage) {
      const savedConfig = await window.GoldenViewStorage.getConfig();
      if (savedConfig && typeof savedConfig === 'object') {
        window.GOLDEN_VIEW_CONFIG = Object.assign({}, window.GOLDEN_VIEW_CONFIG, savedConfig);
        if (savedConfig.gallery && Array.isArray(savedConfig.gallery)) {
          window.GOLDEN_VIEW_CONFIG.gallery = savedConfig.gallery;
        }
        if (savedConfig.socialMedia && typeof savedConfig.socialMedia === 'object') {
          window.GOLDEN_VIEW_CONFIG.socialMedia = savedConfig.socialMedia;
        }
      }

      const savedCompanyLogo = await window.GoldenViewStorage.getLogo('company');
      if (savedCompanyLogo) window.GOLDEN_VIEW_CONFIG.companyLogo = savedCompanyLogo;

      const savedProjectLogo = await window.GoldenViewStorage.getLogo('project');
      if (savedProjectLogo) window.GOLDEN_VIEW_CONFIG.projectLogo = savedProjectLogo;

      // Dispatch event for UI components to re-render if needed
      window.dispatchEvent(new CustomEvent('golden_view_config_ready', { detail: window.GOLDEN_VIEW_CONFIG }));
    }
  } catch (e) {
    console.warn('[GoldenView] Storage hydration warning:', e);
  }
})();
