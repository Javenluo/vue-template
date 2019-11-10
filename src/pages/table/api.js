import { request } from '@ttkv'

export function getList(params) {
  return request({
    url: `/table/list`,
    method: 'get',
    params,
    baseURL: process.env.VUE_APP_BASE_API
  })
}
