export function getRedirectPath({ type, avatar }) {
	// 根据用户信息，返回跳转地址
	// user.type /boss /genius
	let url = type === 'boss' ? '/boss' : '/genius'

	if (!avatar) {
		url += 'info'
	}
	return url
}

export function getChatId(userId, targetId) {
	return [userId, targetId].sort().join('_')
}

// export function importAllImages(r) {
// 	let images = {}
// 	r.keys().forEach((item) => {
// 		images[item.replace('./', '')] = r(item)
// 	})

// 	return images
// }

// export const AvatarImages = importAllImages(
// 	require.context('./avatar', false, /.png$/)
// )
