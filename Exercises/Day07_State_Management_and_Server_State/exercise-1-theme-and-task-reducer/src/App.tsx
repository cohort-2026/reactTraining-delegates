import { ThemeProvider } from "./context/ThemeProvider";
import { Header } from "./components/Header";
import { Board } from "./components/Board";

export default function App() {
  return (
    <>
      <Header />
      <ThemeProvider>
        <main>
          <Board />
        </main>
      </ThemeProvider>
    </>
  );
}
