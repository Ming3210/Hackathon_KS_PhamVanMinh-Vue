import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "../src/index.css";

const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
});

app.use(router);
app.use(vuetify);
app.mount("#app");
