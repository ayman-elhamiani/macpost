import React, { Component } from 'react';
import Web3 from 'web3';
import Identicon from 'identicon.js';
import SocialNetwork from '../abis/SocialNetwork.json'
import Navbar from './Navbar'


class App extends Component {

    async componentWillMount(){
            await this.loadWeb3()
           await this.loadBlockchaindata()
    }

//connect metamask
    async loadWeb3() {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
        }
        else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }
//
    async loadBlockchaindata(){
       const web3 = await window.web3
       const accounts = await web3.eth.getAccounts()
       this.setState({account: accounts[0]})
          
    }

    constructor (props){
          super(props)
          this.state = {
            account :'',
        }
    }

  render() {

    return (
      <div>
        <Navbar account = {this.state.account}/>

      </div>
    );
  }
}

export default App;
