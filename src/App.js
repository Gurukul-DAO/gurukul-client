import "./App.css";
import TopBar from "./components/TopBar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./Theme";
import { BrowserRouter } from "react-router-dom";
import Routes from "./common/RouteList";
import { MoralisProvider } from "react-moralis";
import { moralisServerUrl, moralisAppId } from "./credentials"
import LoginBoundary from "./common/LoginBoundary";

function App() {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <BrowserRouter>
            <MoralisProvider appId={moralisAppId} serverUrl={moralisServerUrl}>
              <TopBar />
              <LoginBoundary>
                <Routes />
              </LoginBoundary>
            </MoralisProvider>
          </BrowserRouter>
        </CssBaseline>
      </ThemeProvider>
    </div>
  );
}

export default App;
