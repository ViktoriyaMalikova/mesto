// Элементы секции profile
const nameFormProfile = document.querySelector('.profile__name');
const jobFormProfile = document.querySelector('.profile__job');
const btnOpenEditPopup = document.querySelector('.profile__edit-btn');

// Элементы editPopup
const editPopup = document.querySelector('.popup_type_edit-profile');
const formElementEditPopup = document.querySelector('.popup__form_type_edit-profile');
const btnCloseEditPopup = editPopup.querySelector('.popup__close-btn');
const nameInputEditPopup = document.querySelector('.popup__item_el_name');
const jobInputEditPopup = document.querySelector('.popup__item_el_job');
const btnSaveEditForm = editPopup.querySelector('.popup__save-btn');

// Элементы addPopup
const addPopup = document.querySelector('.popup_type_aad-card');
const formElementAddPopup = document.querySelector('.popup__form_type_add-card');
const btnCloseAddPopup = addPopup.querySelector('.popup__close-btn');
const btnOpenAddPopup = document.querySelector('.profile__add-btn');
const captionInputAddPopup = document.querySelector('.popup__item_el_caption');
const linkInputAddPopup = document.querySelector('.popup__item_el_link');
const btnSaveAddForm = addPopup.querySelector('.popup__save-btn');

//Элементы imagePopup
const imagePopup = document.querySelector('.popup_type_open-image');
const btnCloseImagePopup = imagePopup.querySelector('.popup__close-btn');
const popupImageImg = document.querySelector('.popup__image');
const popupImageFigcaption = document.querySelector('.popup__figcaption');

//Другие элементы
const elementsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('.elements-template');
const popupList = Array.from(document.querySelectorAll('.popup'));

// Закрытие попапов по клику на оверлей
const closePopupClickOverlay = (evt) => {
    const isOverlay = evt.target.classList.contains('popup');
    const isCloseBtn = evt.target.classList.contains('popup__close-btn');

    if (isOverlay || isCloseBtn) {
        popupList.forEach(closePopup);
    }
};

// Закрытие попапа нажатие на Esc
const closePopupClickEsc = (evt) => {
    if (evt.key === 'Escape') {
        popupList.forEach(closePopup);
    }
}

// Функция открытия попапа
const openPopup = (popupElement) => {
    popupElement.classList.add('popup_opened');
    document.addEventListener('click', closePopupClickOverlay);
    document.addEventListener('keydown', closePopupClickEsc);
}

// Функция закрытия попапа
const closePopup = (popupElement) => {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('click', closePopupClickOverlay);
    document.removeEventListener('keydown', closePopupClickEsc);
}

//Функция открытия попапа редактирования профиля
const openPopupEditProfile = () => {
    enableButton(btnSaveEditForm, { inactiveButtonClass: 'popup__save-btn_inactive' });
    nameInputEditPopup.value = nameFormProfile.textContent;
    jobInputEditPopup.value = jobFormProfile.textContent;
    openPopup(editPopup);
}

//Функция открытия попапа добавленния карточки
const openPopupAddCard = () => {
    disableButton(btnSaveAddForm, { inactiveButtonClass: 'popup__save-btn_inactive' });
    linkInputAddPopup.value = "";
    captionInputAddPopup.value = "";
    openPopup(addPopup);
}

// Редактирование имени и информации о себе
const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();
    nameFormProfile.textContent = nameInputEditPopup.value;
    jobFormProfile.textContent = jobInputEditPopup.value;
    closePopup(editPopup);
}

//Функция добавления карточки
const handleAddCardFormSubmit = (evt) => {
    evt.preventDefault();
    const cardAdd = {
        name: captionInputAddPopup.value,
        link: linkInputAddPopup.value
    };
    const element = createImageElement(cardAdd);
    elementsList.prepend(element);
    closePopup(addPopup);
}

// Добавление карточек из массива
const createImageElement = (cardData) => {
    const cardsElement = cardTemplate.content.querySelector('.elements__element').cloneNode(true);
    const cardImage = cardsElement.querySelector('.elements__image');
    const cardTitle = cardsElement.querySelector('.elements__title');
    const deleteButton = cardsElement.querySelector('.elements__delete');
    const likeButton = cardsElement.querySelector('.elements__like');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    // Открытие попапа с картинкой 
    const openPopupImage = () => {
        popupImageImg.src = cardData.link;
        popupImageImg.alt = cardData.name;
        popupImageFigcaption.textContent = cardData.name;
        openPopup(imagePopup);
    }

    //Удаление карточки
    const handleDelete = () => {
        cardsElement.remove();
    };

    // Лайк карточки   
    const handleLike = (evt) => {
        likeButton.classList.toggle('elements__like_active');
    };

    cardImage.addEventListener('click', openPopupImage);
    deleteButton.addEventListener('click', handleDelete);
    likeButton.addEventListener('click', handleLike);

    return cardsElement;
}

initialCards.forEach(card => {
    const element = createImageElement(card);
    elementsList.append(element);
});

btnOpenAddPopup.addEventListener('click', openPopupAddCard);
formElementAddPopup.addEventListener('submit', handleAddCardFormSubmit);
btnOpenEditPopup.addEventListener('click', openPopupEditProfile);
formElementEditPopup.addEventListener('submit', handleProfileFormSubmit);