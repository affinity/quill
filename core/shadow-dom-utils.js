export function getDocumentContext(node) {
  let rootNode = node.getRootNode();
  return (isShadowRoot(rootNode)) ? rootNode : document;
}

export function isShadowRoot(node) {
  // We don't use 'instanceof ShadowRoot', since ShadowRoot isn't supported in legacy
  // Edge.
  return node.nodeName === '#document-fragment' && node.constructor.name === 'ShadowRoot';
}
