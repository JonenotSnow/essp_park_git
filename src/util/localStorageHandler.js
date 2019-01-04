const localStorageHandler = {
  setItem: function(name, value) {
    if(typeof value === 'object'){
      window.localStorage.setItem(name, JSON.stringify(value))
    }else {
      localStorage.setItem(name, JSON.stringify(value))
    }
  },
  delItem: function(name) {
        window.localStorage.removeItem(name)
  },
  getItem: function(name) {
    if(name) {
      let str = localStorage.getItem(name)
      if (str!==null && (str.indexOf('{')>-1|| str.indexOf('[')>-1)){
        return JSON.parse(str)
      } else {
        return str
      }
     
    }else{
      return null
    }
  },
  die: function() {
    window.localStorage.clear()
  },
  list: function() {
  }
}
window.LSH = localStorageHandler

export default localStorageHandler
