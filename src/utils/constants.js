const url = 'https://mesto.nomoreparties.co/v1/cohort-46';
const myId = '5e6cc9f1-f651-45bc-a626-0a767814a31d';
const selectorListLocations = '.location-list';

/**объект с селекторами и html-классами карточки места*/
const objCardElementsClassHolder = {
  selectorTemplate: '.location-template',
  selectorCard: '.location',
  selectorImage: '.location__image',
  selectorName: '.location__name',
  selectorButtonDelete: '.location__delete-icon',
  selectorButtonLike: '.location__like',
  selectorLikesNumber: '.location__likes-number',
  classLike: 'location__like_active'
}

/** объект с селекторами элементов профиля пользователя*/
const objProfileElementsClassHolder = {
  selectorTextName: '.profile__name',
  selectorTextAboutMe: '.profile__about-me',
  selectorAvatar: '.profile__avatar'
}

const buttonOpenEditProfile = document.querySelector('.profile__edit-button');
const buttonOpenNewLocation = document.querySelector('.profile__add-button');

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
  selectorPopup: '.popup_type_view-image',
  selectorButtonClose: selectorPopupCloseButton,
  classOpenedPopup: classOpenedPopup
}

const objPopupViewImageContentClassHolder = {
  selectorImage: '.original-image',
  selectorCaption: '.image-caption'
}

export{
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
}