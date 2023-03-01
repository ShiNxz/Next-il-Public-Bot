import { client } from '../index'

const getInviteLink = () => {
	if (!client.user) return console.error('Discord client failed top initialize.')

	const baseLink = 'https://discord.com/oauth2/authorize?client_id='

	const InviteLink = baseLink + `${client.user.id}&permissions=${process.env.BOT_PERMISSIONS_HASH}&scope=bot`

	return InviteLink
}

export default getInviteLink
