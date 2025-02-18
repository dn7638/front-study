import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

export default createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#1867C0",
          secondary: "#5CBBF6",
          accent: "#005CAF",
        },
      },
    },
  },
  defaults: {
    VTextField: {
      variant: "outlined",
      density: "comfortable",
      hideDetails: "auto",
      readonly: false,
      disabled: false,
    },
  },
});
