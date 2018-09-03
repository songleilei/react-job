import React from "react";
import Logo from '../../component/logo/logo'
import { List, InputItem, Radio ,WingBlank, WhiteSpace, Button } from "antd-mobile";
import { connect } from "react-redux";
import { register } from "../../redux/user.redux";
import { Redirect } from "react-router-dom";
import imoocForm from '../../component/imooc-form/imooc-form'

@connect(
    state=>state.user,
    { register }
)
@imoocForm
class Register extends React.Component {

    constructor(props){
        super(props);
        this.handleRegister = this.handleRegister.bind(this)
    }

    componentDidMount() {
        this.props.handlechange('type','genius')
    }

    handleRegister() {
        this.props.register(this.props.state);
    }

    render() {
        const RaidoItem = Radio.RadioItem;
        return (
            <div>
                {this.props.redirectTo? <Redirect to={this.props.redirectTo}/> : null }
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                        <InputItem onChange={v=>this.props.handlechange('user', v)}>用户名</InputItem>
                        <InputItem onChange={v=>this.props.handlechange('pwd', v)} type="password">密码</InputItem>
                        <InputItem onChange={v=>this.props.handlechange('repeatpwd', v)} type="password">确认密码</InputItem>
                        <RaidoItem 
                            checked={this.props.state.type==='genius'} 
                            onChange={()=>this.props.handlechange('type', 'genius')}>求职者</RaidoItem>
                        <RaidoItem 
                            checked={this.props.state.type==='boss'} 
                            onChange={()=>this.props.handlechange('type', 'boss')}>雇佣方</RaidoItem>
                    </List>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                </WingBlank>
                
            </div>
        )
    }
}

export default Register