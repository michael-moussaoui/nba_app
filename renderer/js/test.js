const axios = require("axios");

// // 1. GET request using fetch()
// fetch("https://www.balldontlie.io/api/v1/players")
// 	// Converting received data to JSON
// 	.then((response) => response.json())
// 	.then((json) => {
// 		// 2. Create a variable to store HTML table headers
// 		let li = `<tr><th>ID</th><th>first_name</th><th>height_feet</th><th>height_inches</th> <th>last_name</th><th>position</th><th>im lazy...</th></tr>`;
// 		console.log(json.data);
// 		// 3. Loop through each data and add a table row
// 		console - console.log(json.data);
// 		json.data.forEach((user) => {
// 			li += `<tr>
//         <td>${user.id}</td>
//         <td>${user.first_name} </td>
//         <td>${user.height_feet}</td>
//         <td>${user.height_inches}</td>
//         <td>${user.last_name}</td>
//         <td>${user.position}</td>
//         <td>${user.team.id}</td>
//         <td>${user.team.abbreviation}</td>
//         <td>${user.team.city}</td>
//         <td>${user.team.conference}</td>
//         <td>${user.team.division}</td>
//         <td>${user.team.full_name}</td>
//         <td>${user.team.name}</td>
//       </tr>`;
// 		});

// 		// 4. DOM Display result
// 		document.getElementById("users").innerHTML = li;
// 	});

// const playerId = "237";
// const apiKey = "your_api_key";
// const endpoint = `https://www.balldontlie.io/api/v1/stats?player_ids[]=${playerId}&start_date=2022-10-20&end_date=2023-01-01`;

// fetch(endpoint, {
// 	headers: {
// 		Accept: "application/json",
// 		Authorization: `Bearer ${apiKey}`,
// 	},
// })
// 	.then((response) => response.json())
// 	.then((data) => {
// 		const datas = data.data;
// 		const listPoints = datas.map((data) => data.pts);
// 		const listRebounds = datas.map((data) => data.reb);
// 		const listAssists = datas.map((data) => data.ast);

// 		console.log(datas);
// 		console.log(listPoints);
// 		console.log(listRebounds);
// 		console.log(listAssists);
// 	})
// 	.catch((error) => {
// 		console.error(error);
// 	});
// Veuillez noter que vous devez remplacer playerId par l'ID du joueur pour lequel vous souhaitez obtenir les données et apiKey par votre propre clé d'API. De plus, vous pouvez ajuster les dates de début et de fin en fonction de la période pour laquelle vous souhaitez obtenir les données.

// async function getPlayersStats(playerId) {
// 	console.log(playerId);
// 	try {
// 		const response = await axios.get(
// 			`https://www.balldontlie.io/api/v1/stats?player_ids[]=237&start_date=2022-10-01&end_date=2023-06-01&group[]=game.id&sum[]=pts `
// 		);
// 		{
// 			const playerStats = response.data.data;
// 			console.log(playerStats);

// 			return playerStats;
// 		}
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

// getPlayersStats();

// const { Chart } = require("chart.js");

// async function getDataAveragesPlayer(playerId) {
// 	console.log(playerId);
// 	try {
// 		const response = await axios.get(
// 			`https://www.balldontlie.io/api/v1/season_averages?seasons[]=2022&player_ids[]=${playerId}`
// 		);
// 		{
// 			const playerAverage = response.data.data[0];
// 			console.log(playerAverage);
// const ctx = document.getElementById("myChart").getContext("2d");
// const myChart = new Chart(ctx, {
// 	type: "bar",
// 	data: {
// 		labels: "",
// 		datasets: [
// 			{
// 				label: "Number of GitHub Stars",
// 				data: listPoints,
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

// 	} catch (error) {
// 		console.log(error);
// 	}
// }
// getDataAveragesPlayer();

// // Récupérer les données de l'API balldontlie.io
// const API_URL =
// 	"https://www.balldontlie.io/api/v1/stats?player_ids[]=531&player_ids[]=2";
// const joueur1Id = 1;
// const joueur2Id = 2;

// fetch(API_URL)
// 	.then((res) => res.json())
// 	.then((data) => {
// 		console.log(data);
// 		let joueur1Points = 0;
// 		let joueur2Points = 0;

// 		for (const item of data) {
// 			if (item.player_id === joueur1Id) {
// 				joueur1Points = item.pts;
// 			} else if (item.player_id === joueur2Id) {
// 				joueur2Points = item.pts;
// 			}
// 		}

