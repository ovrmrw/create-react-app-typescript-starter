import { ContainerModule, injectable, inject, decorate } from 'inversify'

import { IncrementActions } from './increment.actions'
import { AjaxJpTimestampAction } from './ajax.timestamp.action'
// import { AjaxCancelable } from 'rxjs-ajax-cancelable/esnext'
export * from './increment.actions'
export * from './ajax.timestamp.action'


@injectable()
export class Actions {
  constructor(
    @inject(IncrementActions) public increment: IncrementActions
  ) { }
}


export const actionsContainerModule = new ContainerModule((bind, unbind, isBound, rebind) => {
  // decorate(injectable(), AjaxCancelable)
  bind(Actions).toSelf()
  bind(IncrementActions).toSelf()
  bind(AjaxJpTimestampAction).toSelf()
})
