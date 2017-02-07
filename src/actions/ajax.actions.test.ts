import { container } from '../inversify.config'
import { AjaxActions } from './ajax.actions'
import { Testing } from '../symbols'


jest.useFakeTimers()


describe('AjaxActions test', () => {
  let ajaxActions: AjaxActions


  beforeEach(() => {
    const testContainer = container.createChild()
    testContainer.bind(Testing).toConstantValue(true)

    ajaxActions = testContainer.get(AjaxActions)
  })


  it('requestJpTimestamp$', () => {
    let value: number | undefined
    ajaxActions.requestJpTimestamp$()
      .subscribe(timestamp => value = timestamp)

    expect(value).toBe(undefined)
    jest.runAllTimers()
    expect(value).toBe(1)
  })

})
