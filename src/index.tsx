import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "./assets/styles/global";
import { Provider } from "react-redux";
import store from "./modules/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "styled-components";
import { theme } from "./assets/styles/theme";

const persistor = persistStore(store);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GlobalStyle />
          <App />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </BrowserRouter>
);

reportWebVitals();
