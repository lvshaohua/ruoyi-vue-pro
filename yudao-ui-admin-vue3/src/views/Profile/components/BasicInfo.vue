<template>
  <Form ref="formRef" :rules="rules" :schema="schema" :labelWidth="80">
    <template #sex>
      <el-radio-group v-model="sexVlue">
        <el-radio :label="1">{{ t('profile.user.man') }}</el-radio>
        <el-radio :label="2">{{ t('profile.user.woman') }}</el-radio>
      </el-radio-group>
    </template>
  </Form>
  <el-button type="primary" @click="submit()">{{ t('common.save') }}</el-button>
  <el-button type="danger" @click="init()">{{ t('common.reset') }}</el-button>
</template>
<script setup lang="ts">
import { reactive, onMounted, unref, ref } from 'vue'
import type { FormRules } from 'element-plus'
import { ElMessage, ElRadioGroup, ElRadio } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { FormSchema } from '@/types/form'
import { FormExpose } from '@/components/Form'
import {
  getUserProfileApi,
  updateUserProfileApi,
  UserProfileUpdateReqVO
} from '@/api/system/user/profile'

const { t } = useI18n()
// 表单校验
const rules = reactive<FormRules>({
  nickname: [{ required: true, message: t('profile.rules.nickname'), trigger: 'blur' }],
  email: [
    { required: true, message: t('profile.rules.mail'), trigger: 'blur' },
    {
      type: 'email',
      message: t('profile.rules.truemail'),
      trigger: ['blur', 'change']
    }
  ],
  mobile: [
    { required: true, message: t('profile.rules.phone'), trigger: 'blur' },
    {
      pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
      message: t('profile.rules.truephone'),
      trigger: 'blur'
    }
  ]
})
const schema = reactive<FormSchema[]>([
  {
    field: 'nickname',
    label: t('profile.user.nickname'),
    component: 'Input'
  },
  {
    field: 'mobile',
    label: t('profile.user.mobile'),
    component: 'Input'
  },
  {
    field: 'email',
    label: t('profile.user.email'),
    component: 'Input'
  },
  {
    field: 'sex',
    label: t('profile.user.sex'),
    component: 'InputNumber',
    value: 0
  }
])
const sexVlue = ref<number>()
const formRef = ref<FormExpose>() // 表单 Ref
const submit = () => {
  const elForm = unref(formRef)?.getElFormRef()
  if (!elForm) return
  elForm.validate(async (valid) => {
    if (valid) {
      const data = unref(formRef)?.formModel as UserProfileUpdateReqVO
      data.sex = sexVlue.value as unknown as number
      await updateUserProfileApi(data)
      ElMessage.success(t('common.updateSuccess'))
      await init()
    }
  })
}
const init = async () => {
  const res = await getUserProfileApi()
  sexVlue.value = res.sex
  unref(formRef)?.setValues(res)
}
onMounted(async () => {
  await init()
})
</script>
