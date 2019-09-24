const axios = require('axios');

const getExchangeRate = async (to) => {
  try{
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=808d01a8be95b1d0f598c708732635fe&format=1');
    const rate  = response.data.rates[to];

    if(rate){
      return rate;
    } else {
      throw new Error();
    }
  } catch(e){
    throw new Error(`Unable to get exchange`);
  }
};

const getCountries = async (currencyCode) => {
  try{
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    return response.data.map((country) => country.name);
  }catch(e){
    throw new Error(`Unable to get countries that use ${currencyCode}`);
  }
};

const convertCurrency = async (to, amount) => {
  const countries = await getCountries(to);
  const rate = await getExchangeRate(to);
  const exchangedAmount = amount * rate;

  return `${amount} EUR is worth ${exchangedAmount} ${to}. ${to} can be used in the following countires : ${countries.join(', ')}`;
}

convertCurrency('INR', 100).then((status) => {
  console.log(status);
}).catch((e) => {
  console.log(e);
});
