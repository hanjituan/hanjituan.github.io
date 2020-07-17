export interface ExportParamModel {
  downloadUrl: string; // 导出接口
  reqMethod: string; // 请求方式
  fileName: string; // 导出文件名
  fileParam: any;
  downloadServer: string;
}
