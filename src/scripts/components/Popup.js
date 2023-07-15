class Popup {
    constructor(selectorPopup) {
        this._popup = document.querySelector(selectorPopup);
        this._popupButtonClose = this._popup.querySelector('.popup__close-btn');
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handleClickOverlay = (evt) => {
        if (evt.target === evt.currentTarget) {
            this.close()
        }
    }

    _handleButtonClose = () => {
        this.close()
    }

    setEventListeners() {
        this._popupButtonClose.addEventListener('click', this._handleButtonClose);
        this._popup.addEventListener('click', this._handleClickOverlay)
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
}

export { Popup };