<script>
import { defineComponent } from 'vue'
import { useNotesStore } from '../stores/notesStore'
import { useSessionStore } from '../stores/sessionStore'
import Total from './total.vue'
import Menu from './menu.vue'

export default defineComponent({
    setup: () => {
        const notesStore = useNotesStore();
        const sessionStore = useSessionStore();

        return {
            notesStore: notesStore,
            sessionStore: sessionStore,
        }
    },
    components: {
        Menu,
        Total,
    },
})
</script>

<template>
    <div v-if="this.sessionStore.isAuthenticated" class="header">
        <Menu />
        <Total :spent="this.notesStore.getSpent" :gained="this.notesStore.getGained" :budget="this.sessionStore.session.startingAmount"/>
    </div>
</template>

<style>
.header {
    position: relative;
    display: flex;
    height: 5rem;
    justify-content: end;
    align-items: center;
    background:  linear-gradient(45deg, #1a1a1a, #1a1a1a00);
}
</style>
