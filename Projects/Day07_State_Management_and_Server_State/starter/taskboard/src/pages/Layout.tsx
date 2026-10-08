// TODO (Lab 7.1 step 3): add a theme toggle button to the nav.
// TODO (Lab 7.2 step 5): remove the tasks state, the seeding effect, BoardContext and the Outlet context.
import Board from '../components/Board'

function Layout(){
  return(
    <div>
      <h2>My Task Board</h2>
      <Board />
    </div>
  )
}

export default Layout