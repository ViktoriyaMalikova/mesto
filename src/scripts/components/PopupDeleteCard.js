import { Popup } from "./Popup.js";

class PopupDeleteCard extends Popup {
    constructor(selectorPopup, submitFunction) {
        super(selectorPopup);
        this._submitFunction = submitFunction;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitFunction(this._card);
        })
    }

    open = (card) => {
        super.open();
        this._card = card;
    }
}

export { PopupDeleteCard };