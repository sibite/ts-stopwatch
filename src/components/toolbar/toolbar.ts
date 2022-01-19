import Autobind from '../../decorators/autobind.decorator';
import Component from '../component';
import ToolbarSubscriptionsType from './toolbar-subscriptions.type';
import toolbarHTML from './toolbar.html';
import './toolbar.scss';

export default class Toolbar extends Component {
  private startBtn = this.hostEl.querySelector('#start') as HTMLButtonElement;

  private pauseBtn = this.hostEl.querySelector('#pause') as HTMLButtonElement;

  private stopBtn = this.hostEl.querySelector('#stop') as HTMLButtonElement;

  private pickCountdownBtn = this.hostEl.querySelector('#pick-countdown') as HTMLButtonElement;

  private controlsToolbar = this.hostEl.querySelector('.stopwatch__controls') as HTMLDivElement;

  private coutdownsToolbar = this.hostEl.querySelector('.stopwatch__countdowns') as HTMLDivElement;

  private coutdownsToolbarWrapper = this.hostEl.querySelector('.stopwatch__countdowns-wrapper') as HTMLDivElement;

  constructor(private subscriptions: ToolbarSubscriptionsType, countdownOptions: number[]) {
    super(toolbarHTML);
    this.addEventListeners();
    this.removeWhitespaces();
    this.appendCountdownButtons(countdownOptions);
    this.setInitialButtonsVisibility();
  }

  private appendCountdownButtons(options: number[]) {
    options.forEach((seconds) => {
      const button = document.createElement('button');
      button.classList.add('button');
      button.id = `countdown-${seconds}`;
      button.textContent = `${seconds}s`;
      button.onpointerup = () => this.onCountdownOptionPicked(seconds);
      this.coutdownsToolbar.appendChild(button);
    });
  }

  private removeWhitespaces() {
    this.controlsToolbar.childNodes.forEach((node) => {
      if (node.nodeType !== Node.TEXT_NODE) return;
      this.controlsToolbar.removeChild(node);
    });
  }

  private setInitialButtonsVisibility() {
    this.hideButton(this.stopBtn);
    this.hideButton(this.pauseBtn);
    this.unhideButton(this.pickCountdownBtn);
    this.unhideButton(this.startBtn);
  }

  private addEventListeners() {
    this.startBtn.onpointerup = this.onStartClick;
    this.pauseBtn.onpointerup = this.onPauseClick;
    this.stopBtn.onpointerup = this.onStopClick;
    this.pickCountdownBtn.onpointerup = this.onCountdownPickClick;
  }

  private hideButton(button: HTMLButtonElement) {
    button.classList.add('button--hidden');
    button.classList.remove('button--disabled');
  }

  private unhideButton(button: HTMLButtonElement) {
    button.classList.remove('button--hidden');
  }

  private disableButton(button: HTMLButtonElement) {
    button.classList.add('button--disabled');
    button.classList.remove('button--hidden');
  }

  private enableButton(button: HTMLButtonElement) {
    button.classList.remove('button--disabled');
  }

  @Autobind
  private onStartClick() {
    this.subscriptions.start();
    this.coutdownsToolbarWrapper.classList.add('stopwatch__countdowns-wrapper--hidden');
    this.unhideButton(this.pauseBtn);
    this.enableButton(this.pauseBtn);
    this.hideButton(this.stopBtn);
    this.hideButton(this.pickCountdownBtn);
    this.hideButton(this.startBtn);
  }

  @Autobind
  private onPauseClick() {
    this.subscriptions.pause();
    this.disableButton(this.pauseBtn);
    this.unhideButton(this.stopBtn);
    this.unhideButton(this.startBtn);
  }

  @Autobind
  private onStopClick() {
    this.subscriptions.stop();
    this.setInitialButtonsVisibility();
  }

  @Autobind
  private onCountdownPickClick() {
    this.coutdownsToolbarWrapper.classList.toggle('stopwatch__countdowns-wrapper--hidden');
  }

  @Autobind
  private onCountdownOptionPicked(seconds: number) {
    this.subscriptions.setCountdown(seconds);
  }
}
