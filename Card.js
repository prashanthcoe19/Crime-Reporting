import React from "react";
import CountUp from "react-countup";

const Card = ({
  stats: { cases, active, deaths, recovered, todayCases, todayDeaths },
}) => {
  return (
    <div class="container">
      <div class="row mt-4">
        <div class="col-sm">
          <div
            class="card text-white bg-dark mb-3 mt-4"
            style={{ width: "18rem" }}
          >
            <div class="card-body">
              <h5 class="card-title">Total Cases</h5>
              <p class="card-text">{cases}</p>
            </div>
          </div>
        </div>
        <div class="col-sm">
          <div
            class="card text-white bg-dark mb-3 mt-4"
            style={{ width: "18rem" }}
          >
            <div class="card-body">
              <h5 class="card-title">Active Cases</h5>
              <p class="card-text">{active}</p>
            </div>
          </div>
        </div>
        <div class="col-sm">
          <div
            class="card text-white bg-dark mb-3 mt-4"
            style={{ width: "18rem" }}
          >
            <div class="card-body">
              <h5 class="card-title">Total Deaths</h5>
              <p class="card-text">{deaths}</p>
            </div>
          </div>
        </div>

        <div class="col-sm">
          <div
            class="card text-white bg-dark mb-3 mt-4"
            style={{ width: "18rem" }}
          >
            <div class="card-body">
              <h5 class="card-title">Recovered</h5>
              <p class="card-text">{recovered}</p>
            </div>
          </div>
        </div>
        <div class="col-sm">
          <div
            class="card text-white bg-dark mb-3 mt-4"
            style={{ width: "18rem" }}
          >
            <div class="card-body">
              <h5 class="card-title">Today Cases</h5>
              <p class="card-text">{todayCases}</p>
            </div>
          </div>
        </div>
        <div class="col-sm">
          <div
            class="card text-white bg-dark mb-3 mt-4"
            style={{ width: "18rem" }}
          >
            <div class="card-body">
              <h5 class="card-title">Today Deaths</h5>
              <p class="card-text">{todayDeaths}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
