const incButton = document.querySelector('.increment-button')
const decButton = document.querySelector('.decrement-button')
const myNum = document.querySelector('.my-number')

let count = 0

incButton.addEventListener('click', () => {
  ++count
  myNum.innerHTML = count;
})

decButton.addEventListener('click', () => {
  --count
  myNum.innerHTML = count;
})