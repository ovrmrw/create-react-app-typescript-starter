import * as React from 'react'
import { Subscription } from 'rxjs/Subscription'


export abstract class MyReactPureComponent<P, S> extends React.PureComponent<P, S> {
  private subs: Subscription[] = []

  set disposable(sub: Subscription) {
    this.subs.push(sub)
  }


  disposeSubscriptions(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }


  abstract componentWillMount()

  abstract componentWillUnmount()

}
