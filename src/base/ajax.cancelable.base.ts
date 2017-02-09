import { injectable } from 'inversify'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { AjaxResponse, AjaxRequest } from 'rxjs/observable/dom/ajaxObservable'
import 'rxjs/add/observable/dom/ajax'
import 'rxjs/add/operator/take'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'



@injectable()
export abstract class AjaxCancelableBase {
  private ajaxSubject$ = new Subject<AjaxObject>()


  constructor() {
    this.ajaxSubject$
      .switchMap(ajaxObj => {
        return Observable.ajax(ajaxObj.request)
          .take(1)
          .map(data => {
            ajaxObj.response = data
            return ajaxObj
          })
      })
      .subscribe(ajaxObj => {
        if (ajaxObj.response && ajaxObj.response.status === 200) {
          ajaxObj.responseSubject$.next(ajaxObj.response)
        } else {
          ajaxObj.responseSubject$.complete()
        }
      })
  }


  requestAjax$(request: AjaxRequest): Observable<AjaxResponse> {
    const responseSubject$ = new Subject<AjaxResponse>()
    const ajaxObj: AjaxObject = {
      request,
      responseSubject$,
    }

    this.ajaxSubject$.next(ajaxObj)

    return responseSubject$
      .take(1)
  }


  completeSubject(): void {
    this.ajaxSubject$.complete()
  }

}



interface AjaxObject {
  request: AjaxRequest,
  response?: AjaxResponse,
  responseSubject$: Subject<AjaxResponse>,
}
