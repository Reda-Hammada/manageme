import AppAuth from "@/components/AppAuth.vue";
import { shallowMount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { form, field, configure, defineRule, ErrorMessage } from "vee-validate";

describe("AppAuth.vue", () => {
  test("test tab props", () => {
    const form = {
      tab: "Login",
    };

    const wrapper = shallowMount(
      AppAuth,
      { global: { plugins: [createPinia(),
                             field]
                            } 
                        },
      {
        propsData: {
          form,
        },
      }
    );

    expect(wrapper.text()).toContain(form.tab);
  });
});
