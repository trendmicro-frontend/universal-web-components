define(['vue', 'lodash', 'jquery'], function (Vue, _, require$$0) { 'use strict';

Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;
_ = _ && _.hasOwnProperty('default') ? _['default'] : _;
require$$0 = require$$0 && require$$0.hasOwnProperty('default') ? require$$0['default'] : require$$0;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};



















var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/*!
 * vue-i18n v7.6.0 
 * (c) 2018 kazuya kawaguchi
 * Released under the MIT License.
 */
/*  */

/**
 * utilites
 */

function warn(msg, err) {
  if (typeof console !== 'undefined') {
    console.warn('[vue-i18n] ' + msg);
    /* istanbul ignore if */
    if (err) {
      console.warn(err.stack);
    }
  }
}

function isObject(obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

var toString = Object.prototype.toString;
var OBJECT_STRING = '[object Object]';
function isPlainObject(obj) {
  return toString.call(obj) === OBJECT_STRING;
}

function isNull(val) {
  return val === null || val === undefined;
}

function parseArgs() {
  var args = [],
      len = arguments.length;
  while (len--) {
    args[len] = arguments[len];
  }var locale = null;
  var params = null;
  if (args.length === 1) {
    if (isObject(args[0]) || Array.isArray(args[0])) {
      params = args[0];
    } else if (typeof args[0] === 'string') {
      locale = args[0];
    }
  } else if (args.length === 2) {
    if (typeof args[0] === 'string') {
      locale = args[0];
    }
    /* istanbul ignore if */
    if (isObject(args[1]) || Array.isArray(args[1])) {
      params = args[1];
    }
  }

  return { locale: locale, params: params };
}

function getOldChoiceIndexFixed(choice) {
  return choice ? choice > 1 ? 1 : 0 : 1;
}

function getChoiceIndex(choice, choicesLength) {
  choice = Math.abs(choice);

  if (choicesLength === 2) {
    return getOldChoiceIndexFixed(choice);
  }

  return choice ? Math.min(choice, 2) : 0;
}

function fetchChoice(message, choice) {
  /* istanbul ignore if */
  if (!message && typeof message !== 'string') {
    return null;
  }
  var choices = message.split('|');

  choice = getChoiceIndex(choice, choices.length);
  if (!choices[choice]) {
    return message;
  }
  return choices[choice].trim();
}

function looseClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function merge(target) {
  var arguments$1 = arguments;

  var output = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments$1[i];
    if (source !== undefined && source !== null) {
      var key = void 0;
      for (key in source) {
        if (hasOwn(source, key)) {
          if (isObject(source[key])) {
            output[key] = merge(output[key], source[key]);
          } else {
            output[key] = source[key];
          }
        }
      }
    }
  }
  return output;
}

function looseEqual(a, b) {
  if (a === b) {
    return true;
  }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        /* istanbul ignore next */
        return false;
      }
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}

var canUseDateTimeFormat = typeof Intl !== 'undefined' && typeof Intl.DateTimeFormat !== 'undefined';

var canUseNumberFormat = typeof Intl !== 'undefined' && typeof Intl.NumberFormat !== 'undefined';

/*  */

function extend(Vue$$1) {
  // $FlowFixMe
  Object.defineProperty(Vue$$1.prototype, '$t', {
    get: function get$$1() {
      var this$1 = this;

      return function (key) {
        var values = [],
            len = arguments.length - 1;
        while (len-- > 0) {
          values[len] = arguments[len + 1];
        }var i18n = this$1.$i18n;
        return i18n._t.apply(i18n, [key, i18n.locale, i18n._getMessages(), this$1].concat(values));
      };
    }
  });
  // $FlowFixMe
  Object.defineProperty(Vue$$1.prototype, '$tc', {
    get: function get$1() {
      var this$1 = this;

      return function (key, choice) {
        var values = [],
            len = arguments.length - 2;
        while (len-- > 0) {
          values[len] = arguments[len + 2];
        }var i18n = this$1.$i18n;
        return i18n._tc.apply(i18n, [key, i18n.locale, i18n._getMessages(), this$1, choice].concat(values));
      };
    }
  });
  // $FlowFixMe
  Object.defineProperty(Vue$$1.prototype, '$te', {
    get: function get$2() {
      var this$1 = this;

      return function (key, locale) {
        var i18n = this$1.$i18n;
        return i18n._te(key, i18n.locale, i18n._getMessages(), locale);
      };
    }
  });
  // $FlowFixMe
  Object.defineProperty(Vue$$1.prototype, '$d', {
    get: function get$3() {
      var this$1 = this;

      return function (value) {
        var args = [],
            len = arguments.length - 1;
        while (len-- > 0) {
          args[len] = arguments[len + 1];
        }return (ref = this$1.$i18n).d.apply(ref, [value].concat(args));
        var ref;
      };
    }
  });
  // $FlowFixMe
  Object.defineProperty(Vue$$1.prototype, '$n', {
    get: function get$4() {
      var this$1 = this;

      return function (value) {
        var args = [],
            len = arguments.length - 1;
        while (len-- > 0) {
          args[len] = arguments[len + 1];
        }return (ref = this$1.$i18n).n.apply(ref, [value].concat(args));
        var ref;
      };
    }
  });
}

/*  */

var mixin = {
  beforeCreate: function beforeCreate() {
    var options = this.$options;
    options.i18n = options.i18n || (options.__i18n ? {} : null);

    if (options.i18n) {
      if (options.i18n instanceof VueI18n) {
        // init locale messages via custom blocks
        if (options.__i18n) {
          try {
            var localeMessages = {};
            options.__i18n.forEach(function (resource) {
              localeMessages = merge(localeMessages, JSON.parse(resource));
            });
            Object.keys(localeMessages).forEach(function (locale) {
              options.i18n.mergeLocaleMessage(locale, localeMessages[locale]);
            });
          } catch (e) {
            
          }
        }
        this._i18n = options.i18n;
        this._i18nWatcher = this._i18n.watchI18nData();
        this._i18n.subscribeDataChanging(this);
        this._subscribing = true;
      } else if (isPlainObject(options.i18n)) {
        // component local i18n
        if (this.$root && this.$root.$i18n && this.$root.$i18n instanceof VueI18n) {
          options.i18n.root = this.$root.$i18n;
          options.i18n.formatter = this.$root.$i18n.formatter;
          options.i18n.fallbackLocale = this.$root.$i18n.fallbackLocale;
          options.i18n.silentTranslationWarn = this.$root.$i18n.silentTranslationWarn;
        }

        // init locale messages via custom blocks
        if (options.__i18n) {
          try {
            var localeMessages$1 = {};
            options.__i18n.forEach(function (resource) {
              localeMessages$1 = merge(localeMessages$1, JSON.parse(resource));
            });
            options.i18n.messages = localeMessages$1;
          } catch (e) {
            
          }
        }

        this._i18n = new VueI18n(options.i18n);
        this._i18nWatcher = this._i18n.watchI18nData();
        this._i18n.subscribeDataChanging(this);
        this._subscribing = true;

        if (options.i18n.sync === undefined || !!options.i18n.sync) {
          this._localeWatcher = this.$i18n.watchLocale();
        }
      } else {
        
      }
    } else if (this.$root && this.$root.$i18n && this.$root.$i18n instanceof VueI18n) {
      // root i18n
      this._i18n = this.$root.$i18n;
      this._i18n.subscribeDataChanging(this);
      this._subscribing = true;
    } else if (options.parent && options.parent.$i18n && options.parent.$i18n instanceof VueI18n) {
      // parent i18n
      this._i18n = options.parent.$i18n;
      this._i18n.subscribeDataChanging(this);
      this._subscribing = true;
    }
  },

  beforeDestroy: function beforeDestroy() {
    if (!this._i18n) {
      return;
    }

    if (this._subscribing) {
      this._i18n.unsubscribeDataChanging(this);
      delete this._subscribing;
    }

    if (this._i18nWatcher) {
      this._i18nWatcher();
      delete this._i18nWatcher;
    }

    if (this._localeWatcher) {
      this._localeWatcher();
      delete this._localeWatcher;
    }

    this._i18n = null;
  }
};

/*  */

var component = {
  name: 'i18n',
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'span'
    },
    path: {
      type: String,
      required: true
    },
    locale: {
      type: String
    },
    places: {
      type: [Array, Object]
    }
  },
  render: function render(h, ref) {
    var props = ref.props;
    var data = ref.data;
    var children = ref.children;
    var parent = ref.parent;

    var i18n = parent.$i18n;

    children = (children || []).filter(function (child) {
      return child.tag || (child.text = child.text.trim());
    });

    if (!i18n) {
      return children;
    }

    var path = props.path;
    var locale = props.locale;

    var params = {};
    var places = props.places || {};

    var hasPlaces = Array.isArray(places) ? places.length > 0 : Object.keys(places).length > 0;

    var everyPlace = children.every(function (child) {
      if (child.data && child.data.attrs) {
        var place = child.data.attrs.place;
        return typeof place !== 'undefined' && place !== '';
      }
    });

    if (hasPlaces && children.length > 0 && !everyPlace) {
      warn('If places prop is set, all child elements must have place prop set.');
    }

    if (Array.isArray(places)) {
      places.forEach(function (el, i) {
        params[i] = el;
      });
    } else {
      Object.keys(places).forEach(function (key) {
        params[key] = places[key];
      });
    }

    children.forEach(function (child, i) {
      var key = everyPlace ? "" + child.data.attrs.place : "" + i;
      params[key] = child;
    });

    return h(props.tag, data, i18n.i(path, locale, params));
  }
};

/*  */

function bind(el, binding, vnode) {
  if (!assert(el, vnode)) {
    return;
  }

  t$1(el, binding, vnode);
}

function update(el, binding, vnode, oldVNode) {
  if (!assert(el, vnode)) {
    return;
  }

  if (localeEqual(el, vnode) && looseEqual(binding.value, binding.oldValue)) {
    return;
  }

  t$1(el, binding, vnode);
}

function assert(el, vnode) {
  var vm = vnode.context;
  if (!vm) {
    warn('not exist Vue instance in VNode context');
    return false;
  }

  if (!vm.$i18n) {
    warn('not exist VueI18n instance in Vue instance');
    return false;
  }

  return true;
}

function localeEqual(el, vnode) {
  var vm = vnode.context;
  return el._locale === vm.$i18n.locale;
}

function t$1(el, binding, vnode) {
  var value = binding.value;

  var ref = parseValue(value);
  var path = ref.path;
  var locale = ref.locale;
  var args = ref.args;
  var choice = ref.choice;
  if (!path && !locale && !args) {
    warn('not support value type');
    return;
  }

  if (!path) {
    warn('required `path` in v-t directive');
    return;
  }

  var vm = vnode.context;
  if (choice) {
    el._vt = el.textContent = (ref$1 = vm.$i18n).tc.apply(ref$1, [path, choice].concat(makeParams(locale, args)));
  } else {
    el._vt = el.textContent = (ref$2 = vm.$i18n).t.apply(ref$2, [path].concat(makeParams(locale, args)));
  }
  el._locale = vm.$i18n.locale;
  var ref$1;
  var ref$2;
}

function parseValue(value) {
  var path;
  var locale;
  var args;
  var choice;

  if (typeof value === 'string') {
    path = value;
  } else if (isPlainObject(value)) {
    path = value.path;
    locale = value.locale;
    args = value.args;
    choice = value.choice;
  }

  return { path: path, locale: locale, args: args, choice: choice };
}

function makeParams(locale, args) {
  var params = [];

  locale && params.push(locale);
  if (args && (Array.isArray(args) || isPlainObject(args))) {
    params.push(args);
  }

  return params;
}

var Vue$1;

function install(_Vue) {
  Vue$1 = _Vue;

  var version = Vue$1.version && Number(Vue$1.version.split('.')[0]) || -1;
  /* istanbul ignore if */
  install.installed = true;

  /* istanbul ignore if */
  Object.defineProperty(Vue$1.prototype, '$i18n', {
    get: function get$$1() {
      return this._i18n;
    }
  });

  extend(Vue$1);
  Vue$1.mixin(mixin);
  Vue$1.directive('t', { bind: bind, update: update });
  Vue$1.component(component.name, component);

  // use object-based merge strategy
  var strats = Vue$1.config.optionMergeStrategies;
  strats.i18n = strats.methods;
}

/*  */

var BaseFormatter = function BaseFormatter() {
  this._caches = Object.create(null);
};

BaseFormatter.prototype.interpolate = function interpolate(message, values) {
  if (!values) {
    return [message];
  }
  var tokens = this._caches[message];
  if (!tokens) {
    tokens = parse(message);
    this._caches[message] = tokens;
  }
  return compile(tokens, values);
};

var RE_TOKEN_LIST_VALUE = /^(\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(\w)+/;

function parse(format) {
  var tokens = [];
  var position = 0;

  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === '{') {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }

      text = '';
      var sub = '';
      char = format[position++];
      while (char !== '}') {
        sub += char;
        char = format[position++];
      }

      var type = RE_TOKEN_LIST_VALUE.test(sub) ? 'list' : RE_TOKEN_NAMED_VALUE.test(sub) ? 'named' : 'unknown';
      tokens.push({ value: sub, type: type });
    } else if (char === '%') {
      // when found rails i18n syntax, skip text capture
      if (format[position] !== '{') {
        text += char;
      }
    } else {
      text += char;
    }
  }

  text && tokens.push({ type: 'text', value: text });

  return tokens;
}

function compile(tokens, values) {
  var compiled = [];
  var index = 0;

  var mode = Array.isArray(values) ? 'list' : isObject(values) ? 'named' : 'unknown';
  if (mode === 'unknown') {
    return compiled;
  }

  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else {
          
        }
        break;
      case 'unknown':
        
        break;
    }
    index++;
  }

  return compiled;
}

/*  */

/**
 *  Path paerser
 *  - Inspired:
 *    Vue.js Path parser
 */

// actions
var APPEND = 0;
var PUSH = 1;
var INC_SUB_PATH_DEPTH = 2;
var PUSH_SUB_PATH = 3;

// states
var BEFORE_PATH = 0;
var IN_PATH = 1;
var BEFORE_IDENT = 2;
var IN_IDENT = 3;
var IN_SUB_PATH = 4;
var IN_SINGLE_QUOTE = 5;
var IN_DOUBLE_QUOTE = 6;
var AFTER_PATH = 7;
var ERROR = 8;

var pathStateMachine = [];

pathStateMachine[BEFORE_PATH] = {
  'ws': [BEFORE_PATH],
  'ident': [IN_IDENT, APPEND],
  '[': [IN_SUB_PATH],
  'eof': [AFTER_PATH]
};

pathStateMachine[IN_PATH] = {
  'ws': [IN_PATH],
  '.': [BEFORE_IDENT],
  '[': [IN_SUB_PATH],
  'eof': [AFTER_PATH]
};

pathStateMachine[BEFORE_IDENT] = {
  'ws': [BEFORE_IDENT],
  'ident': [IN_IDENT, APPEND],
  '0': [IN_IDENT, APPEND],
  'number': [IN_IDENT, APPEND]
};

pathStateMachine[IN_IDENT] = {
  'ident': [IN_IDENT, APPEND],
  '0': [IN_IDENT, APPEND],
  'number': [IN_IDENT, APPEND],
  'ws': [IN_PATH, PUSH],
  '.': [BEFORE_IDENT, PUSH],
  '[': [IN_SUB_PATH, PUSH],
  'eof': [AFTER_PATH, PUSH]
};

pathStateMachine[IN_SUB_PATH] = {
  "'": [IN_SINGLE_QUOTE, APPEND],
  '"': [IN_DOUBLE_QUOTE, APPEND],
  '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
  ']': [IN_PATH, PUSH_SUB_PATH],
  'eof': ERROR,
  'else': [IN_SUB_PATH, APPEND]
};

pathStateMachine[IN_SINGLE_QUOTE] = {
  "'": [IN_SUB_PATH, APPEND],
  'eof': ERROR,
  'else': [IN_SINGLE_QUOTE, APPEND]
};

pathStateMachine[IN_DOUBLE_QUOTE] = {
  '"': [IN_SUB_PATH, APPEND],
  'eof': ERROR,
  'else': [IN_DOUBLE_QUOTE, APPEND]
};

/**
 * Check if an expression is a literal value.
 */

