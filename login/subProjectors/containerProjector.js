
export { loginContainerProjector }

const loginContainerProjector = (elements, containerId) => {

  const divElement = document.createElement('div')
  divElement.id = containerId

  divElement.append(...elements)

  return divElement
}