import Stopwatch from './components/stopwatch/stopwatch';
import '../style.scss';

const appHost = document.getElementById('app') as HTMLDivElement;
const stopwatch = new Stopwatch();
stopwatch.appendTo(appHost);