var literalValueRE = /^\s?(true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function isLiteral(exp) {
  return literalValueRE.test(exp);
}

/**
 * Strip quotes from a string
 */

function stripQuotes(str) {
  var a = str.charCodeAt(0);
  var b = str.charCodeAt(str.length - 1);
  return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
}

/**
 * Determine the type of a character in a keypath.
 */

function getPathCharType(ch) {
  if (ch === undefined || ch === null) {
    return 'eof';
  }

  var code = ch.charCodeAt(0);

  switch (code) {
    case 0x5B: // [
    case 0x5D: // ]
    case 0x2E: // .
    case 0x22: // "
    case 0x27: // '
    case 0x30:
      // 0
      return ch;

    case 0x5F: // _
    case 0x24: // $
    case 0x2D:
      // -
      return 'ident';

    case 0x20: // Space
    case 0x09: // Tab
    case 0x0A: // Newline
    case 0x0D: // Return
    case 0xA0: // No-break space
    case 0xFEFF: // Byte Order Mark
    case 0x2028: // Line Separator
    case 0x2029:
      // Paragraph Separator
      return 'ws';
  }

  // a-z, A-Z
  if (code >= 0x61 && code <= 0x7A || code >= 0x41 && code <= 0x5A) {
    return 'ident';
  }

  // 1-9
  if (code >= 0x31 && code <= 0x39) {
    return 'number';
  }

  return 'else';
}

/**
 * Format a subPath, return its plain form if it is
 * a literal string or number. Otherwise prepend the
 * dynamic indicator (*).
 */

function formatSubPath(path) {
  var trimmed = path.trim();
  // invalid leading 0
  if (path.charAt(0) === '0' && isNaN(path)) {
    return false;
  }

  return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed;
}

/**
 * Parse a string path into an array of segments
 */

function parse$1(path) {
  var keys = [];
  var index = -1;
  var mode = BEFORE_PATH;
  var subPathDepth = 0;
  var c;
  var key;
  var newChar;
  var type;
  var transition;
  var action;
  var typeMap;
  var actions = [];

  actions[PUSH] = function () {
    if (key !== undefined) {
      keys.push(key);
      key = undefined;
    }
  };

  actions[APPEND] = function () {
    if (key === undefined) {
      key = newChar;
    } else {
      key += newChar;
    }
  };

  actions[INC_SUB_PATH_DEPTH] = function () {
    actions[APPEND]();
    subPathDepth++;
  };

  actions[PUSH_SUB_PATH] = function () {
    if (subPathDepth > 0) {
      subPathDepth--;
      mode = IN_SUB_PATH;
      actions[APPEND]();
    } else {
      subPathDepth = 0;
      key = formatSubPath(key);
      if (key === false) {
        return false;
      } else {
        actions[PUSH]();
      }
    }
  };

  function maybeUnescapeQuote() {
    var nextChar = path[index + 1];
    if (mode === IN_SINGLE_QUOTE && nextChar === "'" || mode === IN_DOUBLE_QUOTE && nextChar === '"') {
      index++;
      newChar = '\\' + nextChar;
      actions[APPEND]();
      return true;
    }
  }

  while (mode !== null) {
    index++;
    c = path[index];

    if (c === '\\' && maybeUnescapeQuote()) {
      continue;
    }

    type = getPathCharType(c);
    typeMap = pathStateMachine[mode];
    transition = typeMap[type] || typeMap['else'] || ERROR;

    if (transition === ERROR) {
      return; // parse error
    }

    mode = transition[0];
    action = actions[transition[1]];
    if (action) {
      newChar = transition[2];
      newChar = newChar === undefined ? c : newChar;
      if (action() === false) {
        return;
      }
    }

    if (mode === AFTER_PATH) {
      return keys;
    }
  }
}

function empty(target) {
  /* istanbul ignore else */
  if (Array.isArray(target)) {
    return target.length === 0;
  } else {
    return false;
  }
}

var I18nPath = function I18nPath() {
  this._cache = Object.create(null);
};

/**
 * External parse that check for a cache hit first
 */
I18nPath.prototype.parsePath = function parsePath(path) {
  var hit = this._cache[path];
  if (!hit) {
    hit = parse$1(path);
    if (hit) {
      this._cache[path] = hit;
    }
  }
  return hit || [];
};

/**
 * Get path value from path string
 */
I18nPath.prototype.getPathValue = function getPathValue(obj, path) {
  if (!isObject(obj)) {
    return null;
  }

  var paths = this.parsePath(path);
  if (empty(paths)) {
    return null;
  } else {
    var length = paths.length;
    var ret = null;
    var last = obj;
    var i = 0;
    while (i < length) {
      var value = last[paths[i]];
      if (value === undefined) {
        last = null;
        break;
      }
      last = value;
      i++;
    }

    ret = last;
    return ret;
  }
};

/*  */

var numberFormatKeys = ['style', 'currency', 'currencyDisplay', 'useGrouping', 'minimumIntegerDigits', 'minimumFractionDigits', 'maximumFractionDigits', 'minimumSignificantDigits', 'maximumSignificantDigits', 'localeMatcher', 'formatMatcher'];

var VueI18n = function VueI18n(options) {
  var this$1 = this;
  if (options === void 0) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #290
  /* istanbul ignore if */
  if (!Vue$1 && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  var locale = options.locale || 'en-US';
  var fallbackLocale = options.fallbackLocale || 'en-US';
  var messages = options.messages || {};
  var dateTimeFormats = options.dateTimeFormats || {};
  var numberFormats = options.numberFormats || {};

  this._vm = null;
  this._formatter = options.formatter || new BaseFormatter();
  this._missing = options.missing || null;
  this._root = options.root || null;
  this._sync = options.sync === undefined ? true : !!options.sync;
  this._fallbackRoot = options.fallbackRoot === undefined ? true : !!options.fallbackRoot;
  this._silentTranslationWarn = options.silentTranslationWarn === undefined ? false : !!options.silentTranslationWarn;
  this._dateTimeFormatters = {};
  this._numberFormatters = {};
  this._path = new I18nPath();
  this._dataListeners = [];

  this._exist = function (message, key) {
    if (!message || !key) {
      return false;
    }
    return !isNull(this$1._path.getPathValue(message, key));
  };

  this._initVM({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    dateTimeFormats: dateTimeFormats,
    numberFormats: numberFormats
  });
};

var prototypeAccessors = { vm: {}, messages: {}, dateTimeFormats: {}, numberFormats: {}, locale: {}, fallbackLocale: {}, missing: {}, formatter: {}, silentTranslationWarn: {} };

VueI18n.prototype._initVM = function _initVM(data) {
  var silent = Vue$1.config.silent;
  Vue$1.config.silent = true;
  this._vm = new Vue$1({ data: data });
  Vue$1.config.silent = silent;
};

VueI18n.prototype.subscribeDataChanging = function subscribeDataChanging(vm) {
  this._dataListeners.push(vm);
};

VueI18n.prototype.unsubscribeDataChanging = function unsubscribeDataChanging(vm) {
  remove(this._dataListeners, vm);
};

VueI18n.prototype.watchI18nData = function watchI18nData() {
  var self = this;
  return this._vm.$watch('$data', function () {
    var i = self._dataListeners.length;
    while (i--) {
      Vue$1.nextTick(function () {
        self._dataListeners[i] && self._dataListeners[i].$forceUpdate();
      });
    }
  }, { deep: true });
};

VueI18n.prototype.watchLocale = function watchLocale() {
  /* istanbul ignore if */
  if (!this._sync || !this._root) {
    return null;
  }
  var target = this._vm;
  return this._root.vm.$watch('locale', function (val) {
    target.$set(target, 'locale', val);
    target.$forceUpdate();
  }, { immediate: true });
};

prototypeAccessors.vm.get = function () {
  return this._vm;
};

prototypeAccessors.messages.get = function () {
  return looseClone(this._getMessages());
};
prototypeAccessors.dateTimeFormats.get = function () {
  return looseClone(this._getDateTimeFormats());
};
prototypeAccessors.numberFormats.get = function () {
  return looseClone(this._getNumberFormats());
};

prototypeAccessors.locale.get = function () {
  return this._vm.locale;
};
prototypeAccessors.locale.set = function (locale) {
  this._vm.$set(this._vm, 'locale', locale);
};

prototypeAccessors.fallbackLocale.get = function () {
  return this._vm.fallbackLocale;
};
prototypeAccessors.fallbackLocale.set = function (locale) {
  this._vm.$set(this._vm, 'fallbackLocale', locale);
};

prototypeAccessors.missing.get = function () {
  return this._missing;
};
prototypeAccessors.missing.set = function (handler) {
  this._missing = handler;
};

prototypeAccessors.formatter.get = function () {
  return this._formatter;
};
prototypeAccessors.formatter.set = function (formatter) {
  this._formatter = formatter;
};

prototypeAccessors.silentTranslationWarn.get = function () {
  return this._silentTranslationWarn;
};
prototypeAccessors.silentTranslationWarn.set = function (silent) {
  this._silentTranslationWarn = silent;
};

VueI18n.prototype._getMessages = function _getMessages() {
  return this._vm.messages;
};
VueI18n.prototype._getDateTimeFormats = function _getDateTimeFormats() {
  return this._vm.dateTimeFormats;
};
VueI18n.prototype._getNumberFormats = function _getNumberFormats() {
  return this._vm.numberFormats;
};

VueI18n.prototype._warnDefault = function _warnDefault(locale, key, result, vm, values) {
  if (!isNull(result)) {
    return result;
  }
  if (this._missing) {
    var missingRet = this._missing.apply(null, [locale, key, vm, values]);
    if (typeof missingRet === 'string') {
      return missingRet;
    }
  } else {
    
  }
  return key;
};

VueI18n.prototype._isFallbackRoot = function _isFallbackRoot(val) {
  return !val && !isNull(this._root) && this._fallbackRoot;
};

VueI18n.prototype._interpolate = function _interpolate(locale, message, key, host, interpolateMode, values) {
  if (!message) {
    return null;
  }

  var pathRet = this._path.getPathValue(message, key);
  if (Array.isArray(pathRet) || isPlainObject(pathRet)) {
    return pathRet;
  }

  var ret;
  if (isNull(pathRet)) {
    /* istanbul ignore else */
    if (isPlainObject(message)) {
      ret = message[key];
      if (typeof ret !== 'string') {
        return null;
      }
    } else {
      return null;
    }
  } else {
    /* istanbul ignore else */
    if (typeof pathRet === 'string') {
      ret = pathRet;
    } else {
      return null;
    }
  }

  // Check for the existance of links within the translated string
  if (ret.indexOf('@:') >= 0) {
    ret = this._link(locale, message, ret, host, interpolateMode, values);
  }

  return this._render(ret, interpolateMode, values);
};

VueI18n.prototype._link = function _link(locale, message, str, host, interpolateMode, values) {
  var this$1 = this;

  var ret = str;

  // Match all the links within the local
  // We are going to replace each of
  // them with its translation
  var matches = ret.match(/(@:[\w\-_|.]+)/g);
  for (var idx in matches) {
    // ie compatible: filter custom array
    // prototype method
    if (!matches.hasOwnProperty(idx)) {
      continue;
    }
    var link = matches[idx];
    // Remove the leading @:
    var linkPlaceholder = link.substr(2);
    // Translate the link
    var translated = this$1._interpolate(locale, message, linkPlaceholder, host, interpolateMode === 'raw' ? 'string' : interpolateMode, interpolateMode === 'raw' ? undefined : values);

    if (this$1._isFallbackRoot(translated)) {
      if (!this$1._root) {
        throw Error('unexpected error');
      }
      var root = this$1._root;
      translated = root._translate(root._getMessages(), root.locale, root.fallbackLocale, linkPlaceholder, host, interpolateMode, values);
    }
    translated = this$1._warnDefault(locale, linkPlaceholder, translated, host, Array.isArray(values) ? values : [values]);

    // Replace the link with the translated
    ret = !translated ? ret : ret.replace(link, translated);
  }

  return ret;
};

VueI18n.prototype._render = function _render(message, interpolateMode, values) {
  var ret = this._formatter.interpolate(message, values);
  // if interpolateMode is **not** 'string' ('row'),
  // return the compiled data (e.g. ['foo', VNode, 'bar']) with formatter
  return interpolateMode === 'string' ? ret.join('') : ret;
};

VueI18n.prototype._translate = function _translate(messages, locale, fallback, key, host, interpolateMode, args) {
  var res = this._interpolate(locale, messages[locale], key, host, interpolateMode, args);
  if (!isNull(res)) {
    return res;
  }

  res = this._interpolate(fallback, messages[fallback], key, host, interpolateMode, args);
  if (!isNull(res)) {
    return res;
  } else {
    return null;
  }
};

VueI18n.prototype._t = function _t(key, _locale, messages, host) {
  var values = [],
      len = arguments.length - 4;
  while (len-- > 0) {
    values[len] = arguments[len + 4];
  }if (!key) {
    return '';
  }

  var parsedArgs = parseArgs.apply(void 0, values);
  var locale = parsedArgs.locale || _locale;

  var ret = this._translate(messages, locale, this.fallbackLocale, key, host, 'string', parsedArgs.params);
  if (this._isFallbackRoot(ret)) {
    if (!this._root) {
      throw Error('unexpected error');
    }
    return (ref = this._root).t.apply(ref, [key].concat(values));
  } else {
    return this._warnDefault(locale, key, ret, host, values);
  }
  var ref;
};

VueI18n.prototype.t = function t(key) {
  var values = [],
      len = arguments.length - 1;
  while (len-- > 0) {
    values[len] = arguments[len + 1];
  }return (ref = this)._t.apply(ref, [key, this.locale, this._getMessages(), null].concat(values));
  var ref;
};

VueI18n.prototype._i = function _i(key, locale, messages, host, values) {
  var ret = this._translate(messages, locale, this.fallbackLocale, key, host, 'raw', values);
  if (this._isFallbackRoot(ret)) {
    if (!this._root) {
      throw Error('unexpected error');
    }
    return this._root.i(key, locale, values);
  } else {
    return this._warnDefault(locale, key, ret, host, [values]);
  }
};

VueI18n.prototype.i = function i(key, locale, values) {
  /* istanbul ignore if */
  if (!key) {
    return '';
  }

  if (typeof locale !== 'string') {
    locale = this.locale;
  }

  return this._i(key, locale, this._getMessages(), null, values);
};

VueI18n.prototype._tc = function _tc(key, _locale, messages, host, choice) {
  var values = [],
      len = arguments.length - 5;
  while (len-- > 0) {
    values[len] = arguments[len + 5];
  }if (!key) {
    return '';
  }
  if (choice === undefined) {
    choice = 1;
  }
  return fetchChoice((ref = this)._t.apply(ref, [key, _locale, messages, host].concat(values)), choice);
  var ref;
};

VueI18n.prototype.tc = function tc(key, choice) {
  var values = [],
      len = arguments.length - 2;
  while (len-- > 0) {
    values[len] = arguments[len + 2];
  }return (ref = this)._tc.apply(ref, [key, this.locale, this._getMessages(), null, choice].concat(values));
  var ref;
};

VueI18n.prototype._te = function _te(key, locale, messages) {
  var args = [],
      len = arguments.length - 3;
  while (len-- > 0) {
    args[len] = arguments[len + 3];
  }var _locale = parseArgs.apply(void 0, args).locale || locale;
  return this._exist(messages[_locale], key);
};

VueI18n.prototype.te = function te(key, locale) {
  return this._te(key, this.locale, this._getMessages(), locale);
};

VueI18n.prototype.getLocaleMessage = function getLocaleMessage(locale) {
  return looseClone(this._vm.messages[locale] || {});
};

VueI18n.prototype.setLocaleMessage = function setLocaleMessage(locale, message) {
  this._vm.messages[locale] = message;
};

VueI18n.prototype.mergeLocaleMessage = function mergeLocaleMessage(locale, message) {
  this._vm.$set(this._vm.messages, locale, Vue$1.util.extend(this._vm.messages[locale] || {}, message));
};

VueI18n.prototype.getDateTimeFormat = function getDateTimeFormat(locale) {
  return looseClone(this._vm.dateTimeFormats[locale] || {});
};

VueI18n.prototype.setDateTimeFormat = function setDateTimeFormat(locale, format) {
  this._vm.dateTimeFormats[locale] = format;
};

VueI18n.prototype.mergeDateTimeFormat = function mergeDateTimeFormat(locale, format) {
  this._vm.$set(this._vm.dateTimeFormats, locale, Vue$1.util.extend(this._vm.dateTimeFormats[locale] || {}, format));
};

VueI18n.prototype._localizeDateTime = function _localizeDateTime(value, locale, fallback, dateTimeFormats, key) {
  var _locale = locale;
  var formats = dateTimeFormats[_locale];

  // fallback locale
  if (isNull(formats) || isNull(formats[key])) {
    _locale = fallback;
    formats = dateTimeFormats[_locale];
  }

  if (isNull(formats) || isNull(formats[key])) {
    return null;
  } else {
    var format = formats[key];
    var id = _locale + "__" + key;
    var formatter = this._dateTimeFormatters[id];
    if (!formatter) {
      formatter = this._dateTimeFormatters[id] = new Intl.DateTimeFormat(_locale, format);
    }
    return formatter.format(value);
  }
};

VueI18n.prototype._d = function _d(value, locale, key) {
  /* istanbul ignore if */
  if (!key) {
    return new Intl.DateTimeFormat(locale).format(value);
  }

  var ret = this._localizeDateTime(value, locale, this.fallbackLocale, this._getDateTimeFormats(), key);
  if (this._isFallbackRoot(ret)) {
    if (!this._root) {
      throw Error('unexpected error');
    }
    return this._root.d(value, key, locale);
  } else {
    return ret || '';
  }
};

VueI18n.prototype.d = function d(value) {
  var args = [],
      len = arguments.length - 1;
  while (len-- > 0) {
    args[len] = arguments[len + 1];
  }var locale = this.locale;
  var key = null;

  if (args.length === 1) {
    if (typeof args[0] === 'string') {
      key = args[0];
    } else if (isObject(args[0])) {
      if (args[0].locale) {
        locale = args[0].locale;
      }
      if (args[0].key) {
        key = args[0].key;
      }
    }
  } else if (args.length === 2) {
    if (typeof args[0] === 'string') {
      key = args[0];
    }
    if (typeof args[1] === 'string') {
      locale = args[1];
    }
  }

  return this._d(value, locale, key);
};

VueI18n.prototype.getNumberFormat = function getNumberFormat(locale) {
  return looseClone(this._vm.numberFormats[locale] || {});
};

VueI18n.prototype.setNumberFormat = function setNumberFormat(locale, format) {
  this._vm.numberFormats[locale] = format;
};

VueI18n.prototype.mergeNumberFormat = function mergeNumberFormat(locale, format) {
  this._vm.$set(this._vm.numberFormats, locale, Vue$1.util.extend(this._vm.numberFormats[locale] || {}, format));
};

VueI18n.prototype._localizeNumber = function _localizeNumber(value, locale, fallback, numberFormats, key, options) {
  var _locale = locale;
  var formats = numberFormats[_locale];

  // fallback locale
  if (isNull(formats) || isNull(formats[key])) {
    _locale = fallback;
    formats = numberFormats[_locale];
  }

  if (isNull(formats) || isNull(formats[key])) {
    return null;
  } else {
    var format = formats[key];

    var formatter;
    if (options) {
      // If options specified - create one time number formatter
      formatter = new Intl.NumberFormat(_locale, Object.assign({}, format, options));
    } else {
      var id = _locale + "__" + key;
      formatter = this._numberFormatters[id];
      if (!formatter) {
        formatter = this._numberFormatters[id] = new Intl.NumberFormat(_locale, format);
      }
    }
    return formatter.format(value);
  }
};

VueI18n.prototype._n = function _n(value, locale, key, options) {
  /* istanbul ignore if */
  if (!key) {
    var nf = !options ? new Intl.NumberFormat(locale) : new Intl.NumberFormat(locale, options);
    return nf.format(value);
  }

  var ret = this._localizeNumber(value, locale, this.fallbackLocale, this._getNumberFormats(), key, options);
  if (this._isFallbackRoot(ret)) {
    if (!this._root) {
      throw Error('unexpected error');
    }
    return this._root.n(value, Object.assign({}, { key: key, locale: locale }, options));
  } else {
    return ret || '';
  }
};

VueI18n.prototype.n = function n(value) {
  var args = [],
      len = arguments.length - 1;
  while (len-- > 0) {
    args[len] = arguments[len + 1];
  }var locale = this.locale;
  var key = null;
  var options = null;

  if (args.length === 1) {
    if (typeof args[0] === 'string') {
      key = args[0];
    } else if (isObject(args[0])) {
      if (args[0].locale) {
        locale = args[0].locale;
      }
      if (args[0].key) {
        key = args[0].key;
      }

      // Filter out number format options only
      options = Object.keys(args[0]).reduce(function (acc, key) {
        if (numberFormatKeys.includes(key)) {
          var obj;
          return Object.assign({}, acc, (obj = {}, obj[key] = args[0][key], obj));
        }
        return acc;
      }, null);
    }
  } else if (args.length === 2) {
    if (typeof args[0] === 'string') {
      key = args[0];
    }
    if (typeof args[1] === 'string') {
      locale = args[1];
    }
  }

  return this._n(value, locale, key, options);
};

Object.defineProperties(VueI18n.prototype, prototypeAccessors);

VueI18n.availabilities = {
  dateTimeFormat: canUseDateTimeFormat,
  numberFormat: canUseNumberFormat
};
VueI18n.install = install;
VueI18n.version = '7.6.0';

var TmVueActionButton$1 = { template: "<button type=\"button\" class=\"btn\" :class=\"buttonStatus\" :disabled=\"disabled\" v-on:click=\"clicked\"> <span class=\"glyphicon-loader\" v-show=\"isLoading\"></span>{{ val }} </button>",
  name: "TmVueActionButton",
  props: {
    name: {
      type: String,
      default: null
    },
    loadingName: {
      type: String,
      default: null
    },
    isPrimary: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },

  data: function data() {
    return {
      // show_name:this.param.name,
      // is_disabled:'',
    };
  },
  computed: {
    val: function val() {
      if (this.isLoading) {
        return this.loadingName;
      } else {
        return this.name;
      }
    },
    buttonStatus: function buttonStatus() {
      if (this.isPrimary) return "btn-primary";else return "btn-default";
    }
  },
  methods: {
    clicked: function clicked() {
      this.$emit("clicked");
    }
  }
};

TmVueActionButton$1.install = function (V, options) {
    V.component(TmVueActionButton$1.name, TmVueActionButton$1);
};

var TmVueRadio = { template: "<div class=\"radio\" :class=\"{'disabled':isDisabled}\"> <input type=\"radio\" :value=\"value\" @change=\"handleChange\" v-model=\"checked\" class=\"input-radio\" :disabled=\"isDisabled\" :class=\"{'disabled':disabledClass}\"> <label @click=\"labelClick\"><slot></slot></label> </div>",
    name: 'TmVueRadio',
    model: {
        prop: "checked",
        event: "change"
    },
    props: {
        checked: {
            type: Number,
            default: ""
        },
        value: {
            type: [String, Number],
            value: ""
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        isDisabled: function isDisabled() {
            return this.disabled === true ? true : false; //default disabled attribute is false
        },
        disabledClass: function disabledClass() {
            return this.isDisabled && this.checked != this.value; //only add disabled class for the unchecked radio to stop hover color change.
        }
    },
    methods: {
        handleChange: function handleChange() {
            this.$nextTick(function () {
                this.$emit('change', this.checked);
            });
        },
        labelClick: function labelClick() {
            if (this.isDisabled) return;
            this.checked = this.value;
            this.handleChange();
        }
    }
};

TmVueRadio.install = function (V, options) {
    V.component(TmVueRadio.name, TmVueRadio);
};

var isServer = Vue.prototype.$isServer;
// 判断参数是否是其中之一
function oneOf(value, validList) {
    for (var i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true;
        }
    }
    return false;
}





// watch DOM change
var MutationObserver = isServer ? false : window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || false;

// getStyle


// Warn


// scrollTop animation


// Find components upward
function findComponentUpward(context, componentName, componentNames) {
    if (typeof componentName === 'string') {
        componentNames = [componentName];
    } else {
        componentNames = componentName;
    }

    var parent = context.$parent;
    var name = parent.$options.name;
    while (parent && (!name || componentNames.indexOf(name) < 0)) {
        parent = parent.$parent;
        if (parent) name = parent.$options.name;
    }
    return parent;
}
// Find component downward


// Find components downward
function findComponentsDownward(context, componentName) {
    return context.$children.reduce(function (components, child) {
        if (child.$options.name === componentName) components.push(child);
        var foundChilds = findComponentsDownward(child, componentName);
        return components.concat(foundChilds);
    }, []);
}

/* istanbul ignore next */


/* istanbul ignore next */


/* istanbul ignore next */

function _broadcast(componentName, eventName, params) {
    this.$children.forEach(function (child) {
        var name = child.$options.name;

        if (name === componentName) {
            child.$emit.apply(child, [eventName].concat(params));
        } else {
            // todo 如果 params 是空数组，接收到的会是 undefined
            _broadcast.apply(child, [componentName, eventName].concat([params]));
        }
    });
}
var Emitter = {
    methods: {
        dispatch: function dispatch(componentName, eventName, params) {
            var parent = this.$parent || this.$root;
            var name = parent.$options.name;

            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent;

                if (parent) {
                    name = parent.$options.name;
                }
            }
            if (parent) {
                parent.$emit.apply(parent, [eventName].concat(params));
            }
        },
        broadcast: function broadcast(componentName, eventName, params) {
            _broadcast.call(this, componentName, eventName, params);
        }
    }
};

var prefixCls = "radio";
var TmVueRadioEx = { template: "<div v-if=\"group\" :class=\"radioClasses\"> <input type=\"radio\" :name=\"name\" :id=\"id\" :class=\"inputRadioClasses\" :checked=\"checked\" :disabled=\"disabled\" @change=\"change\"> <label :for=\"id\">{{label}}</label> </div> <div v-else :class=\"radioClasses\"> <input type=\"radio\" :name=\"name\" :id=\"id\" :class=\"inputRadioClasses\" :checked=\"checked\" :disabled=\"disabled\" @change=\"change\"> <label :for=\"id\">{{label}}</label> </div>",
  name: "TmVueRadioEx",
  props: {
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    name: {
      type: String,
      default: false
    },
    group: {
      type: Boolean,
      default: false
    },
    inline: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    },
    hover: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      index: 0,
      group: false,
      parent: findComponentUpward(this, "TmVueRadioGroup")
    };
  },

  computed: {
    id: function id() {
      return this.name + "-" + this.index;
    },
    radioClasses: function radioClasses() {
      var _ref;

      return [(_ref = {}, defineProperty(_ref, "" + prefixCls, !this.inline), defineProperty(_ref, prefixCls + "-inline", this.inline), defineProperty(_ref, "hover", this.hover), defineProperty(_ref, "disabled", this.disabled), _ref)];
    },
    inputRadioClasses: function inputRadioClasses() {
      var _ref2;

      return ["input-radio", (_ref2 = {}, defineProperty(_ref2, "disabled", this.disabled && !this.checked), defineProperty(_ref2, "checked", this.checked && !this.disabled), _ref2)];
    }
  },
  methods: {
    change: function change(event) {
      if (this.disabled) {
        return false;
      }

      var checked = event.target.checked;

      this.$emit("input", checked);

      if (this.group && this.label !== undefined) {
        this.parent.change({
          value: this.value,
          checked: checked
        });
      }
      if (!this.group) {
        this.$emit("on-change", this.value);
        this.dispatch("FormItem", "on-form-change", this.value);
      }
    }
  }
};

var prefixCls$1 = "vue-radio-group";

var TmVueRadioGroup = { template: "<div :class=\"classes\"> <slot></slot> </div>",
  name: "TmVueRadioGroup",
  mixins: [Emitter],
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    inline: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      currentValue: this.value,
      childrens: []
    };
  },

  computed: {
    classes: function classes() {
      var _ref;

      return ["" + prefixCls$1, (_ref = {}, defineProperty(_ref, prefixCls$1 + "-" + this.size, !!this.size), defineProperty(_ref, "ivu-radio-" + this.size, !!this.size), defineProperty(_ref, prefixCls$1 + "-" + this.type, !!this.type), defineProperty(_ref, prefixCls$1 + "-vertical", this.vertical), _ref)];
    }
  },
  mounted: function mounted() {
    this.updateValue();
  },

  methods: {
    updateValue: function updateValue() {
      var _this = this;

      var value = this.value;
      this.childrens = findComponentsDownward(this, "TmVueRadioEx");
      var index = 0;
      if (this.childrens) {
        this.childrens.forEach(function (child) {
          child.checked = value == child.value;
          child.group = true;
          child.name = _this.name;
          child.index = index++;
          child.inline = _this.inline;
          child.disabled = _this.disabled;
        });
      }
    },
    change: function change(data) {
      this.value = data.value;
      this.updateValue();
      this.$emit("input", data.value);
      this.$emit("on-change", data.value);
      this.dispatch("FormItem", "on-form-change", data.value);
    }
  },
  watch: {
    value: function value() {
      this.updateValue();
    },
    disabled: function disabled() {
      this.updateValue();
    }
  }
};

TmVueRadioEx.install = function (V, options) {
    V.component(TmVueRadioEx.name, TmVueRadioEx);
};
TmVueRadioGroup.install = function (V, options) {
    V.component(TmVueRadioGroup.name, TmVueRadioGroup);
};

var TmVueCheckbox = { template: "<div class=\"checkbox\" :class=\"{'disabled':isDisabled}\"> <input type=\"checkbox\" :value=\"value\" @change=\"handleChange\" v-model=\"checked\" class=\"input-checkbox\" :disabled=\"isDisabled\" :class=\"{'checked':isChecked,'disabled':disabledClass}\"> <label @click=\"lableClick\"><slot></slot></label> </div>",
    name: 'TmVueCheckbox',
    model: {
        prop: "checked",
        event: "change"
    },
    props: {
        checked: {
            type: [Boolean, Array],
            default: ""
        },
        value: {
            type: [String, Number],
            default: ""
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        isDisabled: function isDisabled() {
            return this.disabled === true ? true : false; //default disabled attribute is false.
        },
        disabledClass: function disabledClass() {
            return this.isDisabled && (this.isBoolean ? !this.checked : this.checked.indexOf(this.value) == -1); //only add disabled class for the unchecked radio to stop hover color change.
        },
        isChecked: function isChecked() {
            if (this.isBoolean) {
                return this.checked;
            } else {
                return this.checked.indexOf(this.value) != -1;
            }
        },
        isBoolean: function isBoolean() {
            return typeof this.checked === 'boolean';
        }
    },
    methods: {
        handleChange: function handleChange() {
            this.$nextTick(function () {
                this.$emit('change', this.checked);
            });
        },
        lableClick: function lableClick() {
            if (this.isDisabled) return;
            if (this.isBoolean) {
                this.checked = !this.checked;
            } else {
                var index = this.checked.indexOf(this.value);
                if (index == -1) {
                    this.checked.push(this.value);
                } else {
                    this.checked.splice(index, 1);
                }
            }
            this.handleChange();
        }
    }
};

TmVueCheckbox.install = function (V, options) {
    V.component(TmVueCheckbox.name, TmVueCheckbox);
};

var TmVueCheckallCheckbox$1 = { template: "<div class=\"checkbox\" :class=\"{'disabled':isDisabled}\"> <input type=\"checkbox\" @change=\"handleChange\" v-model=\"checked\" class=\"input-checkbox\" :disabled=\"isDisabled\" :class=\"{'checked':checked,'disabled':disabledClass,'checkbox-partical':this.indeterminate}\"> <label @click=\"labelClick\"><slot></slot></label> </div>",
    name: 'TmVueCheckallCheckbox',
    props: {
        checked: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        indeterminate: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        isDisabled: function isDisabled() {
            return this.disabled === true ? true : false; //default disabled attribute is false.
        },
        disabledClass: function disabledClass() {
            return this.isDisabled && !this.checked; //only add disabled class for the unchecked radio to stop hover color change.
        }
    },
    methods: {
        handleChange: function handleChange() {
            this.$nextTick(function () {
                this.$emit('change', this.checked);
            });
        },

        labelClick: function labelClick() {
            if (this.isDisabled) return;
            this.checked = !this.checked;
            this.handleChange();
        }
    }
};

TmVueCheckallCheckbox$1.install = function (V, options) {
    V.component(TmVueCheckallCheckbox$1.name, TmVueCheckallCheckbox$1);
};

var TmVueDropdown = { template: "<div class=\"btn-group\" :style=\"widthStyle\"> <button type=\"button\" :title=\"selectedText\" class=\"form-control btn btn-border dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\" :disabled=\"isDisabled\" :class=\"widthClass\" :style=\"widthStyle\"> <span class=\"caret\"></span>{{selectedText}}</button> <ul class=\"dropdown-menu\" :class=\"widthClass\" :style=\"widthStyle\"> <template v-for=\"item in list\"> <li @click=\"handleChange(item.value)\"><a href=\"javascript:void(0)\">{{item.display}}</a></li> </template> </ul> </div>",
    name: 'TmVueDropdown',
    props: {
        value: {
            type: [String, Number],
            default: 0
        },
        list: {
            type: Array,
            default: []
        },
        disabled: {
            type: Boolean,
            default: false
        },
        width: {
            type: String,
            default: 'default'
        }
    },
    data: function data() {
        var class_list = { "mini": "input-width-mini", "sm": "input-width-sm", "default": "input-width-default", "md": "input-width-md", "lg": "input-width-lg" };
        return {
            widthStyle: { width: class_list[this.width] ? "" : this.width }
        };
    },
    computed: {
        isDisabled: function isDisabled() {
            return this.disabled === true ? true : false; //default disabled attribute is false
        },
        selectedText: function selectedText() {
            if (this.list.length == 0) return '';
            var index = 0;
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i].value == this.value) {
                    index = i;
                }
            }
            return this.list[index].display;
        },
        widthClass: function widthClass() {
            var class_list = { "mini": "input-width-mini", "sm": "input-width-sm", "default": "input-width-default", "md": "input-width-md", "lg": "input-width-lg" };

            return class_list[this.width] || "";
        }

    },
    methods: {
        handleChange: function handleChange(value) {
            this.value = value;
            this.$nextTick(function () {
                this.$emit('input', this.value);
                this.$emit('change');
            });
        }
    }
};

