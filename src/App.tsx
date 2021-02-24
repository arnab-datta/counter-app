import React from "react";
import NavBar from "./components/NavBar";
import ManagePowersPanel from "./components/ManagePowersPanel";
import { flattenDiagnosticMessageText } from "typescript";

interface IState {
  showManagePowersPanel: boolean
  selectedPowers: any //number array?
  powerData: any[]
}

interface IProps {
}

export default class App extends React.Component<IProps, IState> {
  
  constructor(props: IProps) {
    super(props);

    this.state = {
        showManagePowersPanel: false,
        selectedPowers: "",
        powerData: []
    }

  }

  componentDidMount() {

    fetch("https://raw.githubusercontent.com/aburnettt/adxsheets/master/src/data/powers.csv")
      .then((r) => r.text())
       .then(text  => {
         this.setState({
          powerData: this.csvToJson(text)
          });  
        });
  }

  render() {
    return (
      <div>
        <NavBar 
          toggleManagePowers={
            this.showManagePowersPanel
          }
        />
        <main className="container">
{/*          <StatPanel />
          <AbilityPanel />

*/}
        </main>
        {this.state.showManagePowersPanel && 
        (<ManagePowersPanel
          powerData={this.state.powerData}
          selectedPowers={this.state.selectedPowers}
          handleConfirm={(selectedPowers: any) =>
            this.updateSelectedPowers(selectedPowers)
          }
          handleClose={() => this.closePanels()
          }
        /> )}
      </div>
    );
  }

  closePanels = () => {
    this.setState({
      showManagePowersPanel: false
    })
  }

  updateSelectedPowers= (selectedPowers: any) => {

  }

  showManagePowersPanel = () => {
    this.setState({
      showManagePowersPanel: true
    }
    );
  }

  //var csv is the CSV file with headers
public csvToJson(csv: string){

  var lines=csv.split("\r\n");

  var result = [];

  //todo would be nice to support commas in data
  //by skipping escaped commas
  var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){

	  var obj: any = {};
	  var currentline=lines[i].split(",");

	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }

	  result.push(obj);

  }
  
  return result;
  //return JSON.stringify(result); //JSON
}
}
