/*
 * This creates a polyfill for Event.composedPath, which isn't implemented on legacy Edge.
 *
 * Taken from: https://gist.github.com/rockinghelvetica/00b9f7b5c97a16d3de75ba99192ff05c
 */
export function createComposedPathPolyfill(e, d, w) {
  if (!e.composedPath) {
    e.composedPath = function() {
      if (this.path) return this.path;
      var target = this.target;

      this.path = [];
      while (target.parentNode !== null) {
        this.path.push(target);
        target = target.parentNode;
      }
      this.path.push(d, w);
      return this.path;
    }
  }
}
