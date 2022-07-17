export default class Popup{
  constructor({selectorPopup, selectorButtonClose, classOpenedPopup}){
    this._element = document.querySelector(selectorPopup);
    this._elementButtonClose = this._element.querySelector(selectorButtonClose);
    this._classOpened = classOpenedPopup;/*class = 'popup_opened' */
  }
  
  /** открытие попапа*/
  open(){
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._element.classList.add(this._classOpened);
  }

  /** закрытие попапа*/
  close(){
    document.removeEventListener('keydown', this._handleEscClose);
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
      this.close();
    } 
  }

  /** метод добавления слушателей событий*/ 
  setEventListeners(){
    this._elementButtonClose.addEventListener('click', this.close.bind(this));
    this._element.addEventListener('click', this._handleOnBGClickClose.bind(this));    
  }
}