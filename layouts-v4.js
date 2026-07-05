// ── Typeset generator v4 — 10 類別 × 5 變化版 = 50 版型 ──────────────
// 每個變化版對應參考圖資料夾中的一張實際海報。
// token：bg / fg / gray；文字角色：e, t, s, d, i。
// 擴充：在對應 category 的 variants 加一筆 {id,name,desc,frames(W,H)}。

export const CANVASES = [
  { id: 'a4', name: 'A4 直式', w: 1000, h: 1414 },
  { id: 'sq', name: '正方形', w: 1080, h: 1080 },
  { id: '45', name: '4:5 直式', w: 1080, h: 1350 },
  { id: '916', name: '9:16 直式', w: 1080, h: 1920 },
  { id: '169', name: '16:9 橫式', w: 1600, h: 900 },
];

// ── 小工具 ──
const K = (W, H, t) => {
  const S = Math.min(W, H);
  return { S, m: S * 0.07, TS: S * 0.072 * (t || 1), SS: S * 0.024, DS: S * 0.032, ES: S * 0.018 };
};
const txt = (role, x, y, w, h, size, color, o) => ({ kind: 'text', role, x, y, w, h, size, color, ...(o || {}) });
const tt = (x, y, w, h, size, color, o) => txt('t', x, y, w, h, size, color, { weight: 700, lh: 1.08, ...(o || {}) });
const eb = (x, y, w, size, color, o) => txt('e', x, y, w, size * 1.6, size, color, { ls: 2.5, weight: 700, ...(o || {}) });
const sub = (x, y, w, h, size, color, o) => txt('s', x, y, w, h, size, color, { lh: 1.55, ...(o || {}) });
const di = (x, y, w, DS, ES, color, o) => [
  txt('d', x, y, w, DS * 1.5, DS, color, { weight: 700, ls: 1, ...(o || {}) }),
  txt('i', x, y + DS * 1.9, w, ES * 1.6, ES, color, { ls: 1, ...(o || {}) }),
];
const img = (x, y, w, h, clip, o) => ({ kind: 'image', x, y, w, h, clip: clip || 'rect', ...(o || {}) });
const sh = (shape, o) => ({ kind: 'shape', shape, ...o });
// 文字繞路徑重複（role 預設 e，因為是邊框裝飾文字）
const pt = (shape, x, y, w, h, size, color, o) => ({ kind: 'text', role: (o && o.role) || 'e', x, y, w, h, size, color, weight: 700, ls: 1, pathLoop: { shape, x, y, w, h, rx: (o && o.rx) || 0, sep: (o && o.sep) }, ...(o || {}) });

// ════ 01 雙色搭配 ════
function c1a(W, H) { // 左右對切（いもいも）
  const { m, TS, SS, DS, ES } = K(W, H, 1.14);
  return [
    sh('rect', { x: 0, y: 0, w: W * 0.5, h: H, fill: 'fg' }),
    img(W * 0.56, H * 0.1, W * 0.36, H * 0.58),
    eb(m, m * 0.85, W * 0.4, ES, 'bg'),
    tt(m, H * 0.27, W * 0.39, TS * 3.6, TS, 'bg'),
    sub(m, H * 0.27 + TS * 3.75, W * 0.36, SS * 4.6, SS, 'bg'),
    ...di(m, H * 0.8, W * 0.4, DS, ES, 'bg'),
    txt('i', W * 0.56, H * 0.74, W * 0.36, ES * 1.6, ES, 'fg', { ls: 1 }),
  ];
}
function c1b(W, H) { // 上下對切（Package Design in Japan）
  const { m, TS, SS, DS, ES } = K(W, H, 1.05);
  return [
    sh('rect', { x: 0, y: 0, w: W, h: H * 0.5, fill: 'fg' }),
    eb(m, m * 0.8, W - 2 * m, ES, 'bg'),
    tt(m, H * 0.14, W - 2 * m, TS * 2.4, TS, 'bg'),
    sub(m, H * 0.14 + TS * 2.6, W * 0.66, SS * 3.3, SS, 'bg'),
    img(W * 0.2, H * 0.56, W * 0.6, H * 0.3),
    ...di(m, H * 0.9, W * 0.6, DS, ES, 'fg'),
  ];
}
function c1c(W, H) { // 上圖下文（ISUZU）
  const { m, TS, SS, DS, ES } = K(W, H, 1.18);
  return [
    img(0, 0, W, H * 0.58),
    sh('rect', { x: 0, y: H * 0.58, w: W, h: H * 0.42, fill: 'gray', opacity: 0.22 }),
    tt(m, H * 0.615, W - 2 * m, TS * 2.35, TS, 'fg'),
    sub(m, H * 0.615 + TS * 2.5, W * 0.62, SS * 3.2, SS, 'fg'),
    eb(m, m * 0.8, W * 0.6, ES, 'bg', { boxFill: 'fg' }),
    ...di(m, H * 0.895, W * 0.6, DS, ES, 'fg'),
  ];
}
function c1d(W, H) { // 斜切雙色（AMAZING CURRY）
  const { m, TS, SS, DS, ES } = K(W, H);
  return [
    sh('polygon', { points: [[W, 0], [W, H], [0, H]], fill: 'fg' }),
    img(W * 0.2, H * 0.18, W * 0.6, H * 0.42),
    eb(m, m * 0.8, W * 0.5, ES, 'fg'),
    sub(m, H * 0.13, W * 0.3, SS * 4.8, SS, 'fg'),
    tt(W * 0.36, H * 0.7, W * 0.57, TS * 2.35, TS, 'bg'),
    ...di(W * 0.36, H * 0.885, W * 0.55, DS, ES, 'bg'),
  ];
}
function c1e(W, H) { // 邊欄色塊（KIRIN 生茶）
  const { m, TS, SS, DS, ES } = K(W, H, 0.95);
  return [
    img(0, 0, W * 0.55, H),
    sh('rect', { x: W * 0.55, y: 0, w: W * 0.45, h: H, fill: 'fg' }),
    eb(W * 0.59, m, W * 0.37, ES, 'bg'),
    tt(W * 0.59, H * 0.28, W * 0.37, TS * 3.5, TS, 'bg', { lh: 1.15 }),
    sub(W * 0.59, H * 0.28 + TS * 3.7, W * 0.34, SS * 4.6, SS, 'bg'),
    ...di(W * 0.59, H * 0.84, W * 0.37, DS, ES, 'bg'),
  ];
}

// ════ 02 斜線 ════
function c2a(W, H) { // 斜紋律動（NemoWV1）
  const { m, TS, SS, DS, ES } = K(W, H, 1.22);
  return [
    sh('stripes', { cx: W * 0.55, cy: H * 0.55, angle: -38, count: 9, bandW: K(W, H).S * 0.052, gap: K(W, H).S * 0.13, len: Math.hypot(W, H) * 1.4, fill: 'gray', opacity: 0.4 }),
    img(W * 0.52, H * 0.42, W * 0.38, H * 0.36),
    tt(m, m * 0.9, W * 0.86, TS * 3.5, TS, 'fg', { lh: 1.06 }),
    sub(m, H * 0.38, W * 0.4, SS * 4.7, SS, 'fg'),
    eb(W - m * 0.45, m * 0.9, H * 0.55, ES, 'fg', { ls: 3, rotate: 90 }),
    ...di(m, H * 0.82, W * 0.6, DS, ES, 'fg'),
  ];
}
function c2b(W, H) { // 粗斜紋滿版（太郎サブレ）
  const { S, m, TS, SS, DS, ES } = K(W, H);
  return [
    sh('stripes', { cx: W / 2, cy: H / 2, angle: -45, count: 6, bandW: S * 0.13, gap: S * 0.13, len: Math.hypot(W, H) * 1.4, fill: 'fg' }),
    eb(m, m * 0.7, W - 2 * m, ES, 'fg', { align: 'center', boxFill: 'bg' }),
    img(W * 0.28, H * 0.24, W * 0.44, H * 0.46),
    tt(m, H * 0.745, W - 2 * m, TS * 2.3, TS, 'fg', { align: 'center', boxFill: 'bg', lh: 1.3 }),
    ...di(m, H * 0.9, W - 2 * m, DS, ES, 'fg', { align: 'center', boxFill: 'bg' }),
  ];
}
function c2c(W, H) { // 標題堆疊（MIDTOWN LOVES SUMMER）
  const { S, m, TS, SS, DS, ES } = K(W, H, 1.4);
  return [
    sh('stripes', { cx: W / 2, cy: H * 0.32, angle: -45, count: 12, bandW: S * 0.075, gap: S * 0.075, len: Math.hypot(W, H) * 1.4, fill: 'gray', opacity: 0.45 }),
    sh('rect', { x: 0, y: H * 0.66, w: W, h: H * 0.34, fill: 'bg' }),
    tt(m, m * 0.8, W * 0.86, TS * 4.4, TS, 'fg', { lh: 1.18 }),
    txt('d', m, H * 0.53, W * 0.8, DS * 2.2, DS * 1.5, 'fg', { weight: 700, ls: 1, boxFill: 'bg' }),
    eb(m, H * 0.7, W * 0.5, ES, 'fg'),
    sub(m, H * 0.76, W * 0.5, SS * 4.6, SS, 'fg'),
    img(W * 0.62, H * 0.7, W * 0.31, H * 0.23),
    txt('i', m, H * 0.94, W * 0.8, ES * 1.6, ES, 'gray', { ls: 1 }),
  ];
}
function c2d(W, H) { // 寬斜帶（LEMONADE STAND）
  const { S, m, TS, SS, DS, ES } = K(W, H);
  return [
    sh('stripes', { cx: W / 2, cy: H / 2, angle: -28, count: 3, bandW: S * 0.24, gap: S * 0.2, len: Math.hypot(W, H) * 1.4, fill: 'gray', opacity: 0.45 }),
    img(W * 0.08, H * 0.1, W * 0.38, H * 0.28),
    img(W * 0.55, H * 0.6, W * 0.38, H * 0.28),
    eb(m, H * 0.36, W - 2 * m, ES, 'fg', { align: 'center', boxFill: 'bg' }),
    tt(m, H * 0.42, W - 2 * m, TS * 2.3, TS, 'fg', { align: 'center', boxFill: 'bg', lh: 1.28 }),
    txt('d', m, H * 0.56, W - 2 * m, DS * 1.5, DS, 'fg', { weight: 700, ls: 1, align: 'center', boxFill: 'bg' }),
    txt('i', m, H * 0.93, W - 2 * m, ES * 1.6, ES, 'fg', { ls: 1, align: 'center', boxFill: 'bg' }),
  ];
}
function c2e(W, H) { // 細紋框景（JAPAN MOTIF GRAPHICS）
  const { S, m, TS, SS, DS, ES } = K(W, H, 0.92);
  return [
    sh('stripes', { cx: W / 2, cy: H / 2, angle: -45, count: 18, bandW: S * 0.03, gap: S * 0.05, len: Math.hypot(W, H) * 1.4, fill: 'gray', opacity: 0.5 }),
    sh('rect', { x: W * 0.12, y: H * 0.09, w: W * 0.76, h: H * 0.82, fill: 'bg', stroke: 'fg', strokeW: S * 0.003 }),
    img(W * 0.17, H * 0.14, W * 0.66, H * 0.42),
    eb(W * 0.17, H * 0.595, W * 0.66, ES, 'fg', { align: 'center' }),
    tt(W * 0.17, H * 0.63, W * 0.66, TS * 2.3, TS, 'fg', { align: 'center' }),
    sub(W * 0.2, H * 0.63 + TS * 2.45, W * 0.6, SS * 3.2, SS, 'fg', { align: 'center' }),
    ...di(W * 0.17, H * 0.845, W * 0.66, DS, ES, 'fg', { align: 'center' }),
  ];
}

// ════ 03 圓形衝擊 ════
function c3a(W, H) { // 大圓出血（まる）
  const { S, m, TS, SS, DS, ES } = K(W, H, 1.32);
  const r = S * 0.46, cx = W * 0.44, cy = H * 0.27;
  return [
    sh('circle', { cx, cy, r: r + S * 0.012, fill: 'fg' }),
    img(cx - r, cy - r, r * 2, r * 2, 'circle'),
    eb(W - m * 0.45, m * 0.8, H * 0.5, ES, 'fg', { ls: 3, rotate: 90 }),
    tt(m, H * 0.62, W * 0.84, TS * 2.3, TS, 'fg', { lh: 1.06 }),
    sub(m, H * 0.62 + TS * 2.5, W * 0.56, SS * 3.2, SS, 'fg'),
    ...di(m, H * 0.875, W * 0.7, DS, ES, 'fg'),
  ];
}
function c3b(W, H) { // 置中大圓（맨홀 Manhole）
  const { S, m, TS, SS, DS, ES } = K(W, H, 1.1);
  const r = S * 0.31, cx = W / 2, cy = H * 0.45;
  return [
    sh('circle', { cx, cy, r: r + S * 0.012, fill: 'fg' }),
    img(cx - r, cy - r, r * 2, r * 2, 'circle'),
    eb(m, m * 0.8, W * 0.6, ES, 'fg'),
    txt('i', W - m * 0.45, m * 0.8, H * 0.5, ES * 1.6, ES, 'fg', { ls: 2, rotate: 90 }),
    tt(m, H * 0.76, W - 2 * m, TS * 2.3, TS, 'fg'),
    txt('d', m, H * 0.9, W * 0.6, DS * 1.5, DS, 'fg', { weight: 700, ls: 1 }),
    txt('s', W * 0.62, H * 0.9, W * 0.32, SS * 3, SS, 'fg', { lh: 1.45 }),
  ];
}
function c3c(W, H) { // 雙圓望遠鏡（Dreamer at days）
  const { S, m, TS, SS, DS, ES } = K(W, H, 1.1);
  const r = S * 0.27, cy = H * 0.4;
  return [
    sh('rect', { x: 0, y: 0, w: W, h: H, fill: 'fg' }),
    img(W * 0.32 - r, cy - r, r * 2, r * 2, 'circle'),
    img(W * 0.68 - r, cy - r, r * 2, r * 2, 'circle'),
    eb(m * 0.7, m * 0.6, W * 0.6, ES, 'bg'),
    tt(m * 0.7, H * 0.72, W * 0.85, TS * 2.3, TS, 'bg'),
    sub(m * 0.7, H * 0.72 + TS * 2.4, W * 0.6, SS * 2, SS, 'bg'),
    ...di(m * 0.7, H * 0.92, W * 0.7, DS, ES, 'bg'),
  ];
}
function c3d(W, H) { // 上下半圓（Claude Cormier）
  const { S, m, TS, SS, DS, ES } = K(W, H, 1.1);
  const r = S * 0.42;
  return [
    img(W / 2 - r, H * 0.02 - r, r * 2, r * 2, 'circle'),
    sh('circle', { cx: W / 2, cy: H * 1.04, r, fill: 'fg' }),
    eb(m, H * 0.38, W - 2 * m, ES, 'fg', { align: 'center' }),
    tt(m, H * 0.425, W - 2 * m, TS * 2.3, TS, 'fg', { align: 'center' }),
    sub(W * 0.18, H * 0.425 + TS * 2.5, W * 0.64, SS * 3.2, SS, 'fg', { align: 'center' }),
    txt('d', m, H * 0.66, W - 2 * m, DS * 1.5, DS, 'fg', { weight: 700, ls: 1, align: 'center' }),
    txt('i', m, H * 0.9, W - 2 * m, ES * 1.6, ES, 'bg', { ls: 1, align: 'center' }),
  ];
}
function c3e(W, H) { // 大圓＋小圓（Lucky Chan-sil）
  const { S, m, TS, SS, DS, ES } = K(W, H);
  const r = S * 0.3, cx = W / 2, cy = H * 0.4, sr = S * 0.06;
  return [
    sh('circle', { cx: W * 0.13, cy: H * 0.18, r: S * 0.035, fill: 'gray' }),
    sh('circle', { cx: W * 0.86, cy: H * 0.13, r: S * 0.025, fill: 'fg' }),
    sh('circle', { cx: W * 0.9, cy: H * 0.58, r: S * 0.03, fill: 'gray' }),
    sh('circle', { cx: W * 0.1, cy: H * 0.6, r: S * 0.02, fill: 'fg' }),
    sh('circle', { cx, cy, r: r + S * 0.012, fill: 'fg' }),
    img(cx - r, cy - r, r * 2, r * 2, 'circle'),
    img(W * 0.16 - sr, H * 0.76 - sr, sr * 2, sr * 2, 'circle'),
    img(W * 0.84 - sr, H * 0.74 - sr, sr * 2, sr * 2, 'circle'),
    eb(m, m * 0.75, W - 2 * m, ES, 'fg', { align: 'center' }),
    tt(W * 0.24, H * 0.76, W * 0.52, TS * 2.3, TS, 'fg', { align: 'center' }),
    ...di(m, H * 0.9, W - 2 * m, DS, ES, 'fg', { align: 'center' }),
  ];
}

