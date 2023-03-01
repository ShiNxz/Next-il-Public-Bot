import { Colors, EmbedBuilder } from 'discord.js'

const createEmbed = ({ title, message, thumbnail, color, fields, time = true, image }: IEmbed) => {
	const embed = new EmbedBuilder()
	title && embed.setTitle(title)
	color && embed.setColor(Colors.Blue)
	message && embed.setDescription(message)
	thumbnail && embed.setThumbnail(thumbnail)
	image && embed.setImage(image)
	fields && embed.addFields(...fields)
	time && embed.setTimestamp()
	return embed
}

interface IEmbed {
	title?: string
	message?: string
	thumbnail?: string
	color?: string
	fields?: any[]
	time?: boolean
	image?: string
}

export default createEmbed
