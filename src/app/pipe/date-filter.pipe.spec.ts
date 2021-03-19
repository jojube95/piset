import { DateFilterPipe } from './date-filter.pipe';
import { History} from '../model/history';

describe('DateFilterPipe', () => {
  let list1, list2, list3, list4, list5, list6;
  let history1, history2, history3, history4;
  let datefilter1, datefilter2, datefilter3, datefilter4, datefilter5;
  let pipe = new DateFilterPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter data', () => {
    datefilter1 = new Date(Date.UTC(2020, 0, 1));
    datefilter2 = new Date(Date.UTC(2020, 1, 1));
    datefilter3 = new Date(Date.UTC(2020, 2, 1));
    datefilter4 = new Date(Date.UTC(2020, 3, 1));
    datefilter5 = new Date(Date.UTC(2021, 0, 1));

    history1 = new History('1', 'Subtask1', 1, true, '1', 'User1', new Date(Date.UTC(2020, 0, 1)), new Date(Date.UTC(2020, 0, 28)));
    history2 = new History('2', 'Subtask2', 1, true, '2', 'User2', new Date(Date.UTC(2020, 1, 1)), new Date(Date.UTC(2020, 1, 28)));
    history3 = new History('3', 'Subtask3', 1, true, '3', 'User3', new Date(Date.UTC(2020, 2, 3)), new Date(Date.UTC(2020, 2, 25)));
    history4 = new History('4', 'Subtask4', 1, true, '4', 'User4', new Date(Date.UTC(2020, 0, 28)), new Date(Date.UTC(2020, 1, 1)));

    list1 = [];

    list2 = [history1];

    list3 = [history1, history2];

    list4 = [history1, history2, history3];

    list5 = [history2, history3];

    list6 = [history1, history3, history4];

    expect(pipe.transform(list1, [datefilter1])).toEqual([]);
    expect(pipe.transform(list1, [datefilter2])).toEqual([]);
    expect(pipe.transform(list1, [datefilter3])).toEqual([]);
    expect(pipe.transform(list1, [datefilter4])).toEqual([]);
    expect(pipe.transform(list1, [datefilter5])).toEqual([]);

    expect(pipe.transform(list2, [datefilter1])).toContain(history1);
    expect(pipe.transform(list2, [datefilter2])).toEqual([]);
    expect(pipe.transform(list2, [datefilter3])).toEqual([]);
    expect(pipe.transform(list2, [datefilter4])).toEqual([]);
    expect(pipe.transform(list2, [datefilter5])).toEqual([]);


    expect(pipe.transform(list3, [datefilter1])).toContain(history1);
    expect(pipe.transform(list3, [datefilter2])).toContain(history2);
    expect(pipe.transform(list3, [datefilter3])).toEqual([]);
    expect(pipe.transform(list3, [datefilter4])).toEqual([]);
    expect(pipe.transform(list3, [datefilter5])).toEqual([]);

    expect(pipe.transform(list4, [datefilter1])).toContain(history1);
    expect(pipe.transform(list4, [datefilter2])).toContain(history2);
    expect(pipe.transform(list4, [datefilter3])).toContain(history3);
    expect(pipe.transform(list4, [datefilter4])).toEqual([]);
    expect(pipe.transform(list4, [datefilter5])).toEqual([]);

    expect(pipe.transform(list5, [datefilter1])).toEqual([]);
    expect(pipe.transform(list5, [datefilter2])).toContain(history2);
    expect(pipe.transform(list5, [datefilter3])).toContain(history3);
    expect(pipe.transform(list5, [datefilter4])).toEqual([]);
    expect(pipe.transform(list5, [datefilter5])).toEqual([]);

    expect(pipe.transform(list6, [datefilter1])).toContain(history4);
    expect(pipe.transform(list6, [datefilter1])).toContain(history1);
    expect(pipe.transform(list6, [datefilter2])).toContain(history4);
    expect(pipe.transform(list6, [datefilter3])).toContain(history3);
    expect(pipe.transform(list6, [datefilter4])).toEqual([]);
    expect(pipe.transform(list6, [datefilter5])).toEqual([]);
  });
});
