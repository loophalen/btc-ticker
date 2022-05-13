import { useEffect, useState } from "react";

//async function calls the btcUrl - API
//fetch returns a promise await waits for the promise to be returned
//return returns the promise

const btcUrl = `https://api.polygon.io/v1/last/crypto/BTC/USD?apiKey=${process.env.REACT_APP_API_KEY}`;

async function getBtc() {
  const response = await fetch(btcUrl);
  return response.json();
}

//useState returns a stateful value and the getLatestPrice function updates it

function App() {
  const [price, setPrice] = useState("moon or doom...");
  const [symbol, setSymbol] = useState(null);
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  //useEffect allows to call a function when an event happens

  useEffect(() => {
    let timeoutId;
    async function getLatestPrice() {
      const data = await getBtc();
      console.log(process.env);
      // console.log(data);
      // const btc = data.last.price;
      // console.log(btc);
      setPrice(
        data.last.price.toLocaleString("en-US", { minimumFractionDigits: 2 })
      );
      setSymbol(data.symbol);
      timeoutId = setTimeout(getLatestPrice, 3000);
    }

    timeoutId = setTimeout(getLatestPrice, 3000);

    //disposal function for timeout
    //clearTimeout() method cancels a timeout previously established by calling setTimeout()
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div>
      <div className="title">Current Price of Bitcoin</div>
      <div className="price">${price}</div>
      <div className="symbol">{symbol}</div>
      <div className="date">{date}</div>
      <div className="time">{time}</div>
    </div>
  );
}

export default App;
