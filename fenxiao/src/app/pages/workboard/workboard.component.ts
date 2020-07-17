import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { UfastTableNs } from './../../shared/component/ufast-table/ufast-table.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { WorkboardService } from '@app/core/common-services/workboard.service';
@Component({
    selector: 'app-workboard',
    templateUrl: './workboard.component.html',
    styleUrls: ['./workboard.component.less']
})
export class WorkboardComponent implements OnInit, AfterViewInit {
    @ViewChild('priceInput', { static: false }) priceInputTpl: TemplateRef<any>;
    @ViewChild('numInput', { static: false }) numInputTpl: TemplateRef<any>;
    @Output() startDateChange = new EventEmitter();
    @Output() endDateChange = new EventEmitter();

    public tableConfig: UfastTableNs.TableConfig;
    public dataList: any = [];
    public searchForm: FormGroup;
    public chartOptionDept: any;
    public filters: any;
    public currentTime: number;
    public startValue: Date | number | null;
    public endValue: Date | null | number;
    public endOpen: boolean;
    public currentType: string;
    public startDate: Date;
    public topList: {}[];
    public chartOptionAnalysis: any;
    public chartType: boolean;
    public busDate: any;
    public chartObj: any;
    public lineSwitch: any;
    public tabSwitch: any;
    public rankingSwitch: any;
    constructor(private formBuilder: FormBuilder, private workSer: WorkboardService) {
        this.busDate = {};
        this.topList = [];
        this.chartObj = {};
        this.tabSwitch = 0;
        this.lineSwitch = 1;
        this.endOpen = false;
        this.chartType = true;
        this.rankingSwitch = 1;
        this.currentType = 'day';
        this.filters = { begainTime: null, endTime: null }
    }

    swatchChartType(value) {
        this.chartType = value;
        const opt = {
            xData: this.chartObj.arr4,
            Ydata1: this.chartObj.arr1,
            Ydata2: this.chartObj.arr2,
            Ydata3: this.chartObj.arr3,
            type: value
        };
        this.drawAnalysisChart(opt);
    }

    changedType(value, str) {
        this[str] = value;
        if (str === 'lineSwitch') {
            this.initChart(value);
        }
        if (str === 'rankingSwitch') {
            this.initData(this.startValue, this.endValue, value);
        }
        if (str === 'tabSwitch') {
            if (value === 0) {
                this.chooseDateType('day');
            } else if (value === 1) {
                this.chooseDateType('week');
            } else {
                this.chooseDateType('month');
            }

        }
    }

    handleStartOpenChange(open: boolean): void {
        if (!open) {
            this.endOpen = true;
        }
    }

    onStartChange(date: Date): void {
        this.startValue = date ?
            new Date(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + '00:00:00') : null;
        this.startDateChange.emit(this.startValue);
    }

    onEndChange(date: Date): void {
        this.endValue = date ? new Date(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + '23:59:59') : null;
        this.endDateChange.emit(this.endValue);
        this.initData(this.startValue, this.endValue, 1);
    }

    handleEndOpenChange(open: boolean): void {
        this.endOpen = open;
    }

    disabledStartDate = (startValue: Date): boolean => {
        if (!startValue || !this.endValue) {
            return false;
        }
        return startValue.getTime() > new Date(this.endValue).getTime();
    }

    disabledEndDate = (endValue: Date): boolean => {
        if (!endValue || !this.startValue) {
            return false;
        }
        return endValue.getTime() <= new Date(this.startValue).getTime() - (24 * 60 * 60 * 1000);
    }

