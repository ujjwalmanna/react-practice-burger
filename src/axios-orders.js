import axios from 'axios'

const instance = axios.create({
    baseURL:'https://react-practise-burger.firebaseio.com/'
})

export default instance