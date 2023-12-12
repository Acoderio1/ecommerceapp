import './App.css';
import Header from './common/Header/Header'
import { GlobalContextProvider } from "./GlobalContext";

function App() {
  return (
    <GlobalContextProvider>
      <div className="mainBody">
        <Header></Header>
        {/* <RouterService></RouterService> */}
        {/* <Footer></Footer> */}
      </div>
    </GlobalContextProvider>

  );
}

export default App;