TmVueDropdown.install = function (V, options) {
    V.component(TmVueDropdown.name, TmVueDropdown);
};

var TmVueSearchButton$1 = { template: "<div class=\"input-group has-clear\" style=\"width:100%\"> <div class=\"input-icon-group\" style=\"width:100%\"> <input type=\"text\" class=\"form-control vue-search\" :placeholder=\"placeholder\" style=\"width:100%\" v-model=\"textVal\" v-on:input=\"updated\" v-on:keyup.enter=\"changed\"> <span class=\"form-control-clear icon icon-cancel hidden\"></span> </div> <span class=\"input-group-btn\"> <button type=\"button\" class=\"btn btn-default btn-icon-only\" v-on:click=\"changed\"><span class=\"fa fa-search\"></span></button> </span> </div>",
  name: "TmVueSearchButton",
  props: {
    placeholder: {
      type: String,
      default: null
    }
  },
  data: function data() {
    return {
      textVal: ""
    };
  },
  methods: {
    changed: function changed(e) {
      this.$emit("changed", this.textVal);
    },
    updated: function updated() {
      this.$emit("updated", this.textVal);
    }
  },

  mounted: function mounted() {
    var self = this;
    /**
             * todo
             * should bind custom element
             */
    $('.has-clear input[type="text"]').on("input propertychange", function () {
      var $this = $(this);
      var visible = Boolean($this.val());
      $this.siblings(".form-control-clear").toggleClass("hidden", !visible);
    }).trigger("propertychange");

    $(".form-control-clear").click(function () {
      self.textVal = "";
      self.updated();
      $(this).siblings('input[type="text"]').val("").trigger("propertychange").focus();
    });
  }
};

TmVueSearchButton$1.install = function (V, options) {
    V.component(TmVueSearchButton$1.name, TmVueSearchButton$1);
};

var Icon$1 = { template: "<span :class=\"classes\" :style=\"styles\"></span>",
  name: "Icon",
  props: {
    type: String,
    size: [Number, String],
    color: String
  },
  computed: {
    classes: function classes() {
      return "" + this.type;
    },
    styles: function styles() {
      var style = {};

      if (this.size) {
        style["font-size"] = this.size + "px";
      }

      if (this.color) {
        style.color = this.color;
      }

      return style;
    }
  }
};

var prefixCls$2 = "btn";

var TmVueButton$1 = { template: "<button :type=\"htmlType\" :class=\"classes\" :disabled=\"disabled\" @click=\"handleClick\"> <Icon type=\"loader loader-small\" v-if=\"loading\"></Icon> <Icon :type=\"icon\" v-if=\"icon && !loading\"></Icon> <span v-if=\"showSlot\" ref=\"slot\"><slot></slot></span> </button>",
  name: "TmVueButton",
  components: { Icon: Icon$1 },
  props: {
    type: {
      validator: function validator(value) {
        return oneOf(value, ["primary", "danger", "border", "link", "default"]);
      }
    },
    shape: {
      validator: function validator(value) {
        return oneOf(value, ["circle", "circle-outline"]);
      }
    },
    size: {
      validator: function validator(value) {
        return oneOf(value, ["xs", "sm", "lg", "block"]);
      }
    },
    loading: Boolean,
    disabled: Boolean,
    htmlType: {
      default: "button",
      validator: function validator(value) {
        return oneOf(value, ["button", "submit", "reset"]);
      }
    },
    icon: String,
    full: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      showSlot: true
    };
  },

  computed: {
    classes: function classes() {
      var _ref;

      return ["" + prefixCls$2, (_ref = {}, defineProperty(_ref, prefixCls$2 + "-" + this.type, !!this.type), defineProperty(_ref, prefixCls$2 + "-" + this.size, !!this.size), defineProperty(_ref, prefixCls$2 + "-block", !!this.full), defineProperty(_ref, prefixCls$2 + "-icon-only", !this.showSlot && (!!this.icon || this.loading)), _ref)];
    }
  },
  methods: {
    handleClick: function handleClick(event) {
      this.$emit("click", event);
    }
  },
  mounted: function mounted() {
    this.showSlot = this.$slots.default !== undefined;
  }
};

TmVueButton$1.install = function (V, options) {
    V.component(TmVueButton$1.name, TmVueButton$1);
};

var prefixCls$4 = "uwc";

var Breadcrumb = { template: "<div :class=\"classes\"> <ol class=\"breadcrumb\"> <slot></slot> </ol> </div>",
  name: "TmVueBreadcrumb",
  props: {
    separator: {
      type: String,
      default: "/"
    }
  },
  computed: {
    classes: function classes() {
      return "" + prefixCls$4;
    }
  },
  mounted: function mounted() {
    this.updateChildren();
  },
  updated: function updated() {
    var _this = this;

    this.$nextTick(function () {
      _this.updateChildren();
    });
  },

  methods: {
    updateChildren: function updateChildren() {
      var _this2 = this;

      this.$children.forEach(function (child) {
        child.separator = _this2.separator;
      });
    }
  },
  watch: {
    separator: function separator() {
      this.updateChildren();
    }
  }
};

var prefixCls$5 = "tm-vue-breadcrumb-item";

var BreadcrumbItem = { template: "<li v-if=\"to\"> <a :href=\"to\" :class=\"linkClasses\" @click=\"handleClick\"> <slot></slot> </a> </li> <li v-else class=\"active\"> <slot></slot> </li>",
  name: "TmVueBreadcrumbItem",
  props: {
    href: {
      type: [Object, String]
    },
    to: {
      type: [Object, String]
    },
    replace: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    linkClasses: function linkClasses() {
      return prefixCls$5 + "-link";
    }
  },
  methods: {
    handleClick: function handleClick() {
      var isRoute = this.$router;
      if (isRoute) {
        this.replace ? this.$router.replace(this.to) : this.$router.push(this.to);
      } else {
        window.location.href = this.to;
      }
    }
  }
};

Breadcrumb.Item = BreadcrumbItem;

var TmVueFilterTag$1 = { template: "<div class=\"Tokenize tokenize\" :class=\"{disabled:disabled}\" tabindex=\"0\" @click=\"showInput\" :style=\"{width:width_display}\"> <span v-show=\"value.length > 0\" @click=\"removeAll\" class=\"icon icon-cancel\"></span> <ul class=\"TokensContainer tag-editor\" tabindex=\"0\"> <li class=\"Placeholder placeholder\" v-show=\"showPlaceholder\">{{placeholder}}</li> <li v-for=\"item in value\" class=\"Token\"> <a class=\"Close\" style=\"display:inline-block\"> <span class=\"icon icon-cancel\" tabindex=\"0\" @click.stop=\"removeItem(item)\"></span> </a> <span>{{selected_name(item)}}</span> </li> <li class=\"TokenSearch\"> <input v-focus=\"focus\" @keydown.down=\"selectNextItem\" @keyup.enter=\"addSelectItem\" @keydown.up=\"selectPreviousItem\" :disabled=\"disabled\" v-model=\"text_value\" @focusout=\"hideInput($event)\" size=\"8\"> </li> </ul> <ul tabindex=\"0\" class=\"Dropdown dropdown-menu\" :style=\"{display:dropdown_display,width:width_display}\"> <li tabindex=\"0\" data=\"for-select\" v-show=\"filterList.length>0\" :class=\"{Hover:item.hover}\" @mouseover=\"setHoverItemById(item.id)\" @mouseout=\"clearAllHover\" v-for=\"item in filterList\" @click.stop=\"addItem(item.id)\">{{item.name}}</li> <li tabindex=\"0\" class=\"no-matches\" v-show=\"filterList.length==0\">{{no_result}}</li> </ul> </div>",
  name: 'TmVueFilterTag',
  props: {
    value: {
      type: [Array],
      default: 0
    },
    initial_list: {
      type: Array,
      default: []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    no_result: {
      type: String,
      default: ""
    }
  },
  data: function data() {
    return {
      focus: false,
      text_value: '',
      current_hover_id: '',
      new_init_list: _.map(this.initial_list, function (item) {
        return _.extend({}, item, { hover: false });
      })
    };
  },
  computed: {
    dropdown_display: function dropdown_display() {
      return this.focus ? 'block' : 'none';
    },
    width_display: function width_display() {
      return this.width ? this.width + 'px' : '100%';
    },
    showPlaceholder: function showPlaceholder() {
      return this.value.length == 0 && this.text_value.length == 0;
    },
    filterList: function filterList() {
      var _this = this;
      var tmp = this.new_init_list.filter(function (item) {
        if (_this.value.indexOf(item.id) !== -1) {
          return false;
        } else {
          return true;
        }
      }).filter(function (item) {
        if (_.startsWith(item.name.toLowerCase(), _this.text_value.toLowerCase()) === false) return false;else return true;
      }).sort(function (a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      return tmp;
    }
  },
  methods: {
    selected_name: function selected_name(id) {
      var item = _.find(this.new_init_list, function (item) {
        return item.id == id;
      });
      if (item) return item.name;
    },
    addItem: function addItem(id) {
      if (this.disabled) return;
      this.text_value = "";
      this.value.push(id);
    },
    removeAll: function removeAll() {
      var _this = this;
      if (this.disabled) return;
      this.text_value = "";
      _.each(this.value, function (value) {
        _this.removeItem(value);
      });
    },
    removeItem: function removeItem(id) {
      if (this.disabled) return;
      this.text_value = "";
      var index = _.findIndex(this.value, function (value) {
        return value == id;
      });
      this.value.splice(index, 1);
    },
    selectNextItem: function selectNextItem() {
      if (this.filterList.length > 0) {
        var index = this.getHoverItemIndex();
        this.clearAllHover();
        if (index == this.filterList.length - 1) {
          index = 0;
        } else {
          index = index + 1;
        }
        this.setHoverItemById(this.filterList[index].id);
      }
    },
    selectPreviousItem: function selectPreviousItem() {
      var index = this.getHoverItemIndex();
      this.clearAllHover();
      if (index == 0 || index == -1) {
        index = this.filterList.length - 1;
      } else {
        index = index - 1;
      }
      this.setHoverItemById(this.filterList[index].id);
    },
    setHoverItemById: function setHoverItemById(id) {
      var index = _.findIndex(this.new_init_list, function (item) {
        return item.id == id;
      });
      var tmp_object = _.clone(this.new_init_list[index]);
      tmp_object.hover = true;
      this.new_init_list.splice(index, 1, tmp_object);
    },
    getHoverItemIndex: function getHoverItemIndex() {
      return _.findIndex(this.filterList, 'hover');
    },
    addSelectItem: function addSelectItem() {
      if (this.filterList.length == 0) {
        this.text_value = '';
        this.clearAllHover();
        this.setHoverItemById(this.filterList[0].id);
        return;
      }
      var index = this.getHoverItemIndex();
      if (index == -1) return;
      var id = this.filterList[index].id;
      this.addItem(id);
      this.clearAllHover();
      if (this.filterList.length > 0) {
        this.setHoverItemById(this.filterList[0].id);
      }
    },
    showInput: function showInput() {
      if (this.disabled) return;
      this.focus = true;
      //clear the focus before show init list.
      this.clearAllHover();
      //hover on the first item when show the init list.
      if (this.filterList.length > 0) {
        this.setHoverItemById(this.filterList[0].id);
      }
    },
    hideInput: function hideInput(e) {
      if (this.disabled) return;
      if (e.relatedTarget == this.$el.getElementsByClassName("TokensContainer")[0] || e.relatedTarget == this.$el.getElementsByClassName("Dropdown") || e.relatedTarget && e.relatedTarget.getAttribute("data") == "for-select") {
        var _this = this;
        setTimeout(function () {
          _this.$el.getElementsByTagName("input")[0].focus();
        }, 10);
        return;
      } else {
        this.focus = false;
      }
    },
    clearAllHover: function clearAllHover() {
      this.new_init_list = _.map(this.new_init_list, function (item) {
        item.hover = false;return item;
      });
    }
  },
  directives: {
    focus: {
      componentUpdated: function componentUpdated(el, value) {
        if (value.value) {
          el.focus();
        }
      }
    }
  },
  watch: {
    value: function value() {
      this.$emit('input', this.value);
    }
  }
};

TmVueFilterTag$1.install = function (V, options) {
    V.component(TmVueFilterTag$1.name, TmVueFilterTag$1);
};

var TmVueStepProcess$1 = { template: "<div class=\"process\"> <div class=\"step\"> <div v-for=\"(item,index) in processes\" class=\"step_item\"> <div class=\"step_icon\" :class=\"icon(index)\"> <div class=\"circle\"> <div class=\"number\">{{item.step}}</div> <div class=\"text\"> {{item.action}} </div> </div> </div> <div :class=\"bar(index)\" class=\"bar\" v-show=\"index != processes.length - 1\"></div> </div> </div> <div class=\"description\"> {{this.processes[this.current-1].description}} </div> <div class=\"percent\"> <span class=\"loader\"></span><span class=\"percent_number\">{{percent}}%</span> </div> </div>",
    name: 'TmVueStepProcess',
    props: {
        processes: {
            type: Array,
            default: []
        },
        percent: { //total percent.
            type: Number,
            default: 0
        },
        current: { //current step
            type: Number,
            default: 1
        }
    },
    methods: {
        bar: function bar(index) {
            if (index < this.current - 1) {
                var disabled = "";
            } else {
                var disabled = "disabled";
            }
            return "bar-" + this.processes.length + "-length " + disabled;
        },
        icon: function icon(index) {
            if (index <= this.current - 1) {
                return "";
            } else {
                return "disabled";
            }
        },
        step: function step() {
            return "step-" + this.processes.length;
        }
    }

};

TmVueStepProcess$1.install = function (V, options) {
    V.component(TmVueStepProcess$1.name, TmVueStepProcess$1);
};

// Thanks to
// https://github.com/andreypopp/react-textarea-autosize/
// https://github.com/ElemeFE/element/blob/master/packages/input/src/calcTextareaHeight.js

var hiddenTextarea = void 0;

var HIDDEN_STYLE = '\n    height:0 !important;\n    min-height:0 !important;\n    max-height:none !important;\n    visibility:hidden !important;\n    overflow:hidden !important;\n    position:absolute !important;\n    z-index:-1000 !important;\n    top:0 !important;\n    right:0 !important\n';

var CONTEXT_STYLE = ['letter-spacing', 'line-height', 'padding-top', 'padding-bottom', 'font-family', 'font-weight', 'font-size', 'text-rendering', 'text-transform', 'width', 'text-indent', 'padding-left', 'padding-right', 'border-width', 'box-sizing'];

function calculateNodeStyling(node) {
    var style = window.getComputedStyle(node);

    var boxSizing = style.getPropertyValue('box-sizing');

    var paddingSize = parseFloat(style.getPropertyValue('padding-bottom')) + parseFloat(style.getPropertyValue('padding-top'));

    var borderSize = parseFloat(style.getPropertyValue('border-bottom-width')) + parseFloat(style.getPropertyValue('border-top-width'));

    var contextStyle = CONTEXT_STYLE.map(function (name) {
        return name + ':' + style.getPropertyValue(name);
    }).join(';');

    return { contextStyle: contextStyle, paddingSize: paddingSize, borderSize: borderSize, boxSizing: boxSizing };
}

function calcTextareaHeight(targetNode) {
    var minRows = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var maxRows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    if (!hiddenTextarea) {
        hiddenTextarea = document.createElement('textarea');
        document.body.appendChild(hiddenTextarea);
    }

    var _calculateNodeStyling = calculateNodeStyling(targetNode),
        paddingSize = _calculateNodeStyling.paddingSize,
        borderSize = _calculateNodeStyling.borderSize,
        boxSizing = _calculateNodeStyling.boxSizing,
        contextStyle = _calculateNodeStyling.contextStyle;

    hiddenTextarea.setAttribute('style', contextStyle + ';' + HIDDEN_STYLE);
    hiddenTextarea.value = targetNode.value || targetNode.placeholder || '';

    var height = hiddenTextarea.scrollHeight;
    var minHeight = -Infinity;
    var maxHeight = Infinity;

    if (boxSizing === 'border-box') {
        height = height + borderSize;
    } else if (boxSizing === 'content-box') {
        height = height - paddingSize;
    }

    hiddenTextarea.value = '';
    var singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;

    if (minRows !== null) {
        minHeight = singleRowHeight * minRows;
        if (boxSizing === 'border-box') {
            minHeight = minHeight + paddingSize + borderSize;
        }
        height = Math.max(minHeight, height);
    }
    if (maxRows !== null) {
        maxHeight = singleRowHeight * maxRows;
        if (boxSizing === 'border-box') {
            maxHeight = maxHeight + paddingSize + borderSize;
        }
        height = Math.min(maxHeight, height);
    }

    return {
        height: height + 'px',
        minHeight: minHeight + 'px',
        maxHeight: maxHeight + 'px'
    };
}

var prefixCls$6 = 'ivu-input';

var TmVueInput$1 = { template: "<div :class=\"wrapClasses\"> <template v-if=\"type !== 'textarea'\"> <div :class=\"[prefixCls + '-group-prepend']\" v-if=\"prepend\" v-show=\"slotReady\"><slot name=\"prepend\"></slot></div> <i class=\"ivu-icon\" :class=\"['ivu-icon-' + icon, prefixCls + '-icon', prefixCls + '-icon-normal']\" v-if=\"icon\" @click=\"handleIconClick\"></i> <transition name=\"fade\"> <i class=\"ivu-icon ivu-icon-load-c ivu-load-loop\" :class=\"[prefixCls + '-icon', prefixCls + '-icon-validate']\" v-if=\"!icon\"></i> </transition> <input :id=\"elementId\" :autocomplete=\"autocomplete\" :spellcheck=\"spellcheck\" ref=\"input\" :type=\"type\" :class=\"inputClasses\" :placeholder=\"placeholder\" :disabled=\"disabled\" :maxlength=\"maxlength\" :readonly=\"readonly\" :name=\"name\" :value=\"currentValue\" :number=\"number\" :autofocus=\"autofocus\" @keyup.enter=\"handleEnter\" @keyup=\"handleKeyup\" @keypress=\"handleKeypress\" @keydown=\"handleKeydown\" @focus=\"handleFocus\" @blur=\"handleBlur\" @input=\"handleInput\" @change=\"handleChange\"> <div :class=\"[prefixCls + '-group-append']\" v-if=\"append\" v-show=\"slotReady\"><slot name=\"append\"></slot></div> </template> <textarea v-else :id=\"elementId\" :autocomplete=\"autocomplete\" :spellcheck=\"spellcheck\" ref=\"textarea\" :class=\"textareaClasses\" :style=\"textareaStyles\" :placeholder=\"placeholder\" :disabled=\"disabled\" :rows=\"rows\" :maxlength=\"maxlength\" :readonly=\"readonly\" :name=\"name\" :value=\"currentValue\" :autofocus=\"autofocus\" @keyup.enter=\"handleEnter\" @keyup=\"handleKeyup\" @keypress=\"handleKeypress\" @keydown=\"handleKeydown\" @focus=\"handleFocus\" @blur=\"handleBlur\" @input=\"handleInput\">\n    </textarea> </div>",
    name: 'Input',
    mixins: [Emitter],
    props: {
        type: {
            validator: function validator(value) {
                return oneOf(value, ['text', 'textarea', 'password', 'url', 'email', 'date']);
            },

            default: 'text'
        },
        value: {
            type: [String, Number],
            default: ''
        },
        size: {
            validator: function validator(value) {
                return oneOf(value, ['small', 'large', 'default']);
            }
        },
        placeholder: {
            type: String,
            default: ''
        },
        maxlength: {
            type: Number
        },
        disabled: {
            type: Boolean,
            default: false
        },
        icon: String,
        autosize: {
            type: [Boolean, Object],
            default: false
        },
        rows: {
            type: Number,
            default: 2
        },
        readonly: {
            type: Boolean,
            default: false
        },
        name: {
            type: String
        },
        number: {
            type: Boolean,
            default: false
        },
        autofocus: {
            type: Boolean,
            default: false
        },
        spellcheck: {
            type: Boolean,
            default: false
        },
        autocomplete: {
            validator: function validator(value) {
                return oneOf(value, ['on', 'off']);
            },

            default: 'off'
        },
        elementId: {
            type: String
        }
    },
    data: function data() {
        return {
            currentValue: this.value,
            prefixCls: prefixCls$6,
            prepend: true,
            append: true,
            slotReady: false,
            textareaStyles: {}
        };
    },

    computed: {
        wrapClasses: function wrapClasses() {
            var _ref;

            return [prefixCls$6 + '-wrapper', (_ref = {}, defineProperty(_ref, prefixCls$6 + '-wrapper-' + this.size, !!this.size), defineProperty(_ref, prefixCls$6 + '-type', this.type), defineProperty(_ref, prefixCls$6 + '-group', this.prepend || this.append), defineProperty(_ref, prefixCls$6 + '-group-' + this.size, (this.prepend || this.append) && !!this.size), defineProperty(_ref, prefixCls$6 + '-group-with-prepend', this.prepend), defineProperty(_ref, prefixCls$6 + '-group-with-append', this.append), defineProperty(_ref, prefixCls$6 + '-hide-icon', this.append), _ref)];
        },
        inputClasses: function inputClasses() {
            var _ref2;

            return ['' + prefixCls$6, (_ref2 = {}, defineProperty(_ref2, prefixCls$6 + '-' + this.size, !!this.size), defineProperty(_ref2, prefixCls$6 + '-disabled', this.disabled), _ref2)];
        },
        textareaClasses: function textareaClasses() {
            return ['' + prefixCls$6, defineProperty({}, prefixCls$6 + '-disabled', this.disabled)];
        }
    },
    methods: {
        handleEnter: function handleEnter(event) {
            this.$emit('on-enter', event);
        },
        handleKeydown: function handleKeydown(event) {
            this.$emit('on-keydown', event);
        },
        handleKeypress: function handleKeypress(event) {
            this.$emit('on-keypress', event);
        },
        handleKeyup: function handleKeyup(event) {
            this.$emit('on-keyup', event);
        },
        handleIconClick: function handleIconClick(event) {
            this.$emit('on-click', event);
        },
        handleFocus: function handleFocus(event) {
            this.$emit('on-focus', event);
        },
        handleBlur: function handleBlur(event) {
            this.$emit('on-blur', event);
            if (!findComponentUpward(this, ['DatePicker', 'TimePicker', 'Cascader', 'Search'])) {
                this.dispatch('FormItem', 'on-form-blur', this.currentValue);
            }
        },
        handleInput: function handleInput(event) {
            var value = event.target.value;
            if (this.number) value = Number.isNaN(Number(value)) ? value : Number(value);
            this.$emit('input', value);
            this.setCurrentValue(value);
            this.$emit('on-change', event);
        },
        handleChange: function handleChange(event) {
            this.$emit('on-input-change', event);
        },
        setCurrentValue: function setCurrentValue(value) {
            var _this = this;

            if (value === this.currentValue) return;
            this.$nextTick(function () {
                _this.resizeTextarea();
            });
            this.currentValue = value;
            if (!findComponentUpward(this, ['DatePicker', 'TimePicker', 'Cascader', 'Search'])) {
                this.dispatch('FormItem', 'on-form-change', value);
            }
        },
        resizeTextarea: function resizeTextarea() {
            var autosize = this.autosize;
            if (!autosize || this.type !== 'textarea') {
                return false;
            }

            var minRows = autosize.minRows;
            var maxRows = autosize.maxRows;

            this.textareaStyles = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
        },
        focus: function focus() {
            if (this.type === 'textarea') {
                this.$refs.textarea.focus();
            } else {
                this.$refs.input.focus();
            }
        },
        blur: function blur() {
            if (this.type === 'textarea') {
                this.$refs.textarea.blur();
            } else {
                this.$refs.input.blur();
            }
        }
    },
    watch: {
        value: function value(val) {
            this.setCurrentValue(val);
        }
    },
    mounted: function mounted() {
        if (this.type !== 'textarea') {
            this.prepend = this.$slots.prepend !== undefined;
            this.append = this.$slots.append !== undefined;
        } else {
            this.prepend = false;
            this.append = false;
        }
        this.slotReady = true;
        this.resizeTextarea();
    }
};

TmVueInput$1.install = function (V, options) {
    V.component(TmVueInput$1.name, TmVueInput$1);
};

var prefixCls$7 = "badge";
var TmVueBadge$1 = { template: "<a v-if=\"href\" :class=\"classes\" :href=\"href\" target=\"_self\"> <slot></slot> </a> <span v-else :class=\"classes\" ref=\"badge\"> <slot></slot> </span>",
  name: "Badge",
  props: {
    href: {
      type: [Object, String]
    },
    variant: {
      default: "green",
      validator: function validator(value) {
        return oneOf(value, ["light-gray", "blue", "green", "cyan", "orange", "red", "yellow", "dark"]);
      }
    }
  },
  computed: {
    classes: function classes() {
      return ["" + prefixCls$7, prefixCls$7 + "-" + this.variant];
    }
  }
};

TmVueBadge$1.install = function (V, options) {
    V.component(TmVueBadge$1.name, TmVueBadge$1);
};

var prefixCls$8 = "label";
var TmVueLabel$1 = { template: "<a v-if=\"href\" :class=\"classes\" :href=\"href\" target=\"_self\"> <slot></slot> </a> <span v-else :class=\"classes\" ref=\"label\"> <slot></slot> </span>",
  name: "Label",
  props: {
    href: {
      type: [Object, String]
    },
    variant: {
      default: "blue",
      validator: function validator(value) {
        return oneOf(value, ["blue", "green", "cyan", "orange", "red", "indigo", "yellow", "light-gray", "gray", "dark"]);
      }
    }
  },
  computed: {
    classes: function classes() {
      return ["" + prefixCls$8, prefixCls$8 + "-" + this.variant];
    }
  }
};

TmVueLabel$1.install = function (V, options) {
    V.component(TmVueLabel$1.name, TmVueLabel$1);
};

var prefixCls$9 = "modal";
var TmVueModal$1 = { template: "<div> <div ref=\"modal\" :class=\"classes\" @keyup.esc=\"close()\" tabindex=\"-1\" aria-hidden=\"true\"> <div class=\"modal-dialog\" :class=\"modalClasses\" role=\"document\"> <div class=\"modal-content\"> <div v-if=\"needHeader\" class=\"modal-header\"> <slot name=\"header\"> <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\" @click=\"close\"> <span aria-hidden=\"true\" class=\"icon icon-modal-close\"> </span> </button> </slot> <h3 class=\"modal-title\"> <slot name=\"title\"> {{title}} </slot> </h3> </div> <div class=\"modal-body\"> <slot></slot> </div> <div v-if=\"needFooter\" class=\"modal-footer\"> <slot name=\"footer\"> <button type=\"button\" class=\"btn btn-primary\" @click=\"ok\">{{okText}}</button> <button type=\"button\" class=\"btn btn-default\" @click=\"cancel\">{{cancelText}}</button> </slot> </div> </div> </div> </div> <div v-if=\"isShow\" class=\"modal-backdrop fade in\"></div> </div>",
  name: "TmVueModal",
  props: {
    opened: {
      type: Function,
      default: function _default() {}
    },
    closed: {
      type: Function,
      default: function _default() {}
    },
    needHeader: {
      type: Boolean,
      default: true
    },
    needFooter: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: "Modal"
    },
    type: {
      default: "md",
      validator: function validator(value) {
        return oneOf(value, ["xs", "sm", "md", "lg"]);
      }
    },
    okText: {
      type: String,
      default: "OK"
    },
    cancelText: {
      type: String,
      default: "Cancel"
    }
  },
  data: function data() {
    return {
      isOpen: false,
      isShow: false,
      isOk: false,
      lastKnownBodyStyle: {
        overflow: "auto"
      }
    };
  },

  computed: {
    classes: function classes() {
      return ["" + prefixCls$9, {
        in: this.isOpen,
        show: this.isShow
      }];
    },
    modalClasses: function modalClasses() {
      return "modal-" + this.type;
    }
  },
  methods: {
    open: function open() {
      this.isOk = false;
      this.isShow = true;
      this.$nextTick(function () {
        this.isOpen = true;
        this.$refs.modal.focus();
        this.lastKnownBodyStyle.overflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        this.opened();
      });
    },
    close: function close() {
      this.isOpen = false;
      this.$nextTick(function () {
        var _this = this;

        setTimeout(function () {
          _this.isShow = false;
          document.body.style.overflow = _this.lastKnownBodyStyle.overflow;
          _this.closed();
        }, 0);
      });
    },
    ok: function ok() {
      this.isOk = true;
      this.close();
    },
    cancel: function cancel() {
      this.isOk = false;
      this.close();
    }
  }
};

TmVueModal$1.install = function (V, options) {
    V.component(TmVueModal$1.name, TmVueModal$1);
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};



function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var autosize = createCommonjsModule(function (module, exports) {
	/*!
 	autosize 4.0.2
 	license: MIT
 	http://www.jacklmoore.com/autosize
 */
	(function (global, factory) {
		if (typeof undefined === "function" && undefined.amd) {
			undefined(['module', 'exports'], factory);
		} else {
			factory(module, exports);
		}
	})(commonjsGlobal, function (module, exports) {
		var map = typeof Map === "function" ? new Map() : function () {
			var keys = [];
			var values = [];

			return {
				has: function has(key) {
					return keys.indexOf(key) > -1;
				},
				get: function get(key) {
					return values[keys.indexOf(key)];
				},
				set: function set(key, value) {
					if (keys.indexOf(key) === -1) {
						keys.push(key);
						values.push(value);
					}
				},
				delete: function _delete(key) {
					var index = keys.indexOf(key);
					if (index > -1) {
						keys.splice(index, 1);
						values.splice(index, 1);
					}
				}
			};
		}();

		var createEvent = function createEvent(name) {
			return new Event(name, { bubbles: true });
		};
		try {
			new Event('test');
		} catch (e) {
			// IE does not support `new Event()`
			createEvent = function createEvent(name) {
				var evt = document.createEvent('Event');
				evt.initEvent(name, true, false);
				return evt;
			};
		}

		function assign(ta) {
			if (!ta || !ta.nodeName || ta.nodeName !== 'TEXTAREA' || map.has(ta)) return;

			var heightOffset = null;
			var clientWidth = null;
			var cachedHeight = null;

			function init() {
				var style = window.getComputedStyle(ta, null);

				if (style.resize === 'vertical') {
					ta.style.resize = 'none';
				} else if (style.resize === 'both') {
					ta.style.resize = 'horizontal';
				}

				if (style.boxSizing === 'content-box') {
					heightOffset = -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom));
				} else {
					heightOffset = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
				}
				// Fix when a textarea is not on document body and heightOffset is Not a Number
				if (isNaN(heightOffset)) {
					heightOffset = 0;
				}

				update();
			}

			function changeOverflow(value) {
				{
					// Chrome/Safari-specific fix:
					// When the textarea y-overflow is hidden, Chrome/Safari do not reflow the text to account for the space
					// made available by removing the scrollbar. The following forces the necessary text reflow.
					var width = ta.style.width;
					ta.style.width = '0px';
					// Force reflow:
					/* jshint ignore:start */
					ta.offsetWidth;
					/* jshint ignore:end */
					ta.style.width = width;
				}

				ta.style.overflowY = value;
			}

			function getParentOverflows(el) {
				var arr = [];

				while (el && el.parentNode && el.parentNode instanceof Element) {
					if (el.parentNode.scrollTop) {
						arr.push({
							node: el.parentNode,
							scrollTop: el.parentNode.scrollTop
						});
					}
					el = el.parentNode;
				}

				return arr;
			}

			function resize() {
				if (ta.scrollHeight === 0) {
					// If the scrollHeight is 0, then the element probably has display:none or is detached from the DOM.
					return;
				}

				var overflows = getParentOverflows(ta);
				var docTop = document.documentElement && document.documentElement.scrollTop; // Needed for Mobile IE (ticket #240)

				ta.style.height = '';
				ta.style.height = ta.scrollHeight + heightOffset + 'px';

				// used to check if an update is actually necessary on window.resize
				clientWidth = ta.clientWidth;

				// prevents scroll-position jumping
				overflows.forEach(function (el) {
					el.node.scrollTop = el.scrollTop;
				});

				if (docTop) {
					document.documentElement.scrollTop = docTop;
				}
			}

			function update() {
				resize();

				var styleHeight = Math.round(parseFloat(ta.style.height));
				var computed = window.getComputedStyle(ta, null);

				// Using offsetHeight as a replacement for computed.height in IE, because IE does not account use of border-box
				var actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(computed.height)) : ta.offsetHeight;

				// The actual height not matching the style height (set via the resize method) indicates that 
				// the max-height has been exceeded, in which case the overflow should be allowed.
				if (actualHeight < styleHeight) {
					if (computed.overflowY === 'hidden') {
						changeOverflow('scroll');
						resize();
						actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(window.getComputedStyle(ta, null).height)) : ta.offsetHeight;
					}
				} else {
					// Normally keep overflow set to hidden, to avoid flash of scrollbar as the textarea expands.
					if (computed.overflowY !== 'hidden') {
						changeOverflow('hidden');
						resize();
						actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(window.getComputedStyle(ta, null).height)) : ta.offsetHeight;
					}
				}

				if (cachedHeight !== actualHeight) {
					cachedHeight = actualHeight;
					var evt = createEvent('autosize:resized');
					try {
						ta.dispatchEvent(evt);
					} catch (err) {
						// Firefox will throw an error on dispatchEvent for a detached element
						// https://bugzilla.mozilla.org/show_bug.cgi?id=889376
					}
				}
			}

			var pageResize = function pageResize() {
				if (ta.clientWidth !== clientWidth) {
					update();
				}
			};

			var destroy = function (style) {
				window.removeEventListener('resize', pageResize, false);
				ta.removeEventListener('input', update, false);
				ta.removeEventListener('keyup', update, false);
				ta.removeEventListener('autosize:destroy', destroy, false);
				ta.removeEventListener('autosize:update', update, false);

				Object.keys(style).forEach(function (key) {
					ta.style[key] = style[key];
				});

				map.delete(ta);
			}.bind(ta, {
				height: ta.style.height,
				resize: ta.style.resize,
				overflowY: ta.style.overflowY,
				overflowX: ta.style.overflowX,
				wordWrap: ta.style.wordWrap
			});

			ta.addEventListener('autosize:destroy', destroy, false);

			// IE9 does not fire onpropertychange or oninput for deletions,
			// so binding to onkeyup to catch most of those events.
			// There is no way that I know of to detect something like 'cut' in IE9.
			if ('onpropertychange' in ta && 'oninput' in ta) {
				ta.addEventListener('keyup', update, false);
			}

			window.addEventListener('resize', pageResize, false);
			ta.addEventListener('input', update, false);
			ta.addEventListener('autosize:update', update, false);
			ta.style.overflowX = 'hidden';
			ta.style.wordWrap = 'break-word';

			map.set(ta, {
				destroy: destroy,
				update: update
			});

			init();
		}

		function destroy(ta) {
			var methods = map.get(ta);
			if (methods) {
				methods.destroy();
			}
		}

		function update(ta) {
			var methods = map.get(ta);
			if (methods) {
				methods.update();
			}
		}

		var autosize = null;

		// Do nothing in Node.js environment and IE8 (or lower)
		if (typeof window === 'undefined' || typeof window.getComputedStyle !== 'function') {
			autosize = function autosize(el) {
				return el;
			};
			autosize.destroy = function (el) {
				return el;
			};
			autosize.update = function (el) {
				return el;
			};
		} else {
			autosize = function autosize(el, options) {
				if (el) {
					Array.prototype.forEach.call(el.length ? el : [el], function (x) {
						return assign(x, options);
					});
				}
				return el;
			};
			autosize.destroy = function (el) {
				if (el) {
					Array.prototype.forEach.call(el.length ? el : [el], destroy);
				}
				return el;
			};
			autosize.update = function (el) {
				if (el) {
					Array.prototype.forEach.call(el.length ? el : [el], update);
				}
				return el;
			};
		}

		exports.default = autosize;
		module.exports = exports['default'];
	});
});