// ════ 04 帶狀色塊 ════
function c4a(W, H) { // 行帶拼貼（YCAM）
  const { m, TS, SS, DS, ES } = K(W, H, 0.97);
  return [
    img(0, 0, W, H),
    eb(m, m * 0.85, W * 0.6, ES, 'bg', { boxFill: 'fg' }),
    tt(m, H * 0.5, W * 0.82, TS * 3.7, TS, 'bg', { lh: 1.32, boxFill: 'fg' }),
    sub(m, H * 0.5 + TS * 3.9, W * 0.7, SS * 3.4, SS, 'fg', { lh: 1.62, boxFill: 'bg' }),
    txt('d', m, H * 0.84, W * 0.6, DS * 1.5, DS, 'bg', { weight: 700, ls: 1, boxFill: 'fg' }),
    txt('i', m, H * 0.84 + DS * 2.2, W * 0.66, ES * 1.6, ES, 'fg', { ls: 1, boxFill: 'bg' }),
  ];
}
function c4b(W, H) { // 中央粗帶（7DAYS 7STYLE）
  const { m, TS, SS, DS, ES } = K(W, H);
  return [
    img(0, 0, W, H),
    sh('rect', { x: 0, y: H * 0.42, w: W, h: TS * 2.9, fill: 'fg' }),
    eb(m, m * 0.8, W - 2 * m, ES, 'fg', { align: 'center', boxFill: 'bg' }),
    tt(m, H * 0.42 + TS * 0.35, W - 2 * m, TS * 2.3, TS, 'bg', { align: 'center' }),
    txt('d', m, H * 0.42 + TS * 3.25, W - 2 * m, DS * 1.5, DS, 'fg', { weight: 700, ls: 1, align: 'center', boxFill: 'bg' }),
    txt('i', m, H * 0.92, W - 2 * m, ES * 1.6, ES, 'fg', { ls: 1, align: 'center', boxFill: 'bg' }),
  ];
}
function c4c(W, H) { // 斜貼紙（東京芸術祭）
  const { m, TS, SS, DS, ES } = K(W, H, 1.1);
  return [
    img(0, 0, W, H),
    eb(m, H * 0.07, W * 0.6, ES, 'fg', { boxFill: 'bg', rotate: -3 }),
    tt(m, H * 0.27, W * 0.72, TS * 3.6, TS, 'fg', { lh: 1.34, boxFill: 'bg', rotate: -2 }),
    txt('d', W * 0.14, H * 0.6, W * 0.7, DS * 2, DS * 1.25, 'bg', { weight: 700, ls: 1, boxFill: 'fg', rotate: 2 }),
    txt('i', W * 0.09, H * 0.82, W * 0.75, ES * 1.6, ES, 'fg', { ls: 1, boxFill: 'bg', rotate: -1 }),
  ];
}
function c4d(W, H) { // 直橫交錯（YCAM 直帶）
  const { m, TS, SS, DS, ES } = K(W, H);
  return [
    img(0, 0, W, H),
    tt(m, H * 0.1, W * 0.72, TS * 3.6, TS, 'bg', { lh: 1.34, boxFill: 'fg' }),
    txt('d', W - m * 0.8, H * 0.08, H * 0.6, DS * 1.5, DS, 'bg', { weight: 700, ls: 1, rotate: 90, boxFill: 'fg' }),
    sub(m, H * 0.56, W * 0.56, SS * 3.4, SS, 'fg', { lh: 1.62, boxFill: 'bg' }),
    eb(m, H * 0.86, W * 0.6, ES, 'fg', { boxFill: 'bg' }),
    txt('i', m, H * 0.91, W * 0.7, ES * 1.6, ES, 'fg', { ls: 1, boxFill: 'bg' }),
  ];
}
function c4e(W, H) { // 底部色帶（RED BULL）
  const { m, TS, SS, DS, ES } = K(W, H);
  return [
    img(0, 0, W, H * 0.74),
    sh('rect', { x: 0, y: H * 0.74, w: W, h: H * 0.26, fill: 'fg' }),
    eb(m, m * 0.8, W * 0.6, ES, 'fg', { boxFill: 'bg' }),
    tt(m, H * 0.765, W * 0.84, TS * 2.3, TS, 'bg'),
    ...di(m, H * 0.9, W * 0.7, DS, ES, 'bg'),
  ];
}

// ════ 05 圓點裝飾 ════
function c5a(W, H) { // 黑白圓點散布（Twinkle Twinkle）
  const { S, m, TS, SS, DS, ES } = K(W, H, 0.97);
  const dots = [
    [0.08, 0.1, 0.022, 'fg'], [0.16, 0.05, 0.01, 'gray'], [0.88, 0.07, 0.016, 'fg'],
    [0.94, 0.24, 0.01, 'gray'], [0.05, 0.46, 0.013, 'gray'], [0.93, 0.5, 0.02, 'fg'],
    [0.09, 0.72, 0.011, 'fg'], [0.9, 0.78, 0.014, 'gray'], [0.3, 0.95, 0.009, 'fg'],
    [0.66, 0.04, 0.009, 'fg'], [0.78, 0.93, 0.012, 'gray'], [0.18, 0.88, 0.016, 'fg'],
  ];
  return [
    ...dots.map((dd) => sh('circle', { cx: dd[0] * W, cy: dd[1] * H, r: dd[2] * S * 1.7, fill: dd[3] })),
    img(W * 0.16, H * 0.14, W * 0.68, H * 0.46),
    eb(m, m * 0.75, W - 2 * m, ES, 'fg', { align: 'center' }),
    tt(m, H * 0.655, W - 2 * m, TS * 2.3, TS, 'fg', { align: 'center', lh: 1.1 }),
    sub(W * 0.17, H * 0.655 + TS * 2.5, W * 0.66, SS * 3.3, SS, 'fg', { align: 'center' }),
    txt('d', m, H * 0.865, W - 2 * m, DS * 1.5, DS, 'fg', { weight: 700, ls: 1, align: 'center' }),
    txt('i', m, H * 0.865 + DS * 1.9, W - 2 * m, ES * 1.6, ES, 'gray', { ls: 1, align: 'center' }),
  ];
}
function c5b(W, H) { // 水玉覆蓋（Individuality）
  const { S, m, TS, DS, ES } = K(W, H);
  const grid = [];
  for (let r = 0; r < 7; r++) for (let c = 0; c < 6; c++) {
    grid.push(sh('circle', { cx: (c + 0.5 + (r % 2 ? 0.5 : 0)) * W / 6, cy: (r + 0.5) * H / 7, r: S * 0.034, fill: 'bg', opacity: 0.55 }));
  }
  return [
    img(0, 0, W, H),
    ...grid,
    eb(m, m * 0.8, W - 2 * m, ES, 'fg', { align: 'center', boxFill: 'bg' }),
    tt(m, H * 0.76, W - 2 * m, TS * 2.3, TS, 'bg', { align: 'center', lh: 1.3, boxFill: 'fg' }),
    txt('d', m, H * 0.9, W - 2 * m, DS * 1.5, DS, 'fg', { weight: 700, ls: 1, align: 'center', boxFill: 'bg' }),
  ];
}
function c5c(W, H) { // 光暈大點（思春期の春）
  const { S, m, TS, SS, DS, ES } = K(W, H, 0.92);
  return [
    sh('rect', { x: 0, y: 0, w: W * 0.5, h: H, fill: 'fg' }),
    img(W * 0.5, H * 0.08, W * 0.44, H * 0.62),
    sh('circle', { cx: W * 0.53, cy: H * 0.16, r: S * 0.07, fill: 'gray', opacity: 0.75 }),
    sh('circle', { cx: W * 0.9, cy: H * 0.5, r: S * 0.05, fill: 'gray', opacity: 0.75 }),
    sh('circle', { cx: W * 0.62, cy: H * 0.66, r: S * 0.038, fill: 'bg', opacity: 0.6 }),
    sh('circle', { cx: W * 0.2, cy: H * 0.82, r: S * 0.045, fill: 'gray', opacity: 0.5 }),
    eb(m * 0.8, m * 0.8, W * 0.38, ES, 'bg'),
    tt(m * 0.8, H * 0.26, W * 0.36, TS * 3.5, TS, 'bg', { lh: 1.15 }),
    sub(m * 0.8, H * 0.26 + TS * 3.7, W * 0.34, SS * 4.6, SS, 'bg'),
    ...di(m * 0.8, H * 0.84, W * 0.38, DS, ES, 'bg'),
    txt('i', W * 0.5 + m * 0.5, H * 0.92, W * 0.4, ES * 1.6, ES, 'fg', { ls: 1 }),
  ];
}
function c5d(W, H) { // 雙圖圓點（NAGANO COLLECTION）
  const { S, m, TS, SS, DS, ES } = K(W, H, 0.88);
  const dots = [
    [0.06, 0.06, 0.03, 'gray'], [0.5, 0.1, 0.02, 'fg'], [0.93, 0.3, 0.025, 'gray'],
    [0.06, 0.42, 0.018, 'fg'], [0.6, 0.46, 0.03, 'gray'], [0.36, 0.56, 0.02, 'fg'],
    [0.94, 0.66, 0.018, 'gray'], [0.1, 0.93, 0.025, 'fg'], [0.55, 0.94, 0.015, 'gray'],
  ];
  return [
    img(W * 0.08, H * 0.07, W * 0.52, H * 0.38),
    img(W * 0.42, H * 0.52, W * 0.5, H * 0.38),
    ...dots.map((dd) => sh('circle', { cx: dd[0] * W, cy: dd[1] * H, r: dd[2] * S * 1.6, fill: dd[3], opacity: 0.85 })),
    eb(W * 0.64, m * 0.8, W * 0.32, ES, 'fg'),
    tt(m * 0.7, H * 0.5, W * 0.34, TS * 3.4, TS, 'fg', { lh: 1.15 }),
    sub(m * 0.7, H * 0.5 + TS * 3.6, W * 0.3, SS * 4.4, SS, 'fg'),
    ...di(m * 0.7, H * 0.9, W * 0.34, DS, ES, 'fg'),
  ];
}
function c5e(W, H) { // 點綴滿版（GIVE ME BLUESKY）
  const { S, m, TS, DS, ES } = K(W, H);
  const dots = [
    [0.1, 0.1, 'bg'], [0.3, 0.06, 'gray'], [0.7, 0.12, 'bg'], [0.9, 0.08, 'gray'],
    [0.15, 0.3, 'gray'], [0.85, 0.32, 'bg'], [0.45, 0.22, 'bg'], [0.06, 0.55, 'bg'],
    [0.93, 0.55, 'gray'], [0.25, 0.62, 'bg'], [0.65, 0.58, 'gray'], [0.5, 0.7, 'bg'],
    [0.12, 0.74, 'gray'], [0.88, 0.74, 'bg'],
  ];
  return [
    img(0, 0, W, H),
    ...dots.map((dd, i) => sh('circle', { cx: dd[0] * W, cy: dd[1] * H, r: S * (0.008 + (i % 3) * 0.004), fill: dd[2] })),
    eb(m, m * 0.8, W * 0.7, ES, 'bg'),
    tt(m, H * 0.79, W * 0.86, TS * 2.3, TS, 'bg'),
    ...di(m, H * 0.92, W * 0.8, DS, ES, 'bg'),
  ];
}

// ════ 06 三角形 ════
function c6a(W, H) { // 斜角色帶（八王子古本まつり）
  const { m, TS, SS, DS, ES } = K(W, H, 1.03);
  return [
    sh('polygon', { points: [[0, H], [0, H * 0.36], [W, H * 0.64], [W, H]], fill: 'fg' }),
    sh('polygon', { points: [[W, 0], [W * 0.4, 0], [W, H * 0.46]], fill: 'gray', opacity: 0.35 }),
    img(W * 0.23, H * 0.1, W * 0.54, H * 0.42),
    eb(m, m * 0.8, W * 0.36, ES, 'fg'),
    tt(m, H * 0.68, W * 0.84, TS * 2.3, TS, 'bg'),
    sub(m, H * 0.68 + TS * 2.45, W * 0.56, SS * 3.2, SS, 'bg'),
    ...di(m, H * 0.895, W * 0.6, DS, ES, 'bg'),
  ];
}
function c6b(W, H) { // 大三角入侵（OPEN CAMPUS）
  const { m, TS, SS, DS, ES } = K(W, H, 0.95);
  return [
    sh('polygon', { points: [[0, H * 0.08], [W * 0.72, H * 0.4], [0, H * 0.72]], fill: 'fg' }),
    eb(W * 0.55, m * 0.8, W * 0.4, ES, 'fg'),
    sub(W * 0.55, H * 0.12, W * 0.36, SS * 4.4, SS, 'fg'),
    tt(m, H * 0.3, W * 0.34, TS * 3.4, TS, 'bg', { lh: 1.15 }),
    img(W * 0.5, H * 0.55, W * 0.42, H * 0.34),
    ...di(m, H * 0.84, W * 0.4, DS, ES, 'fg'),
  ];
}
function c6c(W, H) { // 紙飛機（DODA）
  const { S, m, TS, SS, DS, ES } = K(W, H);
  const tris = [
    [0.12, 0.1, 0.05], [0.8, 0.08, 0.04], [0.6, 0.2, 0.03], [0.25, 0.3, 0.035],
    [0.88, 0.36, 0.05], [0.4, 0.12, 0.025], [0.7, 0.46, 0.03], [0.1, 0.5, 0.04],
  ];
  return [
    img(0, 0, W, H * 0.6),
    ...tris.map((t, i) => sh('polygon', {
      points: [[t[0] * W, t[1] * H], [t[0] * W + t[2] * S * 1.8, t[1] * H + t[2] * S * 0.6], [t[0] * W + t[2] * S * 0.5, t[1] * H + t[2] * S * 1.6]],
      fill: i % 3 === 0 ? 'bg' : i % 3 === 1 ? 'fg' : 'gray', opacity: 0.9,
    })),
    eb(m, H * 0.645, W * 0.6, ES, 'fg'),
    tt(m, H * 0.69, W * 0.84, TS * 2.3, TS, 'fg'),
    sub(m, H * 0.69 + TS * 2.45, W * 0.6, SS * 3.2, SS, 'fg'),
    ...di(m, H * 0.9, W * 0.7, DS, ES, 'fg'),
  ];
}
function c6d(W, H) { // 菱形窗（千曲川マルシェ）
  const { m, TS, SS, DS, ES } = K(W, H);
  return [
    sh('polygon', { points: [[0, 0], [W * 0.32, 0], [0, H * 0.24]], fill: 'gray', opacity: 0.4 }),
    sh('polygon', { points: [[W, H], [W * 0.68, H], [W, H * 0.76]], fill: 'gray', opacity: 0.4 }),
    img(W * 0.2, H * 0.14, W * 0.6, H * 0.46, 'diamond'),
    eb(m, m * 0.75, W - 2 * m, ES, 'fg', { align: 'center' }),
    tt(m, H * 0.66, W - 2 * m, TS * 2.3, TS, 'fg', { align: 'center' }),
    sub(W * 0.18, H * 0.66 + TS * 2.5, W * 0.64, SS * 3.2, SS, 'fg', { align: 'center' }),
    ...di(m, H * 0.88, W - 2 * m, DS, ES, 'fg', { align: 'center' }),
  ];
}
function c6e(W, H) { // 三角碎片（JOINUS）
  const { S, m, TS, SS, DS, ES } = K(W, H, 0.95);
  const frag = [
    [0.08, 0.06], [0.2, 0.12], [0.85, 0.07], [0.92, 0.2], [0.06, 0.32], [0.93, 0.42],
    [0.08, 0.62], [0.9, 0.66], [0.14, 0.85], [0.85, 0.88], [0.4, 0.05], [0.6, 0.93],
    [0.3, 0.92], [0.94, 0.55],
  ];
  return [
    sh('rect', { x: 0, y: 0, w: W, h: H, fill: 'fg' }),
    ...frag.map((f, i) => sh('polygon', {
      points: [[f[0] * W, f[1] * H], [f[0] * W + S * 0.025, f[1] * H + S * 0.012], [f[0] * W + S * 0.008, f[1] * H + S * 0.028]],
      fill: i % 2 ? 'bg' : 'gray', opacity: 0.9,
    })),
    img(W * 0.3, H * 0.1, W * 0.4, H * 0.3),
    eb(m, H * 0.46, W - 2 * m, ES, 'bg', { align: 'center' }),
    tt(m, H * 0.505, W - 2 * m, TS * 2.3, TS, 'bg', { align: 'center' }),
    sub(W * 0.2, H * 0.505 + TS * 2.5, W * 0.6, SS * 3.2, SS, 'bg', { align: 'center' }),
    sh('line', { x1: W * 0.4, y1: H * 0.78, x2: W * 0.6, y2: H * 0.78, stroke: 'bg', strokeW: S * 0.002 }),
    ...di(m, H * 0.8, W - 2 * m, DS, ES, 'bg', { align: 'center' }),
  ];
}

// ════ 07 拱形 ════
function c7a(W, H) { // 拱形窗（Stories in a Garden）
  const { S, m, TS, SS, DS, ES } = K(W, H, 0.92);
  const aw = Math.min(W * 0.54, S * 0.58), ax = (W - aw) / 2, ay = H * 0.135, ah = H * 0.52;
  return [
    sh('rect', { x: 0, y: 0, w: W, h: H, fill: 'gray', opacity: 0.14 }),
    sh('arch', { x: ax - S * 0.02, y: ay - S * 0.02, w: aw + S * 0.04, h: ah + S * 0.02, fill: 'none', stroke: 'fg', strokeW: S * 0.0035 }),
    img(ax, ay, aw, ah, 'arch'),
    // 拱形文字：標題沿拱頂弧線排列（Stories in a Garden 式）
    txt('t', ax, ay, aw, TS * 1.3, TS * 0.9, 'fg', { weight: 700, ls: 2, arc: { cx: W / 2, cy: ay + Math.min((aw + S * 0.04) / 2, (ah + S * 0.02) * 0.55), r: (aw + S * 0.04) / 2 + S * 0.052 } }),
    sub(W * 0.17, H * 0.71, W * 0.66, SS * 3.2, SS, 'fg', { align: 'center' }),
    eb(m, H * 0.795, W - 2 * m, ES, 'fg', { ls: 3.5, align: 'center' }),
    sh('line', { x1: W * 0.42, y1: H * 0.85, x2: W * 0.58, y2: H * 0.85, stroke: 'fg', strokeW: S * 0.0022 }),
    txt('d', m, H * 0.865, W - 2 * m, DS * 1.5, DS, 'fg', { weight: 700, ls: 1.5, align: 'center' }),
    txt('i', m, H * 0.865 + DS * 1.9, W - 2 * m, ES * 1.6, ES, 'gray', { ls: 1, align: 'center' }),
  ];
}
function c7b(W, H) { // 寬拱窗（横浜謎解き街歩き）
  const { S, m, TS, SS, DS, ES } = K(W, H);
  const aw = W * 0.7, ax = W * 0.15, ay = H * 0.22, ah = H * 0.53;
  return [
    tt(m, m * 0.8, W - 2 * m, TS * 2.3, TS, 'fg', { align: 'center' }),
    sh('arch', { x: ax - S * 0.018, y: ay - S * 0.018, w: aw + S * 0.036, h: ah + S * 0.018, fill: 'none', stroke: 'fg', strokeW: S * 0.003 }),
    img(ax, ay, aw, ah, 'arch'),
    eb(W - m * 0.45, H * 0.24, H * 0.45, ES, 'fg', { ls: 2.5, rotate: 90 }),
    sub(W * 0.17, H * 0.79, W * 0.66, SS * 3.2, SS, 'fg', { align: 'center' }),
    ...di(m, H * 0.89, W - 2 * m, DS, ES, 'fg', { align: 'center' }),
  ];
}
function c7c(W, H) { // 雙拱並列
  const { S, m, TS, SS, DS, ES } = K(W, H, 0.95);
  const aw = W * 0.36, ay = H * 0.16, ah = H * 0.46;
  return [
    sh('arch', { x: W * 0.09 - S * 0.014, y: ay - S * 0.014, w: aw + S * 0.028, h: ah + S * 0.014, fill: 'none', stroke: 'fg', strokeW: S * 0.0028 }),
    img(W * 0.09, ay, aw, ah, 'arch'),
    sh('arch', { x: W * 0.55 - S * 0.014, y: ay - S * 0.014, w: aw + S * 0.028, h: ah + S * 0.014, fill: 'none', stroke: 'fg', strokeW: S * 0.0028 }),
    img(W * 0.55, ay, aw, ah, 'arch'),
    eb(m, m * 0.75, W - 2 * m, ES, 'fg', { align: 'center' }),
    tt(m, H * 0.68, W - 2 * m, TS * 2.3, TS, 'fg', { align: 'center' }),
    sub(W * 0.17, H * 0.68 + TS * 2.5, W * 0.66, SS * 3.2, SS, 'fg', { align: 'center' }),
    ...di(m, H * 0.89, W - 2 * m, DS, ES, 'fg', { align: 'center' }),
  ];
}
function c7d(W, H) { // 墨底拱窗（Bull-Dog）
  const { S, m, TS, SS, DS, ES } = K(W, H);
  const aw = Math.min(W * 0.5, S * 0.54), ax = (W - aw) / 2, ay = H * 0.14, ah = H * 0.5;
  return [
    sh('rect', { x: 0, y: 0, w: W, h: H, fill: 'fg' }),
    sh('arch', { x: ax - S * 0.02, y: ay - S * 0.02, w: aw + S * 0.04, h: ah + S * 0.02, fill: 'none', stroke: 'bg', strokeW: S * 0.0035 }),
    img(ax, ay, aw, ah, 'arch'),
    // 拱形文字：eyebrow 沿拱頂弧線排列
    txt('e', ax, ay, aw, ES * 1.8, ES * 1.15, 'bg', { weight: 700, ls: 3, arc: { cx: W / 2, cy: ay + Math.min((aw + S * 0.04) / 2, (ah + S * 0.02) * 0.55), r: (aw + S * 0.04) / 2 + S * 0.045 } }),
    tt(m, H * 0.7, W - 2 * m, TS * 2.3, TS, 'bg', { align: 'center' }),
    sub(W * 0.17, H * 0.7 + TS * 2.5, W * 0.66, SS * 3.2, SS, 'bg', { align: 'center' }),
    ...di(m, H * 0.89, W - 2 * m, DS, ES, 'bg', { align: 'center' }),
  ];
}
function c7e(W, H) { // 落地拱門
  const { S, m, TS, SS, DS, ES } = K(W, H);
  const aw = W * 0.4, ax = W * 0.32, ay = H * 0.32;
  return [
    eb(m, m * 0.8, W * 0.6, ES, 'fg'),
    tt(m, H * 0.1, W * 0.86, TS * 2.3, TS, 'fg'),
    txt('d', W - m * 0.45, H * 0.1, H * 0.5, DS, 'fg', { weight: 700, ls: 1, rotate: 90 }),
    sh('arch', { x: ax - S * 0.018, y: ay - S * 0.018, w: aw + S * 0.036, h: H - ay + S * 0.018, fill: 'none', stroke: 'fg', strokeW: S * 0.003 }),
    img(ax, ay, aw, H - ay, 'arch'),
    sub(m, H * 0.45, W * 0.2, SS * 7, SS, 'fg', { lh: 1.6 }),
    txt('i', m, H * 0.93, W * 0.22, ES * 3.4, ES, 'fg', { ls: 0.5, lh: 1.5 }),
  ];
}

