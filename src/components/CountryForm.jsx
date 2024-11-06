import React, { useState } from "react";

const CountryForm = ({ countryList, setCountryList }) => {
  const [countryName, setCountryName] = useState("");
  const [gold, setGold] = useState(0);
  const [silver, setSilver] = useState(0);
  const [bronze, setBronze] = useState(0);

  const init = () => {
    setCountryName("");
    setGold(0);
    setSilver(0);
    setBronze(0);
  };

  const onChangeCountryName = (e) => {
    setCountryName(e.target.value);
  };

  const onChangeGold = (e) => {
    setGold(Number(e.target.value));
  };

  const onChangeSviler = (e) => {
    setSilver(Number(e.target.value));
  };

  const onChangeBronze = (e) => {
    setBronze(Number(e.target.value));
  };

  const onSubmitCountryList = (e) => {
    if (countryList.some((country) => country.countryName === countryName)) {
      e.preventDefault();
      alert("이미 추가된 국가입니다.");
      init();
      return;
    }
    e.preventDefault();
    const totalSum = gold + silver + bronze;
    const newCountry = {
      id: new Date().getTime(),
      countryName,
      gold,
      silver,
      bronze,
      totalSum,
    };
    setCountryList(
      [...countryList, newCountry].sort((a, b) => b.gold - a.gold)
    );
    localStorage.setItem(
      "country-list",
      JSON.stringify(
        [...countryList, newCountry].sort((a, b) => b.gold - a.gold)
      )
    );
    init();
  };

  const onClickUpdateCountryList = () => {
    if (countryList.some((country) => country.countryName === countryName)) {
      const updateCountryList = countryList
        .map((country) => {
          if (country.countryName === countryName) {
            let sum = 0;
            sum += gold !== 0 && country.gold !== gold ? gold : country.gold;
            sum +=
              silver !== 0 && country.silver !== silver
                ? silver
                : country.silver;
            sum +=
              bronze !== 0 && country.bronze !== bronze
                ? bronze
                : country.bronze;
            return {
              ...country,
              countryName:
                countryName !== "" ? country.countryName : countryName,
              gold: gold !== 0 && country.gold !== gold ? gold : country.gold,
              silver:
                silver !== 0 && country.silver !== silver
                  ? silver
                  : country.silver,
              bronze:
                bronze !== 0 && country.bronze !== bronze
                  ? bronze
                  : country.bronze,
              totalSum: sum,
            };
          } else {
            return country;
          }
        })
        .sort((a, b) => b.gold - a.gold);
      setCountryList(updateCountryList);
      localStorage.setItem(
        "country-list",
        JSON.stringify(updateCountryList.sort((a, b) => b.gold - a.gold))
      );
    } else {
      alert("국가 정보가 없습니다.");
      init();
      return;
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitCountryList}>
        국가명 :{" "}
        <input type="text" value={countryName} onChange={onChangeCountryName} />
        금메달 : <input type="number" value={gold} onChange={onChangeGold} />
        은메달 :{" "}
        <input type="number" value={silver} onChange={onChangeSviler} />
        동메달 :{" "}
        <input type="number" value={bronze} onChange={onChangeBronze} />
        <button type="submit">국가 추가</button>
        <button type="button" onClick={onClickUpdateCountryList}>
          업데이트
        </button>
      </form>
    </div>
  );
};

export default CountryForm;
