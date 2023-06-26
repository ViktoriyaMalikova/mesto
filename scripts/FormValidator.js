class FormValidator {
    constructor(config, form) {
        this._form = form;
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inputErrorClass = config.inputErrorClass;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._errorClass = config.errorClass;
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    }

    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _showInputError = (input) => {
        this._errorElement = this._form.querySelector(`.${input.id}-error`);
        input.classList.add(this._inputErrorClass);
        this._errorElement.textContent = input.validationMessage;
        this._errorElement.classList.add(this._errorClass);
    }

    _hideInputError = (input) => {
        this._errorElement = this._form.querySelector(`.${input.id}-error`);
        input.classList.remove(this._inputErrorClass);
        this._errorElement.textContent = '';
        this._errorElement.classList.remove(this._errorClass);
    }

    _toggleButtonState = () => {
        if (this._hasInvalidInput()) {
            this._disableButton();
        } else {
            this._enableButton();
        }
    }

    _checkInputValidity = (input) => {
        if (!input.validity.valid) {
            this._showInputError(input);
        } else {
            this._hideInputError(input);
        }
    }

    _setEventListeners = () => {
        this._toggleButtonState();
        this._inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._toggleButtonState();
            });
        });
    }

    _disableButton = () => {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.setAttribute('disabled', true);
    }

    _enableButton = () => {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.removeAttribute('disabled', true);
    }

    enableValidation = () => {
        this._formList = Array.from(document.querySelectorAll(this._formSelector));
        this._formList.forEach((form) => {
            form.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
            this._setEventListeners();
        });
    }

    resetError = () => {
        this._inputList.forEach((input) => {
            this._hideInputError(input);
            if (input.validity.valid) {
                this._enableButton();
            } else {
                this._disableButton();
            }
        });
    }
}

export { FormValidator };