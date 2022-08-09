export default class FormValidator {
  constructor(form, objClassHolder){
    this._form = form;
    this._objClassHolder = objClassHolder;    
    this._buttonSubmit = this._form.querySelector(this._objClassHolder.selectorSubmitButton);
    this._superInputList = Array.from(form.querySelectorAll(this._objClassHolder.selectorInput))
      .map((input)=>({elementInput:input, elementError: this._form.querySelector(`.${input.id}-error`)}));
  }
  
  _showInputError(superInput, errorText){    
    superInput.elementInput.classList.add(this._objClassHolder.classInputInvalid);
    superInput.elementError.textContent = errorText;
    superInput.elementError.classList.add(this._objClassHolder.classErrorActive);
  }

  _hideInputError(superInput){    
    superInput.elementInput.classList.remove(this._objClassHolder.classInputInvalid);
    superInput.elementError.textContent = '';
    superInput.elementError.classList.remove(this._objClassHolder.classErrorActive);
  }

  _disableButton(){
    this._buttonSubmit.setAttribute('disabled','true');
    this._buttonSubmit.classList.add(this._objClassHolder.classButtonDisabled);
  }

  _enableButton(){
    this._buttonSubmit.removeAttribute('disabled');
    this._buttonSubmit.classList.remove(this._objClassHolder.classButtonDisabled);
  }
  
  // проверяет все ли инпуты валидны. 
  _isFormValid(){
    return !this._superInputList.some(input =>{
      return !input.elementInput.validity.valid;
    })  
  } 

  _toggleSubmitButtonState(){    
    if(this._isFormValid()){
      this._enableButton();
    } else{
      this._disableButton();
    }  
  }

  _checkInputValidity(superInput){
    if (!superInput.elementInput.validity.valid) {
      this._showInputError(superInput, superInput.elementInput.validationMessage);    
    }else{
      this._hideInputError(superInput);    
    }
  }

  _setEventListenersToAllInputs(){
    this._superInputList.forEach((input) => {    
      input.elementInput.addEventListener('input', () => {        
        this._toggleSubmitButtonState();
        if(input.elementError.classList.contains(this._objClassHolder.classErrorActive)){
          this._checkInputValidity(input);
        }
      });
      input.elementInput.addEventListener('blur', () => {
        this._checkInputValidity(input);
      });
    });
  };

  //Ниже функция инициализации ошибок для использования при открытии формы, 
  //чтобы избежать соохранения состояния спана ошибки при закрытии попапа с невалидными инпутами
  initErrorHints(){
    this._superInputList.forEach(input=>{
      this._hideInputError(input);
    })
    this._toggleSubmitButtonState();
  }

  enableValidation(){    
    this._setEventListenersToAllInputs();  
  };
}