export default class UserInfo{
  constructor({selectorTextName, selectorTextAboutMe, selectorButtonEditProfile, selectorButtonNewLocation}, handleClickButtonEditProfile, handleClickButtonNewLocation){
    this._elementProfileName = document.querySelector(selectorTextName);
    this._elementProfileAboutMe = document.querySelector(selectorTextAboutMe);
    this._buttonEditProfile = document.querySelector(selectorButtonEditProfile);
    this._buttonNewLocation = document.querySelector(selectorButtonNewLocation);
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