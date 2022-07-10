import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor(objPopupClassHolder, objFormClassHolder, handleSubmit){
    super(objPopupClassHolder);
    this._elementForm = this._element.queryselector(objFormClassHolder.selectorForm);
    this._inputsList = Array.from(this._elementForm.querySelectorAll(objFormClassHolder.selectorInput);
    this._elementSubmitButton = this._element.queryselector(objFormClassHolder.selectorSubmitButton);
    this._handleSubmit =  handleSubmit;
  }

  _getInputValues(){
    const inputsValues = [];
    this._inputsList.forEach((item)=>inputsValues.push(item.value));
    return inputsValues;
  }
}