import "./App.css";
import Header from "./common/Header/Header";
import { GlobalContextProvider } from "./GlobalContext";
import RouterService from "./services/Routerpath";
import { BrowserRouter, Outlet } from "react-router-dom";
import { Suspense } from "react";

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
