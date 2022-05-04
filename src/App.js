import React, { Component } from 'react';
import Web3 from 'web3';
import Navbar from './Navbar';
class App extends Component {


    async componentWillMount(){
            await this.loadWeb3()
            await this.loadBlockchaindata()
    }


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

    async loadBlockchaindata(){
        const web3 = window.Web3
        const accounts = await web3.eth.getAccounts()


          console.log(accounts)

          
    }

    constructor (props){
          super(props)
          this.state = {
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
