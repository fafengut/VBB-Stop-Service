import NavMain from '@/components/NavMain.vue'
import { mount } from '@vue/test-utils'
import NavItem from '@/components/NavItem.vue'
import { routes } from '@/router/index.js'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})

describe('NavMain', () => {
  it('it renders a NavItems', () => {
    const wrapper = mount(NavMain, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.findComponent(NavItem).exists()).toBe(true)
  })

  it('it renders the right amount of NavItems', () => {
    const wrapper = mount(NavMain, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.findAllComponents(NavItem)).toHaveLength(3)
  })
})