    chooseDateType(type) {
        this.rankingSwitch = 1;
        this.currentType = type;
        const endDate = new Date();
        let startDate: Date | null = new Date();
        const end = endDate ?
            new Date(endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-' + endDate.getDate() + ' ' + '23:59:59') : null;
        let start: Date | number | null = null;
        switch (type) {
            case 'day':
                startDate = new Date(endDate.getTime() - 24 * 3600 * 1000);
                start = startDate ?
                    new Date(endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-' + endDate.getDate() + ' ' + '00:00:00') : null;
                break;
            case 'week':
                const today = new Date();
                const sevenDaysBefore = today.setTime(today.getTime() - 3600 * 1000 * 24 * 7);
                start = +new Date(sevenDaysBefore) ? +new Date(sevenDaysBefore) : null;
                break;
            case 'month':
                start = endDate ?
                    new Date(endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-' + 1 + ' ' + '00:00:00') : null;
                break;
            default:
                start = endDate ?
                    new Date(endDate.getFullYear() + '-' + 1 + '-' + 1 + ' ' + '00:00:00') : null;
        }
        this.startValue = start;
        this.endValue = end;
        this.initData(this.startValue, this.endValue, 1);
    }

    ngOnInit() {
        // this.initChart(1);
        // this.chooseDateType('day');
    }

    async initData(start, end, num) {
        const params = { beginTime: start, endTime: end, pageSize: 5, sort: num };
        const res = await this.workSer.getDatabase(params);
        this.busDate = res.value.businessOverviewVO;
        const arr = [];
        res.value.listItemVOS.map(item => {
            if (num === 1) {
                arr.push(item.totalSaleQty);
            } else {
                arr.push(item.totalSaleAmount);
            }
        });
        // tslint:disable-next-line:no-eval
        const total = eval(arr.join('+'));
        res.value.listItemVOS.map(item => {
            if (num === 1) {
                item.rate = ((item.totalSaleQty / total) * 100).toFixed(2);
            } else {
                item.rate = ((item.totalSaleAmount / total) * 100).toFixed(2);
            }
        });
        this.topList = res.value.listItemVOS;
        this.drawPie(this.busDate);
    }

    async initChart(num) {
        const res = await this.workSer.getAnalysisData(num);
        this.chartType = true;
        if (res && res.value && res.value.length) {
            this.chartObj = { arr1: [], arr2: [], arr3: [], arr4: [], type: 1 };
            res.value.map(item => {
                this.chartObj.arr1.push(item.discountValue);
                this.chartObj.arr2.push(item.salesValue);
                this.chartObj.arr3.push(item.profitValue);
                this.chartObj.arr4.push(item.dataTime);
            });
            const opt = {
                xData: this.chartObj.arr4,
                Ydata1: this.chartObj.arr1,
                Ydata2: this.chartObj.arr2,
                Ydata3: this.chartObj.arr3,
                type: 1
            };
            this.drawAnalysisChart(opt);
        } else {
            this.drawAnalysisChart({ xData: [0], Ydata1: [0], Ydata2: [0], Ydata3: [0], });
        }
    }

    drawAnalysisChart(obj) {
        let isShowDataZoom = false;
        if (obj.Ydata1.length > 7) {
            isShowDataZoom = true;
        }
        this.chartOptionAnalysis = {
            color: ['#F58273', '#51AAFC', '#FEB873'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['优惠总额', '净销售额', '净利润额'],
                top: 30,
                left: 200,
                icon: 'rect',
                itemGap: 30, // 每一项间距
                padding: [0, 10, 5, 0]
            },
            xAxis: {
                axisTick: {
                    show: true
                },
                axisLine: {
                    show: true,
                },
                name: '时间',
                axisLabel: {
                    margin: 20,
                    textStyle: {
                        fontSize: '12'
                    },
                },
                data: obj.xData,
            },
            yAxis: {
                name: '金额: 元',
                splitLine: {
                    show: true, // 网格线是否显示
                    lineStyle: { // 设置网格线颜色
                        type: 'solid',
                        color: ['#EEF0F4']
                    }
                },
                axisLine: {
                    show: true,
                },
                axisLabel: {
                    margin: 20,
                    textStyle: {
                        fontSize: '12'
                    },
                },
                type: 'value',
                axisTick: {
                    show: false
                },
            },
            dataZoom: {
                show: isShowDataZoom,
                realtime: true,
                height: 20,
                start: 0,
                end: isShowDataZoom ? 50 : 100
            },
            grid: {
                y2: '20%'
            },
            series: [
                {
                    name: '优惠总额',
                    barWidth: 28,  // 柱图宽度
                    data: obj.Ydata1,
                    type: obj.type ? 'bar' : 'line',
                    emphasis: {
                        label: {
                            show: false,
                            textStyle: {
                                fontSize: 12
                            }

                        }
                    }
                },
                {
                    name: '净销售额',
                    barWidth: 28, // 柱图宽度
                    data: obj.Ydata2,
                    type: obj.type ? 'bar' : 'line',
                    emphasis: {
                        label: {
                            show: false,
                            textStyle: {
                                fontSize: 12
                            }

                        }
                    }
                },
                {
                    name: '净利润额',
                    barWidth: 28, // 柱图宽度
                    data: obj.Ydata3,
                    type: obj.type ? 'bar' : 'line',
                    emphasis: {
                        label: {
                            show: false,
                            textStyle: {
                                fontSize: 12
                            }

                        }
                    }
                },
            ]
        };
    }

    drawPie(obj) {
        this.chartOptionDept = {
            color: ['#329AFB', '#84CB61', '#FEB873', '#FF7765', '#D993D5', '#D99335'],
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            graphic: { // 中心文字
                show: true,
                type: 'text',
                left: '32%',
                top: '52%',
                style: {
                    text: '支付方式',
                    textAlign: 'center',
                    fontSize: 'calc(20vh*100/1080)'
                }
            },
            legend: {
                orient: 'vertical',
                bottom: '15%',
                right: '5%',
                icon: 'circle',
                itemWidth: 10,
                itemHeight: 10,
                textStyle: {
                    fontSize: 12,
                },
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: ['45%', '65%'],
                    center: ['40%', '55%'],
                    label: {
                        normal: {
                            show: false,
                        },
                    },
                    data: [
                        { name: '支付宝', value: obj.alipay },
                        { name: '微信', value: obj.weChat },
                        { name: '扫码付', value: obj.microPay },
                        { name: '现金', value: obj.cash },
                        { name: '余额', value: obj.balance },
                        { name: '其他', value: obj.others },
                    ]
                }
            ]
        };
    }

    ngAfterViewInit() { }

}
