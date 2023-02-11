module.exports = {
	packagerConfig: {},
	rebuildConfig: {},
	makers: [
		{
			name: "@electron-forge/maker-squirrel",
			config: {
				certificateFile: "./cert.pfx",
				certificatePassword: process.env.CERTIFICATE_PASSWORD,
			},
		},
		{
			name: "@electron-forge/maker-zip",
			platforms: ["darwin"],
		},
		{
			name: "@electron-forge/maker-deb",
			config: {},
		},
		{
			name: "@electron-forge/maker-rpm",
			config: {},
		},
	],
	publishers: [
		{
			name: "@electron-forge/publisher-github",
			config: {
				repository: {
					owner: "michael-moussaoui",
					name: "nba_app",
				},
				authToken: "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",
				prerelease: false,
				draft: true,
			},
		},
	],
};
