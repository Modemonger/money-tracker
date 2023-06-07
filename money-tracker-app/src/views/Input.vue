<script>
import { defineComponent } from 'vue';
import Input from '../components/input.vue';
import { useSessionStore } from '../stores/sessionStore';

export default defineComponent({
    components: {
        Input,
    },
    methods: {
        beforeUnloadListener: (event) => {
            event.preventDefault();
            return (event.returnValue = "");
        },
    },
    mounted() {
        useSessionStore().getLocal();
    }
})
</script>
<template>
    <Input />
</template>
