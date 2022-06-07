
function showInputError(form, input, objClassHolder, errorText){
  input.classList.add(objClassHolder.classInputInvalid);
  const elementError = form.querySelector(`.${input.id}-error`);
  elementError.textContent=errorText;
  elementError.classList.add(objClassHolder.classErrorActive);
}

function hideInputError(form, input, objClassHolder){
  input.classList.remove(objClassHolder.classInputInvalid);
  const elementError = form.querySelector(`.${input.id}-error`);
  elementError.textContent='';
  elementError.classList.remove(objClassHolder.classErrorActive);
}

function isFormValid(inputList){// проверяет все ли инпуты валидны. 
  return !inputList.some(input =>{
    return !input.validity.valid;
  })  
}

function toggleSubmitButtonState(form, inputList, objClassHolder){
  const buttonSubmit = form.querySelector(objClassHolder.selectorSubmitButton);
  if(isFormValid(inputList)){
    buttonSubmit.removeAttribute('disabled');
    buttonSubmit.classList.remove(objClassHolder.classButtonDisabled);
  } else{
    buttonSubmit.setAttribute('disabled','true');
    buttonSubmit.classList.add(objClassHolder.classButtonDisabled);
  }  
}

function checkInputValidity(form, input, objClassHolder){
  if (!input.validity.valid) {
    showInputError(form, input, objClassHolder, input.validationMessage);    
  }else{
    hideInputError(form, input, objClassHolder);    
  }
}

function assignEventListenersToAllInputs(form, objClassHolder){
  const inputList = Array.from(form.querySelectorAll(objClassHolder.selectorInput));
  inputList.forEach((input) => {    
    input.addEventListener('input', () => {
      checkInputValidity(form, input, objClassHolder);
      toggleSubmitButtonState(form, inputList, objClassHolder);
    });
  });
};

function enableValidation(objClassHolder){  
  const formList = Array.from(document.querySelectorAll(objClassHolder.selectorForm));
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    assignEventListenersToAllInputs(form, objClassHolder);
  });
};

//Ниже функция валидации для использования при открытии формы, чтобы избежать соохранения состояния спана ошибки
//при закрытии попапа с невалидными инпутами
function validateForm(form, objClassHolder){
  const inputList = Array.from(form.querySelectorAll(objClassHolder.selectorInput));
  inputList.forEach(input=>{
    checkInputValidity(form, input, objClassHolder);
  })
  toggleSubmitButtonState(form, inputList, objClassHolder);
}

enableValidation(objFormElementsClassHolder); 