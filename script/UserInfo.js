export default class UserInfo{
  constructor({selectorInputName, selectorInputAboutMe}, handleClickButtonEditProfile, handleClickButtonNewLocation){
    this._elementProfileName = document.querySelector('.profile__name');
    this._elementProfileAboutMe = document.querySelector('.profile__about-me');
    this._buttonEditProfile = document.querySelector('.profile__edit-button');
    this._buttonNewLocation = document.querySelector('.profile__add-button');
    this._handleClickButtonEditrofile = handleClickButtonEditProfile;
    this._handleClickButtonNewLocation = handleClickButtonNewLocation;
  }

  getUserInfo(){
   return {textProfileName:this._elementProfileName.textContent, textProfileAboutMe:this._elementProfileAboutMe.textContent};
  }

  setUserinfo({textProfileName, textProfileAboutMe}){
    this._elementProfileName.textContent = textProfileName;
    this._elementProfileAboutMe.textContent = textProfileAboutMe;
  }

  setEventListeners(){
    this._buttonEditProfile.addEventListener('click', this._handleClickButtonEditrofile.bind(this));
    this._buttonNewLocation.addEventListener('click', this._handleClickButtonNewLocation.bind(this));
  }
}