import React from "react";

const CountryList = ({ savedList, countryList, setCountryList }) => {
  const onClickDeleteCountry = (id) => {
    const newCountryList = countryList.filter((country) => country.id !== id);
    setCountryList(newCountryList);
    localStorage.setItem(
      "country-list",
      JSON.stringify(newCountryList.sort((a, b) => b.gold - a.gold))
    );
  };

  const onClickSortGold = () => {
    const sortCountryList = [...countryList].sort((a, b) => b.gold - a.gold);
    setCountryList(sortCountryList);
    localStorage.setItem("country-list", JSON.stringify(sortCountryList));
  };

  const onClickSortTotal = () => {
    const sortCountryList = [...countryList].sort(
      (a, b) => b.totalSum - a.totalSum
    );
    setCountryList(sortCountryList);
    localStorage.setItem("country-list", JSON.stringify(sortCountryList));
  };

  return (
    <div>
      <div>
        {savedList.length === 0 ? (
          "추가된 국가가 없습니다."
        ) : (
          <ul>
            <button onClick={onClickSortGold}>금메달 순서</button>
            <button onClick={onClickSortTotal}>총합 순서</button>
            {savedList.map((country) => (
              <li key={country.id}>
                국가명 : {country.countryName} 금메달 : {country.gold} 은메달 :
                {country.silver} 동메달 : {country.bronze} 총합 :{" "}
                {country.totalSum}
                <button
                  onClick={() => {
                    onClickDeleteCountry(country.id);
                  }}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CountryList;
