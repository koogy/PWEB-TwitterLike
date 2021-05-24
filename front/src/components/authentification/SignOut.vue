<template>
  <form @submit.prevent="submit">
          <button type ="submit">X</button>
    </form>
</template>

<script>
import axios from 'axios'
export default {
  name: 'SignOut',
  data (){
      return {
      
      }
  },
  methods: {
     async submit(){
          console.log('submitted')
          axios.post('/signOut')
          this.$emit('update',false)
      }
  }
}
</script>
