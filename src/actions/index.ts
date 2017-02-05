import { injectable, inject } from 'inversify'

import { IncrementActions } from './increment.actions'



@injectable()
export class Actions {
  constructor(
    public increment: IncrementActions
  ) { }
}
