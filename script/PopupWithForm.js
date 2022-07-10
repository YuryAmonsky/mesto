import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor(objPopupClassHolder, objFormClassHolder, handleSubmit){
    super(objPopupClassHolder);
    this._elementForm = this._element.queryselector(objFormClassHolder.selectorForm);
    this._elementSubmitButton = this._element.queryselector(objFormClassHolder.selectorSubmitButton);
    this._handleSubmit =  handleSubmit;
  }

  _getInputValues(){
    
  }
}