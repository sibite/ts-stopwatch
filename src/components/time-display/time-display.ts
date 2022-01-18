import Component from '../component';
import timeDisplayHTML from './time-display.html';

export default class TimeDisplay extends Component {
  private textEl = this.hostEl.querySelector('#js-stopwatch-clock') as HTMLParagraphElement;

  constructor() {
    super(timeDisplayHTML);
  }

  onInit() { }

  render(totalMilliseconds: number) {
    const time = this.getTimeStructure(totalMilliseconds);

    const centisecondsText = time.centiseconds.toString().padStart(2, '0');
    const secondsText = `${time.seconds.toString().padStart(2, '0')}.`;
    const minutesText = `${time.minutes.toString().padStart(2, '0')}:`;
    let hoursText;

    if (time.hours > 0) {
      hoursText = `${time.hours.toString().padStart(2, '0')}:`;
    } else {
      hoursText = '';
    }

    const fullText = hoursText + minutesText + secondsText + centisecondsText;
    this.textEl.textContent = fullText;
  }

  getTimeStructure(totalMilliseconds) {
    const datetime = new Date(totalMilliseconds);

    return {
      hours: Math.floor(totalMilliseconds / (3600 * 10e3)),
      minutes: datetime.getMinutes(),
      seconds: datetime.getSeconds(),
      centiseconds: Math.floor(datetime.getMilliseconds() / 10),
    };
  }
}
