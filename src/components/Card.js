export default class Card {
  constructor (cardData, objClassHolder, handleClick){
    this._cardData = Object.assign({},cardData);
    this._cardData.owner = Object.assign({},cardData.owner);
    this._objElementClassHolder = objClassHolder;
    this._handleImageClick = handleClick;
    this._template = document.querySelector(objClassHolder.selectorTemplate);
    this._elementCard = null;
    this._elementImage = null;
    this._elementName = null;
    this._elementButtonDelete = null;
    this._elementButtonLike = null;
    this._likesNumber = null;
  }
  
  _prepareLayuotElements(){
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
  }

  _handleButtonLikeClick(){
    this._elementButtonLike.classList.toggle(this._objElementClassHolder.classLike);
  }

  _handleButtonDeleteClick(){
    this._elementCard.remove();
    this._elementCard = null;
  }

  _setEventListeners(){
    this._elementImage.addEventListener('click', () => {this._handleImageClick(this._name, this._link);});
    this._elementButtonDelete.addEventListener('click', () => {this._handleButtonDeleteClick();});
    this._elementButtonLike.addEventListener('click', () => { this._handleButtonLikeClick();});
  }
  prepareCard(){
    this._prepareLayuotElements();
    this._setEventListeners();    
    return this._elementCard;    
  }
}