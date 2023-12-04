import "./App.css";
import RouterService from "./services/Routerpath";
import Header from "./common/Header/Header";
// import Footer from "./common/Footer";


function App() {
  return (
    <div className="mainBody">
      <Header></Header>
      <RouterService></RouterService>
      {/* <Footer></Footer> */}
    </div>
  );
}

export default App;
