import { Client, GatewayIntentBits, Partials } from 'discord.js'
import { config } from 'dotenv'
import getInviteLink from './utils/getInviteLink'
import updateStatus from './updateStatus'

config()

process.stdout.write('\x1Bc')

export const client = new Client({
	intents: [GatewayIntentBits.Guilds],
	partials: [Partials.Message, Partials.Channel],
})

client.on('ready', () => {
	if (!client.user) return console.error('Discord client failed to initialize.')
	if (process.env.REFRESH_TIME && isNaN(parseInt(process.env.REFRESH_TIME)))
		return console.error('you must add REFRESH_TIME to the .env file!')

	if (parseInt(process.env.REFRESH_TME || '0') < 60) return console.error('REFRESH_TIME must be above 60 seconds!')

	console.log(`
		[=====================================]
		[=] Development Mode ➜  ${process.env.DEV && process.env.DEV === 'TRUE' ? 'ON' : 'OFF'}
		[=] Logged In As ➜  ${client.user.tag}
		[=] Invite Link ➜  ${getInviteLink()}
		[=] Support ➜  https://next-il.co.il
		[=====================================]
	`)

	updateStatus()

	setInterval(updateStatus, parseInt(process.env.REFRESH_TIME || '120') * 1000)
})

client.login(process.env.BOT_TOKEN)
