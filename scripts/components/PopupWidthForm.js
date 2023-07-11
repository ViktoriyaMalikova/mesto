import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(popupSelector, submitFormFunction) {
        super(popupSelector);
        this._submitFormFunction = submitFormFunction;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__item');
    }

    _getInputValues() {
        this._values = {};
        this._inputList.forEach(input => {
            this._values[input.name] = input.value;
        });
        return this._values;
    }

    setInputValues(dataUser) {
        this._inputList.forEach(input => {
            input.value = dataUser[input.name];
        })
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitFormFunction(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}

export { PopupWithForm };