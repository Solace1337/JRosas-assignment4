import React, {useState} from 'react' 
import AddressBar from "./components/AddressBar";
import NavBar from "./components/NavBar";
import { getLatLongForAddress } from "./geocode";
import "./main.css";
import { Forecast } from "./types";
import getForecast from "./forecast";

function App() {
  const [forecast, setForecast] = useState<Forecast | null>(null);
  async function AddressSubmit(address:string) {
    try{
      const {lat, long} = await getLatLongForAddress(address);
        const weather = await getForecast(lat, long);
        setForecast(weather);

    }
    catch(error){
      alert('error: ${error.message}');
    }
    
  }

  return (
    <div className = "con">
      <NavBar></NavBar>
      <AddressBar onAddressSubmit={async (address) => await AddressSubmit(address)} />

      {forecast && (<div>
        <h2 style = {{color: "blue"}}>
          Weather for {forecast.properties.periods[0].name}</h2>
          <div className = "forecastcon">
            {forecast.properties.periods.slice(0,7).map((period) => (<div key={period.number} className= 'castItem'>
              <p>{period.name}</p>
              <p>Temp: {period.temperature} {period.temperatureUnit}</p>
              <img src={period.icon} alt={period.shortForecast}/>
              </div>


              ))}
            </div>
      </div>
      )}
    </div>
    
  );
}

export default App;
