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

const configInfoProfile = {
    profileNameSelector: '.profile__name',
    profileJobSelector: '.profile__job',
    profileAvatarSelector: '.profile__avatar'
}

export {
    validationConfig,
    btnOpenEditAvatarPopup,
    btnOpenEditPopup,
    btnOpenAddPopup,
    formElementEditPopup,
    formElementAddPopup,
    formElementEditAvatarPopup,
    configInfoProfile
};
