import { HistoryFilterPipe } from './history-filter.pipe';
import {History} from '../model/history';

describe('HistoryFilterPipe', () => {
  let list;
  let history1;
  let history2;
  let history3;
  let history4;
  let history5;
  let history6;
  let history7;
  let history8;
  const pipe = new HistoryFilterPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter data', () => {
    history1 = new History('t1', 'Subtask1', 'u1', 'UserName', 'g1', 'User1', new Date(Date.UTC(2020, 0, 1)), 'Action', 10);
    history2 = new History('t2', 'Subtask2', 'u1', 'UserName', 'g1', 'User2', new Date(Date.UTC(2020, 1, 1)), 'Action', 10);
    history3 = new History('t3', 'Subtask3', 'u3', 'UserName', 'g2', 'User3', new Date(Date.UTC(2020, 1, 3)), 'Action', 10);
    history4 = new History('t4', 'Subtask4', 'u4', 'UserName', 'g2', 'User4', new Date(Date.UTC(2020, 3, 28)), 'Action', 10);
    history5 = new History('t4', 'Subtask1', 'u1', 'UserName', 'g1', 'User1', new Date(Date.UTC(2021, 0, 1)), 'Action', 10);
    history6 = new History('t4', 'Subtask2', 'u2', 'UserName', 'g2', 'User2', new Date(Date.UTC(2021, 1, 1)), 'Action', 10);
    history7 = new History('t2', 'Subtask3', 'u2', 'UserName', 'g1', 'User3', new Date(Date.UTC(2021, 1, 3)), 'Action', 10);
    history8 = new History('t1', 'Subtask4', 'u4', 'UserName', 'g2', 'User4', new Date(Date.UTC(2021, 3, 28)), 'Action', 10);

    list = [history1, history2, history3, history4, history5, history6, history7, history8];

    expect(pipe.transform(list, undefined, undefined, undefined, new Date(Date.UTC(2020, 0, 1)))).toEqual([history1]);
    expect(pipe.transform(list, {_id: 'g1'}, undefined, {_id: 't1'}, undefined)).toEqual([history1]);
    expect(pipe.transform(list, undefined, {_id: 'u2'}, undefined, undefined)).toEqual([history6, history7]);
    expect(pipe.transform(list, {_id: 'g1'}, {_id: 'u1'}, {_id: 't4'}, new Date(Date.UTC(2020, 3, 1)))).toEqual([]);
    expect(pipe.transform(list, undefined, undefined, {_id: 't1'}, new Date(Date.UTC(2021, 3, 1)))).toEqual([history8]);
    expect(pipe.transform(list, {_id: 'g1'}, {_id: 'u2'}, {_id: 't3'}, new Date(Date.UTC(2021, 1, 1)))).toEqual([]);
    expect(pipe.transform(list, undefined, {_id: 'u1'}, {_id: 't4'}, undefined)).toEqual([history5]);
    expect(pipe.transform(list, {_id: 'g2'}, {_id: 'u4'}, undefined, new Date(Date.UTC(2021, 3, 1)))).toEqual([history8]);
  });
});
