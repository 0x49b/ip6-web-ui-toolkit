
export { loginLinkProjector }

const loginLinkProjector = linkText => {

  const aElement = document.createElement('a')

  aElement.innerHTML = linkText

  return aElement
}