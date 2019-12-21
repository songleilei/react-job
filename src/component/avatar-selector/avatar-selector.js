import React from 'react'
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'

// import { AvatarImages } from '../../util'

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
			icon: require(`../../avatar/${i + 1}.png`),
			// icon: AvatarImages[`${i + 1}.png`],
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

export default AvatarSelector
