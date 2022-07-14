import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor(objPopupClassHolder, objFormClassHolder, handleSubmit){
    super(objPopupClassHolder);
    this._elementForm = this._element.queryselector(objFormClassHolder.selectorForm);
    this._inputsList = Array.from(this._elementForm.querySelectorAll(objFormClassHolder.selectorInput));
    this._elementSubmitButton = this._element.queryselector(objFormClassHolder.selectorSubmitButton);
    this._handleSubmit =  handleSubmit;
  }

  open(...inputValues){
    this._inputsList.forEach((item, i) => item.value=inputsValues[i]);
    super.open();
  }

  close(){
    this._elementForm.reset();
    super.close();
  }

  _getInputValues(){
    const inputsValues = [];
    this._inputsList.forEach(item => inputsValues.push(item.value));
    return inputsValues;
  }

  setEventListeners(){
    super.setEventListeners();
    this._elementForm.addEventListener('submit', this._handleSubmit.bind(this));
  }

  removeEventListeners(){
    super.removeEventListeners();
    this._elementForm.removeEventListener('submit', this._handleSubmit);
  }
}