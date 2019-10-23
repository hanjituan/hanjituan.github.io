<template>
    <div class="hello">
<!-- 
        <div class="header">

        </div> -->

        <div class="content">
            <el-calendar v-model="myDate">
                <template slot="dateCell" slot-scope="{date, data}">
                    <div class="full" @click="chooseDate" :class="data.isSelected ? 'is-selected' : ''">
                        {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
                    </div>
                </template>
            </el-calendar>
        </div>

        <div class="demo-image__preview">
            <el-image style="width: 100px; height: 100px" :src="url" :preview-src-list="srcList">
            </el-image>
        </div>


        <el-dialog title="" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <div class="demo-image__lazy">
                <el-image v-for="url in urls" :key="url" :src="url" lazy></el-image>
            </div>
            <template>
                <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
                    <li v-for="i in count" class="infinite-list-item">
                        {{ i }}
                    </li>
                </ul>
            </template>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {
                dialogVisible: false,
                myDate: '',
                msg: 'Welcome to Your Vue.js App',
                count: 0,
                urls: [
                    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
                    'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
                    'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
                    'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
                    'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
                    'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
                    'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
                ],
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                srcList: [
                    'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                    'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
                ]
            }
        },
        methods: {
            load() {
                this.count += 2
            },
            chooseDate() {
                this.dialogVisible = true;
            },
            handleClose(done) {
                this.dialogVisible = false;
            }
        }
    }
</script>

<style scoped>
    .header {
        width: 100%;
        height: 100px;
        border: 1px solid red;
    }

    .is-selected {
        color: #1989FA;
    }






    .demo-image__lazy {
        width: 500px;
        height: 500px;
        margin: 0 auto;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .infinite-list {
        height: 500px;
        width: 500px;
        overflow-y: scroll;
        margin: 0;
        padding: 0;
    }

    .infinite-list-item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        background: #e8f3fe;
        margin: 10px;
        color: #7dbcfc;
    }

    >>>.el-calendar-table .el-calendar-day {
        padding: 0;
    }

    .full {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        display: flex;
        padding-left: 80px;
        align-items: center;
        position: relative;
    }

    .badge {
        position: absolute;
        top: 0;
        right: 0;
    }
</style>