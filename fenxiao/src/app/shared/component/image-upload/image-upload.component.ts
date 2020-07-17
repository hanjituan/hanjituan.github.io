
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { OssService, OssServiceNs } from './../../services/oss.service';
import { filter } from 'rxjs/operators';
import { gatewayKey, environment } from '@env/environment';
enum UploadModuleTypeEnum {
  Image
};

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.less']
})
export class ImageUploadComponent implements OnInit {
  fileUpLoadUrl: '';
  previewImage = '';
  previewVisible = false;
  limitFileType = 'image/png,image/jpeg';
  _fileList: any[];
  UploadModuleTypes = UploadModuleTypeEnum;
  @Input() moduleType: string;
  @Output() fileListChange = new EventEmitter();
  @Input()
  set fileList(val: any) {
    this._fileList = val;
    this.fileListChange.emit(this._fileList);
  }
  get fileList() {
    return this._fileList;
  }

  constructor(private msg: NzMessageService,
    private http: HttpClient,
    private oss: OssService) { }

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }


  beforeUpload = (file: UploadFile): boolean => {
    return true;
  }


  uploadChange(e) {
    console.log(e);
  }

  handleUpload = (item) => {
    if (environment.useOss) {
      this.oss.getOssPolicy(item.file.name, UploadModuleTypeEnum[this.moduleType]).then((res) => {
        const formData = new FormData();
        const host = res.host;
        this.fileUpLoadUrl = host;
        formData.append('OSSAccessKeyId', res.accessid);
        formData.append('policy', res.policy);
        formData.append('Signature', res.signature);
        formData.append('key', res.fileName);
        formData.append('success_action_status', '200');
        formData.append('callback', res.callback);
        formData.append('file', item.file, item.file.name);
        this.postData(item, host, formData);
        const req = new HttpRequest('POST', host, formData, { reportProgress: true });
        this.http.request(req).pipe(filter(e => e instanceof HttpResponse)).subscribe((event: {}) => {
          item.file.response = event['body'];
          item.file.url = event['body'].url;
          item.onSuccess(event['body'], item.file, event);
          this.fileListChange.emit(this._fileList);
        }, (err) => {
          console.log('upload fail');
        });
      });
      return;
    }
    const formData = new FormData();
    formData.append('file', item.file, item.file.name);
    const host = environment.baseUrl['bs'] + 'company/SysObjectStorage/upload';
    this.postData(item, host, formData);
  }

  postData(item, host, formData) {
    const req = new HttpRequest('POST', host, formData, { reportProgress: true });
    this.http.request(req).pipe(filter(e => e instanceof HttpResponse)).subscribe((event: {}) => {
      item.file.response = event['body'];
      item.file.url = event['body'].url;
      item.onSuccess(event['body'], item.file, event);
      this.fileListChange.emit(this._fileList);
    }, (err) => {
      console.log('upload fail');
    });
  }

  ngOnInit() {
  }

}
