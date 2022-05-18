
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


const popup = document.querySelector('.popup');
const formElement = document.querySelector('.edit-profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const formCloseIcon = document.querySelector('.popup__close-icon');
const formInputName = document.querySelector('.edit-profile__input_type_name');
const formInputAboutMe = document.querySelector('.edit-profile__input_type_about-me');
const textProfileName = document.querySelector('.profile__name');
const textProfileAboutMe = document.querySelector('.profile__about-me')

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

loadPage(initialCards);
profileEditButton.addEventListener('click', openForm);
formCloseIcon.addEventListener('click', closeForm);
formElement.addEventListener('submit', saveData);