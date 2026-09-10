// Portable, device-local documents. UI state never enters a saved project.
const KEYS = ['canvasIdx', 'catIdx', 'varIdx', 'modeIdx', 'fontIdx', 'copy', 'titleScale', 'subScale', 'photoZoom', 'grayPhoto', 'grainOn', 'grainAmt', 'grainSize', 'exportScale', 'locks', 'photoOff', 'elemOff', 'extraElems'];
export const LIMITS = { photos: 8, fileBytes: 12 * 1024 * 1024, totalBytes: 32 * 1024 * 1024, pixels: 40000000, favorites: 12 };
export const uid = () => globalThis.crypto?.randomUUID?.() || Date.now().toString(36) + Math.random().toString(36).slice(2);

export function snapshot(state) {
  const doc = {};
  for (const key of KEYS) if (state[key] !== undefined) doc[key] = state[key];
  // Images are immutable: retain their strings without duplicating them for every edit.
  return { ...JSON.parse(JSON.stringify(doc)), photos: (state.photos || []).slice() };
}

function fingerprint(doc) {
  const { photos, ...rest } = doc;
  return JSON.stringify({ ...rest, photos: photos.map((p) => p.id || p.full) });
}

export class History {
  constructor(state) { this.entries = [snapshot(state)]; this.index = 0; this.group = null; this.at = 0; }
  get canUndo() { return this.index > 0; }
  get canRedo() { return this.index < this.entries.length - 1; }
  record(state, group = null, now = Date.now()) {
    const doc = snapshot(state);
    if (fingerprint(doc) === fingerprint(this.entries[this.index])) return false;
    const merge = group && group === this.group && now - this.at < 800 && !this.canRedo && this.index > 0;
    this.entries = this.entries.slice(0, this.index + 1);
    if (merge) this.entries[this.index] = doc;
    else { this.entries.push(doc); this.index++; }
    if (this.entries.length > 51) { this.entries.shift(); this.index--; }
    this.group = group; this.at = now;
    return true;
  }
  undo() { if (!this.canUndo) return null; this.group = null; return snapshot(this.entries[--this.index]); }
  redo() { if (!this.canRedo) return null; this.group = null; return snapshot(this.entries[++this.index]); }
}

const object = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const number = (v, low, high, fallback) => typeof v === 'number' && Number.isFinite(v) ? Math.max(low, Math.min(high, v)) : fallback;
const index = (v, count) => Math.floor(number(v, 0, Math.max(0, count - 1), 0));
const dataImage = (v) => typeof v === 'string' && /^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(v);

export function sanitizeDocument(value, defaults, data) {
  if (!object(value)) throw new Error('這個檔案不是有效的 TYPESET 草稿。');
  const doc = snapshot(defaults);
  const counts = { canvasIdx: data.CANVASES.length, catIdx: data.CATEGORIES.length, modeIdx: data.MODES.length, fontIdx: data.FONTS.length };
  for (const [key, count] of Object.entries(counts)) doc[key] = index(value[key] ?? doc[key], count);
  doc.varIdx = index(value.varIdx, data.CATEGORIES[doc.catIdx].variants.length);
  doc.copy = {};
  for (const key of ['e', 't', 's', 'd', 'i']) doc.copy[key] = typeof value.copy?.[key] === 'string' ? value.copy[key].slice(0, 2000) : (defaults.copy[key] || '');
  for (const [key, lo, hi] of [['titleScale', 0.6, 1.6], ['subScale', 0.7, 1.5], ['photoZoom', 1, 2.2], ['grainAmt', 0.05, 0.8], ['grainSize', 0.4, 1.2], ['exportScale', 1, 3]]) doc[key] = number(value[key], lo, hi, doc[key]);
  doc.exportScale = Math.round(doc.exportScale);
  for (const key of ['grayPhoto', 'grainOn']) if (typeof value[key] === 'boolean') doc[key] = value[key];
  doc.locks = { layout: value.locks?.layout === true, font: value.locks?.font === true, copy: false };
  const offsets = (input) => Object.fromEntries(Object.entries(object(input) ? input : {}).filter(([k, v]) => /^\d{1,3}$/.test(k) && object(v)).slice(0, 200).map(([k, v]) => [k, { x: number(v.x, -10000, 10000, 0), y: number(v.y, -10000, 10000, 0) }]));
  doc.photoOff = offsets(value.photoOff); doc.elemOff = offsets(value.elemOff);
  const frames = data.CATEGORIES[doc.catIdx].variants[doc.varIdx].frames(data.CANVASES[doc.canvasIdx].w, data.CANVASES[doc.canvasIdx].h);
  doc.extraElems = (Array.isArray(value.extraElems) ? value.extraElems : []).filter((v) => object(v) && Number.isInteger(v.srcKey) && frames[v.srcKey] && frames[v.srcKey].kind !== 'image').slice(0, 100).map((v) => ({ srcKey: v.srcKey, off: { x: number(v.off?.x, -10000, 10000, 0), y: number(v.off?.y, -10000, 10000, 0) } }));
  const photos = value.photos || [];
  if (!Array.isArray(photos) || photos.length > LIMITS.photos) throw new Error('草稿最多可包含 8 張照片。');
  let total = 0;
  doc.photos = photos.map((p) => {
    if (!object(p) || !dataImage(p.full) || !dataImage(p.preview) || !Number.isInteger(p.nw) || !Number.isInteger(p.nh) || !(p.nw > 0 && p.nh > 0 && p.nw * p.nh <= LIMITS.pixels)) throw new Error('草稿包含不支援或損壞的照片。');
    total += Math.ceil(p.full.length * 0.75);
    if (total > LIMITS.totalBytes * 1.01 || p.preview.length > 8 * 1024 * 1024) throw new Error('草稿照片總量超過 32 MB，請減少照片後再試。');
    return { id: typeof p.id === 'string' ? p.id.slice(0, 100) : uid(), full: p.full, preview: p.preview, nw: Math.round(p.nw), nh: Math.round(p.nh), bytes: Math.ceil(p.full.length * 0.75) };
  });
  return doc;
}

