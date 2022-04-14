import react, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState({});

  const apiKey = process.env.REACT_APP_API_KEY;

  const keyPress = (e) => {
    if (e.key === "Enter") {
      setInput("");
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=imperial&appid=${apiKey}`
        )
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="App">
      <div className="overlay">
        <input
          type="text"
          placeholder="Enter city..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={keyPress}
        ></input>
        <div className="date">{data.main ? <h1>{Date()}</h1> : null}</div>
        <div className="city">
          {data.sys ? <h1>{`${data.name}, ${data.sys.country}`}</h1> : null}
        </div>
        <div className="temp">
          {data.main ? <h1>{Math.round(data.main.temp)}°F</h1> : null}
        </div>
        <div className="min-max">
          {data.main ? (
            <h1>{`MAX ${Math.round(data.main.temp_max)}°F / MIN ${Math.round(
              data.main.temp_min
            )}°F`}</h1>
          ) : null}
        </div>

        {data.main != undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? <h1>{data.main.feels_like}°F</h1> : null}
              <h1>Feels Like</h1>
            </div>
            <div className="humidity">
              {data.main ? <h1>{data.main.humidity}%</h1> : null}
              <h1>Humidity</h1>
            </div>
            <div className="wind">
              {data.wind ? <h1>{data.wind.speed} MPH</h1> : null}
              <h1>Wind Speed</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
