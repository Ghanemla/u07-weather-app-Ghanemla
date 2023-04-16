import "./App.css";
import LocationProvider from "./components/GetCurrentLocation";

function App() {
  return (
    <div className="App">
      <h1>Du befinner dig i</h1>
      <LocationProvider />
    </div>
  );
}

export default App;
