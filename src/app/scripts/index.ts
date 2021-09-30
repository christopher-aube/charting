function component() {
    const element = document.createElement('div');

    element.innerHTML = `I'm back!!`;
    return element;
}

document.body.appendChild(component());