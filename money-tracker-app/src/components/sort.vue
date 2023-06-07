<script>
import { defineComponent } from 'vue';

export default defineComponent({
    data: () => ({
        filter: 'newest',
    }),
    watch: {
        filter() {
            this.$emit('sortList', {value: this.filter});
        }
    }
})
</script>

<template>
    <div class="sort-filter">
        <select v-model="this.filter" name="sort" id="sort">
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="spentHigh">Spent descending</option>
            <option value="spentLow">Spend ascending</option>
            <option value="gainedHigh">Gained descending</option>
            <option value="gainedLow">Gained ascending</option>
            <option value="totalHigh">Total descending</option>
            <option value="totalLow">Total ascending</option>
        </select>
    </div>
</template>

<style>
.sort-filter select {
    width: 100%;
    height: 3rem;
    margin: .5rem 0 1rem 0;
    text-align: center;
    font-size: 16px;
    border: 1px solid #DC052D;
    border-radius: 5px;
}
.sort-filter select option {
    height: fit-content;
    margin: 0;
    border: none;
    background:  linear-gradient(45deg, #1a1a1a, #1a1a1a00);
    text-align: center;
}
</style>