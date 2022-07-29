export default class Card {
  constructor (objCardData, objClassHolder, handleImageClick, handleTrashClick, handleLikeClick){
    this._cardData = Object.assign({},objCardData);
    this._cardData.owner = Object.assign({},objCardData.owner);
    this._objElementClassHolder = objClassHolder;
    this._handleImageClick = handleImageClick;
    this._handleTrashClick = handleTrashClick;
    this._handleButtonLikeClick = handleLikeClick;
    this._template = document.querySelector(objClassHolder.selectorTemplate);
    this._elementCard = null;
    this._elementImage = null;
    this._elementName = null;
    this._elementButtonDelete = null;
    this._elementButtonLike = null;
    this._likesNumber = null;    
  }

  /**подготовка карточки происходит с учетом того является ли пользователь владельцем карточки */
  prepareCard(userId){
    const isMine = this.isThisUserCard(userId);
    this._prepareLayuotElements(isMine);
    this._setEventListeners(isMine);
    this._setLikeStatus(userId);
    return this._elementCard;    
  }
  
  _prepareElementsValues(isMine){    
    this._elementImage.src = this._cardData.link;
    this._elementImage.alt = `Фотография места ${this._cardData.name}`;
    this._elementName.textContent = this._cardData.name;
    this._likesNumber.textContent = this._cardData.likes.length;
    /*если карточка моя то показываем иконку удаления*/
    if(isMine){
      this._elementButtonDelete.style.visibility = 'visible';
    }
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
    this._prepareElementsValues(isMine);
  }

  getId(){
    return this._cardData._id;
  }
  
  isLiked(){
    return this._isLiked;
  }
  
  isThisUserCard(userId){
    return userId === this._cardData.owner._id;
  }
  remove(){
    this._elementCard.remove();
    this._elementCard = null;
  }
  
  _setLikeStatus(userId){
    this._isLiked = this._cardData.likes.some((item)=> userId === item._id);
    if(this._isLiked){
      this._elementButtonLike.classList.add(this._objElementClassHolder.classLike);
    }else{
      this._elementButtonLike.classList.remove(this._objElementClassHolder.classLike);
    } 
  }

  _setEventListeners(isMine){
    this._elementImage.addEventListener('click', () => {this._handleImageClick(this._cardData.name, this._cardData.link);});
    /*если карточка моя то на иконку удаления вешаем слушатель*/
    if(isMine){
      this._elementButtonDelete.addEventListener('click', () => {this._handleTrashClick(this);});
    }    
    this._elementButtonLike.addEventListener('click', () => { this._handleButtonLikeClick(this);});
  } 
  
  updateCardData(objCardData, userId){
    const isMine = this.isThisUserCard(userId);
    this._cardData = Object.assign({},objCardData);
    this._cardData.owner = Object.assign({},objCardData.owner);
    this._prepareElementsValues(isMine);
    this._setLikeStatus(userId);
  }
}