const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const tokens = [ // トークンを追加
    process.env.TOKEN1, process.env.TOKEN2,
    process.env.TOKEN3, process.env.TOKEN4,
    process.env.TOKEN5, process.env.TOKEN6, 
    process.env.TOKEN7,
];

async function loginClients(tokens) {
    const loginPromises = tokens.map(token => {
        return new Promise((resolve, reject) => {
            const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

            client.once('ready', () => {
                const createdAt = formatDate(client.user.createdAt);
                resolve(`Logged in as ${client.user.tag} created at ${createdAt}`);
            });

            client.once('error', reject);

            client.login(token).catch(reject);
        });
    });

    const results = await Promise.all(loginPromises);
    results.forEach(result => console.log(result));
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${year}年${month}月${day}日 ${hours}:${minutes.toString().padStart(2, '0')}`;
}

loginClients(tokens).then(() => {
    console.log('All clients logged in successfully.');
}).catch(error => {
    console.error('Error logging in clients:', error);
});
