// const { dialog, Menu } = require("electron");
const axios = require("axios");
const { log } = require("builder-util");

const listPlayers = document.getElementById("listPlayers");
const resultContainer = document.getElementById("resultContainer");
const mainContainer = document.getElementById("mainContainer");
const swiper = document.querySelector(".mySwiper");
const rowStats = document.getElementById("trStats");
const ball = document.querySelector(".ball");
const cursor = document.querySelector(".cursor");
const cursorBis = document.querySelector(".cursorBis");
const searchForm = document.querySelector("#searchForm");
const inputBox = document.querySelector(".inputBox");
const inputPlayer = document.querySelector("#inputPlayer");

const options = {
	fullScreen: {
		zIndex: 0,
	},
	background: {
		color: "rgb(33, 33, 33)", // the canvas background color
	},
	interactivity: {
		events: {
			onClick: {
				// this handles the mouse click event
				enable: true,
				mode: "push", // this adds particles
			},
			onHover: {
				// this handles the mouse hover event
				enable: true,
				mode: "repulse", // this make particles move away from the mouse
			},
		},
		modes: {
			push: {
				quantity: 6, // number of particles to add
			},
			repulse: {
				distance: 100, // the distance of the particles from the mouse
			},
		},
	},
	particles: {
		links: {
			enable: true, // this enables links between particles
			opacity: 0.3,
			distance: 190,
		},
		number: {
			value: 90,
		},
		color: {
			value: ["#4361ee"],
		},
		move: {
			enable: true, // this makes particles move
			speed: { min: 1, max: 3 }, // this is the speed of the particles
		},
		opacity: {
			value: { min: 0.3, max: 0.7 }, // this sets the opacity of the particles
		},
		size: {
			value: { min: 1, max: 3 }, // this sets the size of the particles
		},
	},
};

// let toast = Toastify({
// 	text: "Manqué... retente ta chance !",
// 	duration: 2000,
// 	style: {
// 		background:
// 			"linear-gradient(to right, rgba(31, 55, 171, 1), rgba(67, 97, 238, 1) ) ",
// 	},
// });

let namePlayer = document.querySelector(".namePlayerStat");
let myChart = null;
let myChartRebounds = null;
let myChartAssists = null;

tsParticles.load("tsparticles", options);

// Cursor animation
document.addEventListener("mousemove", (e) => {
	cursor.setAttribute(
		"style",
		`top: ${e.pageY}px ; left: ${e.pageX}px`
	);
});

function searchPlayer() {
	searchForm.addEventListener("submit", (e) => {
		e.preventDefault();
		ball.classList.add("activeBall");
		setTimeout(() => {
			ball.classList.add("rollBall");
			ball.classList.remove("activeBall");
		}, 1000);
		setTimeout(() => {
			ball.classList.remove("rollBall");
		}, 2500);

		const playerName = inputPlayer.value;
		axios
			.get(
				`https://www.balldontlie.io/api/v1/players?search=${playerName}&per_page=100`
			)
			.then(async (res) => {
				const players = res.data.data;
				console.log(players);
				//vérifie si la recherche ne renvoie pas un tableau vide
				if (players.length === 0) {
					inputPlayer.classList.add("shake-horizontal");
					setTimeout(() => {
						inputPlayer.value = "";
						inputPlayer.classList.remove("shake-horizontal");
					}, 1500);
				}
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
				let playerId;
				let namePlayerName = "";
				let allNamesPlayerName = [];
				players.forEach((player) => {
					//Récupération du nom en abbréviation de l'équipe du joueur
					let namePlayerTeam = player.team.abbreviation;
					//Récupération du nom du joueur
					namePlayerName = `${player.first_name}  ${player.last_name}`;
					playerId = `${player.id}`;
					console.log(namePlayerName);
					console.log(player);

					output += `
					<swiper-slide>
					<div class="cardPlayer">
			          <div class="cardBody ">
				        <h3 class="namePlayerCard">${namePlayerName}</h3>
						<p class="idPlayer" >${playerId}</p>
			           </div>
			         <div class="containerImg">

					 <img class="cardImg" src="./renderer/images/${namePlayerTeam}.webp"/>
					 </div>
		            </div>
					</swiper-slide>`;

					const cardPlayer = document.querySelector(".cardPlayer");
				});
				console.log(allNamesPlayerName);

				swiper.innerHTML = output;
			})
			.catch((err) => console.log(err));
	});
}

