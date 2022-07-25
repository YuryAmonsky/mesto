import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor(objPopupClassHolder, objFormClassHolder, handleSubmit){
    super(objPopupClassHolder);
    this._elementForm = this._element.querySelector(objFormClassHolder.selectorForm);
    this._elementSubmitButton = this._elementForm.querySelector(objFormClassHolder.selectorSubmitButton);
    this._inputsList = Array.from(this._elementForm.querySelectorAll(objFormClassHolder.selectorInput));
    this._handleSubmit =  handleSubmit;
  }

  close(){
    this._elementForm.reset();
    super.close();
  }

  _getInputValues(){
    this._inputsValues = {};
    this._inputsList.forEach(input => this._inputsValues[input.name] = input.value);
    return this._inputsValues;
  }
  
  setInputValues(inputValues){
    this._inputsList.forEach((input) => input.value = inputValues[input.name]);
  }
  
  setSubmitStatus(text){
    this._elementSubmitButton.textContent = text;
  }

  getForm(){
    return this._elementForm;
  }
  setEventListeners(){
    super.setEventListeners();
    this._elementForm.addEventListener('submit', (evt)=>{
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
      this.close();      
    });
  }
}