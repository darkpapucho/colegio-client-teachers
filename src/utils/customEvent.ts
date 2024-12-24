export function subscribeCustomEvent(eventName: string, listener: any) {
  document.addEventListener(eventName, listener);
}
export function unsubscribeCustomEvent(eventName: string, listener: any) {
  document.removeEventListener(eventName, listener);
}

export function publishEvent<T>(eventName: string, data: { name: string; value: T }) {
  const customEvent = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(customEvent);
}
