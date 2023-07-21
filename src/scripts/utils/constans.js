const initialCards = [
    {
        title: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        title: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        title: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        title: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        title: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        title: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const validationConfig = {
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__save-btn',
    inputErrorClass: 'popup__item_error',
    inactiveButtonClass: 'popup__save-btn_inactive',
    errorClass: 'popup__item-error_active'
}

const btnOpenEditPopup = document.querySelector('.profile__edit-btn');
const btnOpenAddPopup = document.querySelector('.profile__add-btn');
const btnOpenEditAvatarPopup = document.querySelector('.profile__add-avatar-btn');
const formElementEditPopup = document.querySelector('.popup__form_type_edit-profile');
const formElementAddPopup = document.querySelector('.popup__form_type_add-card');
const formElementEditAvatarPopup = document.querySelector('.popup__form_type_edit-avatar');
const profileAvatar = document.querySelector('.profile__avatar')

const configInfoProfile = {
    profileNameSelector: '.profile__name',
    profileJobSelector: '.profile__job'
}

export {
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
};
