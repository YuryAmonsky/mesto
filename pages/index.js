//Подключение модулей
//---------------------
import {*} from '../utils/constants.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

//Объявление глобальных переменных и констант
//----------------------

const listLocations = document.querySelector('.location-list');
//элементы попапа с формой редактирования профиля
/**
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = popupEditProfile.querySelector('.dialog-form_type_edit-profile');
const inputProfileName = formEditProfile.querySelector('.dialog-form__input_type_edit-profile-name');
const inputAboutMe = formEditProfile.querySelector('.dialog-form__input_type_edit-profile-about-me');
const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__close-icon');*/
const formEditProfileValidator = new FormValidator(formEditProfile, objFormElementsClassHolder);

//элементы попапа с формой добавления нового места
/**
const popupNewLocation = document.querySelector('.popup_type_new-location');
const formNewLocation = popupNewLocation.querySelector('.dialog-form_type_new-location');
const inputLocationName = formNewLocation.querySelector('.dialog-form__input_type_new-location-name');
const inputLocationLink = formNewLocation.querySelector('.dialog-form__input_type_new-location-link');
const buttonCloseNewLocation = popupNewLocation.querySelector('.popup__close-icon');*/
const formNewLocationValidator = new FormValidator(formNewLocation, objFormElementsClassHolder);


//'элементы попапа просмотра картинки
/**
const popupViewImage = document.querySelector('.popup_type_view-image');
const imageOrigin = popupViewImage.querySelector('.original-image');
const textCaption = popupViewImage.querySelector('.image-caption');
const buttonCloseViewImage = popupViewImage.querySelector('.popup__close-icon');*/


//Объявление функций 
//------------------

//начальное заполнение списка мест из массива initialCards
function initializeLocations(locations) {
  locations.forEach((cardData)=>{
    //ниже добавляем в DOM    
    const newCard = new Card(cardData, objCardElementsClassHolder, openPopupViewImage);
    listLocations.append(newCard.prepareCard());
  });  
}

//открытие попапа редактирования профиля
function openPopupEditProfile() {
  inputProfileName.value = textProfileName.textContent;
  inputAboutMe.value = textProfileAboutMe.textContent;
  formEditProfile.addEventListener('submit', saveProfileData);
  formEditProfileValidator.initErrorHints();
  openPopup(popupEditProfile);
}

//сохранение внесенных пользователем данных профиля
function saveProfileData(evt) {
  evt.preventDefault();
  textProfileName.textContent = inputProfileName.value;
  textProfileAboutMe.textContent = inputAboutMe.value; 
  closePopup(popupEditProfile);
}

//добавление новой карточки на страницу
function prependCardNewLocation(evt) {
  evt.preventDefault();
  //ниже добавляем в DOM
  const data = {name: inputLocationName.value, link: inputLocationLink.value};
  const newCard = new Card(data, objCardElementsClassHolder, openPopupViewImage);
  listLocations.prepend(newCard.prepareCard());
  closePopup(popupNewLocation);
}

//открытие попапа добавления новой карточки
function openPopupNewLocation() {
  formNewLocation.reset();
  formNewLocation.addEventListener('submit', prependCardNewLocation);
  formNewLocationValidator.initErrorHints();
  openPopup(popupNewLocation);
}

//Вызовы функций
//--------------
initializeLocations(initialCards);
buttonOpenEditProfile.addEventListener('click', openPopupEditProfile);
buttonCloseEditProfile.addEventListener('click', () => { closePopup(popupEditProfile); });
buttonOpenNewLocation.addEventListener('click', openPopupNewLocation)
buttonCloseNewLocation.addEventListener('click', () => { closePopup(popupNewLocation); });
buttonCloseViewImage.addEventListener('click', () => { closePopup(popupViewImage); });
formEditProfileValidator.enableValidation();
formNewLocationValidator.enableValidation();