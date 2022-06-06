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
function enableSubmitButton(form, objClassHolder){
  form.querySelector(objClassHolder.selectorSubmitButton).classList.remove(objClassHolder.classButtonDisabled);
}

function disableSubmitButton(form, objClassHolder){
  form.querySelector(objClassHolder.selectorSubmitButton).classList.add(objClassHolder.classButtonDisabled);
}

function checkValidity(form, input, objClassHolder){
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
    disableSubmitButton(form, objClassHolder);
  }else{
    hideInputError(form, input, objClassHolder);
    enableSubmitButton(form, objClassHolder);
  }
}

function assignEventListenersToAllInputs(form, objClassHolder){
  const inputList = Array.from(form.querySelectorAll(objClassHolder.selectorInput));
  inputList.forEach((input) => {    
    input.addEventListener('input', () => {
      checkValidity(form, input, objClassHolder)
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


enableValidation(objFormElementsClassHolder); 