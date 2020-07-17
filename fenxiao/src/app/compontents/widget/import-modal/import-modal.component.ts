import { Component, OnInit } from '@angular/core';
import { BaseConfirmModal } from '../base-confirm-modal';
import { NzMessageService, UploadFile, NzModalRef } from 'ng-zorro-antd';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { gatewayKey, environment } from '@env/environment';
import { ImportModalService } from './import-modal.service';
export enum ModalBtnStatus {
    Cancel,
    Ok
}
export const GatewayKey = gatewayKey;

@Component({
    selector: 'app-import-modal',
    templateUrl: './import-modal.component.html',
    styleUrls: ['./import-modal.component.scss']
})
export class ImportModalComponent extends BaseConfirmModal.BasicConfirmModalComponent<any> implements OnInit {
    tpDownloadUrl: string;
    tpFileName: string;
    tpMethod: string;
    uploadUrl: string;
    tpService: string;
    errorList: string[];
    returnDataList: any[];
    tempFile: UploadFile;
    tips: string;
    errorRespone: any;
    downloadErrorMessage: boolean;
    errorMessageUrl: any;
    exportLoading: boolean;
    constructor(
        private http: HttpClient,
        private message: NzMessageService,
        private nzModalRef: NzModalRef,
        private importInstence: ImportModalService,
    ) {
        super();
        this.tpDownloadUrl = '';
        this.tpFileName = '';
        this.tpMethod = '';
        this.uploadUrl = '';
        this.tpService = '';
        this.errorList = [];
        this.returnDataList = [];
        this.exportLoading = false;
    }

    ngOnInit() {
        this.tpDownloadUrl = this.params.templateAPI || '';
        this.tpFileName = this.params.templateName || '';
        this.tpMethod = this.params.tpMethod || '';
        this.tpService = this.params.tpService || '';
        this.uploadUrl = this.tpService ? environment.baseUrl[(this.params.tpService).toLowerCase()] + this.params.importAPI :
            environment.baseUrl[GatewayKey.Product] + this.params.importAPI;
    }

    beforeUpload = (file: UploadFile): boolean => {
        this.errorRespone = '';
        this.tempFile = file;
        this.tips = '';
        return false;
    }

    uploadChange(e) {
        console.log(e);
    }

    handleUpload = (item) => {
        if (!item) {
            this.tips = '请先选择文件';
            return;
        }
        this.exportLoading = true;
        this.errorList = [];
        const formData = new FormData();
        formData.append('file', item, item.name);
        if (!!this.params.oilDepotName && !!this.params.oilDepotId) {
            formData.append('oilDepotName', this.params.oilDepotName);
            formData.append('oilDepotId', this.params.oilDepotId);
        }
        const req = new HttpRequest('POST', this.uploadUrl, formData, { reportProgress: true });
        this.http.request(req).pipe(filter(e => e instanceof HttpResponse)).subscribe((event: {}) => {
            item.response = event['body'];
            console.log(item.response);
            this.exportLoading = false;
            if (item.response.status !== 0) {
                if (item.response.data && item.response.data.importMsg) {
                    this.errorRespone = item.response.data.importMsg;
                    this.downloadErrorMessage = true;
                    this.errorMessageUrl =
                        `${environment.baseUrl[GatewayKey.Ius]}file/downloadErrorFile/?fileName=${item.response.data.errorFileName}`;
                } else {
                    this.errorRespone = item.response.data;
                    this.downloadErrorMessage = false;
                }
            } else {
                this.message.success(item.response.message);
                this.nzModalRef.destroy({ status: ModalBtnStatus.Ok, data: this.returnDataList });
            }
        }, err => this.exportLoading = false);
    }

    getCurrentValue() {
        this.handleUpload(this.tempFile);
        return this.returnDataList;
    }
}
