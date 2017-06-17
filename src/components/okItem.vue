<template>
  <div class="todo">
    <span class="item">
      {{ content }}
    </span>
    <span class="pull-right">
      <el-button size="small" type="button" @click="recover">回復</el-button>
    </span>
  </div>
</template>

<script>

export default {
  props: ['name', 'content'],
  methods: {
    recover() {
      this.$emit('recovered', this.content);
    },
  },
};
</script>

<style lang="scss" scoped>
  .todo {
    width: 100%;
    margin-top: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid #eee;
    overflow: hidden;
    text-align: left;
    .item {
      font-size: 20px;
    }
  }
  .pull-right {
    float: right;
  }
</style>
