import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

export const DateConst = {
    day: 10,
    month: 30,
    quarter_1: 41,
    quarter_2: 42,
    quarter_3: 43,
    quarter_4: 44,
    year: 51
};
@Component({
    selector: 'app-range-data',
    templateUrl: './range-data.component.html',
    styleUrls: ['./range-data.component.less']
})
export class RangeDataComponent implements OnInit {
    startValue: Date | null = null;
    endValue: Date | null = null;
    endOpen = false;
    currentType = 'day';
    monthRangeDate = new Date();
    yearRangeDate = new Date();
    quarterData = '';
    quarterList = [];
    private datePipe: DatePipe = new DatePipe('zh-CN');
    @Input() hiddenBtn: boolean;
    @Input() defaultType: string;
    @Input() startDatePlaceholder: string;
    @Output() startDateChange = new EventEmitter();
    @Input()
    get startDate() {
        return this.startValue;
    }
    set startDate(val: any) {
        this.startValue = val;
    }

    @Input() endDatePlaceholder: string;
    @Output() endDateChange = new EventEmitter();
    @Input()
    get endDate() {
        return this.endValue;
    }
    set endDate(val: any) {
        this.endValue = val;
    }
    @Input() dateType: number;
    @Output() dateTypeChange = new EventEmitter();
    constructor() { }
    disabledStartDate = (startValue: Date): boolean => {
        if (!startValue || !this.endValue) {
            return false;
        }
        return startValue.getTime() > this.endValue.getTime();
    }

    disabledEndDate = (endValue: Date): boolean => {
        if (!endValue || !this.startValue) {
            return false;
        }
        return endValue.getTime() <= new Date(this.startValue).getTime() - (24 * 60 * 60 * 1000);
    }

    onStartChange(date: Date): void {
        this.startValue = date ? new Date(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + '00:00:00') : null;
        this.startDateChange.emit(this.startValue);
    }

    onEndChange(date: Date): void {
        this.endValue = date ? new Date(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + '23:59:59') : null;
        this.endDateChange.emit(this.endValue);
    }

    onRangeChange(value, type) {
        this.dateTypeChange.emit(DateConst[type]);
        this.endDateChange.emit('');
        if (type === 'year') {
            this.startDateChange.emit(new Date(value).getFullYear());
            return;
        }
        this.startDateChange.emit(new Date(value).getMonth() + 1);
    }

    quarterChange(value) {
        const dataType = DateConst['quarter_' + (value.split('-')[1])];
        this.dateTypeChange.emit(dataType);
        this.endDateChange.emit('');
        this.startDateChange.emit(value.split('-')[0]);
    }

    handleStartOpenChange(open: boolean): void {
        if (!open) {
            this.endOpen = true;
        }
    }
    handleEndOpenChange(open: boolean): void {
        this.endOpen = open;
    }
    chooseDateType(type) {
        this.currentType = type;
        const endDate = new Date();
        let startDate: Date | null = new Date();
        const end = endDate ?
            new Date(endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-' + endDate.getDate() + ' ' + '23:59:59') : null;
        let start: Date | null = null;
        switch (type) {
            case 'day':
                startDate = new Date(endDate.getTime() - 24 * 3600 * 1000);
                start = startDate ?
                    new Date(endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-' + endDate.getDate() + ' ' + '00:00:00') : null;
                break;
            case 'month':
                if (this.dateType) {
                    this.onRangeChange(new Date(), type);
                    return;
                }
                start = endDate ?
                    new Date(endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-' + 1 + ' ' + '00:00:00') : null;
                break;
            case 'quarter':
                if (this.dateType) {
                    this.quarterChange(this.quarterList[0].value);
                    return;
                }
                const currentMonth = endDate.getMonth() + 1;
                const month = (currentMonth % 3) === 0 ? currentMonth - 2 : currentMonth - (currentMonth % 3 - 1);
                start = endDate ?
                    new Date(endDate.getFullYear() + '-' + (month) + '-' + 1 + ' ' + '00:00:00') : null;
                break;
            default:
                if (this.dateType) {
                    this.onRangeChange(new Date(), type);
                    return;
                }
                start = endDate ?
                    new Date(endDate.getFullYear() + '-' + 1 + '-' + 1 + ' ' + '00:00:00') : null;
        }
        this.startDate = start;
        this.endValue = end;
        this.startDateChange.emit(this.startValue);
        this.endDateChange.emit(this.endValue);
        if (this.dateType) {
            this.dateTypeChange.emit(DateConst[type]);
        }
    }
    initData() {
        this.setQuarterList();
    }
    setQuarterList() {
        const currentDate = new Date();
        const curQuarter = Math.floor((currentDate.getMonth() + 1) / 3);
        let maxQuarter = 4;
        const lastYear = currentDate.getFullYear();
        for (let i = 4, quarter = curQuarter; i > 0; i-- ) {
            if (quarter > 0) {
                this.quarterList.push({
                    label: `${lastYear}年第${quarter}季度`,
                    value: `${lastYear}-${quarter}`
                });
                quarter--;
                continue;
            }
            this.quarterList.push({
                label: `${lastYear}年第${maxQuarter}季度`,
                value: `${lastYear}-${maxQuarter}`
            });
            maxQuarter--;
        }
        this.quarterData = this.quarterList[0].value;
    }
    ngOnInit() {
        this.initData();
        this.currentType = 'day';
        if (this.hiddenBtn) {
            return;
        }
        this.chooseDateType(this.defaultType || 'day');
    }
}
