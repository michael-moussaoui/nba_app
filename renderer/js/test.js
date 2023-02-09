const { dialog, Menu } = require("electron");
const axios = require("axios");

const btnValidate = document.getElementById("btnValidate");
const listPlayers = document.getElementById("listPlayers");
const mainContainer = document.getElementById("mainContainer");
const rowStats = document.getElementById("trStats");

listPlayers.addEventListener("click", (e) => {
	console.log(e.target.value);
});

const searchForm = document.querySelector("#searchForm");
const inputPlayer = document.querySelector("#inputPlayer");

function searchPlayer() {
	searchForm.addEventListener("submit", (e) => {
		e.preventDefault();

		const playerName = inputPlayer.value;
		axios
			.get(
				`https://www.balldontlie.io/api/v1/players?search=${playerName}&per_page=100`
			)
			.then(async (res) => {
				const players = res.data.data;
				console.log(players);

				await getPlayerStats(players[0].id);
				await getAveragesPlayer(players[0].id);

				console.log(players[0].team.abbreviation);

				//On ajoute les joueurs trouvés au select
				let options = players;

				options.forEach((option) => {
					const newOption = document.createElement("option");

					newOption.value = option.last_name;
					newOption.text = option.first_name + " " + option.last_name;
					listPlayers.appendChild(newOption);
				});

				let output;
				players.forEach((player) => {
					const namePlayer =
						document.querySelector(".namePlayerStat");
					//Récupération du nom en abbréviation de l'équipe du joueur
					let namePlayerTeam = player.team.abbreviation;
					//Récupération du nom du joueur
					let namePlayerName =
						player.first_name + " " + player.last_name;
					console.log(player);
					output += `
					<div class="cardPlayer">
			          <div class="cardBody ">
				        <h3 id="namePlayerCard" class="text-center">${namePlayerName}</h3>
			           </div>
			         <div class="containerImg">

					 <img class="cardImg" src="./renderer/images/${namePlayerTeam}.webp"/>
					 </div>
		            </div>`;
					console.log(output);
				});

				mainContainer.innerHTML = output;
			})
			.catch((err) => console.log(err));
	});
}

searchPlayer();

async function getPlayerStats(playerId) {
	console.log(playerId);
	try {
		const response = await axios.get(
			`https://www.balldontlie.io/api/v1/stats?seasons[]=2022&player_ids[]=${playerId}&per_page=100`
		);
		{
			const playerStats = response.data.data;
			console.log(playerStats);

			return playerStats;
		}
	} catch (error) {
		console.log(error);
	}
}

getPlayerStats();

async function getAveragesPlayer(playerId) {
	console.log(playerId);
	try {
		const response = await axios.get(
			`https://www.balldontlie.io/api/v1/season_averages?seasons[]=2022&player_ids[]=${playerId}`
		);
		{
			const playerAverage = response.data.data[0];
			console.log(playerAverage);
			const ctx = document.getElementById("myChart").getContext("2d");
			const myChart = new Chart(ctx, {
				type: "bar",
				data: {
					labels: Object.keys(playerAverage),
					datasets: [
						{
							label: "Stats player",
							data: Object.values(playerAverage),
						},
					],
				},
				options: {
					backgroundColor: [
						"rgba(255, 99, 132, 0.5)", // Bar 1
						"rgba(54, 162, 235, 0.5)", // Bar 2
						"rgba(255, 206, 86, 0.5)", // Bar 3
						"rgba(75, 192, 192, 0.5)", // Bar 4
						"rgba(153, 102, 255, 0.5)", // Bar 5
						"rgba(255, 159, 64, 0.5)", // Bar 6
					],
					borderWidth: 2,
					borderColor: "black",
				},
			});

			const playersAverage = response.data.data;
			let output1 = "";
			playersAverage.forEach((player) => {
				let games = player.games_played;
				let minutes = player.min;
				let points = player.pts;
				let rebonds = player.reb;
				let assists = player.ast;

				output1 += `
				 <th>
				<td>${games}</td>
				<td>${minutes}</td>
				<td>${points}</td>
				<td>${rebonds}</td>
				<td>${assists}</td>
				</th>
				`;

				// const newStat1 = document.createElement("td");
				// const newStat2 = document.createElement("td");
				// const newStat3 = document.createElement("td");
				// const newStat4 = document.createElement("td");
				// const newStat5 = document.createElement("td");

				// newStat1.innerHTML = player.games_played;
				// newStat2.innerHTML = player.min;
				// newStat3.innerHTML = player.pts;
				// newStat4.innerHTML = player.reb;
				// newStat5.innerHTML = player.ast;
				// rowStats.appendChild(newStat1);
				// rowStats.appendChild(newStat2);
				// rowStats.appendChild(newStat3);
				// rowStats.appendChild(newStat4);
				// rowStats.appendChild(newStat5);
			});
			console.log(output1);
			rowStats.innerHTML = output1;
		}
	} catch (error) {
		console.log(error);
	}
}
getAveragesPlayer();
