<template>
  <div class="row justify-content-center">
    <div class="col-sm-4">
      <div class="card">
        <div class="card-body">
          <!-- <h6 class="card-title ">lukeT says</h6> -->
          <h6 class="comment">{{comment}}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props: ['comment_user_id', 'retro_item_id', 'comment']
}
</script>

<style scoped>
.row {
  margin-top: 10px;
}

.card-title {
  color: #bcbcbc;
}

.card-title, .comment {
  text-align: left
}

.comment {
  text-indent: 20px;
}
</style>