var TmVueAutosizeTextarea$1 = { template: "<textarea>{{value}}</textarea>",
  name: "TmVueAutosizeTextarea",
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  watch: {
    value: function value() {
      autosize.update(this.$el);
    }
  },
  updated: function updated() {
    autosize.update(this.$el);
  },
  mounted: function mounted() {
    autosize(this.$el);
  }
};

TmVueAutosizeTextarea$1.install = function (V, options) {
    V.component(TmVueAutosizeTextarea$1.name, TmVueAutosizeTextarea$1);
};

var TmVueGroupSelect$1 = { template: "<div class=\"ms-container uwc\"> <div class=\"ms-selectable\"> <p>{{left_title}}</p> <ul class=\"ms-list\"> <template v-for=\"(item_,index) in left\"> <template v-if=\"has_children(item_)\"> <li :title=\"item_.name\" @click=\"parent_toggle(item_,index)\" :class=\"disable_li\" class=\"parent\"><span class=\"tmicon\" :class=\"parent_class(item_)\"></span> {{item_.name}}</li> <template v-for=\"child in item_.children\"> <li :title=\"child.name\" v-show=\"show_child(item_)\" :class=\"disable_li\" class=\"child\" @click=\"left_click(child)\"> <span>{{child.name}}</span> </li> </template> </template> <template v-else> <li :title=\"item_.name\" :class=\"disable_li\" @click=\"left_click(item_)\"> <span>{{item_.name}}</span> </li> </template> </template> </ul> </div> <div class=\"exchange\">&nbsp;</div> <div class=\"ms-selection\"> <p>{{right_title}}</p> <ul class=\"ms-list\"> <template v-for=\"item_ in right\"> <li :title=\"item_.name\" :class=\"disable_li\" @click=\"right_click(item_)\"> <span>{{item_.name}}</span> </li> </template> </ul> </div> </div>",
    name: 'TmVueGroupSelect',
    props: {
        left_list: {
            type: Object,
            default: {}
        },
        left_title: {
            type: String,
            default: ""
        },
        right_list: {
            type: Array,
            default: []
        },
        right_title: {
            type: String,
            default: ""
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data: function data() {
        return {
            left: _.sortBy(this.left_list, function (item) {
                return item.name;
            }),
            right: this.right_list.sort(this.compare)
        };
    },
    computed: {
        disable_li: function disable_li() {
            return {
                "disabledLi": this.disabled
            };
        }
    },
    methods: {
        left_click: function left_click(object) {
            if (this.disabled) {
                return;
            }
            if (this.arr_find(this.right, object)) {
                this.$emit('item-exist', object);
                return false;
            }
            this.right = this.right.concat(object).sort(this.compare);
            this.$emit('change-selected', this.right);
        },
        right_click: function right_click(object) {
            if (this.disabled) {
                return;
            }
            this.right = this.right.filter(function (item) {
                return !(item.value == object.value);
            });
            this.$emit('change-selected', this.right);
        },
        compare: function compare(a, b) {
            if (a.name > b.name) {
                return 1;
            } else if (a.name == b.name) {
                return 0;
            } else {
                return -1;
            }
        },
        arr_find: function arr_find(arr, need) {
            var tmp = _.findIndex(arr, function (item) {
                return item.value == need.value;
            });
            return tmp !== -1;
        },
        has_children: function has_children(object) {
            return typeof object.children !== 'undefined';
        },
        parent_class: function parent_class(object) {
            if (object.expand) {
                return "tmicon-minus-square-o";
            } else {
                return "tmicon-add-square-o";
            }
        },
        parent_toggle: function parent_toggle(object, index) {
            this.left[index].expand = !this.left[index].expand;
        },
        show_child: function show_child(object) {
            return object.expand;
        }
    },
    watch: {
        left_list: {
            handler: function handler() {
                this.left = _.sortBy(this.left_list, function (item) {
                    return item.name;
                });
            },

            deep: true
        },
        right_list: {
            handler: function handler() {
                var tmp = _.map(this.right_list, _.clone);
                this.right = tmp.sort(this.compare);
            },

            deep: true
        }
    }
};

TmVueGroupSelect$1.install = function (V, options) {
    V.component(TmVueGroupSelect$1.name, TmVueGroupSelect$1);
};

var TmVueNotification$1 = { template: "<div class=\"alert fade in\" :class=\"class_type\" role=\"alert\"> <a href=\"#\" class=\"cancel\"><span @click.prevent=\"hide_alert\" class=\"icon icon-cancel\"></span></a> <span class=\"icon\" :class=\"icon_type\"></span> <slot></slot> </div>",
    name: 'TmVueNotification',
    props: {
        type: {
            type: String,
            default: "error"
        }
    },
    data: function data() {
        return {
            show_alert: false
        };
    },

    computed: {
        class_type: function class_type() {
            if (this.type == 'error') {
                return "alert-danger";
            } else if (this.type == "warning") {
                return "alert-warning";
            } else {
                return "alert-info";
            }
        },
        icon_type: function icon_type() {
            if (this.type == 'error') {
                return "icon-danger";
            } else if (this.type == "warning") {
                return "icon-warn";
            } else {
                return "icon-info";
            }
        }
    },
    methods: {
        hide_alert: function hide_alert() {
            this.$emit("hide-notification");
        }
    }
};

TmVueNotification$1.install = function (V, options) {
    V.component(TmVueNotification$1.name, TmVueNotification$1);
};

var jquery_fileupload = createCommonjsModule(function (module, exports) {
    /*
     * jQuery File Upload Plugin
     * https://github.com/blueimp/jQuery-File-Upload
     *
     * Copyright 2010, Sebastian Tschan
     * https://blueimp.net
     *
     * Licensed under the MIT license:
     * https://opensource.org/licenses/MIT
     */

    /* jshint nomen:false */
    /* global define, require, window, document, location, Blob, FormData */

    (function (factory) {
        if (typeof undefined === 'function' && undefined.amd) {
            // Register as an anonymous AMD module:
            undefined(['jquery', 'jquery-ui/ui/widget'], factory);
        } else {
            // Node/CommonJS:
            factory(require$$0);
        }
    })(function ($) {
        $.support.fileInput = !(new RegExp(
        // Handle devices which give false positives for the feature detection:
        '(Android (1\\.[0156]|2\\.[01]))' + '|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)' + '|(w(eb)?OSBrowser)|(webOS)' + '|(Kindle/(1\\.0|2\\.[05]|3\\.0))').test(window.navigator.userAgent) ||
        // Feature detection for all other devices:
        $('<input type="file"/>').prop('disabled'));

        // The FileReader API is not actually used, but works as feature detection,
        // as some Safari versions (5?) support XHR file uploads via the FormData API,
        // but not non-multipart XHR file uploads.
        // window.XMLHttpRequestUpload is not available on IE10, so we check for
        // window.ProgressEvent instead to detect XHR2 file upload capability:
        $.support.xhrFileUpload = !!(window.ProgressEvent && window.FileReader);
        $.support.xhrFormDataFileUpload = !!window.FormData;

        // Detect support for Blob slicing (required for chunked uploads):
        $.support.blobSlice = window.Blob && (Blob.prototype.slice || Blob.prototype.webkitSlice || Blob.prototype.mozSlice);

        // Helper function to create drag handlers for dragover/dragenter/dragleave:
        function getDragHandler(type) {
            var isDragOver = type === 'dragover';
            return function (e) {
                e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
                var dataTransfer = e.dataTransfer;
                if (dataTransfer && $.inArray('Files', dataTransfer.types) !== -1 && this._trigger(type, $.Event(type, { delegatedEvent: e })) !== false) {
                    e.preventDefault();
                    if (isDragOver) {
                        dataTransfer.dropEffect = 'copy';
                    }
                }
            };
        }

        // The fileupload widget listens for change events on file input fields defined
        // via fileInput setting and paste or drop events of the given dropZone.
        // In addition to the default jQuery Widget methods, the fileupload widget
        // exposes the "add" and "send" methods, to add or directly send files using
        // the fileupload API.
        // By default, files added via file input selection, paste, drag & drop or
        // "add" method are uploaded immediately, but it is possible to override
        // the "add" callback option to queue file uploads.
        $.widget('blueimp.fileupload', {

            options: {
                // The drop target element(s), by the default the complete document.
                // Set to null to disable drag & drop support:
                dropZone: $(document),
                // The paste target element(s), by the default undefined.
                // Set to a DOM node or jQuery object to enable file pasting:
                pasteZone: undefined,
                // The file input field(s), that are listened to for change events.
                // If undefined, it is set to the file input fields inside
                // of the widget element on plugin initialization.
                // Set to null to disable the change listener.
                fileInput: undefined,
                // By default, the file input field is replaced with a clone after
                // each input field change event. This is required for iframe transport
                // queues and allows change events to be fired for the same file
                // selection, but can be disabled by setting the following option to false:
                replaceFileInput: true,
                // The parameter name for the file form data (the request argument name).
                // If undefined or empty, the name property of the file input field is
                // used, or "files[]" if the file input name property is also empty,
                // can be a string or an array of strings:
                paramName: undefined,
                // By default, each file of a selection is uploaded using an individual
                // request for XHR type uploads. Set to false to upload file
                // selections in one request each:
                singleFileUploads: true,
                // To limit the number of files uploaded with one XHR request,
                // set the following option to an integer greater than 0:
                limitMultiFileUploads: undefined,
                // The following option limits the number of files uploaded with one
                // XHR request to keep the request size under or equal to the defined
                // limit in bytes:
                limitMultiFileUploadSize: undefined,
                // Multipart file uploads add a number of bytes to each uploaded file,
                // therefore the following option adds an overhead for each file used
                // in the limitMultiFileUploadSize configuration:
                limitMultiFileUploadSizeOverhead: 512,
                // Set the following option to true to issue all file upload requests
                // in a sequential order:
                sequentialUploads: false,
                // To limit the number of concurrent uploads,
                // set the following option to an integer greater than 0:
                limitConcurrentUploads: undefined,
                // Set the following option to true to force iframe transport uploads:
                forceIframeTransport: false,
                // Set the following option to the location of a redirect url on the
                // origin server, for cross-domain iframe transport uploads:
                redirect: undefined,
                // The parameter name for the redirect url, sent as part of the form
                // data and set to 'redirect' if this option is empty:
                redirectParamName: undefined,
                // Set the following option to the location of a postMessage window,
                // to enable postMessage transport uploads:
                postMessage: undefined,
                // By default, XHR file uploads are sent as multipart/form-data.
                // The iframe transport is always using multipart/form-data.
                // Set to false to enable non-multipart XHR uploads:
                multipart: true,
                // To upload large files in smaller chunks, set the following option
                // to a preferred maximum chunk size. If set to 0, null or undefined,
                // or the browser does not support the required Blob API, files will
                // be uploaded as a whole.
                maxChunkSize: undefined,
                // When a non-multipart upload or a chunked multipart upload has been
                // aborted, this option can be used to resume the upload by setting
                // it to the size of the already uploaded bytes. This option is most
                // useful when modifying the options object inside of the "add" or
                // "send" callbacks, as the options are cloned for each file upload.
                uploadedBytes: undefined,
                // By default, failed (abort or error) file uploads are removed from the
                // global progress calculation. Set the following option to false to
                // prevent recalculating the global progress data:
                recalculateProgress: true,
                // Interval in milliseconds to calculate and trigger progress events:
                progressInterval: 100,
                // Interval in milliseconds to calculate progress bitrate:
                bitrateInterval: 500,
                // By default, uploads are started automatically when adding files:
                autoUpload: true,

                // Error and info messages:
                messages: {
                    uploadedBytes: 'Uploaded bytes exceed file size'
                },

                // Translation function, gets the message key to be translated
                // and an object with context specific data as arguments:
                i18n: function i18n(message, context) {
                    message = this.messages[message] || message.toString();
                    if (context) {
                        $.each(context, function (key, value) {
                            message = message.replace('{' + key + '}', value);
                        });
                    }
                    return message;
                },

                // Additional form data to be sent along with the file uploads can be set
                // using this option, which accepts an array of objects with name and
                // value properties, a function returning such an array, a FormData
                // object (for XHR file uploads), or a simple object.
                // The form of the first fileInput is given as parameter to the function:
                formData: function formData(form) {
                    return form.serializeArray();
                },

                // The add callback is invoked as soon as files are added to the fileupload
                // widget (via file input selection, drag & drop, paste or add API call).
                // If the singleFileUploads option is enabled, this callback will be
                // called once for each file in the selection for XHR file uploads, else
                // once for each file selection.
                //
                // The upload starts when the submit method is invoked on the data parameter.
                // The data object contains a files property holding the added files
                // and allows you to override plugin options as well as define ajax settings.
                //
                // Listeners for this callback can also be bound the following way:
                // .bind('fileuploadadd', func);
                //
                // data.submit() returns a Promise object and allows to attach additional
                // handlers using jQuery's Deferred callbacks:
                // data.submit().done(func).fail(func).always(func);
                add: function add(e, data) {
                    if (e.isDefaultPrevented()) {
                        return false;
                    }
                    if (data.autoUpload || data.autoUpload !== false && $(this).fileupload('option', 'autoUpload')) {
                        data.process().done(function () {
                            data.submit();
                        });
                    }
                },

                // Other callbacks:

                // Callback for the submit event of each file upload:
                // submit: function (e, data) {}, // .bind('fileuploadsubmit', func);

                // Callback for the start of each file upload request:
                // send: function (e, data) {}, // .bind('fileuploadsend', func);

                // Callback for successful uploads:
                // done: function (e, data) {}, // .bind('fileuploaddone', func);

                // Callback for failed (abort or error) uploads:
                // fail: function (e, data) {}, // .bind('fileuploadfail', func);

                // Callback for completed (success, abort or error) requests:
                // always: function (e, data) {}, // .bind('fileuploadalways', func);

                // Callback for upload progress events:
                // progress: function (e, data) {}, // .bind('fileuploadprogress', func);

                // Callback for global upload progress events:
                // progressall: function (e, data) {}, // .bind('fileuploadprogressall', func);

                // Callback for uploads start, equivalent to the global ajaxStart event:
                // start: function (e) {}, // .bind('fileuploadstart', func);

                // Callback for uploads stop, equivalent to the global ajaxStop event:
                // stop: function (e) {}, // .bind('fileuploadstop', func);

                // Callback for change events of the fileInput(s):
                // change: function (e, data) {}, // .bind('fileuploadchange', func);

                // Callback for paste events to the pasteZone(s):
                // paste: function (e, data) {}, // .bind('fileuploadpaste', func);

                // Callback for drop events of the dropZone(s):
                // drop: function (e, data) {}, // .bind('fileuploaddrop', func);

                // Callback for dragover events of the dropZone(s):
                // dragover: function (e) {}, // .bind('fileuploaddragover', func);

                // Callback for the start of each chunk upload request:
                // chunksend: function (e, data) {}, // .bind('fileuploadchunksend', func);

                // Callback for successful chunk uploads:
                // chunkdone: function (e, data) {}, // .bind('fileuploadchunkdone', func);

                // Callback for failed (abort or error) chunk uploads:
                // chunkfail: function (e, data) {}, // .bind('fileuploadchunkfail', func);

                // Callback for completed (success, abort or error) chunk upload requests:
                // chunkalways: function (e, data) {}, // .bind('fileuploadchunkalways', func);

                // The plugin options are used as settings object for the ajax calls.
                // The following are jQuery ajax settings required for the file uploads:
                processData: false,
                contentType: false,
                cache: false,
                timeout: 0
            },

            // A list of options that require reinitializing event listeners and/or
            // special initialization code:
            _specialOptions: ['fileInput', 'dropZone', 'pasteZone', 'multipart', 'forceIframeTransport'],

            _blobSlice: $.support.blobSlice && function () {
                var slice = this.slice || this.webkitSlice || this.mozSlice;
                return slice.apply(this, arguments);
            },

            _BitrateTimer: function _BitrateTimer() {
                this.timestamp = Date.now ? Date.now() : new Date().getTime();
                this.loaded = 0;
                this.bitrate = 0;
                this.getBitrate = function (now, loaded, interval) {
                    var timeDiff = now - this.timestamp;
                    if (!this.bitrate || !interval || timeDiff > interval) {
                        this.bitrate = (loaded - this.loaded) * (1000 / timeDiff) * 8;
                        this.loaded = loaded;
                        this.timestamp = now;
                    }
                    return this.bitrate;
                };
            },

            _isXHRUpload: function _isXHRUpload(options) {
                return !options.forceIframeTransport && (!options.multipart && $.support.xhrFileUpload || $.support.xhrFormDataFileUpload);
            },

            _getFormData: function _getFormData(options) {
                var formData;
                if ($.type(options.formData) === 'function') {
                    return options.formData(options.form);
                }
                if ($.isArray(options.formData)) {
                    return options.formData;
                }
                if ($.type(options.formData) === 'object') {
                    formData = [];
                    $.each(options.formData, function (name, value) {
                        formData.push({ name: name, value: value });
                    });
                    return formData;
                }
                return [];
            },

            _getTotal: function _getTotal(files) {
                var total = 0;
                $.each(files, function (index, file) {
                    total += file.size || 1;
                });
                return total;
            },

            _initProgressObject: function _initProgressObject(obj) {
                var progress = {
                    loaded: 0,
                    total: 0,
                    bitrate: 0
                };
                if (obj._progress) {
                    $.extend(obj._progress, progress);
                } else {
                    obj._progress = progress;
                }
            },

            _initResponseObject: function _initResponseObject(obj) {
                var prop;
                if (obj._response) {
                    for (prop in obj._response) {
                        if (obj._response.hasOwnProperty(prop)) {
                            delete obj._response[prop];
                        }
                    }
                } else {
                    obj._response = {};
                }
            },

            _onProgress: function _onProgress(e, data) {
                if (e.lengthComputable) {
                    var now = Date.now ? Date.now() : new Date().getTime(),
                        loaded;
                    if (data._time && data.progressInterval && now - data._time < data.progressInterval && e.loaded !== e.total) {
                        return;
                    }
                    data._time = now;
                    loaded = Math.floor(e.loaded / e.total * (data.chunkSize || data._progress.total)) + (data.uploadedBytes || 0);
                    // Add the difference from the previously loaded state
                    // to the global loaded counter:
                    this._progress.loaded += loaded - data._progress.loaded;
                    this._progress.bitrate = this._bitrateTimer.getBitrate(now, this._progress.loaded, data.bitrateInterval);
                    data._progress.loaded = data.loaded = loaded;
                    data._progress.bitrate = data.bitrate = data._bitrateTimer.getBitrate(now, loaded, data.bitrateInterval);
                    // Trigger a custom progress event with a total data property set
                    // to the file size(s) of the current upload and a loaded data
                    // property calculated accordingly:
                    this._trigger('progress', $.Event('progress', { delegatedEvent: e }), data);
                    // Trigger a global progress event for all current file uploads,
                    // including ajax calls queued for sequential file uploads:
                    this._trigger('progressall', $.Event('progressall', { delegatedEvent: e }), this._progress);
                }
            },

            _initProgressListener: function _initProgressListener(options) {
                var that = this,
                    xhr = options.xhr ? options.xhr() : $.ajaxSettings.xhr();
                // Accesss to the native XHR object is required to add event listeners
                // for the upload progress event:
                if (xhr.upload) {
                    $(xhr.upload).bind('progress', function (e) {
                        var oe = e.originalEvent;
                        // Make sure the progress event properties get copied over:
                        e.lengthComputable = oe.lengthComputable;
                        e.loaded = oe.loaded;
                        e.total = oe.total;
                        that._onProgress(e, options);
                    });
                    options.xhr = function () {
                        return xhr;
                    };
                }
            },

            _isInstanceOf: function _isInstanceOf(type, obj) {
                // Cross-frame instanceof check
                return Object.prototype.toString.call(obj) === '[object ' + type + ']';
            },

            _initXHRData: function _initXHRData(options) {
                var that = this,
                    formData,
                    file = options.files[0],

                // Ignore non-multipart setting if not supported:
                multipart = options.multipart || !$.support.xhrFileUpload,
                    paramName = $.type(options.paramName) === 'array' ? options.paramName[0] : options.paramName;
                options.headers = $.extend({}, options.headers);
                if (options.contentRange) {
                    options.headers['Content-Range'] = options.contentRange;
                }
                if (!multipart || options.blob || !this._isInstanceOf('File', file)) {
                    options.headers['Content-Disposition'] = 'attachment; filename="' + encodeURI(file.uploadName || file.name) + '"';
                }
                if (!multipart) {
                    options.contentType = file.type || 'application/octet-stream';
                    options.data = options.blob || file;
                } else if ($.support.xhrFormDataFileUpload) {
                    if (options.postMessage) {
                        // window.postMessage does not allow sending FormData
                        // objects, so we just add the File/Blob objects to
                        // the formData array and let the postMessage window
                        // create the FormData object out of this array:
                        formData = this._getFormData(options);
                        if (options.blob) {
                            formData.push({
                                name: paramName,
                                value: options.blob
                            });
                        } else {
                            $.each(options.files, function (index, file) {
                                formData.push({
                                    name: $.type(options.paramName) === 'array' && options.paramName[index] || paramName,
                                    value: file
                                });
                            });
                        }
                    } else {
                        if (that._isInstanceOf('FormData', options.formData)) {
                            formData = options.formData;
                        } else {
                            formData = new FormData();
                            $.each(this._getFormData(options), function (index, field) {
                                formData.append(field.name, field.value);
                            });
                        }
                        if (options.blob) {
                            formData.append(paramName, options.blob, file.uploadName || file.name);
                        } else {
                            $.each(options.files, function (index, file) {
                                // This check allows the tests to run with
                                // dummy objects:
                                if (that._isInstanceOf('File', file) || that._isInstanceOf('Blob', file)) {
                                    formData.append($.type(options.paramName) === 'array' && options.paramName[index] || paramName, file, file.uploadName || file.name);
                                }
                            });
                        }
                    }
                    options.data = formData;
                }
                // Blob reference is not needed anymore, free memory:
                options.blob = null;
            },

            _initIframeSettings: function _initIframeSettings(options) {
                var targetHost = $('<a></a>').prop('href', options.url).prop('host');
                // Setting the dataType to iframe enables the iframe transport:
                options.dataType = 'iframe ' + (options.dataType || '');
                // The iframe transport accepts a serialized array as form data:
                options.formData = this._getFormData(options);
                // Add redirect url to form data on cross-domain uploads:
                if (options.redirect && targetHost && targetHost !== location.host) {
                    options.formData.push({
                        name: options.redirectParamName || 'redirect',
                        value: options.redirect
                    });
                }
            },

            _initDataSettings: function _initDataSettings(options) {
                if (this._isXHRUpload(options)) {
                    if (!this._chunkedUpload(options, true)) {
                        if (!options.data) {
                            this._initXHRData(options);
                        }
                        this._initProgressListener(options);
                    }
                    if (options.postMessage) {
                        // Setting the dataType to postmessage enables the
                        // postMessage transport:
                        options.dataType = 'postmessage ' + (options.dataType || '');
                    }
                } else {
                    this._initIframeSettings(options);
                }
            },

            _getParamName: function _getParamName(options) {
                var fileInput = $(options.fileInput),
                    paramName = options.paramName;
                if (!paramName) {
                    paramName = [];
                    fileInput.each(function () {
                        var input = $(this),
                            name = input.prop('name') || 'files[]',
                            i = (input.prop('files') || [1]).length;
                        while (i) {
                            paramName.push(name);
                            i -= 1;
                        }
                    });
                    if (!paramName.length) {
                        paramName = [fileInput.prop('name') || 'files[]'];
                    }
                } else if (!$.isArray(paramName)) {
                    paramName = [paramName];
                }
                return paramName;
            },

            _initFormSettings: function _initFormSettings(options) {
                // Retrieve missing options from the input field and the
                // associated form, if available:
                if (!options.form || !options.form.length) {
                    options.form = $(options.fileInput.prop('form'));
                    // If the given file input doesn't have an associated form,
                    // use the default widget file input's form:
                    if (!options.form.length) {
                        options.form = $(this.options.fileInput.prop('form'));
                    }
                }
                options.paramName = this._getParamName(options);
                if (!options.url) {
                    options.url = options.form.prop('action') || location.href;
                }
                // The HTTP request method must be "POST" or "PUT":
                options.type = (options.type || $.type(options.form.prop('method')) === 'string' && options.form.prop('method') || '').toUpperCase();
                if (options.type !== 'POST' && options.type !== 'PUT' && options.type !== 'PATCH') {
                    options.type = 'POST';
                }
                if (!options.formAcceptCharset) {
                    options.formAcceptCharset = options.form.attr('accept-charset');
                }
            },

            _getAJAXSettings: function _getAJAXSettings(data) {
                var options = $.extend({}, this.options, data);
                this._initFormSettings(options);
                this._initDataSettings(options);
                return options;
            },

            // jQuery 1.6 doesn't provide .state(),
            // while jQuery 1.8+ removed .isRejected() and .isResolved():
            _getDeferredState: function _getDeferredState(deferred) {
                if (deferred.state) {
                    return deferred.state();
                }
                if (deferred.isResolved()) {
                    return 'resolved';
                }
                if (deferred.isRejected()) {
                    return 'rejected';
                }
                return 'pending';
            },

            // Maps jqXHR callbacks to the equivalent
            // methods of the given Promise object:
            _enhancePromise: function _enhancePromise(promise) {
                promise.success = promise.done;
                promise.error = promise.fail;
                promise.complete = promise.always;
                return promise;
            },

            // Creates and returns a Promise object enhanced with
            // the jqXHR methods abort, success, error and complete:
            _getXHRPromise: function _getXHRPromise(resolveOrReject, context, args) {
                var dfd = $.Deferred(),
                    promise = dfd.promise();
                context = context || this.options.context || promise;
                if (resolveOrReject === true) {
                    dfd.resolveWith(context, args);
                } else if (resolveOrReject === false) {
                    dfd.rejectWith(context, args);
                }
                promise.abort = dfd.promise;
                return this._enhancePromise(promise);
            },

            // Adds convenience methods to the data callback argument:
            _addConvenienceMethods: function _addConvenienceMethods(e, data) {
                var that = this,
                    getPromise = function getPromise(args) {
                    return $.Deferred().resolveWith(that, args).promise();
                };
                data.process = function (resolveFunc, rejectFunc) {
                    if (resolveFunc || rejectFunc) {
                        data._processQueue = this._processQueue = (this._processQueue || getPromise([this])).then(function () {
                            if (data.errorThrown) {
                                return $.Deferred().rejectWith(that, [data]).promise();
                            }
                            return getPromise(arguments);
                        }).then(resolveFunc, rejectFunc);
                    }
                    return this._processQueue || getPromise([this]);
                };
                data.submit = function () {
                    if (this.state() !== 'pending') {
                        data.jqXHR = this.jqXHR = that._trigger('submit', $.Event('submit', { delegatedEvent: e }), this) !== false && that._onSend(e, this);
                    }
                    return this.jqXHR || that._getXHRPromise();
                };
                data.abort = function () {
                    if (this.jqXHR) {
                        return this.jqXHR.abort();
                    }
                    this.errorThrown = 'abort';
                    that._trigger('fail', null, this);
                    return that._getXHRPromise(false);
                };
                data.state = function () {
                    if (this.jqXHR) {
                        return that._getDeferredState(this.jqXHR);
                    }
                    if (this._processQueue) {
                        return that._getDeferredState(this._processQueue);
                    }
                };
                data.processing = function () {
                    return !this.jqXHR && this._processQueue && that._getDeferredState(this._processQueue) === 'pending';
                };
                data.progress = function () {
                    return this._progress;
                };
                data.response = function () {
                    return this._response;
                };
            },

            // Parses the Range header from the server response
            // and returns the uploaded bytes:
            _getUploadedBytes: function _getUploadedBytes(jqXHR) {
                var range = jqXHR.getResponseHeader('Range'),
                    parts = range && range.split('-'),
                    upperBytesPos = parts && parts.length > 1 && parseInt(parts[1], 10);
                return upperBytesPos && upperBytesPos + 1;
            },

            // Uploads a file in multiple, sequential requests
            // by splitting the file up in multiple blob chunks.
            // If the second parameter is true, only tests if the file
            // should be uploaded in chunks, but does not invoke any
            // upload requests:
            _chunkedUpload: function _chunkedUpload(options, testOnly) {
                options.uploadedBytes = options.uploadedBytes || 0;
                var that = this,
                    file = options.files[0],
                    fs = file.size,
                    ub = options.uploadedBytes,
                    mcs = options.maxChunkSize || fs,
                    slice = this._blobSlice,
                    dfd = $.Deferred(),
                    promise = dfd.promise(),
                    jqXHR,
                    _upload;
                if (!(this._isXHRUpload(options) && slice && (ub || ($.type(mcs) === 'function' ? mcs(options) : mcs) < fs)) || options.data) {
                    return false;
                }
                if (testOnly) {
                    return true;
                }
                if (ub >= fs) {
                    file.error = options.i18n('uploadedBytes');
                    return this._getXHRPromise(false, options.context, [null, 'error', file.error]);
                }
                // The chunk upload method:
                _upload = function upload() {
                    // Clone the options object for each chunk upload:
                    var o = $.extend({}, options),
                        currentLoaded = o._progress.loaded;
                    o.blob = slice.call(file, ub, ub + ($.type(mcs) === 'function' ? mcs(o) : mcs), file.type);
                    // Store the current chunk size, as the blob itself
                    // will be dereferenced after data processing:
                    o.chunkSize = o.blob.size;
                    // Expose the chunk bytes position range:
                    o.contentRange = 'bytes ' + ub + '-' + (ub + o.chunkSize - 1) + '/' + fs;
                    // Process the upload data (the blob and potential form data):
                    that._initXHRData(o);
                    // Add progress listeners for this chunk upload:
                    that._initProgressListener(o);
                    jqXHR = (that._trigger('chunksend', null, o) !== false && $.ajax(o) || that._getXHRPromise(false, o.context)).done(function (result, textStatus, jqXHR) {
                        ub = that._getUploadedBytes(jqXHR) || ub + o.chunkSize;
                        // Create a progress event if no final progress event
                        // with loaded equaling total has been triggered
                        // for this chunk:
                        if (currentLoaded + o.chunkSize - o._progress.loaded) {
                            that._onProgress($.Event('progress', {
                                lengthComputable: true,
                                loaded: ub - o.uploadedBytes,
                                total: ub - o.uploadedBytes
                            }), o);
                        }
                        options.uploadedBytes = o.uploadedBytes = ub;
                        o.result = result;
                        o.textStatus = textStatus;
                        o.jqXHR = jqXHR;
                        that._trigger('chunkdone', null, o);
                        that._trigger('chunkalways', null, o);
                        if (ub < fs) {
                            // File upload not yet complete,
                            // continue with the next chunk:
                            _upload();
                        } else {
                            dfd.resolveWith(o.context, [result, textStatus, jqXHR]);
                        }
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        o.jqXHR = jqXHR;
                        o.textStatus = textStatus;
                        o.errorThrown = errorThrown;
                        that._trigger('chunkfail', null, o);
                        that._trigger('chunkalways', null, o);
                        dfd.rejectWith(o.context, [jqXHR, textStatus, errorThrown]);
                    });
                };
                this._enhancePromise(promise);
                promise.abort = function () {
                    return jqXHR.abort();
                };
                _upload();
                return promise;
            },

            _beforeSend: function _beforeSend(e, data) {
                if (this._active === 0) {
                    // the start callback is triggered when an upload starts
                    // and no other uploads are currently running,
                    // equivalent to the global ajaxStart event:
                    this._trigger('start');
                    // Set timer for global bitrate progress calculation:
                    this._bitrateTimer = new this._BitrateTimer();
                    // Reset the global progress values:
                    this._progress.loaded = this._progress.total = 0;
                    this._progress.bitrate = 0;
                }
                // Make sure the container objects for the .response() and
                // .progress() methods on the data object are available
                // and reset to their initial state:
                this._initResponseObject(data);
                this._initProgressObject(data);
                data._progress.loaded = data.loaded = data.uploadedBytes || 0;
                data._progress.total = data.total = this._getTotal(data.files) || 1;
                data._progress.bitrate = data.bitrate = 0;
                this._active += 1;
                // Initialize the global progress values:
                this._progress.loaded += data.loaded;
                this._progress.total += data.total;
            },

            _onDone: function _onDone(result, textStatus, jqXHR, options) {
                var total = options._progress.total,
                    response = options._response;
                if (options._progress.loaded < total) {
                    // Create a progress event if no final progress event
                    // with loaded equaling total has been triggered:
                    this._onProgress($.Event('progress', {
                        lengthComputable: true,
                        loaded: total,
                        total: total
                    }), options);
                }
                response.result = options.result = result;
                response.textStatus = options.textStatus = textStatus;
                response.jqXHR = options.jqXHR = jqXHR;
                this._trigger('done', null, options);
            },

            _onFail: function _onFail(jqXHR, textStatus, errorThrown, options) {
                var response = options._response;
                if (options.recalculateProgress) {
                    // Remove the failed (error or abort) file upload from
                    // the global progress calculation:
                    this._progress.loaded -= options._progress.loaded;
                    this._progress.total -= options._progress.total;
                }
                response.jqXHR = options.jqXHR = jqXHR;
                response.textStatus = options.textStatus = textStatus;
                response.errorThrown = options.errorThrown = errorThrown;
                this._trigger('fail', null, options);
            },

            _onAlways: function _onAlways(jqXHRorResult, textStatus, jqXHRorError, options) {
                // jqXHRorResult, textStatus and jqXHRorError are added to the
                // options object via done and fail callbacks
                this._trigger('always', null, options);
            },

            _onSend: function _onSend(e, data) {
                if (!data.submit) {
                    this._addConvenienceMethods(e, data);
                }
                var that = this,
                    jqXHR,
                    aborted,
                    slot,
                    pipe,
                    options = that._getAJAXSettings(data),
                    send = function send() {
                    that._sending += 1;
                    // Set timer for bitrate progress calculation:
                    options._bitrateTimer = new that._BitrateTimer();
                    jqXHR = jqXHR || ((aborted || that._trigger('send', $.Event('send', { delegatedEvent: e }), options) === false) && that._getXHRPromise(false, options.context, aborted) || that._chunkedUpload(options) || $.ajax(options)).done(function (result, textStatus, jqXHR) {
                        that._onDone(result, textStatus, jqXHR, options);
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        that._onFail(jqXHR, textStatus, errorThrown, options);
                    }).always(function (jqXHRorResult, textStatus, jqXHRorError) {
                        that._onAlways(jqXHRorResult, textStatus, jqXHRorError, options);
                        that._sending -= 1;
                        that._active -= 1;
                        if (options.limitConcurrentUploads && options.limitConcurrentUploads > that._sending) {
                            // Start the next queued upload,
                            // that has not been aborted:
                            var nextSlot = that._slots.shift();
                            while (nextSlot) {
                                if (that._getDeferredState(nextSlot) === 'pending') {
                                    nextSlot.resolve();
                                    break;
                                }
                                nextSlot = that._slots.shift();
                            }
                        }
                        if (that._active === 0) {
                            // The stop callback is triggered when all uploads have
                            // been completed, equivalent to the global ajaxStop event:
                            that._trigger('stop');
                        }
                    });
                    return jqXHR;
                };
                this._beforeSend(e, options);
                if (this.options.sequentialUploads || this.options.limitConcurrentUploads && this.options.limitConcurrentUploads <= this._sending) {
                    if (this.options.limitConcurrentUploads > 1) {
                        slot = $.Deferred();
                        this._slots.push(slot);
                        pipe = slot.then(send);
                    } else {
                        this._sequence = this._sequence.then(send, send);
                        pipe = this._sequence;
                    }
                    // Return the piped Promise object, enhanced with an abort method,
                    // which is delegated to the jqXHR object of the current upload,
                    // and jqXHR callbacks mapped to the equivalent Promise methods:
                    pipe.abort = function () {
                        aborted = [undefined, 'abort', 'abort'];
                        if (!jqXHR) {
                            if (slot) {
                                slot.rejectWith(options.context, aborted);
                            }
                            return send();
                        }
                        return jqXHR.abort();
                    };
                    return this._enhancePromise(pipe);
                }
                return send();
            },

            _onAdd: function _onAdd(e, data) {
                var that = this,
                    result = true,
                    options = $.extend({}, this.options, data),
                    files = data.files,
                    filesLength = files.length,
                    limit = options.limitMultiFileUploads,
                    limitSize = options.limitMultiFileUploadSize,
                    overhead = options.limitMultiFileUploadSizeOverhead,
                    batchSize = 0,
                    paramName = this._getParamName(options),
                    paramNameSet,
                    paramNameSlice,
                    fileSet,
                    i,
                    j = 0;
                if (!filesLength) {
                    return false;
                }
                if (limitSize && files[0].size === undefined) {
                    limitSize = undefined;
                }
                if (!(options.singleFileUploads || limit || limitSize) || !this._isXHRUpload(options)) {
                    fileSet = [files];
                    paramNameSet = [paramName];
                } else if (!(options.singleFileUploads || limitSize) && limit) {
                    fileSet = [];
                    paramNameSet = [];
                    for (i = 0; i < filesLength; i += limit) {
                        fileSet.push(files.slice(i, i + limit));
                        paramNameSlice = paramName.slice(i, i + limit);
                        if (!paramNameSlice.length) {
                            paramNameSlice = paramName;
                        }
                        paramNameSet.push(paramNameSlice);
                    }
                } else if (!options.singleFileUploads && limitSize) {
                    fileSet = [];
                    paramNameSet = [];
                    for (i = 0; i < filesLength; i = i + 1) {
                        batchSize += files[i].size + overhead;
                        if (i + 1 === filesLength || batchSize + files[i + 1].size + overhead > limitSize || limit && i + 1 - j >= limit) {
                            fileSet.push(files.slice(j, i + 1));
                            paramNameSlice = paramName.slice(j, i + 1);
                            if (!paramNameSlice.length) {
                                paramNameSlice = paramName;
                            }
                            paramNameSet.push(paramNameSlice);
                            j = i + 1;
                            batchSize = 0;
                        }
                    }
                } else {
                    paramNameSet = paramName;
                }
                data.originalFiles = files;
                $.each(fileSet || files, function (index, element) {
                    var newData = $.extend({}, data);
                    newData.files = fileSet ? element : [element];
                    newData.paramName = paramNameSet[index];
                    that._initResponseObject(newData);
                    that._initProgressObject(newData);
                    that._addConvenienceMethods(e, newData);
                    result = that._trigger('add', $.Event('add', { delegatedEvent: e }), newData);
                    return result;
                });
                return result;
            },

            _replaceFileInput: function _replaceFileInput(data) {
                var input = data.fileInput,
                    inputClone = input.clone(true),
                    restoreFocus = input.is(document.activeElement);
                // Add a reference for the new cloned file input to the data argument:
                data.fileInputClone = inputClone;
                $('<form></form>').append(inputClone)[0].reset();
                // Detaching allows to insert the fileInput on another form
                // without loosing the file input value:
                input.after(inputClone).detach();
                // If the fileInput had focus before it was detached,
                // restore focus to the inputClone.
                if (restoreFocus) {
                    inputClone.focus();
                }
                // Avoid memory leaks with the detached file input:
                $.cleanData(input.unbind('remove'));
                // Replace the original file input element in the fileInput
                // elements set with the clone, which has been copied including
                // event handlers:
                this.options.fileInput = this.options.fileInput.map(function (i, el) {
                    if (el === input[0]) {
                        return inputClone[0];
                    }
                    return el;
                });
                // If the widget has been initialized on the file input itself,
                // override this.element with the file input clone:
                if (input[0] === this.element[0]) {
                    this.element = inputClone;
                }
            },

            _handleFileTreeEntry: function _handleFileTreeEntry(entry, path) {
                var that = this,
                    dfd = $.Deferred(),
                    entries = [],
                    dirReader,
                    errorHandler = function errorHandler(e) {
                    if (e && !e.entry) {
                        e.entry = entry;
                    }
                    // Since $.when returns immediately if one
                    // Deferred is rejected, we use resolve instead.
                    // This allows valid files and invalid items
                    // to be returned together in one set:
                    dfd.resolve([e]);
                },
                    successHandler = function successHandler(entries) {
                    that._handleFileTreeEntries(entries, path + entry.name + '/').done(function (files) {
                        dfd.resolve(files);
                    }).fail(errorHandler);
                },
                    readEntries = function readEntries() {
                    dirReader.readEntries(function (results) {
                        if (!results.length) {
                            successHandler(entries);
                        } else {
                            entries = entries.concat(results);
                            readEntries();
                        }
                    }, errorHandler);
                };
                path = path || '';
                if (entry.isFile) {
                    if (entry._file) {
                        // Workaround for Chrome bug #149735
                        entry._file.relativePath = path;
                        dfd.resolve(entry._file);
                    } else {
                        entry.file(function (file) {
                            file.relativePath = path;
                            dfd.resolve(file);
                        }, errorHandler);
                    }
                } else if (entry.isDirectory) {
                    dirReader = entry.createReader();
                    readEntries();
                } else {
                    // Return an empy list for file system items
                    // other than files or directories:
                    dfd.resolve([]);
                }
                return dfd.promise();
            },

            _handleFileTreeEntries: function _handleFileTreeEntries(entries, path) {
                var that = this;
                return $.when.apply($, $.map(entries, function (entry) {
                    return that._handleFileTreeEntry(entry, path);
                })).then(function () {
                    return Array.prototype.concat.apply([], arguments);
                });
            },

            _getDroppedFiles: function _getDroppedFiles(dataTransfer) {
                dataTransfer = dataTransfer || {};
                var items = dataTransfer.items;
                if (items && items.length && (items[0].webkitGetAsEntry || items[0].getAsEntry)) {
                    return this._handleFileTreeEntries($.map(items, function (item) {
                        var entry;
                        if (item.webkitGetAsEntry) {
                            entry = item.webkitGetAsEntry();
                            if (entry) {
                                // Workaround for Chrome bug #149735:
                                entry._file = item.getAsFile();
                            }
                            return entry;
                        }
                        return item.getAsEntry();
                    }));
                }
                return $.Deferred().resolve($.makeArray(dataTransfer.files)).promise();
            },

            _getSingleFileInputFiles: function _getSingleFileInputFiles(fileInput) {
                fileInput = $(fileInput);
                var entries = fileInput.prop('webkitEntries') || fileInput.prop('entries'),
                    files,
                    value;
                if (entries && entries.length) {
                    return this._handleFileTreeEntries(entries);
                }
                files = $.makeArray(fileInput.prop('files'));
                if (!files.length) {
                    value = fileInput.prop('value');
                    if (!value) {
                        return $.Deferred().resolve([]).promise();
                    }
                    // If the files property is not available, the browser does not
                    // support the File API and we add a pseudo File object with
                    // the input value as name with path information removed:
                    files = [{ name: value.replace(/^.*\\/, '') }];
                } else if (files[0].name === undefined && files[0].fileName) {
                    // File normalization for Safari 4 and Firefox 3:
                    $.each(files, function (index, file) {
                        file.name = file.fileName;
                        file.size = file.fileSize;
                    });
                }
                return $.Deferred().resolve(files).promise();
            },

            _getFileInputFiles: function _getFileInputFiles(fileInput) {
                if (!(fileInput instanceof $) || fileInput.length === 1) {
                    return this._getSingleFileInputFiles(fileInput);
                }
                return $.when.apply($, $.map(fileInput, this._getSingleFileInputFiles)).then(function () {
                    return Array.prototype.concat.apply([], arguments);
                });
            },

            _onChange: function _onChange(e) {
                var that = this,
                    data = {
                    fileInput: $(e.target),
                    form: $(e.target.form)
                };
                this._getFileInputFiles(data.fileInput).always(function (files) {
                    data.files = files;
                    if (that.options.replaceFileInput) {
                        that._replaceFileInput(data);
                    }
                    if (that._trigger('change', $.Event('change', { delegatedEvent: e }), data) !== false) {
                        that._onAdd(e, data);
                    }
                });
            },

            _onPaste: function _onPaste(e) {
                var items = e.originalEvent && e.originalEvent.clipboardData && e.originalEvent.clipboardData.items,
                    data = { files: [] };
                if (items && items.length) {
                    $.each(items, function (index, item) {
                        var file = item.getAsFile && item.getAsFile();
                        if (file) {
                            data.files.push(file);
                        }
                    });
                    if (this._trigger('paste', $.Event('paste', { delegatedEvent: e }), data) !== false) {
                        this._onAdd(e, data);
                    }
                }
            },

            _onDrop: function _onDrop(e) {
                e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
                var that = this,
                    dataTransfer = e.dataTransfer,
                    data = {};
                if (dataTransfer && dataTransfer.files && dataTransfer.files.length) {
                    e.preventDefault();
                    this._getDroppedFiles(dataTransfer).always(function (files) {
                        data.files = files;
                        if (that._trigger('drop', $.Event('drop', { delegatedEvent: e }), data) !== false) {
                            that._onAdd(e, data);
                        }
                    });
                }
            },

            _onDragOver: getDragHandler('dragover'),

            _onDragEnter: getDragHandler('dragenter'),

            _onDragLeave: getDragHandler('dragleave'),

            _initEventHandlers: function _initEventHandlers() {
                if (this._isXHRUpload(this.options)) {
                    this._on(this.options.dropZone, {
                        dragover: this._onDragOver,
                        drop: this._onDrop,
                        // event.preventDefault() on dragenter is required for IE10+:
                        dragenter: this._onDragEnter,
                        // dragleave is not required, but added for completeness:
                        dragleave: this._onDragLeave
                    });
                    this._on(this.options.pasteZone, {
                        paste: this._onPaste
                    });
                }
                if ($.support.fileInput) {
                    this._on(this.options.fileInput, {
                        change: this._onChange
                    });
                }
            },

            _destroyEventHandlers: function _destroyEventHandlers() {
                this._off(this.options.dropZone, 'dragenter dragleave dragover drop');
                this._off(this.options.pasteZone, 'paste');
                this._off(this.options.fileInput, 'change');
            },

            _destroy: function _destroy() {
                this._destroyEventHandlers();
            },

            _setOption: function _setOption(key, value) {
                var reinit = $.inArray(key, this._specialOptions) !== -1;
                if (reinit) {
                    this._destroyEventHandlers();
                }
                this._super(key, value);
                if (reinit) {
                    this._initSpecialOptions();
                    this._initEventHandlers();
                }
            },

            _initSpecialOptions: function _initSpecialOptions() {
                var options = this.options;
                if (options.fileInput === undefined) {
                    options.fileInput = this.element.is('input[type="file"]') ? this.element : this.element.find('input[type="file"]');
                } else if (!(options.fileInput instanceof $)) {
                    options.fileInput = $(options.fileInput);
                }
                if (!(options.dropZone instanceof $)) {
                    options.dropZone = $(options.dropZone);
                }
                if (!(options.pasteZone instanceof $)) {
                    options.pasteZone = $(options.pasteZone);
                }
            },

            _getRegExp: function _getRegExp(str) {
                var parts = str.split('/'),
                    modifiers = parts.pop();
                parts.shift();
                return new RegExp(parts.join('/'), modifiers);
            },

            _isRegExpOption: function _isRegExpOption(key, value) {
                return key !== 'url' && $.type(value) === 'string' && /^\/.*\/[igm]{0,3}$/.test(value);
            },

            _initDataAttributes: function _initDataAttributes() {
                var that = this,
                    options = this.options,
                    data = this.element.data();
                // Initialize options set via HTML5 data-attributes:
                $.each(this.element[0].attributes, function (index, attr) {
                    var key = attr.name.toLowerCase(),
                        value;
                    if (/^data-/.test(key)) {
                        // Convert hyphen-ated key to camelCase:
                        key = key.slice(5).replace(/-[a-z]/g, function (str) {
                            return str.charAt(1).toUpperCase();
                        });
                        value = data[key];
                        if (that._isRegExpOption(key, value)) {
                            value = that._getRegExp(value);
                        }
                        options[key] = value;
                    }
                });
            },

            _create: function _create() {
                this._initDataAttributes();
                this._initSpecialOptions();
                this._slots = [];
                this._sequence = this._getXHRPromise(true);
                this._sending = this._active = 0;
                this._initProgressObject(this);
                this._initEventHandlers();
            },

            // This method is exposed to the widget API and allows to query
            // the number of active uploads:
            active: function active() {
                return this._active;
            },

            // This method is exposed to the widget API and allows to query
            // the widget upload progress.
            // It returns an object with loaded, total and bitrate properties
            // for the running uploads:
            progress: function progress() {
                return this._progress;
            },

            // This method is exposed to the widget API and allows adding files
            // using the fileupload API. The data parameter accepts an object which
            // must have a files property and can contain additional options:
            // .fileupload('add', {files: filesList});
            add: function add(data) {
                var that = this;
                if (!data || this.options.disabled) {
                    return;
                }
                if (data.fileInput && !data.files) {
                    this._getFileInputFiles(data.fileInput).always(function (files) {
                        data.files = files;
                        that._onAdd(null, data);
                    });
                } else {
                    data.files = $.makeArray(data.files);
                    this._onAdd(null, data);
                }
            },

            // This method is exposed to the widget API and allows sending files
            // using the fileupload API. The data parameter accepts an object which
            // must have a files or fileInput property and can contain additional options:
            // .fileupload('send', {files: filesList});
            // The method returns a Promise object for the file upload call.
            send: function send(data) {
                if (data && !this.options.disabled) {
                    if (data.fileInput && !data.files) {
                        var that = this,
                            dfd = $.Deferred(),
                            promise = dfd.promise(),
                            jqXHR,
                            aborted;
                        promise.abort = function () {
                            aborted = true;
                            if (jqXHR) {
                                return jqXHR.abort();
                            }
                            dfd.reject(null, 'abort', 'abort');
                            return promise;
                        };
                        this._getFileInputFiles(data.fileInput).always(function (files) {
                            if (aborted) {
                                return;
                            }
                            if (!files.length) {
                                dfd.reject();
                                return;
                            }
                            data.files = files;
                            jqXHR = that._onSend(null, data);
                            jqXHR.then(function (result, textStatus, jqXHR) {
                                dfd.resolve(result, textStatus, jqXHR);
                            }, function (jqXHR, textStatus, errorThrown) {
                                dfd.reject(jqXHR, textStatus, errorThrown);
                            });
                        });
                        return this._enhancePromise(promise);
                    }
                    data.files = $.makeArray(data.files);
                    if (data.files.length) {
                        return this._onSend(null, data);
                    }
                }
                return this._getXHRPromise(false, data && data.context);
            }

        });
    });
});

var jquery_fileuploadProcess = createCommonjsModule(function (module, exports) {
    /*
     * jQuery File Upload Processing Plugin
     * https://github.com/blueimp/jQuery-File-Upload
     *
     * Copyright 2012, Sebastian Tschan
     * https://blueimp.net
     *
     * Licensed under the MIT license:
     * https://opensource.org/licenses/MIT
     */

    /* jshint nomen:false */
    /* global define, require, window */

    (function (factory) {
        if (typeof undefined === 'function' && undefined.amd) {
            // Register as an anonymous AMD module:
            undefined(['jquery', './jquery.fileupload'], factory);
        } else {
            // Node/CommonJS:
            factory(require$$0, jquery_fileupload);
        }
    })(function ($) {
        var originalAdd = $.blueimp.fileupload.prototype.options.add;

        // The File Upload Processing plugin extends the fileupload widget
        // with file processing functionality:
        $.widget('blueimp.fileupload', $.blueimp.fileupload, {

            options: {
                // The list of processing actions:
                processQueue: [
                    /*
                    {
                        action: 'log',
                        type: 'debug'
                    }
                    */
                ],
                add: function add(e, data) {
                    var $this = $(this);
                    data.process(function () {
                        return $this.fileupload('process', data);
                    });
                    originalAdd.call(this, e, data);
                }
            },

            processActions: {
                /*
                log: function (data, options) {
                    console[options.type](
                        'Processing "' + data.files[data.index].name + '"'
                    );
                }
                */
            },

            _processFile: function _processFile(data, originalData) {
                var that = this,
                    dfd = $.Deferred().resolveWith(that, [data]),
                    chain = dfd.promise();
                this._trigger('process', null, data);
                $.each(data.processQueue, function (i, settings) {
                    var func = function func(data) {
                        if (originalData.errorThrown) {
                            return $.Deferred().rejectWith(that, [originalData]).promise();
                        }
                        return that.processActions[settings.action].call(that, data, settings);
                    };
                    chain = chain.then(func, settings.always && func);
                });
                chain.done(function () {
                    that._trigger('processdone', null, data);
                    that._trigger('processalways', null, data);
                }).fail(function () {
                    that._trigger('processfail', null, data);
                    that._trigger('processalways', null, data);
                });
                return chain;
            },

            // Replaces the settings of each processQueue item that
            // are strings starting with an "@", using the remaining
            // substring as key for the option map,
            // e.g. "@autoUpload" is replaced with options.autoUpload:
            _transformProcessQueue: function _transformProcessQueue(options) {
                var processQueue = [];
                $.each(options.processQueue, function () {
                    var settings = {},
                        action = this.action,
                        prefix = this.prefix === true ? action : this.prefix;
                    $.each(this, function (key, value) {
                        if ($.type(value) === 'string' && value.charAt(0) === '@') {
                            settings[key] = options[value.slice(1) || (prefix ? prefix + key.charAt(0).toUpperCase() + key.slice(1) : key)];
                        } else {
                            settings[key] = value;
                        }
                    });
                    processQueue.push(settings);
                });
                options.processQueue = processQueue;
            },

            // Returns the number of files currently in the processsing queue:
            processing: function processing() {
                return this._processing;
            },

            // Processes the files given as files property of the data parameter,
            // returns a Promise object that allows to bind callbacks:
            process: function process(data) {
                var that = this,
                    options = $.extend({}, this.options, data);
                if (options.processQueue && options.processQueue.length) {
                    this._transformProcessQueue(options);
                    if (this._processing === 0) {
                        this._trigger('processstart');
                    }
                    $.each(data.files, function (index) {
                        var opts = index ? $.extend({}, options) : options,
                            func = function func() {
                            if (data.errorThrown) {
                                return $.Deferred().rejectWith(that, [data]).promise();
                            }
                            return that._processFile(opts, data);
                        };
                        opts.index = index;
                        that._processing += 1;
                        that._processingQueue = that._processingQueue.then(func, func).always(function () {
                            that._processing -= 1;
                            if (that._processing === 0) {
                                that._trigger('processstop');
                            }
                        });
                    });
                }
                return this._processingQueue;
            },

            _create: function _create() {
                this._super();
                this._processing = 0;
                this._processingQueue = $.Deferred().resolveWith(this).promise();
            }

        });
    });
});

var jquery_fileuploadValidate = createCommonjsModule(function (module, exports) {
    /*
     * jQuery File Upload Validation Plugin
     * https://github.com/blueimp/jQuery-File-Upload
     *
     * Copyright 2013, Sebastian Tschan
     * https://blueimp.net
     *
     * Licensed under the MIT license:
     * https://opensource.org/licenses/MIT
     */

    /* global define, require, window */

    (function (factory) {
        if (typeof undefined === 'function' && undefined.amd) {
            // Register as an anonymous AMD module:
            undefined(['jquery', './jquery.fileupload-process'], factory);
        } else {
            // Node/CommonJS:
            factory(require$$0, jquery_fileuploadProcess);
        }
    })(function ($) {
        $.blueimp.fileupload.prototype.options.processQueue.push({
            action: 'validate',
            // Always trigger this action,
            // even if the previous action was rejected:
            always: true,
            // Options taken from the global options map:
            acceptFileTypes: '@',
            maxFileSize: '@',
            minFileSize: '@',
            maxNumberOfFiles: '@',
            disabled: '@disableValidation'
        });

        // The File Upload Validation plugin extends the fileupload widget
        // with file validation functionality:
        $.widget('blueimp.fileupload', $.blueimp.fileupload, {

            options: {
                /*
                // The regular expression for allowed file types, matches
                // against either file type or file name:
                acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
                // The maximum allowed file size in bytes:
                maxFileSize: 10000000, // 10 MB
                // The minimum allowed file size in bytes:
                minFileSize: undefined, // No minimal file size
                // The limit of files to be uploaded:
                maxNumberOfFiles: 10,
                */

                // Function returning the current number of files,
                // has to be overriden for maxNumberOfFiles validation:
                getNumberOfFiles: $.noop,

                // Error and info messages:
                messages: {
                    maxNumberOfFiles: 'Maximum number of files exceeded',
                    acceptFileTypes: 'File type not allowed',
                    maxFileSize: 'File is too large',
                    minFileSize: 'File is too small'
                }
            },

            processActions: {

                validate: function validate(data, options) {
                    if (options.disabled) {
                        return data;
                    }
                    var dfd = $.Deferred(),
                        settings = this.options,
                        file = data.files[data.index],
                        fileSize;
                    if (options.minFileSize || options.maxFileSize) {
                        fileSize = file.size;
                    }
                    if ($.type(options.maxNumberOfFiles) === 'number' && (settings.getNumberOfFiles() || 0) + data.files.length > options.maxNumberOfFiles) {
                        file.error = settings.i18n('maxNumberOfFiles');
                    } else if (options.acceptFileTypes && !(options.acceptFileTypes.test(file.type) || options.acceptFileTypes.test(file.name))) {
                        file.error = settings.i18n('acceptFileTypes');
                    } else if (fileSize > options.maxFileSize) {
                        file.error = settings.i18n('maxFileSize');
                    } else if ($.type(fileSize) === 'number' && fileSize < options.minFileSize) {
                        file.error = settings.i18n('minFileSize');
                    } else {
                        delete file.error;
                    }
                    if (file.error || data.files.error) {
                        data.files.error = true;
                        dfd.rejectWith(this, [data]);
                    } else {
                        dfd.resolveWith(this, [data]);
                    }
                    return dfd.promise();
                }

            }

        });
    });
});

var jquery_iframeTransport = createCommonjsModule(function (module, exports) {
    /*
     * jQuery Iframe Transport Plugin
     * https://github.com/blueimp/jQuery-File-Upload
     *
     * Copyright 2011, Sebastian Tschan
     * https://blueimp.net
     *
     * Licensed under the MIT license:
     * https://opensource.org/licenses/MIT
     */

    /* global define, require, window, document, JSON */

    (function (factory) {
        if (typeof undefined === 'function' && undefined.amd) {
            // Register as an anonymous AMD module:
            undefined(['jquery'], factory);
        } else {
            // Node/CommonJS:
            factory(require$$0);
        }
    })(function ($) {
        var counter = 0,
            jsonAPI = $,
            jsonParse = 'parseJSON';

        if ('JSON' in window && 'parse' in JSON) {
            jsonAPI = JSON;
            jsonParse = 'parse';
        }

        // The iframe transport accepts four additional options:
        // options.fileInput: a jQuery collection of file input fields
        // options.paramName: the parameter name for the file form data,
        //  overrides the name property of the file input field(s),
        //  can be a string or an array of strings.
        // options.formData: an array of objects with name and value properties,
        //  equivalent to the return data of .serializeArray(), e.g.:
        //  [{name: 'a', value: 1}, {name: 'b', value: 2}]
        // options.initialIframeSrc: the URL of the initial iframe src,
        //  by default set to "javascript:false;"
        $.ajaxTransport('iframe', function (options) {
            if (options.async) {
                // javascript:false as initial iframe src
                // prevents warning popups on HTTPS in IE6:
                /*jshint scripturl: true */
                var initialIframeSrc = options.initialIframeSrc || 'javascript:false;',

                /*jshint scripturl: false */
                form,
                    iframe,
                    addParamChar;
                return {
                    send: function send(_$$1, completeCallback) {
                        form = $('<form style="display:none;"></form>');
                        form.attr('accept-charset', options.formAcceptCharset);
                        addParamChar = /\?/.test(options.url) ? '&' : '?';
                        // XDomainRequest only supports GET and POST:
                        if (options.type === 'DELETE') {
                            options.url = options.url + addParamChar + '_method=DELETE';
                            options.type = 'POST';
                        } else if (options.type === 'PUT') {
                            options.url = options.url + addParamChar + '_method=PUT';
                            options.type = 'POST';
                        } else if (options.type === 'PATCH') {
                            options.url = options.url + addParamChar + '_method=PATCH';
                            options.type = 'POST';
                        }
                        // IE versions below IE8 cannot set the name property of
                        // elements that have already been added to the DOM,
                        // so we set the name along with the iframe HTML markup:
                        counter += 1;
                        iframe = $('<iframe src="' + initialIframeSrc + '" name="iframe-transport-' + counter + '"></iframe>').bind('load', function () {
                            var fileInputClones,
                                paramNames = $.isArray(options.paramName) ? options.paramName : [options.paramName];
                            iframe.unbind('load').bind('load', function () {
                                var response;
                                // Wrap in a try/catch block to catch exceptions thrown
                                // when trying to access cross-domain iframe contents:
                                try {
                                    response = iframe.contents();
                                    // Google Chrome and Firefox do not throw an
                                    // exception when calling iframe.contents() on
                                    // cross-domain requests, so we unify the response:
                                    if (!response.length || !response[0].firstChild) {
                                        throw new Error();
                                    }
                                } catch (e) {
                                    response = undefined;
                                }
                                // The complete callback returns the
                                // iframe content document as response object:
                                completeCallback(200, 'success', { 'iframe': response });
                                // Fix for IE endless progress bar activity bug
                                // (happens on form submits to iframe targets):
                                $('<iframe src="' + initialIframeSrc + '"></iframe>').appendTo(form);
                                window.setTimeout(function () {
                                    // Removing the form in a setTimeout call
                                    // allows Chrome's developer tools to display
                                    // the response result
                                    form.remove();
                                }, 0);
                            });
                            form.prop('target', iframe.prop('name')).prop('action', options.url).prop('method', options.type);
                            if (options.formData) {
                                $.each(options.formData, function (index, field) {
                                    $('<input type="hidden"/>').prop('name', field.name).val(field.value).appendTo(form);
                                });
                            }
                            if (options.fileInput && options.fileInput.length && options.type === 'POST') {
                                fileInputClones = options.fileInput.clone();
                                // Insert a clone for each file input field:
                                options.fileInput.after(function (index) {
                                    return fileInputClones[index];
                                });
                                if (options.paramName) {
                                    options.fileInput.each(function (index) {
                                        $(this).prop('name', paramNames[index] || options.paramName);
                                    });
                                }
                                // Appending the file input fields to the hidden form
                                // removes them from their original location:
                                form.append(options.fileInput).prop('enctype', 'multipart/form-data')
                                // enctype must be set as encoding for IE:
                                .prop('encoding', 'multipart/form-data');
                                // Remove the HTML5 form attribute from the input(s):
                                options.fileInput.removeAttr('form');
                            }
                            form.submit();
                            // Insert the file input fields at their original location
                            // by replacing the clones with the originals:
                            if (fileInputClones && fileInputClones.length) {
                                options.fileInput.each(function (index, input) {
                                    var clone = $(fileInputClones[index]);
                                    // Restore the original name and form properties:
                                    $(input).prop('name', clone.prop('name')).attr('form', clone.attr('form'));
                                    clone.replaceWith(input);
                                });
                            }
                        });
                        form.append(iframe).appendTo(document.body);
                    },
                    abort: function abort() {
                        if (iframe) {
                            // javascript:false as iframe src aborts the request
                            // and prevents warning popups on HTTPS in IE6.
                            // concat is used to avoid the "Script URL" JSLint error:
                            iframe.unbind('load').prop('src', initialIframeSrc);
                        }
                        if (form) {
                            form.remove();
                        }
                    }
                };
            }
        });

        // The iframe transport returns the iframe content document as response.
        // The following adds converters from iframe to text, json, html, xml
        // and script.
        // Please note that the Content-Type for JSON responses has to be text/plain
        // or text/html, if the browser doesn't include application/json in the
        // Accept header, else IE will show a download dialog.
        // The Content-Type for XML responses on the other hand has to be always
        // application/xml or text/xml, so IE properly parses the XML response.
        // See also
        // https://github.com/blueimp/jQuery-File-Upload/wiki/Setup#content-type-negotiation
        $.ajaxSetup({
            converters: {
                'iframe text': function iframeText(iframe) {
                    return iframe && $(iframe[0].body).text();
                },
                'iframe json': function iframeJson(iframe) {
                    return iframe && jsonAPI[jsonParse]($(iframe[0].body).text());
                },
                'iframe html': function iframeHtml(iframe) {
                    return iframe && $(iframe[0].body).html();
                },
                'iframe xml': function iframeXml(iframe) {
                    var xmlDoc = iframe && iframe[0];
                    return xmlDoc && $.isXMLDoc(xmlDoc) ? xmlDoc : $.parseXML(xmlDoc.XMLDocument && xmlDoc.XMLDocument.xml || $(xmlDoc.body).html());
                },
                'iframe script': function iframeScript(iframe) {
                    return iframe && $.globalEval($(iframe[0].body).text());
                }
            }
        });
    });
});

var TmVueUpload$1 = { template: "<div ref=\"upload\"> <div v-if=\"singleFileUploads\" style=\"padding-left:0px\"> <input :id=\"id\" type=\"file\" name=\"file\" data-file-upload=\"singleFile\"> <div class=\"upload-container\"> <div class=\"left\"> <label :for=\"id\" class=\"btn btn-default\">{{title}}</label> </div> <div v-show=\"showInfo\" class=\"file-info-container\"> <span class=\"file-size\">{{fileSize}}</span> <span class=\"icon icon-cancel\" @click=\"cancel\"></span> </div> <div v-show=\"showInfo\" class=\"file-info-container center\"> <div class=\"autowrap\">{{fileName}}</div> </div> </div> </div> <div v-else class=\"control-wrapper\"> todo multiple </div> </div>",
  name: "TmVueUpload",
  props: {
    title: {
      type: String,
      default: "Select Files..."
    },
    maxFileSize: {
      type: String,
      default: "@"
    },
    acceptFileTypes: {
      type: String,
      default: null
    },
    dataType: {
      type: String,
      default: "json"
    },
    autoUpload: {
      type: Boolean,
      default: false
    },
    upload: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: {}
    },
    url: {
      type: String,
      default: ""
    },
    singleFileUploads: {
      type: Boolean,
      default: true
    },
    paramName: {
      type: String,
      default: "file"
    },
    sequentialUploads: {
      type: Boolean,
      default: true
    },
    id: {
      type: String,
      default: ""
    },
    hide: {
      type: Boolean,
      default: true
    },
    fileuploadadd: {
      type: Function,
      default: function _default() {}
    },
    fileuploadstart: {
      type: Function,
      default: function _default() {}
    },
    fileuploaddone: {
      type: Function,
      default: function _default() {}
    },
    fileuploadfail: {
      type: Function,
      default: function _default() {}
    },
    fileuploadprocessfail: {
      type: Function,
      default: function _default() {}
    },
    reset: {
      type: Boolean,
      default: false
    },
    canceled: {
      type: Function,
      default: function _default() {}
    }
  },

  data: function data() {
    return {
      fileName: null,
      fileSize: null,
      showInfo: false,
      files: null
    };
  },

  watch: {
    reset: function reset() {
      this.showInfo = false;
      this.fileName = "";
      this.fileSize = "";
      this.files = null;
      this.data = null;
    },
    upload: function upload() {
      this.data.submit();
    }
  },
  methods: {
    formatFileSize: function formatFileSize(bytes) {
      if (typeof bytes !== "number") {
        return "";
      }
      if (bytes >= 1000000000) {
        return (bytes / 1000000000).toFixed(2) + " GB";
      }
      if (bytes >= 1000000) {
        return (bytes / 1000000).toFixed(2) + " MB";
      }
      return (bytes / 1000).toFixed(2) + " KB";
    },
    cancel: function cancel() {
      this.showInfo = false;
      this.fileName = "";
      this.fileSize = "";
      this.files = null;
      this.canceled();
    }
  },
  mounted: function mounted() {
    var messagesMap = {
      "Maximum number of files exceeded": "MAXNUMBEROFFILES",
      "File type not allowed": "ACCEPTFILETYPES",
      "File is too large": "MAXFILESIZE",
      "File is too small": "MINFILESIZE"
    };
    var _self = this;
    var options = {
      maxFileSize: this.maxFileSize,
      acceptFileTypes: this.acceptFileTypes,
      dataType: this.dataType,
      autoUpload: this.autoUpload,
      url: this.url,
      singleFileUploads: this.singleFileUploads,
      paramName: this.paramName,
      sequentialUploads: this.sequentialUploads
    };
    options.iframe = true;

    require$$0("#" + this.id).fileupload(options).on("fileuploadprocessfail", function (e, data) {
      data.files.forEach(function (file) {
        file.errorType = messagesMap[file.error];
      });
      _self.fileuploadprocessfail(e, data);
    }).on("fileuploadprocessdone", function (e, data) {
      if (_self.autoUpload) {
        data.submit();
      }
    }).on("fileuploadadd", function (e, data) {
      _self.files = data.files;
      _self.fileName = data.files[0].name;
      if (typeof data.files[0].size != "undefined") {
        _self.fileSize = "(" + _self.formatFileSize(data.files[0].size) + ")";
      } else {
        _self.fileSize = "";
      }
      _self.showInfo = true;
      _self.data = data;

      _self.fileuploadadd(e, data);
    }).on("fileuploadsubmit", function (e, data) {
      data.formData = _self.formData;
    }).on("fileuploadsend", function (e, data) {
      /* ... */
    }).on("fileuploaddone", function (e, data) {
      if (_self.hide) {
        _self.cancel();
      }
      _self.fileuploaddone(e, data);
    }).on("fileuploadfail", function (e, data) {
      _self.fileuploadfail(e, data);
    }).on("fileuploadalways", function (e, data) {
      /* ... */
    }).on("fileuploadprogress", function (e, data) {
      /* ... */
    }).on("fileuploadprogressall", function (e, data) {
      /* ... */
    }).on("fileuploadstart", function (e) {
      _self.fileuploadstart(e);
    }).on("fileuploadstop", function (e) {
      /* ... */
    }).on("fileuploadchange", function (e, data) {
      /* ... */
    }).on("fileuploadpaste", function (e, data) {
      /* ... */
    }).on("fileuploaddrop", function (e, data) {
      /* ... */
    }).on("fileuploaddragover", function (e) {
      /* ... */
    }).on("fileuploadchunksend", function (e, data) {
      /* ... */
    }).on("fileuploadchunkdone", function (e, data) {
      /* ... */
    }).on("fileuploadchunkfail", function (e, data) {
      /* ... */
    }).on("fileuploadchunkalways", function (e, data) {
      /* ... */
    });
  }
};

TmVueUpload$1.install = function (V, options) {
    V.component(TmVueUpload$1.name, TmVueUpload$1);
};

(function ($) {
  $.fn.caret = function (pos) {
    var target = this[0];
    var isContentEditable = target && target.contentEditable === 'true';
    if (arguments.length == 0) {
      //get
      if (target) {
        //HTML5
        if (window.getSelection) {
          //contenteditable
          if (isContentEditable) {
            target.focus();
            var range1 = window.getSelection().getRangeAt(0),
                range2 = range1.cloneRange();
            range2.selectNodeContents(target);
            range2.setEnd(range1.endContainer, range1.endOffset);
            return range2.toString().length;
          }
          //textarea
          return target.selectionStart;
        }
        //IE<9
        if (document.selection) {
          target.focus();
          //contenteditable
          if (isContentEditable) {
            var range1 = document.selection.createRange(),
                range2 = document.body.createTextRange();
            range2.moveToElementText(target);
            range2.setEndPoint('EndToEnd', range1);
            return range2.text.length;
          }
          //textarea
          var pos = 0,
              range = target.createTextRange(),
              range2 = document.selection.createRange().duplicate(),
              bookmark = range2.getBookmark();
          range.moveToBookmark(bookmark);
          while (range.moveStart('character', -1) !== 0) {
            pos++;
          }return pos;
        }
        // Addition for jsdom support
        if (target.selectionStart) return target.selectionStart;
      }
      //not supported
      return;
    }
    //set
    if (target) {
      if (pos == -1) pos = this[isContentEditable ? 'text' : 'val']().length;
      //HTML5
      if (window.getSelection) {
        //contenteditable
        if (isContentEditable) {
          target.focus();
          window.getSelection().collapse(target.firstChild, pos);
        }
        //textarea
        else target.setSelectionRange(pos, pos);
      }
      //IE<9
      else if (document.body.createTextRange) {
          if (isContentEditable) {
            var range = document.body.createTextRange();
            range.moveToElementText(target);
            range.moveStart('character', pos);
            range.collapse(true);
            range.select();
          } else {
            var range = target.createTextRange();
            range.move('character', pos);
            range.select();
          }
        }
      if (!isContentEditable) target.focus();
    }
    return this;
  };
})(jQuery);

/*
	jQuery tagEditor v1.0.21
    Copyright (c) 2014 Simon Steinberger / Pixabay
    GitHub: https://github.com/Pixabay/jQuery-tagEditor
	License: http://www.opensource.org/licenses/mit-license.php
*/

(function ($) {
    // auto grow input (stackoverflow.com/questions/931207)
    $.fn.tagEditorInput = function () {
        var t = " ",
            e = $(this),
            n = parseInt(e.css("fontSize")),
            i = $("<span/>").css({ position: "absolute", top: -9999, left: -9999, width: "auto", fontSize: e.css("fontSize"), fontFamily: e.css("fontFamily"), fontWeight: e.css("fontWeight"), letterSpacing: e.css("letterSpacing"), whiteSpace: "nowrap" }),
            s = function s() {
            if (t !== (t = e.val())) {
                i.text(t);var s = i.width() + n;20 > s && (s = 20), s != e.width() && e.width(s);
            }
        };return i.insertAfter(e), e.bind("keyup keydown focus", s);
    };

    // plugin with val as parameter for public methods
    $.fn.tagEditor = function (options, val, blur) {

        // helper
        function escape(tag) {
            return tag.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
        }

        // build options dictionary with default values
        var blur_result,
            o = $.extend({}, $.fn.tagEditor.defaults, options),
            selector = this;

        // store regex and default delimiter in options for later use
        o.dregex = new RegExp('[' + o.delimiter.replace('-', '\-') + ']', 'g');

        // public methods
        if (typeof options == 'string') {
            // depending on selector, response may contain tag lists of multiple editor instances
            var response = [];
            selector.each(function () {
                // the editor is the next sibling to the hidden, original field
                var el = $(this),
                    o = el.data('options'),
                    ed = el.next('.tag-editor');
                if (options == 'getTags') response.push({ field: el[0], editor: ed, tags: ed.data('tags') });else if (options == 'addTag') {
                    if (o.maxTags && ed.data('tags').length >= o.maxTags) return false;
                    // insert new tag
                    $('<li><div class="tag-editor-spacer">&nbsp;' + o.delimiter[0] + '</div><div class="tag-editor-tag"></div><div class="tag-editor-delete"><i></i></div></li>').appendTo(ed).find('.tag-editor-tag').html('<input type="text" maxlength="' + o.maxLength + '">').addClass('active').find('input').val(val).blur();
                    if (!blur) ed.click();else $('.placeholder', ed).remove();
                } else if (options == 'removeTag') {
                    // trigger delete on matching tag, then click editor to create a new tag
                    $('.tag-editor-tag', ed).filter(function () {
                        return $(this).text() == val;
                    }).closest('li').find('.tag-editor-delete').click();
                    if (!blur) ed.click();
                } else if (options == 'destroy') {
                    el.removeClass('tag-editor-hidden-src').removeData('options').off('focus.tag-editor').next('.tag-editor').remove();
                }
            });
            return options == 'getTags' ? response : this;
        }

        // delete selected tags on backspace, delete, ctrl+x
        if (window.getSelection) $(document).off('keydown.tag-editor').on('keydown.tag-editor', function (e) {
            if (e.which == 8 || e.which == 46 || e.ctrlKey && e.which == 88) {
                try {
                    var sel = getSelection(),
                        el = document.activeElement.tagName != 'INPUT' ? $(sel.getRangeAt(0).startContainer.parentNode).closest('.tag-editor') : 0;
                } catch (e) {
                    el = 0;
                }
                if (sel.rangeCount > 0 && el && el.length) {
                    var tags = [],
                        splits = sel.toString().split(el.prev().data('options').dregex);
                    for (i = 0; i < splits.length; i++) {
                        var tag = $.trim(splits[i]);if (tag) tags.push(tag);
                    }
                    $('.tag-editor-tag', el).each(function () {
                        if (~$.inArray($(this).text(), tags)) $(this).closest('li').find('.tag-editor-delete').click();
                    });
                    return false;
                }
            }
        });

        return selector.each(function () {
            var el = $(this),
                tag_list = []; // cache current tags

            // create editor (ed) instance
            var ed = $('<ul ' + (o.clickDelete ? 'oncontextmenu="return false;" ' : '') + 'class="tag-editor"></ul>').insertAfter(el);
            el.addClass('tag-editor-hidden-src') // hide original field
            .data('options', o) // set data on hidden field
            .on('focus.tag-editor', function () {
                ed.click();
            }); // simulate tabindex

            // add dummy item for min-height on empty editor
            ed.append('<li style="width:1px">&nbsp;</li>');

            // markup for new tag
            var new_tag = '<li><div class="tag-editor-spacer">&nbsp;' + o.delimiter[0] + '</div><div class="tag-editor-tag"></div><div class="tag-editor-delete"><i></i></div></li>';

            // helper: update global data
            function set_placeholder() {
                if (o.placeholder && !tag_list.length && !$('.deleted, .placeholder, input', ed).length) ed.append('<li class="placeholder"><div>' + o.placeholder + '</div></li>');
            }

            // helper: update global data
            function update_globals(init) {
                var old_tags = tag_list.toString();
                tag_list = $('.tag-editor-tag:not(.deleted)', ed).map(function (i, e) {
                    var val = $.trim($(this).hasClass('active') ? $(this).find('input').val() : $(e).text());
                    if (val) return val;
                }).get();
                ed.data('tags', tag_list);
                el.val(tag_list.join(o.delimiter[0]));
                // change callback except for plugin init
                if (!init) if (old_tags != tag_list.toString()) o.onChange(el, ed, tag_list);
                set_placeholder();
            }

            ed.click(function (e, closest_tag) {
                var d,
                    dist = 99999,
                    loc;

                // do not create tag when user selects tags by text selection
                if (window.getSelection && getSelection() != '') return;

                if (o.maxTags && ed.data('tags').length >= o.maxTags) {
                    ed.find('input').blur();return false;
                }

                blur_result = true;
                $('input:focus', ed).blur();
                if (!blur_result) return false;
                blur_result = true;

                // always remove placeholder on click
                $('.placeholder', ed).remove();
                if (closest_tag && closest_tag.length) loc = 'before';else {
                    // calculate tag closest to click position
                    $('.tag-editor-tag', ed).each(function () {
                        var tag = $(this),
                            to = tag.offset(),
                            tag_x = to.left,
                            tag_y = to.top;
                        if (e.pageY >= tag_y && e.pageY <= tag_y + tag.height()) {
                            if (e.pageX < tag_x) loc = 'before', d = tag_x - e.pageX;else loc = 'after', d = e.pageX - tag_x - tag.width();
                            if (d < dist) dist = d, closest_tag = tag;
                        }
                    });
                }

                if (loc == 'before') {
                    $(new_tag).insertBefore(closest_tag.closest('li')).find('.tag-editor-tag').click();
                } else if (loc == 'after') $(new_tag).insertAfter(closest_tag.closest('li')).find('.tag-editor-tag').click();else // empty editor
                    $(new_tag).appendTo(ed).find('.tag-editor-tag').click();
                return false;
            });

            ed.on('click', '.tag-editor-delete', function (e) {
                // delete icon is hidden when input is visible; place cursor near invisible delete icon on click
                if ($(this).prev().hasClass('active')) {
                    $(this).closest('li').find('input').caret(-1);return false;
                }

                var li = $(this).closest('li'),
                    tag = li.find('.tag-editor-tag');
                if (o.beforeTagDelete(el, ed, tag_list, tag.text()) === false) return false;
                tag.addClass('deleted').animate({ width: 0 }, o.animateDelete, function () {
                    li.remove();set_placeholder();
                });
                update_globals();
                return false;
            });

            // delete on right mouse click or ctrl+click
            if (o.clickDelete) ed.on('mousedown', '.tag-editor-tag', function (e) {
                if (e.ctrlKey || e.which > 1) {
                    var li = $(this).closest('li'),
                        tag = li.find('.tag-editor-tag');
                    if (o.beforeTagDelete(el, ed, tag_list, tag.text()) === false) return false;
                    tag.addClass('deleted').animate({ width: 0 }, o.animateDelete, function () {
                        li.remove();set_placeholder();
                    });
                    update_globals();
                    return false;
                }
            });

            ed.on('click', '.tag-editor-tag', function (e) {
                // delete on right click or ctrl+click -> exit
                if (o.clickDelete && (e.ctrlKey || e.which > 1)) return false;

                if (!$(this).hasClass('active')) {
                    var tag = $(this).text();
                    // guess cursor position in text input
                    var left_percent = Math.abs(($(this).offset().left - e.pageX) / $(this).width()),
                        caret_pos = parseInt(tag.length * left_percent),
                        input = $(this).html('<input type="text" maxlength="' + o.maxLength + '" value="' + escape(tag) + '">').addClass('active').find('input');
                    input.data('old_tag', tag).tagEditorInput().focus().caret(caret_pos);
                    if (o.autocomplete) {
                        var aco = $.extend({}, o.autocomplete);
                        // extend user provided autocomplete select method
                        var ac_select = 'select' in aco ? o.autocomplete.select : '';
                        aco.select = function (e, ui) {
                            if (ac_select) ac_select(e, ui);setTimeout(function () {
                                ed.trigger('click', [$('.active', ed).find('input').closest('li').next('li').find('.tag-editor-tag')]);
                            }, 20);
                        };
                        input.autocomplete(aco);
                    }
                }
                return false;
            });

            // helper: split into multiple tags, e.g. after paste
            function split_cleanup(input) {
                var li = input.closest('li'),
                    sub_tags = input.val().replace(/ +/, ' ').split(o.dregex),
                    old_tag = input.data('old_tag'),
                    old_tags = tag_list.slice(0),
                    exceeded = false,
                    cb_val; // copy tag_list
                for (var i = 0; i < sub_tags.length; i++) {
                    tag = $.trim(sub_tags[i]).slice(0, o.maxLength);
                    if (o.forceLowercase) tag = tag.toLowerCase();
                    cb_val = o.beforeTagSave(el, ed, old_tags, old_tag, tag);
                    tag = cb_val || tag;
                    if (cb_val === false || !tag) continue;
                    // remove duplicates
                    if (o.removeDuplicates && ~$.inArray(tag, old_tags)) $('.tag-editor-tag', ed).each(function () {
                        if ($(this).text() == tag) $(this).closest('li').remove();
                    });
                    old_tags.push(tag);
                    li.before('<li><div class="tag-editor-spacer">&nbsp;' + o.delimiter[0] + '</div><div class="tag-editor-tag">' + escape(tag) + '</div><div class="tag-editor-delete"><i></i></div></li>');
                    if (o.maxTags && old_tags.length >= o.maxTags) {
                        exceeded = true;break;
                    }
                }
                input.attr('maxlength', o.maxLength).removeData('old_tag').val('');
                if (exceeded) input.blur();else input.focus();
                update_globals();
            }

            ed.on('blur', 'input', function (e) {
                e.stopPropagation();
                var input = $(this),
                    old_tag = input.data('old_tag'),
                    tag = $.trim(input.val().replace(/ +/, ' ').replace(o.dregex, o.delimiter[0])),
                    cb_val;
                if (!tag) {
                    if (old_tag && o.beforeTagDelete(el, ed, tag_list, old_tag) === false) {
                        input.val(old_tag).focus();
                        blur_result = false;
                        update_globals();
                        return;
                    }
                    try {
                        input.closest('li').remove();
                    } catch (e) {}
                    if (old_tag) update_globals();
                } else if (tag.indexOf(o.delimiter[0]) >= 0) {
                    split_cleanup(input);return;
                } else if (tag != old_tag) {
                    if (o.forceLowercase) tag = tag.toLowerCase();
                    cb_val = o.beforeTagSave(el, ed, tag_list, old_tag, tag);
                    tag = cb_val || tag;
                    if (cb_val === false) {
                        if (old_tag) {
                            input.val(old_tag).focus();
                            blur_result = false;
                            update_globals();
                            return;
                        }
                        try {
                            input.closest('li').remove();
                        } catch (e) {}
                        if (old_tag) update_globals();
                    }
                    // remove duplicates
                    else if (o.removeDuplicates) $('.tag-editor-tag:not(.active)', ed).each(function () {
                            if ($(this).text() == tag) $(this).closest('li').remove();
                        });
                }
                input.parent().html(escape(tag)).removeClass('active');
                if (tag != old_tag) update_globals();
                set_placeholder();
            });

            var pasted_content;
            ed.on('paste', 'input', function (e) {
                $(this).removeAttr('maxlength');
                pasted_content = $(this);
                setTimeout(function () {
                    split_cleanup(pasted_content);
                }, 30);
            });

            // keypress delimiter
            var inp;
            ed.on('keypress', 'input', function (e) {
                if (o.delimiter.indexOf(String.fromCharCode(e.which)) >= 0) {
                    inp = $(this);
                    setTimeout(function () {
                        split_cleanup(inp);
                    }, 20);
                }
            });

            ed.on('keydown', 'input', function (e) {
                var $t = $(this);

                // left/up key + backspace key on empty field
                if ((e.which == 37 || !o.autocomplete && e.which == 38) && !$t.caret() || e.which == 8 && !$t.val()) {
                    var prev_tag = $t.closest('li').prev('li').find('.tag-editor-tag');
                    if (prev_tag.length) prev_tag.click().find('input').caret(-1);else if ($t.val() && !(o.maxTags && ed.data('tags').length >= o.maxTags)) $(new_tag).insertBefore($t.closest('li')).find('.tag-editor-tag').click();
                    return false;
                }
                // right/down key
                else if ((e.which == 39 || !o.autocomplete && e.which == 40) && $t.caret() == $t.val().length) {
                        var next_tag = $t.closest('li').next('li').find('.tag-editor-tag');
                        if (next_tag.length) next_tag.click().find('input').caret(0);else if ($t.val()) ed.click();
                        return false;
                    }
                    // tab key
                    else if (e.which == 9) {
                            // shift+tab
                            if (e.shiftKey) {
                                var prev_tag = $t.closest('li').prev('li').find('.tag-editor-tag');
                                if (prev_tag.length) prev_tag.click().find('input').caret(0);else if ($t.val() && !(o.maxTags && ed.data('tags').length >= o.maxTags)) $(new_tag).insertBefore($t.closest('li')).find('.tag-editor-tag').click();
                                // allow tabbing to previous element
                                else {
                                        el.attr('disabled', 'disabled');
                                        setTimeout(function () {
                                            el.removeAttr('disabled');
                                        }, 30);
                                        return;
                                    }
                                return false;
                                // tab
                            } else {
                                var next_tag = $t.closest('li').next('li').find('.tag-editor-tag');
                                if (next_tag.length) next_tag.click().find('input').caret(0);else if ($t.val()) ed.click();else return; // allow tabbing to next element
                                return false;
                            }
                        }
                        // del key
                        else if (e.which == 46 && (!$.trim($t.val()) || $t.caret() == $t.val().length)) {
                                var next_tag = $t.closest('li').next('li').find('.tag-editor-tag');
                                if (next_tag.length) next_tag.click().find('input').caret(0);else if ($t.val()) ed.click();
                                return false;
                            }
                            // enter key
                            else if (e.which == 13) {
                                    ed.trigger('click', [$t.closest('li').next('li').find('.tag-editor-tag')]);

                                    // trigger blur if maxTags limit is reached
                                    if (o.maxTags && ed.data('tags').length >= o.maxTags) ed.find('input').blur();

                                    return false;
                                }
                                // pos1
                                else if (e.which == 36 && !$t.caret()) ed.find('.tag-editor-tag').first().click();
                                    // end
                                    else if (e.which == 35 && $t.caret() == $t.val().length) ed.find('.tag-editor-tag').last().click();
                                        // esc
                                        else if (e.which == 27) {
                                                $t.val($t.data('old_tag') ? $t.data('old_tag') : '').blur();
                                                return false;
                                            }
            });

            // create initial tags
            var tags = o.initialTags.length ? o.initialTags : el.val().split(o.dregex);
            for (var i = 0; i < tags.length; i++) {
                if (o.maxTags && i >= o.maxTags) break;
                var tag = $.trim(tags[i].replace(/ +/, ' '));
                if (tag) {
                    if (o.forceLowercase) tag = tag.toLowerCase();
                    tag_list.push(tag);
                    ed.append('<li><div class="tag-editor-spacer">&nbsp;' + o.delimiter[0] + '</div><div class="tag-editor-tag">' + escape(tag) + '</div><div class="tag-editor-delete"><i></i></div></li>');
                }
            }
            update_globals(true); // true -> no onChange callback

            // init sortable
            if (o.sortable && $.fn.sortable) ed.sortable({
                distance: 5, cancel: '.tag-editor-spacer, input', helper: 'clone',
                update: function update() {
                    update_globals();
                }
            });
        });
    };

    $.fn.tagEditor.defaults = {
        initialTags: [],
        maxTags: 0,
        maxLength: 50,
        delimiter: ',;',
        placeholder: '',
        forceLowercase: true,
        removeDuplicates: true,
        clickDelete: false,
        animateDelete: 175,
        sortable: true, // jQuery UI sortable
        autocomplete: null, // options dict for jQuery UI autocomplete

        // callbacks
        onChange: function onChange() {},
        beforeTagSave: function beforeTagSave() {},
        beforeTagDelete: function beforeTagDelete() {}
    };
})(jQuery);

function MaskIt(obj) {
  var hoverdiv = '<div class="divMask" style="position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; background: #fff; opacity: 0; filter: alpha(opacity=0);z-index:5;cursor:not-allowed;"></div>';
  $(obj).wrap('<div style="position:relative;"></div>');
  $(obj).before(hoverdiv);
  $(obj).data("mask", true);
}
function UnMaskIt(obj) {
  if ($(obj).data("mask") == true) {
    $(obj).parent().find(".divMask").remove();
    $(obj).unwrap();
    $(obj).data("mask", false);
  }
  $(obj).data("mask", false);
}
var TmVueTag$1 = { template: "<input type=\"text\">",
  name: "TmVueTag",
  props: {
    value: {
      type: [String, Array],
      default: ""
    },
    delimiter: {
      type: String,
      default: ", "
    },
    placeholder: {
      type: String,
      default: "Enter tags ..."
    },
    forceLowercase: {
      type: Boolean,
      default: false
    },
    removeDuplicates: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    init: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    initialTags: function initialTags() {
      return this.value;
    }
  },
  watch: {
    disabled: function disabled(_disabled) {
      if (_disabled) {
        MaskIt(this.nextSibling);
        // $(this.$el.nextSibling).addClass("disabled");
      } else {
        UnMaskIt(this.nextSibling);
        // $(this.$el.nextSibling).removeClass("disabled");
      }
    },
    init: function init() {
      var _self = this;
      $(this.$el).tagEditor({
        initialTags: _.isEmpty(this.initialTags) ? [] : this.initialTags.split(this.delimiter),
        delimiter: this.delimiter /* space and comma */
        , placeholder: this.placeholder,
        forceLowercase: this.forceLowercase,
        removeDuplicates: this.removeDuplicates,
        animateDelete: 0,
        sortable: false,
        beforeTagSave: function beforeTagSave(field, editor, tags, val) {
          editor.find(".tag-editor-tag").scrollLeft(0);
        },
        onChange: function onChange(field, editor, tags) {
          _self.value = tags.join(_self.delimiter);
          _self.$emit("input", _self.value);
          $(".tag-editor-delete").html("<span class='icon icon-cancel'></span>");
        }
      });
      // tag editor patch
      this.$el.nextSibling.firstChild.remove();
      this.nextSibling = this.$el.nextSibling;
      if (this.disabled) {
        this.nextSibling = this.$el.nextSibling;
        MaskIt(this.nextSibling);
        // $(this.$el.nextSibling).addClass("disabled");
      } else {
        UnMaskIt(this.nextSibling);
        // $(this.$el.nextSibling).removeClass("disabled");
      }
      $(".tag-editor-delete").html("<span class='icon icon-cancel'></span>");
    }
  }
};

TmVueTag$1.install = function (V, options) {
    V.component(TmVueTag$1.name, TmVueTag$1);
};

function select(element) {
    var selectedText;

    if (element.nodeName === 'SELECT') {
        element.focus();

        selectedText = element.value;
    } else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
        var isReadOnly = element.hasAttribute('readonly');

        if (!isReadOnly) {
            element.setAttribute('readonly', '');
        }

        element.select();
        element.setSelectionRange(0, element.value.length);

        if (!isReadOnly) {
            element.removeAttribute('readonly');
        }

        selectedText = element.value;
    } else {
        if (element.hasAttribute('contenteditable')) {
            element.focus();
        }

        var selection = window.getSelection();
        var range = document.createRange();

        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);

        selectedText = selection.toString();
    }

    return selectedText;
}

