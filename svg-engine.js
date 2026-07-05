// ── Typeset generator v2 — SVG 引擎（形狀、圖片裁切、文字、匯出） ──

let _c = null;
function ctx() {
  if (!_c) _c = document.createElement('canvas').getContext('2d');
  return _c;
}

export function wrapLines(text, size, family, weight, maxW, maxLines) {
  const c = ctx();
  c.font = `${weight || 400} ${size}px ${family}`;
  const words = String(text || '').split(/\s+/).filter(Boolean);
  const lines = [];
  let cur = '';
  for (const w of words) {
    const t = cur ? cur + ' ' + w : w;
    if (c.measureText(t).width <= maxW || !cur) cur = t;
    else { lines.push(cur); cur = w; }
  }
  if (cur) lines.push(cur);
  return maxLines ? lines.slice(0, Math.max(1, maxLines)) : lines;
}

export function coverRect(fw, fh, nw, nh, zoom) {
  const s = Math.max(fw / nw, fh / nh) * (zoom || 1);
  const w = nw * s, h = nh * s;
  return { w, h, dx: (fw - w) / 2, dy: (fh - h) / 2 };
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
const r2 = (n) => Math.round(n * 100) / 100;

function quatrefoilPath(cx, cy, rx, ry) {
  // 四花瓣（上下左右各一圓弧花瓣）
  const sx = rx * 0.62, sy = ry * 0.62;
  const TL = [cx - sx, cy - sy], TR = [cx + sx, cy - sy], BR = [cx + sx, cy + sy], BL = [cx - sx, cy + sy];
  const lx = rx - sx, ly = ry - sy;
  return `M ${r2(TL[0])} ${r2(TL[1])} ` +
    `A ${r2(sx)} ${r2(ly)} 0 0 1 ${r2(TR[0])} ${r2(TR[1])} ` +   // 上花瓣
    `A ${r2(lx)} ${r2(sy)} 0 0 1 ${r2(BR[0])} ${r2(BR[1])} ` +   // 右花瓣
    `A ${r2(sx)} ${r2(ly)} 0 0 1 ${r2(BL[0])} ${r2(BL[1])} ` +   // 下花瓣
    `A ${r2(lx)} ${r2(sy)} 0 0 1 ${r2(TL[0])} ${r2(TL[1])} Z`;   // 左花瓣
}
function scallopEllipsePath(cx, cy, rx, ry, br) {
  const avg = (rx + ry) / 2;
  let n = Math.max(8, Math.round((2 * Math.PI * avg) / (2 * br)));
  if (n % 2 !== 0) n += 1;
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
    pts.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]);
  }
  let d = `M ${r2(pts[0][0])} ${r2(pts[0][1])}`;
  for (let i = 1; i <= n; i++) {
    const p = pts[i % n], q = pts[i - 1];
    const rr = Math.hypot(p[0] - q[0], p[1] - q[1]) / 2;
    d += ` A ${r2(rr)} ${r2(rr)} 0 0 1 ${r2(p[0])} ${r2(p[1])}`;
  }
  return d + ' Z';
}
function scallopPath(x, y, w, h, br) {
  const cr = br; // 角半徑
  const parts = [];
  const edge = (sx, sy, ex, ey) => {
    const len = Math.hypot(ex - sx, ey - sy);
    const n = Math.max(1, Math.round(len / (2 * br)));
    const ddx = (ex - sx) / n, ddy = (ey - sy) / n;
    const rr = Math.hypot(ddx, ddy) / 2;
    for (let i = 0; i < n; i++) {
      const px = sx + ddx * (i + 1), py = sy + ddy * (i + 1);
      parts.push(`A ${r2(rr)} ${r2(rr)} 0 0 1 ${r2(px)} ${r2(py)}`);
    }
  };
  parts.push(`M ${r2(x + cr)} ${r2(y)}`);
  edge(x + cr, y, x + w - cr, y);                 // top
  parts.push(`A ${r2(cr)} ${r2(cr)} 0 0 1 ${r2(x + w)} ${r2(y + cr)}`); // TR corner
  edge(x + w, y + cr, x + w, y + h - cr);         // right
  parts.push(`A ${r2(cr)} ${r2(cr)} 0 0 1 ${r2(x + w - cr)} ${r2(y + h)}`); // BR
  edge(x + w - cr, y + h, x + cr, y + h);         // bottom
  parts.push(`A ${r2(cr)} ${r2(cr)} 0 0 1 ${r2(x)} ${r2(y + h - cr)}`); // BL
  edge(x, y + h - cr, x, y + cr);                 // left
  parts.push(`A ${r2(cr)} ${r2(cr)} 0 0 1 ${r2(x + cr)} ${r2(y)}`); // TL
  parts.push('Z');
  return parts.join(' ');
}
function bowPath(x, y, w, h) {
  const cx = x + w / 2, cy = y + h / 2;
  const hw = w * 0.46, hh = h * 0.5, kw = w * 0.08, kh = h * 0.62;
  // 左翼：自結向外上、外緣內凹回到結（經典蝴蝶結翼）
  const L = `M ${r2(cx - kw)} ${r2(cy - kh * 0.32)} L ${r2(cx - hw)} ${r2(cy - hh)} ` +
    `Q ${r2(cx - hw * 0.5)} ${r2(cy)} ${r2(cx - hw)} ${r2(cy + hh)} L ${r2(cx - kw)} ${r2(cy + kh * 0.32)} Z`;
  const R = `M ${r2(cx + kw)} ${r2(cy - kh * 0.32)} L ${r2(cx + hw)} ${r2(cy - hh)} ` +
    `Q ${r2(cx + hw * 0.5)} ${r2(cy)} ${r2(cx + hw)} ${r2(cy + hh)} L ${r2(cx + kw)} ${r2(cy + kh * 0.32)} Z`;
  // 中央結（圓角矩形）
  const K = `M ${r2(cx - kw)} ${r2(cy - kh / 2)} Q ${r2(cx - kw)} ${r2(cy - kh / 2 - kh * 0.12)} ${r2(cx - kw * 0.4)} ${r2(cy - kh / 2 - kh * 0.12)} ` +
    `L ${r2(cx + kw * 0.4)} ${r2(cy - kh / 2 - kh * 0.12)} Q ${r2(cx + kw)} ${r2(cy - kh / 2 - kh * 0.12)} ${r2(cx + kw)} ${r2(cy - kh / 2)} ` +
    `L ${r2(cx + kw)} ${r2(cy + kh / 2)} L ${r2(cx - kw)} ${r2(cy + kh / 2)} Z`;
  // 兩條垂下緞帶尾（燕尾收口）
  const ty = cy + kh / 2;
  const t1 = `M ${r2(cx - kw * 0.7)} ${r2(ty)} L ${r2(cx - kw * 2.8)} ${r2(ty + h * 0.92)} L ${r2(cx - kw * 1.5)} ${r2(ty + h * 0.78)} ` +
    `L ${r2(cx - kw * 1.0)} ${r2(ty + h * 0.9)} L ${r2(cx - kw * 0.2)} ${r2(ty + h * 0.62)} Z`;
  const t2 = `M ${r2(cx + kw * 0.7)} ${r2(ty)} L ${r2(cx + kw * 2.8)} ${r2(ty + h * 0.92)} L ${r2(cx + kw * 1.5)} ${r2(ty + h * 0.78)} ` +
    `L ${r2(cx + kw * 1.0)} ${r2(ty + h * 0.9)} L ${r2(cx + kw * 0.2)} ${r2(ty + h * 0.62)} Z`;
  return `${L} ${R} ${K} ${t1} ${t2}`;
}
function bannerPath(x, y, w, h, notch) {
  const vn = notch != null ? notch : h * 0.7;
  return `M ${r2(x)} ${r2(y)} L ${r2(x + w)} ${r2(y)} L ${r2(x + w - vn)} ${r2(y + h / 2)} ` +
    `L ${r2(x + w)} ${r2(y + h)} L ${r2(x)} ${r2(y + h)} L ${r2(x + vn)} ${r2(y + h / 2)} Z`;
}
function archPath(x, y, w, h) {
  const rx = w / 2;
  const ry = Math.min(rx, h * 0.55);
  return `M ${r2(x)} ${r2(y + h)} L ${r2(x)} ${r2(y + ry)} ` +
    `A ${r2(rx)} ${r2(ry)} 0 0 1 ${r2(x + w)} ${r2(y + ry)} ` +
    `L ${r2(x + w)} ${r2(y + h)} Z`;
}

