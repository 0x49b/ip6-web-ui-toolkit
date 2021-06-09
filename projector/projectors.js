import { Attribute } from '../presentationModel/presentationModel.js'


/**  Form Projector
 *  @param {HTML Element}   rootElement       Das Root element worin die Form aufgebaut wird
 *  @param {String}         submitBtnLabel    Label für den submit button 
 *  @param {Array}          formFields        Array of Elements which should represent a field in the form
 * 
 *  @constructs 
 *  <div class="Your root element">
 *    <form>
 *      <div>Your Form Field1</div>
 *      <div>Your Form Field2</div>
 *      ...
 *      <button type="submit">Your Label</button>
 *    </form>
 *  </div>
*/
const formProjector = (rootElement, submitBtnLabel, formFields) => {
  const form = document.createElement('form')

  const submitBtn = document.createElement('button')
  submitBtn.type = 'submit'
  submitBtn.innerHTML = submitBtnLabel
  submitBtn.classList.add('disabled')

  rootElement.appendChild(form)
  formFields.forEach(field => form.appendChild(field))
  form.appendChild(submitBtn)

  //? Wie kann man HTML Elemente aus einer Array bekommen. Zurzeit wird [ObjectHTMLDivElement] angezeigt, statt das Element selbst
  // rootElement.innerHTML = `
  //   <form>
  //     ${formFields[0]}
  //   </form>
  // `
}


/**  Form Projector
 *  @param {HTML Element}   rootElement       Das Root element worin die Form aufgebaut wird
 *  @param {string}         name              Name des InputsField
 *  @param {String}         type              Typ des InputFields
 *  @param {String}         placeholder       Placeholder für InputField                      (optional)
 *  @param {String}         validRegex        Regex um Validität des Passwort zu prüfen       (optional)
 *  @param {String}         invalidMessage    Text falls input invalid ist                    (optional)
 *  @param {String}         validMessage      Text falls input validiert                      (optional)
 * 
 *  @constructs 
 *  <div class="your root element">
 *    <label for={name}>{name}</label>
 *    <br>
 *    <input name={name} type={type} placeholder={placeholder} pattern={validRegex}/>
 *    (if validRegex is given)
 *    <p class="{name}-validitymessage">{validMessage/invalidMessage}</p>
 *  </div>
 * 
 *  @returns {HTML Element} Returns the same root Element with the entire construction inside it
*/
const inputProjector = (rootElement, name, type, placeholder, validRegex = '', invalidMessage = 'Input is invalid', validMessage = 'Input is valid') => {
  const label = document.createElement('label')
  label.innerHTML = name
  label.for = name

  const br = document.createElement('br')

  const input = document.createElement('input')
  input.name = name
  input.id = name
  input.type = type
  input.placeholder = placeholder
  input.pattern = validRegex

  const inputAttr = Attribute(name)
  inputAttr.getObs('valid').setValue(false)

  rootElement.appendChild(label)
  rootElement.appendChild(br)
  rootElement.appendChild(input)

  if(validRegex){
    const p = document.createElement('p')
    p.classList.add(`${input.name}-validitymessage`)
    rootElement.appendChild(p)

    input.addEventListener('keyup', (event) => {
      const element = event.target
      const message = element.parentElement.querySelector(`.${element.name}-validitymessage`)

      if(element.checkValidity()) {
        message.innerHTML = validMessage
        inputAttr.getObs('valid').setValue(true)
      } else {
        message.innerHTML = invalidMessage
        inputAttr.getObs('valid').setValue(false)
      }
    })
  }

  return rootElement
}

export { formProjector, inputProjector }