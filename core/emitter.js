import EventEmitter from 'eventemitter3';
import logger from './logger';

let debug = logger('quill:events');

const EVENTS = ['selectionchange', 'mousedown', 'mouseup', 'click'];
const EMITTERS = [];

EVENTS.forEach(function(eventName) {
  document.addEventListener(eventName, (...args) => {
    EMITTERS.forEach((em) => em.handleDOM(...args));
  });
});


class Emitter extends EventEmitter {
  constructor() {
    super();
    this.listeners = {};
    this.on('error', debug.error);
    EMITTERS.push(this);
  }

  emit() {
    debug.log.apply(debug, arguments);
    super.emit.apply(this, arguments);
  }

  handleDOM(event, ...args) {
    // Events that are fired from within the Shadow DOM are re-targeted to the host of the
    // shadow root. We take the first element of event.composedPath() to find the actual
    // element that fired the event within the Shadow DOM (if the Shadow DOM is open).
    // This should be equivalent to event.target in the normal, non Shadow DOM case.
    let target = event.composedPath()[0];
    (this.listeners[event.type] || []).forEach(function({ node, handler }) {
      console.log(`Running handleDOM with event ${event.type}`);
      console.log('handleDOM target');
      console.log(target);
      console.log('handleDOM node');
      console.log(node);
      console.log('handleDOM event composedPath');
      console.log(event.composedPath());
      if (target === node || node.contains(target)) {
        if (target === node) {
          console.log('Target equals node.');
        } else if (node.contains(target)) {
          console.log('Node contains target.');
        }
        console.log(`Actually running handler for ${event.type}`);
        handler(event, ...args);
      }
    });
  }

  listenDOM(eventName, node, handler) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push({ node, handler })
  }
}

Emitter.events = {
  EDITOR_CHANGE        : 'editor-change',
  SCROLL_BEFORE_UPDATE : 'scroll-before-update',
  SCROLL_OPTIMIZE      : 'scroll-optimize',
  SCROLL_UPDATE        : 'scroll-update',
  SELECTION_CHANGE     : 'selection-change',
  TEXT_CHANGE          : 'text-change'
};
Emitter.sources = {
  API    : 'api',
  SILENT : 'silent',
  USER   : 'user'
};


export default Emitter;
