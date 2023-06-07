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
        budget: '',
        errors: '',
    }),
    methods: {
        handleSubmit() {
            if(!!this.username && !!this.password && !!this.budget) {
                axios.post(`${import.meta.env.VITE_API_PREFIX}/api/user/signup`, 
                {
                    username: this.username, 
                    password: this.password, 
                    startingBudget: this.budget
                })
                .then(response => response.data)
                .then(data => {
                    window.localStorage.setItem('access_token', data.token);
                    console.log(data);
                    this.sessionStore.authenticate(
                        this.username, 
                        this.password, 
                        this.budget,
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
                console.log('Please fill out the full form');
                this.errors = 'Please fill out the full form';
            }
        },
    }
})
</script>

<template>
    <div class="signin-wrapper">
        <div class="title">
            <h2>Let's start keeping track :)</h2>
        </div>
        <form>
            <p v-if="this.errors" class="errors">{{ this.errors }}</p>
            <label for="username">Username</label>
            <input v-model="username" type="text" name="username" id="username">
            <label for="password">Password</label>
            <input v-model="password" type="password" name="password" id="password">
            <label for="budget">How much do you have</label>
            <input v-model="budget" type="float" name="budget" id="budget">
            <button class="submit" @click.prevent="this.handleSubmit()" type="submit">Signup</button>
        </form>
    </div>
</template>

<style>
.signin-wrapper {
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
.submit {
    width: 100%;
    height: 3rem;
}
</style>