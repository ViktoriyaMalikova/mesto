import './index.css';
import { Card } from "../scripts/components/Card.js";
import {
    validationConfig,
    btnOpenEditAvatarPopup,
    btnOpenEditPopup,
    btnOpenAddPopup,
    formElementEditPopup,
    formElementAddPopup,
    formElementEditAvatarPopup,
    configInfoProfile
} from "../scripts/utils/constans.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { Section } from "../scripts/components/Section.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import { PopupWithForm } from "../scripts/components/PopupWidthForm.js";
import { PopupDeleteCard } from "../scripts/components/PopupDeleteCard.js";
import { Api } from "../scripts/components/Api.js";

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-71',
    headers: {
        authorization: '471e18fc-43ec-4587-90e0-f6ac04729a79',
        'Content-Type': 'application/json'
    }
});

//Создание экземпляра класса PopupWithImage для попапа с картинкой
const popupImage = new PopupWithImage('.popup_type_open-image');

//Создание экземпляра класса PopupWidthForm для попапа с редактированием профиля
const popupEdit = new PopupWithForm('.popup_type_edit-profile', (data) => {
    popupEdit.stateLoading(true)
    api.setUserInfo(data)
        .then(res => {
            userInfo.setUserInfo({ username: res.name, userjob: res.about, linkavatar: res.avatar })
        })
        .then(() => {
            popupEdit.close()
        })
        .catch((error => console.log(`Ошибка1: ${error}`)))
        .finally(() => {
            popupEdit.stateLoading(false)
        })
});

// Создание экземпляра класса PopupWidthForm для попапа добавления карточек 
const popupAddCard = new PopupWithForm('.popup_type_aad-card', (data) => {
    popupAddCard.stateLoading(true)
    api.addNewCard(data)
        .then(dataCard => {
            dataCard.myId = userInfo.getId()
            section.addNewItem(createCard(dataCard))
        })
        .then(() => {
            popupAddCard.close()
        })
        .catch((error => console.log(`Ошибка2: ${error}`)))
        .finally(() => {
            popupAddCard.stateLoading(false)
        })
});

// Создание экземпляра класса PopupWidthForm для попапа редактирования аватарки
const popupEditAvatar = new PopupWithForm('.popup_type_edit-avatar', (data) => {
    popupEditAvatar.stateLoading(true)
    api.setNewAvatar(data)
        .then(res => {
            userInfo.setUserInfo({ username: res.name, userjob: res.about, linkavatar: res.avatar })
        })
        .then(() => {
            popupEditAvatar.close();
        })
        .catch((error => console.log(`Ошибка: ${error}`)))
        .finally(() => {
            popupEditAvatar.stateLoading(false)
        })
});

// Создание экземпляра класса PopupDeleteCard для попапа удаления картинки
const popupDeleteCard = new PopupDeleteCard('.popup_type_delete-card', ({ card, cardId }) => {
    popupDeleteCard.stateLoading(true)
    api.deleteCard(cardId)
        .then(() => {
            card.removeCard()
        })
        .then(() => {
            popupDeleteCard.close()
        })
        .catch((error => console.log(`Ошибка6: ${error}`)))
        .finally(() => {
            popupDeleteCard.stateLoading(false)
        })
});

const createCard = (card) => {
    const element = new Card(card, '.elements-template', popupImage.open, popupDeleteCard.open,
        (cardId) => {
            if (element.isLiked()) {
                api.deleteLike(cardId)
                    .then(res => {
                        element.toggleLike(res.likes)
                    })
                    .catch(error => console.log(`Ошибка4: ${error}`))
            } else {
                api.addLike(cardId)
                    .then(res => {
                        element.toggleLike(res.likes)
                    })
                    .catch(error => console.log(`Ошибка5: ${error}`))
            }
        }
    );
    const cardElement = element.generateCard();
    return cardElement;
}

// Создание экземппляра класса Section для отрисовки карточек
const section = new Section((card) => {
    section.addItem(createCard(card));
}, '.elements__list')

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

Promise.all([api.getInfoProfile(), api.getInitialCards()])
    .then(([dataUser, dataCard]) => {
        dataCard.forEach(card => card.myId = dataUser._id);
        userInfo.setUserInfo({ username: dataUser.name, userjob: dataUser.about, linkavatar: dataUser.avatar });
        userInfo.setId(dataUser._id);
        section.renderItems(dataCard);
    })
    .catch((error => console.log(`Ошибка3: ${error}`)))