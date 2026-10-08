// TODO (Lab 7.2 step 6): select moveTask, renameTask and deleteTask from the store instead of props.
// TODO (Lab 7.3 steps 6-7): use the useMoveTask and useDeleteTask mutations, and disable controls while they are pending.
import { useTaskStore } from '../store/useTaskStore'
import { useState } from 'react'

function TaskCard(props: { id: string, title: string, columnId: string }){
  const deleteTask = useTaskStore((s:any) => s.deleteTask)
  const moveTask = useTaskStore((s:any) => s.moveTask)
  const renameTask = useTaskStore((s:any) => s.renameTask)

  const [isEdit, setIsEdit] = useState(false)
  const [newTitle, setNewTitle] = useState(props.title)

  function handleRename(){
    renameTask(props.id, newTitle)
    setIsEdit(false)
  }

  return(
    <div style={{border: '1px solid black', margin: '5px', padding: '5px'}}>
      {isEdit ? (
        <div>
          <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          <button onClick={handleRename}>save</button>
        </div>
      ) : (
        <p>{props.title}</p>
      )}

      <button onClick={() => setIsEdit(true)}>rename</button>
      <button onClick={() => deleteTask(props.id)}>delete</button>

      <div>
        <button onClick={() => moveTask(props.id, 'todo')}>todo</button>
        <button onClick={() => moveTask(props.id, 'doing')}>doing</button>
        <button onClick={() => moveTask(props.id, 'done')}>done</button>
      </div>
    </div>
  )
}

export default TaskCard