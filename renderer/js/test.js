const { dialog, Menu } = require("electron");
const axios = require("axios");
const { log } = require("builder-util");

const h1 = document.querySelector("text-center");
const btnValidate = document.getElementById("btnValidate");
const listPlayers = document.getElementById("listPlayers");
// const cardPlayer = document.querySelector(".cardPlayer");
const resultContainer = document.getElementById("resultContainer");
const mainContainer = document.getElementById("mainContainer");
const swiper = document.querySelector(".mySwiper");
const rowStats = document.getElementById("trStats");
const firstTd = document.querySelector(".firstTd");
let namePlayer = document.querySelector(".namePlayerStat");

let myChart = null;
let myChartRebounds = null;
let myChartAssists = null;

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
				let namePlayerName = "";
				players.forEach((player) => {
					//Récupération du nom en abbréviation de l'équipe du joueur
					let namePlayerTeam = player.team.abbreviation;
					//Récupération du nom du joueur
					namePlayerName = `${player.first_name} ${player.last_name}`;
					console.log(namePlayerName);
					console.log(player);
					output += `
					<swiper-slide>
					<div class="cardPlayer">
			          <div class="cardBody ">
				        <h3 id="namePlayerCard" class="text-center">${namePlayerName}</h3>
			           </div>
			         <div class="containerImg">

					 <img class="cardImg" src="./renderer/images/${namePlayerTeam}.webp"/>
					 </div>
		            </div>
					</swiper-slide>`;

					const cardPlayer = document.querySelector(".cardPlayer");
					// cardPlayer.addEventListener("click", () => {
					// 	console.log("test");
					// });
					console.log(cardPlayer);
				});

				// mainContainer.innerHTML = output;
				swiper.innerHTML = output;

				console.log(namePlayerName);

				resultContainer.innerHTML = namePlayerName;

				//namePlayer.appendChild(namePlayerName);
				// namePlayer = document.createTextNode(namePlayerName);
			})
			.catch((err) => console.log(err));
	});
}

searchPlayer();

async function getPlayerStats(playerId) {
	console.log(playerId);
	try {
		const response = await axios.get(
			`https://www.balldontlie.io/api/v1/stats?seasons[]=2022&player_ids[]=${playerId}&per_page=20`
		);
		{
			const playerStats = response.data.data;

			console.log(playerStats);

			const listPoints = playerStats.map((stat) => stat.pts);
			const listRebounds = playerStats.map((stat) => stat.reb);
			const listAssists = playerStats.map((stat) => stat.ast);
			const listDates = playerStats.map((stat) =>
				// Suppression du format heure avec la methode slice pour garder uniquement la date
				stat.game.date.slice(0, -14)
			);

			console.log(listPoints);
			console.log(listRebounds);
			console.log(listAssists);
			console.log(listDates);

			const ctx = document.getElementById("myChart").getContext("2d");
			if (myChart != null) {
				myChart.destroy();
			}

			myChart = new Chart(ctx, {
				type: "line",
				data: {
					labels: listDates,
					datasets: [
						{
							label: "Points player",
							data: listPoints,
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
			const ctxR = document
				.getElementById("myChartRebounds")
				.getContext("2d");
			if (myChartRebounds != null) {
				myChartRebounds.destroy();
			}

			myChartRebounds = new Chart(ctxR, {
				type: "line",
				data: {
					labels: listDates,
					datasets: [
						{
							label: "Rebounds player",
							data: listRebounds,
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

			const ctxA = document
				.getElementById("myChartAssists")
				.getContext("2d");
			if (myChartAssists != null) {
				myChartAssists.destroy();
			}
			myChartAssists = new Chart(ctxA, {
				type: "line",
				data: {
					labels: listDates,
					datasets: [
						{
							label: "Assists player",
							data: listAssists,
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
			// const ctx = document.getElementById("myChart").getContext("2d");
			// if (myChart != null) {
			// 	myChart.destroy();
			// }

			// myChart = new Chart(ctx, {
			// 	type: "bar",
			// 	data: {
			// 		labels: Object.keys(playerAverage),
			// 		datasets: [
			// 			{
			// 				label: "Stats player",
			// 				data: Object.values(playerAverage),
			// 			},
			// 		],
			// 	},
			// 	options: {
			// 		backgroundColor: [
			// 			"rgba(255, 99, 132, 0.5)", // Bar 1
			// 			"rgba(54, 162, 235, 0.5)", // Bar 2
			// 			"rgba(255, 206, 86, 0.5)", // Bar 3
			// 			"rgba(75, 192, 192, 0.5)", // Bar 4
			// 			"rgba(153, 102, 255, 0.5)", // Bar 5
			// 			"rgba(255, 159, 64, 0.5)", // Bar 6
			// 		],
			// 		borderWidth: 2,
			// 		borderColor: "black",
			// 	},
			// });

			const playersAverage = response.data.data;
			let output1 = "";
			playersAverage.forEach((player) => {
				let games = player.games_played;
				let minutes = player.min;
				let points = player.pts;
				let rebonds = player.reb;
				let assists = player.ast;

				output1 += `
				
				<td>${games}</td>
				<td>${minutes}</td>
				<td>${points}</td>
				<td>${rebonds}</td>
				<td>${assists}</td>
				
				`;
			});

			rowStats.innerHTML = output1;
			console.log(output1);
		}
	} catch (error) {
		console.log(error);
	}
}
getAveragesPlayer();

h1.addEventListener("click", () => {
	console.log("test");
});
