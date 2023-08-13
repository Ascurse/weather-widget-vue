import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            cities: [],
        };
    },
    mutations: {
        setCities(state, cities) {
            state.cities = cities;
        },
        addCity(state, city) {
            state.cities.push(city);
        },
        removeCity(state, index) {
            state.cities.splice(index, 1);
        },
    },
});

export default store;
