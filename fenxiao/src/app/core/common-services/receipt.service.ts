import { Observable } from 'rxjs';
import {Injectable, Injector} from '@angular/core';
import { HttpUtilService, HttpUtilNs } from '../infra/http/http-util.service';

export namespace ReceiptServiceNs {
  export class ReceiptServiceClass {
    private http: HttpUtilService;
    public receiptConfigList = {
      spaceName: { isShow: true, itemName: '店铺名称', key: 'spaceName', indexName: 'spaceName' },
      createTime: { isShow: true, itemName: '开单时间', key: 'createTime', indexName: 'createTime' },
      creatorName: { isShow: true, itemName: '收 银 员', key: 'creatorName', indexName: 'creatorName' },
      billNo: { isShow: true, itemName: '单据编号', key: 'billNo', indexName: 'billNo' },
      seqNo: { isShow: true, isFixed: true, itemName: '序号', key: 'seqNo', indexName: 'seqNo' },
      productName: { isShow: true, isFixed: true, itemName: '商品名称', key: 'productName', indexName: 'productName' },
      specification: { isShow: true, isFixed: true, itemName: '规格', key: 'specification', indexName: 'specification'},
      uomName: { isShow: true, itemName: '单位', key: 'uomName', indexName: 'uomName' },
      qty: { isShow: true, itemName: '数量', key: 'qty', indexName: 'qty' },
      price: { isShow: true, itemName: '原价', key: 'price', indexName: 'price' },
      discountPrice: { isShow: false, itemName: '优惠', key: 'discountPrice', indexName: 'discountPrice' },
      settlePrice: { isShow: true, itemName: '现价', key: 'settlePrice', indexName: 'settlePrice' },
      subtotal: {isShow: false, itemName: '小计', key: 'totalSettleValue', indexName: 'subtotal'},
      totalValue: {isShow: true, itemName: '总额', key: 'totalSettleValue', indexName: 'totalValue'},
      totalSettleDiscountValue: {isShow: true, itemName: '结算优惠', key: 'totalSettleDiscountValue', indexName: 'totalSettleDiscountValue'},
      payWay: {isShow: true, itemName: '支付方式', key: 'payWay', indexName: 'payWay'},
      memberName: {isShow: true, itemName: '会员名称', key: 'memberName', indexName: 'memberName'},
      memberNo: {isShow: false, itemName: '会员编号', key: 'memberNo', indexName: 'memberNo'},
      memberPhone: {isShow: false, itemName: '会员手机号', key: 'memberPhone', indexName: 'memberPhone'},
      balance: {isShow: false, itemName: '余额', key: 'memberBalance', indexName: 'balance'},
      integration: {isShow: false, itemName: '积分', key: 'integration', indexName: 'integration'},
      shopAddress: {isShow: true, itemName: '店铺地址', key: 'shopAddress', indexName: 'shopAddress'}
    };
    constructor(private injector: Injector) {
      this.http = this.injector.get(HttpUtilService);
    }

    getPrintTpl(): Observable<HttpUtilNs.UfastHttpResT<any>> {
      const config: HttpUtilNs.UfastHttpConfig = {};
      config.gateway = HttpUtilNs.GatewayKey.Company;
      return this.http.Get('Printemplate/item', null, config);
    }

    savePrintTpl(params): Observable<HttpUtilNs.UfastHttpResT<any>> {
      const config: HttpUtilNs.UfastHttpConfig = {};
      config.gateway = HttpUtilNs.GatewayKey.Company;
      return this.http.Post('Printemplate/preserv', params, config);
    }

  }
}
@Injectable()
export class ReceiptService extends ReceiptServiceNs.ReceiptServiceClass {
  constructor(injector: Injector) {
    super(injector);
  }
}
