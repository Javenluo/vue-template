import request from '@ttkv/lib/utils/request'

export function login(data) {
  return request({
    url: `${process.env.VUE_APP_JCHL_API}/org/back/userService/loginExt?appId=10001006&requestId=2c3b44751ae520bcfe56a7b782cb548b`,
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
