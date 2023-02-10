import AppHeader from "@/components/AppHeader.vue";
import { mount } from "@vue/test-utils";
import { expect } from "vitest";
import { createPinia } from "pinia";
import VeeValidatePlugin from "@/plugins/validator.js";

describe('AppHeader',()=>{

    test('emit getting triggerred',()=>{
        const wrapper = mount(AppHeader,
            { 
                global: { plugins: [createPinia(), VeeValidatePlugin] } 
             },    
        )

        wrapper.find('button').trigger('click')
        expect(wrapper.emitted()).toHaveProperty('change-tab')
    
    
    })




});