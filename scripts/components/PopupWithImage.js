import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(selectorPopup) {
        super(selectorPopup);
    }

    open = (cardData) => {
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupFigcaption = this._popup.querySelector('.popup__figcaption');
        this._popupImage.src = cardData.link;
        this._popupImage.alt = cardData.title;
        this._popupFigcaption.textContent = cardData.title;
        super.open()
    }
}

export { PopupWithImage };