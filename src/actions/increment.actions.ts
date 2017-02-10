import { injectable, inject } from 'inversify'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/delay'

import { ReactiveStore, ReactiveStoreForAppState, KEY, AppState, IncrementState } from '../state'
import { AjaxJpTimestampAction } from './ajax.timestamp.action'



@injectable()
export class IncrementActions {
  constructor(
    @inject(ReactiveStoreForAppState) public store: ReactiveStore<AppState>,
    @inject(AjaxJpTimestampAction) public ajaxJpTimestampAction: AjaxJpTimestampAction,
  ) { }


  incrementCounter(): Promise<void> {
    return this.store.setter(KEY.increment, (p) => ({ counter: p.counter + 1 }))
      .then(() => this.store.setter(KEY.increment, Observable.of(incrementCallback).delay(500)))
      .then(() => this.store.setter(KEY.lastUpdated, this.ajaxJpTimestampAction.requestJpTimestamp$().toPromise()))
  }


  decrementCounter(): Promise<void> {
    return this.store.setter(KEY.increment, (p) => ({ counter: p.counter - 1 }))
      .then(() => this.store.setter(KEY.increment, Observable.of(decrementCallback).delay(500)))
      .then(() => this.store.setter(KEY.lastUpdated, this.ajaxJpTimestampAction.requestJpTimestamp$()))
  }


  resetCounter(): Promise<void> {
    return this.store.setter(KEY.increment, this.store.initialState.increment)
      .then(() => this.store.setter(KEY.lastUpdated, this.ajaxJpTimestampAction.requestJpTimestamp$()))
  }

}



function incrementCallback(state: IncrementState): IncrementState {
  return { counter: state.counter + 1 }
}


function decrementCallback(state: IncrementState): IncrementState {
  return { counter: state.counter - 1 }
}
