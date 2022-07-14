export default class Section{
  constructor({items, renderer}, selectorContainer){
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selectorContainer);
  }
  /*метод отрисовки элементов*/
  renderItems(){
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  /*метод для добавления элемента в контейнер*/
  addItem(element){
    this._container.prepend(element);
  }
}