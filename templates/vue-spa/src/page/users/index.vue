<style>

</style>
<template>
  <div>
    <h3>用户列表</h3>
    <ul>
      <li v-for="(list, i) in users" :key="i">{{ list.name }}</li>
    </ul>
  </div>  
</template>
<script>
export default {
  data(){
    return {
      users : [ { name : '奥巴马' }, { name : '特拉普' } ]
    }
  }
}
</script>

