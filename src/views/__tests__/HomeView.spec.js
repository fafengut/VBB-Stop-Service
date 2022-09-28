import HomeView from '@/views/HomeView.vue'
import { mount } from '@vue/test-utils'
import StopView from '@/views/StopView/StopView.vue'
import { createTestingPinia } from '@pinia/testing'

describe('HomeView', () => {
  it('does render a StopView View', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [createTestingPinia],
      },
    })

    expect(wrapper.findComponent(StopView).exists()).toBe(true)
  })
})
