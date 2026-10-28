// Tiny syntax highlighter for the code windows. Returns escaped HTML with <span class="tk-*"> tokens.
const KEYWORDS = {
  java: 'public private protected final class return new this static void if else throw throws try catch import package extends implements',
  js: 'const let var function return export default import from async await new if else throw try catch typeof of in true false null',
  sql: 'SELECT FROM JOIN LEFT INNER ON WHERE AND OR GROUP BY HAVING ORDER AS COUNT SUM MIN MAX CURRENT_DATE LIMIT DESC ASC',
};
const KEYWORD_SETS = Object.fromEntries(Object.entries(KEYWORDS).map(([k, v]) => [k, new Set(v.split(' '))]));

const SQL_RE = /(--[^\n]*)|('[^'\n]*')|()(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_]\w*\b)/g;
const C_LIKE_RE = /(\/\/[^\n]*)|('[^'\n]*'|"[^"\n]*"|`[^`]*`)|(@[A-Za-z]\w*)|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_$][\w$]*\b)/g;

const escapeHtml = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function highlight(src, lang = 'js') {
  const keywords = KEYWORD_SETS[lang] || KEYWORD_SETS.js;
  const re = new RegExp((lang === 'sql' ? SQL_RE : C_LIKE_RE).source, 'g');
  let out = '';
  let last = 0;
  let m;
  while ((m = re.exec(src))) {
    out += escapeHtml(src.slice(last, m.index));
    let cls = '';
    if (m[1]) cls = 'c';
    else if (m[2]) cls = 's';
    else if (m[3]) cls = 'a';
    else if (m[4]) cls = 'n';
    else if (m[5]) {
      const word = m[5];
      if (keywords.has(word)) cls = 'k';
      else if (src.charAt(re.lastIndex) === '(') cls = 'f';
      else if (lang !== 'sql' && /^[A-Z]/.test(word)) cls = 't';
    }
    out += cls ? `<span class="tk-${cls}">${escapeHtml(m[0])}</span>` : escapeHtml(m[0]);
    last = re.lastIndex;
  }
  return out + escapeHtml(src.slice(last));
}
