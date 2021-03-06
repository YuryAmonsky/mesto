/**подключение css */
import './index.css';

/**Подключение модулей*/
/*--------------------*/
import {
  selectorListLocations,
  initialCards,
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

/**Объявление функций */
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
const profile = new UserInfo(objProfileElementsClassHolder);

const listlocations = new Section(selectorListLocations,{items: initialCards, renderer:(cardData)=>{    
    listlocations.appendItem(createCard(cardData, objCardElementsClassHolder));
  }
});
listlocations.renderItems();

const popupEditProfile = new PopupWithForm(objPopupEditProfileElementsClassHolder, objFormElementsClassHolder, (objProfileData)=>{
  profile.setUserInfo(objProfileData);
  popupEditProfile.close();
});
const validatorFormEditProfile = new FormValidator(popupEditProfile.getForm(), objFormElementsClassHolder);

const popupNewLocation = new PopupWithForm(objPopupNewLocationElementsClassHolder, objFormElementsClassHolder, (objNewLocationData)=>{    
  listlocations.prependItem(createCard({name:objNewLocationData.inputNewLocationName, link:objNewLocationData.inputNewLocationLink}, 
    objCardElementsClassHolder));
  popupNewLocation.close();
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