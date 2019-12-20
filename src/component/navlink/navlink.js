import React from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { importAllImages } from '../../util'

@withRouter
@connect((state) => state.chat)
class NavLinkBar extends React.Component {
	static propTypes = {
		data: PropTypes.array.isRequired
	}

	render() {
		const navList = this.props.data.filter((v) => !v.hide)
		const { pathname } = this.props.location

		return (
			<TabBar>
				{navList.map((v) => (
					<TabBar.Item
						badge={v.path === '/msg' ? this.props.unread : 0}
						key={v.path}
						title={v.text}
						// icon={{ uri: require(`./img/${v.icon}.png`) }}
						icon={{ uri: images[`${v.icon}.png`] }}
						selectedIcon={{ uri: images[`${v.icon}-active.png`] }}
						selected={pathname === v.path}
						onPress={() => this.props.history.push(v.path)}
					></TabBar.Item>
				))}
			</TabBar>
		)
	}
}

const images = importAllImages(require.context('./img', false, /.png$/))

export default NavLinkBar
