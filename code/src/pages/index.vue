<template>
    <div class="wraper-index">
        <el-container style="height: 100%;">
            <el-container style="height: 100%; overflow: hidden;background-color: #F1F2F7">
                <el-header style="display: flex;justify-content: space-between;align-items: center; font-size: 12px">
                    <img class="logo-pic" src="../assets/logo.png" alt="">
                    <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                            <i class="el-icon-user-solid"></i>
                            <span>admin</span>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="a">个人信息</el-dropdown-item>
                            <el-dropdown-item command="b" divided>退出</el-dropdown-item>
                        </el-dropdown-menu>
                        <span class="drawer-control" @click="drawer = true">
                            <i class="el-icon-s-fold"></i>
                        </span>
                    </el-dropdown>
                </el-header>

                <el-container>
                    <el-aside class="left-menu" width="none">
                        <el-menu :default-active="currentRoute" class="el-menu-vertical-demo" :unique-opened="true"
                            @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                            <template v-for="menu,key in menulist">
                                <el-submenu :index="menu.key">
                                    <template slot="title">
                                        <i :class="menu.icon"></i>
                                        <span slot="title">
                                            {{$t(menu.name)}}
                                        </span>
                                    </template>

                                    <template v-for="item in menu.children">
                                        <el-menu-item-group v-if="!item.children">
                                            <el-menu-item @click="switchRoute(item)" :index="item.key">
                                                {{item.name}}
                                            </el-menu-item>
                                        </el-menu-item-group>

                                        <el-submenu v-else :index="item.key">
                                            <span slot="title">{{item.name}}</span>
                                            <el-menu-item @click="switchRoute(item)" v-for="li in item.children"
                                                :index="li.key" :key="li.key">
                                                {{li.name}}
                                            </el-menu-item>
                                        </el-submenu>
                                    </template>
                                </el-submenu>
                            </template>

                        </el-menu>
                        <div class="bot">
                            <el-switch v-model="isCollapse" active-color="#ddd" inactive-color="#13ce66">
                            </el-switch>
                        </div>
                    </el-aside>
                    <el-main>
                        <el-tabs class="cant-choose" v-model="editableTabsValue" type="border-card" closable
                            @tab-remove="removeTab" @tab-click="tabClicks">
                            <el-tab-pane v-for="(item, index) in editableTabs" :key="item.name" :label="item.title"
                                :name="item.name">
                            </el-tab-pane>
                        </el-tabs>
                        <router-view v-bind:collapse="isCollapse"></router-view>
                    </el-main>
                </el-container>
            </el-container>
        </el-container>

        <el-drawer title="标题" :visible.sync="drawer" size="20%" :direction="direction"
            :before-close="handleCloseDrawer">
            <el-button @click="switchLan" :type="this.$i18n.locale === 'en' ? 'success' : 'primary'">
                {{this.$i18n.locale === 'en' ? '中文' : 'English'}}
            </el-button>
        </el-drawer>
    </div>
</template>

