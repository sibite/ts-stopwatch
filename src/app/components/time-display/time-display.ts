import Component from '../component';
import timeDisplayHTML from './time-display.html';
import TimeStructureType from './time-structure.type';

export default class TimeDisplay extends Component {
  private textEl = this.hostEl.querySelector('#js-stopwatch-clock') as HTMLParagraphElement;

  constructor() {
    super(timeDisplayHTML);
    this.onInit();
  }

  onInit() {
    this.render(0);
  }

  render(totalMilliseconds: number): void {
    const time = this.getTimeStructure(Math.abs(totalMilliseconds));
    const sign = Math.sign(totalMilliseconds) === -1 ? '-' : '';
    const fullText = sign + this.getTimeFullText(time);
    this.textEl.textContent = fullText;
  }

  getTimeStructure(totalMilliseconds): TimeStructureType {
    const datetime = new Date(totalMilliseconds);

    return {
      hours: Math.floor(totalMilliseconds / (3600e3)),
      minutes: datetime.getMinutes(),
      seconds: datetime.getSeconds(),
      centiseconds: Math.floor(datetime.getMilliseconds() / 10),
    };
  }

  getTimeFullText(time: TimeStructureType): string {
    const centisecondsText = time.centiseconds.toString().padStart(2, '0');
    const secondsText = `${time.seconds.toString().padStart(2, '0')}.`;
    const minutesText = `${time.minutes.toString().padStart(2, '0')}:`;
    let hoursText;

    if (time.hours > 0) {
      hoursText = `${time.hours}:`;
    } else {
      hoursText = '';
    }

    return hoursText + minutesText + secondsText + centisecondsText;
  }
}
