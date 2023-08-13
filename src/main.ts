import type { App, Plugin } from 'vue';
import WeatherWidget from './components/WeatherWidget/WeatherWidget.vue';

const weatherWidgetPlugin: Plugin = {
    install: (app: App, ...options: any[]) => {
        app.component("WeatherWidget", WeatherWidget);
    }
};

export default weatherWidgetPlugin;