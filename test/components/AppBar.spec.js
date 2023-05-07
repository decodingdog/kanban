import { shallowMount } from "@vue/test-utils";

import AppBar from "~/components/layouts/default/AppBar.vue";

describe("AppBar Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(AppBar);
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.destroy();
    }
  });

  test("edit icon initial value", () => {
    expect(wrapper.vm.isEdit).toBe(false);
  });

  test("edit icon template initial text", () => {
    expect(wrapper.find('[data-test="editIcon"]').text()).toBe(
      "mdi-pencil-circle-outline"
    );
  });
});
