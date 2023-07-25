class Section {
    constructor(renderer, selectorContainer) {
        this._container = document.querySelector(selectorContainer);
        this._renderer = renderer;
    }

    renderItems(dataCards) {
        dataCards.forEach(card => {
            this._renderer(card);
        })
    }

    addItem(domElement) {
        this._container.append(domElement);
    }

    addNewItem(domElement) {
        this._container.prepend(domElement);
    }

}

export { Section };