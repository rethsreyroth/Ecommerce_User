import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import api from '@/API/api'

export const useauthStore = defineStore('auth', () => {
<<<<<<< HEAD
  const token = ref(localStorage.getItem('token') || null)
  const errMassage = ref('');

=======
  let token = ref(localStorage.getItem('token') || null)
  let success = ref(null)
>>>>>>> 62109b6101cc6b2dbea1216e1a6679d8b4217983
  const login = async (data) =>{
    console.log(data);
    try{
      const res =await api.post('/api/login', data);
      console.log(res);
      errMassage.value = res.data.message;
      console.log(errMassage.value);
      
      if(errMassage.value !== 'Incorrect email or password.' ){
        token.value = res.data.data.token;
        localStorage.setItem('token', token.value)
        alert('Login Success')
        return true
      }
      else{
        alert("Incorrect email or password.")
        return false
      }
      
    }catch(err){
      console.error(err);
    }
  }

   const register = async (data) =>{
    console.log(data);
    try{
      let res =await api.post('/api/register' ,data);
      // console.log(res);
      token.value = res.data.data.token;
      localStorage.setItem('token', token.value)
    }catch(err){
      console.error(err);
    }
    
  }
<<<<<<< HEAD
  
  return {login, token, register};
=======

  const register = async (data) =>{
    console.log(data);
    try{
      let res =await api.post('/api/register' ,data);
      success.value = res.status;
      console.log(res);
      token.value = res.data.data.token;
      localStorage.setItem('token', token.value)
    }catch(err){
      console.error(err.response);
    }
    
  }
  return {login, token, register, success};
>>>>>>> 62109b6101cc6b2dbea1216e1a6679d8b4217983
})
