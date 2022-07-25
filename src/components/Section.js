export default class Section{
  constructor(selectorContainer, items, renderer){
    this._element = document.querySelector(selectorContainer);
    this._items = items;
    this._renderer = renderer;    
  }
  /*метод отрисовки элементов*/
  renderItems(){
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  /*метод для добавления элемента в начало списка*/
  prependItem(item){
    this._element.prepend(item);
  }

  /*метод для добавления элемента в конец списка*/
  appendItem(item){
    this._element.append(item);
  }
}