import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Input
} from '@material-ui/core';
import BuyablePower from "./BuyablePower";


interface IProps {
  powerData: any[];
  selectedPowers: any;
  handleConfirm: (selectedPowers: any) => void;
  handleClose: () => void;
}

interface IState {
  selectedPowers: any;
  totalCP: number;
  remainingCP: number;
}

export default class ManagePowersPanel extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedPowers: {},
      totalCP: 0,
      remainingCP: 0
    };
  }
  componentDidMount() {

  }

  render() {
    return (
      <Dialog
        aria-describedby="Manage Powers"
        aria-labelledby="Manage Powers"
        className="manage-powers-dialog"
        fullWidth={true}
        onClose={this.props.handleClose}
        open={true}
      >
        <DialogTitle>Manage Powers</DialogTitle>

        <DialogActions>
          <form onSubmit={(selectedPowers: any) => this.props.handleConfirm(this.state.selectedPowers)} >
            <FormControl required variant="outlined">
              <TextField
                id="total-cp-input"
                label="Total CP"
                type="number"
                onChange={() => this.calculateRemainingCP}
                className="total-cp-input"
              />
              Remaining CP: {this.state.remainingCP}


              {/*
                </FormControl>
                <FormControl className="inputControl">
              */}
              <table><thead><tr><th>Power</th><th>Major</th><th>Minor</th><th>Lesser</th></tr></thead>
                <tbody>
                  {this.props.powerData && this.props.powerData.map((row: any[string]) => {
                    if (row["Major"] || row["Minor"] || row["Lesser"]) {
                      return (
                        <BuyablePower
                          name={row["Power"]}
                          majorCost={row["Major"]}
                          minorCost={row["Minor"]}
                          lesserCost={row["Lesser"]}
                          purchase={(name: string, level: number) => this.purchasePower(name, level)}
                        />
                      )
                    }
                  })}
                </tbody>
              </table>

            </FormControl>
            <div className="actionButtons">
              <Button onClick={() => this.props.handleConfirm(this.state.selectedPowers)} color="primary">Save</Button>
              <Button onClick={() => this.props.handleClose()} color="primary">Cancel</Button>
            </div>
          </form>
        </DialogActions>
      </Dialog>
    );
  }

  private calculateRemainingCP() {
    this.setState({
      remainingCP: this.state.totalCP
    })
  }
  public purchasePower(name: string, level: number) {
    this.state.selectedPowers[name] = level;
  }

}