<script>
    export default {
        name: 'index',
        data() {
            return {
                currentRoute: 'dashboard',
                editableTabsValue: 'dashboard',
                editableTabs: [
                    {
                        title: '仪表盘',
                        name: 'dashboard',
                    }
                ],
                isCollapse: false,
                drawer: false,
                direction: 'rtl',
                menulist: [
                    {
                        name: 'message.mainpage',
                        key: '1',
                        icon: 'el-icon-s-home',
                        children: [
                            { name: '仪表盘', key: 'dashboard' },
                            { name: '拓扑', key: 'topology' },
                        ]
                    },
                    {
                        name: 'message.assetManagement',
                        key: '2',
                        icon: 'el-icon-money',
                        children: [
                            { name: '设备资产', key: 'equipmentAssets' },
                            { name: '租户管理', key: 'tentManage' },
                        ],
                    },
                    {
                        name: 'message.config',
                        key: '3',
                        icon: 'el-icon-setting',
                        children: [
                            {
                                name: '系统配置',
                                key: '3-1',
                                children: [
                                    { name: '系统参数', key: '3-1-1' },
                                    { name: 'license管理', key: '3-1-2' },
                                ]
                            },
                            {
                                name: '租户全局配置',
                                key: '3-2',
                                children: [
                                    { name: '系统参数', key: '3-2-1' },
                                    { name: 'license管理', key: '3-2-2' },
                                ]
                            },
                            {
                                name: '设备配置',
                                key: '3-3',
                                children: [
                                    { name: '系统参数', key: '3-3-1' },
                                    { name: 'license管理', key: '3-3-2' },
                                ]
                            },
                        ]
                    },
                    {
                        name: 'message.faultManagement',
                        key: '4',
                        icon: 'el-icon-circle-close',
                        children: [
                            {
                                name: '告警设置',
                                key: '4-1',
                                children: null,
                            },
                            {
                                name: '告警',
                                key: '4-2',
                                children: [
                                    { name: '当前告警', key: '4-2-1' },
                                    { name: '历史告警', key: '4-2-2' },
                                    { name: '通知', key: '4-2-3' },
                                ]
                            },
                            {
                                name: '日志',
                                key: '4-3',
                                children: [
                                    { name: '系统日志', key: '4-3-1' },
                                    { name: '操作日志', key: '4-3-2' },
                                    { name: '安全日志', key: '4-3-3' },
                                ]
                            },
                            {
                                name: 'gRPC协议跟踪',
                                key: '4-4',
                                children: null,
                            },
                        ]
                    },
                    {
                        name: 'message.safetyManagement',
                        key: '5',
                        icon: 'el-icon-bell',
                        children: [
                            { name: '账户管理', key: '5-1' },
                            { name: '角色管理', key: '5-2' },
                        ]
                    },
                    {
                        name: 'message.versionManagement',
                        key: '6',
                        icon: 'el-icon-discover',
                        children: [
                            { name: '设备版本库', key: '6-1' },
                            { name: '设备版本实施策略', key: '6-2' },
                            { name: '系统版本库', key: '6-3' },
                            { name: '系统版本实施策略', key: '6-4' },
                        ]
                    },
                    {
                        name: 'message.album',
                        key: '7',
                        icon: 'el-icon-discover',
                        children: [
                            { name: '相册', key: 'album' },
                            // { name: '设备版本实施策略', key: '6-2' },
                            // { name: '系统版本库', key: '6-3' },
                            // { name: '系统版本实施策略', key: '6-4' },
                        ]
                    }
                ]
            }
        },
        mounted() {

        },
        methods: {
            addTab(targetName, router) {
                let valid = true;
                this.editableTabs.map(item => {
                    if (item.title === targetName) {
                        valid = false;
                    }
                })
                if (valid) {
                    this.editableTabs.push({ title: targetName, name: router, });
                    this.editableTabsValue = router;
                }
            },

            removeTab(targetName) {
                console.log(targetName)
                console.log(this.editableTabs)

                if (this.editableTabs.length == 1) {
                    return false;
                }

                // var arr = [18,45,69,22,7,56];
                // //比方说要删除上述数组中所有的奇数
                // arr = arr.filter(function(v){
                //     return v%2==0;  //只返回偶数
                // });
                // console.log(arr);
                // //输出结果 18,22,56

                this.editableTabs = this.editableTabs.filter(item => {
                    return item.name != targetName;
                })

                console.log(this.editableTabs);


                this.editableTabs.map((item, index) => {
                    if (targetName == item.name) {
                        // delete item;
                        // this.editableTabs.splice()
                    }
                })
                this.editableTabsValue = this.editableTabs[0].name;
                this.$router.push(this.editableTabs[0].name);

                // let tabs = this.editableTabs;
                // let activeName = this.editableTabsValue;
                // if (activeName === targetName) {
                //     tabs.forEach((tab, index) => {
                //         if (tab.name === targetName) {
                //             let nextTab = tabs[index + 1] || tabs[index - 1];
                //             if (nextTab) {
                //                 activeName = nextTab.name;
                //             }
                //         }
                //     });
                // }

                // this.editableTabsValue = activeName;
                // this.editableTabs = tabs.filter(tab => tab.name !== targetName);
            },

            switchRoute(item) {
                console.log(this.editableTabs);
                this.editableTabsValue = item.key;
                this.$router.push(item.key);
                this.addTab(item.name, item.key);
            },

            tabClicks(tab) {
                this.$router.push(tab.name);
                this.currentRoute = tab.name
            },

            switchLan() {
                this.$i18n.locale === 'en' ? this.$i18n.locale = 'zh' : this.$i18n.locale = 'en';
            },

            parentFn(payload) {
                this.message = payload;
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleCommand(command) {
                if (command == 'a') {

                } else if (command == 'b') {
                    this.$router.push('/')
                }
            },
            handleCloseDrawer(done) {
                this.drawer = false;
                // this.$confirm('确认关闭？')
                //     .then(_ => {
                //         done();
                //     })
                //     .catch(_ => { });
            }
        }
    }
</script>

<style scoped>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }

    .wraper-index {
        height: 100%;
        min-width: 1366px;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        /* min-height: 400px; */
    }

    .el-header {
        background-color: #374864;
    }

    .bot {
        position: absolute;
        bottom: 20px;
        left: 20px;
    }

    .cant-choose {
        user-select: none;
    }

    .logo-pic {
        height: 80%;
    }

    .el-dropdown-link {
        color: #24d3e3;
        cursor: pointer;
    }

    .left-menu {
        background-color: #fff;
        position: relative;
        overflow-x: auto;
        height: 100%;
    }

    .drawer-control {
        color: #fff;
        padding: 0 10px;
        font-size: 20px;
    }

    .wraper-index .el-dropdown {
        display: flex;
    }

    >>>.el-drawer__body {
        padding: 10px 20px;
    }

    .lang {
        padding: 10px 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        user-select: none;
    }
</style>