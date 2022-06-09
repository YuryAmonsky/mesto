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

//элементы попапа с формой добавления нового места
const popupNewLocation = document.querySelector('.popup_type_new-location');
const formNewLocation = popupNewLocation.querySelector('.dialog-form_type_new-location');
const inputLocationName = formNewLocation.querySelector('.dialog-form__input_type_new-location-name');
const inputLocationLink = formNewLocation.querySelector('.dialog-form__input_type_new-location-link');
const buttonCloseNewLocation = popupNewLocation.querySelector('.popup__close-icon');
//'элементы попапа просмотра картинки
const popupViewImage = document.querySelector('.popup_type_view-image');
const imageOrigin = popupViewImage.querySelector('.original-image');
const textCaption = popupViewImage.querySelector('.image-caption');
const buttonCloseViewImage = popupViewImage.querySelector('.popup__close-icon');

const objFormElementsClassHolder = {
  selectorForm: '.dialog-form',
  selectorInput: '.dialog-form__input',
  selectorSubmitButton: '.dialog-form__submit-button',
  classButtonDisabled: 'dialog-form__submit-button_disabled',
  classInputInvalid: 'dialog-form__input_invalid',
  classErrorActive: 'dialog-form__input-error_active'
};
//Объявление функций
//------------------
//создание из шаблона и подготовка новой карточки место
function prepareCardLocation(name, link, textAlt) {
  //клонируем курточку из шаблона
  const location = templateCardLocation.content.querySelector('.location').cloneNode(true);
  //выбираем элемент 'изображение' и задаем ему атрибуты
  const imageLocation = location.querySelector('.location__image');
  imageLocation.setAttribute('src', link);
  imageLocation.setAttribute('alt', textAlt);
  imageLocation.addEventListener('click', () => { openPopupViewImage(name, link); });
  //ниже выбираем элемент 'имя' и задаем ему текстовое содержимое
  const textLocationName = location.querySelector('.location__name');
  textLocationName.textContent = name;
  const buttonDelete = location.querySelector('.location__delete-icon');
  const buttonLike = location.querySelector('.location__like');
  buttonDelete.addEventListener('click', evt => listLocations.removeChild(evt.target.parentElement));
  buttonLike.addEventListener('click', () => buttonLike.classList.toggle('location__like_active'));
  return location;
}

//начальное заполнение списка мест из массива initialCards
function initializeLocations(locations) {
  for (let i = 0; i < locations.length; i++) {
    //ниже добавляем в DOM
    listLocations.append(prepareCardLocation(initialCards[i].name, initialCards[i].link, `Фотография места ${initialCards[i].name}`));
  }
}

//открытие попапа редактирования профиля
function openPopupEditProfile() {
  inputProfileName.value = textProfileName.textContent;
  inputAboutMe.value = textProfileAboutMe.textContent;
  validateForm(formEditProfile, objFormElementsClassHolder);
  openPopup(popupEditProfile);
}

//сохранение внесенных пользователем данных профиля
function saveProfileData(evt) {
  evt.preventDefault();
  textProfileName.textContent = inputProfileName.value;
  textProfileAboutMe.textContent = inputAboutMe.value;
  closePopup(popupEditProfile);
}

//открытие попапа добавления новой карточки
function openPopupNewLocation() {
  formNewLocation.reset();
  validateForm(formNewLocation, objFormElementsClassHolder);
  openPopup(popupNewLocation);
}

//добавление новой карточки на страницу
function prependCardNewLocation(evt) {
  evt.preventDefault();
  //ниже добавляем в DOM
  listLocations.prepend(prepareCardLocation(inputLocationName.value, inputLocationLink.value, `Фотография места ${inputLocationName.value}`));
  closePopup(popupNewLocation);
}

//открытие попапа просмотра картинки
function openPopupViewImage(name, link) {
  imageOrigin.setAttribute('src', link);
  imageOrigin.setAttribute('alt', `Фотография места ${name}`);
  textCaption.textContent = name;
  openPopup(popupViewImage);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEscapePress);
}

//закрытие попапов
function closePopup(popup) {
  document.removeEventListener('keydown', closePopupOnEscapePress);
  popup.classList.remove('popup_opened');
}

function isClickedOnElement(element, evt) {
  const rect = element.getBoundingClientRect();
  return evt.clientX > rect.left && evt.clientX < rect.right && evt.clientY > rect.top && evt.clientY < rect.bottom;
}

function closePopupOnBGClick(popup, evt) {
  const popupContainer = popup.children[0];
  for (let i = 0; i < popupContainer.children.length; i++) {
    if (isClickedOnElement(popupContainer.children[i], evt)) {
      return null;
    }
  }
  closePopup(popup);
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
popupEditProfile.addEventListener('click', (evt) => { closePopupOnBGClick(popupEditProfile, evt); });
popupNewLocation.addEventListener('click', (evt) => { closePopupOnBGClick(popupNewLocation, evt); });
popupViewImage.addEventListener('click', (evt) => { closePopupOnBGClick(popupViewImage, evt); });
formEditProfile.addEventListener('submit', saveProfileData);
formNewLocation.addEventListener('submit', prependCardNewLocation);