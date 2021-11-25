import React, { Component } from "react";
import getWeb3 from "./getWeb3";
import CrowdSale from "./contracts/CrowdSale.json";

import "./App.css";

class App extends Component {

  componentWillMount(){
    this.loadBlockchain();
    this.sendEthreum();
  }

  async loadBlockchain(){
    const web3 = await getWeb3();
    this.setState({web3});
    const address = await web3.eth.getAccounts();
    this.setState({address});
    //Load The Contract On The Page
    const networkId = await web3.eth.net.getId();
    const loadNetwork = await CrowdSale.networks[networkId];
    const CrowdSaleData = await new web3.eth.Contract(CrowdSale.abi,loadNetwork.address);
    console.log(CrowdSaleData);
    this.setState.state({CrowdSaleData});
    const loadTarger = await CrowdSaleData.methods.deadline().call();
    const ManagerAccount = await CrowdSaleData.methods.manager().call();
    const Target = await CrowdSaleData.methods.target().call();
    const Deadline = await CrowdSaleData.methods.deadline().call();
    const RaisedAmount = await CrowdSaleData.methods.raisedAmount().call();
    const MinContributor = await CrowdSaleData.methods.minContributor().call();
    const NoOfContributor = await CrowdSaleData.methods.noOfContributor().call();

    this.setState({target:loadTarger});
    this.setState({Manager:ManagerAccount});
    this.setState({target:Target});
    this.setState({deadline:Deadline});
    this.setState({raisedAmount:RaisedAmount});
    this.setState({minContributor:MinContributor});
    this.setState({noOfContributor:NoOfContributor});


  }
  constructor(props){
    super(props);
    this.state={
      address:"",
      target:"",
      web3 :"",
      Manager:"",
      target:"",
      deadline:"",
      raisedAmount:"",
      minContributor:"",
      noOfContributor:"",
      CrowdSaleData:"",
    }

  }

  sendEthreum= async()=>{
      this.state.CrowdSaleData.methods.sendEth().send({from:this.state.address});
  }

  render(){
    if(!this.state.web3){
      return(<div>Try To Load Web3.......</div>);
    }
    return(
      <div className="Container">
        <div className="theNavBar">
            <nav id="nav1">
              <h2>The CrowdSale</h2>
              <p>{this.state.address}</p>
            </nav>
        </div>
        <div className="second">
              <p><b>Manager Account:</b>{this.state.Manager}</p>
              <p><b>Target:</b>{this.state.target}</p>
              <p><b>Deadline:</b>{this.state.deadline}</p>
              <p><b>Raised Amount:</b>{this.state.raisedAmount}</p>
              <p><b>MinContributor:</b>{this.state.minContributor}</p>
              <p><b>No Of Contributor:</b>{this.state.noOfContributor}</p>
              <form onSubmit={this.sendEthreum}>
              <input type="number"></input>
              <button>Click</button>
              </form>
        </div>
        <div>
        </div>
      </div>
    );
  }

}

export default App;
