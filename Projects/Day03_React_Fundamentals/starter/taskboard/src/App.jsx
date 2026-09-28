import './App.css';
import Header from './components/board/Header';
import Board from './components/board/Board';
import tasks from './data/tasks';

function App() {
  return (
    <main>
      <Header title="TaskBoard" taskCount={tasks.length} />
      <Board tasks={tasks} />
    </main>
  );
}

export default App;