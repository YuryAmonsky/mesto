//Подключение модулей
//---------------------
import {
  selectorListLocations,
  initialCards,
  objCardElementsClassHolder,
  objProfileElementsClassHolder,
  objPopupEditProfileElementsClassHolder,
  objPopupNewLocationElementsClassHolder,
  objFormElementsClassHolder,
  objPopupViewImageElementsClassHolder,
  objPopupViewImageContentClassHolder  
} from '../utils/constants.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

//Объявление глобальных переменных и констант
//----------------------
//элементы попапа с формой редактирования профиля
/**
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = popupEditProfile.querySelector('.dialog-form_type_edit-profile');
const inputProfileName = formEditProfile.querySelector('.dialog-form__input_type_edit-profile-name');
const inputAboutMe = formEditProfile.querySelector('.dialog-form__input_type_edit-profile-about-me');
const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__close-icon');*/


//элементы попапа с формой добавления нового места
/**
const popupNewLocation = document.querySelector('.popup_type_new-location');
const formNewLocation = popupNewLocation.querySelector('.dialog-form_type_new-location');
const inputLocationName = formNewLocation.querySelector('.dialog-form__input_type_new-location-name');
const inputLocationLink = formNewLocation.querySelector('.dialog-form__input_type_new-location-link');
const buttonCloseNewLocation = popupNewLocation.querySelector('.popup__close-icon');*/



//'элементы попапа просмотра картинки
/**
const popupViewImage = document.querySelector('.popup_type_view-image');
const imageOrigin = popupViewImage.querySelector('.original-image');
const textCaption = popupViewImage.querySelector('.image-caption');
const buttonCloseViewImage = popupViewImage.querySelector('.popup__close-icon');*/


/**Объявление функций */
/*--------------------*/

//начальное заполнение списка мест из массива initialCards
/*
function initializeLocations(locations) {
  locations.forEach((cardData)=>{
    //ниже добавляем в DOM    
    const newCard = new Card(cardData, objCardElementsClassHolder, openPopupViewImage);
    listLocations.append(newCard.prepareCard());
  });  
}*/

//открытие попапа редактирования профиля
/*
function openPopupEditProfile() {  
  formEditProfile.addEventListener('submit', saveProfileData);
  formEditProfileValidator.initErrorHints();
  openPopup(popupEditProfile);
}*/

//сохранение внесенных пользователем данных профиля
/*
function saveProfileData(evt,profile) {
  evt.preventDefault();
  profile.setUserInfo(this);
  this.close();
}*/

//добавление новой карточки на страницу
/*
function prependCardNewLocation(evt) {
  evt.preventDefault();
  //ниже добавляем в DOM
  const data = {name: inputLocationName.value, link: inputLocationLink.value};
  const newCard = new Card(data, objCardElementsClassHolder, openPopupViewImage);
  listLocations.prepend(newCard.prepareCard());
  closePopup(popupNewLocation);
}*/

//открытие попапа добавления новой карточки
/*
function openPopupNewLocation() {
  formNewLocation.reset();
  formNewLocation.addEventListener('submit', prependCardNewLocation);
  formNewLocationValidator.initErrorHints();
  openPopup(popupNewLocation);
}*/

//Создание экземпляров классов и вызовы функций
//--------------
const profile = new UserInfo(objProfileElementsClassHolder);


const popupViewImage = new PopupWithImage(objPopupViewImageElementsClassHolder, objPopupViewImageContentClassHolder)

const listlocations = new Section(selectorListLocations,{items: initialCards, renderer:(cardData)=>{
    const newCard = new Card(cardData, objCardElementsClassHolder, (name, link)=>{      
      popupViewImage.open({name, link});
    });    
    listlocations.appendItem(newCard.prepareCard());
  }
});

listlocations.renderItems();

const popupEditProfile = new PopupWithForm(objPopupEditProfileElementsClassHolder, objFormElementsClassHolder, (objProfileData)=>{
  UserInfo.setUserInfo(objProfileData);
  popupEditProfile.close();
});
const validatorFormEditProfile = new FormValidator(popupEditProfile.getForm(), objFormElementsClassHolder);

const popupNewLocation = new PopupWithForm(objPopupNewLocationElementsClassHolder, objFormElementsClassHolder, (objNewLocationData)=>{
  const newCard = new Card(objNewLocationData, objCardElementsClassHolder, (name, link)=>{      
    popupViewImage.open(name, link);
  });
  listLocations.prependItem(newCard.prepareCard());
  popupNewLocation.close();
});
const formNewLocationValidator = new FormValidator(popupNewLocation.getForm(), objFormElementsClassHolder);

profile.setEventListeners(()=>{
    validatorFormEditProfile.initErrorHints();
    popupEditProfile.open();
  },
  ()=>{
    formNewLocationValidator.initErrorHints();
    popupNewLocation.open();
  });
/*
buttonOpenEditProfile.addEventListener('click', openPopupEditProfile);
buttonCloseEditProfile.addEventListener('click', () => { closePopup(popupEditProfile); });
buttonOpenNewLocation.addEventListener('click', openPopupNewLocation)
buttonCloseNewLocation.addEventListener('click', () => { closePopup(popupNewLocation); });
buttonCloseViewImage.addEventListener('click', () => { closePopup(popupViewImage); });*/
formEditProfileValidator.enableValidation();
formNewLocationValidator.enableValidation();