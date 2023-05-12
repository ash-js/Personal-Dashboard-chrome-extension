fetch(
  'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature'
)
  .then((res) => res.json())
  .then((data) => {
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    document.getElementById('author').textContent = `By: ${data.user.name}`;
  });
const getCoins = async () => {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/coins/dogecoin');
    const data = await res.json();
    // console.log(data);
    const coinTop = document.querySelector('#coin-top');
    coinTop.innerHTML = `<img src=${data.image.small}>
    <span>${data.name}</span>`;
    const coinBottom = document.querySelector('#coin-bottom');
    coinBottom.innerHTML = `<p>🎯 current price: $${data.market_data.current_price.usd}</p>
    <p>👆 high price: $${data.market_data.high_24h.usd}</p>
    <p>👇 low price: $${data.market_data.low_24h.usd}</p>`;
  } catch (err) {
    console.error(err);
  }
};
navigator.geolocation.getCurrentPosition((position) => {
  // console.log(position);
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&&lon=${position.coords.longitude}&&units=metric`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error('Weather data not available');
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      const weather = document.querySelector('#weather');
      weather.innerHTML = `<img src=${iconUrl}>
      <p class='weather-temp'>${Math.round(data.main.temp)}</p>
      <p class='weather-city'>${data.name}</p>`;
    })
    .catch((err) => console.error(err));
});
// const getLocation = async () => {
//   const position = await navigator.geolocation.getCurrentPosition();
//   console.log(position);
// };
// getLocation();

// Set time
const time = document.querySelector('.time');
const setTime = () => {
  const d = new Date();
  time.textContent = d.toLocaleTimeString('en-au', { timeStyle: 'short' });
};
setInterval(setTime, 1000);

// start the app
getCoins();
