const initialCards = [
  {
    name: 'Карачаево-Черкессия',
    link: 'images/content/Karachaevsk.jpg',
  },
  {
    name: 'Гора Эльбрус',
    link: 'images/content/Elbrus.jpg',
  },
  {
    name: 'Сочи',
    link: 'images/content/Sochi.jpg',
  },
  {
    name: 'Алтай',
    link: 'images/content/Altay.jpg',
  },
  {
    name: 'Телецкое озеро',
    link: 'images/content/Teletskoe_ozero.jpg',
  },
  {
    name: 'Шато Эркен, Кабардино-балкария',
    link: 'images/content/Shato_Erken_Nalchik.jpg',
  }
];
/**объект с селекторами и html-классами карточки места*/
const objCardElementsClassHolder = {
  selectorTemplate: '.location-template',
  selectorCard: '.location',
  selectorImage: '.location__image',
  selectorName: '.location__name',
  selectorButtonDelete: '.location__delete-icon',
  selectorButtonLike: '.location__like',
  selectorPopup: '.popup_type_view-image',  
  classLike: 'location__like_active'
}

/** объект с селекторами элементов профиля пользователя*/
const objProfileElementsClassHolder = {
  selectorInputName: '.profile__name',
  selectorInputAboutMe: '.profile__about-me',
  selectorButtonEditProfile: '.profile__edit-button',
  selectorButtonNewLocation: '.profile__add-button'
}

const selectorPopupCloseButton = '.popup__close-icon';
const classOpenedPopup = 'popup_opened';

/**объект с селекторами и html-классами попапа редактирования профиля пользователя*/
const objPopupEditProfileElementsClassHolder = {
  selectorPopup: '.popup_type_edit-profile',
  selectorButtonClose: selectorPopupCloseButton,
  classOpenedPopup: classOpenedPopup
}

/**объект с селекторами и html-классами попапа добавления новой карточки*/
const objPopupNewLocationElementsClassHolder = {
  selectorPopup: '.popup_type_new-location',
  selectorButtonClose: selectorPopupCloseButton,
  classOpenedPopup: classOpenedPopup
}

/**объект с селекторами и html-классами формы попапа */
const objFormElementsClassHolder = {
  selectorForm: '.dialog-form',
  selectorInput: '.dialog-form__input',
  selectorSubmitButton: '.dialog-form__submit-button',
  classButtonDisabled: 'dialog-form__submit-button_disabled',
  classInputInvalid: 'dialog-form__input_invalid',
  classErrorActive: 'dialog-form__input-error_active'
};

/**объект с селекторами и html-классами попапа промотра кртинки*/
const objPopupViewImageElementsClassHolder = {
  selectorPopup: 'popup_type_view-image',
  selectorButtonClose: selectorPopupCloseButton,
  classOpenedPopup: classOpenedPopup
}

const objPopupViewImageContentClassHolder = {
  selectorImage: '.original-image',
  selectorCaption: '.image-caption'
}