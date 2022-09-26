import HomeView from '@/views/HomeView.vue'
import { mount } from '@vue/test-utils'
import StopView from '@/views/StopView/StopView.vue'

describe('HomeView', () => {
  it('does render a StopView View', () => {
    const wrapper = mount(HomeView)

    expect(wrapper.findComponent(StopView).exists()).toBe(true)
  })
})
