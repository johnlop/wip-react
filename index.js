import { createElement, useState, useRef, useEffect } from "./wip.js ";
import wipDom from "./wip-dom.js";

function Button({ label, click }) {
  return createElement(
    "button",
    {
      onClick: click,
    },
    label,
  );
}

function App() {
  const [title, setTitle] = useState("Work in progress");
  const [count, setCount] = useState(1);
  const off = useRef(false);

  useEffect(() => {
    console.log("effect used");
  }, [title]);

  const increase = () => {
    !off.current && setCount(count + 1);
  };
  const shutDown = () => {
    off.current = true;
  };

  console.log("rerender");
  console.log(`off is ${off.current}`);

  return createElement(
    "div",
    null,
    createElement("h1", null, title),
    createElement("h1", null, count.toString()),
    createElement(Button, { label: "+", click: increase }),
    createElement(Button, { label: "off", click: shutDown }),
    createElement(Button, {
      label: "change title",
      click: () => setTitle("new title"),
    }),
  );
}

wipDom.render(createElement(App), document.getElementById("root"));
