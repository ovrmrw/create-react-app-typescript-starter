import { Container } from 'inversify'

import { container } from '../inversify.config'
import { AjaxActions } from './ajax.actions'
import { Testing } from '../symbols'


// jest.useFakeTimers()


describe('AjaxActions test', () => {
  let ajaxActions: AjaxActions


  beforeEach(() => {
    const container = new Container()
    container.bind(Testing).toConstantValue(true)
    container.bind(AjaxActions).toSelf().inSingletonScope()

    ajaxActions = container.get(AjaxActions)
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
