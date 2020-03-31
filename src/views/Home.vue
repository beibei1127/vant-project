<template>
  <div class="home">
     <div>
         home页面
     </div>
      <div>
          <router-link to="/about">详情</router-link>
      </div>
      <div>
          <router-link to="/login">登录</router-link>
      </div>
      <div>
          <router-link to="/prodectList">列表页面</router-link>
      </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {

  }
}
</script>