// ════ 08 用線框起來 ════
function c8a(W, H) { // 線框盒交疊（恐竜たちと水族館）
  const { S, m, TS, SS, DS, ES } = K(W, H, 0.89);
  const bw = S * 0.0032;
  return [
    img(W * 0.42, H * 0.09, W * 0.48, H * 0.6),
    eb(m, m * 0.8, W * 0.34, ES, 'fg'),
    sh('rect', { x: m * 0.8, y: H * 0.3, w: W * 0.52, h: TS * 3.6, fill: 'bg', stroke: 'fg', strokeW: bw }),
    tt(m * 0.8 + S * 0.03, H * 0.3 + TS * 0.5, W * 0.52 - S * 0.06, TS * 2.3, TS, 'fg', { lh: 1.12 }),
    sh('rect', { x: m * 0.8 + S * 0.025, y: H * 0.3 + TS * 3.6 + S * 0.018, w: W * 0.44, h: DS * 2.6, fill: 'bg', stroke: 'fg', strokeW: bw }),
    txt('d', m * 0.8 + S * 0.055, H * 0.3 + TS * 3.6 + S * 0.018 + DS * 0.7, W * 0.44 - S * 0.06, DS * 1.4, DS, 'fg', { weight: 700, ls: 1 }),
    sub(m, H * 0.72, W * 0.55, SS * 4.8, SS, 'fg'),
    txt('i', W - m * 0.45, H * 0.55, H * 0.4, ES * 1.5, ES, 'fg', { ls: 2, rotate: 90 }),
    sh('rect', { x: m, y: H * 0.9, w: W * 0.3, h: ES * 2.4, fill: 'none', stroke: 'fg', strokeW: bw * 0.7 }),
    txt('i', m + S * 0.02, H * 0.9 + ES * 0.6, W * 0.3 - S * 0.04, ES * 1.5, ES, 'fg', { ls: 0.5 }),
  ];
}
function c8b(W, H) { // 全版邊框（猫いつだって展）
  const { S, m, TS, SS, DS, ES } = K(W, H);
  const o = m * 0.5;
  return [
    img(0, 0, W, H),
    sh('rect', { x: o, y: o, w: W - 2 * o, h: H - 2 * o, fill: 'none', stroke: 'bg', strokeW: S * 0.004 }),
    sh('rect', { x: o + S * 0.013, y: o + S * 0.013, w: W - 2 * o - S * 0.026, h: H - 2 * o - S * 0.026, fill: 'none', stroke: 'bg', strokeW: S * 0.0016 }),
    eb(m, m * 1.1, W * 0.6, ES, 'bg'),
    tt(m, H * 0.12, W * 0.74, TS * 3.5, TS, 'bg', { lh: 1.12 }),
    txt('s', W - m * 0.85, H * 0.3, H * 0.45, ES * 1.5, ES, 'bg', { ls: 2, rotate: 90 }),
    ...di(m, H * 0.84, W * 0.7, DS, ES, 'bg'),
  ];
}
function c8c(W, H) { // 報紙分欄（山形新聞）
  const { S, m, TS, SS, DS, ES } = K(W, H, 0.85);
  const bw = S * 0.0028, p = S * 0.028;
  return [
    img(m, m, W * 0.52, H * 0.4),
    sh('rect', { x: m, y: m, w: W * 0.52, h: H * 0.4, fill: 'none', stroke: 'fg', strokeW: bw }),
    sh('rect', { x: W * 0.6, y: m, w: W * 0.4 - m, h: H * 0.4, fill: 'none', stroke: 'fg', strokeW: bw }),
    tt(W * 0.6 + p, m + p, W * 0.4 - m - 2 * p, TS * 3.4, TS, 'fg', { lh: 1.15 }),
    sh('rect', { x: m, y: H * 0.455, w: W - 2 * m, h: H * 0.17, fill: 'none', stroke: 'fg', strokeW: bw }),
    sub(m + p, H * 0.475, W - 2 * m - 2 * p, SS * 4.4, SS, 'fg'),
    sh('rect', { x: m, y: H * 0.665, w: W * 0.5, h: H * 0.12, fill: 'none', stroke: 'fg', strokeW: bw }),
    txt('d', m + p, H * 0.665 + S * 0.03, W * 0.5 - 2 * p, DS * 2.6, DS, 'fg', { weight: 700, ls: 1, lh: 1.4 }),
    sh('rect', { x: W * 0.55, y: H * 0.665, w: W * 0.45 - m, h: H * 0.12, fill: 'fg' }),
    txt('i', W * 0.55 + p, H * 0.665 + S * 0.03, W * 0.45 - m - 2 * p, ES * 3.2, ES, 'bg', { ls: 0.5, lh: 1.5 }),
    sh('rect', { x: m, y: H * 0.825, w: W - 2 * m, h: ES * 2.8, fill: 'none', stroke: 'fg', strokeW: bw }),
    eb(m, H * 0.825 + ES * 0.75, W - 2 * m, ES, 'fg', { align: 'center' }),
  ];
}
function c8d(W, H) { // 裝飾框章（KIRIN moogy）
  const { S, m, TS, DS, ES } = K(W, H, 0.82);
  const fx = W * 0.22, fy = H * 0.36, fw = W * 0.56, fh = H * 0.26;
  return [
    img(0, 0, W, H),
    sh('rect', { x: fx, y: fy, w: fw, h: fh, fill: 'none', stroke: 'bg', strokeW: S * 0.0036 }),
    sh('rect', { x: fx + S * 0.012, y: fy + S * 0.012, w: fw - S * 0.024, h: fh - S * 0.024, fill: 'none', stroke: 'bg', strokeW: S * 0.0014 }),
    eb(m, fy - ES * 3, W - 2 * m, ES, 'bg', { align: 'center' }),
    tt(fx + S * 0.03, fy + fh * 0.2, fw - S * 0.06, TS * 2.3, TS, 'bg', { align: 'center' }),
    txt('d', fx + S * 0.03, fy + fh * 0.62, fw - S * 0.06, DS * 1.5, DS, 'bg', { weight: 700, ls: 1.5, align: 'center' }),
    txt('i', m, H * 0.92, W - 2 * m, ES * 1.6, ES, 'bg', { ls: 1, align: 'center' }),
  ];
}
function c8e(W, H) { // 角落標註（嗨！北流）
  const { S, m, TS, SS, DS, ES } = K(W, H, 1.05);
  const bw = S * 0.0026;
  return [
    img(W * 0.08, H * 0.14, W * 0.84, H * 0.58),
    tt(m, m * 0.7, W * 0.86, TS * 2.3, TS, 'fg'),
    eb(W - m * 0.45, H * 0.16, H * 0.4, ES, 'fg', { ls: 2, rotate: 90 }),
    sh('rect', { x: m, y: H * 0.77, w: W * 0.36, h: DS * 2.6, fill: 'bg', stroke: 'fg', strokeW: bw }),
    txt('d', m + S * 0.02, H * 0.77 + DS * 0.65, W * 0.36 - S * 0.04, DS * 1.4, DS, 'fg', { weight: 700, ls: 1 }),
    sh('rect', { x: m, y: H * 0.77 + DS * 3.1, w: W * 0.5, h: ES * 2.4, fill: 'bg', stroke: 'fg', strokeW: bw }),
    txt('i', m + S * 0.02, H * 0.77 + DS * 3.1 + ES * 0.6, W * 0.5 - S * 0.04, ES * 1.5, ES, 'fg', { ls: 0.5 }),
    sub(W * 0.55, H * 0.78, W * 0.38, SS * 4.4, SS, 'fg'),
  ];
}

// ════ 09 包起來 ════
function c9a(W, H) { // 橢圓堆疊（感知）
  const { S, m, TS, SS, DS, ES } = K(W, H, 0.97);
  const rx = W * 0.43, ry = H * 0.118, cx = W / 2;
  const rows = [0.165, 0.41, 0.655];
  return [
    ...rows.map((fy) => img(cx - rx, fy * H - ry, rx * 2, ry * 2, 'ellipse')),
    sh('ellipse', { cx, cy: rows[1] * H, rx: rx + S * 0.014, ry: ry + S * 0.014, fill: 'none', stroke: 'fg', strokeW: S * 0.0025 }),
    eb(m * 0.6, m * 0.55, W * 0.5, ES, 'fg'),
    txt('i', W - m * 0.45, H * 0.12, H * 0.5, ES * 1.5, ES, 'fg', { ls: 2, rotate: 90 }),
    tt(m, H * 0.8, W * 0.6, TS * 2.3, TS, 'fg', { lh: 1.1 }),
    sub(m, H * 0.8 + TS * 2.5, W * 0.55, SS * 3.2, SS, 'fg', { lh: 1.5 }),
    txt('d', W * 0.68, H * 0.81, W * 0.26, DS * 2.8, DS, 'fg', { weight: 700, lh: 1.35, ls: 1 }),
  ];
}
function c9b(W, H) { // 大橢圓置中（知覧にっぽん紅茶）
  const { S, m, TS, SS, DS, ES } = K(W, H);
  const cx = W / 2, cy = H * 0.41, rx = Math.min(W * 0.4, S * 0.46), ry = H * 0.265;
  return [
    sh('ellipse', { cx, cy, rx: rx + S * 0.018, ry: ry + S * 0.018, fill: 'none', stroke: 'fg', strokeW: S * 0.0028 }),
    img(cx - rx, cy - ry, rx * 2, ry * 2, 'ellipse'),
    sh('rect', { x: cx - W * 0.17, y: m * 0.65, w: W * 0.34, h: ES * 2.5, rx: ES * 1.25, fill: 'fg' }),
    eb(cx - W * 0.17, m * 0.65 + ES * 0.7, W * 0.34, ES, 'bg', { align: 'center' }),
    tt(m, H * 0.745, W - 2 * m, TS * 2.3, TS, 'fg', { align: 'center' }),
    sub(W * 0.16, H * 0.745 + TS * 2.5, W * 0.68, SS * 3, SS, 'fg', { align: 'center' }),
    ...di(m, H * 0.91, W - 2 * m, DS, ES, 'fg', { align: 'center' }),
  ];
}
function c9c(W, H) { // 膠囊容器（Kikkoman）
  const { S, m, TS, SS, DS, ES } = K(W, H, 0.92);
  const cw = W * 0.36, ch = H * 0.72, cx0 = W * 0.1, cy0 = H * 0.1;
  return [
    sh('rect', { x: cx0 - S * 0.016, y: cy0 - S * 0.016, w: cw + S * 0.032, h: ch + S * 0.032, rx: (cw + S * 0.032) / 2, fill: 'none', stroke: 'fg', strokeW: S * 0.0028 }),
    img(cx0, cy0, cw, ch, 'rect', { rx: cw / 2 }),
    eb(W * 0.54, H * 0.11, W * 0.4, ES, 'fg'),
    tt(W * 0.54, H * 0.17, W * 0.4, TS * 3.4, TS, 'fg', { lh: 1.15 }),
    sub(W * 0.54, H * 0.17 + TS * 3.6, W * 0.37, SS * 5.8, SS, 'fg'),
    ...di(W * 0.54, H * 0.72, W * 0.4, DS, ES, 'fg'),
    txt('i', m, H * 0.91, W * 0.5, ES * 1.6, ES, 'fg', { ls: 1 }),
  ];
}
function c9d(W, H) { // 橢圓拼貼（Secese）
  const { S, m, TS, SS, DS, ES } = K(W, H);
  return [
    img(W * 0.06, H * 0.1, W * 0.48, H * 0.32, 'ellipse'),
    img(W * 0.5, H * 0.34, W * 0.42, H * 0.28, 'ellipse'),
    img(W * 0.16, H * 0.54, W * 0.38, H * 0.24, 'ellipse'),
    sh('ellipse', { cx: W * 0.71, cy: H * 0.48, rx: W * 0.21 + S * 0.014, ry: H * 0.14 + S * 0.014, fill: 'none', stroke: 'fg', strokeW: S * 0.0025 }),
    eb(W * 0.6, m * 0.8, W * 0.36, ES, 'fg'),
    tt(m, H * 0.82, W * 0.62, TS * 2.3, TS, 'fg'),
    sub(m, H * 0.82 + TS * 2.5, W * 0.55, SS * 3, SS, 'fg'),
    ...di(W * 0.68, H * 0.84, W * 0.28, DS, ES, 'fg'),
  ];
}
function c9e(W, H) { // 菱形窗（詩季彩單窗）
  const { S, m, TS, SS, DS, ES } = K(W, H);
  const x0 = W * 0.2, y0 = H * 0.12, w0 = W * 0.6, h0 = H * 0.5;
  const cx = x0 + w0 / 2, cy = y0 + h0 / 2, d = S * 0.02;
  return [
    sh('polygon', { points: [[cx, y0 - d], [x0 + w0 + d, cy], [cx, y0 + h0 + d], [x0 - d, cy]], fill: 'none', stroke: 'fg', strokeW: S * 0.0028 }),
    img(x0, y0, w0, h0, 'diamond'),
    eb(m, m * 0.75, W - 2 * m, ES, 'fg', { align: 'center' }),
    tt(m, H * 0.67, W - 2 * m, TS * 2.3, TS, 'fg', { align: 'center' }),
    sub(W * 0.18, H * 0.67 + TS * 2.5, W * 0.64, SS * 3.2, SS, 'fg', { align: 'center' }),
    ...di(m, H * 0.885, W - 2 * m, DS, ES, 'fg', { align: 'center' }),
  ];
}

