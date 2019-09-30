<template>
    <div class="login">
        <div class="login-pic"> </div>
        <div class="login-form">
            <div class="switch">
                <el-row>
                    <el-button @click="switchLanguage(false,'zh')" :class="{'active':language}" type="text">中文
                    </el-button>
                    <el-button @click="switchLanguage(true,'en')" :class="{'active':!language}" type="text">English
                    </el-button>
                </el-row>
            </div>
            <div class="box">
                <img class="logo" src="../assets/logo.png" alt="">
                <el-form :model="ruleForm" :label-width="0" :rules="rules" ref="ruleForm" label-width="100px"
                    class="demo-ruleForm">
                    <el-form-item prop="name">
                        <el-input placeholder="请输入用户名" prefix-icon="el-icon-user" v-model="ruleForm.name"
                            autocomplete="off">
                        </el-input>
                    </el-form-item>

                    <el-form-item prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" placeholder="请输入密码" prefix-icon="el-icon-lock"
                            autocomplete="off" @keyup.enter.native="submitForm('ruleForm')">
                        </el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button :loading="load" :disabled="!ruleForm.pass || !ruleForm.name" type="primary"
                            style="width: 100%" @click="submitForm('ruleForm')">提交
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="footer">Copyright © All Rights Reserved.</div>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data() {
            var checkName = (rule, value, callback) => {
                return value ? callback() : callback(new Error('用户名不能为空！'));
            };
            var validatePass = (rule, value, callback) => {
                return value ? callback() : callback(new Error('密码不能为空！'));
            };
            return {
                load: false,
                language: false,
                ruleForm: {
                    pass: '',
                    name: ''
                },
                rules: {
                    name: [
                        { validator: checkName, trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.load = true;
                this.$router.push('dashboard')

                // this.$refs[formName].validate((valid) => {
                //     if (valid) {
                //         this.axios.post('http://192.168.1.113:3002/login').then((res) => {
                //             this.load = false;
                //             this.$message.success('登录成功!');
                //             this.$router.push('dashboard')
                //         }).catch((response) => {
                //             this.load = false;
                //         })
                //     } else {
                //         return false;
                //     }
                // });
            },
            switchLanguage(val, str) {
                this.language = val;
                this.$i18n.locale = str;
            },
        },
        mounted() {



            // // 组件中使用post方法
            // this.axios.post(url, { a: 1, b: 2 })
            //     .then(res => {
            //         // 成功回调
            //     }, res => {
            //         // 错误回调
            //     })
        }
    }
</script>

<style scoped>
    .login {
        width: 100%;
        height: 100%;
        min-width: 1366px;
        background: url(../assets/login_bg.jpg) no-repeat;
        background-size: cover;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }

    .login-pic {
        width: 40%;
        height: calc(100% - 50px);
        background: url(../assets/login_plate.png) no-repeat;
        background-position: 30% 50%;
    }

    .login-form {
        width: 300px;
        height: 380px;
        background: #414d77;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.35);
        border-radius: 4px;
        padding: 0 20px;
    }

    .footer {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #272c4a;
        color: #fff;
        font-size: 16px;
    }

    .logo {
        display: block;
        margin: 10px auto;
    }

    .switch {
        display: flex;
        justify-content: flex-end;
    }

    .line {
        color: #fff;
    }

    .active {
        color: #fff;
    }

    >>>.el-form-item__content {
        margin-left: 0 !important;
    }
</style>