export default class Popup{
  constructor({selectorPopup, classOpenedPopup}){
    this._element = document.querySelector(selectorPopup);
    this._classOpened = classOpenedPopup;
  }
  
  /*открытие попапа*/
  /*class = 'popup_opened' */
  open(){
    this._element.classList.add(this._classOpened);    
  }

  
}