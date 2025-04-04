import { useTheme } from "../context/ThemeContext";
import "./../styles/Theme.css"; // Import CSS

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`theme-container ${theme}`}>
      <h2>{theme === "light" ? "Light Mode ☀️" : "Dark Mode 🌙"}</h2>
      <button onClick={toggleTheme}>
        {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
      </button>
    </div>
  );
};

export default ThemeToggle;
