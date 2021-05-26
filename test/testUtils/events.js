export const fireEvent = (el, eventType) => {
  const event = new Event(eventType)
  el.dispatchEvent(event)
}