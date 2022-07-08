export default class Popup{
  constructor({selectorPopup, classOpenedPopup}){
    this._element = document.querySelector(selectorPopup);    
    this._classOpened = classOpenedPopup;/*class = 'popup_opened' */
  }
  
  /** открытие попапа*/
  open(){
    this._element.classList.add(this._classOpened);    
  }

  /** закрытие попапа*/
  close(){
    this._element.classList.remove(this._classOpened);
  }

  /** обработчик закрытия по ESC */
  _handleEscClose(evt){
    if (evt.key === 'Escape') {
      this.close();      
    }
  }
  
  /** Обработчик закрытия при нажатии на фон попапа */
  _handleOnBGClickClose(evt){
    if(evt.target.classList.contains('popup__container')){
      this._close();
    } 
  }
  //закрытие попапов
  /*
 function closePopup(popup) {
  popup.removeEventListener('click', closePopupOnBGClick);
  document.removeEventListener('keydown', closePopupOnEscapePress);
  
}*/

}