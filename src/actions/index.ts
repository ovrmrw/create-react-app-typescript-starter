import { injectable, inject } from 'inversify'

import { IncrementActions } from './increment.actions'
export * from './increment.actions'
export * from './ajax.timestamp.action'



@injectable()
export class Actions {
  constructor(
    @inject(IncrementActions) public increment: IncrementActions
  ) { }
}
