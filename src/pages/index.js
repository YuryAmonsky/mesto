/**подключение css */
import './index.css';

/**Подключение модулей*/
/*--------------------*/
import {
  url,
  myId,
  selectorListLocations,
  objCardElementsClassHolder,
  objProfileElementsClassHolder,
  buttonOpenEditProfile,
  buttonOpenNewLocation,
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
import Api from '../components/Api';

/**Объявление функций */
/*-------------------------------------------------------------------*/
 /**создание разметки карточки и установка слушателей событий для ее элементов */
function createCard(objCardData, objClssHolder){
  const newCard = new Card(objCardData, objClssHolder, (name, link)=>{            
    popupViewImage.open({name: name, link: link});      
  });
  return newCard.prepareCard();  
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
    authorization: myId,
    'Content-Type': 'application/json'
  }
});

const profile = new UserInfo(objProfileElementsClassHolder);
/**загрузка данных пользователя в профиль*/
server.getUserInfo()
  .then(res =>{
    profile.setUserAvatar(res.avatar);
    profile.setUserInfo(res);    
  })
  .catch((err) => {
    console.log(err.status);
    profile.setUserInfo({"name": "Ошибка получения данных с сервера",
      "about": "Ошибка получения данных с сервера",
    })
});

let listLocations = null;
server.loadLocations()
  .then(res=>{
    listLocations = new Section(selectorListLocations, res, 
      (cardData)=>{    
        listLocations.appendItem(createCard(cardData, objCardElementsClassHolder));
      });
    listLocations.renderItems();
  })
  .catch(err =>{
    console.log(err.status);
    listLocations = new Section(selectorListLocations, [{'name':'Ошибка загрузки данных с сервера', 'link':''}], (cardData)=>{    
        listLocations.appendItem(createCard(cardData, objCardElementsClassHolder));
      });
    listLocations.renderItems();  
  });

const popupEditProfile = new PopupWithForm(objPopupEditProfileElementsClassHolder, objFormElementsClassHolder, (objProfileData)=>{
  server.setUserInfo({name:objProfileData.inputEditProfileName,about:objProfileData.inputEditProfileAboutMe}, popupEditProfile)
    .then(res =>{
      profile.setUserInfo(res);
      popupEditProfile.setSubmitStatus('Сохранить');
      popupEditProfile.close();
    })
    .catch((err) =>{
      popupEditProfile.setSubmitStatus('Сохранить');
      console.log(err.status);
    });  
});

const validatorFormEditProfile = new FormValidator(popupEditProfile.getForm(), objFormElementsClassHolder);

const popupNewLocation = new PopupWithForm(objPopupNewLocationElementsClassHolder, objFormElementsClassHolder, (objNewLocationData)=>{    
  server.addNewLocation({name:objNewLocationData.inputNewLocationName, link:objNewLocationData.inputNewLocationLink}, popupNewLocation)
    .then(res =>{
      listLocations.prependItem(createCard(res, objCardElementsClassHolder));
      popupNewLocation.setSubmitStatus('Создать');
      popupNewLocation.close();
    })
    .catch((err) =>{
      popupEditProfile.setSubmitStatus('Сохранить');
      console.log(err.status);
    })  
});

const validatorFormNewLocation = new FormValidator(popupNewLocation.getForm(), objFormElementsClassHolder);

const popupViewImage = new PopupWithImage(objPopupViewImageElementsClassHolder, objPopupViewImageContentClassHolder);

buttonOpenEditProfile.addEventListener('click', ()=>{handleClickButtonEditProfile(profile.getUserInfo())});
buttonOpenNewLocation.addEventListener('click', ()=>{handleClickButtonNewLocation()});
popupEditProfile.setEventListeners();
popupNewLocation.setEventListeners();
popupViewImage.setEventListeners();
validatorFormEditProfile.enableValidation();
validatorFormNewLocation.enableValidation();