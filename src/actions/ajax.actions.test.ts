import { Container } from 'inversify'

import { AjaxActions } from './ajax.actions'
import { container } from '../inversify.config'
import { Testing } from '../symbols'


jest.useFakeTimers()


describe('AjaxActions test', () => {
  let ajaxActions: AjaxActions


  beforeEach(() => {
    const container = new Container()
    container.bind(Testing).toConstantValue(true)
    container.bind(AjaxActions).toSelf().inSingletonScope()

    ajaxActions = container.get(AjaxActions)
  })


  it('requestJpTimestamp$', () => {
    let value: number = 0
    ajaxActions.requestJpTimestamp$()
      .subscribe(timestamp => value = timestamp)

    expect(value).toBe(0)
    jest.runAllTimers()
    expect(value).toBe(1)
  })

})
