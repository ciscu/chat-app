<template>
  <div class="chat container">
    <h2 class="center teal-text">Chat Room</h2>
    <div class="card">
      <div class="card-content">
        <ul class="messages" v-chat-scroll>
          <li v-for="message in messages" :key="message.id">
            <span class="teal-text">{{ message.name }}</span>
            <span class="grey-text text-darken-3">{{ message.content }}</span>
            <span class="grey-text time">{{ message.timestamp }}</span>
          </li>
        </ul>
      </div>
      <div class="card-action">
        <NewMessage :name="name" :socket="socket"/>
      </div>
    </div>
  </div>
</template>

<script>
import NewMessage from '@/components/NewMessage'
import db from '@/firebase/init'
import moment from 'moment'

export default {
  name: 'Chat',
  props: ['name'],
  components: {
    NewMessage
  },
  data () {
    return {
      messages: [],
      socket: null
    }
  },
  methods: {

  },
  created(){
    this.socket = io.connect('http://localhost:3000')
    if (this.socket) {
        fetch('http://localhost:3000/get_chats')
          .then(response => response.json())
          .then(data => {
            data.chats.forEach(chat => this.messages.push(chat))
            })
          
          
        this.socket.on('chat', data => {
          this.messages.push({
          id: data.id,
          name: data.name,
          content: data.content,
          timestamp: moment(data.timestamp).format('lll')
        })
      })
    }    

  }
}
</script>

<style>
.chat h2{
  font-size: 2.6em;
  margin-bottom: 40px;
}
.chat span{
  font-size: 1.4em;
}
.chat .time {
  display: block;
  font-size: 0.8em;
}
.messages {
  max-height: 400px;
  overflow: auto;
}
.messages::-webkit-scrollbar{
  width: 3px;
}
.messages::-webkit-scrollbar-track {
  background: #ddd;
}
.messages::-webkit-scrollbar-thumb{
  background: #aaa;
}
</style>
