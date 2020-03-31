<!--
* author: huoxibin
* created: 2020/3/28
* describe: 
-->
<template>
    <div class="">
            <van-form ref="form" @submit="onSubmit" :model="formData" colon error-message-align="right">

                <van-field v-model="formData.text" label="文本" :rules="[{ required: true, message: '请填写' }]"/>

                <van-field v-model="formData.tel" type="tel" label="手机号" :rules="[{ required: true, message: '请填写' }]"/>


                <van-field name="radio" label="单选框" :rules="[{ required: true, message: '请填写' }]">
                    <template #input>
                        <van-radio-group v-model="formData.sex" direction="horizontal">
                            <van-radio name='1' > 男 </van-radio>
                            <van-radio name='2'> 女 </van-radio>
                        </van-radio-group>
                    </template>
                </van-field>

                <van-field
                        readonly
                        clickable
                        name="picker"
                        :value="formData.value"
                        label="选择器"
                        placeholder="点击选择城市"
                        @click="showPicker = true"
                        :rules="[{ required: true, message: '请填写' }]"
                />
                <van-popup v-model="showPicker" position="bottom">
                    <van-picker
                            show-toolbar
                            :columns="columns"
                            @confirm="onConfirm"
                            @cancel="showPicker = false"
                    />
                </van-popup>


                <van-field
                        readonly
                        clickable
                        name="area"
                        :value="formData.areaValue"
                        label="地区选择"
                        placeholder="点击选择省市区"
                        @click="showArea = true"
                        :rules="[{ required: true, message: '请填写' }]"
                />
                <van-popup v-model="showArea" position="bottom">
                    <van-area
                            :area-list="areaList"
                            @confirm="onConfirmArea"
                            @cancel="showArea = false"
                    />
                </van-popup>


                <van-field name="switch" label="开关" :rules="[{ required: true, message: '请填写' }]">
                    <template #input>
                        <van-switch v-model="formData.switchChecked" size="20" />
                    </template>
                </van-field>

                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">
                        提交
                    </van-button>
                </div>
            </van-form>
    </div>
</template>

<script>

    import areaList from '@/api/area';

    export default {
        name: "",
        components: {},
        props: {
            formData: {
                type: Object,
                required: true
            }
        },
        filters: {},
        data() {
            return {
                //性别选择器
                columns: [
                    {"keyId":1,"text":"测试1"},
                    {"keyId":2,"text":"测试2"},
                    {"keyId":3,"text":"测试3"},
                    {"keyId":4,"text":"测试4"},
                    {"keyId":5,"text":"测试5"},
                    {"keyId":6,"text":"测试6"}
                ],
                showPicker: false,
                //地区选择器
                showArea: false,
                areaList: areaList, // 数据格式见 Area 组件文档
                //城市一级
                valueCity:'',
                //城市三级联动
                provinceId:'',
                cityId:'',
                countyId:''
            }
        },
        created() {
            //picker回显
            let keyId = this.formData.value;
            this.valueCity = keyId;
            for(let i=0;i<this.columns.length;i++){
                if(keyId == this.columns[i].keyId){
                    this.formData.value = this.columns[i].text;
                }
            };
            //switch回显
            let switchChecked = this.formData.switchChecked;
            if(switchChecked == 1){
                this.formData.switchChecked = true
            }else {
                this.formData.switchChecked = false
            };
            //三级城市回显
            this.formData.areaValue = this.formData.provinceIdName +   this.formData.cityIdName + this.formData.countyIdName;
            this.provinceId = this.formData.provinceId;
            this.cityId = this.formData.cityId;
            this.countyId = this.formData.countyId;
        },
        methods: {
            onConfirmArea(values) {
                console.log(values);
                this.formData.areaValue = values.map(item => item.name).join('');
                this.provinceId =  values.map(item => item.code)[0];
                this.cityId =  values.map(item => item.code)[1];
                this.countyId =  values.map(item => item.code)[2];
                this.showArea = false;
            },

            onConfirm(value) {
                //此时返回的value就是个对象了
                var keyId = value.keyId;
                var text= value.text;

                this.formData.value = text;
                this.valueCity = keyId;

                this.showPicker = false;
            },


            onSubmit(values) {
               let params = {
                    text: this.formData.text,
                    tel: this.formData.tel,
                    cityIdLian: this.valueCity,
                    sex:this.formData.sex,
                    switchChecked:this.formData.switchChecked == true ? 1 : 0,
                    provinceId:this.provinceId,
                    cityId:this.cityId,
                    countyId:this.countyId
               };
                this.$emit("sendMessage", params);
            },
        },
        mounted() {

        },
        watch: {},
        computed: {

        }
    }
</script>

<style lang="scss" scoped>

</style>