// 對話框氣泡路徑（給照片裁切用）：圓角矩形/橢圓 + 尾巴，合併單一封閉路徑。
function bubblePath(x, y, w, h, opts) {
  const o = opts || {};
  const t = o.tail || 'bl';
  const ts = (o.tailSize != null ? o.tailSize : Math.min(w, h) * 0.18);
  const cx = x + w / 2, cy = y + h / 2;
  if (o.variant === 'oval' || o.variant === 'circle') {
    const tA = { bl: 110, br: 70, tl: 250, tr: 290 };
    if (t && tA[t] != null) {
      const A = tA[t] * Math.PI / 180, sp = 0.16;
      const p1x = cx + (w / 2) * Math.cos(A - sp), p1y = cy + (h / 2) * Math.sin(A - sp);
      const p2x = cx + (w / 2) * Math.cos(A + sp), p2y = cy + (h / 2) * Math.sin(A + sp);
      const apx = cx + (w / 2 + ts) * Math.cos(A), apy = cy + (h / 2 + ts) * Math.sin(A);
      return `M ${r2(p1x)} ${r2(p1y)} A ${r2(w / 2)} ${r2(h / 2)} 0 1 0 ${r2(p2x)} ${r2(p2y)} L ${r2(apx)} ${r2(apy)} Z`;
    }
    return `M ${r2(x)} ${r2(cy)} A ${r2(w / 2)} ${r2(h / 2)} 0 1 0 ${r2(x + w)} ${r2(cy)} A ${r2(w / 2)} ${r2(h / 2)} 0 1 0 ${r2(x)} ${r2(cy)} Z`;
  }
  let rx = o.rx != null ? o.rx : Math.min(w, h) * 0.5;
  rx = Math.min(rx, w / 2, h / 2);
  const topTail = (t === 'tl') ? `L ${r2(x + w * 0.22)} ${r2(y)} L ${r2(x + w * 0.16)} ${r2(y - ts)} L ${r2(x + w * 0.4)} ${r2(y)} `
    : (t === 'tr') ? `L ${r2(x + w * 0.6)} ${r2(y)} L ${r2(x + w * 0.84)} ${r2(y - ts)} L ${r2(x + w * 0.78)} ${r2(y)} ` : '';
  const botTail = (t === 'bl') ? `L ${r2(x + w * 0.4)} ${r2(y + h)} L ${r2(x + w * 0.16)} ${r2(y + h + ts)} L ${r2(x + w * 0.22)} ${r2(y + h)} `
    : (t === 'br') ? `L ${r2(x + w * 0.78)} ${r2(y + h)} L ${r2(x + w * 0.84)} ${r2(y + h + ts)} L ${r2(x + w * 0.6)} ${r2(y + h)} ` : '';
  return `M ${r2(x + rx)} ${r2(y)} ` + topTail +
    `L ${r2(x + w - rx)} ${r2(y)} ` +
    `Q ${r2(x + w)} ${r2(y)} ${r2(x + w)} ${r2(y + rx)} ` +
    `L ${r2(x + w)} ${r2(y + h - rx)} ` +
    `Q ${r2(x + w)} ${r2(y + h)} ${r2(x + w - rx)} ${r2(y + h)} ` + botTail +
    `L ${r2(x + rx)} ${r2(y + h)} ` +
    `Q ${r2(x)} ${r2(y + h)} ${r2(x)} ${r2(y + h - rx)} ` +
    `L ${r2(x)} ${r2(y + rx)} ` +
    `Q ${r2(x)} ${r2(y)} ${r2(x + rx)} ${r2(y)} Z`;
}

