import { shallowMount } from "@vue/test-utils";
import errorVue from "~/layouts/error.vue";

describe("ErrorLayout", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(errorVue, {
      propsData: {
        error: { statusCode: 404 },
      },
    });
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.destroy();
    }
  });

  test("is Vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });

  test("Mathced Snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("pageNotFound initial value", () => {
    expect(wrapper.vm.pageNotFound).toBe("404 Not Found");
  });

  test("otherError title value", () => {
    expect(wrapper.vm.otherError).toBe("An error occurred");
  });

  test("head title value", () => {
    expect(wrapper.vm.$metaInfo.title).toBe("404 Not Found");
  });
});
