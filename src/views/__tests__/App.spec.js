import App from '@/App.vue'
import { mount } from '@vue/test-utils'
import NavMain from '@/components/NavMain.vue'
import { routes } from '@/router/index.js'
import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})

describe('App', () => {
  it('renders a NavMain Component', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })
    expect(wrapper.findComponent(NavMain).exists()).toBe(true)
  })

  it('renders the HomeView Component', async () => {
    router.push('/')
    await router.isReady()
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })
    expect(wrapper.findComponent(HomeView).exists()).toBe(true)
  })

  it('renders the AboutView Component', async () => {
    router.push('/about')
    await router.isReady()
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })
    expect(wrapper.html()).toContain('About')
  })
})
