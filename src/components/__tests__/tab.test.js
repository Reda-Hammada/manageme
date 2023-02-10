import AppAuth from "@/components/AppAuth.vue";
import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import VeeValidatePlugin from "@/plugins/validator.js";

describe("AppAuth.vue", () => {
  test("test tab props", () => {

    const form = {
      tab: 'Login' || 'Register',
    }
    const wrapper = mount(
      AppAuth,
      { 
        global: { plugins: [createPinia(), VeeValidatePlugin] } },
        {
          propsData: {
            form
          }
        }
    );
    expect(wrapper.props().form.tab).toBe(
      'Login' || 'Register'
    )
  });
});
