import type { ResType } from "./shared"
import { http } from "@/utils"
// import type { CheckboxValueType } from 'antd/es/checkbox/Group'

type CheckboxValueType = string | number


// 预测
interface PredictParams {
  UA: 'pc' | 'mobile'
  mode: 'fruit' | 'pulp'
  metrics: CheckboxValueType[]
  names: string[]
}

interface imagedataItem {
  key: number
  name: string

  fruit_img: string
  V1_img: string
  V2_img: string
  V5_img: string
  color_img: string
  sk_img: string
  stripe_img: string
  tumor_img: string

  pulp_img: string
  smooth_V1_img: string
  smooth_V2_img: string
  smooth_V4_img: string
  heart_img: string
}

export interface PredictRes {
  excel: string
  imgdata: imagedataItem[]
}

export function PredictAPI(data: PredictParams) {
  // return http.request<ResType<PredictRes>>({
  return http.request<PredictRes>({
    url: '/predict',
    method: 'POST',
    data
  })
}


// 上传
interface UploadParams {
  name: string
  data: string
}

export function UploadAPI(data: UploadParams) {
  // return http.request<ResType<string>>({
  return http.request<string>({
    url: '/upload',
    method: 'POST',
    data
  })
}

// 清除重置
interface ClearParams {
  names: string[]
}

export function ClearAPI(data: ClearParams) {
  // return http.request<ResType<string>>({
  return http.request<string>({
    url: '/clear',
    method: 'POST',
    // GET请求用params, POST请求用data
    data
  })
}


// 查询状态
export interface StatusRes {
  status: boolean
}

export function StatusAPI() {
  // return http.request<ResType<StatusRes>>({
  return http.request<StatusRes>({
    url: '/status',
    method: 'GET'
  })
}


