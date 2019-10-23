<template>
    <div class="hello">

        <div @click="save">save</div>


        <div>
            <div style="margin-top:10px;">
                <el-form :rules="model.rules" :model="model" ref="form">
                    <el-table border :data="model.tableData" style="width: 100%;"
                        :default-sort="{prop: 'date', order: 'descending'}">

                        <el-table-column label="要求批次">
                            <template slot-scope="scope">
                                <el-form-item :prop="'tableData.' + scope.$index + '.input'" :rules='model.rules.name'>
                                    <el-input v-model="scope.row.input"></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>

                        <el-table-column label="要求供应商">
                            <template slot-scope="scope">
                                <el-form-item :prop="'tableData.' + scope.$index + '.supplier'"
                                    :rules='model.rules.supplier'>
                                    <el-select v-model="scope.row.supplier" placeholder="请选择要求供应商">
                                    </el-select>
                                </el-form-item>
                            </template>
                        </el-table-column>

                        <el-table-column label="要求商品形态">
                            <template slot-scope="scope">
                                <el-form-item :prop="'tableData.' + scope.$index + '.goodstatus'"
                                    :rules='model.rules.goodstatus'>
                                    <el-select v-model="scope.row.goodstatus" placeholder="请选择商品形态">
                                    </el-select>
                                </el-form-item>
                            </template>
                        </el-table-column>

                        <el-table-column width="180px" label="要求生产日期">
                            <template slot-scope="scope">
                                <el-form-item :prop="'tableData.' + scope.$index + '.date1'" :rules='model.rules.date1'>
                                    <el-date-picker type="date" placeholder="选择日期" v-model="scope.row.date1"
                                        style="width: 100%;">
                                    </el-date-picker>
                                </el-form-item>
                            </template>
                        </el-table-column>

                        <el-table-column label="期待出库数量">
                            <template slot-scope="scope">
                                <el-form-item :prop="'tableData.' + scope.$index + '.name'" :rules='model.rules.name'>
                                    <el-input v-model="scope.row.name"></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>

                        <el-table-column label="test" prop="test">

                        </el-table-column>

                    </el-table>
                </el-form>
            </div>
        </div>

        <template>
            <div class="block">
                <el-slider v-model="value" vertical height="200px"> </el-slider>
            </div>
        </template>

    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
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