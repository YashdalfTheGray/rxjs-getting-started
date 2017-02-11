import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/delay";

const circle = <HTMLElement>document.querySelector('#circle');

const source = Observable.fromEvent(document, 'mousemove')
.map((e: MouseEvent) => [e.clientX, e.clientY])
.filter(v => v[0] < 500)
.delay(250);

const onNext = (value) => [circle.style.left, circle.style.top] = value.map(v => v + 'px');

source.subscribe(
    onNext,
    e => console.log(`Got error: ${e}`),
    () => console.log('No more stuff left')
);
