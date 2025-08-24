export function buildTableOfContents(headings = []) {
  const tableOfContents = [];
  const parentHeadings = new Map();

  headings.forEach((heading) => {
    const node = { ...heading, subHeadings: [] };
    parentHeadings.set(node.depth, node);

    if (node.depth === 1) {
      tableOfContents.push(node);
    } else {
      // find nearest parent
      let parentDepth = node.depth - 1;
      while (parentDepth > 0 && !parentHeadings.get(parentDepth)) {
        parentDepth--;
      }
      const parent = parentHeadings.get(parentDepth);
      if (parent)
      {
        parent.subHeadings.push(node);
      }
      else tableOfContents.push(node);
    }
  });

  return tableOfContents;
}