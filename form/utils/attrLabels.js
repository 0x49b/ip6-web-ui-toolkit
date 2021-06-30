import { LABEL } from '../../presentationModel/presentationModel.js'

export { setLabel }

const setLabel = (attr, labelText) => {
  attr.getObs(LABEL).setValue(labelText)
}