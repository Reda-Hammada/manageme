import AppDashboard from '@/components/dashboard/AppDashboard.vue';
import { shallowMount } from '@vue/test-utils';

describe('AppAuth.vue',()=>{
    test('render inner test', () => { 
        const wrapper = shallowMount(AppDashboard)
        expect(wrapper.text()).toContain('Dashboard')
     })
})