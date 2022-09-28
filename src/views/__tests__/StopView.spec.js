import StopSuche from '@/views/StopView/StopSuche.vue'
import { mount } from '@vue/test-utils'
import StopView from '@/views/StopView/StopView.vue'
import { createTestingPinia } from '@pinia/testing'

describe('StopView', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(StopView, {
      global: {
        plugins: [createTestingPinia],
      },
    })
  })

  it('does render a StopSuche Component', () => {
    expect(wrapper.findComponent(StopSuche).exists()).toBe(true)
  })

  it('renders a title with right content', () => {
    expect(wrapper.find('h1').text()).toBe('Haltestelle suchen')
  })
})
