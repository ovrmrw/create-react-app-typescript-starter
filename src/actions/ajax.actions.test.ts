import { testContainer } from '../inversify.config'
import { AjaxActions, MockAjaxActions } from './ajax.actions'


jest.useFakeTimers()


describe('AjaxActions test', () => {
  let ajaxActions: AjaxActions


  beforeEach(() => {
    testContainer.snapshot()
    testContainer.bind(AjaxActions).to(MockAjaxActions)

    ajaxActions = testContainer.get(AjaxActions)
  })


  afterEach(() => {
    testContainer.restore()
  })


  it('ajaxActions instanceof MockAjaxActions', () => {
    expect(ajaxActions instanceof MockAjaxActions).toBeTruthy()
  })


  it('requestJpTimestamp$', (done) => {
    jest.useRealTimers()
    let value: number | undefined
    ajaxActions.requestJpTimestamp$()
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
