<!--
* author: huoxibin
* created: 2020/3/27
* describe: 
-->
<template>
    <div class="conent">
        <header>
            详情
        </header>

        <div class="conentBody">
            <form-one ref="personForm" :formData="formData" @sendMessage="getMeaaage"></form-one>
        </div>


    </div>
</template>

<script>

    import formOne from "@/components/formOne.vue";


    export default {
        name: "detail",
        components: {
            formOne
        },
        data() {
            return {
                formData:{
                    text:'',
                    tel:'',
                    value:'',
                    sex:'',
                    switchChecked:'',
                    provinceId:'',
                    provinceIdName:'',
                    cityId:'',
                    cityIdName:'',
                    countyId:'',
                    countyIdName:'',
                },
                personInfo:{}
            }
        },
        created() {
            this.getData();
        },
        methods: {
            getData(){
                this.formData= {
                    text:'huoxibin',
                    tel:'18301567416',
                    value:5,
                    sex:'1',
                    switchChecked:1,
                    provinceId:130000,
                    provinceIdName:'河北省',
                    cityId:130400,
                    cityIdName:'邯郸市',
                    countyId:130430,
                    countyIdName:'邱县',
                }
            },
            getMeaaage(data){
                console.log(data);
               this.personInfo = data;
            },

        },
        mounted() {

        },
        watch: {},
        computed: {}
    }
</script>

<style lang="scss" scoped>

    .conent{

        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;

        header{
            width: 100%;
            height: 40px;
            background: #e3e3e3;
            text-align: center;
            line-height: 40px;
            font-size: 14px;
            z-index: 100;
            position: fixed;
            top: 0;
            left: 0;
        };

        .conentBody{
           margin-top: 40px;
        }
    }
</style>