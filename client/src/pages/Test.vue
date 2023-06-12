<template>
  <div class = "container">
      <ArticlesTables></ArticlesTables>
  </div>
</template>

<script>
import ArticlesTables from '@/components/Articles/ArticlesTables'

export default {
    components: {
        ArticlesTables
    },
};
</script>

<style scoped>
  .container{
    min-height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>