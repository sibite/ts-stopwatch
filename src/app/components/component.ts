export default abstract class Component {
  protected hostEl: HTMLElement;

  constructor(templateString: string) {
    this.createHostElement(templateString);
  }

  private createHostElement(templateString: string = '') {
    const template = document.createElement('template');
    template.innerHTML = templateString;
    const firstChild = template.content.firstElementChild;
    if (firstChild instanceof HTMLElement) {
      this.hostEl = firstChild;
    } else {
      this.hostEl = template;
    }
  }

  public appendTo(parentEl: HTMLElement) {
    parentEl.append(this.hostEl);
  }
}
