import "./App.css";
import TopBar from "./components/TopBar";
import { ThemeProvider } from "@mui/material";
import { theme } from "./Theme";
import { BrowserRouter } from "react-router-dom";
import Routes from "./common/RouteList";
import { MoralisProvider } from "react-moralis";
import { moralisServerUrl, moralisAppId } from "./credentials"

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <MoralisProvider appId={moralisAppId} serverUrl={moralisServerUrl}>
            <TopBar />
            <Routes />
          </MoralisProvider>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
