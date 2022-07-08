export default class Popup{
  constructor(selectorPopup){
    this._element = document.querySelector(selectorPopup);
  }
  
  /*открытие попапа*/
  /*class = 'popup_opened' */
  open(classOpenElement){
    this._element.classList.add(classOpenElement);    
  }

}