// ════ 10 框格 ════
function c10a(W, H) { // 深底網格（Mamíferos del Pasado）
  const { S, TS, SS, DS, ES } = K(W, H, 0.81);
  const m = S * 0.06, g = S * 0.016, cols = 3, rows = 4;
  const cw = (W - 2 * m - (cols - 1) * g) / cols;
  const ch = (H - 2 * m - (rows - 1) * g) / rows;
  const cx0 = (c) => m + c * (cw + g);
  const cy0 = (r) => m + r * (ch + g);
  return [
    sh('rect', { x: 0, y: 0, w: W, h: H, fill: 'fg' }),
    img(cx0(0), cy0(0), cw, ch),
    sh('rect', { x: cx0(1), y: cy0(0), w: cw, h: ch, fill: 'bg' }),
    txt('e', cx0(1) + S * 0.022, cy0(0) + S * 0.025, cw - S * 0.044, ES * 4.6, ES, 'fg', { ls: 1.5, weight: 700, lh: 1.5 }),
    img(cx0(2), cy0(0), cw, ch),
    sh('rect', { x: cx0(0), y: cy0(1), w: cw * 2 + g, h: ch, fill: 'bg' }),
    tt(cx0(0) + S * 0.028, cy0(1) + S * 0.028, cw * 2 + g - S * 0.056, TS * 2.3, TS, 'fg', { lh: 1.12 }),
    img(cx0(2), cy0(1), cw, ch),
    img(cx0(0), cy0(2), cw, ch),
    sh('rect', { x: cx0(1), y: cy0(2), w: cw, h: ch, fill: 'bg' }),
    sh('circle', { cx: cx0(1) + cw / 2, cy: cy0(2) + ch / 2, r: Math.min(cw, ch) * 0.26, fill: 'fg' }),
    sh('rect', { x: cx0(2), y: cy0(2), w: cw, h: ch, fill: 'bg' }),
    txt('d', cx0(2) + S * 0.022, cy0(2) + S * 0.025, cw - S * 0.044, DS * 3.8, DS, 'fg', { weight: 700, lh: 1.3 }),
    sh('rect', { x: cx0(0), y: cy0(3), w: cw * 2 + g, h: ch, fill: 'bg' }),
    sub(cx0(0) + S * 0.028, cy0(3) + S * 0.028, cw * 2 + g - S * 0.056, SS * 3.4, SS, 'fg', { lh: 1.5 }),
    txt('i', cx0(0) + S * 0.028, cy0(3) + ch - ES * 2.2, cw * 2 + g - S * 0.056, ES * 1.6, ES, 'gray', { ls: 0.5 }),
    img(cx0(2), cy0(3), cw, ch),
  ];
}
function c10b(W, H) { // 菱形格（詩季彩）
  const { S, m, TS, SS, DS, ES } = K(W, H, 0.95);
  return [
    img(W * 0.06, H * 0.05, W * 0.43, H * 0.3, 'diamond'),
    img(W * 0.51, H * 0.05, W * 0.43, H * 0.3, 'diamond'),
    img(W * 0.285, H * 0.36, W * 0.43, H * 0.3, 'diamond'),
    txt('d', W - m * 0.5, H * 0.4, H * 0.34, DS * 1.5, DS, 'fg', { weight: 700, ls: 1, rotate: 90 }),
    eb(m, H * 0.7, W * 0.7, ES, 'fg'),
    tt(m, H * 0.74, W * 0.84, TS * 2.3, TS, 'fg'),
    sub(m, H * 0.74 + TS * 2.5, W * 0.6, SS * 3.2, SS, 'fg'),
    txt('i', m, H * 0.94, W * 0.8, ES * 1.6, ES, 'gray', { ls: 0.5 }),
  ];
}
function c10c(W, H) { // 市場瀑布格（てみて市場）
  const { S, TS, SS, DS, ES } = K(W, H, 0.88);
  const m = S * 0.05, g = S * 0.016;
  const colW = W * 0.26, midX = m + colW + g, midW = W - 2 * m - 2 * colW - 2 * g;
  const ch = (H - 2 * m - 2 * g) / 3;
  const rows = [m, m + ch + g, m + 2 * (ch + g)];
  return [
    sh('rect', { x: 0, y: 0, w: W, h: H, fill: 'fg' }),
    ...rows.map((y) => img(m, y, colW, ch)),
    ...rows.map((y) => img(W - m - colW, y, colW, ch)),
    sh('rect', { x: midX, y: m, w: midW, h: H - 2 * m, fill: 'bg' }),
    eb(midX + S * 0.02, H * 0.1, midW - S * 0.04, ES, 'fg', { align: 'center' }),
    tt(midX + S * 0.02, H * 0.17, midW - S * 0.04, TS * 4.6, TS, 'fg', { lh: 1.2, align: 'center' }),
    txt('d', midX + S * 0.02, H * 0.58, midW - S * 0.04, DS * 3, DS, 'fg', { weight: 700, lh: 1.4, align: 'center' }),
    txt('i', midX + S * 0.02, H * 0.72, midW - S * 0.04, ES * 5, ES, 'fg', { lh: 1.6, align: 'center' }),
  ];
}
function c10d(W, H) { // 格紋拼貼（香りの器）
  const { S, TS, DS, ES } = K(W, H, 0.85);
  const m = S * 0.055, g = S * 0.014, cols = 4, rows = 4;
  const cw = (W - 2 * m - (cols - 1) * g) / cols;
  const ch = (H - 2 * m - (rows - 1) * g) / rows;
  const cx0 = (c) => m + c * (cw + g);
  const cy0 = (r) => m + r * (ch + g);
  const frames = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    if (c >= 1 && c <= 2 && r >= 1 && r <= 2) continue; // 中央留給標題
    if ((c + r) % 2 === 0) frames.push(img(cx0(c), cy0(r), cw, ch));
    else frames.push(sh('rect', { x: cx0(c), y: cy0(r), w: cw, h: ch, fill: 'gray', opacity: 0.35 }));
  }
  const bx = cx0(1), bw2 = cw * 2 + g, by = cy0(1), bh2 = ch * 2 + g;
  return [
    ...frames,
    sh('rect', { x: bx, y: by, w: bw2, h: bh2, fill: 'bg', stroke: 'fg', strokeW: S * 0.0024 }),
    eb(bx + S * 0.02, by + bh2 * 0.12, bw2 - S * 0.04, ES, 'fg', { align: 'center' }),
    tt(bx + S * 0.02, by + bh2 * 0.24, bw2 - S * 0.04, TS * 3.4, TS, 'fg', { lh: 1.18, align: 'center' }),
    txt('d', bx + S * 0.02, by + bh2 * 0.72, bw2 - S * 0.04, DS * 1.5, DS, 'fg', { weight: 700, ls: 1, align: 'center' }),
    txt('i', bx + S * 0.02, by + bh2 * 0.84, bw2 - S * 0.04, ES * 3, ES, 'fg', { lh: 1.5, align: 'center' }),
  ];
}
function c10e(W, H) { // 滿格混排（LUMINE MIX）
  const { S, TS, DS, ES } = K(W, H, 1.15);
  const m = S * 0.04, g = S * 0.012, cols = 3, rows = 3;
  const cw = (W - 2 * m - (cols - 1) * g) / cols;
  const ch = (H - 2 * m - (rows - 1) * g) / rows;
  const cells = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    cells.push(img(m + c * (cw + g), m + r * (ch + g), cw, ch));
  }
  return [
    ...cells,
    eb(m + S * 0.02, m + S * 0.025, W * 0.6, ES, 'fg', { boxFill: 'bg' }),
    tt(m + S * 0.02, H * 0.44, W - 2 * m - S * 0.04, TS * 2.3, TS, 'fg', { boxFill: 'bg', lh: 1.3 }),
    txt('d', m + S * 0.02, H * 0.88, W * 0.6, DS * 1.5, DS, 'fg', { weight: 700, ls: 1, boxFill: 'bg' }),
    txt('i', m + S * 0.02, H * 0.88 + DS * 2.4, W * 0.7, ES * 1.6, ES, 'fg', { ls: 1, boxFill: 'bg' }),
  ];
}

// ════ 12 鏤空字（描邊字疊在照片上，讓照片從鏤空處透出）════
function c12a(W, H) { // A 上半排滿三行完整鏤空標題（model: 野球好き）
  const { m, TS, SS, DS, ES } = K(W, H, 1.42);
  const rows = [];
  const n = 3, top = H * 0.05, gap = H * 0.165;
  for (let i = 0; i < n; i++) {
    rows.push(tt(-W * 0.05, top + i * gap, W * 1.1, TS * 1.2, TS, '#f3f1ea',
      { hollow: true, hollowW: TS * 0.022, lh: 1.0, align: 'center', opacity: 0.62 + i * 0.19 }));
  }
  return [
    img(0, 0, W, H),
    sh('rect', { x: 0, y: 0, w: W, h: H * 0.66, fill: '#000000', opacity: 0.2 }),
    ...rows,
    eb(m, H * 0.66, W - 2 * m, ES * 1.1, '#f3f1ea', { ls: 3, align: 'center' }),
    txt('d', m, H * 0.92, W - 2 * m, DS * 1.5, DS, '#f3f1ea', { weight: 700, ls: 1.5, align: 'center' }),
  ];
}
function c12b(W, H) { // B 超大鏤空標題置中 + 上下兩張照片（model: アイスとける）
  const { m, TS, SS, DS, ES } = K(W, H, 2.1);
  const th = TS * 2.4, ty = (H - th) / 2;
  return [
    img(0, 0, W, H * 0.5),
    img(0, H * 0.5, W, H * 0.5),
    sh('rect', { x: 0, y: 0, w: W, h: H, fill: '#000000', opacity: 0.16 }),
    tt(m * 0.4, ty, W - m * 0.8, th, TS, '#f3f1ea', { hollow: true, hollowW: TS * 0.022, lh: 0.98, align: 'center' }),
    txt('d', m, H * 0.92, W - 2 * m, DS * 1.3, DS, '#141414', { weight: 700, ls: 1, align: 'center', boxFill: '#f3f1ea' }),
  ];
}
function c12c(W, H) { // C 鏤空標題順時針90°垂直排右（model: 招き猫 BEAMS）
  const { m, TS, SS, DS, ES } = K(W, H, 1.25);
  return [
    eb(m, m * 0.9, W * 0.6, ES * 1.05, 'fg', { ls: 1.5 }),
    img(m, H * 0.16, W * 0.7, H * 0.62),
    tt(W * 0.84, H * 0.06, H * 0.86, TS * 1.4, TS, 'fg', { hollow: true, hollowW: TS * 0.02, lh: 1.0, rotate: 90 }),
    ...di(m, H * 0.86, W * 0.6, DS, ES, 'fg'),
  ];
}
function c12d(W, H) { // D 標題逐字打散散佈（model: Miss iD）
  const { m, TS, SS, DS, ES } = K(W, H, 1.7);
  return [
    img(0, 0, W, H),
    sh('rect', { x: 0, y: 0, w: W, h: H, fill: '#000000', opacity: 0.12 }),
    tt(m, H * 0.04, W - 2 * m, H * 0.66, TS, '#f3f1ea', { hollow: true, hollowW: TS * 0.02, scatter: true, charGap: TS * 0.55, lh: 2.0 }),
    txt('d', m, H * 0.86, W - 2 * m, DS * 1.6, DS, '#f3f1ea', { weight: 700, ls: 1, align: 'center' }),
    txt('i', m, H * 0.92, W - 2 * m, ES * 1.6, ES, '#f3f1ea', { ls: 1, align: 'center' }),
  ];
}
function c12e(W, H) { // E 細鏤空字列 + 中央照片塊，整體放大（model: ASAHIKAWA）
  const { m, TS, SS, DS, ES } = K(W, H, 1.35);
  return [
    tt(m, H * 0.06, W * 0.92, TS * 4.2, TS, 'fg', { hollow: true, hollowW: TS * 0.01, lh: 1.7, ls: 3 }),
    img(W * 0.34, H * 0.34, W * 0.52, H * 0.32),
    txt('i', W * 0.56, H * 0.12, W * 0.38, ES * 4, ES * 1.3, 'gray', { ls: 1, lh: 1.5 }),
    txt('d', m, H * 0.74, W * 0.8, DS * 1.5, DS * 1.25, 'fg', { hollow: true, hollowW: DS * 0.012, ls: 2 }),
    txt('i', m, H * 0.84, W * 0.8, ES * 2, ES * 1.3, 'fg', { hollow: true, hollowW: ES * 0.025, ls: 2 }),
  ];
}

// ════ 11 粗線整合視線（粗線條引導、整合分散元素）════
function c11a(W, H) { // A 粗線串字（model: 私平線）
  const { m, TS, SS, DS, ES } = K(W, H, 1.05);
  const lw = Math.min(W, H) * 0.012;
  return [
    img(W * 0.42, H * 0.18, W * 0.5, H * 0.46),
    eb(m, m * 0.85, W * 0.5, ES, 'fg', { ls: 3 }),
    tt(m, H * 0.2, W * 0.42, TS * 3.4, TS, 'fg', { lh: 1.25 }),
    sh('line', { x1: m, y1: H * 0.33, x2: m + W * 0.26, y2: H * 0.33, stroke: 'fg', strokeW: lw }),
    sh('line', { x1: m, y1: H * 0.45, x2: m + W * 0.3, y2: H * 0.45, stroke: 'fg', strokeW: lw }),
    sub(m, H * 0.66, W * 0.34, SS * 4, SS, 'gray'),
    ...di(m, H * 0.86, W * 0.6, DS, ES, 'fg'),
  ];
}
function c11b(W, H) { // B 粗橫帶分隔
  const { m, TS, SS, DS, ES } = K(W, H, 1.08);
  const lw = Math.min(W, H) * 0.02;
  return [
    eb(m, m * 0.85, W - 2 * m, ES, 'fg', { ls: 3 }),
    tt(m, H * 0.12, W - 2 * m, TS * 2.3, TS, 'fg'),
    sh('line', { x1: m, y1: H * 0.32, x2: W - m, y2: H * 0.32, stroke: 'fg', strokeW: lw }),
    img(m, H * 0.36, W - 2 * m, H * 0.42),
    sh('line', { x1: m, y1: H * 0.82, x2: W - m, y2: H * 0.82, stroke: 'fg', strokeW: lw }),
    ...di(m, H * 0.86, W * 0.6, DS, ES, 'fg'),
  ];
}
function c11c(W, H) { // C 左粗脊
  const { m, TS, SS, DS, ES } = K(W, H, 1.0);
  const lw = Math.min(W, H) * 0.016;
  return [
    sh('rect', { x: m, y: m, w: lw, h: H - 2 * m, fill: 'fg' }),
    eb(m + lw + W * 0.04, m * 0.95, W * 0.6, ES, 'fg', { ls: 3 }),
    tt(m + lw + W * 0.04, H * 0.13, W * 0.6, TS * 2.6, TS, 'fg', { lh: 1.1 }),
    img(m + lw + W * 0.04, H * 0.4, W * 0.78, H * 0.4),
    sub(m + lw + W * 0.04, H * 0.83, W * 0.6, SS * 3, SS, 'gray'),
    ...di(m + lw + W * 0.04, H * 0.92, W * 0.6, DS, ES, 'fg'),
  ];
}
function c11d(W, H) { // D 行間粗線
  const { m, TS, SS, DS, ES } = K(W, H, 1.0);
  const lw = Math.min(W, H) * 0.01;
  return [
    img(W * 0.5, 0, W * 0.5, H),
    eb(m, m * 0.85, W * 0.42, ES, 'fg', { ls: 3 }),
    tt(m, H * 0.16, W * 0.42, TS * 1.4, TS, 'fg'),
    sh('line', { x1: m, y1: H * 0.33, x2: W * 0.46, y2: H * 0.33, stroke: 'fg', strokeW: lw }),
    sub(m, H * 0.37, W * 0.4, SS * 5, SS, 'gray'),
    sh('line', { x1: m, y1: H * 0.62, x2: W * 0.46, y2: H * 0.62, stroke: 'fg', strokeW: lw }),
    ...di(m, H * 0.86, W * 0.42, DS, ES, 'fg'),
  ];
}
function c11e(W, H) { // E 粗框角整合
  const { m, TS, SS, DS, ES } = K(W, H, 1.05);
  const lw = Math.min(W, H) * 0.014, c = Math.min(W, H) * 0.1;
  return [
    img(m, H * 0.26, W - 2 * m, H * 0.5),
    sh('line', { x1: m, y1: H * 0.26, x2: m + c, y2: H * 0.26, stroke: 'fg', strokeW: lw }),
    sh('line', { x1: m, y1: H * 0.26, x2: m, y2: H * 0.26 + c, stroke: 'fg', strokeW: lw }),
    sh('line', { x1: W - m, y1: H * 0.76, x2: W - m - c, y2: H * 0.76, stroke: 'fg', strokeW: lw }),
    sh('line', { x1: W - m, y1: H * 0.76, x2: W - m, y2: H * 0.76 - c, stroke: 'fg', strokeW: lw }),
    eb(m, m * 0.85, W - 2 * m, ES, 'fg', { ls: 3, align: 'center' }),
    tt(m, H * 0.1, W - 2 * m, TS * 2.3, TS, 'fg', { align: 'center' }),
    ...di(m, H * 0.85, W - 2 * m, DS, ES, 'fg', { align: 'center' }),
  ];
}

// ════ 15 衝出去（文字突破版面邊界，動感張力）════
function c15a(W, H) { // A 巨字左右大出血（model: THE MIX-KYOTO）
  const { m, TS, SS, DS, ES } = K(W, H, 4.6);
  return [
    img(0, 0, W, H),
    sh('rect', { x: 0, y: 0, w: W, h: H, fill: '#000000', opacity: 0.2 }),
    tt(-W * 0.4, H * 0.16, W * 1.8, TS * 1.5, TS, '#f3f1ea', { lh: 0.86 }),
    eb(m, m * 0.9, W * 0.6, ES, '#f3f1ea', { ls: 3 }),
    ...di(m, H * 0.88, W * 0.7, DS, ES, '#f3f1ea'),
  ];
}
function c15b(W, H) { // B 巨字上下大出血
  const { m, TS, SS, DS, ES } = K(W, H, 5.2);
  return [
    tt(-W * 0.3, -H * 0.1, W * 1.6, TS * 1.2, TS, 'fg', { lh: 0.85 }),
    img(0, H * 0.36, W, H * 0.3),
    tt(-W * 0.3, H * 0.66, W * 1.6, TS * 1.2, TS, 'fg', { lh: 0.85 }),
    eb(m, H * 0.31, W * 0.5, ES, 'fg', { ls: 3 }),
    txt('d', m, H * 0.62, W - 2 * m, DS, DS, 'fg', { weight: 700, ls: 1 }),
  ];
}
function c15c(W, H) { // C 照片上、巨字衝破底部
  const { m, TS, SS, DS, ES } = K(W, H, 5.0);
  return [
    img(0, 0, W, H * 0.55),
    eb(m, H * 0.59, W - 2 * m, ES, 'fg', { ls: 3 }),
    tt(-W * 0.3, H * 0.6, W * 1.6, TS * 1.4, TS, 'fg', { lh: 0.82 }),
    ...di(m, H * 0.93, W * 0.7, DS, ES, 'fg'),
  ];
}
function c15d(W, H) { // D 直立巨字衝出右側（model: 真 紅字出血）
  const { m, TS, SS, DS, ES } = K(W, H, 3.4);
  return [
    img(0, 0, W * 0.58, H),
    tt(W * 0.34, -H * 0.06, W * 0.9, TS * 5, TS, 'fg', { lh: 0.9 }),
    eb(m, m * 0.9, W * 0.45, ES, '#f3f1ea', { ls: 3 }),
    ...di(m, H * 0.88, W * 0.5, DS, ES, '#f3f1ea'),
  ];
}
function c15e(W, H) { // E 超巨字全出血 overlay（model: メディア 散落出血）
  const { m, TS, SS, DS, ES } = K(W, H, 6.2);
  return [
    img(0, 0, W, H),
    sh('rect', { x: 0, y: 0, w: W, h: H, fill: '#000000', opacity: 0.28 }),
    tt(-W * 0.42, H * 0.04, W * 1.84, TS * 1.7, TS, '#f3f1ea', { lh: 0.8 }),
    ...di(m, H * 0.9, W * 0.7, DS, ES, '#f3f1ea'),
  ];
}

