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
        <section>
            <van-tabs v-model="active">
                <van-tab title="标签 1">内容 1</van-tab>
                <van-tab title="标签 2">内容 2</van-tab>
                <van-tab title="标签 3">内容 3</van-tab>
                <van-tab title="标签 4">内容 4</van-tab>
            </van-tabs>
        </section>
    </div>
</template>

<script>
    export default {
        name: "",
        components: {},
        props: [],
        filters: {},
        data() {
            return {
                active: 0
            }
        },
        created() {

        },
        methods: {},
        mounted() {

        },
        watch: {},
        computed: {},
        activated() {

        },
        deactivated() {

        }
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
        }
        .van-tabs--line .van-tabs__wrap{
            background: aquamarine;
        }
    }
</style>