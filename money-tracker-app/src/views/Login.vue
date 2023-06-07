<script>
import { defineComponent } from "vue";
import pinia from '../stores/store';
import { useSessionStore } from "../stores/sessionStore";
import axios from 'axios';

export default defineComponent({
    data: () => ({
        sessionStore: useSessionStore(pinia),
        username: '',
        password: '',
        errors: ''
    }),
    methods: {
        handleSubmit() {
            if(this.username && this.password){
                this.sessionStore.setExpireToken();
                axios.post(`${import.meta.env.VITE_API_PREFIX}/api/user/signin`, 
                {
                    username: this.username, 
                    password: this.password, 
                })
                .then(response => response.data)
                .then(data => {
                    window.localStorage.setItem('access_token', data.token);
                    console.log(data);
                    this.sessionStore.authenticate(
                        data.username, 
                        this.password,
                        data.startingBudget,
                        data.token,
                        data._id,
                    );
                    this.$router.push('/add-note');
                })
                .catch(err => {
                    console.log(err.message, 'error');
                    this.errors = err.message;
                })
            } else {
                this.errors = 'Please fill out the form';
            }
        },
    }
})
</script>

<template>
    <div class="login-wrapper">
        <div class="title">
            <h2>Let's keep track :)</h2>
        </div>
        <form>
            <p v-if="this.errors" class="errors">{{ this.errors }}</p>
            <label for="username">Username</label>
            <input v-model="username" type="text" name="username" id="username">
            <label for="password">Password</label>
            <input v-model="password" type="password" name="password" id="password">
            <button class="submit" @click.prevent="this.handleSubmit()" type="submit">Login</button>
        </form>
        <router-link to="/signup">Sign in to begin tracking</router-link>
    </div>
</template>

<style>
.login-wrapper {
    width: fit-content;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
}
form {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 14rem;
    z-index: 2;
}
form * {
    width: 80%;
    height: 1.5rem;
    margin: 0 0 1rem;
    text-align: center;
    font-size: 16px;
    border: 1px solid #DC052D;
    border-radius: 5px;
}
form label {
    margin: 0;
    border: none;
    background:  linear-gradient(45deg, #1a1a1a, #1a1a1a00);   
}
form .errors{
    width: fit-content;
    color: #DC052D;
    border: none;
}
a {
    font-size: 14px;
    font-weight: bold;
    text-decoration: none;
    color: #DC052D;
}
.submit {
    width: 100%;
    height: 3rem;
}
</style>