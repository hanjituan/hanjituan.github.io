import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

export const MapSet = {

    asyncState: {
        0: '未同步',
        1: '已同步',
    },
    contractState: {
        0: '未签约',
        1: '已签约',
    },

    AccountType: {
        0: '未知类型',
        1: '正式商户',
        2: '试用商户',
        3: '测试商户',
    },
    merchantCardType: {
        '01': '营业执照',
        '02': '事业单位法人证书',
        '03': '身份证',
        '04': '其他证书/批文/证明',
        '05': '统一社会信用代码证书',
        '06': '有偿服务许可证（军队医院适用）',
        '07': '医疗机构执业许可证（军队医院适用）',
        '08': '企业营业执照（挂靠企业的党组织适用）',
        '09': '组织机构代码证（政府机关适用）',
        '10': '社会团体法人登记证书',
        '11': '民办非企业单位登记证书',
        '12': '基金会法人登记证书',
        '13': '慈善组织公开募捐资格证书',
        '14': '农民专业合作社法人营业执照',
        '15': '宗教活动场所登记证',
    },
    legalCardType: {
        '01': '身份证',
        '02': '军官证',
        '03': '护照',
        '04': '港澳居民来往内地通行证（回乡证）',
        '05': '台湾同胞来往内地通行证（台胞证）',
        '06': '警官证',
        '07': '士兵证',
        '08': '',
        '09': '临时身份证',
        '10': '外国人居留证',
    },
    merchantNature: {
        '01': '个体',
        '02': '企业',
        '03': '小微商户',
        '04': '事业单位',
    },
    settleWays: {
        0: 'D+0清算',
        1: 'D+1清算',
        2: 'D+N清算',
    },
    partner: {
        1: '仅会员',
        2: '全部客户',
    },
    merchantType: {
        1: '正式商户',
        2: '试用商户',
        3: '测试商户'
    },
    regChannel: {
        1: '管理录入',
        2: '自助注册',
        3: '管家婆商户'
    },
    idCardType: {
        '01': '身份证',
        '02': '军官证',
        '03': '护照',
        '04': '港澳居民来往内地通行证（回乡证）',
        '05': '台湾同胞来往内地通行证（台胞证）',
        '06': '警官证',
        '07': '士兵证',
        '09': '临时身份证',
        '10': '外国人居留证',
    },

    merchantTplType: {
        0: '自定义',
        2: '系统默认模板'
    },

    apkType: {
        1: '分销版',
        8: '农资版',
        9: '市场版'
    },

    booleanType: {
        0: '否',
        1: '是'
    },

    integralState: {
        1: '积分兑换',
        2: '获得积分',
        3: '积分退还',
        4: '管理变更',
    },
    merchantSettleState: {
        0: '未开始',
        1: '进行中',
        2: '已结束',
    }
};

@Pipe({
    name: 'map'
})

export class MapPipe implements PipeTransform {
    private datePipe: DatePipe = new DatePipe('en-US');
    private mapObj = MapSet;

    transform(value: any, arg?: any): any {
        if (arg === undefined) {
            return value;
        }
        let type: string = arg;
        let param = '';

        if (arg.indexOf(':') !== -1) {
            type = arg.substring(0, arg.indexOf(':'));
            param = arg.substring(arg.indexOf(':') + 1, arg.length);
        }
        switch (type) {
            case 'date':
                return this.datePipe.transform(value, param, 'GMT+0800');
            default:
                return (this.mapObj[type] ? this.mapObj[type][value] : '');
        }
    }

    public transformMapToArray(data?: any, toNumber?: boolean) {
        if (!data) {
            return [];
        }
        const list = [];
        Object.keys(data).forEach((key: string) => {
            list.push({ value: toNumber ? Number(key) : key, label: data[key] });
        });
        return list;
    }

}
