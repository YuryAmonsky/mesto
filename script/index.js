
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

const buttonOpenEditProfile = document.querySelector('.profile__edit-button');
const textProfileName = document.querySelector('.profile__name');
const textProfileAboutMe = document.querySelector('.profile__about-me');
//записываю в константу элемент форма редактирования профиля
const formEditProfile = document.querySelector('.dialog-form_type_edit-profile');
const buttonCloseEditProfile = formEditProfile.parentElement.querySelector('.popup__close-icon');

function loadPage(locations){
  //выбираем контейнер для карточек
  const locationList = document.querySelector('.location-list');
  //выбираем шаблон карточки
  const locationTemplate = document.querySelector('.location-template').content;
  for(let i=0; i<locations.length; i++){
    //клонируем курточку из шаблона
    const location = locationTemplate.querySelector('.location').cloneNode(true);
    //выбираем элемент 'изображение' и задаем ему атрибуты
    const locationImage = location.querySelector('.location__image');
    locationImage.setAttribute('src', initialCards[i].link);
    locationImage.setAttribute('alt', initialCards[i].alt);
    //выбираем элемент 'имя' и задаем ему текстовое содержимое
    const locationName = location.querySelector('.location__name');
    locationName.textContent = initialCards[i].name;
  //добавляем в DOM
    locationList.append(location);
  }
}

function openPopupEditProfile() { 
  const popup = document.querySelector('.popup_type_edit-profile');
  const formInputName = popup.querySelector('.dialog-form__input_type_edit-profile-name');
  const formInputAboutMe = popup.querySelector('.dialog-form__input_type_edit-profile-about-me');
  formInputName.value = textProfileName.textContent;
  formInputAboutMe.value = textProfileAboutMe.textContent;
  popup.classList.add('popup_opened');
}

function closePopup(evt) {
  evt.target.parentElement.parentElement.classList.remove('popup_opened');
}

function saveData(evt) {
  evt.preventDefault();
  textProfileName.textContent = evt.target.querySelector('.dialog-form__input_type_edit-profile-name').value;
  textProfileAboutMe.textContent = evt.target.querySelector('.dialog-form__input_type_edit-profile-about-me').value;
  closePopup(evt);
}

loadPage(initialCards);
buttonOpenEditProfile.addEventListener('click', openPopupEditProfile);
buttonCloseEditProfile.addEventListener('click', closePopup);
formEditProfile.addEventListener('submit', saveData);