// Store images once even when several saved versions share them.
export function packProject(current, favorites = []) {
  const assets = Object.create(null);
  const pack = (value) => {
    const doc = snapshot(value);
    const photoIds = doc.photos.map((p) => { const id = p.id || uid(); assets[id] = { ...p, id }; return id; });
    delete doc.photos;
    return { ...doc, photoIds };
  };
  const document = pack(current);
  const saved = favorites.map((f) => ({ id: f.id, name: f.name, document: pack(f.document) }));
  const assetSize = Object.values(assets).reduce((n, p) => n + p.full.length + p.preview.length, 0);
  if (assetSize > 94 * 1024 * 1024) throw new Error('照片與收藏的總量已滿。請先備份草稿，再取消部分收藏或移除照片。');
  return { format: 'typeset-project', version: 1, savedAt: new Date().toISOString(), document, favorites: saved, assets };
}

export function unpackProject(project, defaults, data) {
  if (project?.format !== 'typeset-project' || project.version !== 1 || !object(project.assets) || !Array.isArray(project.favorites) || project.favorites.length > LIMITS.favorites) throw new Error('請選擇 TYPESET 匯出的草稿檔案。');
  const unpack = (value) => {
    if (!object(value) || !Array.isArray(value.photoIds) || value.photoIds.length > LIMITS.photos) throw new Error('草稿資料不完整。');
    const photos = value.photoIds.map((id) => Object.hasOwn(project.assets, id) ? project.assets[id] : null);
    return sanitizeDocument({ ...value, photos }, defaults, data);
  };
  return { document: unpack(project.document), favorites: project.favorites.map((f) => ({ id: uid(), name: String(f.name || '收藏版本').slice(0, 80), document: unpack(f.document) })) };
}

export class DraftStore {
  async open() {
    if (this.db) return this.db;
    if (!globalThis.indexedDB) throw new Error('此瀏覽器無法自動儲存，請下載草稿備份。');
    this.db = await new Promise((resolve, reject) => {
      const req = indexedDB.open('typeset-studio', 1);
      req.onupgradeneeded = () => req.result.createObjectStore('drafts');
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
      req.onblocked = () => reject(new Error('請關閉其他 TYPESET 分頁後再試。'));
    });
    this.db.onversionchange = () => { this.db.close(); this.db = null; };
    return this.db;
  }
  async read() {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const req = db.transaction('drafts', 'readonly').objectStore('drafts').get('current');
      req.onsuccess = () => resolve(req.result || null); req.onerror = () => reject(req.error);
    });
  }
  async write(project) {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('drafts', 'readwrite');
      tx.objectStore('drafts').put(project, 'current');
      tx.oncomplete = () => resolve(); tx.onerror = () => reject(tx.error); tx.onabort = () => reject(tx.error || new Error('儲存中斷'));
    });
  }
}
