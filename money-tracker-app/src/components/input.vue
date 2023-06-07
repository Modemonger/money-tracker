<script>
import { useNotesStore } from '../stores/notesStore';
import { defineComponent } from 'vue';
import { useSessionStore } from '../stores/sessionStore';
import axios from 'axios';

export default defineComponent({
    data: () => ({
        notes: useNotesStore(),
        spent: '',
        gained: '',
        date: new Date().toISOString().substr(0, 10),
        note: '',
        error: '',
        sessionStore: useSessionStore(),
    }),
    methods: {
        addNote() {
            if(this.date) {
                this.notes.addNote(this.spent, this.gained, this.date, this.note);
                this.clearForm();
            } else {
                console.log("Please fill out the required fields.", this.date)
            }
        },
        clearForm() {
            this.spent = this.gained = '';
            this.note = '';
        }
    },
})
</script>

<template>
    <div class="input-wrapper">
        <h2>Add a Receipt</h2>
        <form class="note-form">
            <label for="spent">How much did you spent?</label>
            <input v-model="this.spent" type="number" name="spent" id="spent">
            <label for="gained">How much did you gain?</label>
            <input v-model="this.gained" type="number" name="gained" id="gained">
            <label for="date">What day was this on?<span class="required" title="Required">*</span></label>
            <input v-model="this.date" type="date" name="date" id="date">
            <label for="note">Anything to say for yourself?</label>
            <textarea v-model="this.note" type="textarea" name="note" id="note"></textarea>
            <button @click.prevent="this.addNote()" type="submit">Submit</button>
        </form>
    </div>
</template>

<style scoped>
*{
    width: 100%;
}
.input-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 18rem;
    margin: auto;
    overflow-x: hidden;
}
form {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    z-index: 2;
}
form * {
    width: 80%;
    height: 2rem;
    margin: 0 0 1rem;
    text-align: center;
    font-size: 16px;
    border: 1px solid #DC052D;
    border-radius: 5px;
}
form label {
    height: fit-content;
    margin: 0;
    border: none;
    background:  linear-gradient(45deg, #1a1a1a, #1a1a1a00);
    text-align: center;
}
.required {
    color: #DC052D;
    border: none;
    font-size: 20px;
}
button{
    width: 100%;
    widows: 12rem;
    height: 3rem;
    margin: 3rem 0 0;
    text-align: center;
}
textarea:focus, input:focus{
    outline: none;
}
</style>