// 		// Créer le graphique avec Chart.js
// 		const ctx = document.getElementById("myChart").getContext("2d");
// 		const chart = new Chart(ctx, {
// 			type: "bar",
// 			data: {
// 				labels: ["Joueur 1", "Joueur 2"],
// 				datasets: [
// 					{
// 						label: "Points marqués",
// 						data: [joueur1Points, joueur2Points],
// 						backgroundColor: [
// 							"rgba(255, 99, 132, 0.2)",
// 							"rgba(54, 162, 235, 0.2)",
// 						],
// 						borderColor: [
// 							"rgba(255, 99, 132, 1)",
// 							"rgba(54, 162, 235, 1)",
// 						],
// 						borderWidth: 1,
// 					},
// 				],
// 			},
// 			options: {
// 				scales: {
// 					yAxes: [
// 						{
// 							ticks: {
// 								beginAtZero: true,
// 							},
// 						},
// 					],
// 				},
// 			},
// 		});
// 	});

// const ctx = document.getElementById("myChart").getContext("2d");
// const myChart = new Chart(ctx, {
// 	type: "bar",
// 	data: {
// 		labels: [], // array of labels
// 		datasets: [
// 			{
// 				label: "", //dataset label
// 				data: [], //array of data values
// 			},
// 		],
// 	},
// });

// var ctx = document.getElementById('myChart').getContext('2d');
// var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: [], // array of labels
//         datasets: [{
//             label: '', // dataset label
//             data: [], // array of data values
//             backgroundColor: [], // array of background colors
//             borderColor: [], // array of border colors
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     }
// });

// Fetch data from Balldontlie API and update chart

// fetch("https://www.balldontlie.io/api/v1/stats")
// 	.then((response) => response.json())
// 	.then((data) => {
// 		// Extract the labels and data values from the API response
// 		data.forEach((stat) => {
// 			myChart.data.labels.push(
// 				stat.player.first_name + " " + stat.player.last_name
// 			);
// 			myChart.data.datasets[0].data.push(stat.pts);
// 		});

// 		// Generate random background and border colors for each bar
// 		for (var i = 0; i < myChart.data.labels.length; i++) {
// 			myChart.data.datasets[0].backgroundColor.push(getRandomColor());
// 			myChart.data.datasets[0].borderColor.push(getRandomColor());
// 		}

// 		myChart.update();
// 	});

// // Generate a random color
// function getRandomColor() {
// 	var letters = "0123456789ABCDEF";
// 	var color = "#";
// 	for (var i = 0; i < 6; i++) {
// 		color += letters[Math.floor(Math.random() * 16)];
// 	}
// 	return color;
// }

console.log("test");

// Fonction pour effectuer une requête API
// async function getData(url) {
// 	const response = await fetch(url);
// 	const data = await response.json();
// 	return data;
// }

// // ID des joueurs à comparer
// const player1 = 123;
// const player2 = 456;

// // URL pour récupérer les points marqués par les joueurs
// const url = `https://www.balldontlie.io/api/v1/stats?player_ids[]=${player1}&player_ids[]=${player2}&start_date=2020-01-01&end_date=2022-12-31`;

// // Récupération des données
// getData(url)
// 	.then((data) => {
// 		// Filtrage des données pour n'obtenir que les points marqués par les joueurs
// 		const filteredData = data.filter(
// 			(d) => d.player_id === player1 || d.player_id === player2
// 		);

// 		// Regroupement des points marqués par joueur
// 		const groupedData = filteredData.reduce((acc, curr) => {
// 			const player =
// 				curr.player_id === player1 ? "player1" : "player2";
// 			acc[player] = acc[player] ? acc[player] + curr.pts : curr.pts;
// 			return acc;
// 		}, {});

// 		// Initialisation de Chart.js
// 		const ctx = document.getElementById("myChart").getContext("2d");
// 		const myChart = new Chart(ctx, {
// 			type: "bar",
// 			data: {
// 				labels: ["Player 1", "Player 2"],
// 				datasets: [
// 					{
// 						label: "Points marqués",
// 						data: [groupedData.player1, groupedData.player2],
// 						backgroundColor: [
// 							"rgba(255, 99, 132, 0.2)",
// 							"rgba(54, 162, 235, 0.2)",
// 						],
// 						borderColor: [
// 							"rgba(255, 99, 132, 1)",
// 							"rgba(54, 162, 235, 1)",
// 						],
// 						borderWidth: 1,
// 					},
// 				],
// 			},
// 			options: {
// 				scales: {
// 					yAxes: [
// 						{
// 							ticks: {
// 								beginAtZero: true,
// 							},
// 						},
// 					],
// 				},
// 			},
// 		});
// 	})
// 	.catch((error) => console.error(error));