// ════ 16 塞滿畫面（密集填滿、打破留白常規）════
function c16a(W, H) { // A 雙照片居中＋上下密排巨字（model: 鉄道芸術祭）
  const { m, TS, SS, DS, ES } = K(W, H, 1.35);
  return [
    img(0, H * 0.3, W * 0.5, H * 0.42),
    img(W * 0.5, H * 0.3, W * 0.5, H * 0.42),
    tt(W * 0.012, H * 0.03, W - W * 0.024, H * 0.26, TS, 'fg', { lh: 0.9, fill: true }),
    tt(W * 0.012, H * 0.73, W - W * 0.024, H * 0.22, TS, 'fg', { lh: 0.9, fill: true }),
    eb(W * 0.02, H * 0.008, W * 0.6, ES, 'fg', { ls: 2 }),
    txt('d', W * 0.4, H * 0.965, W * 0.58, DS, DS, 'fg', { weight: 700, ls: 1, align: 'right' }),
  ];
}
function c16b(W, H) { // B 超大字母滿高出血＋下方照片（model: TOKYO）
  const { m, TS, SS, DS, ES } = K(W, H, 3.4);
  return [
    img(0, H * 0.42, W, H * 0.58),
    tt(-W * 0.05, -H * 0.06, W * 1.1, H * 0.62, TS, 'fg', { lh: 0.82, fill: true }),
    eb(W * 0.55, H * 0.04, W * 0.42, ES, 'fg', { ls: 2, h: ES * 1.6 }),
    txt('d', W * 0.03, H * 0.92, W * 0.6, DS, DS, '#f3f1ea', { weight: 700, ls: 1 }),
    txt('i', W * 0.03, H * 0.96, W * 0.7, ES * 1.5, ES, '#f3f1ea', { ls: 1 }),
  ];
}
function c16c(W, H) { // C 巨字塞滿 + 小照片嵌入
  const { m, TS, SS, DS, ES } = K(W, H, 1.4);
  return [
    tt(W * 0.015, H * 0.01, W - W * 0.03, H * 0.78, TS, 'fg', { lh: 0.96, fill: true }),
    img(W * 0.56, H * 0.5, W * 0.42, H * 0.34),
    eb(W * 0.02, H * 0.9, W * 0.5, ES, 'fg', { ls: 2 }),
    ...di(W * 0.02, H * 0.94, W * 0.5, DS, ES, 'fg'),
  ];
}
function c16d(W, H) { // D 照片滿版 + 巨字塞滿
  const { m, TS, SS, DS, ES } = K(W, H, 1.4);
  return [
    img(0, 0, W, H),
    sh('rect', { x: 0, y: 0, w: W, h: H, fill: '#000000', opacity: 0.3 }),
    tt(W * 0.015, H * 0.01, W - W * 0.03, H * 0.86, TS, '#f3f1ea', { lh: 0.95, fill: true }),
    txt('d', W * 0.02, H * 0.91, W - W * 0.04, DS, DS, '#f3f1ea', { weight: 700, ls: 1 }),
    txt('i', W * 0.02, H * 0.95, W - W * 0.04, ES * 1.5, ES, '#f3f1ea', { ls: 1 }),
  ];
}
function c16e(W, H) { // E 滿版照片＋置中粗黑巨字（model: SHIBUYA JIZAI）
  const { m, TS, SS, DS, ES } = K(W, H, 2.7);
  return [
    img(0, 0, W, H),
    sh('rect', { x: 0, y: 0, w: W, h: H, fill: '#000000', opacity: 0.16 }),
    tt(-W * 0.04, H * 0.1, W * 1.08, H * 0.72, TS, '#0d0d0b', { lh: 0.9, fill: true }),
    eb(W * 0.93, H * 0.04, H * 0.46, ES, '#0d0d0b', { ls: 2, rotate: 90, tx: 0, ty: 0 }),
    txt('d', W * 0.03, H * 0.93, W * 0.5, DS, DS, '#f3f1ea', { weight: 700, ls: 1 }),
    ...di(W * 0.5, H * 0.93, W * 0.47, DS, ES, '#f3f1ea'),
  ];
}

// ════ 18 拉開字元間距（寬字距、高雅時尚留白）════
function c18a(W, H) { // A 寬距置中 + 照片塊（model: 私のSlidestory）
  const { m, TS, SS, DS, ES } = K(W, H, 1.3);
  const g = H * 0.008;
  return [
    img(0, 0, W, (H - g) / 2),
    img(0, (H + g) / 2, W, (H - g) / 2),
    sh('rect', { x: 0, y: 0, w: W, h: H, fill: '#000000', opacity: 0.16 }),
    eb(m, H * 0.07, W - 2 * m, ES, '#f3f1ea', { ls: 10, align: 'center' }),
    // 每個單字各自一行、逐字撐滿整欄、垂直堆疊置中（Setouchi 風）
    tt(m, H * 0.26, W - 2 * m, TS * 4.6, TS, '#f3f1ea', { stackWords: true, spread: true, lh: 1.55, align: 'center' }),
    txt('s', m, H * 0.72, W - 2 * m, SS * 3, SS, '#f3f1ea', { lh: 1.8, align: 'center', ls: 3 }),
    txt('d', m, H * 0.86, W - 2 * m, DS * 1.5, DS, '#f3f1ea', { weight: 700, spread: true, align: 'center' }),
    txt('i', m, H * 0.86 + DS * 2.2, W - 2 * m, ES * 1.6, ES, '#f3f1ea', { ls: 7, align: 'center' }),
  ];
}
function c18b(W, H) { // B 寬距橫貫 over 照片（model: THE SURGE）
  const { m, TS, SS, DS, ES } = K(W, H, 1.35);
  return [
    img(0, 0, W, H),
    sh('rect', { x: 0, y: 0, w: W, h: H, fill: '#000000', opacity: 0.2 }),
    eb(m, m, W * 0.6, ES, '#f3f1ea', { ls: 7 }),
    // 標題逐字展開、橫貫滿版
    tt(m, H * 0.4, W - 2 * m, TS * 2, TS, '#f3f1ea', { spread: true, lh: 1.7, align: 'center' }),
    txt('d', m, H * 0.84, W - 2 * m, DS * 1.4, DS, '#f3f1ea', { weight: 700, spread: true, align: 'center' }),
    txt('i', m, H * 0.84 + DS * 2, W - 2 * m, ES * 1.6, ES, '#f3f1ea', { ls: 5, align: 'center' }),
  ];
}
function c18c(W, H) { // C 直排寬距 + 照片（model: あんパン / Slidestory）
  const { m, TS, SS, DS, ES } = K(W, H, 1.1);
  const tsz = Math.min(W, H) * 0.052;       // 對角瀑布標題字級
  return [
    // 中央橫幅照片（如參考圖橫跨中段）
    img(W * 0.3, H * 0.22, W * 0.62, H * 0.4),
    // 標題逐字對角瀑布、每個單字各自一條、彼此錯開（像下雨）
    tt(W * 0.06, H * 0.16, W * 0.5, tsz, tsz, 'fg', { diagonal: true, diagWords: true, diagDx: W * 0.04, diagDy: H * 0.052, diagSegX: W * 0.15 }),
    // 右上資訊
    eb(W * 0.6, H * 0.06, W * 0.36, ES, 'fg', { ls: 4, align: 'right' }),
    sub(W * 0.6, H * 0.1, W * 0.36, SS * 1.4, SS, 'gray', { align: 'right' }),
    // 右下日期
    txt('d', W * 0.56, H * 0.86, W * 0.4, DS, DS, 'fg', { weight: 700, ls: 2, align: 'right' }),
    txt('i', W * 0.56, H * 0.92, W * 0.4, ES * 1.4, ES, 'gray', { ls: 2, align: 'right' }),
  ];
}
function c18d(W, H) { // D 寬距極簡 + 照片
  const { m, TS, SS, DS, ES } = K(W, H, 1.1);
  const tsz = Math.min(W, H) * 0.075;
  return [
    // 頂部一排小標（如 Mendl's 圖示列位置）
    eb(m, H * 0.05, W - 2 * m, ES, 'fg', { ls: 12, align: 'center' }),
    // 標題：每個單字各自一行、逐字撐滿整欄（Grand Budapest 風）
    tt(m, H * 0.12, W - 2 * m, tsz * 3.4, tsz, 'fg', { stackWords: true, spread: true, lh: 1.5, align: 'center' }),
    // 中段日期資訊、字距超開
    txt('d', m, H * 0.46, W - 2 * m, DS * 1.4, DS * 1.2, 'gray', { weight: 700, spread: true, align: 'center' }),
    txt('s', m, H * 0.54, W - 2 * m, SS * 1.6, SS, 'gray', { spread: true, align: 'center' }),
    // 底部三分之一照片
    img(0, H * 0.66, W, H * 0.34),
  ];
}
function c18e(W, H) { // E 直排寬距 + 上下分割照片（model: あんパン 一禾堂）
  const { m, TS, SS, DS, ES } = K(W, H, 1.0);
  const g = H * 0.008;
  const csz = Math.min(W, H) * 0.05;
  return [
    // 照片上下分割
    img(0, 0, W, H * 0.62 - g / 2),
    img(0, H * 0.62 + g / 2, W, H * 0.38 - g / 2),
    // 左側淺色直幅，襯托直排標題
    sh('rect', { x: 0, y: 0, w: W * 0.2, h: H, fill: 'bg' }),
    // 直排標題、字距超大（每字一行往下）
    tt(W * 0.06, H * 0.03, W * 0.16, csz, csz, 'fg', { diagonal: true, diagDx: 0, diagDy: H * 0.056 }),
    // 右上副標（橫向、寬字距）
    eb(W * 0.26, m, W * 0.5, ES, 'fg', { ls: 6 }),
    sub(W * 0.26, H * 0.1, W * 0.5, SS * 1.5, SS, 'gray', { ls: 2 }),
    // 右下日期 + 印章感（壓在下方深色照片上）
    sh('circle', { cx: W * 0.78, cy: H * 0.86, r: Math.min(W, H) * 0.03, fill: 'none', stroke: '#f3f1ea', strokeW: Math.min(W, H) * 0.0022 }),
    txt('d', W * 0.5, H * 0.92, W * 0.46, DS, DS, '#f3f1ea', { weight: 700, ls: 4, align: 'right' }),
  ];
}

// ════ 13 重複（重複元素強調、製造節奏律動）════
function c13a(W, H) { // A 網格重複照片（model: INTEGRATED / 美しきもの）
  const { m, TS, SS, DS, ES } = K(W, H, 1.0);
  const cells = [];
  const cols = 3, rows = 3, g = W * 0.012;
  const cw = (W - g * (cols - 1)) / cols, ch = (H - g * (rows - 1)) / rows;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    cells.push(img(c * (cw + g), r * (ch + g), cw, ch));
  }
  return [
    ...cells,
    sh('rect', { x: W * 0.12, y: H * 0.4, w: W * 0.76, h: TS * 3.2, fill: 'bg' }),
    eb(W * 0.12, H * 0.4 + TS * 0.4, W * 0.76, ES, 'fg', { ls: 3, align: 'center' }),
    tt(W * 0.12, H * 0.4 + TS * 0.9, W * 0.76, TS * 2, TS, 'fg', { align: 'center' }),
    sh('rect', { x: W * 0.28, y: H * 0.9, w: W * 0.44, h: DS * 1.7, fill: 'bg' }),
    txt('d', W * 0.28, H * 0.9 + DS * 0.45, W * 0.44, DS, DS, 'fg', { weight: 700, ls: 1, align: 'center' }),
  ];
}
function c13b(W, H) { // B 斜向重複照片條（model: 旅する大茶会）
  const { m, TS, SS, DS, ES } = K(W, H, 1.0);
  const strips = [];
  const n = 5, sw = W * 0.15, sh2 = H * 0.42;
  for (let i = 0; i < n; i++) {
    const x = W * 0.04 + i * (W * 0.92 - sw) / (n - 1);
    const y = (i % 2 === 0) ? H * 0.06 : H * 0.5;
    strips.push(img(x, y, sw, sh2));
  }
  return [
    ...strips,
    eb(m, H * 0.47, W - 2 * m, ES, 'fg', { ls: 3, align: 'center' }),
    tt(m, H * 0.5, W - 2 * m, TS * 2, TS, 'fg', { align: 'center' }),
    ...di(m, H * 0.9, W - 2 * m, DS, ES, 'fg', { align: 'center' }),
  ];
}
function c13c(W, H) { // C 直排重複照片欄
  const { m, TS, SS, DS, ES } = K(W, H, 1.0);
  const photos = [];
  const n = 3, ph = (H * 0.84) / n, pw = W * 0.42, g = H * 0.02;
  for (let i = 0; i < n; i++) photos.push(img(m, H * 0.08 + i * (ph + g - H * 0.02), pw, ph - g));
  return [
    ...photos,
    eb(W * 0.56, H * 0.1, W * 0.4, ES, 'fg', { ls: 3 }),
    tt(W * 0.56, H * 0.16, W * 0.4, TS * 3, TS, 'fg', { lh: 1.1 }),
    sub(W * 0.56, H * 0.5, W * 0.4, SS * 5, SS, 'gray'),
    ...di(W * 0.56, H * 0.86, W * 0.4, DS, ES, 'fg'),
  ];
}
function c13d(W, H) { // D 環形重複照片（model: THE GEESE 萬花筒）
  const { m, TS, SS, DS, ES } = K(W, H, 0.92);
  const cx = W * 0.5, cy = H * 0.46, R = Math.min(W, H) * 0.36, r = Math.min(W, H) * 0.095;
  const ring = [];
  const n = 8;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    ring.push(img(cx + R * Math.cos(a) - r, cy + R * Math.sin(a) - r, r * 2, r * 2, 'circle'));
  }
  return [
    ...ring,
    sh('circle', { cx, cy, r: Math.min(W, H) * 0.17, fill: 'fg' }),
    eb(cx - W * 0.2, cy - Math.min(W, H) * 0.05, W * 0.4, ES, 'bg', { ls: 2, align: 'center' }),
    tt(cx - W * 0.2, cy - Math.min(W, H) * 0.01, W * 0.4, TS * 1.6, TS, 'bg', { align: 'center' }),
    ...di(m, H * 0.92, W - 2 * m, DS, ES, 'fg', { align: 'center' }),
  ];
}
function c13e(W, H) { // E 散佈重複照片（model: HAPPY MOON 水滴拼貼）
  const { m, TS, SS, DS, ES } = K(W, H, 1.0);
  const spots = [
    [0.04, 0.08, 0.26, 0.2], [0.7, 0.05, 0.26, 0.2], [0.38, 0.3, 0.28, 0.22],
    [0.06, 0.42, 0.26, 0.2], [0.7, 0.42, 0.26, 0.2], [0.2, 0.74, 0.26, 0.2], [0.56, 0.74, 0.26, 0.2],
  ];
  const photos = spots.map((s) => img(s[0] * W, s[1] * H, s[2] * W, s[3] * H, 'ellipse'));
  return [
    ...photos,
    eb(m, H * 0.04, W - 2 * m, ES, 'fg', { ls: 4, align: 'center' }),
    tt(W * 0.66, H * 0.34, W * 0.3, TS * 3, TS, 'fg', { lh: 1.1, align: 'center' }),
    ...di(m, H * 0.92, W - 2 * m, DS, ES, 'fg', { align: 'center' }),
  ];
}

// ════ 14 文字邊框（文字排成邊框，既裝飾也是內容）════
function c14a(W, H) { // A 矩形框繞字（model: CHINO JOMON）
  const { m, TS, SS, DS, ES } = K(W, H, 1.0);
  const fx = m * 1.1, fy = m * 1.1, fw = W - 2 * fx, fh = H - 2 * fy;
  return [
    img(fx + W * 0.08, fy + H * 0.08, fw - W * 0.16, fh - H * 0.16),
    pt('rect', fx, fy, fw, fh, ES * 1.15, 'fg', { ls: 2, sep: '  ·  ' }),
    tt(fx, H * 0.44, fw, TS * 2, TS, 'fg', { align: 'center' }),
    txt('d', fx, H * 0.56, fw, ES * 1.6, ES, 'gray', { ls: 2, align: 'center' }),
  ];
}
function c14b(W, H) { // B 橢圓軌道繞字（model: 透視環繞主體一圈）
  const { m, TS, SS, DS, ES } = K(W, H, 0.95);
  return [
    img(0, 0, W, H),
    sh('rect', { x: 0, y: 0, w: W, h: H, fill: '#000000', opacity: 0.12 }),
    pt('ellipse', W * 0.5 - W * 0.56, H * 0.5 - H * 0.17, W * 1.12, H * 0.34, ES * 1.45, '#f3f1ea', { sep: '   //   ', weight: 800 }),
    eb(m, m * 0.8, W - 2 * m, ES, '#f3f1ea', { ls: 3, align: 'center' }),
    txt('d', m, H - m * 1.3, W - 2 * m, ES * 1.6, ES, '#f3f1ea', { weight: 700, ls: 2, align: 'center' }),
  ];
}
function c14c(W, H) { // C 膠囊繞字（model: capsule path）
  const { m, TS, SS, DS, ES } = K(W, H, 1.0);
  const cw = W - 2 * m, ch = H * 0.5, cx = m, cy = H * 0.25;
  return [
    img(cx + ch * 0.5, cy + H * 0.06, cw - ch, ch - H * 0.12),
    pt('capsule', cx, cy, cw, ch, ES * 1.15, 'fg', { sep: '  ·  ' }),
    eb(m, m * 0.8, W - 2 * m, ES, 'fg', { ls: 4, align: 'center' }),
    tt(m, H * 0.82, W - 2 * m, TS * 1.6, TS, 'fg', { align: 'center' }),
  ];
}
function c14d(W, H) { // D S波浪繞字（model: 手寫感橫向波浪）
  const { m, TS, SS, DS, ES } = K(W, H, 0.95);
  return [
    img(0, 0, W, H),
    sh('rect', { x: 0, y: 0, w: W, h: H, fill: '#000000', opacity: 0.12 }),
    pt('wave', 0, H * 0.2, W, H * 0.3, ES * 1.2, '#f3f1ea', { sep: '   ', ls: 1 }),
    pt('wave', 0, H * 0.55, W, H * 0.3, ES * 1.2, '#f3f1ea', { role: 's', sep: '   ', ls: 1 }),
    eb(m, m * 0.8, W - 2 * m, ES, '#f3f1ea', { ls: 3, align: 'center' }),
    txt('d', m, H - m * 1.3, W - 2 * m, ES * 1.6, ES, '#f3f1ea', { weight: 700, ls: 2, align: 'center' }),
  ];
}
function c14e(W, H) { // E 螺旋繞字（model: Stroke Of Luck 鬆散螺旋）
  const { m, TS, SS, DS, ES } = K(W, H, 0.95);
  return [
    img(0, 0, W, H),
    sh('rect', { x: 0, y: 0, w: W, h: H, fill: '#000000', opacity: 0.1 }),
    pt('spiral', W * 0.06, H * 0.06, W * 0.88, H * 0.88, ES * 1.35, '#f3f1ea', { sep: '   ·   ', weight: 700 }),
    txt('d', m, H - m * 1.1, W - 2 * m, ES * 1.6, ES, '#f3f1ea', { weight: 700, ls: 2, align: 'center' }),
  ];
}

