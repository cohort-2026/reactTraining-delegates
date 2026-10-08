export function tasksReducer(tasks, action){
  if(action.type === 'added'){
    return [...tasks, action.task]
  }
  if(action.type === 'moved'){
    return tasks.map(t => {
      if(t.id === action.id){
        return {...t, columnId: action.columnId}
      }
      return t
    })
  }
  if(action.type === 'renamed'){
    return tasks.map(t => {
      if(t.id === action.id){
        return {...t, title: action.title}
      }
      return t
    })
  }
  if(action.type === 'deleted'){
    return tasks.filter(t => t.id !== action.id)
  }
  return tasks
}