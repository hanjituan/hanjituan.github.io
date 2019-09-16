var vm = new Vue({
    el: '.wraper',
    data: {
        activeIndex: '2',
        infomation: 'hello word',
        usename: 'MR DING ER GOU',
        menuList: [
            { name: "首页导航", icon: 'el-icon-s-home' },
            { name: "用户管理", icon: 'el-icon-user-solid' },
            { name: "智慧评审", icon: 'el-icon-user' },
            { name: "订单管理", icon: 'el-icon-s-order' },
            { name: "充值中心", icon: 'el-icon-money' },
            { name: "系统设置", icon: 'el-icon-setting' },
            { name: "推广中心", icon: 'el-icon-message-solid' },
            { name: "财务中心", icon: 'el-icon-s-finance' },
        ],
        cardList: [
            { title: '用户总量', bgC: "#8890FA", total: "0", text1: "次日留存：0%", text2: "次月留存：0%", img: "./img/user.png" },
            { title: '推广总量', bgC: "#C687FB", total: "0", text1: "注册：0", text2: "充值：0.00", img: "./img/push.png" },
            { title: '充值总量', bgC: "#FFA296", total: "0", text1: "平均充值金额：00", text2: "充值用户总量：0人", img: "./img/chongzhi.png" },
            { title: '功能累计使用情况', bgC: "#7FC2FF", total: "0", text1: "报告累计使用：0", text2: "评审累计使用：0", img: "./img/fun.png" },
            { title: '总盘盈利(元)', bgC: "#FF8D8E", total: "0", text1: "充值获利：0", text2: "推广成本：0", img: "./img/profit.png" },

        ],
        activeName: 'first',
        tableData: [
            { id: '注册新增', name: '使用情况', amount1: '推广情况', amount2: '充值情况', amount3: "昨日新增充值率(%)" },
            { id: '0', name: '0', amount1: '165', amount2: '4.43', amount3: 12 },
            { id: '0', name: '查看报告', amount1: '评审', amount2: '业务员', amount3: "戴超" },
            { id: '0', name: '王小虎', amount1: '621', amount2: '2.2', amount3: 17 },
            { id: '12987126', name: '王小虎', amount1: '539', amount2: '4.1', amount3: 15 },
            { id: '12987126', name: '王小虎', amount1: '539', amount2: '4.1', amount3: 15 },
            { id: '12987126', name: '王小虎', amount1: '539', amount2: '4.1', amount3: 15 },
            { id: '12987126', name: '王小虎', amount1: '539', amount2: '4.1', amount3: 15 },
            { id: '12987126', name: '王小虎', amount1: '539', amount2: '4.1', amount3: 15 },
            { id: '12987126', name: '王小虎', amount1: '539', amount2: '4.1', amount3: 15 },
            { id: '12987126', name: '王小虎', amount1: '539', amount2: '4.1', amount3: 15 },
        ],
        str: 'today',
        form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            console.log(row);

            if (rowIndex % 2 === 0) {
                if (columnIndex === 0) {
                    return [1, 2];
                } else if (columnIndex === 1) {
                    return [0, 0];
                }
            }
        },

        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                if (rowIndex % 2 === 0) {
                    return {
                        rowspan: 2,
                        colspan: 1
                    };
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
            }
        },
        change(val) {
            this.str = val;
        },
        logout() {
            window.location.href = "./login.html"
        },
        onSubmit() {
            console.log('submit!');
        }

    }
})