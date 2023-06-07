import { defineStore } from 'pinia';
import storage from 'localstorage-slim';
import axios from 'axios';
import { useSessionStore } from './sessionStore';

type Note = {
    spent: Number,
    gained: Number,
    total: Number,
    date: Date,
    note: String,
    id: Number,
}

export const useNotesStore = defineStore('notes', {
    state: () => {
        const notes: Note[] = [];
        const nextId: Number = notes[notes.length-1]?.id || 0;

        return {
            notes: notes || [],
            nextId: nextId,
            sessionStore: useSessionStore(),
        }
    },
    actions: {
        setLocal() {
            storage.set('receipts', this.notes);
        },
        addNote(spent: number, gained: number, date, note) {
            const total = gained - spent;

            axios.post(`http://localhost:2000/api/note/`, {
                spent: spent, 
                gained: gained, 
                total: total,
                date: date, 
                description: note,
                user: this.sessionStore.session.id,
            }, {
                headers: {
                    authorization: 'Bearer ' + this.sessionStore.session.accessToken,
                }
            })
            .then(response => response.data)
            .then(data => {
                console.log(data);
                this.getFromDB();
            })
            .catch(err => console.log(err))
            
            this.setLocal();
            console.log(this.notes);
        },
        deleteNote(note) {
            console.log(note);
            // this.notes = this.notes.filter((note) => note._id !== note._id);
            axios.delete(`http://localhost:2000/api/note/`, {
                params: {
                    id: note._id,
                },
                headers: {
                    authorization: 'Bearer ' + this.sessionStore.session.accessToken
                }
            })
            .then(response => response.data)
            .then(data => {
                console.log(data);
                console.log('Deleted succesfuly');
                this.getFromDB();
            })
            .catch(err => console.log(err));
            this.setLocal();
        },
        getFromDB() {
            axios.get(`http://localhost:2000/api/note/`, {
                headers: {
                    authorization: 'Bearer ' + this.sessionStore.session.accessToken
                }
            })
            .then(response => response.data)
            .then(data => {
                console.log(data);
                this.notes = data;
                this.setLocal();
                return data;
            })
            .catch(err => console.log(err));
        }
    },
    getters: {
        getTotal() {
            const total = this.notes?.reduce( function(a, b){
                return a + Number(b['total']);
            }, 0);
            return Math.round(total * 100) / 100;
        },
        getSpent() {
            const spent = this.notes?.reduce( function(a, b){
                return a + Number(b['spent']);
            }, 0);
            return Math.round(spent * 100) / 100;
        },
        getGained() {
            const gained = this.notes?.reduce( function(a, b){
                return a + Number(b['gained']);
            }, 0);
            return Math.round(gained * 100) / 100;
        },
    }
})
