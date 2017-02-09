import * as React from 'react'
// import * as ReactDOM from 'react-dom'
import { shallow, mount, render, ShallowWrapper, ReactWrapper, CheerioWrapper } from 'enzyme'

import { testContainer } from '../inversify.config'
import { App } from '../App'
import { Actions, IncrementActions, AjaxJpTimestampAction, MockAjaxJpTimestampAction } from '../actions'
import { ReactiveStore, ReactiveStoreForAppState, AppState } from '../state'


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
  const wrapper = shallow(React.createElement(App))
  expect(wrapper.length).toBe(1)
})


describe('App component test', () => {
  let wrapper: ShallowWrapper<any, any>
  let app: App


  beforeEach(() => {
    testContainer.snapshot()
    testContainer.bind(ReactiveStoreForAppState).toConstantValue(new ReactiveStore(initialState))
    testContainer.bind(AjaxJpTimestampAction).to(MockAjaxJpTimestampAction)

    wrapper = shallow(React.createElement(App))
    app = wrapper.instance() as App
  })


  afterEach(() => {
    testContainer.restore()
  })


  it('ajaxActions instanceof MockAjaxActions', () => {
    const ajaxActions = app.actions.increment.ajaxJpTimestampAction
    expect(ajaxActions instanceof MockAjaxJpTimestampAction).toBeTruthy()
  })


  it('increment function is called when the increment button is clicked.', () => {
    app.increment = jest.fn()
    expect(app.increment).not.toHaveBeenCalled()
    wrapper.find('button.increment').simulate('click')
    expect(app.increment).toHaveBeenCalledTimes(1)
  })


  it('DOM is updated when increment function is called.', async () => {
    jest.useRealTimers()
    expect(wrapper.find('h1').text()).toBe('counter: 100')
    await app.increment(null)
    expect(wrapper.find('h1').text()).toBe('counter: 102')
  })


  it('decrement function is called when the decrement button is clicked.', () => {
    app.decrement = jest.fn()
    expect(app.decrement).not.toHaveBeenCalled()
    wrapper.find('button.decrement').simulate('click')
    expect(app.decrement).toHaveBeenCalledTimes(1)
  })


  it('DOM is updated when decrement function is called.', async () => {
    jest.useRealTimers()
    expect(wrapper.find('h1').text()).toBe('counter: 100')
    await app.decrement(null)
    expect(wrapper.find('h1').text()).toBe('counter: 98')
  })


  it('reset function is called when the reset button is clicked.', () => {
    app.reset = jest.fn()
    expect(app.reset).not.toHaveBeenCalled()
    wrapper.find('button.reset').simulate('click')
    expect(app.reset).toHaveBeenCalledTimes(1)
  })


  it('DOM is updated when reset function is called.', async () => {
    jest.useRealTimers()
    expect(wrapper.find('h1').text()).toBe('counter: 100')
    await app.reset(null)
    expect(wrapper.find('h1').text()).toBe('counter: 100')
  })

})
