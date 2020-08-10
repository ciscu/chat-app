<template>
  <div class="new-message">
    <form @submit.prevent="addMessage">
      <label for="new-message">New Message (enter to add):  </label>
      <input type="text" name="new-message" v-model="newMessage">
      <p class="red-text" v-if="feedback">{{feedback}}</p>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'NewMessage',
  props: ['name', 'socket'],
  data () {
    return {
      newMessage: null,
      feedback: null,
      timestamp: Date.now()
    }
  },
  methods: {
    addMessage(){
      if(this.newMessage){
        this.socket.emit('chat', {
          content: this.newMessage,
          name: this.name,
          timestamp:  Date.now()
        })
        this.newMessage = null
        this.feedback = null
      } else {
        this.feedback = 'You must enter a message in order to send one.'
      }
    }
  },
  created() {
    console.log(this.socket)
  }
}
</script>

<style>
</style>
