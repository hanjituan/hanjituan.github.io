import { filter } from 'rxjs/operators';
import { Component, OnInit, Output, Input, EventEmitter, AfterViewInit, TemplateRef, ViewChild } from '@angular/core';
import { UfastTableNs } from '@app/shared/component/ufast-table/ufast-table.component';
import { MemberService } from '@app/core/common-services/member/member.service';
import { NzMessageService } from 'ng-zorro-antd';
import { MapPipe, MapSet } from '@app/directives/pipe/map.pipe';

@Component({
    selector: 'app-integral-detail',
    templateUrl: './integral-detail.component.html',
    styleUrls: ['./integral-detail.component.less']
})

export class IntegralDetailComponent implements OnInit, AfterViewInit {
    @Output() returnBack = new EventEmitter<any>();
    @Input() id: any;
    @ViewChild('operationTpl', { static: false }) operationTpl: TemplateRef<any>;
    @ViewChild('seqNoTpl', { static: false }) seqNoTpl: TemplateRef<any>;
    @ViewChild('stateTpl', { static: false }) stateTpl: TemplateRef<any>;
    @ViewChild('memberNoTpl', { static: false }) memberNoTpl: TemplateRef<any>;
    @ViewChild('integraTpl', { static: false }) integraTpl: TemplateRef<any>;
    filters = { memberId: null, member: '', changeType: null };
    tableConfig: UfastTableNs.TableConfig;
    sortBy: any;
    dataList: any;
    integralStateList: any[];

    constructor(
        private memberSer: MemberService,
        private message: NzMessageService,
    ) { }

    returnToList() {
        this.returnBack.emit();
    }

    sortOrderBy(e) {

    }

    async getDataList(pageNum?) {
        const params = {
            pageSize: this.tableConfig.pageSize,
            pageNum: pageNum || this.tableConfig.pageNum,
            filters: this.filters,
            sort: this.sortBy
        };
        const res = await this.memberSer.integralChange(params);
        if (res.code !== 0) {
            this.message.error(res.message);
            return;
        }
        this.dataList = res.data.list;
        this.tableConfig.total = res.data.total;
    }

    ngOnInit() {
        this.filters.memberId = this.id.id;
        this.filters.member = this.id.nickname + (this.id.phone || '');
        this.integralStateList = [...(new MapPipe()).transformMapToArray(MapSet.integralState)];
        console.log(this.integralStateList);

    }

    ngAfterViewInit() {
        this.tableConfig = {
            pageSize: 10,
            pageNum: 1,
            showCheckbox: true,
            checkRowField: '_checked',
            showPagination: true,
            checkAll: false,
            total: 0,
            loading: false,
            headers: [
                { title: '序号', width: 60, tdTemplate: this.seqNoTpl },
                { title: '时间', width: 130, field: 'createTime', sort: true, pipe: 'date:y-MM-dd HH:mm:ss' },
                { title: '变动积分', width: 80, field: 'integration' },
                { title: '积分余额', width: 100, field: 'currentIntegration' },
                { title: '变动类型', width: 80, field: 'changeType', pipe: 'integralState' },
                { title: '备注', width: 80, field: 'note' },
            ]
        };
        this.getDataList();
    }

}