// ════ 17 對話框（用對話框處理文字，親切漫畫感）════
function c17a(W, H) { // A 多氣泡（model: 花緑 seasoning，多種造型環繞）
  const { m, TS, SS, DS, ES } = K(W, H, 0.92);
  const sw = Math.min(W, H) * 0.0032;
  return [
    img(W * 0.24, H * 0.4, W * 0.52, H * 0.5),
    // 左上主標氣泡（圓角）
    sh('bubble', { x: m, y: H * 0.1, w: W * 0.5, h: H * 0.15, variant: 'round', rx: H * 0.05, fill: 'none', stroke: 'fg', strokeW: sw, tail: 'br' }),
    tt(m + W * 0.03, H * 0.125, W * 0.44, TS * 1.5, TS, 'fg'),
    // 右上橢圓
    sh('bubble', { x: W * 0.6, y: H * 0.06, w: W * 0.32, h: H * 0.12, variant: 'oval', fill: 'fg', tail: 'bl' }),
    eb(W * 0.63, H * 0.1, W * 0.26, ES, 'bg', { align: 'center' }),
    // 左中橢圓
    sh('bubble', { x: m, y: H * 0.34, w: W * 0.24, h: H * 0.13, variant: 'oval', fill: 'none', stroke: 'fg', strokeW: sw, tail: 'br' }),
    sub(m + W * 0.02, H * 0.37, W * 0.2, SS * 2, SS, 'fg', { align: 'center' }),
    // 右中爆炸框
    sh('bubble', { x: W * 0.72, y: H * 0.32, w: W * 0.22, h: H * 0.16, variant: 'burst', fill: 'fg' }),
    txt('s', W * 0.74, H * 0.37, W * 0.18, SS * 2, SS, 'bg', { align: 'center' }),
    // 右下橢圓日期
    sh('bubble', { x: W * 0.66, y: H * 0.74, w: W * 0.28, h: H * 0.12, variant: 'oval', fill: 'none', stroke: 'fg', strokeW: sw, tail: 'tl' }),
    txt('d', W * 0.68, H * 0.78, W * 0.24, DS, DS, 'fg', { weight: 700, ls: 1, align: 'center' }),
    // 左下小圓角
    sh('bubble', { x: m, y: H * 0.76, w: W * 0.24, h: H * 0.1, variant: 'round', rx: H * 0.04, fill: 'fg', tail: 'tr' }),
    txt('i', m + W * 0.02, H * 0.785, W * 0.2, ES * 1.4, ES, 'bg', { align: 'center' }),
  ];
}
function c17b(W, H) { // B 中央雲朵思考氣泡
  const { m, TS, SS, DS, ES } = K(W, H, 1.0);
  return [
    img(0, 0, W, H),
    sh('rect', { x: 0, y: 0, w: W, h: H, fill: '#000000', opacity: 0.12 }),
    sh('bubble', { x: W * 0.12, y: H * 0.28, w: W * 0.76, h: H * 0.34, variant: 'cloud', fill: '#f3f1ea' }),
    tt(W * 0.18, H * 0.37, W * 0.64, TS * 2, TS, '#141414', { align: 'center' }),
    eb(W * 0.18, H * 0.33, W * 0.64, ES, '#555', { align: 'center' }),
    ...di(m, H * 0.85, W - 2 * m, DS, ES, '#f3f1ea', { align: 'center' }),
  ];
}
function c17c(W, H) { // C 照片對話框環繞（model: oVice テレワーク）
  const { m, TS, SS, DS, ES } = K(W, H, 1.05);
  const lw = Math.min(W, H) * 0.004;
  return [
    // 四角散佈的照片對話框（圓/橢圓 + 尾巴），環繞中央標題
    img(W * 0.04, H * 0.02, W * 0.3, H * 0.22, 'bubble', { bubble: { variant: 'circle', tail: 'br' }, stroke: 'fg', strokeW: lw }),
    img(W * 0.62, H * 0.06, W * 0.34, H * 0.2, 'bubble', { bubble: { variant: 'circle', tail: 'bl' }, stroke: 'fg', strokeW: lw }),
    img(W * 0.66, H * 0.42, W * 0.3, H * 0.22, 'bubble', { bubble: { variant: 'circle', tail: 'bl' }, stroke: 'fg', strokeW: lw }),
    img(W * 0.02, H * 0.68, W * 0.28, H * 0.2, 'bubble', { bubble: { variant: 'circle', tail: 'tr' }, stroke: 'fg', strokeW: lw }),
    img(W * 0.36, H * 0.78, W * 0.3, H * 0.2, 'bubble', { bubble: { variant: 'circle', tail: 'tl' }, stroke: 'fg', strokeW: lw }),
    // 中央標題群組
    tt(W * 0.06, H * 0.33, W * 0.6, TS * 2.2, TS, 'fg', { lh: 1.1 }),
    sub(W * 0.06, H * 0.5, W * 0.52, SS * 3, SS, 'gray', { lh: 1.5 }),
    ...di(W * 0.06, H * 0.62, W * 0.5, DS, ES, 'fg'),
  ];
}
function c17d(W, H) { // D 滿版爆炸（model: BIG のり弁，全爆炸框漫畫感）
  const { m, TS, SS, DS, ES } = K(W, H, 1.5);
  const lw = Math.min(W, H) * 0.004;
  return [
    img(0, 0, W, H),
    // 頂部大爆炸標題框
    sh('bubble', { x: W * 0.06, y: H * 0.05, w: W * 0.88, h: H * 0.2, variant: 'burst', fill: 'fg' }),
    tt(W * 0.1, H * 0.085, W * 0.8, TS, TS, 'bg', { align: 'center' }),
    // 環繞四角的小爆炸對話框
    sh('bubble', { x: m, y: H * 0.32, w: W * 0.26, h: H * 0.13, variant: 'burst', fill: 'none', stroke: 'fg', strokeW: lw }),
    txt('s', m, H * 0.355, W * 0.26, SS * 1.3, SS, 'fg', { weight: 800, align: 'center' }),
    sh('bubble', { x: W * 0.72, y: H * 0.32, w: W * 0.24, h: H * 0.13, variant: 'burst', fill: 'none', stroke: 'fg', strokeW: lw }),
    txt('e', W * 0.72, H * 0.355, W * 0.24, ES * 1.3, ES, 'fg', { weight: 800, align: 'center' }),
    sh('bubble', { x: m, y: H * 0.6, w: W * 0.26, h: H * 0.13, variant: 'burst', fill: 'none', stroke: 'fg', strokeW: lw }),
    txt('i', m, H * 0.635, W * 0.26, ES * 1.3, ES, 'fg', { weight: 800, align: 'center' }),
    // 右下大爆炸：強調數字/日期
    sh('bubble', { x: W * 0.58, y: H * 0.62, w: W * 0.36, h: H * 0.18, variant: 'burst', fill: 'fg' }),
    ...di(W * 0.61, H * 0.68, W * 0.3, DS, ES, 'bg'),
    // 底部爆炸標語
    sh('bubble', { x: m, y: H * 0.82, w: W * 0.5, h: H * 0.13, variant: 'burst', fill: 'fg' }),
    txt('d', m, H * 0.85, W * 0.5, DS * 1.3, DS, 'bg', { weight: 800, align: 'center' }),
  ];
}
function c17e(W, H) { // E 群泡圍中央（model: バクラク インボイス サミット）
  const { m, TS, SS, DS, ES } = K(W, H, 1.0);
  const lw = Math.min(W, H) * 0.003;
  // 周圍散佈的小對話泡（指向中央）
  const ring = [
    { x: W * 0.04, y: H * 0.13, w: W * 0.3, h: H * 0.07, tail: 'br', t: 's' },
    { x: W * 0.62, y: H * 0.12, w: W * 0.32, h: H * 0.07, tail: 'bl', t: 'e' },
    { x: W * 0.03, y: H * 0.42, w: W * 0.22, h: H * 0.06, tail: 'br', t: 'i' },
    { x: W * 0.72, y: H * 0.4, w: W * 0.24, h: H * 0.06, tail: 'bl', t: 's' },
    { x: W * 0.04, y: H * 0.72, w: W * 0.3, h: H * 0.07, tail: 'tr', t: 'e' },
    { x: W * 0.62, y: H * 0.73, w: W * 0.33, h: H * 0.07, tail: 'tl', t: 'i' },
  ];
  const bubbles = [];
  ring.forEach((b, k) => {
    bubbles.push(sh('bubble', { x: b.x, y: b.y, w: b.w, h: b.h, variant: 'round', fill: 'none', stroke: 'bg', strokeW: lw, tail: b.tail }));
    bubbles.push(txt(b.t, b.x + b.w * 0.08, b.y + b.h * 0.28, b.w * 0.84, b.h * 0.45, ES * 0.82, 'bg', { weight: 500, align: 'center' }));
  });
  return [
    img(0, 0, W, H),
    sh('rect', { x: 0, y: 0, w: W, h: H, fill: '#000000', opacity: 0.18 }),
    // 頂部徽章 + Logo
    sh('bubble', { x: m, y: H * 0.05, w: W * 0.2, h: H * 0.05, variant: 'round', fill: 'fg' }),
    eb(m, H * 0.062, W * 0.2, ES * 0.85, 'bg', { align: 'center', weight: 700 }),
    ...bubbles,
    // 中央大圓角對話框（適中圓角，尾巴接在平直底邊上）
    sh('bubble', { x: W * 0.13, y: H * 0.22, w: W * 0.74, h: H * 0.5, variant: 'round', rx: H * 0.05, fill: 'bg', stroke: 'fg', strokeW: lw * 1.6, tail: 'bl', tailSize: H * 0.07 }),
    tt(W * 0.17, H * 0.28, W * 0.66, TS * 1.5, TS, 'fg', { align: 'center', weight: 800 }),
    txt('s', W * 0.17, H * 0.62, W * 0.66, SS * 1.2, SS, 'fg', { weight: 600, align: 'center' }),
    // 底部日期列
    sh('bubble', { x: m, y: H * 0.82, w: W * 0.26, h: H * 0.06, variant: 'round', fill: 'fg' }),
    txt('e', m, H * 0.835, W * 0.26, ES * 1.1, ES, 'bg', { weight: 700, align: 'center' }),
    txt('d', W * 0.34, H * 0.825, W * 0.6, DS * 1.4, DS, 'fg', { weight: 800 }),
  ];
}

// ════ 19 類Logo風（文字裝飾成 Logo 樣式，高識別度）════
function c19a(W, H) { // A 框中標題 Logo（滿版照片 + 框標）
  const { m, TS, SS, DS, ES } = K(W, H, 1.0);
  const lw = Math.min(W, H) * 0.0042;
  const fx = W * 0.26, fy = H * 0.22, fw = W * 0.48, fh = H * 0.46;
  return [
    img(0, 0, W, H),
    sh('rect', { x: 0, y: 0, w: W, h: H, fill: '#000000', opacity: 0.18 }),
    // 扇貝邊徽章框（白色描邊）
    sh('scallop', { x: fx, y: fy, w: fw, h: fh, bump: Math.min(W, H) * 0.032, fill: 'none', stroke: '#f3f1ea', strokeW: lw }),
    // 框內：小標 + 大標 + 日期 + 場地
    eb(fx, fy + fh * 0.1, fw, ES, '#f3f1ea', { ls: 5, align: 'center' }),
    tt(fx + fw * 0.05, fy + fh * 0.22, fw * 0.9, fh * 0.4, TS * 0.92, '#f3f1ea', { align: 'center', lh: 1.0 }),
    txt('d', fx, fy + fh * 0.66, fw, DS * 1.2, DS, '#f3f1ea', { weight: 700, ls: 1, align: 'center' }),
    txt('i', fx, fy + fh * 0.82, fw, ES * 1.4, ES, '#f3f1ea', { ls: 2, align: 'center' }),
    // 框下標語
    sub(W * 0.16, fy + fh + H * 0.04, W * 0.68, SS * 1.6, SS, '#f3f1ea', { align: 'center', ls: 1 }),
  ];
}
function c19b(W, H) { // B 徽章圓章 Logo（滿版照片 + 圓章）
  const { m, TS, SS, DS, ES } = K(W, H, 0.85);
  const lw = Math.min(W, H) * 0.003;
  const cx = W * 0.5, cy = H * 0.4;
  const rx = Math.min(W, H) * 0.24, ry = Math.min(W, H) * 0.3;
  return [
    img(0, 0, W, H),
    sh('rect', { x: 0, y: 0, w: W, h: H, fill: '#000000', opacity: 0.16 }),
    // 中央橢圓扇貝徽章（白底描邊）
    sh('scallop', { oval: true, x: cx - rx, y: cy - ry, w: rx * 2, h: ry * 2, bump: Math.min(rx, ry) * 0.2, fill: '#f3f1ea', stroke: 'fg', strokeW: lw }),
    // 徽章內標題（多行）
    tt(cx - rx * 0.86, cy - ry * 0.4, rx * 1.72, ry, TS * 0.82, 'fg', { align: 'center', lh: 1.08 }),
    // 邊緣纏繞文字（沿橢圓重複繞行）
    txt('s', 0, 0, 0, 0, ES * 1.05, '#f3f1ea', { pathLoop: { shape: 'ellipse', x: cx - rx * 1.28, y: cy - ry * 1.2, w: rx * 2.56, h: ry * 2.4, sep: '  ·  ' } }),
    // 底部日期 + 場地
    txt('d', m, cy + ry * 1.38, W - 2 * m, DS * 1.4, DS, '#f3f1ea', { weight: 700, ls: 1, align: 'center' }),
    txt('i', m, cy + ry * 1.38 + DS * 1.8, W - 2 * m, ES * 1.4, ES, '#f3f1ea', { ls: 2, align: 'center' }),
  ];
}
function c19c(W, H) { // C 緞帶橫幅 Logo
  const { m, TS, SS, DS, ES } = K(W, H, 0.92);
  const lw = Math.min(W, H) * 0.0026;
  return [
    // 散落的照片框（依參考圖位置）
    img(W * 0.05, H * 0.05, W * 0.23, H * 0.12),
    img(W * 0.38, H * 0.04, W * 0.24, H * 0.1),
    img(W * 0.04, H * 0.34, W * 0.17, H * 0.16),
    img(W * 0.79, H * 0.4, W * 0.17, H * 0.18),
    img(W * 0.36, H * 0.76, W * 0.28, H * 0.2),
    // 標題（兩行置中）
    tt(W * 0.18, H * 0.33, W * 0.64, H * 0.12, TS * 0.82, 'fg', { align: 'center', lh: 1.05 }),
    // 橫幅緞帶 + 日期
    sh('ribbon', { variant: 'banner', x: W * 0.18, y: H * 0.47, w: W * 0.64, h: H * 0.07, fill: 'none', stroke: 'fg', strokeW: lw }),
    txt('d', W * 0.18, H * 0.485, W * 0.64, DS * 1.4, DS, 'fg', { weight: 700, ls: 2, align: 'center' }),
    eb(m, H * 0.59, W - 2 * m, ES, 'fg', { ls: 4, align: 'center' }),
    txt('i', m, H * 0.63, W - 2 * m, ES * 1.4, ES, 'gray', { ls: 2, align: 'center' }),
  ];
}
function c19d(W, H) { // D 字母組合標記
  const { m, TS, SS, DS, ES } = K(W, H, 1.1);
  const lw = Math.min(W, H) * 0.0022;
  return [
    // 緊貼中央標題兩側的直排英文（包覆感，自動壓縮以貼合標題高度）
    txt('e', W * 0.235, H * 0.31, W * 0.04, H * 0.34, ES * 0.92, 'gray', { diagonal: true, diagDx: 0, fitH: true }),
    txt('e', W * 0.725, H * 0.31, W * 0.04, H * 0.34, ES * 0.92, 'gray', { diagonal: true, diagDx: 0, fitH: true }),
    // 頂部小標（緊貼標題上方、分行包覆）
    sub(W * 0.26, H * 0.135, W * 0.48, SS * 4.6, SS, 'gray', { align: 'center', ls: 2, lh: 1.4 }),
    sh('line', { x1: W * 0.44, y1: H * 0.275, x2: W * 0.56, y2: H * 0.275, stroke: 'fg', strokeW: lw }),
    // 中央巨大徽章標題（每字一行堆疊）
    tt(W * 0.26, H * 0.285, W * 0.48, H * 0.32, TS * 1.15, 'fg', { stackWords: true, align: 'center', lh: 1.0 }),
    // 日期
    txt('d', m, H * 0.605, W - 2 * m, DS * 1.6, DS * 1.2, 'fg', { weight: 700, ls: 2, align: 'center' }),
    // 底部照片（較矮、與文字留間距）
    img(0, H * 0.74, W, H * 0.26),
  ];
}
function c19e(W, H) { // E 盾形外框 Logo（滿版照片 + 盾徽）
  const { m, TS, SS, DS, ES } = K(W, H, 0.82);
  const lw = Math.min(W, H) * 0.003;
  const cx = W * 0.5;
  const rr = Math.min(W, H) * 0.03;
  return [
    // 上方兩張圓角照片
    img(W * 0.06, H * 0.07, W * 0.42, H * 0.28, null, { rx: rr }),
    img(W * 0.52, H * 0.07, W * 0.42, H * 0.28, null, { rx: rr }),
    // 中央四花瓣徽章（上下左右各一花瓣，白底描邊）
    sh('scallop', { petals: 4, x: cx - W * 0.28, y: H * 0.3, w: W * 0.56, h: H * 0.34, fill: '#f3f1ea', stroke: 'fg', strokeW: lw }),
    // 徽章內標題（堆疊置中）
    tt(cx - W * 0.24, H * 0.37, W * 0.48, H * 0.22, TS * 0.92, 'fg', { stackWords: true, align: 'center', lh: 1.05 }),
    // 徽章邊緣纏繞文字
    txt('s', 0, 0, 0, 0, ES * 0.95, 'gray', { pathLoop: { shape: 'ellipse', x: cx - W * 0.32, y: H * 0.275, w: W * 0.64, h: H * 0.39, sep: '  ·  ' } }),
    // 底部日期
    txt('d', m, H * 0.69, W - 2 * m, DS * 1.4, DS, 'fg', { weight: 700, ls: 1, align: 'center' }),
    // 底部寬幅圓角照片
    img(W * 0.1, H * 0.75, W * 0.8, H * 0.18, null, { rx: rr }),
  ];
}

