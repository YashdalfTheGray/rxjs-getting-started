import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/map";

interface Movie {
    title: string
}

const output = <HTMLElement>document.querySelector('#output');
const button = <HTMLElement>document.querySelector('#button');

const source = Observable.fromEvent(button, 'click');
const load = (url: string) => Observable.fromPromise(fetch(url).then(r => r.json<Array<Movie>>()));

source.flatMap(e => load('movies.json'))
.map(movies => movies.map(m => `<div>${m.title}</div>`).join(''))
.subscribe(
    ms => output.innerHTML = ms,
    e => console.log(`Got error: ${e}`),
    () => console.log('No more stuff left')
);
