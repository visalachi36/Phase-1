import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import "./styles.css"; // Import global styles

function App() {
  return (
    <ThemeProvider>
      <div className="app-container">
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
}

export default App;
