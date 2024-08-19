const CountryDetails = ({ country }) => {
    return (
      <div>
        <h3>{country.name.common}</h3>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <p>Region: {country.region}</p>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} style={{ width: '150px' }} />
      </div>
    );
  };
  
  export default CountryDetails;