var select_1 = select;

var clipboardAction = createCommonjsModule(function (module, exports) {
    (function (global, factory) {
        if (typeof undefined === "function" && undefined.amd) {
            undefined(['module', 'select'], factory);
        } else {
            factory(module, select_1);
        }
    })(commonjsGlobal, function (module, _select) {
        var _select2 = _interopRequireDefault(_select);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }

        var _typeof$$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
            return typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
        } : function (obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
        };

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        var ClipboardAction = function () {
            /**
             * @param {Object} options
             */
            function ClipboardAction(options) {
                _classCallCheck(this, ClipboardAction);

                this.resolveOptions(options);
                this.initSelection();
            }

            /**
             * Defines base properties passed from constructor.
             * @param {Object} options
             */

            _createClass(ClipboardAction, [{
                key: 'resolveOptions',
                value: function resolveOptions() {
                    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                    this.action = options.action;
                    this.container = options.container;
                    this.emitter = options.emitter;
                    this.target = options.target;
                    this.text = options.text;
                    this.trigger = options.trigger;

                    this.selectedText = '';
                }
            }, {
                key: 'initSelection',
                value: function initSelection() {
                    if (this.text) {
                        this.selectFake();
                    } else if (this.target) {
                        this.selectTarget();
                    }
                }
            }, {
                key: 'selectFake',
                value: function selectFake() {
                    var _this = this;

                    var isRTL = document.documentElement.getAttribute('dir') == 'rtl';

                    this.removeFake();

                    this.fakeHandlerCallback = function () {
                        return _this.removeFake();
                    };
                    this.fakeHandler = this.container.addEventListener('click', this.fakeHandlerCallback) || true;

                    this.fakeElem = document.createElement('textarea');
                    // Prevent zooming on iOS
                    this.fakeElem.style.fontSize = '12pt';
                    // Reset box model
                    this.fakeElem.style.border = '0';
                    this.fakeElem.style.padding = '0';
                    this.fakeElem.style.margin = '0';
                    // Move element out of screen horizontally
                    this.fakeElem.style.position = 'absolute';
                    this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
                    // Move element to the same position vertically
                    var yPosition = window.pageYOffset || document.documentElement.scrollTop;
                    this.fakeElem.style.top = yPosition + 'px';

                    this.fakeElem.setAttribute('readonly', '');
                    this.fakeElem.value = this.text;

                    this.container.appendChild(this.fakeElem);

                    this.selectedText = (0, _select2.default)(this.fakeElem);
                    this.copyText();
                }
            }, {
                key: 'removeFake',
                value: function removeFake() {
                    if (this.fakeHandler) {
                        this.container.removeEventListener('click', this.fakeHandlerCallback);
                        this.fakeHandler = null;
                        this.fakeHandlerCallback = null;
                    }

                    if (this.fakeElem) {
                        this.container.removeChild(this.fakeElem);
                        this.fakeElem = null;
                    }
                }
            }, {
                key: 'selectTarget',
                value: function selectTarget() {
                    this.selectedText = (0, _select2.default)(this.target);
                    this.copyText();
                }
            }, {
                key: 'copyText',
                value: function copyText() {
                    var succeeded = void 0;

                    try {
                        succeeded = document.execCommand(this.action);
                    } catch (err) {
                        succeeded = false;
                    }

                    this.handleResult(succeeded);
                }
            }, {
                key: 'handleResult',
                value: function handleResult(succeeded) {
                    this.emitter.emit(succeeded ? 'success' : 'error', {
                        action: this.action,
                        text: this.selectedText,
                        trigger: this.trigger,
                        clearSelection: this.clearSelection.bind(this)
                    });
                }
            }, {
                key: 'clearSelection',
                value: function clearSelection() {
                    if (this.trigger) {
                        this.trigger.focus();
                    }

                    window.getSelection().removeAllRanges();
                }
            }, {
                key: 'destroy',
                value: function destroy() {
                    this.removeFake();
                }
            }, {
                key: 'action',
                set: function set$$1() {
                    var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'copy';

                    this._action = action;

                    if (this._action !== 'copy' && this._action !== 'cut') {
                        throw new Error('Invalid "action" value, use either "copy" or "cut"');
                    }
                },
                get: function get$$1() {
                    return this._action;
                }
            }, {
                key: 'target',
                set: function set$$1(target) {
                    if (target !== undefined) {
                        if (target && (typeof target === 'undefined' ? 'undefined' : _typeof$$1(target)) === 'object' && target.nodeType === 1) {
                            if (this.action === 'copy' && target.hasAttribute('disabled')) {
                                throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                            }

                            if (this.action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
                                throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                            }

                            this._target = target;
                        } else {
                            throw new Error('Invalid "target" value, use a valid Element');
                        }
                    }
                },
                get: function get$$1() {
                    return this._target;
                }
            }]);

            return ClipboardAction;
        }();

        module.exports = ClipboardAction;
    });
});

