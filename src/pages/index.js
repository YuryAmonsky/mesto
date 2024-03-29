/**подключение css */
import './index.css';

/**Подключение модулей*/
/*--------------------*/
import {
  url,
  myToken,
  selectorListLocations,
  objCardElementsClassHolder,
  objProfileElementsClassHolder,
  containerAvatar,
  imageAvatar,
  buttonOpenEditProfile,
  buttonOpenNewLocation,
  objPopupEditProfileElementsClassHolder,
  objPopupEditAvatarElementsClassHolder,
  objPopupNewLocationElementsClassHolder,
  objPopupDeleteLocationElementsClassHolder,
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
import Api from '../components/Api';
//import { values } from 'core-js/core/array';

/**Объявление функций */
/*-------------------------------------------------------------------*/

/**создание разметки карточки и установка слушателей событий для ее элементов */
function createCard(objCardData, objClssHolder) {
  const newCard = new Card(objCardData, objClssHolder,
    /*обработчик нажатия на картинку карточки */
    (name, link) => {
      popupViewImage.open({ name: name, link: link });
    },
    /*обработчик нажатия на иконку удаления карточки */
    (card) => {
      popupDeleteLocation.open(card);
    },
    /*обработчик нажатия на лайк */
    (card) => {
      if(!card.isLiked()){
        server.setLike(card.getId())
          .then(res =>{            
            card.updateCardData(res, currentUserId);
          })
          .catch(err =>{
            console.log(err.status);
            alert(`Ошибка добавления лайка: ${err.status}`);
          })
      }else{
        server.deleteLike(card.getId())
          .then(res =>{            
            card.updateCardData(res, currentUserId);
          })
          .catch(err =>{
            console.log(err.status);
            alert(`Ошибка удаления лайка: ${err.status}`);
          })
      }
    }
  );
  return newCard.prepareCard(currentUserId);
}

/**открытие попапа смены аватара */
function handleClickimageAvatar(){
  popupEditAvatar.open();
  validatorFormEditAvatar.initErrorHints();
}

/**открытие попапа редактирования профиля*/
function handleClickButtonEditProfile(objUserData) {
  popupEditProfile.setInputValues(objUserData);
  validatorFormEditProfile.initErrorHints();
  popupEditProfile.open();
}

/**открытие попапа добавления новой карточки*/
function handleClickButtonNewLocation() {
  popupNewLocation.open();
  validatorFormNewLocation.initErrorHints();
}

/**Создание экземпляров классов и вызовы функций*/
/*----------------------------------------------*/
const server = new Api({
  baseUrl: url,
  headers: {
    authorization: myToken,
    'Content-Type': 'application/json'
  }
});

const profile = new UserInfo(objProfileElementsClassHolder);
let currentUserId = '';
const listLocations = new Section(selectorListLocations,(cardData) => {
  listLocations.appendItem(createCard(cardData, objCardElementsClassHolder));
});

Promise.all([
/**загрузка данных пользователя в профиль*/
  server.getUserInfo(),
  /*загрузка списка карточек*/
  server.loadLocations()  
])
  .then((values) =>{
    profile.setUserAvatar(values[0].avatar);
    profile.setData(values[0]);
    currentUserId = profile.getData()._id;
    listLocations.renderItems(values[1]);
  })
  .catch((err) =>{
    console.log(err.status);
    alert(`Ошибка загрузки данных:\n ${err.status}\n ${err.text}`);
  });

const popupEditProfile = new PopupWithForm(objPopupEditProfileElementsClassHolder, objFormElementsClassHolder, (objProfileData) => {
  popupEditProfile.setSubmitStatus('Сохранение...');
  server.setUserInfo({ name: objProfileData.inputEditProfileName, about: objProfileData.inputEditProfileAboutMe })
    .then(res => {
      profile.setData(res);      
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(err.status);
      alert(`Ошибка сохранения данных профиля:\n ${err.status}\n ${err.text}`);
    })
    .finally(()=>{
      popupEditProfile.setSubmitStatus('Сохранить');  
    });
});

const validatorFormEditProfile = new FormValidator(popupEditProfile.getForm(), objFormElementsClassHolder);


const popupEditAvatar = new PopupWithForm(objPopupEditAvatarElementsClassHolder, objFormElementsClassHolder, (link) => {
  popupEditAvatar.setSubmitStatus('Загрузка...');
  server.setAvatar(link.inputEditAvatar)
    .then(res => {
      profile.setUserAvatar(res.avatar);      
      popupEditAvatar.close();    
    })
    .catch((err) => {      
      console.log(err.status);
      alert(`Ошибка сохранения аватара:\n ${err.status}\n ${err.text}`);
    })
    .finally(()=>{
      popupEditAvatar.setSubmitStatus('Сохранить');
    });
});

const validatorFormEditAvatar = new FormValidator(popupEditAvatar.getForm(), objFormElementsClassHolder);

const popupNewLocation = new PopupWithForm(objPopupNewLocationElementsClassHolder, objFormElementsClassHolder, (objNewLocationData) => {
  popupNewLocation.setSubmitStatus('Добавление...');
  server.addNewLocation({ name: objNewLocationData.inputNewLocationName, link: objNewLocationData.inputNewLocationLink })
    .then(res => {
      listLocations.prependItem(createCard(res, objCardElementsClassHolder));      
      popupNewLocation.close();
    })
    .catch((err) => {
      console.log(err.status);
      alert(`Ошибка добавления поста:\n ${err.status}\n ${err.text}`);
    })
    .finally(()=>{
      popupNewLocation.setSubmitStatus('Создать');
    });
});

const validatorFormNewLocation = new FormValidator(popupNewLocation.getForm(), objFormElementsClassHolder);

const popupDeleteLocation = new PopupWithForm(objPopupDeleteLocationElementsClassHolder, objFormElementsClassHolder, (card) => {
  popupDeleteLocation.setSubmitStatus('Удаление...');
  server.deleteLocation(card.getId())
    .then(res => {
      console.log(res);
      card.remove();      
      popupDeleteLocation.close();
    })
    .catch(err => {
      console.log(err.status);
      alert(`Ошибка удаления поста:\n ${err.status}\n ${err.text}`);
    })
    .finally(()=>{
      popupDeleteLocation.setSubmitStatus('Да');
    });
});

const popupViewImage = new PopupWithImage(objPopupViewImageElementsClassHolder, objPopupViewImageContentClassHolder);

containerAvatar.addEventListener('click', () => {handleClickimageAvatar() });
buttonOpenEditProfile.addEventListener('click', () => { handleClickButtonEditProfile(profile.getData()) });
buttonOpenNewLocation.addEventListener('click', () => { handleClickButtonNewLocation() });
popupEditProfile.setEventListeners();
popupEditAvatar.setEventListeners();
popupNewLocation.setEventListeners();
popupViewImage.setEventListeners();
popupDeleteLocation.setEventListeners();
validatorFormEditProfile.enableValidation();
validatorFormNewLocation.enableValidation();
validatorFormEditAvatar.enableValidation();