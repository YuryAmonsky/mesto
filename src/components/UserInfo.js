export default class UserInfo{
  constructor({selectorTextAboutMe, selectorTextName, selectorAvatar}){
    this._elementProfileName = document.querySelector(selectorTextName);
    this._elementProfileAboutMe = document.querySelector(selectorTextAboutMe);
    this._elementProfileAvatar = document.querySelector(selectorAvatar);
  }

  getUserInfo(){
   return {
            //inputEditProfileName:this._elementProfileName.textContent,
            //inputEditProfileAboutMe:this._elementProfileAboutMe.textContent
            inputEditProfileName:this._data.name, 
            inputEditProfileAboutMe:this._data.about,
            ...this._data
          };
  }

  setUserInfo(objInfo){
    this._data = Object.assign({},objInfo);
    this._elementProfileName.textContent = this._data.name;
    this._elementProfileAboutMe.textContent = this._data.about;
  }

  setUserAvatar(link){
    this._elementProfileAvatar.src=link;
  }
}