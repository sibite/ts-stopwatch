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

  private coutdownsToolbar = this.hostEl.querySelector('.stopwatch__countdowns') as HTMLDivElement;

  constructor(private subscriptions: ToolbarSubscriptionsType, countdownOptions: number[]) {
    super(toolbarHTML);
    this.addEventListeners();
    this.appendCountdownButtons(countdownOptions);
  }

  private appendCountdownButtons(options: number[]) {
    options.forEach((seconds) => {
      const button = document.createElement('button');
      button.classList.add('button');
      button.id = `countdown-${seconds}`;
      button.textContent = seconds.toString();
      button.onpointerup = () => this.onCountdownOptionPicked(seconds);
      this.coutdownsToolbar.appendChild(button);
    });
  }

  private addEventListeners() {
    this.startBtn.onpointerup = this.onStartClick;
    this.pauseBtn.onpointerup = this.onPauseClick;
    this.stopBtn.onpointerup = this.onStopClick;
    this.pickCountdownBtn.onpointerup = this.onCountdownPickClick;
  }

  private hideButton(button: HTMLButtonElement) {
    button.classList.add('button--hidden');
  }

  private unhideButton(button: HTMLButtonElement) {
    button.classList.remove('button--hidden');
  }

  @Autobind
  private onStartClick() {
    this.subscriptions.start();
    this.coutdownsToolbar.classList.add('stopwatch__countdowns--hidden');
    this.hideButton(this.stopBtn);
    this.hideButton(this.pickCountdownBtn);
    this.hideButton(this.startBtn);
  }

  @Autobind
  private onPauseClick() {
    this.subscriptions.pause();
    this.unhideButton(this.stopBtn);
    this.unhideButton(this.startBtn);
  }

  @Autobind
  private onStopClick() {
    this.subscriptions.stop();
    this.unhideButton(this.stopBtn);
    this.unhideButton(this.pickCountdownBtn);
    this.unhideButton(this.startBtn);
  }

  @Autobind
  private onCountdownPickClick() {
    this.coutdownsToolbar.classList.toggle('stopwatch__countdowns--hidden');
  }

  @Autobind
  private onCountdownOptionPicked(seconds: number) {
    this.subscriptions.setCountdown(seconds);
  }
}