searchPlayer();

async function getPlayerStats(cardClicked) {
	try {
		const response = await axios.get(
			`https://www.balldontlie.io/api/v1/stats?seasons[]=2022&player_ids[]=${cardClicked}`
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

			// CHART points marqués par match sur une période prédéfinie
			const ctx = document.getElementById("myChart").getContext("2d");
			//Vérifie si un graphique existe
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
							color: "#4361ee",
						},
					],
				},
				options: {
					backgroundColor: [
						"rgba(67, 97, 238, 1)", // Bar 1
						"rgba(255, 99, 132, 1)", // Bar 2
						"rgba(255, 206, 86, 1)", // Bar 3
						"rgba(75, 192, 192, 1)", // Bar 4
						"rgba(153, 102, 255, 1)", // Bar 5
						"rgba(255, 159, 64, 1)", // Bar 6
					],
					borderWidth: 2,
					borderColor: "black",
					plugins: {
						legend: {
							labels: {
								color: "#4361ee",
								font: {
									size: 14,
								},
							},
						},
					},
					scales: {
						y: {
							ticks: {
								color: "#fff",
							},
						},
						x: {
							ticks: {
								color: "#4361ee",
							},
						},
					},
				},
			});

			// CHART rebonds par match sur une période prédéfinie
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
						"rgba(67, 97, 238, 1)", // Bar 1
						"rgba(255, 99, 132, 1)", // Bar 2
						"rgba(255, 206, 86, 1)", // Bar 3
						"rgba(75, 192, 192, 1)", // Bar 4
						"rgba(153, 102, 255, 1)", // Bar 5
						"rgba(255, 159, 64, 1)", // Bar 6
					],
					borderWidth: 2,
					borderColor: "black",
					plugins: {
						legend: {
							labels: {
								color: "#4361ee",
								font: {
									size: 14,
								},
							},
						},
					},
					scales: {
						y: {
							ticks: {
								color: "#fff",
							},
						},
						x: {
							ticks: {
								color: "#4361ee",
							},
						},
					},
				},
			});

			// CHART passes décisives par match sur une période prédéfinie
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
						"rgba(67, 97, 238, 1)", // Bar 1
						"rgba(255, 99, 132, 1)", // Bar 2
						"rgba(255, 206, 86, 1)", // Bar 3
						"rgba(75, 192, 192, 1)", // Bar 4
						"rgba(153, 102, 255, 1)", // Bar 5
						"rgba(255, 159, 64, 1)", // Bar 6
					],
					borderWidth: 2,
					borderColor: "black",
					plugins: {
						legend: {
							labels: {
								color: "#4361ee",
								font: {
									size: 14,
								},
							},
						},
					},
					scales: {
						y: {
							ticks: {
								color: "#fff",
							},
						},
						x: {
							ticks: {
								color: "#4361ee",
							},
						},
					},
				},
			});

			return playerStats;
		}
	} catch (error) {
		console.log(error);
	}
}

getPlayerStats();

function addPlayerAverages() {
	// Ajoute la carte cliquée dans le tableau des moyennes de la saison en cours
	document.addEventListener("click", (e) => {
		const cardClicked = e.path[1].children[0].children[1].innerText;
		const cardNamePlayer =
			e.path[1].children[0].children[0].innerText;
		console.log(cardClicked);

		axios
			.get(
				`https://www.balldontlie.io/api/v1/season_averages?seasons[]=2022&player_ids[]=${cardClicked}`
			)
			.then(async (response) => {
				await getPlayerStats(cardClicked);
				const playerAverage = response.data.data[0];
				console.log(playerAverage);
				const playersAverage = response.data.data;
				console.log(playerAverage);
				let output1 = ``;
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
				resultContainer.innerHTML = cardNamePlayer;
				console.log(output1);
			})
			.catch((err) => console.log(err));
	});
}

addPlayerAverages();
