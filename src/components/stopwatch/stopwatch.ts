import Component from '../component';
import stopwatchHTML from './stopwatch.html';

export default class Stopwatch extends Component {
  constructor() {
    super(stopwatchHTML);
    this.onInit();
  }

  onInit() {
    console.log(this.domContainer);
  }
}
