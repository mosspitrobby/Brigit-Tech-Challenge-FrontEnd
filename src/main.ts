import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/saga-green/theme.css'
import 'primeicons/primeicons.css';
import Panel from 'primevue/panel';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button';
import App from './App.vue';

const app = createApp(App)

app.use(PrimeVue)
app.component('InputText', InputText)
app.component('InputMask', InputMask)
app.component('PanelComponent', Panel)
app.component('ButtonComponent', Button)
app.component('FileUpload', FileUpload)



app.use(createPinia())

app.mount('#app')
