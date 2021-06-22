'use strict';
const searchInput = document.getElementById('search-input');
const searchbtn = document.getElementById('search-btn');
const container = document.getElementById('container');
/////////////////////////
const errorMessage = function (msg) {
  container.innerHTML = '';
  container.insertAdjacentText('afterbegin', msg);
};

/////////////////////////
async function getId(player) {
  try {
    const response = await fetch(
      `https://www.balldontlie.io/api/v1/players?search=${player}`
    );
    // prettier-ignore
    const { data: { 0: data } } = await response.json();
    getStats(data.id, data);
  } catch (error) {
    errorMessage('😡 oops did not match any players !');
    console.log(error.message);
  }
}

/////////////////////////
async function getStats(idnum, data) {
  const dataV1 = data;
  container.innerHTML = '';

  try {
    const response = await fetch(
      `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${idnum}`
    );

    // prettier-ignore
    const { data: { 0: data } } = await response.json();
    renderData(data, dataV1);
  } catch (error) {
    errorMessage('Enter Full Name !');
    console.log(error.message);
  }
}

/////////////////////////

searchbtn.addEventListener('click', function () {
  getId(searchInput.value);
  searchInput.value = '';
});

const renderData = function (data, dataV1) {
  container.innerHTML = '';
  // prettier-ignore
  container.insertAdjacentHTML('afterbegin',
  `
  <div class="card">
  <h3 class="player-name">${dataV1.first_name} ${dataV1.last_name}</h3>
  <div class="player-id">
    <span class="player-pos">${dataV1.position}</span>
    <span class="player-team">${dataV1.team.full_name}</span>
  </div>
  <div class="key-stats">
  <div>
      <span class="stats-label">GP</span>
      <span>${data.games_played}</span>
    </div>
    <div>
      <span class="stats-label">MIN</span>
      <span>${data.min}</span>
    </div>
    <div>
      <span class="stats-label">Pts</span>
      <span>${data.pts}</span>
    </div>
    <div>
      <span class="stats-label">Reb</span>
      <span>${data.reb}</span>
    </div>
    <div>
      <span class="stats-label">Ast</span>
      <span>${data.ast}</span>
    </div>
    <div>
      <span class="stats-label">Stl</span>
      <span>${data.stl}</span>
    </div>
    <div>
      <span class="stats-label">Blk</span>
      <span>${data.blk}</span>
    </div>
    <div>
      <span class="stats-label">FGA</span>
      <span>${data.fga}</span>
    </div>
    <div>
      <span class="stats-label">FGM</span>
      <span>${data.fgm}</span>
    </div>
    <div>
      <span class="stats-label">FG%</span>
      <span>${data.fg_pct}</span>
    </div>
    <div>
      <span class="stats-label">3PA</span>
      <span>${data.fg3a}</span>
    </div>
    <div>
      <span class="stats-label">3PM</span>
      <span>${data.fg3m}</span>
    </div>
    <div>
      <span class="stats-label">3P%</span>
      <span>${data.fg3_pct}</span>
    </div>
    <div>
      <span class="stats-label">FTA</span>
      <span>${data.fta}</span>
    </div>
    <div>
      <span class="stats-label">FTM</span>
      <span>${data.fgm}</span>
    </div>
    <div>
      <span class="stats-label">FT%</span>
      <span>${data.ft_pct}</span>
    </div>
  </div>
</div>
`);
};
