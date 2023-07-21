class Section {
    constructor({ items, renderer }, selectorContainer) {
        this._container = document.querySelector(selectorContainer);
        this._initialCards = items;
        this._renderer = renderer;
    }

    renderItems() {
        this._initialCards.forEach(card => {
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