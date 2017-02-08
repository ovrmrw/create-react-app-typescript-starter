import { injectable, inject } from 'inversify'

import { IncrementActions } from './increment.actions'
export * from './increment.actions'
export * from './ajax.actions'


@injectable()
export class Actions {
  constructor(
    public increment: IncrementActions
  ) { }
}
