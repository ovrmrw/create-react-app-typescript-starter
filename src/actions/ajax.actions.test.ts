import { rootContainer } from '../inversify.config'
import { AjaxActions, MockAjaxActions } from './ajax.actions'


// jest.useFakeTimers()


describe('AjaxActions test', () => {
  let ajaxActions: AjaxActions


  beforeEach(() => {
    const container = rootContainer.createChild()
    container.bind(AjaxActions).to(MockAjaxActions)

    ajaxActions = container.get(AjaxActions)
  })


  it('ajaxActions instanceof MockAjaxActions', () => {
    expect(ajaxActions instanceof MockAjaxActions).toBeTruthy()
  })


  it('requestJpTimestamp$', (done) => {
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
