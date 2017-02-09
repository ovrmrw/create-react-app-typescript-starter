import { ContainerModule, injectable, inject, decorate } from 'inversify'

import { IncrementActions } from './increment.actions'
import { AjaxJpTimestampAction } from './ajax.timestamp.action'
import { AjaxCancelableBase } from '../base/ajax.cancelable.base'
export * from './increment.actions'
export * from './ajax.timestamp.action'


@injectable()
export class Actions {
  constructor(
    @inject(IncrementActions) public increment: IncrementActions
  ) { }
}


export const actionsContainerModule = new ContainerModule((bind, unbind, isBound, rebind) => {
  decorate(injectable(), AjaxCancelableBase)
  bind(Actions).toSelf()
  bind(IncrementActions).toSelf()
  bind(AjaxJpTimestampAction).toSelf()
})
