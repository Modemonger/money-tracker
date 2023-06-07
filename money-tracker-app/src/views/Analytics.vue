<script>
import { defineComponent } from 'vue';
import { useNotesStore } from '../stores/notesStore';
import DateFilter from '../components/dateFilter.vue';
import List from '../components/list.vue';
import Sort from '../components/sort.vue';

export default defineComponent({
    data: () => ({
        filterFrom: '',
        filterTo: '',
        notesStore: useNotesStore(),
    }),
    components:{
        DateFilter,
        List,
        Sort,
    },
    methods: {
        filterList(event) {
            this.filterFrom = event.dateFrom;
            this.filterTo = event.dateTo;
            this.notesStore.getFromDB();
            this.notesStore.notes = this.notesStore.notes.filter((note) => {
                if(note.date <= this.filterTo && note.date >= this.filterFrom) {
                    return note;
                }
            });
        },
        sortList(event) {
            console.log(event.value);
            switch (event.value) {
                case 'newest':
                    this.notesStore.notes = this.notesStore.notes.sort(function(a,b){
                        return new Date(b.date) - new Date(a.date);
                    });
                    break;

                case 'oldest':
                    this.notesStore.notes = this.notesStore.notes.sort(function(a,b){
                        return new Date(a.date) - new Date(b.date);
                    });
                    break;
                
                case 'spentHigh':
                    this.notesStore.notes = this.notesStore.notes.sort(function(a,b){
                        return b.spent - a.spent;
                    });
                    break;

                case 'spentLow':
                    this.notesStore.notes = this.notesStore.notes.sort(function(a,b){
                        return a.spent - b.spent;
                    });
                    break;

                case 'gainedHigh':
                    this.notesStore.notes = this.notesStore.notes.sort(function(a,b){
                        return b.gained - a.gained;
                    });
                    break;

                case 'gainedLow':
                    this.notesStore.notes = this.notesStore.notes.sort(function(a,b){
                        return a.gained - b.gained;
                    });
                    break;
                
                case 'totalHigh':
                    this.notesStore.notes = this.notesStore.notes.sort(function(a,b){
                        return b.total - a.total;
                    });
                    break;

                case 'totalLow':
                    this.notesStore.notes = this.notesStore.notes.sort(function(a,b){
                        return a.total - b.total;
                    });
                    break;

                default:
                    break;
            }
        },
    },
    computed: {
        spentWidth() {
            return Math.abs(this.notesStore.getSpent/(this.notesStore.getGained-this.notesStore.getSpent))*100 || 0;
        },
        gainedWidth() {
            return Math.abs(this.notesStore.getGained/(this.notesStore.getSpent-this.notesStore.getGained))*100 || 0;
        },
    },
    mounted() {
        if(this.notesStore.notes >= 0) {
            this.notesStore.notes = this.notesStore.notes.sort(function(a,b){
                return new Date(b.date) - new Date(a.date);
            });
        }
    }
})
</script>
<template>
    <div class="analytics-wrapper">
        <div class="filters">
            <DateFilter @update-list="$event => filterList($event)"/>
            <Sort @sort-list="$event => sortList($event)" />
        </div>
        <div class="displays">
            <div class="bar-container">
                <div class="bar spent" name="spent" :style="{ width: `${spentWidth}%` }"></div>
                <label for="spent">Spent {{ this.notesStore?.getSpent }}</label>
                <span class="divider"> - </span>
                <label for="gained">Gained {{ this.notesStore?.getGained }}</label>
                <div class="bar gained" name="gained" :style="{ width: `${gainedWidth}%` }"></div>
            </div>
        </div>
        <div class="list">
            <List />
        </div>
    </div>
</template>

<style>
.analytics-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    z-index: 2;
}
.analytics-wrapper .displays{
    width: 80%;
    height: fit-content;
    margin: 1rem 0;
}
.analytics-wrapper .filters{
    margin: 1rem 0;
}
.analytics-wrapper .displays .bar-container{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 18px;
}
.analytics-wrapper .displays .bar-container  *{
    margin: .5rem 0;
}
.analytics-wrapper .displays .bar-container .bar{
    padding: .5rem;
}
.analytics-wrapper .displays .bar-container .divider{
    margin: 0 .5rem;
    color: #DC052D;
    border: none;
    font-size: 26px;
}
.analytics-wrapper .list{
    width: 100%;
}
</style>