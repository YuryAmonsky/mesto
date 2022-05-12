
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.edit-profile');
let profileEditButton = document.querySelector('.profile__edit-button');
let formCloseIcon = document.querySelector('.popup__close-icon');
let formInputName = document.querySelector('.edit-profile__name');
let formInputAboutMe = document.querySelector('.edit-profile__about-me');
let textProfileName = document.querySelector('.profile__name');
let textProfileAboutMe = document.querySelector('.profile__about-me')

function openForm() {  
  formInputName.value = textProfileName.textContent;
  formInputAboutMe.value = textProfileAboutMe.textContent;
  popup.classList.add('popup_opened');
}

function closeForm() {
  popup.classList.remove('popup_opened');
}

function saveData(evt) {
  evt.preventDefault();
  textProfileName.textContent = formInputName.value;  
  textProfileAboutMe.textContent = formInputAboutMe.value;  
  closeForm();
}

profileEditButton.addEventListener('click', openForm);
formCloseIcon.addEventListener('click', closeForm);
formElement.addEventListener('submit', saveData);