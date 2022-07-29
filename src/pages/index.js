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

/**Проверка на принадлежность карточки*/
function isUserCardOwner(card) {
  return profile.getData()._id === card.getCardOwner()._id ? true : false;
}

/**создание разметки карточки и установка слушателей событий для ее элементов */
function createCard(objCardData, objClssHolder) {
  const newCard = new Card(objCardData, objClssHolder,
    (name, link) => {
      popupViewImage.open({ name: name, link: link });
    },
    (card) => {
      popupDeleteLocation.open(card);
    }
  );
  return newCard.prepareCard(isUserCardOwner(newCard));
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
/**загрузка данных пользователя в профиль*/
server.getUserInfo()
  .then(res => {
    profile.setUserAvatar(res.avatar);
    profile.setData(res);
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
    listLocations = new Section(selectorListLocations, [{ 'name': 'Ошибка загрузки данных с сервера', 'link': '' }], (cardData) => {
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
  server.deleteLocation(card, popupDeleteLocation)
    .then(res => {
      res.remove();
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