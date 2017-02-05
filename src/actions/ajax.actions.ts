import { injectable, inject } from 'inversify'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { AjaxResponse, AjaxRequest } from 'rxjs/observable/dom/ajaxObservable'



@injectable()
export class AjaxActions {
  private jpTimestampRequestSubject$ = new Subject<AjaxRequest>()
  private jpTimestampResponseSubject$ = new Subject<AjaxResponse>()


  constructor() {
    this.jpTimestampRequestSubject$
      .switchMap(request => Observable.ajax(request))
      .subscribe(response => {
        this.jpTimestampResponseSubject$.next(response)
      })
  }


  requestJpTimestamp(): void {
    const request = {
      url: 'https://ntp-a1.nict.go.jp/cgi-bin/json',
      crossDomain: true,
    }
    this.jpTimestampRequestSubject$.next(request)
  }


  get jpTimestamp$(): Observable<number> {
    return this.jpTimestampResponseSubject$
      .map(data => data.response)
      .map(res => res.st as number)
      .map(value => value * 1000)
  }

}
