import "../styles/index.scss";

function component(msg: string): HTMLDivElement {
    const element = document.createElement('div');

    element.innerHTML = msg;
    return element;
}

// document.body.appendChild(component('Testing'));