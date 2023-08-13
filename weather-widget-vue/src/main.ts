import { createApp } from 'vue'
import App from './App.vue'
import { Select, Spin } from 'ant-design-vue';
import store from './store/store';

const app = createApp(App);

app.use(Select)
app.use(Spin)
app.use(store)
app.mount('#app');