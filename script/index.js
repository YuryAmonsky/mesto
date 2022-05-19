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
    alt: '"Зеркальная гладь воды отражает небо и горы.'
  }
]; 

const textProfileName = document.querySelector('.profile__name');
const textProfileAboutMe = document.querySelector('.profile__about-me');
const listLocations = document.querySelector('.location-list');
const templateCardLocation = document.querySelector('.location-template');
//записываем в константу элемент 'форма редактирования профиля'
const formEditProfile = document.querySelector('.dialog-form_type_edit-profile');
const buttonOpenEditProfile = document.querySelector('.profile__edit-button');
const buttonCloseEditProfile = formEditProfile.parentElement.querySelector('.popup__close-icon');
//записываем в константу элемент 'форма добавления нового места'
const formNewLocation = document.querySelector('.dialog-form_type_new-location');
const inputLocationName = formNewLocation.querySelector('.dialog-form__input_type_new-location-name');
const inputLocationLink = formNewLocation.querySelector('.dialog-form__input_type_new-location-link');
const buttonOpenNewLocation = document.querySelector('.profile__add-button');
const buttonCloseNewLocation = formNewLocation.parentElement.querySelector('.popup__close-icon');

//Объявление функций
//------------------
function prepareCardLocation(name, link, textAlt){
  //клонируем курточку из шаблона
  const location = templateCardLocation.content.querySelector('.location').cloneNode(true);
  //выбираем элемент 'изображение' и задаем ему атрибуты
  const imageLocation = location.querySelector('.location__image');
  imageLocation.setAttribute('src', link);
  imageLocation.setAttribute('alt', textAlt);
  //выбираем элемент 'имя' и задаем ему текстовое содержимое
  const textLocationName = location.querySelector('.location__name');
  textLocationName.textContent = name;
  return location;
}
function initializeLocations(locations){  
  for(let i=0; i<locations.length; i++){    
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

function openPopupNewLocation(){
  const popup = document.querySelector('.popup_type_type_new-location');
  inputLocationName.value = '';
  inputLocationLink.value = '';
  popup.classList.add('popup_opened');
}

function PrependCardNewLocation(evt){
  evt.preventDefault();  
  //добавляем в DOM
  listLocations.prepend(prepareCardLocation(inputLocationName.value, inputLocationLink.value, ''));
  closePopup(evt);
}

function closePopup(evt) {
  evt.target.parentElement.parentElement.classList.remove('popup_opened');
}
//Вызовы функций
//--------------
initializeLocations(initialCards);
buttonOpenEditProfile.addEventListener('click', openPopupEditProfile);
buttonCloseEditProfile.addEventListener('click', closePopup);
buttonOpenNewLocation.addEventListener('click', openPopupNewLocation)
buttonCloseNewLocation.addEventListener('click', closePopup);
formEditProfile.addEventListener('submit', saveProfileData);
formNewLocation.addEventListener('submit', PrependCardNewLocation);