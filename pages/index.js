const openPopupBtn = document.querySelector('.profile__edit-btn');
const closePopupBtn = document.querySelector('.popup__close-btn');
const popup = document.querySelector('.popup');
const nameInput = document.querySelector('.popup__item_el_name');
const jobInput = document.querySelector('.popup__item_el_job');
const nameForm = document.querySelector('.profile__name');
const jobForm = document.querySelector('.profile__job');

function openPopup() {
    popup.classList.add('popup_open');
    nameInput.value = nameForm.textContent;
    jobInput.value = jobForm.textContent
}

function closePopup() {
    popup.classList.remove('popup_open');
}

openPopupBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);

let formElement = document.querySelector('.edit-form');

function handleFormSubmit(evt) {
    evt.preventDefault();
    nameForm.textContent = nameInput.value;
    jobForm.textContent = jobInput.value;
    popup.classList.remove('popup_open');

}

formElement.addEventListener('submit', handleFormSubmit);
