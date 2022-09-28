import StopSuche from '@/views/StopView/StopSuche.vue'
import { mount, flushPromises } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { it, vi } from 'vitest'
import { stopsApi } from '@/api'

const mockStopList = {
  data: [
    {
      id: 1,
      name: 'name1',
      products: {
        suburban: true,
        subway: true,
        tram: true,
        bus: true,
        ferry: true,
        express: true,
        regional: true,
      },
    },
    {
      id: 2,
      name: 'name2',
      products: {
        suburban: false,
        subway: true,
        tram: true,
        bus: true,
        ferry: true,
        express: true,
        regional: true,
      },
    },
  ],
}

describe('StopSuche', () => {
  describe('before data is requested', () => {
    let wrapper
    beforeEach(() => {
      wrapper = mount(StopSuche, {
        global: {
          plugins: [createTestingPinia],
        },
      })
    })

    it('does render a input and button', () => {
      expect(wrapper.find('input').exists()).toBe(true)
      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('input changes correctly', async () => {
      const queryInput = wrapper.find('input[type="text"]')
      await queryInput.setValue('name')
      expect(wrapper.find('input[type="text"]').element.value).toBe('name')
    })
  })

  describe('after data is requested', () => {
    beforeEach(() => {
      vi.spyOn(stopsApi, 'findByQuery').mockResolvedValue(mockStopList)
    })

    let wrapper
    beforeEach(() => {
      wrapper = mount(StopSuche, {
        global: {
          stubs: ['router-link', 'router-view'],
          plugins: [createTestingPinia],
        },
      })
    })

    it('displays loading state on button click', async () => {
      expect(wrapper.find('[data-testid="loading-indicator"]').exists()).toBe(
        false
      )
      await wrapper.get('button').trigger('click')

      expect(wrapper.find('[data-testid="loading-indicator"]').exists()).toBe(
        true
      )

      await flushPromises()

      expect(wrapper.find('[data-testid="loading-indicator"]').exists()).toBe(
        false
      )
    })

    it('renders a stop for each returned from the API', async () => {
      await wrapper.find('button').trigger('click')
      expect(stopsApi.findByQuery).toHaveBeenCalledTimes(1)
      expect(stopsApi.findByQuery).toHaveBeenCalledWith({
        addresses: false,
        poi: false,
        query: '',
      })
      await flushPromises()

      const stops = wrapper.findAll('[data-test="stop"]')

      expect(stops).toHaveLength(2)
      expect(stops[0].text()).toContain('name1')
      expect(stops[1].text()).toContain('name2')
    })
  })
})
