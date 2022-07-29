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
  buttonOpenEditProfile,
  buttonOpenNewLocation,
  objPopupEditProfileElementsClassHolder,
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
          })
      }else{
        server.deleteLike(card.getId())
          .then(res =>{            
            card.updateCardData(res, currentUserId);
          })
          .catch(err =>{
            console.log(err.status);
          })
      }
    }
  );
  return newCard.prepareCard(currentUserId);
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
/**загрузка данных пользователя в профиль*/
server.getUserInfo()
  .then(res => {
    profile.setUserAvatar(res.avatar);
    profile.setData(res);
    currentUserId = profile.getData()._id;
  })
  .catch((err) => {
    console.log(err.status);
    profile.setData({
      "name": "Ошибка получения данных с сервера",
      "about": "Ошибка получения данных с сервера",
    })
  });
  

let listLocations = null;
server.loadLocations()
  .then(res => {
    listLocations = new Section(selectorListLocations, res,
      (cardData) => {
        listLocations.appendItem(createCard(cardData, objCardElementsClassHolder));
      });
    listLocations.renderItems();
  })
  .catch(err => {
    console.log(err.status);
    listLocations = new Section(selectorListLocations, 
      [{
         'likes': [],
         '_id': '',
         'name': 'Ошибка загрузки данных с сервера', 
         'link': '',
         'owner': {
           'name': '',
           'about': '',
           'avatar': '',
           '_id': '',
           'cohort': '' 
         },
         'createdAt': ''
      }],
       (cardData) => {
         listLocations.appendItem(createCard(cardData, objCardElementsClassHolder));
    });
    listLocations.renderItems();
  });

const popupEditProfile = new PopupWithForm(objPopupEditProfileElementsClassHolder, objFormElementsClassHolder, (objProfileData) => {
  server.setUserInfo({ name: objProfileData.inputEditProfileName, about: objProfileData.inputEditProfileAboutMe }, popupEditProfile)
    .then(res => {
      profile.setData(res);
      popupEditProfile.setSubmitStatus('Сохранить');
      popupEditProfile.close();
    })
    .catch((err) => {
      popupEditProfile.setSubmitStatus('Сохранить');
      console.log(err.status);
    });
});

const validatorFormEditProfile = new FormValidator(popupEditProfile.getForm(), objFormElementsClassHolder);

const popupNewLocation = new PopupWithForm(objPopupNewLocationElementsClassHolder, objFormElementsClassHolder, (objNewLocationData) => {
  server.addNewLocation({ name: objNewLocationData.inputNewLocationName, link: objNewLocationData.inputNewLocationLink }, popupNewLocation)
    .then(res => {
      listLocations.prependItem(createCard(res, objCardElementsClassHolder));
      popupNewLocation.setSubmitStatus('Создать');
      popupNewLocation.close();
    })
    .catch((err) => {
      popupEditProfile.setSubmitStatus('Создать');
      console.log(err.status);
    })
});

const validatorFormNewLocation = new FormValidator(popupNewLocation.getForm(), objFormElementsClassHolder);

const popupDeleteLocation = new PopupWithForm(objPopupDeleteLocationElementsClassHolder, objFormElementsClassHolder, (card) => {
  server.deleteLocation(card.getId(), popupDeleteLocation)
    .then(res => {
      console.log(res);
      card.remove();
      popupDeleteLocation.setSubmitStatus('Да');
    })
    .catch(err => {
      popupDeleteLocation.setSubmitStatus('Да');
      console.log(err.status);
    });
});

const popupViewImage = new PopupWithImage(objPopupViewImageElementsClassHolder, objPopupViewImageContentClassHolder);

buttonOpenEditProfile.addEventListener('click', () => { handleClickButtonEditProfile(profile.getData()) });
buttonOpenNewLocation.addEventListener('click', () => { handleClickButtonNewLocation() });
popupEditProfile.setEventListeners();
popupNewLocation.setEventListeners();
popupViewImage.setEventListeners();
popupDeleteLocation.setEventListeners();
validatorFormEditProfile.enableValidation();
validatorFormNewLocation.enableValidation();