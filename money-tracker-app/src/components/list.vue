<script>
import { useNotesStore } from "../stores/notesStore";

export default {
    data: () => ({
        notesStore: useNotesStore(),
        totalSpent: 0,
        totalGained: 0,
        totalTotal: 0,
        active: 0,
    }),
    methods: {
        sumObjArray(array, key) {
            return array.reduce((a, b) => a + (b[key] || 0), 0);
        },
        setExpand(id) {
            if (this.active === id) {
                this.active = '';
            } else {
                this.active = id;
            }
        },
        handleDelete(note) {
            this.notesStore.deleteNote(note);
        },
        formatDate(date) {
            return date.toString().split('T')[0]
        }
    },
}
</script>

<template>
    <div class="list-wrapper">
        <div v-if="this.notesStore.notes?.length" class="receipts">
            <div 
            v-for="note in this.notesStore.notes" 
            class="receipt" 
            :key="note._id" 
            @click="this.setExpand(note._id)" 
            :class="note._id === active ? 'active' : ''"
            >
                <p data-label="Total">{{ note.gained - note.spent }}</p>
                <p data-label="Spent">{{ note.spent }}</p>
                <p data-label="Gained">{{ note.gained }}</p>
                <p data-label="Date">{{ formatDate(note.date) }}</p>
                <p data-label="Note">{{ note.description }}</p>
                <div class="delete" @click="this.handleDelete(note)">
                    <div id="bar1" class="bar"></div>
                    <div id="bar2" class="bar"></div>
                </div>
            </div>
        </div>
        <div v-else>
            <h1>You dont have any notes in here...</h1>
        </div>
    </div>
</template>

<style scoped>
.list-wrapper {
    display: flex;
    align-items: start;
    justify-content: center;
    width: 100%;
    z-index: 2;
}
.list-wrapper .receipts {
    width: 80%;
    font-size: 14px;
}
.list-wrapper .receipts .receipt {
    position: relative;
    height: 1.5rem;
    text-align: end;
    margin: .5rem 0;
    padding: 1rem;
    cursor: pointer;
    background:  linear-gradient(45deg, #1a1a1a, #1a1a1a00);
    border-radius: 5px;
    overflow: hidden;
    transition: 0.5s;
}
.list-wrapper .receipts .receipt p {
    height: 1.5rem;
    margin: .3rem 0;
    border-bottom: 2px solid #DC052D;
    border-radius: 5px;
}
.list-wrapper .receipts .receipt p::before {
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
}

.list-wrapper .receipts .active{
    height: 12rem;
}

.list-wrapper .receipt .delete {
    width: 2rem;
    height: 2rem;
    margin: .5rem 0 0 auto;
}
.list-wrapper .delete #bar1 {
  transform: translateY(14px) rotateZ(-45deg);
}
.list-wrapper .delete #bar2 {
  transform: translateY(10px) rotateZ(45deg);
}
@media (min-width: 640px) {
    .list-wrapper .receipts {
        display: flex;
        align-items: start;
        justify-content: center;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .list-wrapper .receipts .receipt {
        width: 14rem;
        height: 12rem;
    }
}

</style>