unwrapExports(clipboardAction);

function E() {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function on(name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function once(name, callback, ctx) {
    var self = this;
    function listener() {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    }

    listener._ = callback;
    return this.on(name, listener, ctx);
  },

  emit: function emit(name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function off(name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback) liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    liveEvents.length ? e[name] = liveEvents : delete e[name];

    return this;
  }
};

var tinyEmitter = E;

var is = createCommonjsModule(function (module, exports) {
  /**
   * Check if argument is a HTML element.
   *
   * @param {Object} value
   * @return {Boolean}
   */
  exports.node = function (value) {
    return value !== undefined && value instanceof HTMLElement && value.nodeType === 1;
  };

  /**
   * Check if argument is a list of HTML elements.
   *
   * @param {Object} value
   * @return {Boolean}
   */
  exports.nodeList = function (value) {
    var type = Object.prototype.toString.call(value);

    return value !== undefined && (type === '[object NodeList]' || type === '[object HTMLCollection]') && 'length' in value && (value.length === 0 || exports.node(value[0]));
  };

  /**
   * Check if argument is a string.
   *
   * @param {Object} value
   * @return {Boolean}
   */
  exports.string = function (value) {
    return typeof value === 'string' || value instanceof String;
  };

  /**
   * Check if argument is a function.
   *
   * @param {Object} value
   * @return {Boolean}
   */
  exports.fn = function (value) {
    var type = Object.prototype.toString.call(value);

    return type === '[object Function]';
  };
});

var is_1 = is.node;
var is_2 = is.nodeList;
var is_3 = is.string;
var is_4 = is.fn;

var DOCUMENT_NODE_TYPE = 9;

/**
 * A polyfill for Element.matches()
 */
if (typeof Element !== 'undefined' && !Element.prototype.matches) {
    var proto = Element.prototype;

    proto.matches = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector;
}

/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Function}
 */
