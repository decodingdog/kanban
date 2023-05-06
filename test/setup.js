import Vue from "vue";
import Vuetify from "vuetify";
import { config } from "@vue/test-utils";
import VueMeta from "vue-meta";
import clientOnlyMock from "./__mocks__/clientOnlyMock";

Vue.use(Vuetify);
Vue.use(VueMeta, { keyName: "head" });

Vue.config.silent = true;

// template tag를 jest 에서 해석할 수 없기 때문에 미리 기본 인터페이스를 정의해줌
config.stubs["client-only"] = clientOnlyMock;
