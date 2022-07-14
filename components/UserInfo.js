export default class UserInfo{
  constructor({selectorTextName, selectorTextAboutMe, selectorButtonEditProfile, selectorButtonNewLocation}){
    this._elementProfileName = document.querySelector(selectorTextName);
    this._elementProfileAboutMe = document.querySelector(selectorTextAboutMe);
    this._buttonEditProfile = document.querySelector(selectorButtonEditProfile);
    this._buttonNewLocation = document.querySelector(selectorButtonNewLocation);    
  }

  getUserInfo(){
   return {textProfileName:this._elementProfileName.textContent, textProfileAboutMe:this._elementProfileAboutMe.textContent};
  }

  setUserinfo({textProfileName, textProfileAboutMe}){
    this._elementProfileName.textContent = textProfileName;
    this._elementProfileAboutMe.textContent = textProfileAboutMe;
  }

  setEventListeners( handleClickButtonEditProfile, handleClickButtonNewLocation){
    this._buttonEditProfile.addEventListener('click', handleClickButtonEditProfile);
    this._buttonNewLocation.addEventListener('click', handleClickButtonNewLocation);
  }
}