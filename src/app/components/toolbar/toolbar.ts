import Autobind from '../../decorators/autobind.decorator';
import Component from '../component';
import ToolbarSubscriptionsType from './toolbar-subscriptions.type';
import toolbarHTML from './toolbar.html';

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
      button.onclick = () => this.subscriptions.setCountdown(seconds);
      this.coutdownsToolbar.appendChild(button);
    });
  }

  private addEventListeners() {
    this.startBtn.onclick = this.onStartClick;
    this.pauseBtn.onclick = this.onPauseClick;
    this.stopBtn.onclick = this.onStopClick;
    this.pickCountdownBtn.onclick = this.onCountdownPickClick;
  }

  @Autobind
  private onStartClick() {
    this.subscriptions.start();
  }

  @Autobind
  private onPauseClick() {
    this.subscriptions.pause();
  }

  @Autobind
  private onStopClick() {
    this.subscriptions.stop();
  }

  @Autobind
  private onCountdownPickClick() {
    this.coutdownsToolbar.classList.toggle('stopwatch__countdowns--hidden');
  }
}
