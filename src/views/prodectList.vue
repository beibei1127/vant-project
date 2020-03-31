<!--
* author: huoxibin
* created: 2020/3/28
* describe:
-->
<template>
    <div class="box">
        <header>
            我的探访
        </header>


        <div class="nav">
            <p :class="getActiveCls(0)" @click="changeTab(0)">全部</p>
            <p :class="getActiveCls(1)" @click="changeTab(1)">奶粉</p>
            <p :class="getActiveCls(2)" @click="changeTab(2)">图书</p>

        </div>


        <mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit">
            <ul id="dataList" class="data-list">
                <li v-for="pd in dataList" :key="pd.id" class="list-data">
                    <div class="img">
                        <img src="../assets/ju.jpg"/>
                    </div>
                    <div class="jieShao">
                        <div class="title">
                            <span>电影：</span>
                            {{pd.name}}
                        </div>
                        <div class="zong">
                            <span>简介：</span>
                            {{pd.jianjie}}
                        </div>
                    </div>
                </li>
            </ul>
        </mescroll-vue>



    </div>
</template>

<script>

    // 引入mescroll的vue组件
    import MescrollVue from 'mescroll.js/mescroll.vue'

    export default {
        name: "",
        components: {MescrollVue},
        props: [],
        filters: {},
        data() {
            return {
                mescrollUp: {
                    callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page, mescroll) { getListData(page); }
                    page: {
                        num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
                        size: 10 // 每页数据的数量
                    },
                    noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
                    toTop: {
                        src: 'http://img.58cdn.com.cn/olympia/img/common/top_btn.png' // 回到顶部按钮的图片路径,支持网络图
                    },
                    empty: {
                        // 列表第一页无任何数据时,显示的空提示布局; 需配置warpId才生效;
                        warpId: 'dataList', // 父布局的id;
                        icon: 'https://img.alicdn.com/tfs/TB1vJ_.vTqWBKNjSZFxXXcpLpXa-330-330.png', // 图标,支持网络图
                        tip: '暂无相关数据~', // 提示
                        // btntext: '去逛逛 >', // 按钮,默认""
                        // btnClick () { // 点击按钮的回调,默认null
                        //   alert('点击了按钮,具体逻辑自行实现')
                        // }
                    },
                    htmlNodata: '<p class="upwarp-nodata">-- 无数据 --</p>', // 无数据的布局
                    lazyLoad: {
                        use: true // 是否开启懒加载,默认false
                    }
                },
                dataList: [], // 列表数据
                pdType:0
            }
        },
        created() {

        },
        methods: {
            mescrollInit (mescroll) {
                this.mescroll = mescroll
            },
            upCallback (page, mescroll) {
                // 模拟联网
                this.getListDataFromNet( this.pdType,page.num, page.size, (arr) => {
                    mescroll.endSuccess(arr.length);
                    if (page.num === 1) this.dataList = [];
                    this.dataList = this.dataList.concat(arr);
                    // 数据渲染成功后,隐藏下拉刷新的状态
                    this.$nextTick(() => {
                        mescroll.endSuccess(arr.length)
                    })
                }, () => {
                    // 联网异常,隐藏上拉和下拉的加载进度
                    mescroll.endErr()
                })
            },

            getListDataFromNet (pdType,pageNum, pageSize, successCallback, errorCallback) {
                console.log(pageNum, pageSize);
                // 延时一秒,模拟联网
                setTimeout(() => {

                    var listData = [
                        {'name':'huo1','jianjie':'sjajskj'},
                        {'name':'huo2','jianjie':'sjajskj'},
                        {'name':'huo3','jianjie':'sjajskj'},
                        {'name':'huo4','jianjie':'sjajskj'},
                        {'name':'huo5','jianjie':'sjajskj'},
                        {'name':'huo6','jianjie':'sjajskj'},
                        {'name':'huo7','jianjie':'sjajskj'},
                        {'name':'huo8','jianjie':'sjajskj'},
                        {'name':'huo9','jianjie':'sjajskj'},
                        {'name':'huo10','jianjie':'sjajskj'}
                    ];

                    if (pdType === 0) {
                        if(pageNum == 2){
                            listData = [];
                        };
                    }else if(pdType == 1){

                    }else if(pdType ==2){
                        listData = [];
                    }

                    successCallback(listData)


                    // 回调
                    // axios.get("xxxxxx", {
                    //   params: {
                    //     num: page.num, //页码
                    //     size: page.size //每页长度
                    //   }
                    // }).then((response)=> {
                    //  listData.push(response.data)
                    //   successCallback(listData)
                    // }).catch((e)=> {
                    //   //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
                    //   errorCallback&&errorCallback()
                    // })
                }, 1000)
            },


            // 选中状态的样式
            getActiveCls (type) {
                return this.pdType === type ? 'active' : ''
            },
            // 切换菜单
            changeTab (type) {
                if (this.pdType !== type) {
                    this.pdType = type;
                    this.dataList = [];// 在这里手动置空列表,可显示加载中的请求进度
                    this.mescroll.resetUpScroll(); // 刷新列表数据
                }
            },
        },
        mounted() {

        },
        watch: {},
        computed: {}
    }
</script>

<style lang="scss" scoped>
    /*通过fixed固定mescroll的高度*/
    .mescroll {
        position: fixed;
        top: 80px;
        bottom: 0;
        height: auto;
    }
    .box{
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
        header{
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #fd9540;
            font-size: 14px;
            color: #fff;
        }

        .nav {
            height: 40px;
            width: 100%;
            position: fixed;
            top: 40px;
            left: 0;
            z-index: 1000;
            display: flex;
            justify-content: space-between;
            p{
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 14px;
                margin: 0 20px;
            }
            .active {
                border-bottom: 1px solid #FF6990;
                color: #FF6990;
            }
        }



        .list-data{
            display: flex;
            height: auto;
            border-bottom: 1px solid #e3e3e3;
            .img{
                width: 150px;
                height: 80px;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .jieShao{
                font-size: 14px;
                flex: 1;
                padding-left: 30px;
                .title{
                    height: 30px;
                }
                .zong{
                    height: 50px;
                }
            }
        }

    }
</style>