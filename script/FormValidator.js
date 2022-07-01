class FormValidator{
  constuctor(objClassHolder, form){
    this._objClassHolder = objClassHolder;
    this._form = from;
    this._buttonSubmit = this._form.querySelector(this._objClassHolder.selectorSubmitButton);
    this._inputList = Array.from(form.querySelectorAll(this._objClassHolder.selectorInput));
  }
  
  _showInputError(input, errorText){
    input.classList.add(this._objClassHolder.classInputInvalid);
    const elementError = this._form.querySelector(`.${input.id}-error`);
    elementError.textContent = errorText;
    elementError.classList.add(this._objClassHolder.classErrorActive);
  }

  _hideInputError(input){
    input.classList.remove(this._objClassHolder.classInputInvalid);
    const elementError = this._form.querySelector(`.${input.id}-error`);
    elementError.textContent='';
    elementError.classList.remove(this._objClassHolder.classErrorActive);
  }

  _disableButton(button){
    button.setAttribute('disabled','true');
    button.classList.add(this._objClassHolder.classButtonDisabled);
  }

  _enableButton(button){
    button.removeAttribute('disabled');
    button.classList.remove(this._objClassHolder.classButtonDisabled);
  }

  _isFormValid(){// проверяет все ли инпуты валидны. 
    return !this._inputList.some(input =>{
      return !input.validity.valid;
    })  
  } 

  toggleSubmitButtonState(){    
    if(isFormValid(this._inputList)){
      this._enableButton(this._buttonSubmit);
    } else{
      this._disableButton(this._buttonSubmit);
    }  
  }

  _checkInputValidity(input){
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);    
    }else{
      this._hideInputError(input);    
    }
  }

  _setEventListenersToAllInputs(){
    this._inputList.forEach((input) => {    
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleSubmitButtonState();
      });
    });
  };

  //Ниже функция инициализации ошибок для использования при открытии формы, 
  //чтобы избежать соохранения состояния спана ошибки при закрытии попапа с невалидными инпутами
  _initErrorHints(){
    this._inputList.forEach(input=>{
      this._hideInputError(input);
    })
    this._toggleSubmitButtonState();
  }

  enableValidation(){      
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListenersToAllInputs();  
  };
}