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


interface IProps {
  powerData: {};
  selectedPowers: {};
  handleConfirm: (selectedPowers:any) => void;
  handleClose: () => void;
}

interface IState {
   selectedPowers: any; //int array?
   totalCP: number;
   remainingCP: number;
}

export default class ManagePowersPanel extends React.Component<IProps, IState> {

    constructor(props:IProps) {
        super(props);
        this.state = {
                        selectedPowers: "",
                        totalCP: 0,
                        remainingCP: 0
                     };
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
          <DialogContent>
            Manage your powers here
          </DialogContent>
          
          <DialogActions>
            <form onSubmit={(selectedPowers : any) => this.props.handleConfirm(this.state.selectedPowers)} >
                <FormControl required variant="outlined" className="inputControl">
                <InputLabel id="model-type-input-label">Total CP</InputLabel>
                <TextField
                    id="total-cp-input"
                    label="Total CP"
                    type="number"
                    required
                    onChange={this.calculateRemainingCP}
                    className="total-cp-input"
                />
                  {//this.props.powerData && 
                     
                  }
                <div><pre>{JSON.stringify(this.props.powerData, null, 2) }</pre></div>
                
                </FormControl>
                <FormControl className="inputControl">
                
                  {/* todo - render rows
                  
                  
                  this.props.powerData && this.props.powerData.map((modelTypeName: string) => {
                    return (
                      <MenuItem key={modelTypeName} value={modelTypeName}>{modelTypeName}</MenuItem>
                    );
                  })*/}
                
                
                </FormControl>
                <div className="actionButtons">
                    <Button type="submit">Save</Button>
                    <Button onClick={() => this.props.handleClose()} color="primary">Cancel</Button>
                </div>
            </form>
          </DialogActions>
        </Dialog>
      );
    }

    private calculateRemainingCP(){

    }
}
