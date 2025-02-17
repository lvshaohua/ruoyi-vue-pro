import request from '@/config/axios'

export interface TenantVO {
  id: number
  name: string
  packageId: number
  contactName: string
  contactMobile: string
  username: string
  password: string
  accountCount: number
  expireTime: string
  domain: string
  status: number
  createTime: string
}

export interface TenantPageReqVO extends PageParam {
  name?: string
  contactName?: string
  contactMobile?: string
  status?: number
}

export interface TenantExportReqVO {
  name?: string
  contactName?: string
  contactMobile?: string
  status?: number
}

// 查询租户列表
export const getTenantPageApi = (params: TenantPageReqVO) => {
  return request.get({ url: '/system/tenant/page', params })
}

// 查询租户详情
export const getTenantApi = (id: number) => {
  return request.get({ url: '/system/tenant/get?id=' + id })
}

// 新增租户
export const createTenantApi = (data: TenantVO) => {
  return request.post({ url: '/system/tenant/create', data })
}

// 修改租户
export const updateTenantApi = (data: TenantVO) => {
  return request.put({ url: '/system/tenant/update', data })
}

// 删除租户
export const deleteTenantApi = (id: number) => {
  return request.delete({ url: '/system/tenant/delete?id=' + id })
}

// 导出租户
export const exportTenantApi = (params: TenantExportReqVO) => {
  return request.download({ url: '/system/tenant/export-excel', params })
}
