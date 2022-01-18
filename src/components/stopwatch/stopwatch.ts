import Autobind from '../../decorators/autobind.decorator';
import Component from '../component';
import TimeDisplay from '../time-display/time-display';
import Toolbar from '../toolbar/toolbar';
import stopwatchHTML from './stopwatch.html';

export default class Stopwatch extends Component {
  private timeDisplay = new TimeDisplay();

  private toolbar = new Toolbar();

  private elapsedTime = 0;

  private lastStartTimestamp = 0;

  constructor() {
    super(stopwatchHTML);
    this.onInit();
  }

  onInit() {
    console.log(this.hostEl);
    this.appendDisplay();
    this.appendToolbar();
  }

  appendDisplay() {
    this.timeDisplay.appendTo(this.hostEl);
  }

  appendToolbar() {
    this.toolbar.appendTo(this.hostEl);
  }

  start() {
    requestAnimationFrame(this.step);
  }

  pause() {
    const elapsedFromLastStart = Date.now() - this.lastStartTimestamp;
    this.elapsedTime += elapsedFromLastStart;
  }

  stop() {

  }

  @Autobind
  step() {

  }
}
