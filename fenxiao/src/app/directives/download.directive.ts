import { Observable } from 'rxjs';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpParams } from '@angular/common/http';
import { gatewayKey, environment } from '@env/environment';
import { NzModalService } from 'ng-zorro-antd';
export const GatewayKey = gatewayKey;
@Directive({
    selector: '[appDownload]'
})
export class DownloadDirective {
    @Input() downloadUrl: string;
    @Input() reqParam: any;
    @Input() fileName: string;
    @Input() method: string;
    @Input() downloadServer: string;
    constructor(private http: HttpClient, private modalService: NzModalService) {
        this.reqParam = {};
    }

    @HostListener('click')
    onClick() {
        this.downLoadFile();
    }


    private downLoadFile() {
        const params = new HttpParams({ fromObject: this.reqParam || {} });
        const path = this.downloadServer ? environment.baseUrl[GatewayKey[this.downloadServer]] + this.downloadUrl :
            environment.baseUrl[GatewayKey.Product] + this.downloadUrl;
        if (this.method === 'post') {
            this.postRequest(path, params).subscribe((resData) => {
                this.downLoadCb(resData);
            }, (error) => {
            });
            return;
        }
        this.getRequest(path, params).subscribe((resData) => {
            this.downLoadCb(resData);
        }, (error) => {
        });
    }

    private downLoadCb(resData) {
        const blob = new Blob([resData], { type: 'application/ms-excel' });
        const url = window.URL.createObjectURL(blob);
        const fileLink = document.createElement('a');
        fileLink.download = `${this.fileName}.xls`;
        fileLink.href = url;
        document.body.appendChild(fileLink);
        fileLink.click();
        document.body.removeChild(fileLink);
    }

    private getRequest(path: string, params: any): Observable<any> {
        return this.http.get(path, { responseType: 'arraybuffer', params });
    }

    private postRequest(path: string, params: any): Observable<any> {
        return this.http.post(path, this.reqParam, { responseType: 'arraybuffer' });
    }
}
