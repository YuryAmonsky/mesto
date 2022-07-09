import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor(objPopupClassHolder, objFormClassHolder, handleSubmit){
    super(objPopupClassHolder);
    this._elementForm = this._element.queryselector(objFormClassHolder.selectorForm);
    this._handleSubmit =  handleSubmit;
  }
}