<template>
    <div class="hello">
        <div @click="save">租户管理</div>
        <template>
            <div class="block">
                <el-slider v-model="value" vertical height="200px"> </el-slider>
            </div>
        </template>

    </div>
</template>

<script>
    export default {
        name: 'tentManage',
        data() {
            return {
                value: 0,
                model: {
                    rules: {
                        name: { type: "string", required: true, message: "必填字段name", trigger: "change" },
                        input: { type: "string", required: true, message: "必填字段", trigger: "change" },
                        supplier: { type: "string", required: true, message: "必填字段", trigger: "change" },
                        goodstatus: { type: "string", required: true, message: "必填字段", trigger: "change" },
                        date1: { required: true, message: "必填字段", trigger: "change" },
                    },
                    tableData: [
                        {
                            input: "",
                            name: "",
                            supplier: "",
                            goodstatus: "",
                            test: 'test'
                        },
                        {
                            input: "",
                            name: "",
                            supplier: "",
                            goodstatus: "",
                            test: 'test'
                        }
                    ]
                }
            }
        },
        methods: {
            save() {

                this.$refs["form"].validate((valid, model) => {
                    console.log(valid);
                    console.log(model);
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>