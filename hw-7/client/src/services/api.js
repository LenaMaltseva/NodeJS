import axios from 'axios'

function getCookie(name) {
   let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
   ));
   return matches ? decodeURIComponent(matches[1]) : undefined;
}

export default () => {
   return axios.create({
      baseURL: 'http://localhost:8000',
      headers: {'Authorization': `bearer ${getCookie('token')}`}
    })
}