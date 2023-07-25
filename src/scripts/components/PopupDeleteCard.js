import { Popup } from "./Popup.js";

class PopupDeleteCard extends Popup {
    constructor(selectorPopup, submitFormFunction) {
        super(selectorPopup);
        this._form = this._popup.querySelector('.popup__form');
        this._submitButton = this._form.querySelector('.popup__save-btn');
        this._submitFormFunction = submitFormFunction;
        this._defaultSubmitText = this._submitButton.textContent;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitFormFunction({ card: this._card, cardId: this._cardId });
        })
    }

    stateLoading(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = 'Удаление...';
        } else {
            this._submitButton.textContent = this._defaultSubmitText;
        }
    }

    open = ({ card, cardId }) => {
        super.open();
        this._card = card;
        this._cardId = cardId;
    }
}

export { PopupDeleteCard };