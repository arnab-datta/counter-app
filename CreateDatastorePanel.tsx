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
  Select
} from '@material-ui/core';

interface IProps {
  modelTypeNames: Array<string>;
  handleConfirm: (modelType:string, instanceName:string) => void;
  handleClose: () => void;
}

interface IState {
   instanceName: string;
   modelType: string
}

export default class CreateDatastorePanel extends React.Component<IProps, IState> {

    constructor(props:IProps) {
        super(props);
        this.state = {
                        instanceName: "",
                        modelType: ""
                     };

        this.handleInstanceNameChange = this.handleInstanceNameChange.bind(this);
        this.handleModelTypeChange = this.handleModelTypeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInstanceNameChange(e: any) {
        this.setState({
          instanceName: e.target.value
        });
    }

    handleModelTypeChange(e: any) {
        this.setState({
          modelType: e.target.value
        });
    }

    handleSubmit(e: any) {
        e && e.preventDefault();
        this.props.handleConfirm(this.state.modelType, this.state.instanceName);
    }

    render() { 
        return (
        <Dialog
          aria-describedby="Create Datastore"
          aria-labelledby="Create Datastore"
          className="create-datastore-dialog"
          fullWidth={true}
          onClose={() => this.props.handleClose()}
          open={true}
        >
          <DialogTitle>Create Datastore</DialogTitle>
          <DialogContent>
            Creates an empty Datastore of the chosen type. 
          </DialogContent>
          
          <DialogActions>
            <form onSubmit={this.handleSubmit} >
                <FormControl required variant="outlined" className="inputControl">
                <InputLabel id="model-type-input-label">Model Type</InputLabel>
                <Select
                  labelId="model-type-input-label"
                  id="model-type-input-select"
                  autoFocus
                  value={this.state.modelType}
                  onChange={this.handleModelTypeChange}
                  label="Model Type"
                >
                  {this.props.modelTypeNames && this.props.modelTypeNames.map((modelTypeName: string) => {
                    return (
                      <MenuItem key={modelTypeName} value={modelTypeName}>{modelTypeName}</MenuItem>
                    );
                  })}
                </Select>
                </FormControl>
                <FormControl className="inputControl">
                <TextField
                    id="instance-name-input"
                    label="Instance Name"
                    helperText="must be unique"
                    type="string"
                    required
                    onChange={this.handleInstanceNameChange}
                    className="instance-name-input"
                />
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
}
