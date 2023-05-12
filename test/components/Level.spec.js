import { shallowMount } from "@vue/test-utils";

import Level from "~/components/common/Level.vue";

describe("Level Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Level);
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.destroy();
    }
  });

  test("initial props and text", () => {
    expect(wrapper.classes("rounded-pill")).toBe(true);
    expect(wrapper.classes("level-none")).toBe(true);
  });

  test("initial text", () => {
    expect(wrapper.text()).toBe("None");
  });

  test("Add propsData", () => {
    wrapper = shallowMount(Level, {
      propsData: {
        value: "high",
      },
    });
    expect(wrapper.classes("level-high")).toBe(true);
    expect(wrapper.text()).toBe("High");
  });
});
