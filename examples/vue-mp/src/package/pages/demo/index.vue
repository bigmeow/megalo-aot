<template>
  <div class="container">
    <Child>
      hello world!!!
      <Button>
        some text
        <ChildInSlot></ChildInSlot>
      </Button>
    </Child>
    !!!
    <img src="../../images/megalobox.jpeg" alt="">
  </div>
</template>

<script>
  import Child from './Child'
  import ChildInSlot from './ChildInSlot.vue'
  import Button from '../../../components/Button.vue'

  export default {
    components: {
      Child,
      ChildInSlot,
      Button,
    },
  }
</script>

<style lang="less" scoped>
  .container {
    color: blue;
  }
</style>