// ════ 20 留白（大量留白、極簡、讓照片呼吸）════
function c20a(W, H) { // A 小主體大留白（model: UNIQLO 父の日）
  const { m, TS, SS, DS, ES } = K(W, H, 0.88);
  return [
    // 右上小照片，四周大量留白
    img(W * 0.6, H * 0.16, W * 0.26, H * 0.2),
    // 左下文字群
    eb(m * 1.3, H * 0.6, W * 0.5, ES, 'fg', { ls: 2 }),
    tt(m * 1.3, H * 0.635, W * 0.5, TS * 2.4, TS * 0.88, 'fg', { lh: 1.12 }),
    txt('s', m * 1.3, H * 0.8, W * 0.42, SS * 4, SS, 'gray', { lh: 1.7 }),
    txt('d', m * 1.3, H * 0.92, W * 0.5, DS, DS, 'fg', { weight: 700, ls: 1 }),
  ];
}
function c20b(W, H) { // B 中央橫幅微主體（model: 京都丹後鉄道）
  const { m, TS, SS, DS, ES } = K(W, H, 0.82);
  return [
    // 中央細長橫幅照片，上下大量留白
    img(W * 0.08, H * 0.4, W * 0.84, H * 0.16),
    // 右上極小說明（留白區）
    txt('s', W * 0.6, H * 0.16, W * 0.32, SS * 2.4, SS * 0.92, 'gray', { align: 'right', lh: 1.6 }),
    // 左下小標題 + eyebrow
    eb(W * 0.08, H * 0.66, W * 0.5, ES, 'gray', { ls: 2 }),
    tt(W * 0.08, H * 0.695, W * 0.5, TS * 1.4, TS * 0.62, 'fg', { lh: 1.1 }),
    txt('d', W * 0.08, H * 0.9, W * 0.5, DS, DS, 'fg', { weight: 700, ls: 1 }),
  ];
}
function c20c(W, H) { // C 上標下照（model: 朝支度 Morning Manual）
  const { m, TS, SS, DS, ES } = K(W, H, 0.92);
  const cx = W * 0.5;
  return [
    // 頂部弧形小標
    eb(0, 0, 0, ES * 1.1, 'gray', { arc: { cx, cy: H * 0.26, r: W * 0.24 }, ls: 3, align: 'center' }),
    // 中央大標題
    tt(W * 0.15, H * 0.3, W * 0.7, TS * 2, TS, 'fg', { align: 'center' }),
    // 標題下小副標
    txt('s', W * 0.22, H * 0.44, W * 0.56, SS * 3, SS, 'gray', { align: 'center', lh: 1.6 }),
    // 底部置中小照片
    img(W * 0.34, H * 0.56, W * 0.32, H * 0.36),
  ];
}
function c20d(W, H) { // D 左照右白（model: Re:use KOMEHYO）
  const { m, TS, SS, DS, ES } = K(W, H, 0.95);
  return [
    // 滿版照片（留白建在照片中，如 KOMEHYO 天空留白）
    img(0, 0, W, H),
    // 右上品牌 + 標語
    eb(W * 0.5, H * 0.05, W * 0.44, ES, 'fg', { ls: 1, align: 'right' }),
    txt('i', W * 0.5, H * 0.085, W * 0.44, ES * 1.4, ES * 0.92, 'gray', { ls: 1, align: 'right' }),
    // 左下大標題（可兩行）
    tt(m * 1.2, H * 0.54, W * 0.52, TS * 2.6, TS * 0.98, 'fg', { lh: 1.02 }),
    // 標題下內文段落
    txt('s', m * 1.2, H * 0.74, W * 0.5, SS * 5, SS * 0.92, 'gray', { lh: 1.7 }),
    // 右下日期/週年
    txt('d', W * 0.6, H * 0.92, W * 0.34, DS, DS, 'fg', { weight: 700, ls: 1, align: 'right' }),
  ];
}
function c20e(W, H) { // E 滿版淡照（model: Suntory Design Dialogue）
  const { m, TS, SS, DS, ES } = K(W, H, 0.9);
  return [
    // 滿版照片
    img(0, 0, W, H),
    sh('rect', { x: 0, y: 0, w: W, h: H, fill: '#000000', opacity: 0.1 }),
    // 上方左右標題（留白區疊字）
    tt(m, H * 0.1, W * 0.42, TS * 3.4, TS * 0.72, '#ffffff', { lh: 1.1 }),
    eb(W * 0.56, H * 0.12, W * 0.4, ES, '#ffffff', { ls: 1, align: 'right' }),
    sub(W * 0.56, H * 0.16, W * 0.4, SS * 1.4, SS, '#ffffff', { align: 'right' }),
    // 中段日期 + 場地（壓在留白處）
    txt('d', W * 0.5, H * 0.44, W * 0.44, DS * 1.3, DS, '#ffffff', { weight: 700, ls: 1 }),
    txt('i', W * 0.5, H * 0.5, W * 0.44, ES * 2.4, ES, '#ffffff', { lh: 1.5 }),
  ];
}

export const CATEGORIES = [
  {
    id: 'duotone', name: '01 雙色搭配', en: 'Two-color Split', desc: '切割畫面後配置不同色面，色彩即資訊層次。',
    variants: [
      { id: 'a', name: 'A 左右對切', theme: 'Vertical Split', ref: 'いもいも', refImg: 'duotone-a.jpg', frames: c1a },
      { id: 'b', name: 'B 上下對切', theme: 'Horizontal Split', ref: 'Package Design', refImg: 'duotone-b.jpg', frames: c1b },
      { id: 'c', name: 'C 上圖下文', theme: 'Image Over Text', ref: 'ISUZU ELF', refImg: 'duotone-c.jpg', frames: c1c },
      { id: 'd', name: 'D 斜切雙色', theme: 'Diagonal Split', ref: 'AMAZING CURRY', refImg: 'duotone-d.jpg', frames: c1d },
      { id: 'e', name: 'E 邊欄色塊', theme: 'Side Panel', ref: 'KIRIN 生茶', refImg: 'duotone-e.jpg', frames: c1e },
    ],
  },
  {
    id: 'diagonal', name: '02 斜線', en: 'Diagonal Lines', desc: '斜線注入動感與律動，視線自然流動。',
    variants: [
      { id: 'a', name: 'A 斜紋律動', theme: 'Diagonal Rhythm', ref: 'NemoWV1', refImg: 'diagonal-a.jpg', frames: c2a },
      { id: 'b', name: 'B 粗斜紋滿版', theme: 'Bold Stripes', ref: '太郎サブレ', refImg: 'diagonal-b.jpg', frames: c2b },
      { id: 'c', name: 'C 標題堆疊', theme: 'Stacked Title', ref: 'MIDTOWN SUMMER', refImg: 'diagonal-c.jpg', frames: c2c },
      { id: 'd', name: 'D 寬斜帶', theme: 'Wide Diagonal Band', ref: 'LEMONADE STAND', refImg: 'diagonal-d.jpg', frames: c2d },
      { id: 'e', name: 'E 細紋框景', theme: 'Fine Line Frame', ref: 'JAPAN MOTIF', refImg: 'diagonal-e.jpg', frames: c2e },
    ],
  },
  {
    id: 'circle', name: '03 圓形衝擊', en: 'Circle Impact', desc: '大圓聚焦視線，讓重點無所遁形。',
    variants: [
      { id: 'a', name: 'A 大圓出血', theme: 'Bleeding Circle', ref: 'まる', refImg: 'circle-a.jpg', frames: c3a },
      { id: 'b', name: 'B 置中大圓', theme: 'Centered Circle', ref: 'Manhole', refImg: 'circle-b.jpg', frames: c3b },
      { id: 'c', name: 'C 雙圓望遠鏡', theme: 'Twin Circles', ref: 'Dreamer at days', refImg: 'circle-c.jpg', frames: c3c },
      { id: 'd', name: 'D 上下半圓', theme: 'Split Circles', ref: 'Claude Cormier', refImg: 'circle-d.jpg', frames: c3d },
      { id: 'e', name: 'E 大圓小圓', theme: 'Big & Small Circles', ref: 'Lucky Chan-sil', refImg: 'circle-e.jpg', frames: c3e },
    ],
  },
  {
    id: 'bands', name: '04 帶狀色塊', en: 'Color Bands', desc: '像螢光筆畫重點，文字墊色帶醒目有節奏。',
    variants: [
      { id: 'a', name: 'A 行帶拼貼', theme: 'Banded Lines', ref: 'YCAM', refImg: 'bands-a.jpg', frames: c4a },
      { id: 'b', name: 'B 中央粗帶', theme: 'Center Band', ref: '7DAYS 7STYLE', refImg: 'bands-b.jpg', frames: c4b },
      { id: 'c', name: 'C 斜貼紙', theme: 'Diagonal Sticker', ref: '東京芸術祭', refImg: 'bands-c.jpg', frames: c4c },
      { id: 'd', name: 'D 直橫交錯', theme: 'Cross Bands', ref: 'YCAM 直帶', refImg: 'bands-d.jpg', frames: c4d },
      { id: 'e', name: 'E 底部色帶', theme: 'Bottom Band', ref: 'RED BULL', refImg: 'bands-e.jpg', frames: c4e },
    ],
  },
  {
    id: 'dots', name: '05 圓點裝飾', en: 'Dot Decoration', desc: '圓點如氣泡輕盈跳躍，增添活潑節奏。',
    variants: [
      { id: 'a', name: 'A 黑白散布', theme: 'Scattered Dots', ref: 'Twinkle Twinkle', refImg: 'dots-a.jpg', frames: c5a },
      { id: 'b', name: 'B 水玉覆蓋', theme: 'Polka Field', ref: 'Individuality', refImg: 'dots-b.jpg', frames: c5b },
      { id: 'c', name: 'C 光暈大點', theme: 'Halo Dots', ref: '思春期の春', refImg: 'dots-c.jpg', frames: c5c },
      { id: 'd', name: 'D 雙圖圓點', theme: 'Dual Image Dots', ref: 'NAGANO', refImg: 'dots-d.jpg', frames: c5d },
      { id: 'e', name: 'E 點綴滿版', theme: 'Allover Dots', ref: 'GIVE ME BLUESKY', refImg: 'dots-e.jpg', frames: c5e },
    ],
  },
  {
    id: 'triangle', name: '06 三角形', en: 'Triangles', desc: '最具方向感與動感的幾何構圖。',
    variants: [
      { id: 'a', name: 'A 斜角色帶', theme: 'Corner Wedge', ref: '八王子古本まつり', refImg: 'triangle-a.jpg', frames: c6a },
      { id: 'b', name: 'B 大三角入侵', theme: 'Triangle Intrusion', ref: 'OPEN CAMPUS', refImg: 'triangle-b.jpg', frames: c6b },
      { id: 'c', name: 'C 紙飛機', theme: 'Paper Plane', ref: 'DODA', refImg: 'triangle-c.jpg', frames: c6c },
      { id: 'd', name: 'D 菱形窗', theme: 'Diamond Window', ref: '千曲川マルシェ', refImg: 'triangle-d.jpg', frames: c6d },
      { id: 'e', name: 'E 三角碎片', theme: 'Triangle Shards', ref: 'JOINUS', refImg: 'triangle-e.jpg', frames: c6e },
    ],
  },
  {
    id: 'arch', name: '07 拱形', en: 'Arch Shape', desc: '古典優雅的視覺框架，弧線引導聚焦。',
    variants: [
      { id: 'a', name: 'A 拱形窗', theme: 'Arch Window', ref: 'Stories in a Garden', refImg: 'arch-a.jpg', frames: c7a },
      { id: 'b', name: 'B 寬拱窗', theme: 'Wide Arch', ref: '横浜謎解き', refImg: 'arch-b.jpg', frames: c7b },
      { id: 'c', name: 'C 雙拱並列', theme: 'Twin Arches', ref: '拱形變奏', refImg: 'arch-c.jpg', frames: c7c },
      { id: 'd', name: 'D 墨底拱窗', theme: 'Ink Arch', ref: 'Bull-Dog', refImg: 'arch-d.jpg', frames: c7d },
      { id: 'e', name: 'E 落地拱門', theme: 'Full Arch', ref: '拱形變奏', refImg: 'arch-e.jpg', frames: c7e },
    ],
  },
  {
    id: 'lineframe', name: '08 用線框起來', en: 'Frame with Lines', desc: '線框收斂版面、整合分散元素。',
    variants: [
      { id: 'a', name: 'A 線框盒交疊', theme: 'Overlapping Frames', ref: '恐竜たちと水族館', refImg: 'lineframe-a.jpg', frames: c8a },
      { id: 'b', name: 'B 全版邊框', theme: 'Full Border', ref: '猫いつだって展', refImg: 'lineframe-b.jpg', frames: c8b },
      { id: 'c', name: 'C 報紙分欄', theme: 'Newspaper Columns', ref: '山形新聞', refImg: 'lineframe-c.jpg', frames: c8c },
      { id: 'd', name: 'D 裝飾框章', theme: 'Stamp Frame', ref: 'KIRIN moogy', refImg: 'lineframe-d.jpg', frames: c8d },
      { id: 'e', name: 'E 角落標註', theme: 'Corner Marks', ref: '嗨！北流', refImg: 'lineframe-e.jpg', frames: c8e },
    ],
  },
  {
    id: 'wrap', name: '09 包起來', en: 'Wrap it up', desc: '用形狀容器包住主體，整合視覺、創造焦點。',
    variants: [
      { id: 'a', name: 'A 橢圓堆疊', theme: 'Stacked Ovals', ref: '感知', refImg: 'wrap-a.jpg', frames: c9a },
      { id: 'b', name: 'B 大橢圓置中', theme: 'Centered Oval', ref: '知覧にっぽん紅茶', refImg: 'wrap-b.jpg', frames: c9b },
      { id: 'c', name: 'C 膠囊容器', theme: 'Capsule', ref: 'Kikkoman', refImg: 'wrap-c.jpg', frames: c9c },
      { id: 'd', name: 'D 橢圓拼貼', theme: 'Oval Collage', ref: 'Secese', refImg: 'wrap-d.jpg', frames: c9d },
      { id: 'e', name: 'E 菱形窗', theme: 'Diamond Frame', ref: '詩季彩變奏', refImg: 'wrap-e.jpg', frames: c9e },
    ],
  },
  {
    id: 'grid', name: '10 框格', en: 'Grid Layout', desc: '網格切割畫面，展現整齊的韻律美。',
    variants: [
      { id: 'a', name: 'A 深底網格', theme: 'Dark Grid', ref: 'Mamíferos', refImg: 'grid-a.jpg', frames: c10a },
      { id: 'b', name: 'B 菱形格', theme: 'Diamond Grid', ref: '詩季彩', refImg: 'grid-b.jpg', frames: c10b },
      { id: 'c', name: 'C 市場瀑布格', theme: 'Masonry Grid', ref: 'てみて市場', refImg: 'grid-c.jpg', frames: c10c },
      { id: 'd', name: 'D 格紋拼貼', theme: 'Patchwork Grid', ref: '香りの器', refImg: 'grid-d.jpg', frames: c10d },
      { id: 'e', name: 'E 滿格混排', theme: 'Full Mixed Grid', ref: 'LUMINE MIX', refImg: 'grid-e.jpg', frames: c10e },
    ],
  },
  {
    id: 'thickline', name: '11 藉由粗線整合視線', en: 'Bold Line Guide', desc: '粗線條引導視線、整合分散元素，建立閱讀順序。', group: 'type',
    variants: [
      { id: 'a', name: 'A 粗線串字', theme: 'Linked Rules', ref: '粗線參考', refImg: 'thickline-a.jpg', frames: c11a },
      { id: 'b', name: 'B 粗橫帶分隔', theme: 'Heavy Divider', ref: '粗線參考', refImg: 'thickline-b.jpg', frames: c11b },
      { id: 'c', name: 'C 左粗脊', theme: 'Bold Spine', ref: '粗線參考', refImg: 'thickline-c.jpg', frames: c11c },
      { id: 'd', name: 'D 行間粗線', theme: 'Interline Rules', ref: '粗線參考', refImg: 'thickline-d.jpg', frames: c11d },
      { id: 'e', name: 'E 粗框角', theme: 'Corner Brackets', ref: '粗線參考', refImg: 'thickline-e.jpg', frames: c11e },
    ],
  },
  {
    id: 'hollow', name: '12 鏤空字', en: 'Hollow Text', desc: '描邊字疊在照片上，讓照片從鏤空處透出，通透輕盈。', group: 'type',
    variants: [
      { id: 'a', name: 'A 上半密排', theme: 'Packed Top', ref: '鏤空字參考', refImg: 'hollow-a.jpg', frames: c12a },
      { id: 'b', name: 'B 超大跨全高', theme: 'Full-height Giant', ref: '鏤空字參考', refImg: 'hollow-b.jpg', frames: c12b },
      { id: 'c', name: 'C 頂鏤空直排', theme: 'Top Outline + Vertical', ref: '鏤空字參考', refImg: 'hollow-c.jpg', frames: c12c },
      { id: 'd', name: 'D 散佈疊字', theme: 'Scattered Overlay', ref: '鏤空字參考', refImg: 'hollow-d.jpg', frames: c12d },
      { id: 'e', name: 'E 細字照片塊', theme: 'Thin Outline Block', ref: '鏤空字參考', refImg: 'hollow-e.jpg', frames: c12e },
    ],
  },
  {
    id: 'repeat', name: '13 重複', en: 'Repetition', desc: '重複照片與元素，鋪滿畫面、製造節奏與律動感。', group: 'type',
    variants: [
      { id: 'a', name: 'A 網格重複', theme: 'Photo Grid', ref: '重複參考', refImg: 'repeat-a.jpg', frames: c13a },
      { id: 'b', name: 'B 斜向照片條', theme: 'Diagonal Strips', ref: '重複參考', refImg: 'repeat-b.jpg', frames: c13b },
      { id: 'c', name: 'C 直排照片欄', theme: 'Photo Column', ref: '重複參考', refImg: 'repeat-c.jpg', frames: c13c },
      { id: 'd', name: 'D 環形萬花筒', theme: 'Radial Ring', ref: '重複參考', refImg: 'repeat-d.jpg', frames: c13d },
      { id: 'e', name: 'E 散佈拼貼', theme: 'Scattered Collage', ref: '重複參考', refImg: 'repeat-e.jpg', frames: c13e },
    ],
  },
  {
    id: 'textframe', name: '14 文字邊框', en: 'Text Border', desc: '文字沿路徑重複環繞，像路徑文字一樣繞框、繞圓、繞橢圓。', group: 'type',
    variants: [
      { id: 'a', name: 'A 矩形繞字', theme: 'Rect Loop', ref: '文字邊框參考', refImg: 'textframe-a.jpg', frames: c14a },
      { id: 'b', name: 'B 橢圓軌道', theme: 'Orbit Ring', ref: '文字邊框參考', refImg: 'textframe-b.jpg', frames: c14b },
      { id: 'c', name: 'C 膠囊繞字', theme: 'Capsule Loop', ref: '文字邊框參考', refImg: 'textframe-c.jpg', frames: c14c },
      { id: 'd', name: 'D S波浪繞字', theme: 'Wave Path', ref: '文字邊框參考', refImg: 'textframe-d.jpg', frames: c14d },
      { id: 'e', name: 'E 螺旋繞字', theme: 'Spiral Flow', ref: '文字邊框參考', refImg: 'textframe-e.jpg', frames: c14e },
    ],
  },
  {
    id: 'burst', name: '15 衝出去', en: 'Break out', desc: '文字突破版面邊界或衝出框架，製造動感與張力。', group: 'type',
    variants: [
      { id: 'a', name: 'A 巨字左右出血', theme: 'Side Bleed', ref: '衝出去參考', refImg: 'burst-a.jpg', frames: c15a },
      { id: 'b', name: 'B 巨字上下出血', theme: 'Top-Bottom Bleed', ref: '衝出去參考', refImg: 'burst-b.jpg', frames: c15b },
      { id: 'c', name: 'C 衝出底邊', theme: 'Bottom Burst', ref: '衝出去參考', refImg: 'burst-c.jpg', frames: c15c },
      { id: 'd', name: 'D 直字衝右', theme: 'Right Burst', ref: '衝出去參考', refImg: 'burst-d.jpg', frames: c15d },
      { id: 'e', name: 'E 全出血疊圖', theme: 'Full Bleed Overlay', ref: '衝出去參考', refImg: 'burst-e.jpg', frames: c15e },
    ],
  },
  {
    id: 'fill', name: '16 塞滿畫面', en: 'Fill the Frame', desc: '文字密集填滿整個版面，打破留白常規，強烈衝擊。', group: 'type',
    variants: [
      { id: 'a', name: 'A 雙照片密排', theme: 'Twin Photo Pack', ref: '塞滿參考', refImg: 'fill-a.jpg', frames: c16a },
      { id: 'b', name: 'B 超大字母', theme: 'Giant Letters', ref: '塞滿參考', refImg: 'fill-b.jpg', frames: c16b },
      { id: 'c', name: 'C 巨字嵌小照', theme: 'Inset Photo', ref: '塞滿參考', refImg: 'fill-c.jpg', frames: c16c },
      { id: 'd', name: 'D 滿版照＋塞字', theme: 'Photo Packed', ref: '塞滿參考', refImg: 'fill-d.jpg', frames: c16d },
      { id: 'e', name: 'E 置中粗黑巨字', theme: 'Center Black', ref: '塞滿參考', refImg: 'fill-e.jpg', frames: c16e },
    ],
  },
  {
    id: 'bubble', name: '17 對話框', en: 'Speech Bubble', desc: '用對話框處理文字，像漫畫般親切、降低閱讀門檻。', group: 'type',
    variants: [
      { id: 'a', name: 'A 多氣泡', theme: 'Multi Bubbles', ref: '對話框參考', refImg: 'bubble-a.jpg', frames: c17a },
      { id: 'b', name: 'B 雲朵思考', theme: 'Thought Cloud', ref: '對話框參考', refImg: 'bubble-b.jpg', frames: c17b },
      { id: 'c', name: 'C 照片對話框', theme: 'Photo Bubbles', ref: '對話框參考', refImg: 'bubble-c.jpg', frames: c17c },
      { id: 'd', name: 'D 滿版爆炸框', theme: 'Photo Burst', ref: '對話框參考', refImg: 'bubble-d.jpg', frames: c17d },
      { id: 'e', name: 'E 眾聲喧嘩', theme: 'Crowd Talk', ref: '對話框參考', refImg: 'bubble-e.jpg', frames: c17e },
    ],
  },
  {
    id: 'tracking', name: '18 拉開字元間距', en: 'Letter Spacing', desc: '拉開字元間距增加留白，塑造高雅時尚的呼吸感。', group: 'type',
    variants: [
      { id: 'a', name: 'A 寬距置中', theme: 'Spaced Center', ref: '字距參考', refImg: 'tracking-a.jpg', frames: c18a },
      { id: 'b', name: 'B 寬距橫貫', theme: 'Spanned Over Photo', ref: '字距參考', refImg: 'tracking-b.jpg', frames: c18b },
      { id: 'c', name: 'C 對角瀑布', theme: 'Diagonal Rain', ref: '字距參考', refImg: 'tracking-c.jpg', frames: c18c },
      { id: 'd', name: 'D 寬距極簡', theme: 'Airy Minimal', ref: '字距參考', refImg: 'tracking-d.jpg', frames: c18d },
      { id: 'e', name: 'E 直排寬距', theme: 'Vertical Split', ref: '字距參考', refImg: 'tracking-e.jpg', frames: c18e },
    ],
  },
  {
    id: 'logo', name: '19 類Logo風', en: 'Logo Style', desc: '把文字裝飾成 Logo 樣式，讓標題成為高識別度的視覺符號。', group: 'type',
    variants: [
      { id: 'a', name: 'A 框中標題', theme: 'Framed Mark', ref: '類Logo參考', refImg: 'logo-a.jpg', frames: c19a },
      { id: 'b', name: 'B 徽章圓章', theme: 'Badge Seal', ref: '類Logo參考', refImg: 'logo-b.jpg', frames: c19b },
      { id: 'c', name: 'C 緞帶橫幅', theme: 'Ribbon Banner', ref: '類Logo參考', refImg: 'logo-c.jpg', frames: c19c },
      { id: 'd', name: 'D 字母組合', theme: 'Monogram', ref: '類Logo參考', refImg: 'logo-d.jpg', frames: c19d },
      { id: 'e', name: 'E 盾形外框', theme: 'Crest Shield', ref: '類Logo參考', refImg: 'logo-e.jpg', frames: c19e },
    ],
  },
  {
    id: 'whitespace', name: '20 留白', en: 'Whitespace', desc: '在照片周圍保留大量留白，極簡清爽、讓照片呼吸並傳達故事感。',
    variants: [
      { id: 'a', name: 'A 小主體大留白', theme: 'Tiny Subject', ref: '留白參考', refImg: 'whitespace-a.jpg', frames: c20a },
      { id: 'b', name: 'B 中央橫幅', theme: 'Center Band', ref: '留白參考', refImg: 'whitespace-b.jpg', frames: c20b },
      { id: 'c', name: 'C 上標下照', theme: 'Title Over Photo', ref: '留白參考', refImg: 'whitespace-c.jpg', frames: c20c },
      { id: 'd', name: 'D 滿版留白', theme: 'Photo Whitespace', ref: '留白參考', refImg: 'whitespace-d.jpg', frames: c20d },
      { id: 'e', name: 'E 滿版淡照', theme: 'Soft Full Bleed', ref: '留白參考', refImg: 'whitespace-e.jpg', frames: c20e },
    ],
  },
];

