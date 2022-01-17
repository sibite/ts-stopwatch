export default class Component {
  protected domContainer;

  constructor(templateString: string = '') {
    this.domContainer = document.createElement('div');
    this.domContainer.innerHTML = templateString;
  }

  public appendTo(parentEl: HTMLElement) {
    parentEl.append(...this.domContainer.childNodes);
  }
}
