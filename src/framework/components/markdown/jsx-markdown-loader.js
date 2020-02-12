
const ts = require("typescript");
const path = require('path')

function createSourceFile(name, source) {
   return ts.createSourceFile(
    name,
    source,
    ts.ScriptTarget.ESNext,
    true
  );
}

function getMarkdownSegments(node) {
  const segmentGroup = []

  function _getMarkdownSegments(node) {
    // 找到所有 JSX 节点
    if (node.kind === ts.SyntaxKind.JsxElement) {
      let jsxMarkdownEnable = false
      const segments = []

      // 遍历 JSX 子节点
      for (const child of node.children) {
        if (child.kind === ts.SyntaxKind.JsxExpression
        && /{\s*\/\*\s*jsx-markdown\s*\*\/\s*}/.test(child.getFullText())) {
          // 如果子节点内包含 {/* jsx-markdown */} 标识则标为 true
          jsxMarkdownEnable = true
        } else if (child.kind === ts.SyntaxKind.JsxText) {
          // 将 JsxText 节点截取出来
          segments.push(child);
        }
      }
      if (jsxMarkdownEnable) {
        segmentGroup.push(segments);
      }
    }

    ts.forEachChild(node, _getMarkdownSegments);
  }
  _getMarkdownSegments(node)

  return segmentGroup
    .reduce((p, c) => p.concat(c), [])
    .sort((l, r) => l.pos - r.pos);
}

function replaceSource(segments, source) {
  let target = source;
  let offset = 0;

  // 替换了字符串以后 Token 的位置会改变
  // 所以要加 offset
  for (const segment of segments) {
    const fullText = segment.getFullText();
    const targetText = "{`"
      + fullText
        .replace(/\\/g, '\\\\')
        .replace(/`/g, '\\`')
        .replace(/\${/g, '\\${')
      + "`}";
    const start = segment.pos + offset;
    const end = segment.end + offset;
    target = target.substring(0, start)
      + targetText
      + target.substring(end);
    offset += targetText.length - fullText.length;
  }

  return target;
}

module.exports = function(source) {
  const name = path.basename(this.resourcePath);

  // 只对 tsx 和 jsx 以及打了 {/* jsx-markdown-enable */} 标识的文件起作用
  if (
    /\.(t|j)sx$/.test(name) &&
    /{\s*\/\*\s*jsx-markdown\s*\*\/\s*}/.test(source)
  ) {
    const sourceFile = createSourceFile(name, source);
    const segments = getMarkdownSegments(sourceFile);
    const target = replaceSource(segments, source);

    return target;
  }
  return source;
};