// 封閉路徑（給文字繞行用）：回傳 {d, len(近似周長)}。從左上角順時針起繞。
function loopPath(p) {
  const sh = p.shape || 'rect';
  const x = p.x, y = p.y, w = p.w, h = p.h;
  // 開放曲線：以取樣點建路徑（文字沿曲線流動，不封閉）
  if (sh === 'infinity' || sh === 'wave' || sh === 'diagS' || sh === 'arcOpen' || sh === 'archLoop' || sh === 'spiral') {
    const cx = x + w / 2, cy = y + h / 2;
    const pts = [];
    const N = 200;
    for (let i = 0; i <= N; i++) {
      const u = i / N;
      let px, py;
      if (sh === 'infinity') {
        // 雙紐線（figure-8）
        const t = -Math.PI / 2 + u * Math.PI * 2;
        const den = 1 + Math.sin(t) * Math.sin(t);
        px = cx + (w / 2) * Math.cos(t) / den;
        py = cy + (h / 2) * Math.sin(t) * Math.cos(t) / den * 2;
      } else if (sh === 'wave') {
        // 水平 S 波浪（1.5 個週期）
        px = x + u * w;
        py = cy + (h / 2) * Math.sin(u * Math.PI * 3);
      } else if (sh === 'diagS') {
        // 斜向 S：沿對角線的正弦擺動
        const bx = x + u * w, by = y + u * h;
        const off = (h * 0.42) * Math.sin(u * Math.PI * 2);
        px = bx + off * 0.7;
        py = by - off * 0.7;
      } else if (sh === 'archLoop') {
        const rx = w / 2, legH = h - rx; // 直立段高度
        const peri = 2 * legH + Math.PI * rx; // 兩腿 + 半圓頂
        const s = u * peri;
        if (s < legH) { // 左腿，由下往上
          px = x; py = (y + h) - s;
        } else if (s < legH + Math.PI * rx) { // 半圓頂，左→右
          const a = (s - legH) / rx; // 0..π
          px = cx - rx * Math.cos(a);
          py = (y + rx) - rx * Math.sin(a);
        } else { // 右腿，由上往下
          px = x + w; py = (y + rx) + (s - legH - Math.PI * rx);
        }
      } else if (sh === 'spiral') {
        // 鬆散螺旋：由外圈往內掃，框住主體（輕鬆手感繞法）
        const turns = 1.35, startAng = -Math.PI * 0.62;
        const ang = startAng + u * turns * 2 * Math.PI;
        const rad = 1 - 0.46 * u;
        px = cx + (w / 2) * rad * Math.cos(ang);
        py = cy + (h / 2) * rad * Math.sin(ang);
      } else { // arcOpen：開放大弧（U 形）
        const t = Math.PI * (1 - u);
        px = cx + (w / 2) * Math.cos(t);
        py = cy + (h / 2) * Math.sin(t);
      }
      pts.push([px, py]);
    }
    let len = 0;
    for (let i = 1; i < pts.length; i++) len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    const d = 'M ' + pts.map((q) => `${r2(q[0])} ${r2(q[1])}`).join(' L ');
    return { d, len };
  }
  if (sh === 'circle') {
    const r = Math.min(w, h) / 2, cx = x + w / 2, cy = y + h / 2;
    const d = `M ${r2(cx)} ${r2(cy - r)} A ${r2(r)} ${r2(r)} 0 1 1 ${r2(cx - 0.01)} ${r2(cy - r)} Z`;
    return { d, len: 2 * Math.PI * r };
  }
  if (sh === 'ellipse') {
    const rx = w / 2, ry = h / 2, cx = x + w / 2, cy = y + h / 2;
    const d = `M ${r2(cx)} ${r2(cy - ry)} A ${r2(rx)} ${r2(ry)} 0 1 1 ${r2(cx - 0.01)} ${r2(cy - ry)} Z`;
    return { d, len: Math.PI * (3 * (rx + ry) - Math.sqrt((3 * rx + ry) * (rx + 3 * ry))) };
  }
  if (sh === 'capsule') {
    const r = h / 2, x0 = x + r, x1 = x + w - r, cy = y + h / 2;
    const d = `M ${r2(x0)} ${r2(y)} L ${r2(x1)} ${r2(y)} ` +
      `A ${r2(r)} ${r2(r)} 0 0 1 ${r2(x1)} ${r2(y + h)} ` +
      `L ${r2(x0)} ${r2(y + h)} A ${r2(r)} ${r2(r)} 0 0 1 ${r2(x0)} ${r2(y)} Z`;
    return { d, len: 2 * (x1 - x0) + 2 * Math.PI * r };
  }
  // rect（可圓角 rx）
  const rr = p.rx || 0;
  let d;
  if (rr > 0) {
    d = `M ${r2(x + rr)} ${r2(y)} L ${r2(x + w - rr)} ${r2(y)} ` +
      `A ${r2(rr)} ${r2(rr)} 0 0 1 ${r2(x + w)} ${r2(y + rr)} ` +
      `L ${r2(x + w)} ${r2(y + h - rr)} A ${r2(rr)} ${r2(rr)} 0 0 1 ${r2(x + w - rr)} ${r2(y + h)} ` +
      `L ${r2(x + rr)} ${r2(y + h)} A ${r2(rr)} ${r2(rr)} 0 0 1 ${r2(x)} ${r2(y + h - rr)} ` +
      `L ${r2(x)} ${r2(y + rr)} A ${r2(rr)} ${r2(rr)} 0 0 1 ${r2(x + rr)} ${r2(y)} Z`;
  } else {
    d = `M ${r2(x)} ${r2(y)} L ${r2(x + w)} ${r2(y)} L ${r2(x + w)} ${r2(y + h)} L ${r2(x)} ${r2(y + h)} Z`;
  }
  return { d, len: 2 * (w + h) - (8 - 2 * Math.PI) * rr };
}

