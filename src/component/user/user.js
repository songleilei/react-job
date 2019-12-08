import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import browserCookie from 'browser-cookies'
import { logoutSubmit } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import { importAllImages } from '../../util'

@connect((state) => state.user, { logoutSubmit })
class User extends React.Component {
	constructor(props) {
		super(props)
		this.logout = this.logout.bind(this)
	}

	logout() {
		const alert = Modal.alert
		alert('注销', '确认退出登录吗？', [
			{ text: '取消', onPress: () => console.log('cancel') },
			{
				text: '确认',
				onPress: () => {
					browserCookie.erase('userid')
					// window.location.href = window.location.href;
					this.props.logoutSubmit()
				}
			}
		])
		console.log('logout')
	}

	render() {
		const props = this.props
		const Item = List.Item
		const Brief = Item.Brief

		return props.user ? (
			<div>
				<Result
					img={
						<img
							src={images[`${props.avatar}.png`].default}
							alt="头像"
							style={{ width: 60 }}
						></img>
					}
					title={props.user}
					message={props.type === 'boss' ? props.company : null}
				/>
				<List renderHeader={() => '简介'}>
					<Item multipleLine>
						{props.title}
						{this.props.desc.split('\n').map((v) => (
							<Brief key={v}>{v}</Brief>
						))}
						{props.money ? <Brief>薪资：{props.money}</Brief> : null}
					</Item>
				</List>
				<WhiteSpace />
				<List>
					<Item onClick={() => this.logout()}>退出登录</Item>
				</List>
			</div>
		) : (
			<Redirect to={props.redirectTo} />
		)
	}
}

const images = importAllImages(require.context('../../avatar', false, /.png$/))

export default User
