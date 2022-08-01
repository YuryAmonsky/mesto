export default class Section{
  constructor(selectorContainer, renderer){
    this._element = document.querySelector(selectorContainer);    
    this._renderer = renderer;    
  }
  /*метод отрисовки элементов*/
  renderItems(items){
    items.forEach(item => {
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