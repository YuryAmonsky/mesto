export default class UserInfo{
  constructor({selectorTextAboutMe, selectorTextName, selectorAvatar}){
    this._elementProfileName = document.querySelector(selectorTextName);
    this._elementProfileAboutMe = document.querySelector(selectorTextAboutMe);
    this._elementProfileAvatar = document.querySelector(selectorAvatar);
  }

  getUserInfo(){
   return {inputEditProfileName:this._elementProfileName.textContent, inputEditProfileAboutMe:this._elementProfileAboutMe.textContent};
  }

  setUserInfo(objInfo){
    this._elementProfileName.textContent = objInfo.name;
    this._elementProfileAboutMe.textContent = objInfo.about;
  }

  setUserAvatar(link){
    this._elementProfileAvatar.src=link;
  }
}