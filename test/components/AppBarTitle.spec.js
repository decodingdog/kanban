import { shallowMount } from "@vue/test-utils";

import AppBarTitleVue from "~/components/layouts/default/AppBarTitle.vue";

describe("AppBarTitle Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(AppBarTitleVue);
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.destroy();
    }
  });

  test("title initial value", () => {
    expect(wrapper.vm.title).toBe("Kanban 보드");
  });

  test("set title value", () => {
    wrapper.setData({ title: "테스트입니다." });
    expect(wrapper.vm.title).toBe("테스트입니다.");
  });
});
