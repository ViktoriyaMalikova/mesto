const popupEdit = document.querySelector('.popup_type_edit-profile');
const btnOpenEditPopup = document.querySelector('.profile__edit-btn');
const btnCloseEditPopup = document.querySelector('.popup__close-btn');
const nameInput = document.querySelector('.popup__item_el_name');
const jobInput = document.querySelector('.popup__item_el_job');
const nameForm = document.querySelector('.profile__name');
const jobForm = document.querySelector('.profile__job');

// Функция открытия попапа
function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
}

// Функция закрытия попапа
function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
}

//Функция открытия попапа редактирования профиля
function openPopupEdit() {
    nameInput.value = nameForm.textContent;
    jobInput.value = jobForm.textContent
    openPopup(popupEdit);
}

btnOpenEditPopup.addEventListener('click', openPopupEdit);

btnCloseEditPopup.addEventListener('click', () => closePopup(popupEdit));


// Редактирование имени и информации о себе

const formElement = document.querySelector('.popup__form_type_edit-profile');

function handleFormSubmit(evt) {
    evt.preventDefault();
    nameForm.textContent = nameInput.value;
    jobForm.textContent = jobInput.value;
    closePopup(popupEdit);
}

formElement.addEventListener('submit', handleFormSubmit);


// Добавление карточек из массива

const elementsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('.elements-template');

function createImageElement(cardData) {
    const cardsElement = cardTemplate.content.querySelector('.elements__element').cloneNode(true);

    const cardImage = cardsElement.querySelector('.elements__image');
    const cardTitle = cardsElement.querySelector('.elements__title');

    cardImage.src = cardData.link
    cardImage.alt = cardData.name
    cardTitle.textContent = cardData.name

    const popupImage = document.querySelector('.popup_type_open-image');
    const popupImageImg = document.querySelector('.popup__image');
    const popupImageFigcaption = document.querySelector('.popup__figcaption');

    // Открытие попапа с картинкой 
    function openPopupImage() {

        const imageSrc = cardImage.src;
        const imageAlt = cardImage.alt;
        const imageName = cardTitle.textContent;

        popupImageImg.src = imageSrc;
        popupImageImg.alt = imageAlt;
        popupImageFigcaption.textContent = imageName;
        openPopup(popupImage);
    }

    cardImage.addEventListener('click', openPopupImage);

    // Закрытие попапа с картинкой 
    const btnCloseImagPopup = document.querySelector('.popup__close-btn_type_open-image');

    btnCloseImagPopup.addEventListener('click', () => closePopup(popupImage));

    //Удаление карточки
    const deleteButton = cardsElement.querySelector('.elements__delete');

    function handleDelete() {
        cardsElement.remove();
    };

    deleteButton.addEventListener('click', handleDelete);

    // Лайк карточки   
    const likeButton = cardsElement.querySelector('.elements__like');

    function handleLike(evt) {
        likeButton.classList.toggle('elements__like_active');
    };

    likeButton.addEventListener('click', handleLike);

    return cardsElement;
}

initialCards.forEach(function (card) {
    const element = createImageElement(card);
    elementsList.append(element);


});

//Открытие попапа добавленния карточки
const btnCloseAddPopup = document.querySelector('.popup__close-btn_type_add-card');
const btnOpenAddPopup = document.querySelector('.profile__add-btn');
const popupAdd = document.querySelector('.popup_type_aad-card');

function openPopupAdd() {
    inputLink.value = "";
    inputCaption.value = "";
    openPopup(popupAdd)
}

btnOpenAddPopup.addEventListener('click', openPopupAdd);

//Закрытие попапа добавленния карточки
btnCloseAddPopup.addEventListener('click', () => closePopup(popupAdd));

//Добавление карточки
const inputCaption = document.querySelector('.popup__item_el_caption');
const inputLink = document.querySelector('.popup__item_el_link');
const formElementaddCard = document.querySelector('.popup__form_type_add-card');

function handleFormSubmitAddCard(evt) {
    evt.preventDefault();
    const cardAdd = {
        name: inputCaption.value,
        link: inputLink.value
    };
    const element = createImageElement(cardAdd);
    elementsList.prepend(element);
    closePopup(popupAdd);
}

formElementaddCard.addEventListener('submit', handleFormSubmitAddCard);