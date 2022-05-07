import React, { Component } from 'react';
import Web3 from 'web3';
import Identicon from 'identicon.js';
import SocialNetwork from '../abis/SocialNetwork.json'
import Navbar from './Navbar'
import Main  from './main';


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
       this.setState({account: accounts[0] })
       //networkk id 
       const networkId = await web3.eth.net.getId()
       const networkData = SocialNetwork.networks[networkId]

       if (networkData) {
        const socialNetwork = web3.eth.Contract(SocialNetwork.abi, networkData.address)
        this.setState({ socialNetwork })
        const postCount = await socialNetwork.methods.postCount().call()
        this.setState({ postCount })
        //post loading 
        for (var i = 0; i <= postCount; i++) {
          const post = await socialNetwork.methods.posts(i).call()
          //array of adding posts 
          this.setState({
            posts: [...this.state.posts, post]
          })          
        }
        this.setState({loading: false})
       }
       
       else{
         window.alert("contract  not deployed")
       }

       
          
    }

    constructor (props){
          super(props)
          this.state = {
            account : '',
            socialNetwork: null,
            posts: [],
            postCount: 0,
            loading: true
        }
    }

  render() {

    return (
      <div>
        <Navbar account = {this.state.account}/>
        {
          this.state.loading
          ?  <div id='loader' className='text-center mt-5'><p>loading</p></div>
          :<Main posts = {this.state.posts}/>
        } 
          
      </div>
    );
  }
}



  
export default App;




// return (
//   <div class="card mb-4" key={key}>
//     <div class="card-header">
//         <small className='text-muted'>post header</small>
//       </div>
//       <ul id='postList' className='list-group list-group-flush'>
//         <li className='list-group-item'>
//           <p>post body</p>
//         </li>
//         <li key={key} className='list-group-item py-2'>
//           <p>foooter</p>
//         </li>
        
//       </ul>
//   </div>
// ); 