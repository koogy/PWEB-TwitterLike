<template>
  <form @submit.prevent="submit">
            <div>
          <input type="text" name ="username" id="username" placeholder="username" v-model="form.username">
          <input type="text" name ="password" id="password" placeholder="password" v-model="form.password">
          <button type ="submit">Sign In</button>
      </div>


</form>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SignIn',
  data (){
      return {
          form:{
              username:'',
              password:''
          },
      }
  },
  methods: {
     async submit(){
        console.log('submitted')
     
        axios.post('/signIn',this.form)
        .then(res => {
            console.log(res.data)
            if(res.status == 200){
                console.log("logged in")
                this.$emit('update',res.data)
            }else {
                 this.$emit('update',false)
            }
        })
       
      }
  }
}
</script>
