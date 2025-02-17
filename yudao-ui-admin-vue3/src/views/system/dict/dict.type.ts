import { reactive } from 'vue'
import { DICT_TYPE } from '@/utils/dict'
import { required } from '@/utils/formRules'
import { useI18n } from '@/hooks/web/useI18n'
import { VxeCrudSchema, useVxeCrudSchemas } from '@/hooks/web/useVxeCrudSchemas'
const { t } = useI18n() // 国际化

// 表单校验
export const dictTypeRules = reactive({
  name: [required]
})
// 新增 + 修改
const crudSchemas = reactive<VxeCrudSchema>({
  primaryKey: 'id',
  primaryType: null,
  action: true,
  actionWidth: '140px',
  searchSpan: 12,
  columns: [
    {
      title: '字典名称',
      field: 'name',
      isSearch: true
    },
    {
      title: '字典类型',
      field: 'type',
      isSearch: true
    },
    {
      title: t('common.status'),
      field: 'status',
      dictType: DICT_TYPE.COMMON_STATUS,
      dictClass: 'number',
      table: {
        width: 70
      }
    },
    {
      title: t('common.createTime'),
      field: 'createTime',
      formatter: 'formatDate',
      isForm: false,
      table: {
        width: 150
      }
    },
    {
      title: t('form.remark'),
      field: 'remark',
      isTable: false,
      form: {
        componentProps: {
          type: 'textarea',
          rows: 4
        },
        colProps: {
          span: 24
        }
      }
    }
  ]
})
export const { allSchemas } = useVxeCrudSchemas(crudSchemas)
