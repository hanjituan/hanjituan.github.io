import { Component, OnInit, ElementRef, Output, Input, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { environment } from '@env/environment';
import * as Cropper from 'croppie';
import { NzMessageService } from 'ng-zorro-antd';
import { filter } from 'rxjs/operators';
import { HttpRequest, HttpClient, HttpResponse } from '@angular/common/http';
import { OssService } from '@app/shared/services/oss.service';

enum UploadModuleTypeEnum {
    Image
}

@Component({
    selector: 'app-image-croppie',
    templateUrl: './image-croppie.component.html',
    styleUrls: ['./image-croppie.component.less']
})
export class ImageCroppieComponent implements OnInit, OnChanges {
    @Output() urlChange = new EventEmitter<any>();
    @Input() urlByDetail: any;

    uploadElement: any;
    croppie: any;
    isVisible = false;
    cropedSrc: any;
    uploadUrl: string;
    tempFile: any;
    checkVisible = false;
    imgSrc: any;
    imgShow: string;
    fileUpLoadUrl: any;
    UploadModuleTypes = UploadModuleTypeEnum;
    moduleType: string;

    constructor(private el: ElementRef, private http: HttpClient, private message: NzMessageService, private oss: OssService) {
        this.cropedSrc = null;
        this.imgShow = null;
        this.moduleType = 'Image';
    }

    redImg() {
        if (this.imgSrc && this.imgSrc.indexOf('http') > 0) {
            this.imgShow = this.imgSrc;
        } else {
            this.imgShow = `${environment.baseUrl.bs}file/read?fileId=${this.imgSrc}`;
        }
        this.checkVisible = true;
    }

    resetImg() {
        this.imgShow = null;
        this.cropedSrc = null;
        this.urlChange.emit('');
    }

    handleCheckCancel() {
        this.checkVisible = false;
    }

    handleCheckOk() {
        this.checkVisible = false;
    }

    removeAndDestory() {
        this.croppie.destroy();
        this.uploadElement.removeEventListener('change', this.onFileUpload);
        const inputValue: any = document.getElementById('upload');
        inputValue.value = null;
    }

    handleCancel() {
        this.isVisible = false;
        this.removeAndDestory();
    }

    handleOk() {
        this.getCroppieImage();
        this.isVisible = false;
        this.removeAndDestory();
    }

    initCroppie(url) {
        setTimeout(() => {
            this.croppie = new Cropper(document.getElementById('upload-demo'), {
                viewport: { width: 400, height: 250, },
                boundary: { width: 500, height: 400 },
                enableOrientation: true,
                showZoomer: true,
            });
            this.croppie.bind({ url });
        }, 500);
    }

    initFileUpload() {
        this.uploadElement = document.getElementById('upload');
        this.uploadElement.addEventListener('change', this.onFileUpload.bind(this));
    }

    onFileUpload() {
        this.isVisible = true;
        if (this.uploadElement.files && this.uploadElement.files.length > 0) {
            const file = this.uploadElement.files[0];
            const reader = new FileReader();
            this.tempFile = file;
            reader.readAsDataURL(file);
            reader.onload = ((event: any) => {
                this.initCroppie(event.target.result);
                this.uploadUrl = event.target.result;
                this.croppie.bind({ url: event.target.result, orientation: 1 });
            });
        }
    }

    rotateLeft() {
        this.croppie.rotate(90);
    }

    rotateRight() {
        this.croppie.rotate(-90);
    }

    getCroppieImage() {
        this.croppie.result({ size: { width: 400, height: 400 } }, { type: 'rawcanvas' }).then(res => {
            // 得到二进制流图片,转化为blob格式传给后台
            const arr = res.split(',');
            const mime = arr[0].match(/:(.*?);/)[1];
            const bstr = atob(arr[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            const imgFile: any = new Blob([u8arr], {
                type: mime,
            });

            imgFile.name = this.tempFile.name;
            this.popupResults({ src: res });
            this.handleUpload({ file: imgFile });
            // yourCroppieReference.result('canvas','original','png',1) 低质量图片旋转之后裁剪可能出现白边
        });
    }

    popupResults(result) {
        if (result.src) {
            this.cropedSrc = result.src;
        }
    }

    handleUpload = (item) => {
        const formData = new FormData();
        let host = null;
        if (environment.useOss) {
            this.oss.getOssPolicy(item.file.name, 0).then((res) => {
                host = res.host;
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
                this.http.request(req).pipe(filter(e => e instanceof HttpResponse)).subscribe((event: any) => {
                    this.imgSrc = event.body.url;
                    this.urlChange.emit(event.body.url);
                }, (err) => {
                    console.log('upload fail');
                });
            });
            return;
        }

        formData.append('file', item.file, item.file.name);
        host = environment.baseUrl.bs + 'file/upload';
        this.postData(item, host, formData);
    }

    postData(item, host, formData) {
        const req = new HttpRequest('POST', host, formData, { reportProgress: true });
        this.http.request(req).pipe(filter(e => e instanceof HttpResponse)).subscribe((event: any) => {
            this.message.success('上传成功');
            this.imgSrc = event.body.data;
            this.urlChange.emit(this.imgSrc);
        }, (err) => {
            console.log('upload fail');
        });
    }

    ngOnInit() {
        setTimeout(() => {
            this.initFileUpload();
        }, 300);
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.urlByDetail !== undefined) {
            this.cropedSrc = changes.urlByDetail.currentValue;
            this.imgSrc = changes.urlByDetail.currentValue.substr(changes.urlByDetail.currentValue.indexOf('=') + 1);
            console.log(this.imgSrc);
        }
    }
}
