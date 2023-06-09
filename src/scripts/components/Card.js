class Card {
    constructor(cardData, templateSelector, handleCardClick) {
        this._cardData = cardData;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate = () => {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.elements__element').cloneNode(true);
        return cardElement;
    }

    _handleLike = () => {
        this._likeElement.classList.toggle('elements__like_active');
    }

    _handleDeleteElement = () => {
        this._element.remove();
    }

    _handleOpenPopupImage = () => {
        this._handleCardClick(this._cardData);
    }

    _setEventListeners = () => {
        this._likeElement.addEventListener('click', this._handleLike);
        this._deleteElement.addEventListener('click', this._handleDeleteElement);
        this._imageElement.addEventListener('click', this._handleOpenPopupImage);
    }

    generateCard = () => {
        this._element = this._getTemplate();
        this._imageElement = this._element.querySelector('.elements__image');
        this._likeElement = this._element.querySelector('.elements__like');
        this._deleteElement = this._element.querySelector('.elements__delete');
        this._title = this._element.querySelector('.elements__title');
        this._imageElement.src = this._cardData.link;
        this._imageElement.alt = this._cardData.title;
        this._title.textContent = this._cardData.title;
        this._setEventListeners();
        return this._element;
    }
}

export { Card };