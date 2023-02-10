import { shallowMount } from "@vue/test-utils";
import AppHome from '@/components/AppHome.vue'
import AppHero from '@/components/AppHero.vue'
import AppWhy from '@/components/AppWhy.vue'
import AppHeader from '@/components/AppHeader.vue';
import AppAuth from '@/components/AppAuth.vue';
import AppAbout from '@/components/AppAbout.vue';


describe('Home.vue',()=>{
  test('test child components being passed correctly',()=>{
    const component = shallowMount(AppHome);
    expect(component.findAllComponents([AppHero,AppAbout,AppWhy,AppHeader,AppAuth]));

   });
});