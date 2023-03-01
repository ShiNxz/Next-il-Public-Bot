import type { TextChannel } from 'discord.js'
import axios from 'axios'
import { client } from '.'
import { config } from 'dotenv'
import createEmbed from './utils/createEmbed'
import percentage from './utils/percentage'

config()

const updateStatus = async () => {
	if (!process.env.CHANNEL_ID || !process.env.WEBSITE_URI)
		return console.error('Please provide a channel id in the .env file.')

	const request = await axios(`https://${process.env.WEBSITE_URI}/api/csgo/servers`)
	const { data } = request
	if (!data) return console.error('Error while fetching the servers data!')

	const { success, servers, categories } = data
	if (!success || !servers) return console.error('Error while fetching the servers data!')

	console.log(
		`Servers data fetched successfully!\nAvilable Servers: ${
			servers.length
		}\nAvailable Categories: ${categories.join(', ')}`
	)

	const channel = client.channels.cache.get(process.env.CHANNEL_ID) as TextChannel | undefined
	if (!channel) return console.error('Channel not found!')

	let message = null
	const channelMessages = (await channel.messages.fetch({ limit: 1 })).first()
	if (channelMessages && channelMessages.author.id === client.user?.id) message = channelMessages
	else message = await channel.send({ embeds: [createEmbed({ message: 'loading...' })] })

	if (!message) return console.error('failed to find or create message!')

	let index = 0

	// custom fields
	let totalActiveServers = 0
	let totalPlayers = 0

	let chunks = categories.map((category: string) => ({
		name: category,
		servers: servers.filter((server: any) => server.category.toLowerCase() === category.toLowerCase()),
	}))

	chunks = chunks
		.map(({ name, servers }: { name: string; servers: any }) => {
			const newServers = []

			for (let server of servers) {
				totalActiveServers += server.info && server?.upToDate ? 1 : 0
				totalPlayers += (server.info && server.info.players) || 0
				newServers.push({
					name: `**${server.info ? '✅' : '❌'}  •  ${server.name}**`,
					value: [
						server.info ? `**➜ IP:** ${server.maskIP}:${server.port}` : `**OFFLINE**`,
						server.info ? `**➜ Map:** ${server.info.map}` : `**➜ IP:** ${server.maskIP}:${server.port}`,
						server.info
							? `**➜ Players:** ${server.info.players}/${server.info.maxPlayers}  |  ${percentage(
									server.info.maxPlayers,
									server.info.players
							  )}%`
							: '-',
						`[ [Connect | התחבר לשרת](https://${process.env.WEBSITE_URI}/csgo/servers?server=${index}) ]`,
					].join('\n'),
					inline: true,
				})

				index % 2 && newServers.push({ name: `\u200b`, value: `\u200b`, inline: true })
				index++
			}

			if (process.env.CATEGORIES && process.env.CATEGORIES === 'ALL' && newServers.length > 0)
				return { name, servers: newServers }

			if (process.env.CATEGORIES && process.env.CATEGORIES.includes(name) && newServers.length > 0)
				return { name, servers: newServers }
			else null
		})
		.filter((chunk: any) => chunk)

	const embeds = chunks.map((chunk: any) =>
		createEmbed({
			title: `▬▬▬▬▬▬▬▬▬▬[ ${chunk.name} ]▬▬▬▬▬▬▬▬▬`,
			fields: chunk.servers,
			time: false,
		})
	)

	await message.edit({
		content: '',
		embeds: [
			...embeds,
			createEmbed({
				message: [
					`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`,
					`**${totalActiveServers}** שרתים פעילים • **${totalPlayers}** שחקנים מחוברים`,
					``,
					`**עודכן לאחרונה:** {time}      |      **מתעדכן בכל:** {delay} שניות`
						.replace(`{time}`, `<t:${Math.floor(Date.now() / 1000)}:R>`)
						.replace(`{delay}`, process.env.REFRESH_TIME || '120'),
					`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`,
				].join('\n'),
				time: false,
			}),
		],
	})
}

export default updateStatus