function closest(element, selector) {
    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
        if (typeof element.matches === 'function' && element.matches(selector)) {
            return element;
        }
        element = element.parentNode;
    }
}

var closest_1 = closest;

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function _delegate(element, selector, type, callback, useCapture) {
    var listenerFn = listener.apply(this, arguments);

    element.addEventListener(type, listenerFn, useCapture);

    return {
        destroy: function destroy() {
            element.removeEventListener(type, listenerFn, useCapture);
        }
    };
}

/**
 * Delegates event to a selector.
 *
 * @param {Element|String|Array} [elements]
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function delegate(elements, selector, type, callback, useCapture) {
    // Handle the regular Element usage
    if (typeof elements.addEventListener === 'function') {
        return _delegate.apply(null, arguments);
    }

    // Handle Element-less usage, it defaults to global delegation
    if (typeof type === 'function') {
        // Use `document` as the first parameter, then apply arguments
        // This is a short way to .unshift `arguments` without running into deoptimizations
        return _delegate.bind(null, document).apply(null, arguments);
    }

    // Handle Selector-based usage
    if (typeof elements === 'string') {
        elements = document.querySelectorAll(elements);
    }

    // Handle Array-like based usage
    return Array.prototype.map.call(elements, function (element) {
        return _delegate(element, selector, type, callback, useCapture);
    });
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
    return function (e) {
        e.delegateTarget = closest_1(e.target, selector);

        if (e.delegateTarget) {
            callback.call(element, e);
        }
    };
}

var delegate_1 = delegate;

/**
 * Validates all params and calls the right
 * listener function based on its target type.
 *
 * @param {String|HTMLElement|HTMLCollection|NodeList} target
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listen(target, type, callback) {
    if (!target && !type && !callback) {
        throw new Error('Missing required arguments');
    }

    if (!is.string(type)) {
        throw new TypeError('Second argument must be a String');
    }

    if (!is.fn(callback)) {
        throw new TypeError('Third argument must be a Function');
    }

    if (is.node(target)) {
        return listenNode(target, type, callback);
    } else if (is.nodeList(target)) {
        return listenNodeList(target, type, callback);
    } else if (is.string(target)) {
        return listenSelector(target, type, callback);
    } else {
        throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
    }
}

/**
 * Adds an event listener to a HTML element
 * and returns a remove listener function.
 *
 * @param {HTMLElement} node
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNode(node, type, callback) {
    node.addEventListener(type, callback);

    return {
        destroy: function destroy() {
            node.removeEventListener(type, callback);
        }
    };
}

/**
 * Add an event listener to a list of HTML elements
 * and returns a remove listener function.
 *
 * @param {NodeList|HTMLCollection} nodeList
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNodeList(nodeList, type, callback) {
    Array.prototype.forEach.call(nodeList, function (node) {
        node.addEventListener(type, callback);
    });

    return {
        destroy: function destroy() {
            Array.prototype.forEach.call(nodeList, function (node) {
                node.removeEventListener(type, callback);
            });
        }
    };
}

/**
 * Add an event listener to a selector
 * and returns a remove listener function.
 *
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenSelector(selector, type, callback) {
    return delegate_1(document.body, selector, type, callback);
}

var listen_1 = listen;

var clipboard = createCommonjsModule(function (module, exports) {
    (function (global, factory) {
        if (typeof undefined === "function" && undefined.amd) {
            undefined(['module', './clipboard-action', 'tiny-emitter', 'good-listener'], factory);
        } else {
            factory(module, clipboardAction, tinyEmitter, listen_1);
        }
    })(commonjsGlobal, function (module, _clipboardAction, _tinyEmitter, _goodListener) {
        var _clipboardAction2 = _interopRequireDefault(_clipboardAction);

        var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

        var _goodListener2 = _interopRequireDefault(_goodListener);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }

        var _typeof$$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
            return typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
        } : function (obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
        };

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }

            return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
            }

            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var Clipboard = function (_Emitter) {
            _inherits(Clipboard, _Emitter);

            /**
             * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
             * @param {Object} options
             */
            function Clipboard(trigger, options) {
                _classCallCheck(this, Clipboard);

                var _this = _possibleConstructorReturn(this, (Clipboard.__proto__ || Object.getPrototypeOf(Clipboard)).call(this));

                _this.resolveOptions(options);
                _this.listenClick(trigger);
                return _this;
            }

            /**
             * Defines if attributes would be resolved using internal setter functions
             * or custom functions that were passed in the constructor.
             * @param {Object} options
             */

            _createClass(Clipboard, [{
                key: 'resolveOptions',
                value: function resolveOptions() {
                    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                    this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
                    this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
                    this.text = typeof options.text === 'function' ? options.text : this.defaultText;
                    this.container = _typeof$$1(options.container) === 'object' ? options.container : document.body;
                }
            }, {
                key: 'listenClick',
                value: function listenClick(trigger) {
                    var _this2 = this;

                    this.listener = (0, _goodListener2.default)(trigger, 'click', function (e) {
                        return _this2.onClick(e);
                    });
                }
            }, {
                key: 'onClick',
                value: function onClick(e) {
                    var trigger = e.delegateTarget || e.currentTarget;

                    if (this.clipboardAction) {
                        this.clipboardAction = null;
                    }

                    this.clipboardAction = new _clipboardAction2.default({
                        action: this.action(trigger),
                        target: this.target(trigger),
                        text: this.text(trigger),
                        container: this.container,
                        trigger: trigger,
                        emitter: this
                    });
                }
            }, {
                key: 'defaultAction',
                value: function defaultAction(trigger) {
                    return getAttributeValue('action', trigger);
                }
            }, {
                key: 'defaultTarget',
                value: function defaultTarget(trigger) {
                    var selector = getAttributeValue('target', trigger);

                    if (selector) {
                        return document.querySelector(selector);
                    }
                }
            }, {
                key: 'defaultText',
                value: function defaultText(trigger) {
                    return getAttributeValue('text', trigger);
                }
            }, {
                key: 'destroy',
                value: function destroy() {
                    this.listener.destroy();

                    if (this.clipboardAction) {
                        this.clipboardAction.destroy();
                        this.clipboardAction = null;
                    }
                }
            }], [{
                key: 'isSupported',
                value: function isSupported() {
                    var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['copy', 'cut'];

                    var actions = typeof action === 'string' ? [action] : action;
                    var support = !!document.queryCommandSupported;

                    actions.forEach(function (action) {
                        support = support && !!document.queryCommandSupported(action);
                    });

                    return support;
                }
            }]);

            return Clipboard;
        }(_tinyEmitter2.default);

        /**
         * Helper function to retrieve attribute value.
         * @param {String} suffix
         * @param {Element} element
         */
        function getAttributeValue(suffix, element) {
            var attribute = 'data-clipboard-' + suffix;

            if (!element.hasAttribute(attribute)) {
                return;
            }

            return element.getAttribute(attribute);
        }

        module.exports = Clipboard;
    });
});

