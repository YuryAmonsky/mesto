/**подключение css */
import './index.css';

/**Подключение модулей*/
/*--------------------*/
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


/**Создание экземпляров классов и вызовы функций*/
/*----------------------------------------------*/
const profile = new UserInfo(objProfileElementsClassHolder);

const listlocations = new Section(selectorListLocations,{items: initialCards, renderer:(cardData)=>{
    const newCard = new Card(cardData, objCardElementsClassHolder, (name, link)=>{            
      popupViewImage.open({name, link});      
    });    
    listlocations.appendItem(newCard.prepareCard());
  }
});
listlocations.renderItems();

const popupEditProfile = new PopupWithForm(objPopupEditProfileElementsClassHolder, objFormElementsClassHolder, (objProfileData)=>{
  profile.setUserInfo(objProfileData);
  popupEditProfile.close();
});
const validatorFormEditProfile = new FormValidator(popupEditProfile.getForm(), objFormElementsClassHolder);

const popupNewLocation = new PopupWithForm(objPopupNewLocationElementsClassHolder, objFormElementsClassHolder, (objNewLocationData)=>{
    const newCard = new Card({name:objNewLocationData.inputNewLocationName, link:objNewLocationData.inputNewLocationLink}, objCardElementsClassHolder, 
   (name, link)=>{      
     popupViewImage.open({name: name, link: link});
  });
  listlocations.prependItem(newCard.prepareCard());
  popupNewLocation.close();
});
const validatorFormNewLocation = new FormValidator(popupNewLocation.getForm(), objFormElementsClassHolder);

const popupViewImage = new PopupWithImage(objPopupViewImageElementsClassHolder, objPopupViewImageContentClassHolder);

profile.setEventListeners(()=>{    
    popupEditProfile.open(profile.getUserInfo());
    validatorFormEditProfile.initErrorHints();
  },
  ()=>{    
    popupNewLocation.open({inputNewLocationName:'',inputNewLocationLink:''});
    validatorFormNewLocation.initErrorHints();
});
popupEditProfile.setEventListeners();
popupNewLocation.setEventListeners();
popupViewImage.setEventListeners();
validatorFormEditProfile.enableValidation();
validatorFormNewLocation.enableValidation();