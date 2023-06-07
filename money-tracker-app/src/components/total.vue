<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        spent: 0,
        gained: 0,
        budget: 0,
    },
    computed: {
        total() { 
            return Math.round((Number(this.budget) - this.spent + this.gained) * 100) / 100 || '';
        }

    }
})
</script>

<template>
    <div class="stats">
        <label for="gained" class="gained">
            Gained
            <p name="gained" class="gained">{{ this.gained.toFixed(2) }}</p>
        </label>
        <span class="decor"> - </span>
        <label for="total" class="total-spent">
            Spent
            <p name="total" class="total-spent">{{ this.spent.toFixed(2) }}</p>
        </label>
        <span class="decor"> + </span>
        <label for="starting" class="starting">
            Started with
            <p name="starting" class="starting">{{ Number(this.budget).toFixed(2) }}</p>
        </label>
        <span class="decor">=</span>
        <label for="current" class="current-amount">
            Current total
            <p name="current" class="current-amount">{{ this.total }}</p>
        </label>
    </div>
</template>

<style>
.stats {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
}
.stats * {
    margin: 0 .5rem;
}
.decor {
    color: #DC052D;
    font-size: 34px;
    font-weight: bold;
}
.gained, .decor, .total-spent, .starting{
    display: none;
}
@media (min-width: 600px) {
    .gained, .decor, .total-spent, .starting{
        display: block;
    }
}
</style>