export const COPY = {
  eyebrows: [
    'TYPESET GALLERY PRESENTS',
    'SOLO EXHIBITION — VOL.03',
    'ANNUAL PHOTO SHOWCASE',
    'SPECIAL EXHIBITION 2026',
    'GROUP SHOW — NEW WORKS',
    'ARCHIVE SERIES NO.12',
  ],
  titles: [
    'The Quiet Geometry',
    'Soft Structures',
    'Between the Lines',
    'An Index of Rooms',
    'Borrowed Views',
    'What the Morning Keeps',
    'The Shape of a Pause',
    'Notes on Slowness',
    'A Field of Ordinary Wonders',
    'Everything in Its Season',
  ],
  subtitles: [
    'Twelve months of looking, printed and pinned to the wall — an inventory of attention rather than a conclusion.',
    'New photographic works on light, shadow and the small rituals that shape a place.',
    'A study of the temporary architecture that appears only at certain hours.',
    'Photographs made within walking distance of the studio. The constraint became the subject.',
    'Selected works from the archive, shown together for the first time.',
    'On cities that stay still while everything else moves.',
  ],
  dates: [
    '2026.6.12 FRI — 7.20 MON',
    '06.12 SAT – 07.20 MON',
    'JUNE 12 — JULY 20, 2026',
    '6.12 → 7.20 2026',
  ],
  infos: [
    'OPEN 10:00 – 18:00 · TYPESET GALLERY · CLOSED MON',
    '11:00 – 19:00 DAILY · HALL B, 2F · FREE ENTRY',
    'TYPESET MUSEUM · 12 GALLERY ST. · BOOKING REQUIRED',
    'OPENING RECEPTION 6.12 SAT 17:00 · ADMISSION FREE',
  ],
};

// ── 技法說明（取自 IG「排版系列懶人包」貼文，嵌入版型庫圖鑑）──────────
// 每個分類：slogan 標語、desc 說明條列、when 使用時機、effects 效果標籤
export const GUIDE = {
  duotone: {
    slogan: '用對比感讓版面瞬間升級',
    desc: [
      '切割畫面後配置不同的元素，能夠營造強烈的對比感。',
      '顏色控制在兩色以內，畫面看起來更為清爽俐落。',
      '透過色彩的切割，即使沒有複雜的設計元素，也能產生高度的視覺張力與層次感。',
    ],
    when: '想要製造強烈對比感、突顯差異，或需要呈現主從關係時。',
    effects: ['視覺清爽', '對比強烈', '層次分明'],
  },
  diagonal: {
    slogan: '動感與華麗的最佳解法',
    desc: [
      '當版面太過單調，或需要增加吸睛度時，藉由斜線條可以輕鬆增加華麗感與律動感。',
      '斜線能為靜態的構圖注入動感，讓視線自然流動。',
      '多條平行斜線比單條更能產生律動節奏感。',
    ],
    when: '版面太過單調，需要增加動感，或想呈現速度感與活力時。',
    effects: ['律動感', '華麗感', '視覺動感'],
  },
  circle: {
    slogan: '聚焦視線，讓重點無所遁形',
    desc: [
      '當版面太過單調，需要點裝飾，大大的圓就對了！',
      '直接放大居中擺放，能聚焦視線提升醒目程度。',
      '圓形是版面中最能吸引目光的形狀，能有效引導觀者視線集中在最關鍵的資訊點上。',
    ],
    when: '需要強調、製造視覺焦點，或豐富畫面主角時。',
    effects: ['聚焦視線', '醒目強調', '視覺震撼'],
  },
  bands: {
    slogan: '為文字加上 Highlight',
    desc: [
      '就像螢光筆一樣畫上重點，通常使用在文字上。',
      '大量使用交疊的帶狀色塊能營造畫面的律動感或隨性感。',
      '透過不同方向、顏色、透明度的疊加，能創造出充滿韻律與豐富的視覺效果。',
    ],
    when: '需要強調、製造視覺焦點，想要展現活力、隨性的版面時。',
    effects: ['聚焦視線', '醒目強調', '律動感'],
  },
  dots: {
    slogan: '輕巧可愛，增添活潑氣息',
    desc: [
      '圓點裝飾能營造輕巧的氛圍，增添可愛與活潑的視覺效果。',
      '如同空氣泡泡一般輕盈跳躍，為整個設計帶來輕鬆愉快的節奏感與親切感。',
    ],
    when: '想增加版面活潑感、製造輕鬆氛圍，或針對年輕族群訴求時。',
    effects: ['輕巧活潑', '可愛親切', '輕鬆節奏'],
  },
  triangle: {
    slogan: '銳利動感的幾何構圖利器',
    desc: [
      '最具方向感與動感的幾何形狀。',
      '大小不一的三角形，能為版面帶來強烈的設計節奏。',
      '具有方向、指標、未來、前進、希望等含義。',
    ],
    when: '製造動感指向性，或想表達未來、前進、希望等概念。',
    effects: ['動感方向', '現代設計感', '活潑張力'],
  },
  arch: {
    slogan: '古典優雅的視覺框架',
    desc: [
      '在平面設計中創造出優雅的視覺邊界，讓主體在拱形的襯托下更顯尊貴與精緻。',
      '是近年復古設計中極為流行的版面元素。',
      '文字呈現微微的半圓拱形，有包覆感，達到聚焦主體的效果。',
    ],
    when: '想呈現古典優雅感，製造精緻高級的視覺框架。',
    effects: ['古典優雅', '精緻框架', '集中視線'],
  },
  lineframe: {
    slogan: '收斂視覺，讓版面更顯眼醒目',
    desc: [
      '線框能收斂整體設計，使版面更加顯眼。',
      '線框同時具有整合分散元素的功能，是排版中最萬用的視覺整合技巧之一。',
    ],
    when: '元素過於分散，需要整合版面，或想強化標題時。',
    effects: ['收斂整體', '聚焦醒目', '裝飾效果'],
  },
  wrap: {
    slogan: '整合視覺，增添幽默的氣息',
    desc: [
      '包起來的排版能整合視覺，利用不同的形狀可增添幽默氣息，營造不同的氛圍。',
      '透過圓形、橢圓形或不規則形狀等容器包住主要元素，製造有趣的構圖關係與視覺焦點。',
    ],
    when: '想整合分散的視覺元素、製造幽默效果，創造獨特容器感時。',
    effects: ['視覺整合', '幽默親切', '獨特氛圍'],
  },
  grid: {
    slogan: '切割畫面，展現整齊的韻律美',
    desc: [
      '在框格內放入不同元素或是跨格，都能展現韻律。',
      '將版面分割成多個區塊，每個區塊可以是圖片、文字或留白，組合豐富的視覺節奏。',
      '框格能讓畫面井然有序，間距保持一致，維持整齊感。',
    ],
    when: '當多個項目或風格不統一時，或想呈現整齊有秩序的版面時。',
    effects: ['整齊有序', '韻律節奏', '資訊豐富'],
  },
  hollow: {
    slogan: '以輪廓代替實心，讓版面通透呼吸',
    desc: [
      '鏤空字能營造輕快的氛圍，散發自然的空氣感，也不會使版面太過凌亂，反而有種獨特的層次感。',
      '透過文字輪廓取代實心字體，讓版面更加通透輕盈，輕鬆提升整體質感。',
    ],
    when: '版面需要透氣感、想提升設計質感，或製造輕盈氛圍時。',
    effects: ['輕盈通透', '空氣感', '質感提升'],
  },
  thickline: {
    slogan: '用粗線整合視線、建立閱讀順序',
    desc: [
      '粗線條作為視覺引導的關鍵元素，能有效整合版面上分散的視覺焦點，引導觀者視線按設計者的意圖流動。',
      '粗線不僅是裝飾，更是組織資訊層次的強力工具。',
    ],
    when: '元素過多需要整合、需要建立閱讀順序，或想增加結構感時。',
    effects: ['視線整合', '結構清晰', '層次分明'],
  },
  burst: {
    slogan: '衝出邊界，釋放動感與張力',
    desc: [
      '放大重要資訊、表現無法抑制的熱情，利用衝出去的元素加強氣勢，富有衝擊力。',
      '讓元素突破版面邊界或衝出容器框架，製造動感十足且極具張力的視覺效果。',
    ],
    when: '想強調重要資訊、展現熱情活力，或製造強烈視覺衝擊。',
    effects: ['衝擊力強', '動感十足', '熱情奔放'],
  },
  fill: {
    slogan: '塞滿畫面，打破留白的常規',
    desc: [
      '一般排版會將四邊留白、不讓文字切到，但這個排法反而挑戰這樣的配置，帶來視覺衝擊。',
      '透過密集填滿整個版面，製造壓迫感與強烈的視覺張力，打破常規引人注目。',
    ],
    when: '打破常規、製造強烈衝擊感、展現豐盛飽滿的視覺。',
    effects: ['視覺衝擊', '打破常規', '強烈張力'],
  },
  tracking: {
    slogan: '拉開字距，塑造高雅的呼吸感',
    desc: [
      '拉開字句增加留白空間，能塑造自然的時尚氣息。',
      '字元間距的增大讓文字呼吸，賦予版面高雅的氣質，常見於精品品牌、時尚雜誌和藝文活動的設計中。',
    ],
    when: '想營造高級感、時尚感，或展現精品藝文調性時。',
    effects: ['時尚感', '高級調性', '呼吸空間'],
  },
  repeat: {
    slogan: '重複元素，製造節奏與強烈印象',
    desc: [
      '重複元素具有強調的效果，令人印象深刻；微調顏色、角度、大小也能配出律動感。',
      '透過重複同一個元素，在視覺上產生節奏、秩序、視覺張力，同時強化品牌識別或重要訊息的記憶點。',
    ],
    when: '想強化某個視覺元素的印象、製造節奏感，增加視覺張力時。',
    effects: ['強烈印象', '節奏律動', '視覺強調'],
  },
  textframe: {
    slogan: '文字排成邊框，既裝飾也是內容',
    desc: [
      '邊框能統整畫面、裝飾性高，形成獨特的設計風格；文字本身成為視覺邊界，讓畫面更緊湊有力。',
      '將文字排列成邊框形式，既是裝飾也是內容，是一舉兩得的高效排版策略。',
    ],
    when: '製造獨特視覺效果，或想充分利用版面空間時。',
    effects: ['獨特風格', '裝飾性強', '版面統整'],
  },
  bubble: {
    slogan: '用對話框，讓資訊親切又生動',
    desc: [
      '大量資訊時可利用對話框處理複雜的文字，像漫畫方式可拉近與觀者的距離，較為親切。',
      '對話框賦予文字活潑的個性，讓資訊的傳遞更加生動有趣，有效降低閱讀門檻。',
    ],
    when: '資訊量大需要組織整理、想製造親切感，或針對輕鬆主題時。',
    effects: ['親切感', '漫畫趣味', '資訊整合'],
  },
  logo: {
    slogan: '把標題裝飾成 Logo，高度識別',
    desc: [
      '把文字裝飾後讓它看起來像 Logo 的樣式，主要應用在主視覺的標題上。',
      '透過字體的選擇、圖形的組合、裝飾元素的添加，讓純文字標題蛻變成具有高度識別度的視覺符號。',
    ],
    when: '需要強化品牌標題、製造高度識別性，讓標題成為視覺主角。',
    effects: ['品牌識別', '視覺標誌', '標題強化'],
  },
  whitespace: {
    slogan: '清爽有故事感的極簡排版',
    desc: [
      '版面會看起來很清爽，散發出來的氛圍也很有故事性。',
      '在照片周圍保留大量留白，讓圖像在廣闊空間中呼吸，製造出極簡主義的視覺美感，同時傳達寧靜深遠的情感氛圍。',
    ],
    when: '想傳達高級極簡感、強調氛圍情緒，或讓照片說話時。',
    effects: ['極簡清爽', '故事性強', '高級氛圍'],
  },
};

export const MODES = [
  { id: 'light', name: '白底', bg: '#f5f4f0', fg: '#121212', gray: '#9a9994' },
  { id: 'dark', name: '黑底', bg: '#121212', fg: '#f2f0eb', gray: '#67665f' },
  { id: 'gray', name: '灰底', bg: '#d8d7d2', fg: '#161616', gray: '#8f8e89' },
];

export const FONTS = [
  { name: 'Helvetica', en: 'All Sans', title: "'Helvetica Neue', Helvetica, Arial, sans-serif", body: "'Helvetica Neue', Helvetica, Arial, sans-serif" },
  { name: '標題黑 / 內文襯線', en: 'Helvetica + Serif', title: "'Helvetica Neue', Helvetica, Arial, sans-serif", body: "Georgia, 'Times New Roman', serif" },
  { name: '標題襯線 / 內文黑', en: 'Serif + Helvetica', title: "Georgia, 'Times New Roman', serif", body: "'Helvetica Neue', Helvetica, Arial, sans-serif" },
  { name: '全襯線', en: 'All Serif', title: "Georgia, 'Times New Roman', serif", body: "Georgia, 'Times New Roman', serif" },
];
