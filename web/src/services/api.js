//导入axios
import axios from 'axios'
import Cookies from 'js-cookie'

//创建axios对象
export default axios.create({
  //设置message数据入口url
  // baseURL: import.meta.env.VITE_BASE_URL,
  baseURL: '/api',
  timeout: 5000,
  headers: {
    // 'Content-Type': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    // 'Access-Control-Allow-Origin': '*',
    'X-CSRFToken': Cookies.get('csrftoken')
  }
})
