import React from "react";
import NavBar from "./components/NavBar";
import ManagePowersPanel from "./components/ManagePowersPanel";


interface IState {
  showManagePowersPanel: boolean;
  selectedPowers: any; //number array?
}

interface IProps {
  powerData: any; //big array
}

export default class App extends React.Component<IProps, IState> {
  
  constructor(props: IProps) {
    super(props);

    this.state = {
        showManagePowersPanel: false,
        selectedPowers: ""
    }
  }

  render() {
    return (
      <div>
        <NavBar 
          toggleManagePowers={
            this.setState({
              showManagePowersPanel: !this.state.showManagePowersPanel
            })
          }
        />
        <main className="container">
{/*          <StatPanel />
          <AbilityPanel />

*/}
        </main>
        {this.state.showManagePowersPanel && 
        (<ManagePowersPanel
          powerData={this.props.powerData}
          selectedPowers={this.state.selectedPowers}
          handleConfirm={(selectedPowers: any) =>
            this.updateSelectedPowers(selectedPowers)
          }
          handleClose={() => this.closePanel()
          }
        /> )}
      </div>
    );
  }

  public closePanel(){

  }

  public updateSelectedPowers(selectedPowers: any){

  }
}
