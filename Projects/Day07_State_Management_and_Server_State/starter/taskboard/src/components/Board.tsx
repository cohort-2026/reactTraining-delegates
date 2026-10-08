// TODO (Lab 7.2 step 5): remove the tasks and handler props.
// TODO (Lab 7.3 step 7): show loading and error states from useQuery.
import Column from './Column'

function Board(){
  return(
    <div>
      <Column columnId="todo" title="To do" />
      <Column columnId="doing" title="In progress" />
      <Column columnId="done" title="Done" />
    </div>
  )
}

export default Board