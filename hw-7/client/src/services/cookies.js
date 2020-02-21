export default {
   set: function (name, value, options = {}) {
      options = {
         path: '/',
         // put other options here
      }
    
      if (options.expires instanceof Date) {
         options.expires = options.expires.toUTCString()
      }
    
      let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
    
      for (let optionKey in options) {
         updatedCookie += `; ${optionKey}`
         let optionValue = options[optionKey]
         if (!optionValue) {
            updatedCookie += `=${optionValue}`
         }
      }
   
      document.cookie = updatedCookie
    },

   getValue: function (name) {
      let matches = document.cookie.match( new RegExp (
         "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)")
      )
      return matches ? decodeURIComponent(matches[1]) : undefined
   }
}