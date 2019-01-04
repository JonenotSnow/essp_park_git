
<template>
  <div class="essp-aside-right-cont">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'EsspAsideRight',
  props:{},
  components:{},
  data () {
    return {
      msg: 'EsspAsideRight'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .essp-aside-right-cont{
        float: left;
        margin-left: 20px;
    }
</style>
