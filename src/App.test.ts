import * as React from 'react'
// import * as ReactDOM from 'react-dom'
import { shallow, mount, render, ShallowWrapper, ReactWrapper, CheerioWrapper } from 'enzyme'

import { testContainer } from './inversify.config'
import { App } from './App'
import { Actions, IncrementActions, AjaxActions, MockAjaxActions } from './actions'
import { ReactiveStore, ReactiveStoreForAppState, AppState, KEY } from './state'


const initialState: AppState = {
  increment: {
    counter: 100,
  },
  lastUpdated: 0,
}


jest.useFakeTimers()


test('renders without crashing', () => {
  // const div = document.createElement('div')
  // ReactDOM.render(<App />, div)
  const wrapper = shallow(React.createElement(App, {}, {}))
  expect(wrapper.length).toBe(1)
})


describe('App component test', () => {
  let wrapper: ShallowWrapper<any, any>
  let app: App


  beforeEach(() => {
    testContainer.snapshot()
    testContainer.bind(ReactiveStoreForAppState).toConstantValue(new ReactiveStore(initialState))
    testContainer.bind(App).to(App)
    testContainer.bind(Actions).toSelf()
    testContainer.bind(IncrementActions).toSelf()
    testContainer.bind(AjaxActions).to(MockAjaxActions)

    wrapper = shallow(React.createElement(App, {}, {}))
    app = wrapper.instance() as App
  })


  afterEach(() => {
    testContainer.restore()
  })


  it('ajaxActions instanceof MockAjaxActions', () => {
    const ajaxActions = app.actions.increment.ajaxActions
    expect(ajaxActions instanceof MockAjaxActions).toBeTruthy()
  })


  it('increment function is called when the increment button is clicked.', () => {
    app.increment = jest.fn()
    wrapper.find('button.increment').simulate('click')
    expect(app.increment).toBeCalled()
  })


  it('DOM is updated when increment function is called.', async () => {
    jest.useRealTimers()
    expect(wrapper.find('h1').text()).toBe('counter: 100')
    await app.increment(null)
    expect(wrapper.find('h1').text()).toBe('counter: 102')
  })

})
