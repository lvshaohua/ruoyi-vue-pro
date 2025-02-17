import { reactive } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { DICT_TYPE } from '@/utils/dict'
import { VxeCrudSchema, useVxeCrudSchemas } from '@/hooks/web/useVxeCrudSchemas'
const { t } = useI18n() // 国际化
// CrudSchema
const crudSchemas = reactive<VxeCrudSchema>({
  primaryKey: 'id',
  primaryType: null,
  action: true,
  columns: [
    {
      title: '用户编号',
      field: 'userId',
      isSearch: true
    },
    {
      title: '访问令牌',
      field: 'accessToken'
    },
    {
      title: '刷新令牌',
      field: 'refreshToken'
    },
    {
      title: '用户类型',
      field: 'userType',
      dictType: DICT_TYPE.USER_TYPE,
      dictClass: 'number',
      isSearch: true
    },
    {
      title: t('common.createTime'),
      field: 'createTime',
      formatter: 'formatDate',
      isForm: false
    },
    {
      title: '过期时间',
      field: 'expiresTime',
      formatter: 'formatDate',
      isForm: false
    }
  ]
})
export const { allSchemas } = useVxeCrudSchemas(crudSchemas)
