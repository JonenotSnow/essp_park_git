const sessionStorageHandler = {
  setItem: function(name, value) {
    if(typeof value !== 'string'){
      sessionStorage.setItem(name, JSON.stringify(value))
    }else {
      sessionStorage.setItem(name, value)
    }
  },
  delItem: function(name) {
        window.sessionStorage.removeItem(name)
  },
  getItem: function(name) {
    if(name) {
      let str = sessionStorage.getItem(name)
      if (str  && (str.indexOf('{')>-1 || str.indexOf('[')>-1)){
        return JSON.parse(str)
      } else{
        return str==='null'?null:str==='true'?true:str==='false'?false:str==='undefined'?undefined:str
      }
    }else{
      return ''
    }
  },
  die: function() {
    window.sessionStorage.clear()
  },
  list: function() {
  }
}
window.LSH = sessionStorageHandler

export default sessionStorageHandler
