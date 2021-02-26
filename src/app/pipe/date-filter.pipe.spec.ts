import { DateFilterPipe } from './date-filter.pipe';
import { History} from '../model/history';

xdescribe('DateFilterPipe', () => {
  let list1, list2, list3, list4, list5, list6;
  let history1, history2, history3, history4;
  let date1, date2, date3, date4, date5, date6;
  let datefilter1, datefilter2, datefilter3, datefilter4, datefilter5;

  beforeEach(()=> {
    const pipe = new DateFilterPipe();

    date1 = new Date(Date.UTC(2020, 0, 0));
    date2 = new Date(Date.UTC(2020, 0, 28));
    date3 = new Date(Date.UTC(2020, 1, 1));
    date4 = new Date(Date.UTC(2020, 1, 28));
    date5 = new Date(Date.UTC(2020, 2, 3));
    date6 = new Date(Date.UTC(2020, 2, 25));

    datefilter1 = new Date(Date.UTC(2020, 0, 0));
    datefilter2 = new Date(Date.UTC(2020, 1, 0));
    datefilter3 = new Date(Date.UTC(2020, 2, 0));
    datefilter4 = new Date(Date.UTC(2020, 3, 0));
    datefilter5 = new Date(Date.UTC(2021, 0, 0));

    history1 = new History('1', 'SubtaskName1', 1, true, '1', 'User1', date1, date2);
    history2 = new History('2', 'SubtaskName2', 1, true, '2', 'User2', date3, date4);
    history3 = new History('3', 'SubtaskName3', 1, true, '3', 'User3', date5, date6);
    history4 = new History('4', 'SubtaskName4', 1, true, '4', 'User4', date2, date3);

    list1 = [];

    list2.push(history1);

    list3.push(history1);
    list3.push(history2);

    list4.push(history1);
    list4.push(history2);
    list4.push(history3);

    list5.push(history2);
    list5.push(history3);

    list6.push(history1);
    list6.push(history3);
    list6.push(history4);

  });

  it('create an instance', () => {
    expect(this.pipe).toBeTruthy();
  });

  it('should filter data', () => {
    expect(this.pipe.transform(list1, datefilter1)).toBe([]);

    expect(this.pipe.transform(list2, datefilter1)).toBe([]);
    expect(this.pipe.transform(list2, datefilter2)).toContain(history1);
    expect(this.pipe.transform(list2, datefilter5)).toBe([]);

    expect(this.pipe.transform(list3, datefilter1)).toContain(history1);
    expect(this.pipe.transform(list3, datefilter2)).toContain(history2);
    expect(this.pipe.transform(list3, datefilter3)).toBe([]);
    expect(this.pipe.transform(list3, datefilter5)).toBe([]);

    expect(this.pipe.transform(list4, datefilter1)).toContain(history1);
    expect(this.pipe.transform(list4, datefilter2)).toContain(history2);
    expect(this.pipe.transform(list4, datefilter3)).toContain(history3);
    expect(this.pipe.transform(list4, datefilter4)).toBe([]);
    expect(this.pipe.transform(list4, datefilter5)).toBe([]);

    expect(this.pipe.transform(list5, datefilter1)).toBe([]);
    expect(this.pipe.transform(list5, datefilter2)).toContain(history2);
    expect(this.pipe.transform(list5, datefilter3)).toContain(history3);
    expect(this.pipe.transform(list5, datefilter4)).toBe([]);
    expect(this.pipe.transform(list5, datefilter5)).toBe([]);

    expect(this.pipe.transform(list6, datefilter1)).toContain(history4);
    expect(this.pipe.transform(list6, datefilter1)).toContain(history1);
    expect(this.pipe.transform(list6, datefilter2)).toContain(history4);
    expect(this.pipe.transform(list6, datefilter3)).toContain(history3);
    expect(this.pipe.transform(list6, datefilter4)).toBe([]);
    expect(this.pipe.transform(list6, datefilter5)).toBe([]);
  });
});
