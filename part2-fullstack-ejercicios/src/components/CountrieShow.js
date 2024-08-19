const CountrieShow = ({countriesToShow}) => {
    return (
      <div>
        <ul>
            { countriesToShow.map((country, index) => (
            <li key={index}>
                {country.name.common}
            </li>
        ))}
        </ul>
      </div>  
    );
}

export default CountrieShow