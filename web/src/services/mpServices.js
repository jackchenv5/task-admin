import api from './api'


export default {
  project(method = "", params = {}) {
    return sendPost('project', method = method, params = params)
  },
  global(method = "", params = {}) {
    return sendPost('system', method = method, params = params)
  },
}

function sendPost(path = "", method = "", params = {}) {
  console.log('path,method,params',path,method,params)
  const payload = {
    method: method,
    params: JSON.stringify(params)
  }
  const data = api.post(path, payload).then(ret => {
    return ret
  }).catch((ret)=>{
    if(ret.response.status == 401){
      console.log("import.meta.env",import.meta.env)
      // location.href = `${import.meta.env.VITE_LOGIN_URL}${import.meta.env.VITE_MAIN_URL}`
    }
  })
  return data
}
