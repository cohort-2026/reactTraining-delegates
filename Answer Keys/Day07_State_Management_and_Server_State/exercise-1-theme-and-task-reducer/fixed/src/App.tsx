import { ThemeProvider } from "./context/ThemeProvider";
import { Header } from "./components/Header";
import { Board } from "./components/Board";

export default function App() {
  return (
    <ThemeProvider>
      <Header />
      <main>
        <Board />
      </main>
    </ThemeProvider>
  );
}
