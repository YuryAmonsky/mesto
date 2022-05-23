//Объявление глобальных переменных и констант
//----------------------
const initialCards = [
  {
    name: 'Карачаево-Черкессия',
    link: 'images/content/Karachaevsk.jpg',
    alt: 'Заброшенный храм на фоне горы.'
  },
  {
    name: 'Гора Эльбрус',
    link: 'images/content/Elbrus.jpg',
    alt: 'Гора вдали.'
  },
  {
    name: 'Домбай',
    link: 'images/content/Dombai.jpg',
    alt: 'Спереди лес на склоне горы, высокий горный пик на заднем плане.'
  },
  {
    name: 'Зеленоград',
    link: 'images/content/Zelenograd.jpg',
    alt: 'Янтарь на песке у моря.'
  },
  {
    name: 'Сочи',
    link: 'images/content/Sochi.jpg',
    alt: 'За лесом на горной гряде город у моря.'
  },
  {
    name: 'Телецкое озеро',
    link: 'images/content/Teletskoe_ozero.jpg',
    alt: 'Зеркальная гладь воды отражает небо и горы.'
  },
  {
    name: 'Паанаярви, Карелия',
    link: 'images/content/Paanajarvi_Karelia_med.jpg',
    alt: 'Озерезо среди участков хвойного леса.'
  },
  {
    name: 'Алтай',
    link: 'images/content/Altay.jpg',
    alt: 'Река тчет мимо деревни у подножия горного склона, покрытого хвойным лесом .'
  }
];

const textProfileName = document.querySelector('.profile__name');
const textProfileAboutMe = document.querySelector('.profile__about-me');
const buttonOpenEditProfile = document.querySelector('.profile__edit-button');
const buttonOpenNewLocation = document.querySelector('.profile__add-button');
const listLocations = document.querySelector('.location-list');
const templateCardLocation = document.querySelector('.location-template');
//элементы попапа сформой редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = popupEditProfile.querySelector('.dialog-form_type_edit-profile');
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

//Объявление функций
//------------------
function prepareCardLocation(name, link, textAlt) {
  //клонируем курточку из шаблона
  const location = templateCardLocation.content.querySelector('.location').cloneNode(true);
  //выбираем элемент 'изображение' и задаем ему атрибуты
  const imageLocation = location.querySelector('.location__image');
  imageLocation.setAttribute('src', link);
  imageLocation.setAttribute('alt', textAlt);
  imageLocation.addEventListener('click', openPopupViewImage);
  //выбираем элемент 'имя' и задаем ему текстовое содержимое
  const textLocationName = location.querySelector('.location__name');
  textLocationName.textContent = name;
  const buttonDelete = location.querySelector('.location__delete-icon');
  const buttonLike = location.querySelector('.location__like');
  buttonDelete.addEventListener('click', evt => listLocations.removeChild(evt.target.parentElement));
  buttonLike.addEventListener('click', () => buttonLike.classList.toggle('location__like_active'));
  return location;
}
function initializeLocations(locations) {
  for (let i = 0; i < locations.length; i++) {
    //добавляем в DOM
    listLocations.append(prepareCardLocation(initialCards[i].name, initialCards[i].link, initialCards[i].alt));
  }
}

function openPopupEditProfile() {
  const popup = document.querySelector('.popup_type_edit-profile');
  const inputName = popup.querySelector('.dialog-form__input_type_edit-profile-name');
  const inputAboutMe = popup.querySelector('.dialog-form__input_type_edit-profile-about-me');
  inputName.value = textProfileName.textContent;
  inputAboutMe.value = textProfileAboutMe.textContent;  
  popup.classList.add('popup_opened');
}

function saveProfileData(evt) {
  evt.preventDefault();
  textProfileName.textContent = evt.target.querySelector('.dialog-form__input_type_edit-profile-name').value;
  textProfileAboutMe.textContent = evt.target.querySelector('.dialog-form__input_type_edit-profile-about-me').value;
  closePopup(evt);
}

function openPopupNewLocation() {
  const popup = document.querySelector('.popup_type_new-location');
  inputLocationName.value = '';
  inputLocationLink.value = '';  
  popup.classList.add('popup_opened');
}

function prependCardNewLocation(evt) {
  evt.preventDefault();
  //добавляем в DOM
  listLocations.prepend(prepareCardLocation(inputLocationName.value, inputLocationLink.value, ''));
  closePopup(evt);
}

function openPopupViewImage(evt){  
  imageOrigin.setAttribute('src', evt.target.getAttribute('src'));
  imageOrigin.setAttribute('alt', evt.target.getAttribute('alt'));
  textCaption.textContent=evt.target.parentElement.querySelector('.location__name').textContent;  
  popupViewImage.classList.add('popup_opened');
}

function closePopup(evt) {
  //if(evt.target.tagName==='FORM'){
  //  evt.target.parentElement.parentElement.classList.remove('popup_opened');
  //}else {
    evt.target.parentElement.classList.remove('popup_opened');
  //}    
}
//Вызовы функций
//--------------
initializeLocations(initialCards);
buttonOpenEditProfile.addEventListener('click', openPopupEditProfile);
buttonCloseEditProfile.addEventListener('click', closePopup);
buttonOpenNewLocation.addEventListener('click', openPopupNewLocation)
buttonCloseNewLocation.addEventListener('click', closePopup);
buttonCloseViewImage.addEventListener('click', closePopup);
formEditProfile.addEventListener('submit', saveProfileData);
formNewLocation.addEventListener('submit', prependCardNewLocation);