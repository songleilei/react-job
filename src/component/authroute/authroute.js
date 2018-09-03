import React from 'react';
import { withRouter } from "react-router-dom";
import { loadData } from '../../redux/user.redux';
import { connect } from "react-redux";
import Axios from 'axios';

@withRouter
@connect(
    null,
    {loadData}
)
class AuthRoute extends React.Component {
    componentDidMount() {
        const publicList = ['/login','/register'];
        const pathname = this.props.location.pathname;
        if (publicList.indexOf(pathname)>-1) {
            return null
        }

        //获取用户信息
        Axios.get('/user/info').then(res=>{
            if (res.status===200) {
                if (res.data.code===0) {
                    //有登录信息
                    this.props.loadData(res.data.data)
                } else {
                    this.props.history.push('/login')
                }
            } else {
                console.log("error");
            }
        })
    }

    render(){
        return null
    }
}

export default AuthRoute