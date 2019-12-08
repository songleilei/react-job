import React from 'react'
import { NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import NavLinkBar from '../navlink/navlink'
import { Switch, Route } from 'react-router-dom'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../user/user'
import { getMsgList, recvMsg } from '../../redux/chat.redux'
import Msg from '../msg/msg'

@connect((state) => state, { getMsgList, recvMsg })
class Dashboard extends React.Component {
	componentDidMount() {
		if (!this.props.chat.chatmsg.length) {
			this.props.getMsgList()
			this.props.recvMsg()
		}
	}

	render() {
		const user = this.props.user
		const pathname = this.props.location.pathname
		const navList = [
			{
				path: '/boss',
				text: '牛人',
				icon: 'boss',
				title: '牛人列表',
				component: Boss,
				hide: user.type === 'genius'
			},
			{
				path: '/genius',
				text: 'Boss',
				icon: 'genius',
				title: 'Boss列表',
				component: Genius,
				hide: user.type === 'boss'
			},
			{
				path: '/msg',
				text: '消息',
				icon: 'msg',
				title: '消息列表',
				component: Msg
			},
			{
				path: '/user',
				text: '我',
				icon: 'me',
				title: '个人中心',
				component: User
			}
		]

		return (
			<div>
				<NavBar className="fixed-header" mode="dark">
					{navList.find((v) => v.path === pathname)
						? navList.find((v) => v.path === pathname).title
						: null}
				</NavBar>
				<div style={{ marginTop: 5 }}>
					<Switch>
						{navList.map((v) => (
							<Route key={v.path} path={v.path} component={v.component}></Route>
						))}
					</Switch>
				</div>
				<NavLinkBar data={navList}></NavLinkBar>
			</div>
		)
	}
}

export default Dashboard
