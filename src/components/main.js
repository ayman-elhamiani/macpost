import React , { Component }from "react";
import SocialNetwork from '../abis/SocialNetwork.json'
import Identicon from 'identicon.js';


class Main extends Component{
    render(){
    return(

        <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="content mr-auto ml-auto">
                
                 <form action="">
                    <div className="form-group mrsm-2">
                        {/* //✍🏻📄📑🗒📃📜📋📖🔖📝 */}
                    <input type="text" id="postContent" placeholder="✍🏻 - post here 📝 " className="form-control" required></input>
                    </div>
                    <button type="submit" form="form1" value="Submit" className="btn btn-primary btn-block">Submit</button>

                </form>
                            { this.props.posts.map((post, key)=>{

                  return (

                    <div class="card mb-4" key={key}>
                      <div class="card-header">
                      <img
                        className='mr-2'
                        width='30'
                        height='30'
                        src={`data:image/png;base64,${new Identicon(post.author, 30).toString()}`}
                      />
                          <small className='text-muted'>{post.author}</small>
                        </div>
                        <ul id='postList' className='list-group list-group-flush'>
                          <li className='list-group-item'>
                            <p>{post.content}</p>
                          </li>
                          <li key={key} className="list-group-item py-2">
                            <small className="float-left mt-1 text-muted">
                              TIPS: {window.web3.utils.fromWei(post.tipAmount.toString(), 'Ether')} ETH
                            </small>
                            <button className="btn btn-link btn-sm float-right pt-0" name={post.id}>
                              <span>TIP 0.1 ETH</span> 
                            </button>
                          </li>
                          
                        </ul>
                    </div>
                  ); 
                })
              }
            </div>
          </main>
        </div>
        </div>
      
    );
    }
}
export default Main;