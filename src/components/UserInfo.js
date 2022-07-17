export default class UserInfo{
  constructor({selectorTextAboutMe, selectorTextName}){
    this._elementProfileName = document.querySelector(selectorTextName);
    this._elementProfileAboutMe = document.querySelector(selectorTextAboutMe);    
  }

  getUserInfo(){
   return {inputEditProfileName:this._elementProfileName.textContent, inputEditProfileAboutMe:this._elementProfileAboutMe.textContent};
  }

  setUserInfo({inputEditProfileName: name, inputEditProfileAboutMe:aboutMe}){
    this._elementProfileName.textContent = name;
    this._elementProfileAboutMe.textContent = aboutMe;
  }
}