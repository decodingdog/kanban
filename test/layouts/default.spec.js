import { shallowMount } from "@vue/test-utils";

import defaultVue from "~/layouts/default.vue";

describe("Default Layout", () => {
  test("current year", () => {
    const wrapper = shallowMount(defaultVue);
    expect(wrapper.find('[data-test="year"]').text()).toBe("© 2023");
  });
});
