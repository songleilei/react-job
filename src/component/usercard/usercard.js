import React from 'react'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { AvatarImages } from '../../util'

@withRouter
class UserCard extends React.Component {
	static propTypes = {
		userlist: PropTypes.array.isRequired
	}
	handleClick(v) {
		this.props.history.push(`/chat/${v._id}`)
	}
	render() {
		return (
			<WingBlank>
				<WhiteSpace />
				{this.props.userlist.map((v) =>
					v.avatar ? (
						<Card key={v._id} onClick={() => this.handleClick(v)}>
							<Card.Header
								title={v.user}
								// thumb={require(`../../avatar/${v.avatar}.png`)}
								thumb={AvatarImages[`${v.avatar}.png`].default}
								extra={<span>{v.title}</span>}
							/>
							<Card.Body>
								{v.type === 'boss' ? <div>公司：{v.company}</div> : null}
								{v.desc.split('\n').map((value) => (
									<div key={value}>{value}</div>
								))}
								{v.type === 'boss' ? <div>薪资：{v.money}</div> : null}
							</Card.Body>
						</Card>
					) : null
				)}
			</WingBlank>
		)
	}
}

export default UserCard
