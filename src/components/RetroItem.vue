<template>
<div class="retro">
  <!-- <h1>Retro #{{id}}</h1> -->
  <div class="row justify-content-center">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <!-- <h5 class="card-title"><i class="far fa-user"></i>lukeT</h5> -->
        <h6 class="card-subtitle mb-2 text-muted">{{moment(created_date).calendar()}}</h6>
        <p class="card-text">{{message}}</p>
      </div>
      <div class="row justify-content-center icons">
        <span class="badge badge-pill badge-success likes">{{itemLikes}}</span><i class="far fa-thumbs-up" @click="like"></i><i class="far fa-comment" @click="comment"></i>
        <!-- <i class="far fa-edit" @click="edit"></i> -->
      </div>
    </div>
  </div>
</div>
<div class="row justify-content-center" v-show="commenting">
  <textarea cols=35 rows=4 ref="newComment" placeholder="leave a comment..." @keydown.enter.prevent="addRetroComment"></textarea>
</div>
<div v-for="comment in comments" :key="comment.comment_id">
  <comment :comment_user_id="comment.user_id" :comment="comment.comment" :retro_item_id="comment.comment_retro_id" ></comment>
<!-- {{comment}} -->
</div>
</div>
</div>
</template>

<script>
import axios from 'Axios'
import Comment from './Comment'
export default {
  name: 'RetroItem',
  data() {
    return {
      commenting: false,
      comments: {},
      itemLikes: 0
    }
  },
  props: ['id', 'message', 'created_date', 'user_id', 'likes'],
  methods: {
    comment() {
      var ref = this;
      console.log("retro_id: " + ref.id + " retro_message: " + ref.message)
      ref.commenting = true;
      console.log('making a comment');
    },
    addRetroComment() {
      var ref = this;
      let commentMessage = this.$refs.newComment.value;
      console.log(commentMessage + " " +  ref.id);
      this.$refs.newComment.value = "";
      ref.commenting = false;
      axios.post('http://localhost:3000/comment', {
        comment_message: commentMessage,
        retro_item_id: ref.id,
        user_id: 1 //change this later to be dynamic
      }).then(function(response) {
        console.log(commentMessage)
        ref.comments.push({comment: commentMessage, retro_item_id: ref.id, user_id: 1})

        console.log(response)
      })

    },
    edit() {
      console.log('editing a retro item')
    },
    like() {
      var ref = this;
      ref.itemLikes++
      console.log('you like this')
      axios.post('http://localhost:3000/retro-item-likes', {
        retro_item_id: ref.id
      }).then(function(response) {
        console.log('liked an item')
      })
    }
  },
  computed: {

  },
  components: {
    'comment': Comment
  },
  mounted() {
    var ref = this;
    // this.likes = ref.itemLikes;
    ref.itemLikes = this.likes;
    // console.log(this.id.length)

    // console.log(this.id)
    axios.post(`http://localhost:3000/comments`, {
      retro_id: this.id
    }).then(function(response) {
      // console.log('getting comments')
      console.log("this is a comment: " + response.data)
      // ref.comments.push(response.data);
      ref.comments = response.data
    })
  }
}
</script>

<style scoped>
.retro {
  margin-bottom: 10px;
}

.row {
  margin: 0 auto;
}

.far {
  font-size: 1.5em;
  padding: 5px;
  color: #778eb1;
}

.icons {
  padding-bottom: 10px;
}

.likes {
  position: relative;
  left: 35px;
  top: 20px;
  height: 18px;
  background-color: #778eb1;
}

textarea {
  margin-top: 10px;
  outline: none;
  resize: none;
  border: 1px solid #BDD5D3;
  padding: 10px;
  font-size: 1.1em;
}
textarea:hover {
  background-color: #eaeaea
}



</style>
