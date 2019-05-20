class Controller {
  // constructor
  constructor(data = {}, args = {}) {
    this.data = data
    this.args = args
    this.args.params && this.args.params.length && this.get()
    this.args.resetKey && JSON.stringify(this.args.resetKey) !== '{}' && this.resetKey(this.args.resetKey)
    this.args.resetValue && JSON.stringify(this.args.resetValue) !== '{}' && this.resetValue()
  }
  // Filtering required fields
  get () {
    // Iterate through the required data
    let result = {}
    this.args.params.map(key => {
      if (key in this.data) result[key] = this.data[key]
    })
    // Reset the data
    this.data = result
  }
  // Modify object parameters according to transfer parameters
  resetKey (data = {}) {
    // Parameters passed by cyclic traversal
    for (let key in data) {
      if (key in this.data) {
        // Determines whether the parameter is an Object
        if (data[key].constructor === Object) {
          for (let sKey in data[key]) {
            const value = this.data[key][sKey]
            delete this.data[key][sKey]
            this.data[key][data[key][sKey]] = value
          }
        } else {
          // Reset the name of the key
          const value = this.data[key]
          delete this.data[key]
          this.data[data[key]] = value
        }
      }
    }
  }
  // Changing object properties
  resetValue (data = {}) {
    // Determines whether or not this attribute exists
    for (let attr in data) {
      if (attr in this.data) {
        this.data[attr] = data[attr]
      }
    }
  }
}
const JsonController = (obj = {}, args = {}) => {
  return new Controller(obj, args).data
}

module.exports = {
  JsonController
}
