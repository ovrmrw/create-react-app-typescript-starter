import { testContainer } from '../inversify.config'
import { AjaxJpTimestampAction, MockAjaxJpTimestampAction } from '../actions'


jest.useFakeTimers()


describe('AjaxActions test', () => {
  let ajaxJpTimestampAction: AjaxJpTimestampAction


  beforeEach(() => {
    testContainer.snapshot()
    testContainer.bind(AjaxJpTimestampAction).to(MockAjaxJpTimestampAction)

    ajaxJpTimestampAction = testContainer.get(AjaxJpTimestampAction)
  })


  afterEach(() => {
    testContainer.restore()
  })


  it('ajaxJpTimestampAction instanceof MockAjaxJpTimestampAction', () => {
    expect(ajaxJpTimestampAction instanceof MockAjaxJpTimestampAction).toBeTruthy()
  })


  it('requestJpTimestamp$', (done) => {
    jest.useRealTimers()
    let value: number | undefined
    ajaxJpTimestampAction.requestJpTimestamp$()
      .subscribe({
        next: timestamp => value = timestamp,
        complete: () => {
          expect(value).toBe(1)
          done()
        }
      })

    expect(value).toBe(undefined)
  })

})
