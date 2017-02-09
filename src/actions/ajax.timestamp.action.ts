import { injectable } from 'inversify'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { AjaxResponse, AjaxRequest } from 'rxjs/observable/dom/ajaxObservable'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/delay'

import { AjaxCancelableBase } from '../base/ajax.cancelable.base'


@injectable()
export class AjaxJpTimestampAction extends AjaxCancelableBase {
  constructor() {
    super()
  }


  requestJpTimestamp$(): Observable<number> {
    const request: AjaxRequest = {
      url: 'https://ntp-a1.nict.go.jp/cgi-bin/json',
      crossDomain: true,
    }
    return this.requestAjax$(request)
      .map(data => data.response)
      .map(res => res.st as number)
      .map(value => value * 1000)
  }

}



/////////////////////////////////////////////////// MOCK
@injectable()
export class MockAjaxJpTimestampAction extends AjaxJpTimestampAction {
  constructor() {
    super()
    this.completeSubject()
  }


  requestJpTimestamp$(): Observable<number> {
    return Observable.of(1).delay(200)
  }

}
