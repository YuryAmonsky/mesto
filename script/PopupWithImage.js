import Popup from './Popup.js';
export default class PopupWithImage extends Popup{
  constructor(objPopupClassHolder, objContentClassHolder){
    super(objPopupClassHolder);
    this._imageOrigin = this._element.querySelector(objContentClassHolder.selectorImage);
    this._textCaption = this._element.querySelector(objContentClassHolder.selectorCaption);    
  }
  /**открытие попапа просмотра картинки */
  open({name, link}){
    this._imageOrigin.src = link;
    this._imageOrigin.alt = `Фотография места ${name}`;
    this._textCaption.textContent = name;
    super.open();
  }
  
}