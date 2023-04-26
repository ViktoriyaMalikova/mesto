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

// Элементы addPopup
const addPopup = document.querySelector('.popup_type_aad-card');
const formElementAddPopup = document.querySelector('.popup__form_type_add-card');
const btnCloseAddPopup = addPopup.querySelector('.popup__close-btn');
const btnOpenAddPopup = document.querySelector('.profile__add-btn');
const captionInputAddPopup = document.querySelector('.popup__item_el_caption');
const linkInputAddPopup = document.querySelector('.popup__item_el_link');

//Элементы imagePopup
const imagePopup = document.querySelector('.popup_type_open-image');
const btnCloseImagePopup = imagePopup.querySelector('.popup__close-btn');

//Другие элементы
const elementsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('.elements-template');

// Функция открытия попапа
function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
}

// Функция закрытия попапа
function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
}

//Функция открытия попапа редактирования профиля
function openPopupEditProfile() {
    nameInputEditPopup.value = nameFormProfile.textContent;
    jobInputEditPopup.value = jobFormProfile.textContent;
    openPopup(editPopup);
}

//Функция открытия попапа добавленния карточки
function openPopupAddCard() {
    linkInputAddPopup.value = "";
    captionInputAddPopup.value = "";
    openPopup(addPopup);
}

// Редактирование имени и информации о себе
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    nameFormProfile.textContent = nameInputEditPopup.value;
    jobFormProfile.textContent = jobInputEditPopup.value;
    closePopup(editPopup);
}

//Функция добавления карточки
function handleAddCardFormSubmit(evt) {
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
function createImageElement(cardData) {
    const cardsElement = cardTemplate.content.querySelector('.elements__element').cloneNode(true);
    const cardImage = cardsElement.querySelector('.elements__image');
    const cardTitle = cardsElement.querySelector('.elements__title');
    const deleteButton = cardsElement.querySelector('.elements__delete');
    const likeButton = cardsElement.querySelector('.elements__like');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    // Открытие попапа с картинкой 
    function openPopupImage() {
        const popupImageImg = document.querySelector('.popup__image');
        const popupImageFigcaption = document.querySelector('.popup__figcaption');

        popupImageImg.src = cardData.link;
        popupImageImg.alt = cardData.name;
        popupImageFigcaption.textContent = cardData.name;
        openPopup(imagePopup);
    }

    //Удаление карточки
    function handleDelete() {
        cardsElement.remove();
    };

    // Лайк карточки   
    function handleLike(evt) {
        likeButton.classList.toggle('elements__like_active');
    };

    cardImage.addEventListener('click', openPopupImage);
    deleteButton.addEventListener('click', handleDelete);
    likeButton.addEventListener('click', handleLike);

    return cardsElement;
}

initialCards.forEach(function (card) {
    const element = createImageElement(card);
    elementsList.append(element);
});

btnOpenAddPopup.addEventListener('click', openPopupAddCard);
btnCloseAddPopup.addEventListener('click', () => closePopup(addPopup));
formElementAddPopup.addEventListener('submit', handleAddCardFormSubmit);
btnOpenEditPopup.addEventListener('click', openPopupEditProfile);
btnCloseEditPopup.addEventListener('click', () => closePopup(editPopup));
formElementEditPopup.addEventListener('submit', handleProfileFormSubmit);
btnCloseImagePopup.addEventListener('click', () => closePopup(imagePopup));