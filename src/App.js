import "./App.css";
import TopBar from "./components/TopBar";
import { ThemeProvider } from "@mui/material";
import { theme } from "./Theme";
import { BrowserRouter } from "react-router-dom";
import Routes from "./common/RouteList";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <TopBar />
          <Routes />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
