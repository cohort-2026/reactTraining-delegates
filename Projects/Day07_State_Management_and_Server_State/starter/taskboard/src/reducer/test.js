import { tasksReducer } from './tasksReducer.js'

let tasks = []

tasks = tasksReducer(tasks, {
  type: 'added', 
  task: {id: '1', title: 'my task', columnId: 'todo'}
})
console.log('after added', tasks)

tasks = tasksReducer(tasks, {
  type: 'moved', 
  id: '1', 
  columnId: 'done'
})
console.log('after moved', tasks)

tasks = tasksReducer(tasks, {
  type: 'renamed', 
  id: '1', 
  title: 'new name'
})
console.log('after renamed', tasks)

tasks = tasksReducer(tasks, {
  type: 'deleted', 
  id: '1'
})
console.log('after deleted', tasks)