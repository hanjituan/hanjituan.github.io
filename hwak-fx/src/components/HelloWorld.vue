<template>
    <div class="hello">
        <div>
            <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
                <a-form-item label="Note">
                    <a-input
                        v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]" />
                </a-form-item>
                <a-form-item label="Gender">
                    <a-select v-decorator="[
              'gender',
              { rules: [{ required: true, message: 'Please select your gender!' }] },
            ]" placeholder="Select a option and change input text above" @change="handleSelectChange">
                        <a-select-option value="male">
                            male
                        </a-select-option>
                        <a-select-option value="female">
                            female
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                    <a-button type="primary" html-type="submit">
                        Submit
                    </a-button>
                </a-form-item>
            </a-form>
        </div>
        <div>
            <a-button type="primary">
                Primary
            </a-button>
            <a-button>Default</a-button>
            <a-button type="dashed">
                Dashed
            </a-button>
            <a-button type="danger">
                Danger
            </a-button>
            <a-config-provider :auto-insert-space-in-button="false">
                <a-button type="primary">
                    按钮
                </a-button>
            </a-config-provider>
            <a-button type="primary">
                按钮
            </a-button>
            <a-button type="link">
                Link
            </a-button>
        </div>
        <h1>{{ msg }}</h1>

    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        },
        data() {
            return {
                formLayout: 'horizontal',
                form: this.$form.createForm(this, { name: 'coordinated' }),
            }
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
            handleSelectChange(value) {
                console.log(value);
                this.form.setFieldsValue({
                    note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>