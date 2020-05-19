export function createGetRootNodePolyfill(n) {
  if (!n.getRootNode) {
    n.getRootNode = function(opt) {
      var composed = typeof opt === 'object' && Boolean(opt.composed);

      return composed ? getShadowIncludingRoot(this) : getRoot(this);
    }
  }
}

/*
 * Polyfill for Node.getRootNode, which isn't implemented on legacy Edge.
 *
 * Taken from: https://github.com/foobarhq/get-root-node-polyfill/blob/master/index.js
 */
// function getRootNode(opt) {
//   var composed = typeof opt === 'object' && Boolean(opt.composed);
//
//   return composed ? getShadowIncludingRoot(this) : getRoot(this);
// }

function getShadowIncludingRoot(node) {
  var root = getRoot(node);

  if (isShadowRoot(root)) {
    return getShadowIncludingRoot(root.host);
  }

  return root;
}

function getRoot(node) {
  if (node.parentNode != null) {
    return getRoot(node.parentNode);
  }

  return node;
}

function isShadowRoot(node) {
  return node.nodeName === '#document-fragment' && node.constructor.name === 'ShadowRoot';
}
