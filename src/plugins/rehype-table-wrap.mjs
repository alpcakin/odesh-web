/** Wraps every <table> in a scrollable container so wide legal tables never break the layout. */
export default function rehypeTableWrap() {
  const visit = (node) => {
    if (!node.children) return;
    node.children = node.children.map((child) => {
      if (child.type === 'element' && child.tagName === 'table') {
        return { type: 'element', tagName: 'div', properties: { className: ['table-wrap'] }, children: [child] };
      }
      visit(child);
      return child;
    });
  };
  return (tree) => visit(tree);
}