function shapeAttrs(f) {
  let a = '';
  if (f.fill) a += ` fill="${f.fill}"`; else a += ' fill="none"';
  if (f.stroke) a += ` stroke="${f.stroke}" stroke-width="${r2(f.strokeW || 2)}"`;
  if (f.opacity != null && f.opacity !== 1) a += ` opacity="${f.opacity}"`;
  return a;
}

// doc = { w, h, bg, frames }
// shape : {kind:'shape', shape:'rect'|'circle'|'ellipse'|'polygon'|'line'|'arch'|'stripes', ...}
// image : {kind:'image', x,y,w,h, clip:'rect'|'circle'|'ellipse'|'arch'|'diamond', rx, zoom, img:{src,nw,nh}|null}
// text  : {kind:'text', x,y,w,h, text,size,family,weight,color,align,lh,ls}
export function buildSVG(doc) {
  const defs = [];
  const body = [];
  let clipN = 0;
  let hasPlaceholder = false;
  if (doc.grayFilter) {
    defs.push('<filter id="gs"><feColorMatrix type="saturate" values="0"/></filter>');
  }

  for (const f of doc.frames) {
    const _s = body.length;
    if (f.kind === 'shape') {
      if (f.shape === 'rect') {
        const tr = f.rotate ? ` transform="rotate(${f.rotate} ${r2(f.x + f.w / 2)} ${r2(f.y + f.h / 2)})"` : '';
        body.push(`<rect x="${r2(f.x)}" y="${r2(f.y)}" width="${r2(f.w)}" height="${r2(f.h)}"${f.rx ? ` rx="${r2(f.rx)}"` : ''}${shapeAttrs(f)}${tr}/>`);
      } else if (f.shape === 'circle') {
        body.push(`<circle cx="${r2(f.cx)}" cy="${r2(f.cy)}" r="${r2(f.r)}"${shapeAttrs(f)}/>`);
      } else if (f.shape === 'ellipse') {
        body.push(`<ellipse cx="${r2(f.cx)}" cy="${r2(f.cy)}" rx="${r2(f.rx)}" ry="${r2(f.ry)}"${shapeAttrs(f)}/>`);
      } else if (f.shape === 'polygon') {
        const pts = f.points.map((p) => `${r2(p[0])},${r2(p[1])}`).join(' ');
        body.push(`<polygon points="${pts}"${shapeAttrs(f)}/>`);
      } else if (f.shape === 'path') {
        body.push(`<path d="${f.d}"${shapeAttrs(f)}/>`);
      } else if (f.shape === 'scallop') {
        if (f.petals === 4) body.push(`<path d="${quatrefoilPath(f.x + f.w / 2, f.y + f.h / 2, f.w / 2, f.h / 2)}"${shapeAttrs(f)}/>`);
        else if (f.oval) body.push(`<path d="${scallopEllipsePath(f.x + f.w / 2, f.y + f.h / 2, f.w / 2, f.h / 2, f.bump || Math.min(f.w, f.h) * 0.05)}"${shapeAttrs(f)}/>`);
        else body.push(`<path d="${scallopPath(f.x, f.y, f.w, f.h, f.bump || Math.min(f.w, f.h) * 0.05)}"${shapeAttrs(f)}/>`);
      } else if (f.shape === 'ribbon') {
        const v = f.variant || 'banner';
        if (v === 'bow') body.push(`<path d="${bowPath(f.x, f.y, f.w, f.h)}"${shapeAttrs(f)}/>`);
        else body.push(`<path d="${bannerPath(f.x, f.y, f.w, f.h, f.notch)}"${shapeAttrs(f)}/>`);
      } else if (f.shape === 'line') {
        body.push(`<line x1="${r2(f.x1)}" y1="${r2(f.y1)}" x2="${r2(f.x2)}" y2="${r2(f.y2)}" stroke="${f.stroke}" stroke-width="${r2(f.strokeW || 2)}"/>`);
      } else if (f.shape === 'arch') {
        body.push(`<path d="${archPath(f.x, f.y, f.w, f.h)}"${shapeAttrs(f)}/>`);
      } else if (f.shape === 'bubble') {
        // 對話框氣泡：多種造型 variant: round(預設) / oval / cloud / burst
        const x = f.x, y = f.y, w = f.w, h = f.h;
        const t = f.tail || 'bl';
        const ts = (f.tailSize != null ? f.tailSize : Math.min(f.w, f.h) * 0.18);
        const fillA = f.fill ? ` fill="${f.fill}"` : ' fill="none"';
        const strokeA = f.stroke ? ` stroke="${f.stroke}" stroke-width="${r2(f.strokeW || 2)}"` : '';
        const op = (f.opacity != null && f.opacity !== 1) ? ` opacity="${f.opacity}"` : '';
        const bv = f.variant || 'round';
        const cx = x + w / 2, cy = y + h / 2;
        let tailD = '';
        if (t === 'bl') tailD = `M ${r2(x + w * 0.22)} ${r2(y + h)} L ${r2(x + w * 0.16)} ${r2(y + h + ts)} L ${r2(x + w * 0.4)} ${r2(y + h)} Z`;
        else if (t === 'br') tailD = `M ${r2(x + w * 0.78)} ${r2(y + h)} L ${r2(x + w * 0.84)} ${r2(y + h + ts)} L ${r2(x + w * 0.6)} ${r2(y + h)} Z`;
        else if (t === 'tl') tailD = `M ${r2(x + w * 0.22)} ${r2(y)} L ${r2(x + w * 0.16)} ${r2(y - ts)} L ${r2(x + w * 0.4)} ${r2(y)} Z`;
        else if (t === 'tr') tailD = `M ${r2(x + w * 0.78)} ${r2(y)} L ${r2(x + w * 0.84)} ${r2(y - ts)} L ${r2(x + w * 0.6)} ${r2(y)} Z`;
        if (bv === 'oval') {
          // 橢圓 + 尾巴：合併單一路徑（橢圓弧 + 尾巴），base 點落在橢圓周上不留縫
          const tA = { bl: 110, br: 70, tl: 250, tr: 290 };
          if (t && tA[t] != null) {
            const A = tA[t] * Math.PI / 180, sp = 0.16;
            const p1x = cx + (w / 2) * Math.cos(A - sp), p1y = cy + (h / 2) * Math.sin(A - sp);
            const p2x = cx + (w / 2) * Math.cos(A + sp), p2y = cy + (h / 2) * Math.sin(A + sp);
            const apx = cx + (w / 2 + ts) * Math.cos(A), apy = cy + (h / 2 + ts) * Math.sin(A);
            const d = `M ${r2(p1x)} ${r2(p1y)} A ${r2(w / 2)} ${r2(h / 2)} 0 1 0 ${r2(p2x)} ${r2(p2y)} L ${r2(apx)} ${r2(apy)} Z`;
            body.push(`<g${op}><path d="${d}"${fillA}${strokeA}/></g>`);
          } else {
            body.push(`<g${op}><ellipse cx="${r2(cx)}" cy="${r2(cy)}" rx="${r2(w / 2)}" ry="${r2(h / 2)}"${fillA}${strokeA}/></g>`);
          }
        } else if (bv === 'burst') {
          // 爆炸星形氣泡（漫畫衝擊感）
          const spikes = f.spikes || 14, ro = Math.min(w, h) / 2, ri = ro * 0.78, rxo = w / 2, ryo = h / 2;
          let d = '';
          for (let i = 0; i < spikes * 2; i++) {
            const ang = (Math.PI / spikes) * i - Math.PI / 2;
            const rr = i % 2 === 0 ? 1 : 0.74;
            const px = cx + rxo * rr * Math.cos(ang), py = cy + ryo * rr * Math.sin(ang);
            d += (i === 0 ? 'M ' : 'L ') + r2(px) + ' ' + r2(py) + ' ';
          }
          d += 'Z';
          body.push(`<g${op}><path d="${d}"${fillA}${strokeA}/></g>`);
        } else if (bv === 'cloud') {
          // 雲朵思考氣泡（密集重疊圓，無破洞）
          const nx = 6, ny = 4;
          const br = Math.min(w / nx, h / ny) * 0.92;
          let circles = `<rect x="${r2(x + br * 0.4)}" y="${r2(y + br * 0.4)}" width="${r2(w - br * 0.8)}" height="${r2(h - br * 0.8)}"${fillA}${strokeA ? '' : ''} fill="${f.fill || 'none'}"/>`;
          const bumps = [];
          for (let i = 0; i < nx; i++) { bumps.push([x + (w / nx) * (i + 0.5), y + br * 0.4]); bumps.push([x + (w / nx) * (i + 0.5), y + h - br * 0.4]); }
          for (let i = 0; i < ny; i++) { bumps.push([x + br * 0.4, y + (h / ny) * (i + 0.5)]); bumps.push([x + w - br * 0.4, y + (h / ny) * (i + 0.5)]); }
          // 先畫填色底（rect + 所有圓，無描邊）填滿避免破洞
          let fillLayer = `<rect x="${r2(x + br * 0.4)}" y="${r2(y + br * 0.4)}" width="${r2(w - br * 0.8)}" height="${r2(h - br * 0.8)}"${fillA}/>`;
          bumps.forEach((bp) => { fillLayer += `<circle cx="${r2(bp[0])}" cy="${r2(bp[1])}" r="${r2(br)}"${fillA}/>`; });
          // 再畫描邊圓（只描外緣）
          let strokeLayer = '';
          if (f.stroke) bumps.forEach((bp) => { strokeLayer += `<circle cx="${r2(bp[0])}" cy="${r2(bp[1])}" r="${r2(br)}" fill="none"${strokeA}/>`; });
          body.push(`<g${op}>${fillLayer}${strokeLayer}</g>`);
        } else {
          // 圓角矩形 + 尾巴：合併成單一路徑，描邊連續、尾巴與框接在一起
          let rx = f.rx != null ? f.rx : Math.min(f.w, f.h) * 0.5;
          rx = Math.min(rx, w / 2, h / 2);
          const topTail = (t === 'tl') ? `L ${r2(x + w * 0.22)} ${r2(y)} L ${r2(x + w * 0.16)} ${r2(y - ts)} L ${r2(x + w * 0.4)} ${r2(y)} `
            : (t === 'tr') ? `L ${r2(x + w * 0.6)} ${r2(y)} L ${r2(x + w * 0.84)} ${r2(y - ts)} L ${r2(x + w * 0.78)} ${r2(y)} ` : '';
          const botTail = (t === 'bl') ? `L ${r2(x + w * 0.4)} ${r2(y + h)} L ${r2(x + w * 0.16)} ${r2(y + h + ts)} L ${r2(x + w * 0.22)} ${r2(y + h)} `
            : (t === 'br') ? `L ${r2(x + w * 0.78)} ${r2(y + h)} L ${r2(x + w * 0.84)} ${r2(y + h + ts)} L ${r2(x + w * 0.6)} ${r2(y + h)} ` : '';
          const d =
            `M ${r2(x + rx)} ${r2(y)} ` + topTail +
            `L ${r2(x + w - rx)} ${r2(y)} ` +
            `Q ${r2(x + w)} ${r2(y)} ${r2(x + w)} ${r2(y + rx)} ` +
            `L ${r2(x + w)} ${r2(y + h - rx)} ` +
            `Q ${r2(x + w)} ${r2(y + h)} ${r2(x + w - rx)} ${r2(y + h)} ` + botTail +
            `L ${r2(x + rx)} ${r2(y + h)} ` +
            `Q ${r2(x)} ${r2(y + h)} ${r2(x)} ${r2(y + h - rx)} ` +
            `L ${r2(x)} ${r2(y + rx)} ` +
            `Q ${r2(x)} ${r2(y)} ${r2(x + rx)} ${r2(y)} Z`;
          body.push(`<g${op}><path d="${d}"${fillA}${strokeA}/></g>`);
        }
      } else if (f.shape === 'bubble_OLD') {
        const parts = [`<g transform="translate(${r2(f.cx)} ${r2(f.cy)}) rotate(${f.angle || 0})"${f.opacity != null && f.opacity !== 1 ? ` opacity="${f.opacity}"` : ''}>`];
        const half = (f.count - 1) / 2;
        for (let i = 0; i < f.count; i++) {
          const off = (i - half) * (f.bandW + f.gap);
          parts.push(`<rect x="${r2(-f.len / 2)}" y="${r2(off - f.bandW / 2)}" width="${r2(f.len)}" height="${r2(f.bandW)}" fill="${f.fill}"/>`);
        }
        parts.push('</g>');
        body.push(parts.join(''));
      }
    } else if (f.kind === 'image') {
      const id = 'clip' + (++clipN);
      let clipEl, outlineD = null;
      if (f.clip === 'circle') {
        const r = Math.min(f.w, f.h) / 2;
        clipEl = `<circle cx="${r2(f.x + f.w / 2)}" cy="${r2(f.y + f.h / 2)}" r="${r2(r)}"/>`;
      } else if (f.clip === 'ellipse') {
        clipEl = `<ellipse cx="${r2(f.x + f.w / 2)}" cy="${r2(f.y + f.h / 2)}" rx="${r2(f.w / 2)}" ry="${r2(f.h / 2)}"/>`;
      } else if (f.clip === 'arch') {
        outlineD = archPath(f.x, f.y, f.w, f.h);
        clipEl = `<path d="${outlineD}"/>`;
      } else if (f.clip === 'bubble') {
        outlineD = bubblePath(f.x, f.y, f.w, f.h, f.bubble || {});
        clipEl = `<path d="${outlineD}"/>`;
      } else if (f.clip === 'diamond') {
        const cx = f.x + f.w / 2, cy = f.y + f.h / 2;
        clipEl = `<polygon points="${r2(cx)},${r2(f.y)} ${r2(f.x + f.w)},${r2(cy)} ${r2(cx)},${r2(f.y + f.h)} ${r2(f.x)},${r2(cy)}"/>`;
      } else {
        clipEl = `<rect x="${r2(f.x)}" y="${r2(f.y)}" width="${r2(f.w)}" height="${r2(f.h)}"${f.rx ? ` rx="${r2(f.rx)}"` : ''}/>`;
      }
      defs.push(`<clipPath id="${id}">${clipEl}</clipPath>`);
      if (f.img) {
        const tailPad = f.clip === 'bubble' ? Math.min(f.w, f.h) * 0.2 : 0;
        const r = coverRect(f.w, f.h + tailPad, f.img.nw, f.img.nh, f.zoom);
        // 拖曳位移：在 cover 約束內平移照片，超出範圍夾住不露底
        const maxX = Math.max(0, (r.w - f.w) / 2);
        const maxY = Math.max(0, (r.h - f.h) / 2);
        const off = f.off || { x: 0, y: 0 };
        const ox = Math.max(-maxX, Math.min(maxX, off.x || 0));
        const oy = Math.max(-maxY, Math.min(maxY, off.y || 0));
        const flt = doc.grayFilter ? ' filter="url(#gs)"' : '';
        body.push(
          `<g clip-path="url(#${id})"><image xlink:href="${f.img.src}" x="${r2(f.x + r.dx + ox)}" y="${r2(f.y + r.dy + oy)}" ` +
          `width="${r2(r.w)}" height="${r2(r.h)}" preserveAspectRatio="none"${flt}/></g>`
        );
        if (f.stroke && outlineD) body.push(`<path d="${outlineD}" fill="none" stroke="${f.stroke}" stroke-width="${r2(f.strokeW || 2)}"/>`);
      } else {
        hasPlaceholder = true;
        body.push(`<g clip-path="url(#${id})"><rect x="${r2(f.x)}" y="${r2(f.y)}" width="${r2(f.w)}" height="${r2(f.h)}" fill="url(#ph-stripes)"/>` +
          `<text x="${r2(f.x + f.w / 2)}" y="${r2(f.y + f.h / 2)}" text-anchor="middle" font-family="Courier, monospace" font-size="${r2(Math.min(f.w, f.h) * 0.07)}" fill="#9a968c" letter-spacing="3">PHOTO</text></g>`);
        if (f.stroke && outlineD) body.push(`<path d="${outlineD}" fill="none" stroke="${f.stroke}" stroke-width="${r2(f.strokeW || 2)}"/>`);
      }
    } else if (f.kind === 'text') {
      const lh = f.lh || 1.2;
      const maxLines = Math.max(1, Math.floor(f.h / (f.size * lh)));
      const lines = f.stackWords
        ? String(f.text || '').split(/\s+/).filter(Boolean)
        : wrapLines(f.text, f.size, f.family, f.weight, f.w, maxLines);
      const anchor = f.align === 'center' ? 'middle' : 'start';
      const tx = r2(f.align === 'center' ? f.x + f.w / 2 : f.x);
      const ls = f.ls ? ` letter-spacing="${f.ls}"` : '';
      if (f.arc) {
        // 拱形文字：沿弧線排列（textPath，Illustrator 保留為路徑文字）
        const pid = 'arcp' + (++clipN);
        const a = f.arc;
        defs.push(`<path id="${pid}" d="M ${r2(a.cx - a.r)} ${r2(a.cy)} A ${r2(a.r)} ${r2(a.r)} 0 0 1 ${r2(a.cx + a.r)} ${r2(a.cy)}"/>`);
        body.push(
          `<text font-family="${esc(f.family)}" font-size="${r2(f.size)}" font-weight="${f.weight || 400}" fill="${f.color}"${ls}>` +
          `<textPath xlink:href="#${pid}" startOffset="50%" text-anchor="middle">${esc(f.text)}</textPath></text>`
        );
        if (f.tx || f.ty) { const seg = body.splice(_s).join(''); body.push(`<g transform="translate(${r2(f.tx || 0)} ${r2(f.ty || 0)})">${seg}</g>`); }
        continue;
      }
      if (f.pathLoop) {
        // 文字繞路徑重複（rect / circle / ellipse / capsule），匯出保留為路徑文字
        const pid = 'loop' + (++clipN);
        const p = f.pathLoop;
        const { d, len } = loopPath(p);
        defs.push(`<path id="${pid}" d="${d}"/>`);
        const c = ctx();
        c.font = `${f.weight || 400} ${f.size}px ${f.family}`;
        const sep = p.sep != null ? p.sep : '   ·   ';
        const unit = f.text + sep;
        const uw = c.measureText(unit).width + (f.ls ? f.ls * unit.length : 0);
        const reps = Math.max(1, Math.ceil(len / Math.max(1, uw)) + 1);
        const repeated = unit.repeat(reps);
        const paint = f.hollow
          ? `fill="none" stroke="${f.color}" stroke-width="${r2(f.hollowW != null ? f.hollowW : Math.max(1, f.size * 0.022))}" paint-order="stroke"`
          : `fill="${f.color}"`;
        body.push(
          `<text font-family="${esc(f.family)}" font-size="${r2(f.size)}" font-weight="${f.weight || 400}" ${paint}${ls}>` +
          `<textPath xlink:href="#${pid}" startOffset="0">${esc(repeated)}</textPath></text>`
        );
        if (f.tx || f.ty) { const seg = body.splice(_s).join(''); body.push(`<g transform="translate(${r2(f.tx || 0)} ${r2(f.ty || 0)})">${seg}</g>`); }
        continue;
      }
      const parts = [];
      if (f.boxFill) {
        // 帶狀色塊：每一行文字背後墊一條色帶
        const c = ctx();
        c.font = `${f.weight || 400} ${f.size}px ${f.family}`;
        const pad = f.boxPad != null ? f.boxPad : f.size * 0.45;
        lines.forEach((ln, i) => {
          const lw = c.measureText(ln).width + (f.ls ? f.ls * ln.length : 0);
          let bx = f.x - pad;
          if (f.align === 'center') bx = f.x + f.w / 2 - lw / 2 - pad;
          const by = f.y + i * f.size * lh - pad * 0.4;
          parts.push(`<rect x="${r2(bx)}" y="${r2(by)}" width="${r2(lw + pad * 2)}" height="${r2(f.size * 1.18 + pad * 0.8)}" fill="${f.boxFill}"/>`);
        });
      }
      let paint;
      if (f.hollow) {
        // 鏤空字：描邊不填色（Illustrator 保留為可編文字）
        const sw = f.hollowW != null ? f.hollowW : Math.max(1, f.size * 0.022);
        paint = `fill="none" stroke="${f.color}" stroke-width="${r2(sw)}" paint-order="stroke"`;
      } else {
        paint = `fill="${f.color}"`;
      }
      parts.push(
        `<text x="${tx}" y="${r2(f.y + f.size)}" font-family="${esc(f.family)}" ` +
        `font-size="${r2(f.size)}" font-weight="${f.weight || 400}" ${paint}${ls} text-anchor="${anchor}">`
      );
      if (f.diagonal) {
        // 對角瀑布：逐字往右下（或左下）階梯排列，字距超開（像下雨）
        const c = ctx();
        c.font = `${f.weight || 400} ${f.size}px ${f.family}`;
        const dx = f.diagDx != null ? f.diagDx : f.size * 0.62;
        let dy = f.diagDy != null ? f.diagDy : f.size * 1.15;
        if (f.fitH && f.h) { const nch = [...String(f.text || '')].length || 1; dy = f.h / nch; }
        // diagWords：每個單字各自一條對角瀑布，彼此往右錯開
        const segs = f.diagWords ? String(f.text || '').split(/\s+/).filter(Boolean) : [String(f.text || '')];
        const segGapX = f.diagSegX != null ? f.diagSegX : f.size * 2.2;
        segs.forEach((seg, si) => {
          let cx = f.x + si * segGapX, cy = f.y + f.size;
          for (const ch of [...seg]) {
            if (ch === ' ') { cx += dx * 0.6; cy += dy * 0.6; continue; }
            parts.push(`<tspan x="${r2(cx)}" y="${r2(cy)}">${esc(ch)}</tspan>`);
            cx += dx; cy += dy;
          }
        });
      } else if (f.scatter) {
        // 散佈：將文字逐字打散、加大間距並換行成鬆散網格
        const c = ctx();
        c.font = `${f.weight || 400} ${f.size}px ${f.family}`;
        const gap = f.charGap != null ? f.charGap : f.size * 0.4;
        const lhpx = f.size * (f.lh || 1.7);
        let cx = f.x, cy = f.y + f.size;
        for (const ch of [...f.text]) {
          if (ch === ' ') { cx += f.size * 0.55; continue; }
          const cw = c.measureText(ch).width;
          if (cx + cw > f.x + f.w) { cx = f.x; cy += lhpx; }
          parts.push(`<tspan x="${r2(cx)}" y="${r2(cy)}">${esc(ch)}</tspan>`);
          cx += cw + gap;
        }
      } else {
        lines.forEach((ln, i) => {
          const sp = f.spread ? ` textLength="${r2(f.w)}" lengthAdjust="spacing"` : '';
          parts.push(`<tspan x="${tx}" dy="${i ? r2(f.size * lh) : 0}"${sp}>${esc(ln)}</tspan>`);
        });
      }
      parts.push('</text>');
      if (f.rotate) {
        body.push(`<g transform="rotate(${f.rotate} ${r2(f.x)} ${r2(f.y)})">` + parts.join('') + '</g>');
      } else {
        body.push(parts.join(''));
      }
    }
    if ((f.tx || f.ty) && body.length > _s) {
      const seg = body.splice(_s).join('');
      body.push(`<g transform="translate(${r2(f.tx || 0)} ${r2(f.ty || 0)})">${seg}</g>`);
    }
  }

  if (hasPlaceholder) {
    defs.unshift(
      '<pattern id="ph-stripes" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">' +
      '<rect width="16" height="16" fill="#ecebe5"/><rect width="8" height="16" fill="#e1dfd7"/></pattern>'
    );
  }

  // 顆粒紋理：feTurbulence 灰階雜訊，以 overlay 疊在最上層（復古印刷顆粒感）
  let grainEl = '';
  if (doc.grain && doc.grain.on) {
    const freq = doc.grain.freq || 0.8;
    const amt = Math.max(0, Math.min(1, doc.grain.intensity != null ? doc.grain.intensity : 0.35));
    defs.push(
      `<filter id="tg-grain" x="0" y="0" width="100%" height="100%">` +
      `<feTurbulence type="fractalNoise" baseFrequency="${r2(freq)}" numOctaves="2" seed="7" stitchTiles="stitch" result="t"/>` +
      `<feColorMatrix in="t" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"/>` +
      `</filter>`
    );
    grainEl = `<g style="mix-blend-mode:overlay" opacity="${r2(amt)}"><rect x="0" y="0" width="${doc.w}" height="${doc.h}" filter="url(#tg-grain)"/></g>`;
  }

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ` +
    `width="${doc.w}" height="${doc.h}" viewBox="0 0 ${doc.w} ${doc.h}">`,
    `<rect width="${doc.w}" height="${doc.h}" fill="${doc.bg}"/>`,
    `<defs>${defs.join('')}</defs>`,
    body.join('\n'),
    grainEl,
    '</svg>',
  ].join('\n');
}

export function svgToDataUri(svg) {
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

export function download(name, blob) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}

export async function rasterize(svgString, w, h, scale, mime) {
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const img = await new Promise((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = rej;
    i.src = url;
  });
  const c = document.createElement('canvas');
  c.width = Math.round(w * scale);
  c.height = Math.round(h * scale);
  const g = c.getContext('2d');
  if (mime === 'image/jpeg') {
    g.fillStyle = '#ffffff';
    g.fillRect(0, 0, c.width, c.height);
  }
  g.drawImage(img, 0, 0, c.width, c.height);
  URL.revokeObjectURL(url);
  return new Promise((res) => c.toBlob(res, mime, 0.92));
}
