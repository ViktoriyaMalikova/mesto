import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(selectorPopup) {
        super(selectorPopup);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupFigcaption = this._popup.querySelector('.popup__figcaption');
    }

    open = (cardData) => {
        this._popupImage.src = cardData.link;
        this._popupImage.alt = cardData.name;
        this._popupFigcaption.textContent = cardData.name;
        super.open()
    }
}

export { PopupWithImage };