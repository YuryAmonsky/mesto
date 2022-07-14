export default class Section{
  constructor(selectorContainer, {items, renderer}){
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

  /*метод для добавления элемента в контейнер*/
  addItem(item){
    this._container.prepend(item);
  }
}