import Autobind from '../../decorators/autobind.decorator';
import Component from '../component';
import TimeDisplay from '../time-display/time-display';
import Toolbar from '../toolbar/toolbar';
import stopwatchHTML from './stopwatch.html';
import './stopwatch.scss';

export default class Stopwatch extends Component {
  private timeDisplay = new TimeDisplay();

  private toolbar = new Toolbar(
    {
      start: this.start,
      pause: this.pause,
      stop: this.stop,
      setCountdown: this.setCountdown,
    },
    [0, 2, 5, 10, 30],
  );

  private running = false;

  private countdown = 0;

  private elapsedTime = 0;

  private lastStartTimestamp = 0;

  constructor() {
    super(stopwatchHTML);
    this.onInit();
  }

  onInit() {
    this.appendDisplay();
    this.appendToolbar();
  }

  appendDisplay() {
    this.timeDisplay.appendTo(this.hostEl);
  }

  appendToolbar() {
    this.toolbar.appendTo(this.hostEl);
  }

  getElapsedTimeToNow() {
    const elapsedFromLastStart = Date.now() - this.lastStartTimestamp;
    return this.elapsedTime + elapsedFromLastStart;
  }

  @Autobind
  start() {
    if (this.running) return;
    this.running = true;
    this.lastStartTimestamp = Date.now();
    requestAnimationFrame(this.step);
  }

  @Autobind
  pause() {
    if (!this.running) return;
    this.elapsedTime = this.getElapsedTimeToNow();
    this.running = false;
  }

  @Autobind
  stop() {
    this.elapsedTime = this.countdown;
    this.running = false;
    this.step();
  }

  @Autobind
  setCountdown(seconds: number) {
    if (this.running || this.elapsedTime > 0) return;
    const countdown = -seconds * 1e3;
    this.elapsedTime = countdown;
    this.countdown = countdown;
    this.step();
  }

  @Autobind
  step() {
    if (!this.running) {
      this.timeDisplay.render(this.elapsedTime);
      return;
    }
    this.timeDisplay.render(this.getElapsedTimeToNow());
    requestAnimationFrame(this.step);
  }
}
