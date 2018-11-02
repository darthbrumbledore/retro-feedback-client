<template>

  <div>
    <button type="button" class="btn btn-info" @click="endSprint" v-show="ongoing">End Sprint</button>
    <h1 v-for="sprint in retros.sprintDetails">{{sprint.sprint_name}}</h1>

    <form v-show="ongoing">
      <textarea ref="newMessage" cols="65" rows="4" placeholder="leave a thought about the current sprint..." @keydown.enter.prevent="addRetroItem"></textarea>
    </form>

    <hr>

    <div v-for="retroItem in retros.retroItems" :key="retroItem.id">
      <retro-item :id="retroItem.id" :message="retroItem.message" :created_date="retroItem.created_date" :user_id="retroItem.user_id" :likes="retroItem.likes"></retro-item>
    </div>

  </div>

</template>

<script>
import axios from 'Axios'
import RetroItem from './RetroItem'
export default {
  name: 'Sprint',
  data() {
    return {
      retros: {},
      ongoing: true
    }
  },
  mounted() {
    var ref = this;
    axios.get(`http://localhost:3000/sprint/${ref.$route.params.id}`).then(function(response) {
      ref.retros = response.data
      console.log(ref.retros)
      if (response.data.sprintDetails[0].end_date != null) {
        ref.ongoing = false;
      }
    })
  },
  components: {
    'retro-item': RetroItem
  },
  methods: {
    addRetroItem() {
      var ref = this;
      let newMessage = this.$refs.newMessage.value;
      let sprintId = ref.$route.params.id;
      console.log(this.$refs.newMessage.value + 'in sprint ' + sprintId)
      this.$refs.newMessage.value = ""
      axios.post('http://localhost:3000/retro-items', {
        message: newMessage,
        created_date: Date.now(),
        user_id: 1,
        sprint_id: sprintId
      }).then(function(response) {
        console.log(response)
        ref.retros.retroItems.push({message: newMessage, created_date: Date.now(), user_id: 1, sprint_id: sprintId})
      }).catch(function(error) {
        console.log(error)
      })
    },
    endSprint() {
      var ref = this;
      ref.ongoing = false;
      console.log('ending this sprint');
      axios.post(`http://localhost:3000/sprint/${ref.$route.params.id}`, {

      }).then(function(response) {

      }).catch(function(error) {
        console.log(error)
      })

    }
  }
}

</script>

<style scoped>
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
.btn {
  background-color: #e8573f;
}
</style>
