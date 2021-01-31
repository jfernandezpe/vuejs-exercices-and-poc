import { shallowMount } from '@vue/test-utils'
import Notes from '../../src/components/Notes.vue'

describe('Notes', () => {
  const factory = ({ data } = {}) => {
    return shallowMount(Notes, {
      data: () => data,
    })
  }
  describe('when it has a new notes', () => {
    let wrapper; 
    beforeEach(() => {
      wrapper = factory({
        data: {
          notes: [
            { title: 'A simple note', description: 'this is the description' }
          ]
        }
      })

    })

    it('should render a new note', () => {
      expect(wrapper.find('.card__header h3').text()).toEqual('A simple note')
    })
  
    it('should render correctly', () => {
      expect(wrapper.element).toMatchSnapshot()
    })
  })

})
