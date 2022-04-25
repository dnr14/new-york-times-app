import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "./assets/styles/global";
import GlobalFonts from "./assets/styles/fonts";
import { Provider } from "react-redux";
import store from "./modules/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
const persistor = persistStore(store);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyle />
        <GlobalFonts />
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);

reportWebVitals();
