import React, { useState } from "react";
import CountryForm from "./components/CountryForm";
import CountryList from "./components/CountryList";

const App = () => {
  const savedList = JSON.parse(localStorage.getItem("country-list") || []);

  const [countryList, setCountryList] = useState(savedList);

  

  return (
    <div>
      Olympic
      <CountryForm countryList={countryList} setCountryList={setCountryList} />
      <CountryList
        savedList={savedList}
        countryList={countryList}
        setCountryList={setCountryList}
      />
    </div>
  );
};

export default App;
