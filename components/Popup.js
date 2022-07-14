export default class Popup{
  constructor({selectorPopup, selectorButtonClose, classOpenedPopup}){
    this._element = document.querySelector(selectorPopup);
    this._elementButtonClose = this._element.querySelector(selectorButtonClose);
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

  /** метод добавления слушателей событий*/ 
  setEventListeners(){
    this._elementButtonClose.addEventListener('click', this.close.bind(this));
    this._element.addEventListener('click', this._handleOnBGClickClose.bind(this));
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  /** метод удаления слушателей событий*/
  removeEventListeners(){
    this._elementButtonClose.removeEventListener('click', this.close);
    this._element.removeEventListener('click', this._handleOnBGClickClose);
    document.removeEventListener('keydown', this._handleEscClose);
  }  

}