import Stopwatch from './components/stopwatch/stopwatch';
import './style.scss';

const appHost = document.getElementById('app') as HTMLDivElement;

function alignAppHeightToWindow() {
  appHost.style.minHeight = `${window.innerHeight}px`;
}
alignAppHeightToWindow();
window.addEventListener('resize', alignAppHeightToWindow);

const stopwatch = new Stopwatch();
stopwatch.appendTo(appHost);
