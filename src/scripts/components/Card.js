class Card {
    constructor(cardData, templateSelector, handleCardClick, openDeletePopup, changeLike) {
        this._cardData = cardData;
        this._name = cardData.name;
        this._link = cardData.link;
        this._myId = cardData.myId;
        this._ownerId = cardData.owner._id;
        this._likes = cardData.likes;
        this._numberLikes = cardData.likes.length;
        this._cardId = cardData._id;
        this._changeLike = changeLike;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._openDeletePopup = openDeletePopup;
    }

    _removeDeleteBtn() {
        if (this._myId !== this._ownerId) {
            this._deleteElement.remove();
        }
    }

    _getTemplate = () => {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.elements__element').cloneNode(true);
        return cardElement;
    }

    isLiked() {
        if (this._likeElement.classList.contains("elements__like_active")) {
            return true
        }
        else {
            return false
        }
    }

    _handleLike = () => {
        this._changeLike(this._cardId);
    }

    _openDeleteElement = () => {
        this._openDeletePopup({ card: this, cardId: this._cardId });
    }

    _handleOpenPopupImage = () => {
        this._handleCardClick(this._cardData);
    }

    _setEventListeners = () => {
        this._likeElement.addEventListener('click', this._handleLike);
        this._deleteElement.addEventListener('click', this._openDeleteElement);
        this._imageElement.addEventListener('click', this._handleOpenPopupImage);
    }

    _countLikes() {
        this._counter = this._element.querySelector('.elements__counter-like');
        this._likes.forEach(element => {
            if (element._id === this._myId) {
                this._handleLike()
                return
            }
        })
        this._counter.textContent = this._numberLikes;
    }

    toggleLike = (likes) => {
        this._likeElement.classList.toggle('elements__like_active');
        this._counter.textContent = likes.length;
    }

    removeCard() {
        this._element.remove();
    }

    generateCard = () => {
        this._element = this._getTemplate();
        this._imageElement = this._element.querySelector('.elements__image');
        this._likeElement = this._element.querySelector('.elements__like');
        this._deleteElement = this._element.querySelector('.elements__delete');
        this._title = this._element.querySelector('.elements__title');
        this._imageElement.src = this._link;
        this._imageElement.alt = this._name;
        this._title.textContent = this._name;
        this._countLikes();
        this._removeDeleteBtn();
        this._setEventListeners();
        return this._element;
    }
}

export { Card };