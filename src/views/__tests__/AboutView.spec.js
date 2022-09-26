import AboutView from '@/views/AboutView.vue'
import { mount } from '@vue/test-utils'

describe('AboutView', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(AboutView)
  })

  it('does render a headline', () => {
    expect(wrapper.find('h1').text()).toBe('About')
  })
  it('does render a paragraph', () => {
    expect(wrapper.find('p').exists()).toBe(true)
  })
})