var Clipboard = unwrapExports(clipboard);

var VueClipboard = {
  install: function install(Vue$$1) {
    Vue$$1.prototype.$copyText = function (_text) {
      return new Promise(function (resolve, reject) {
        var fake_el = document.createElement('button');
        var clipboard$$1 = new Clipboard(fake_el, {
          text: function text() {
            return _text;
          },
          action: function action() {
            return 'copy';
          }
        });
        clipboard$$1.on('success', function (e) {
          clipboard$$1.destroy();
          resolve(e);
        });
        clipboard$$1.on('error', function (e) {
          clipboard$$1.destroy();
          reject(e);
        });
        fake_el.click();
      });
    };

    Vue$$1.directive('clipboard', {
      bind: function bind(el, binding, vnode) {
        if (binding.arg === 'success') {
          el._v_clipboard_success = binding.value;
        } else if (binding.arg === 'error') {
          el._v_clipboard_error = binding.value;
        } else {
          var clipboard$$1 = new Clipboard(el, {
            text: function text() {
              return binding.value;
            },
            action: function action() {
              return binding.arg === 'cut' ? 'cut' : 'copy';
            }
          });
          clipboard$$1.on('success', function (e) {
            var callback = el._v_clipboard_success;
            callback && callback(e);
          });
          clipboard$$1.on('error', function (e) {
            var callback = el._v_clipboard_error;
            callback && callback(e);
          });
          el._v_clipboard = clipboard$$1;
        }
      },
      update: function update(el, binding) {
        if (binding.arg === 'success') {
          el._v_clipboard_success = binding.value;
        } else if (binding.arg === 'error') {
          el._v_clipboard_error = binding.value;
        } else {
          el._v_clipboard.text = function () {
            return binding.value;
          };
          el._v_clipboard.action = function () {
            return binding.arg === 'cut' ? 'cut' : 'copy';
          };
        }
      },
      unbind: function unbind(el, binding) {
        if (binding.arg === 'success') {
          delete el._v_clipboard_success;
        } else if (binding.arg === 'error') {
          delete el._v_clipboard_error;
        } else {
          el._v_clipboard.destroy();
          delete el._v_clipboard;
        }
      }
    });
  }
};

Vue.use(VueClipboard);

window.locale = "en";

window.i18n = {
		locale: locale,
		messages: {
				en: {
						license_in_active: {
								seg_notice: 'The Gateway Module license is not activated. Any changes on this screen will not take effect.',
								seg_link: 'Specify a valid Activation Code.',
								atp_notice: 'Product license not activated. Any changes on this screen will not take effect.',
								atp_link: 'Specify a valid Activation Code.'
						}
				}
		}
};

var TmVueLicenseInactive$1 = { template: "<div class=\"license\"> <div v-if=\"showSeg\"> <span class=\"tmicon tmicon-help\"></span> <span class=\"icon-name\"> {{ $t(\"license_in_active.seg_notice\")}} <a href=\"javascript:;\" @click=\"license_jump(1)\">{{$t(\"license_in_active.seg_link\")}}</a> </span> </div> <div v-if=\"showAtp\"> <span class=\"tmicon tmicon-help\"></span> <span class=\"icon-name\"> {{ $t(\"license_in_active.atp_notice\")}} <a href=\"javascript:;\" @click=\"license_jump(0)\">{{$t(\"license_in_active.atp_link\")}}</a> </span> </div> </div>",
    name: 'TmVueLicenseInactive',
    i18n: i18n,
    props: {
        type: {
            type: String,
            default: "seg"
        }
    },
    computed: {
        data_type: function data_type() {
            return this.type ? this.type : 'seg';
        },
        showSeg: function showSeg() {
            return this.data_type == 'seg';
        },
        showAtp: function showAtp() {
            return this.data_type == 'atp';
        }
    },
    methods: {
        license_jump: function license_jump(type) {
            window.parent.license_click(type);
        }
    }
};

TmVueLicenseInactive$1.install = function (V, options) {
    V.component(TmVueLicenseInactive$1.name, TmVueLicenseInactive$1);
};

Vue.use(VueI18n);
Vue.use(TmVueActionButton$1);
Vue.use(TmVueRadio);
Vue.use(TmVueRadioEx);
Vue.use(TmVueRadioGroup);
Vue.use(TmVueCheckbox);
Vue.use(TmVueCheckallCheckbox$1);
Vue.use(TmVueDropdown);
Vue.use(TmVueSearchButton$1);
Vue.use(TmVueButton$1);
Vue.use(Breadcrumb);
Vue.use(TmVueFilterTag$1);
Vue.use(TmVueInput$1);
Vue.use(TmVueBadge$1);
Vue.use(TmVueLabel$1);
Vue.use(TmVueModal$1);
Vue.use(TmVueUpload$1);
Vue.use(TmVueTag$1);
Vue.use(TmVueLicenseInactive$1);
Vue.use(TmVueAutosizeTextarea$1);
Vue.use(TmVueStepProcess$1);
Vue.use(TmVueGroupSelect$1);
Vue.use(TmVueNotification$1);

});
