import test from 'node:test'; import assert from 'node:assert/strict';
import {task,moveTask,filterTasks,validTasks} from '../public/domain.js';
test('rejects empty tasks and invalid priorities',()=>{assert.throws(()=>task('   '));assert.throws(()=>task('a','urgent'));assert.equal(task('  Hello  ').title,'Hello');});
test('moving preserves content and does not mutate input',()=>{const original=[task('Build','high','1')];const moved=moveTask(original,'1','done');assert.equal(moved[0].status,'done');assert.equal(original[0].status,'todo');assert.equal(moved[0].title,'Build');assert.throws(()=>moveTask(original,'1','bad'));});
test('search and priority filters combine',()=>{const items=[task('Build UI','high'),task('Build API','low')];assert.equal(filterTasks(items,' BUILD ','high').length,1);assert.equal(filterTasks(items,'xyz','all').length,0);});
test('stored tasks reject malformed records and duplicate ids',()=>{assert.equal(validTasks([{id:'1'}]),false);const t=task('A');assert.equal(validTasks([t,t]),false);assert.equal(validTasks([t]),true);});
