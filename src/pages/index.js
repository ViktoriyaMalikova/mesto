import './index.css';
import { Card } from "../scripts/components/Card.js";
import {
    initialCards,
    validationConfig,
    btnOpenEditAvatarPopup,
    btnOpenEditPopup,
    btnOpenAddPopup,
    formElementEditPopup,
    formElementAddPopup,
    formElementEditAvatarPopup,
    profileAvatar,
    configInfoProfile
} from "../scripts/utils/constans.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { Section } from "../scripts/components/Section.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import { PopupWithForm } from "../scripts/components/PopupWidthForm.js";
import { PopupDeleteCard } from "../scripts/components/PopupDeleteCard.js";

//Создание экземпляра класса PopupWithImage для попапа с картинкой
const popupImage = new PopupWithImage('.popup_type_open-image');

//Создание экземпляра класса PopupWidthForm для попапа с редактированием профиля
const popupEdit = new PopupWithForm('.popup_type_edit-profile', (data) => {
    userInfo.setUserInfo(data);
    popupEdit.close();
});

// Создание экземпляра класса PopupWidthForm для попапа добавления карточек 
const popupAddCard = new PopupWithForm('.popup_type_aad-card', (card) => {
    section.addNewItem(createCard(card));
    popupAddCard.close();
});

// Создание экземпляра класса PopupWidthForm для попапа редактирования аватарки
const popupEditAvatar = new PopupWithForm('.popup_type_edit-avatar', (data) => {
    profileAvatar.src = data.linkAvatar;
    popupEditAvatar.close();
})

// Создание экземпляра класса PopupDeleteCard для попапа удаления картинки
const popupDeleteCard = new PopupDeleteCard('.popup_type_delete-card', (card) => {
    card.removeCard();
    popupDeleteCard.close();
})

const createCard = (card) => {
    const element = new Card(card, '.elements-template', popupImage.open, popupDeleteCard.open);
    const cardElement = element.generateCard();
    return cardElement;
}

// Создание экземппляра класса Section для отрисовки карточек
const section = new Section({
    items: initialCards,
    renderer: (card) => {
        section.addItem(createCard(card));
    }
}, '.elements__list')

section.renderItems();

//Создание экземпляра класса UserInfo для  управления отображения информации о пользователе
const userInfo = new UserInfo(configInfoProfile);

//Создание экземпляра класса FormValidator для формы редактирования профиля
const formEditValidator = new FormValidator(validationConfig, formElementEditPopup);
formEditValidator.enableValidation();

//Создание экземпляра класса FormValidator для формы добавления карточки
const formAddValidator = new FormValidator(validationConfig, formElementAddPopup);
formAddValidator.enableValidation();

//Создание экземпляра класса FormValidator для формы изменения аватарки
const formEditAvatarValidator = new FormValidator(validationConfig, formElementEditAvatarPopup);
formEditAvatarValidator.enableValidation();



// Навешивание слушателей
popupImage.setEventListeners();
popupEdit.setEventListeners();
popupAddCard.setEventListeners();
popupEditAvatar.setEventListeners();
popupDeleteCard.setEventListeners();

btnOpenAddPopup.addEventListener('click', () => {
    formAddValidator.resetValidationState();
    popupAddCard.open();
});
btnOpenEditPopup.addEventListener('click', () => {
    formEditValidator.resetValidationState();
    popupEdit.setInputValues(userInfo.getUserInfo());
    popupEdit.open();
});
btnOpenEditAvatarPopup.addEventListener('click', () => {
    formEditAvatarValidator.resetValidationState();
    popupEditAvatar.open();
});