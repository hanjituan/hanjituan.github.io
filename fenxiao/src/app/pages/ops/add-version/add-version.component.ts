import { OpsService } from './../../../core/common-services/ops.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UploadFile } from 'ng-zorro-antd';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MapPipe, MapSet } from '@app/directives/pipe/map.pipe';
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { OssService } from './../../../shared/services/oss.service';
@Component({
    selector: 'app-add-version',
    templateUrl: './add-version.component.html',
    styleUrls: ['./add-version.component.less']
})
export class AddVersionComponent implements OnInit {
    versionForm: FormGroup;
    fileUpLoadUrl = '';
    fileList: any[];
    apkTypeList: {
        value: string;
        label: string;
    }[];
    constructor(private fb: FormBuilder,
                private location: Location,
                private http: HttpClient,
                private oss: OssService,
                private opsSer: OpsService) {
        this.fileList = [];
        this.apkTypeList = [
            ...(new MapPipe().transformMapToArray(MapSet.apkType, true))];

    }

    submitForm() {
        Object.keys(this.versionForm.controls).forEach((item) => {
            this.versionForm.controls[item].markAsDirty();
            this.versionForm.controls[item].updateValueAndValidity();
        });
        if (this.versionForm.invalid) {
            return;
        }
        const formData = this.versionForm.getRawValue();
        this.opsSer.addVersion(formData).subscribe(res => {
            this.goBack();
        });
    }

    beforeUpload = (file: UploadFile): boolean => {
        return true;
    }
    uploadChange(e) {
        console.info(this.fileList);
        if (this.fileList.length !== 0 ) {
            return;
        }
        this.versionForm.controls['packageId'].setValue('');
        console.log(e);
    }

    upload = (item: UploadFile) => {
        this.oss.getOssPolicy(item.file.name, 3).then((res) => {
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
            //this.postData(item, host, formData);
            const req = new HttpRequest('POST', host, formData, { reportProgress: true });
            this.http.request(req).pipe(filter(e => e instanceof HttpResponse)).subscribe((event: {}) => {
                item.file.response = event['body'];
                item.file.url = event['body'].url;
                if (event['body'].status !== 'OK') {
                    return;
                }
                this.versionForm.controls['packageId'].setValue(item.file.url);
                item.onSuccess(event['body'], item.file, event);
            }, (err) => {
                console.log('upload fail');
            });
        });
    }

    postData(item, host, formData) {
        const req = new HttpRequest('POST', host, formData, { reportProgress: true });
        this.http.request(req).pipe(filter(e => e instanceof HttpResponse)).subscribe((event: {}) => {
            item.file.response = event['body'];
            item.file.url = event['body'].url;
            item.onSuccess(event['body'], item.file, event);
        }, (err) => {
            console.log('upload fail');
        });
    }

    goBack() {
        this.location.back();
    }

    initForm() {
        this.versionForm = this.fb.group({
            packageName: [null, [Validators.required]],
            packageType: [1, []],
            isForceUpdate: [0, []],
            version: [null, [Validators.required]],
            remark: [null, []],
            packageId: [null, []]
        });

    }

    ngOnInit() {
        this.initForm();
    }

}
