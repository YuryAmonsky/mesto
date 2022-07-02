//Подключение модулей
//---------------------
import{Card} from './card.js';
import{FormValidator} from './FormValidator.js';

//Объявление глобальных переменных и констант
//----------------------

const initialCards = [
  {
    name: 'Карачаево-Черкессия',
    link: 'images/content/Karachaevsk.jpg',
  },
  {
    name: 'Гора Эльбрус',
    link: 'images/content/Elbrus.jpg',
  },
  {
    name: 'Сочи',
    link: 'images/content/Sochi.jpg',
  },
  {
    name: 'Алтай',
    link: 'images/content/Altay.jpg',
  },
  {
    name: 'Телецкое озеро',
    link: 'images/content/Teletskoe_ozero.jpg',
  },
  {
    name: 'Шато Эркен, Кабардино-балкария',
    link: 'images/content/Shato_Erken_Nalchik.jpg',
  }
];

const objFormElementsClassHolder = {
  selectorForm: '.dialog-form',
  selectorInput: '.dialog-form__input',
  selectorSubmitButton: '.dialog-form__submit-button',
  classButtonDisabled: 'dialog-form__submit-button_disabled',
  classInputInvalid: 'dialog-form__input_invalid',
  classErrorActive: 'dialog-form__input-error_active'
};

const objCardElementsClassHolder = {
  selectorTemplate: '.location-template',
  selectorCard: '.location',
  selectorImage: '.location__image',
  selectorName: '.location__name',
  selectorButtonDelete: '.location__delete-icon',
  selectorButtonLike: '.location__like',
  selectorPopup: '.popup_type_view-image',
  //handleImageClick: openPopupViewImage,
  classLike: 'location__like_active'
}

const textProfileName = document.querySelector('.profile__name');
const textProfileAboutMe = document.querySelector('.profile__about-me');
const buttonOpenEditProfile = document.querySelector('.profile__edit-button');
const buttonOpenNewLocation = document.querySelector('.profile__add-button');
const listLocations = document.querySelector('.location-list');
const templateCardLocation = document.querySelector('.location-template');
//элементы попапа с формой редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = popupEditProfile.querySelector('.dialog-form_type_edit-profile');
const inputProfileName = formEditProfile.querySelector('.dialog-form__input_type_edit-profile-name');
const inputAboutMe = formEditProfile.querySelector('.dialog-form__input_type_edit-profile-about-me');
const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__close-icon');
const formEditProfileValidator = new FormValidator(formEditProfile, objFormElementsClassHolder);

//элементы попапа с формой добавления нового места
const popupNewLocation = document.querySelector('.popup_type_new-location');
const formNewLocation = popupNewLocation.querySelector('.dialog-form_type_new-location');
const inputLocationName = formNewLocation.querySelector('.dialog-form__input_type_new-location-name');
const inputLocationLink = formNewLocation.querySelector('.dialog-form__input_type_new-location-link');
const buttonCloseNewLocation = popupNewLocation.querySelector('.popup__close-icon');
const formNewLocationValidator = new FormValidator(formNewLocation, objFormElementsClassHolder);


//'элементы попапа просмотра картинки
const popupViewImage = document.querySelector('.popup_type_view-image');
const imageOrigin = popupViewImage.querySelector('.original-image');
const textCaption = popupViewImage.querySelector('.image-caption');
const buttonCloseViewImage = popupViewImage.querySelector('.popup__close-icon');


//Объявление функций 
//------------------

//открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closePopupOnBGClick);
  document.addEventListener('keydown', closePopupOnEscapePress);
}

//закрытие попапов
function closePopup(popup) {
  popup.removeEventListener('click', closePopupOnBGClick);
  document.removeEventListener('keydown', closePopupOnEscapePress);
  popup.classList.remove('popup_opened');
}

//начальное заполнение списка мест из массива initialCards
function initializeLocations(locations) {
  for (let i = 0; i < locations.length; i++) {
    //ниже добавляем в DOM
    const data = {name: initialCards[i].name, link: initialCards[i].link};
    const newCard = new Card(data, objCardElementsClassHolder, openPopupViewImage);
    listLocations.append(newCard.prepareCard());
  }
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

//открытие попапа просмотра картинки
function openPopupViewImage(name, link) {
  imageOrigin.setAttribute('src', link);
  imageOrigin.setAttribute('alt', `Фотография места ${name}`);
  textCaption.textContent = name;
  openPopup(popupViewImage);
}

function closePopupOnBGClick(evt) {
  if(evt.target.classList.contains('popup__container')){
    closePopup(evt.target.closest('.popup'));
  }  
}

function closePopupOnEscapePress(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    if (popup) {
      closePopup(popup);
    }
  }
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