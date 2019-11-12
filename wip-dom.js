let hooks = [];
let idx = 0;

export function useState(initialValue) {
  const state = hooks[idx] || initialValue;
  const _idx = idx;

  function setState(newValue) {
    hooks[_idx] = newValue;
    render();
  }

  idx++;

  return [state, setState];
}

export function useRef(initialValue = value) {
  const _idx = idx;

  if (!hooks[_idx]) {
    hooks[_idx] = Object.seal({ current: initialValue });
  }

  idx++;

  return hooks[_idx];
}

function renderElement(element) {
  const { type, props, children } = element;

  // support components (factory function)
  if (typeof type === "function") {
    return renderElement(type(props));
  }

  // create DOM elements tree
  if (typeof type === "string") {
    const domElement = document.createElement(type);

    // handle children
    children.forEach(child => {
      if (typeof child === "string") {
        domElement.appendChild(document.createTextNode(child));
      } else {
        domElement.appendChild(renderElement(child));
      }
    });

    // go through props
    for (let prop in props) {
      if (props.hasOwnProperty(prop)) {
        // handle events
        if (prop.startsWith("on")) {
          const evenName = prop.slice(2).toLowerCase();
          domElement.addEventListener(evenName, props[prop]);
        }
      }
    }

    return domElement;
  }
}

let _currentApp = null;
let _element = null;
let _container = null;

function render(element = _element, container = _container) {
  const app = renderElement(element);

  _element = element;
  _container = container;

  _currentApp
    ? container.replaceChild(app, _currentApp)
    : container.appendChild(app);

  _currentApp = app;
  idx = 0;
}

export default {
  render,
};
