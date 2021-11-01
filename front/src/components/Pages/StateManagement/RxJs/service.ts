import { BehaviorSubject, tap, first, sampleTime, filter } from 'rxjs';

export class AutoCompleteService {
  private search$ = new BehaviorSubject('');
  private counter$ = new BehaviorSubject(0);

  setSearch = (value: string) => this.search$.next(value);
  addCounter = () =>
    this.counter$.pipe(
      first(),
      tap(counter => this.counter$.next(counter + 1))
    );

  getSearch = () => this.search$.asObservable();
  getSearchResult = () =>
    this.search$.pipe(
      filter(s => s?.length === 0 || s?.length > 3),
      sampleTime(2000)
    );

  getCounter = () => this.counter$.asObservable();
}

const autoCompleteService = new AutoCompleteService();
export default autoCompleteService;
