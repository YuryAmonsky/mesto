export default class Card {
  constructor (cardData, objClassHolder, handleImageClick, handleTrashClick){
    this._cardData = Object.assign({},cardData);
    this._cardData.owner = Object.assign({},cardData.owner);
    this._objElementClassHolder = objClassHolder;
    this._handleImageClick = handleImageClick;
    this._handleTrashClick = handleTrashClick;
    this._template = document.querySelector(objClassHolder.selectorTemplate);
    this._elementCard = null;
    this._elementImage = null;
    this._elementName = null;
    this._elementButtonDelete = null;
    this._elementButtonLike = null;
    this._likesNumber = null;
  }

  /**подготовка карточки происходит с учетом того является ли пользователь владельцем карточки */
  prepareCard(isMine){
    this._prepareLayuotElements(isMine);
    this._setEventListeners(isMine);    
    return this._elementCard;    
  }
  
  _prepareLayuotElements(isMine){
    this._elementCard = this
      ._template
      .content
      .querySelector(this._objElementClassHolder.selectorCard)
      .cloneNode(true);
    this._elementImage = this._elementCard.querySelector(this._objElementClassHolder.selectorImage);
    this._elementName = this._elementCard.querySelector(this._objElementClassHolder.selectorName);
    this._elementButtonDelete = this._elementCard.querySelector(this._objElementClassHolder.selectorButtonDelete);
    this._elementButtonLike = this._elementCard.querySelector(this._objElementClassHolder.selectorButtonLike);
    this._likesNumber = this._elementCard.querySelector(this._objElementClassHolder.selectorLikesNumber);
    this._elementImage.src = this._cardData.link;
    this._elementImage.alt = `Фотография места ${this._cardData.name}`;
    this._elementName.textContent = this._cardData.name;
    this._likesNumber.textContent = this._cardData.likes.length;
    /*если карточка моя то показываем иконку удаления*/
    if(isMine){
      this._elementButtonDelete.style.visibility = 'visible';
    }
  }

  getId(){
    return this._cardData._id;
  }

  getOwner(){
    return Object.assign({},this._cardData.owner);
  }
  
  _handleButtonLikeClick(){
    this._elementButtonLike.classList.toggle(this._objElementClassHolder.classLike);
  }

  remove(){
    this._elementCard.remove();
    this._elementCard = null;
  }

  _setEventListeners(isMine){
    this._elementImage.addEventListener('click', () => {this._handleImageClick(this._cardData.name, this._cardData.link);});
    /*если карточка моя то на иконку удаления вешаем слушатель*/
    if(isMine){
      this._elementButtonDelete.addEventListener('click', () => {this._handleTrashClick(this);});
    }    
    this._elementButtonLike.addEventListener('click', () => { this._handleButtonLikeClick();});
  }  
}