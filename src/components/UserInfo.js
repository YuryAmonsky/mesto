export default class UserInfo{
  constructor({selectorButtonEditProfile, selectorButtonNewLocation, selectorTextAboutMe, selectorTextName}){
    this._elementProfileName = document.querySelector(selectorTextName);
    this._elementProfileAboutMe = document.querySelector(selectorTextAboutMe);
    this._buttonEditProfile = document.querySelector(selectorButtonEditProfile);
    this._buttonNewLocation = document.querySelector(selectorButtonNewLocation);    
  }

  getUserInfo(){
   return {inputEditProfileName:this._elementProfileName.textContent, inputEditProfileAboutMe:this._elementProfileAboutMe.textContent};
  }

  setUserInfo({inputEditProfileName: name, inputEditProfileAboutMe:aboutMe}){
    this._elementProfileName.textContent = name;
    this._elementProfileAboutMe.textContent = aboutMe;
  }

  setEventListeners( handleClickButtonEditProfile, handleClickButtonNewLocation){
    this._buttonEditProfile.addEventListener('click', handleClickButtonEditProfile);
    this._buttonNewLocation.addEventListener('click', handleClickButtonNewLocation);
  }
}