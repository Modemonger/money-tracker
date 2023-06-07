<script>
import { defineComponent } from 'vue';
import { useNotesStore } from '../stores/notesStore';
import { useSessionStore } from '../stores/sessionStore';
import axios from 'axios';

export default defineComponent({
    data: () => ({
        sessionStore: useSessionStore(),
        notesStore: useNotesStore(),
    }),
    computed: {
        total() {
            return Math.round((Number(this.sessionStore.session.startingAmount) + Number(this.notesStore.getTotal)) * 100) / 100 || '';
        },
    },
    methods: {
        handleDelete() {
            if(this.sessionStore.isAuthenticated){
                axios.delete(`${import.meta.env.VITE_API_PREFIX}/api/user/delete-user/${this.sessionStore.session.id}`, 
                {headers: {authorization: 'Bearer '+this.sessionStore.session.accessToken}})
                .then((response) => {
                    console.log(response);
                    this.sessionStore.clearLocal();
                    this.$router.push('/signup');
                })
                .catch(err => console.log(err))
            }
            else {
                console.log('User is not authorized');
            }
        }
    }
})
</script>

<template>
    <div class="profile-wrapper">
        <div class="user-info">
            <h2 class="username">Username: {{ sessionStore.session.username }}</h2>
            <h2 class="budget">Starting budget: {{ Number(sessionStore.session.startingAmount).toFixed(2) }}</h2>
            <h2 class="current">Current total: {{ Number(total).toFixed(2) }}</h2>
            <h2 class="note-total">Your total notes: {{ notesStore.notes?.length || 0 }}</h2>
        </div>
        <div class="user-controls">
            <a href="#" target="_blank">Change username</a>
            <a href="#" target="_blank">Change password</a>
            <button @click="handleDelete" class="delete">Delete account</button>
        </div>
    </div>
</template>

<style>
.profile-wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    z-index: 2;
}
.profile-wrapper .user-info{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.profile-wrapper .user-controls{
    display: flex;
    flex-direction: column;
    align-items: center;   
}
.profile-wrapper .user-controls *{
    font-size: 18px;
    margin: .5rem 0; 
}
@media (min-width: 850px) {
    .profile-wrapper{
        flex-direction: row;
    }
    .profile-wrapper .user-info{
        align-items: start;
    }
    .profile-wrapper .user-controls{
        align-items: start;   
    }
}
</style>