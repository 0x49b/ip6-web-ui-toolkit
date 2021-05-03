const template = document.createElement('template')
template.innerHTML = `
  <style>
    h4 {
      color: coral;
    }
  </style>
  <div class="counter-label">
    <h4></h4>
    <button><slot name="buttonText" /></button>
  </div>
`

class Counter extends HTMLElement {
  constructor() {
    super()
    
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this.count = this.getAttribute('start-count')
      ? parseInt(this.getAttribute('start-count'))
      : 0

    this.shadowRoot.querySelector('h4').innerText = `Counted: ${this.count}`
  }

  increment() {
    this.count += 1
    this.shadowRoot.querySelector('h4').innerText = `Counted: ${this.count}`
  }

  connectedCallback() {
    this.shadowRoot.querySelector('button')
      .addEventListener('click', () => this.increment())
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('button')
      .removeEventListener()
  }
}



// An other method to implement the counter
class Counter2 extends HTMLElement {
  constructor() {
    super()

    this.shadow = this.attachShadow({ mode: 'open' })
  }

  get count() {
    return this.getAttribute('count')
  }

  set count(value) {
    this.setAttribute('count', value)
  }

  static get observedAttributes() {
    return ['count']
  }

  attributeChangedCallback(prop, oldValue, newValue) {
    if(prop === 'count') {
      this.render()
      const btn = this.shadow.getElementById('btn')
      btn.addEventListener('click', this.increment.bind(this))
    }
  }

  increment() {
    this.count++
  }

  connectedCallback() {
    this.render()
    const btn = this.shadow.getElementById('btn')
    btn.addEventListener('click', this.increment.bind(this))
  }

  render() {
    this.shadow.innerHTML = `
      <h1>Counter</h1>
      ${this.count}
      <button id='btn'>Increment</button>
    `
  }
}

window.customElements.define('my-counter', Counter)
window.customElements.define('my-counter2', Counter2)