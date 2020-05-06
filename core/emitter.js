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
    (this.listeners[event.type] || []).forEach(function({ node, handler }) {
      console.log(`Running handleDOM with event ${event.type}`);
      console.log('handleDOM target');
      console.log(event.target);
      console.log('handleDOM node');
      console.log(node);
      console.log('handleDOM event composedPath');
      console.log(event.composedPath());
      if (event.target === node || node.contains(event.target)) {
        if (event.target === node) {
          console.log('Target equals node.');
        } else if (node.contains(event.target)) {
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
