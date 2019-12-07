import React from 'react'
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component {
	static propTypes = {
		selectAvatar: PropTypes.func.isRequired
	}

	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		const avatarList = Array.from(new Array(20)).map((_val, i) => ({
			// icon: require(`../../avatar/${i + 1}.png`)
			icon: images[`${i + 1}.png`].default,
			index: `${i + 1}`
		}))

		const gridHeader = this.state.icon ? (
			<div>
				<span>已选择头像</span>
				<img style={{ width: 20 }} src={this.state.icon} alt="" />
			</div>
		) : (
			<div>请选择头像</div>
		)

		return (
			<div>
				<List renderHeader={() => gridHeader}>
					<Grid
						data={avatarList}
						columnNum={5}
						onClick={(ele) => {
							this.setState(ele)
							this.props.selectAvatar(ele.index)
						}}
					/>
				</List>
			</div>
		)
	}
}

const importAll = (r) => {
	let images = {}
	r.keys().map((item, index) => {
		images[item.replace('./', '')] = r(item)
	})

	return images
}

const images = importAll(require.context('../../avatar', false, /.png$/))

export default AvatarSelector
