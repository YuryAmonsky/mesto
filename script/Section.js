export default class Section{
  constructor({items, renderer}, selectorContainer){
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selectorContainer);
  }   
}