const enableValidation = ({ formSelector, ...rest }) => {
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach(formElement => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, rest);
    });
};

const setEventListeners = (formToValidate, { inputSelector, submitButtonSelector, ...rest }) => {
    const formItems = Array.from(formToValidate.querySelectorAll(inputSelector));
    const formButton = formToValidate.querySelector(submitButtonSelector);

    disableButton(formButton, rest);
    formItems.forEach(item => {
        item.addEventListener('input', () => {
            checkItemValidity(item, rest);
            if (hasInvalidInput(formItems)) {
                disableButton(formButton, rest);
            } else {
                enableButton(formButton, rest);
            }
        })
    })
}

const checkItemValidity = (item, { inputErrorClass, errorClass, ...rest }) => {
    const currentInputErrorContainer = document.querySelector(`.${item.id}-error`);

    if (item.validity.valid) {
        item.classList.remove(inputErrorClass);
        currentInputErrorContainer.textContent = '';
        currentInputErrorContainer.classList.remove(errorClass);
    } else {
        currentInputErrorContainer.textContent = item.validationMessage;
        currentInputErrorContainer.classList.add(errorClass);
        item.classList.add(inputErrorClass);
    }
}

const hasInvalidInput = (formItems) => {
    return formItems.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

const enableButton = (button, { inactiveButtonClass }) => {
    button.classList.remove(inactiveButtonClass)
    button.removeAttribute('disabled')
}

const disableButton = (button, { inactiveButtonClass }) => {
    button.classList.add(inactiveButtonClass);
    button.setAttribute('disabled', true)
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_inactive',
    inputErrorClass: 'popup__item_error',
    errorClass: 'popup__item-error_active'
});