<template>
<div class="container">
  <h1>Sprints</h1>
  <button class="btn btn-primary" @click="newSprintClick">Create New Sprint</button>
  <div class="newSprint" v-show="newSprint">
    <input id="sprintName" ref="sprintName" type="text" placeholder="Sprint name..." @keyup.enter="createSprint" />
  </div>
  <hr>
  <ul>
    <div class="retros" v-for="sprint in sprints" :key="sprint.id">
      <p><a v-bind:href="'#/sprint/' + sprint.id" v-bind:value="sprint.id">{{sprint.sprint_name}}</a></p>
    </div>
  </ul>
</div>

</template>

<script>
import axios from 'Axios'
export default {
  name: 'Home',
  data () {
    return {
      sprints: {},
      newSprint: false
    }
  },
  mounted() {
    var ref = this;
    axios.get('http://localhost:3000/').then(function(response) {
      ref.sprints = response.data
      console.log(response.data)
    })
  },
  methods: {
    createSprint() {
      var ref = this;
      let sprintName = this.$refs.sprintName.value;
      let obj = {sprint_name: sprintName}
      this.$refs.sprintName.value = "";
      console.log(sprintName);
      ref.newSprint = false;
      axios.post('http://localhost:3000/sprint', {
        sprint_name: sprintName
      }).then(function(response) {
        ref.sprints.push(obj)
        console.log(ref.sprints)
      })
    },
    newSprintClick() {
      var ref = this;
      ref.newSprint = true;
      console.log(this.$refs.sprintName);
      this.$nextTick(function() {
        this.$refs.sprintName.focus();
      });
      // this.$refs.sprintName.$el.focus()
      // document.getElementById("sprintName").focus()
    }
  }
}

</script>

<style scoped>
.btn {
  background-color: #5b6982;
}

.newSprint {
  margin-top: 10px;
}

</style>
