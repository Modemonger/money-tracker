<script>
import { defineComponent } from 'vue';

export default defineComponent({
    data: () => ({
        dateFrom: new Date().toISOString().substr(0, 10),
        dateTo: new Date().toISOString().substr(0, 10),
    }),
    methods: {
        updateList() {
            this.$emit('updateList', {dateFrom: this.dateFrom, dateTo: this.dateTo});
        }
    }
})
</script>

<template>
    <div class="date-filter">
        <label for="from">From
            <input v-model="this.dateFrom" type="date" name="from" id="from">
        </label>
        <span class="divider"> - </span>
        <label for="to">To
            <input v-model="this.dateTo" type="date" name="to" id="to">
        </label>
        <button @click="this.updateList">Filter</button>
    </div>
</template>

<style>
.date-filter {
    display: flex;
    flex-direction: column;
}
.date-filter input {
    height: 3rem;
    margin: 0 0 0 1rem;
    text-align: center;
    font-size: 16px;
    border: 1px solid #DC052D;
    border-radius: 5px;
}
.date-filter label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: fit-content;
    margin: 0;
    padding: .5rem;
    border: none;
    background:  linear-gradient(45deg, #1a1a1a, #1a1a1a00);
    text-align: center;
    font-size: 20px;
}
.date-filter .divider{
    display: none;
    margin: 0 .5rem;
    color: #DC052D;
    border: none;
    font-size: 26px;
}
.date-filter button{
    height: 3rem;
    text-align: center;
    border: 1px solid #DC052D;
    border-radius: 5px;
}
@media (min-width: 640px) {
    .date-filter {
        display: flex;
        flex-direction: row;
    }
    .date-filter .divider{
        display: flex;
        align-items: center;
    }
    .date-filter label {
        justify-content: center;
        align-items: center;
    }
}
</style>