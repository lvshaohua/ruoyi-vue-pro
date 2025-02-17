<template>
  <ContentWrap>
    <!-- 列表 -->
    <vxe-grid ref="xGrid" v-bind="gridOptions" class="xtable-scrollbar">
      <!-- 操作：导出 -->
      <template #toolbar_buttons>
        <XButton
          type="warning"
          preIcon="ep:download"
          :title="t('action.export')"
          @click="handleExport()"
        />
      </template>
      <template #duration_default="{ row }">
        <span>{{ row.duration + 'ms' }}</span>
      </template>
      <template #resultCode_default="{ row }">
        <span>{{ row.resultCode === 0 ? '成功' : '失败(' + row.resultMsg + ')' }}</span>
      </template>
      <template #actionbtns_default="{ row }">
        <!-- 操作：详情 -->
        <XTextButton
          preIcon="ep:view"
          :title="t('action.detail')"
          v-hasPermi="['infra:api-access-log:query']"
          @click="handleDetail(row)"
        />
        <XTextButton
          preIcon="ep:cpu"
          title="已处理"
          v-if="row.processStatus === InfraApiErrorLogProcessStatusEnum.INIT"
          v-hasPermi="['infra:api-error-log:update-status']"
          @click="handleProcessClick(row, InfraApiErrorLogProcessStatusEnum.DONE, '已处理')"
        />
        <XTextButton
          preIcon="ep:mute-notification"
          title="已忽略"
          v-if="row.processStatus === InfraApiErrorLogProcessStatusEnum.INIT"
          v-hasPermi="['infra:api-error-log:update-status']"
          @click="handleProcessClick(row, InfraApiErrorLogProcessStatusEnum.IGNORE, '已忽略')"
        />
      </template>
    </vxe-grid>
  </ContentWrap>
  <XModal v-model="dialogVisible" :title="dialogTitle">
    <!-- 对话框(详情) -->
    <Descriptions :schema="allSchemas.detailSchema" :data="detailRef" />
    <!-- 操作按钮 -->
    <template #footer>
      <el-button @click="dialogVisible = false">{{ t('dialog.close') }}</el-button>
    </template>
  </XModal>
</template>
<script setup lang="ts" name="ApiErrorLog">
import { ref } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useVxeGrid } from '@/hooks/web/useVxeGrid'
import { VxeGridInstance } from 'vxe-table'
import { allSchemas } from './apiErrorLog.data'
import * as ApiErrorLogApi from '@/api/infra/apiErrorLog'
import { InfraApiErrorLogProcessStatusEnum } from '@/utils/constants'
import { useMessage } from '@/hooks/web/useMessage'
const message = useMessage()
const { t } = useI18n() // 国际化

// ========== 列表相关 ==========
const xGrid = ref<VxeGridInstance>() // 列表 Grid Ref
const { gridOptions, getList, exportList } = useVxeGrid<ApiErrorLogApi.ApiErrorLogVO>({
  allSchemas: allSchemas,
  getListApi: ApiErrorLogApi.getApiErrorLogPageApi,
  exportListApi: ApiErrorLogApi.exportApiErrorLogApi
})
// ========== 详情相关 ==========
const detailRef = ref() // 详情 Ref
const dialogVisible = ref(false) // 是否显示弹出层
const dialogTitle = ref('') // 弹出层标题

// 详情操作
const handleDetail = (row: ApiErrorLogApi.ApiErrorLogVO) => {
  // 设置数据
  detailRef.value = row
  dialogTitle.value = t('action.detail')
  dialogVisible.value = true
}
// 导出
const handleExport = async () => {
  await exportList(xGrid, '错误数据.xls')
}
// 异常处理操作
const handleProcessClick = (
  row: ApiErrorLogApi.ApiErrorLogVO,
  processSttatus: number,
  type: string
) => {
  message
    .confirm('确认标记为' + type + '?', t('common.reminder'))
    .then(async () => {
      ApiErrorLogApi.updateApiErrorLogPageApi(row.id, processSttatus).then(() => {
        message.success(t('common.updateSuccess'))
      })
    })
    .finally(async () => {
      // 刷新列表
      await getList(xGrid)
    })
    .catch(() => {})
}
</script>
