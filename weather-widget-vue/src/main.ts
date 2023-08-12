import { createApp } from 'vue'
import App from './App.vue'
import { Select } from 'ant-design-vue';

const app = createApp(App);

app.use(Select).mount('#app');