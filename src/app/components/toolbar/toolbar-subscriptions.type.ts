export default interface ToolbarSubscriptionsType {
  start: () => void;
  pause: () => void;
  stop: () => void;
  setCountdown: (milliseconds: number) => void;
}
