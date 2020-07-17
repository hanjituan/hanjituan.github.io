// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// export const webServerUrl = 'http://192.168.1.23:9003';   //开发
export const webServerUrl = 'http://192.168.1.23/site';  // 打包

export const gatewayKey = {
    Ius: 'ius',
    Bs: 'bs',
    Mc: 'mc',
    Product: 'product',
    Company: 'company',
    Member: 'member',
    Business: 'business',
    Marketing: 'marketing',
};
export const environment = {
    useOss: false,
    production: true,
    baseUrl: {
        ius: `${webServerUrl}/ius/`,
        bs: `${webServerUrl}/mc/`,
    },
    otherData: {
        sysRole: 0,
        sysSite: '1',
        defaultPath: '0', // 0 表示从Pc端登录
    }
};