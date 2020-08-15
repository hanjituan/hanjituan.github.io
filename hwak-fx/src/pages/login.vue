<template>
    <div class="login-wraper">
        <div class="login-nav">
            <div class="nav-container">
                <img src="../assets/images/login/logo.png" alt="">
                <div class="btn coustomer-service">客服热线：025-66780292 </div>
                <div class="btn consult cursor-hand">
                    <a-icon class="nav-icon" type="qq" /> 在线咨询
                </div>
                <div class="btn download cursor-hand">
                    <a-icon class="nav-icon" type="mobile" theme="filled" />
                    APP下载
                </div>
                <div class="btn follow cursor-hand">
                    <a-icon class="nav-icon" type="wechat" />关注公众号
                </div>
                <div class="btn experience cursor-hand">
                    立即体验
                </div>
            </div>
        </div>
        <div class="login-container">
            <div class="container-wraper">
                <div class="introduce">
                    <div class="title">
                        <span>货氪分销</span> <img src="../assets/images/login/version.png" alt="">
                    </div>
                    <div class="content">
                        移动开单：车销、访销一键开单，仓库直连打印，省心省力 <br>
                        经营分析：畅销／缺货／滞销报表，一一列出，直观明了<br>
                        财务管理：应收应付，自动对账，无需财务就能账目清晰，统计无忧<br>
                        员工管控：业务员外出销售情况实时显示，尽在掌控<br>
                    </div>
                    <div class="banner"></div>
                </div>
                <div class="form-wraper">
                    <div class="form-tab">
                        <!-- <h1 class="animate__animated animate__bounce">An animated element</h1> -->
                        <span class="cursor-hand">账号登录</span>
                        <span class="line cursor-hand">|</span>
                        <span class="cursor-hand">手机验证码登录</span>
                    </div>
                    <a-form id="components-form-demo-normal-login" :form="form" class="login-form"
                        @submit="handleSubmit">
                        <a-form-item>
                            <a-input v-decorator="['userName',  { rules: [{ required: true, message: '请输入用户名!' }] },]"
                                placeholder="用户名/手机号">
                                <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
                            </a-input>
                        </a-form-item>
                        <a-form-item>
                            <a-input v-decorator="['password',{ rules: [{ required: true, message: '请输入密码!' }] },]"
                                type="password" placeholder="密码">
                                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                            </a-input>
                        </a-form-item>
                        <a-form-item>
                            <a-button type="primary" html-type="submit" class="login-form-button">
                                登录
                            </a-button>
                            <div class="a-bot-btn">
                                <span class="a-link cursor-hand">忘记密码</span>
                                <!-- <span class="a-link cursor-hand">服务支持</span> -->
                                <a target="blank" href="http://www.51hawk.com/wrap/view/dolphinSupport.html">服务支持</a>
                                <span class="a-link cursor-hand" @click="resetForm">重置</span>
                            </div>
                        </a-form-item>
                    </a-form>
                    <div class="form-bot">
                        <!-- <span class="cursor-hand">下载桌面快捷方式</span> -->
                        <a href="http://download.51hawk.com/software/货氪分销.exe?times=1597214857024">下载桌面快捷方式</a>
                        <span class="cursor-hand">立即注册</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="login-bottom">
            <div class="tab">
                <div>行业类型: </div>
            </div>

            <div class="tab">
                <img src="../assets/images/login/comman.png" alt="">
                <div>通用版 </div>
            </div>

            <div class="tab">
                <img src="../assets/images/login/clothing.png" alt="">
                <div>服装专用版 </div>
            </div>

            <div class="tab">
                <img src="../assets/images/login/build-mater.png" alt="">
                <div>建材专用版 </div>
            </div>
            <div class="tab">
                <img src="../assets/images/login/stationery.png" alt="">
                <div>文具专用版 </div>
            </div>
            <div class="tab">
                <img src="../assets/images/login/fresh.png" alt="">
                <div>生鲜专用版 </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        beforeCreate() {
            this.form = this.$form.createForm(this, { name: 'normal_login' });
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                    }
                });
            },
            resetForm() {
                console.log(123);
                this.form.resetFields();
            }
        },
    }
</script>

<style scoped lang="less">
    /* 表格样式 */
    .form-wraper {
        width: 380px;
        height: 390px;
        background-color: #ffffff;
        border-radius: 2px;
        padding: 32px 44px 17px;
        padding-bottom: 0;
        box-shadow: 0px 0px 10px #737272;

        .form-tab {
            /* color: rgba(44, 109, 211, 1); */
            /* color: @primary-color; */
            color: #666666;
            font-size: 18px;
            font-family: PingFangSC-Semibold;
            padding: 0 20px;
            display: flex;
            justify-content: space-between;

            .line {
                color: #D8D8D8;
            }
        }

        .form-bot {
            border-top: 1px solid #dddddd;
            width: 100%;
            height: 50px;
            line-height: 50px;
            border-radius: 2px;
            background-color: rgba(255, 255, 255, 1);
            display: flex;
            justify-content: space-between;
            color: @primary-color;
        }

        .a-bot-btn {
            display: flex;
            justify-content: space-between;
        }

        .a-link {
            color: #666666;
            font-size: 12px;
            font-family: PingFangSC-Regular;
        }
    }

    .login-form {
        margin-top: 40px;
        margin-bottom: 32px;

        .login-form-button {
            width: 100%;
        }
    }

    .login-wraper {
        height: 100%;
        background-color: #F5F5F6;

        .login-nav {
            height: 80px;
            width: 100%;
            background-color: rgba(255, 255, 255, 1);
            box-shadow: 0px 1px 7px 0px rgba(211, 211, 211, 1);
            position: relative;
            z-index: 100;

            .nav-container {
                margin: 0 auto;
                height: 100%;
                width: 1100px;
                display: flex;
                align-items: center;
                color: #666666;

                img {
                    height: 50px;
                    /* margin-top: 15px; */
                }


                .coustomer-service {
                    margin-left: 304px;
                }

                .btn {
                    /* border: 1px solid red; */
                }

                .consult {
                    margin-left: 30px;
                }

                .download {
                    margin-left: 30px;
                }

                .mobile {
                    margin-left: 30px;
                }

                .follow {
                    margin-left: 30px;
                }

                .experience {
                    margin-left: 30px;
                    background-color: #FA8334;
                    color: #ffffff;
                    width: 88px;
                    height: 70px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    top: -5px;
                }

                .nav-icon {
                    margin-right: 4px;
                }
            }
        }

        .login-container {
            height: calc(100% - 170px);

            .container-wraper {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                align-items: center;
                min-width: 1100px;
                width: 60%;
                margin: 0 auto;
                position: relative;
                height: 100%;

                .introduce {
                    width: 564px;
                    height: 500px;
                }

                .title {
                    color: rgba(51, 51, 51, 1);
                    font-size: 26px;
                    text-align: left;
                    font-family: PingFangSC-Regular;
                }

                .content {
                    margin-top: 16px;
                    line-height: 2;
                }

                .banner {
                    width: 533px;
                    height: 310px;
                    background-image: url(../assets/images/login/banner.png);
                }
            }
        }

        .login-bottom {
            width: 100%;
            border-top: 2px solid #dddddd;
            height: 88px;
            min-width: 1100px;
            width: 60%;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-around;

            .tab {
                display: flex;
                align-items: center;

                div {
                    margin-left: 15px;
                }
            }
        }

    }
</style>