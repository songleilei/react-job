import React from 'react';

export default function imoocForm(Comp) {
    return class WrapperComp extends React.Component {
        constructor(props) {
            super(props);
            this.state = {}
            this.handlechange = this.handlechange.bind(this)
        }
        
        handlechange(key, value) {
            this.setState({
                [key]:value
            })
        }
        // 属性穿透 {...this.props}
        render() {
            return <Comp handlechange={this.handlechange} state={this.state} {...this.props}></Comp>
        }
    }
}