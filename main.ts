import { Observable, Observer } from "rxjs";

const numbers: Array<Number> = [1, 5, 10];

class MyObserver implements Observer<Number> {
    next(value) {
        console.log(`value is ${value}`);
    }

    error(e) {
        console.log(`error: ${e}`);
    }

    complete() {
        console.log('complete');
    }
}

const source = Observable.create(observer => {
    let index = 0;

    const produceValues = () => {
        observer.next(numbers[index++]);

        if (index < numbers.length) {
            setTimeout(produceValues, 2000);
        }
        else {
            observer.complete();
        }
    };

    produceValues();
});

source.subscribe(new MyObserver());
source.subscribe(
    v => console.log(`Got value: ${v}`),
    e => console.log(`Got error: ${e}`),
    () => console.log('No more stuff left')
);
