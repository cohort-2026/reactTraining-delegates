import { ThemeProvider } from "./context/ThemeProvider";
import { Header } from "./components/Header";
import { Board } from "./components/Board";

export default function App() {
  // Bug 1: Header uses useTheme, so it must sit inside ThemeProvider.
  return (
    <ThemeProvider>
      <Header />
      <main>
        <Board />
      </main>
    </ThemeProvider>
  );
}
