export default class Popup{
  constructor({selectorPopup, classOpenedPopup}){
    this._element = document.querySelector(selectorPopup);    
    this._classOpened = classOpenedPopup;/*class = 'popup_opened' */
  }
  
  /*открытие попапа*/
  open(){
    this._element.classList.add(this._classOpened);    
  }

  /*закрытие попапа*/
  close(){
    this._element.classList.remove(this._classOpened);
  }

  //закрытие попапов
  /*
 function closePopup(popup) {
  popup.removeEventListener('click', closePopupOnBGClick);
  document.removeEventListener('keydown', closePopupOnEscapePress);
  
}*/

}