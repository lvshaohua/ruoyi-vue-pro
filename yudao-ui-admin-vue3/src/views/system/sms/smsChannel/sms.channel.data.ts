import { reactive } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { required } from '@/utils/formRules'
import { DICT_TYPE } from '@/utils/dict'
import { VxeCrudSchema, useVxeCrudSchemas } from '@/hooks/web/useVxeCrudSchemas'
const { t } = useI18n() // 国际化

// 表单校验
export const rules = reactive({
  signature: [required],
  code: [required],
  apiKey: [required],
  status: [required]
})

// CrudSchema
const crudSchemas = reactive<VxeCrudSchema>({
  primaryKey: 'id',
  primaryType: 'seq',
  primaryTitle: '渠道编号',
  action: true,
  columns: [
    {
      title: '短信签名',
      field: 'signature',
      isSearch: true
    },
    {
      title: '渠道编码',
      field: 'code',
      dictType: DICT_TYPE.SYSTEM_SMS_CHANNEL_CODE,
      isSearch: true
    },
    {
      title: t('common.status'),
      field: 'status',
      dictType: DICT_TYPE.COMMON_STATUS,
      dictClass: 'number',
      isSearch: true
    },
    {
      title: '短信 API 的账号',
      field: 'apiKey'
    },
    {
      title: '短信 API 的密钥',
      field: 'apiSecret'
    },
    {
      title: '短信发送回调 URL',
      field: 'callbackUrl'
    },
    {
      title: t('common.createTime'),
      field: 'createTime',
      formatter: 'formatDate',
      isForm: false
    }
  ]
})
export const { allSchemas } = useVxeCrudSchemas(crudSchemas)
