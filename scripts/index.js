import { Card } from "./Card.js";
import { initialCards, validationConfig } from "./constans.js";
import { FormValidator } from "./FormValidator.js";

// Элементы секции profile
const nameFormProfile = document.querySelector('.profile__name');
const jobFormProfile = document.querySelector('.profile__job');
const btnOpenEditPopup = document.querySelector('.profile__edit-btn');

// Элементы editPopup
const editPopup = document.querySelector('.popup_type_edit-profile');
const formElementEditPopup = document.querySelector('.popup__form_type_edit-profile');
const nameInputEditPopup = document.querySelector('.popup__item_el_name');
const jobInputEditPopup = document.querySelector('.popup__item_el_job');

// Элементы addPopup
const addPopup = document.querySelector('.popup_type_aad-card');
const formElementAddPopup = document.querySelector('.popup__form_type_add-card');
const btnOpenAddPopup = document.querySelector('.profile__add-btn');
const captionInputAddPopup = document.querySelector('.popup__item_el_caption');
const linkInputAddPopup = document.querySelector('.popup__item_el_link');

//Элементы imagePopup
const imagePopup = document.querySelector('.popup_type_open-image');
const popupImageImg = document.querySelector('.popup__image');
const popupImageFigcaption = document.querySelector('.popup__figcaption');

//Другие элементы
const elementsList = document.querySelector('.elements__list');

// Закрытие попапов по клику на оверлей
const closePopupClickOverlay = (evt) => {
    const isOverlay = evt.target.classList.contains('popup');
    const isCloseBtn = evt.target.classList.contains('popup__close-btn');

    if (isOverlay || isCloseBtn) {
        closePopup(document.querySelector('.popup_opened'));
    }
}

// Закрытие попапа нажатие на Esc
const closePopupClickEsc = (evt) => {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
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
    formElementEditPopup.reset();
    formEditValidator.resetValidationState();
    nameInputEditPopup.value = nameFormProfile.textContent;
    jobInputEditPopup.value = jobFormProfile.textContent;
    openPopup(editPopup);
}

//Функция открытия попапа добавленния карточки
const openPopupAddCard = () => {
    formElementAddPopup.reset();
    formAddValidator.resetValidationState();
    openPopup(addPopup);
}

// Функция открытия попапа с картинкой
const openPopupImage = (cardData) => {
    popupImageImg.src = cardData.link;
    popupImageImg.alt = cardData.name;
    popupImageFigcaption.textContent = cardData.name;
    openPopup(imagePopup);
}

// Редактирование имени и информации о себе
const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();
    nameFormProfile.textContent = nameInputEditPopup.value;
    jobFormProfile.textContent = jobInputEditPopup.value;
    closePopup(editPopup);
}

const createCard = (card) => {
    const element = new Card(card, '.elements-template', openPopupImage);
    const cardElement = element.generateCard();
    return cardElement;
}

//Функция добавления карточки
const handleAddCardFormSubmit = (evt) => {
    evt.preventDefault();
    const cardAdd = {
        name: captionInputAddPopup.value,
        link: linkInputAddPopup.value
    };
    elementsList.prepend(createCard(cardAdd));
    closePopup(addPopup);
}

//Создание экземпляра класса Card для каждой карточки
initialCards.forEach(card => {
    elementsList.append(createCard(card));
})

//Создание экземпляра класса FormValidator для формы редактирования профиля
const formEditValidator = new FormValidator(validationConfig, formElementEditPopup);
formEditValidator.enableValidation();

//Создание экземпляра класса FormValidator для формы добавления карточки
const formAddValidator = new FormValidator(validationConfig, formElementAddPopup);
formAddValidator.enableValidation();

btnOpenAddPopup.addEventListener('click', openPopupAddCard);
formElementAddPopup.addEventListener('submit', handleAddCardFormSubmit);
btnOpenEditPopup.addEventListener('click', openPopupEditProfile);
formElementEditPopup.addEventListener('submit', handleProfileFormSubmit);