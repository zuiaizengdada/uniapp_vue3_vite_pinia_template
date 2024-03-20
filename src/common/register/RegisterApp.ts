import registerProperties from './RegisterProperties'
import { App } from 'vue'

const registerApp = (app: App) => {
  registerProperties(app)
}

export default registerApp
