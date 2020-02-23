export default {
   set: function (name, value, options) {
      let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
      for (let optionKey in options) {
         updatedCookie += `; ${optionKey}=${options[optionKey]}`
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