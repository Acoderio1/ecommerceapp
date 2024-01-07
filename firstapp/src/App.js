import "./App.css";
import Header from "./common/Header/Header";
import { GlobalContextProvider } from "./GlobalContext";
import RouterService from "./services/Routerpath";
import { BrowserRouter } from "react-router-dom";
import { Suspense, useContext } from "react";
import GlobalContext from "../src/GlobalContext";

function App() {
  return (
    <BrowserRouter>
      <GlobalContextProvider>
        <div className="mainBody">
          <Header></Header>
          <Suspense fallback={<div>Loading... </div>}>
            <RouterService></RouterService>
          </Suspense>
          {/* <Footer></Footer> */}
        </div>
      </GlobalContextProvider>
    </BrowserRouter>
  );
}

export default App;
