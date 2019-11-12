import { createElement, useState } from "./wip.js ";
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

  console.log(`App invoked, title is: ${title}`);

  const changeTitle = () => {
    setTitle("New title");
  };

  return createElement(
    "div",
    null,
    createElement("h1", null, title),
    createElement(Button, { label: "click", click: changeTitle }),
    createElement(Button, { label: "reset" }),
  );
}

wipDom.render(createElement(App), document.getElementById("root"));
