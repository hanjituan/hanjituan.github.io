<template>
    <div class="wraper">
        <div class="header">
            <div class="user">
                <img src="../../assets/user.png" alt="">
                <span class="wel-text">傍晚好！admin用户，祝您开心每一天！</span>
            </div>
            <div class="time">
                <img class="time-pic" src="../../assets/time.png" alt="">
                <p style="margin-left: 5%">剩余缴费天数</p>
                <div>
                    <p v-for="rent in rentList">
                        {{rent.name}}
                        <span class="days">{{rent.days}}</span>
                        <span>天</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="charts">
            <div class="ctrl chart">
                <div class="title">控制器</div>
                <div class="number">2131</div>
                <div ref="ctrChart" class="pie"></div>
            </div>
            <div class="rent chart">
                <div class="title">租户</div>
                <div class="number">53</div>
                <div ref="rentChart" class="pie"></div>
            </div>
            <div class="ser chart">
                <div class="title">服务节点</div>
                <div class="number">32</div>
                <div ref="serChart" class="pie"></div>
            </div>
            <div class="cpe chart">
                <div class="title">CPE</div>
                <div class="number">1</div>
                <div ref="cpeChart" class="pie"></div>
            </div>
            <div ref="alarmChart" class="alarm chart">
                <div class="title">告警</div>
                <div class="number">1462</div>
                <div ref="alrChart" class="pie"></div>
            </div>
        </div>
        <div class="flow">
            <div class="flow-top">
                <el-select class="a" ref="testSelect" v-model="value" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label + '|' + item.desc "
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-select class="b" ref="testSelect" v-model="value" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-select class="c" ref="testSelect" v-model="value" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>

            </div>
            <div class="line"></div>
            <div class="bar"></div>
        </div>
        <div class="logs">
            <div class="block">
                <div class="log-title">安全日志</div>
                <el-timeline>
                    <el-timeline-item timestamp="2018/4/12" placement="top">
                        <el-card>
                            <h4>更新 Github 模板</h4>
                            <p>王小虎 提交于 2018/4/12 20:46</p>
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2018/4/3" placement="top">
                        <el-card>
                            <h4>更新 Github 模板</h4>
                            <p>王小虎 提交于 2018/4/3 20:46</p>
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2018/4/2" placement="top">
                        <el-card>
                            <h4>更新 Github 模板</h4>
                            <p>王小虎 提交于 2018/4/2 20:46</p>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </div>
            <div class="block">
                <div class="log-title">系统日志</div>
                <el-timeline>
                    <el-timeline-item timestamp="2018/4/12" placement="top">
                        <el-card>
                            <h4>更新 Github 模板</h4>
                            <p>王小虎 提交于 2018/4/12 20:46</p>
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2018/4/3" placement="top">
                        <el-card>
                            <h4>更新 Github 模板</h4>
                            <p>王小虎 提交于 2018/4/3 20:46</p>
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2018/4/2" placement="top">
                        <el-card>
                            <h4>更新 Github 模板</h4>
                            <p>王小虎 提交于 2018/4/2 20:46</p>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        props: ['collapse'],
        data() {
            return {
                options: [{
                    value: '选项1',
                    label: '黄金糕',
                    desc: '描述',
                }, {
                    value: '选项2',
                    label: '双皮奶',
                    desc: '描述',
                }, {
                    value: '选项3',
                    label: '蚵仔煎',
                    desc: '描述',
                }, {
                    value: '选项4',
                    label: '龙须面',
                    desc: '描述',
                }, {
                    value: '选项5',
                    label: '北京烤鸭',
                    desc: '描述',
                }],
                value: '',
                msg: '',
                rentList: [
                    { name: '测试租户', days: '21' },
                    { name: '测试租户', days: '21' },
                    { name: '测试租户', days: '21' },
                ]
            }
        },
        watch: {
            collapse(newv, oldv) {
                if (newv != oldv) {
                    this.init();
                }
            }
        },
        methods: {

            drawPie(opt) {
                // 用ref,防止重复id
                let myChart = this.$echarts.init(this.$refs[opt]);

                myChart.setOption({
                    color: ['#7ECF51', '#2B98FD', 'pink'],
                    title: {
                        text: "123",
                        x: 'center',
                        y: '35%',
                        textStyle: {
                            color: 'red'
                        },
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        bottom: '10',
                        x: '20',
                        data: ['正常', '故障', '离线'],
                        icon: 'circle'
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['50%', '65%'],
                            center: ['50%', '40%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [
                                { value: 12, name: '正常' },
                                { value: 31, name: '故障' },
                                { value: 15, name: '离线' },
                            ]
                        }
                    ]
                });
                window.onresize = function () {
                    myChart.resize();
                }
                myChart.resize();
            },

            init() {
                var pieArr = ['ctrChart', 'rentChart', 'serChart', 'cpeChart', 'alrChart',];
                pieArr.map(item => {
                    this.drawPie(item);
                })
            }
        },
        mounted() {
            this.init();
        }
    }
</script>

<style scoped>
    .wraper {
        overflow: hidden;
        font-size: 14px;
    }


    .charts {
        width: 100%;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
    }

    .chart {
        transition: all ease 0.5s;
        width: 20%;
        height: 400px;
        background-color: #fff;
        outline: 10px solid #F1F2F7;
        padding: 20px 10px;
        position: relative;
    }

    .ctrl {
        margin-left: 0;
        border-left: none;
    }

    .chart::after {
        content: ' ';
        border-top: 1px solid #ddd;
        position: absolute;
        bottom: 50px;
        left: 1%;
        width: 98%;
        height: 1%;
    }

    .pie {
        height: calc(100% - 40px);
    }

    .header {
        width: 100%;
        height: 120px;
        display: flex;
        justify-content: space-between;
    }

    .user {
        padding-left: 20px;
        width: 60%;
        display: flex;
        align-items: center;
        background-color: #ffffff;
        border-right: 10px solid #F1F2F7;
    }

    .time {
        width: 40%;
        background-color: #ffffff;
        display: flex;
        align-items: center;
    }

    .time p {
        margin: 0;
        /* margin-left: 10%; */
    }

    .time div p {
        padding-left: 20px;
    }

    .wel-text {
        margin-left: 20px;
        font-weight: bold;
        font-size: 22px;
    }

    .days {
        font-size: 22px;
        font-weight: bold;
        color: #E85C4E;
        margin-left: 10px;
        white-space: nowrap;
    }

    .time-pic {
        margin-top: 10px;
    }

    .number {
        font-size: 32px;
        font-weight: bold;
        height: 39px;
    }

    .title {
        height: 21px;
    }

    .alarm {
        margin-right: 0;
    }

    .flow {
        background-color: #fff;
        padding: 20px;
        margin-top: 10px;
    }

    .flow-top {
        /* border: 1px solid red; */
        display: flex;
        justify-content: space-between;
    }

    /* .a {
        flex-grow: 1;
    }

    .b {
        flex-grow: 0;
    }

    .c {
        flex-grow: 0;
    } */

    .logs {
        display: flex;
        /* justify-content: space-around; */
    }

    .block {
        width: 50%;
        padding: 50px 0;
    }

    .log-title {
        font-size: 18px;
        font-weight: bold;
        padding: 20px 50px;
    }
</style>