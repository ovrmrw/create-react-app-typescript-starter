import { injectable } from 'inversify'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/delay'
import { AjaxCancelable, AjaxResponsePlus, AjaxRequestOptions } from 'rxjs-ajax-cancelable'



@injectable()
export class AjaxJpTimestampAction {
  protected jpTimestampCancelable = new AjaxCancelable()


  requestJpTimestamp$(): Observable<number> {
    return this.jpTimestampCancelable
      .requestAjax({
        method: 'GET',
        url: 'https://ntp-a1.nict.go.jp/cgi-bin/json',
        crossDomain: true,
        timeout: 100,
        retry: 2,
      })
      .map(data => data.response)
      .map(res => res.st as number)
      .map(value => value * 1000)
  }

}



/////////////////////////////////////////////////// MOCK
@injectable()
export class MockAjaxJpTimestampAction extends AjaxJpTimestampAction {
  requestJpTimestamp$(): Observable<number> {
    return Observable.of(1).delay(200)
  }
}
