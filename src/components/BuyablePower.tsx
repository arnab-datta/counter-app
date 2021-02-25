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
    name: string;
    majorCost: number;
    minorCost: number;
    lesserCost: number;
    purchase: any;
}

interface IState {
    purchased: number; //1-2-3 for lesser-minor-major. 0 is nothing
}

export default class BuyablePower extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            purchased: 0
        };
    }
    componentDidMount() {

    }

    componentDidUpdate(){
        //power was either purchased or sold
        this.props.purchase(this.props.name, this.state.purchased);
    }

    render() {
        if (this.state.purchased == 0) {
            return (
                <tr>
                    <td>{this.props.name}</td>
                    <td>
                        {this.props.majorCost > 0 &&
                            (<Button
                                color="primary"
                                variant="contained"
                                onClick={() =>
                                    this.setState({
                                        purchased: 3
                                    })
                                }> {this.props.majorCost} </Button>)}
                    </td>
                    <td>
                        {this.props.minorCost > 0 &&
                            (<Button
                                color="primary"
                                variant="contained"
                                onClick={() =>
                                    this.setState({
                                        purchased: 2
                                    })
                                }> {this.props.minorCost} </Button>)}
                    </td>
                    <td>
                        {this.props.lesserCost > 0 &&
                            (<Button
                                color="primary"
                                variant="contained"
                                onClick={() =>
                                    this.setState({
                                        purchased: 1
                                    })
                                }> {this.props.lesserCost} </Button>)}
                    </td>
                </tr>
            )
        } else {
            return (
                <tr>
                    <td>{this.props.name}</td>
                    <td>
                    {this.state.purchased == 3 && (
                       <Button
                        color="secondary"
                        variant="contained"
                        onClick={() =>
                            this.setState({
                                purchased: 0
                            })
                        }> X </Button>)}
                    </td>
                    <td>
                    {this.state.purchased == 2 && (
                       <Button
                        color="secondary"
                        variant="contained"
                        onClick={() =>
                            this.setState({
                                purchased: 0
                            })
                        }> X </Button>)}                        
                    </td>
                   <td>
                       {this.state.purchased == 1 && (
                       <Button
                        color="secondary"
                        variant="contained"
                        onClick={() =>
                            this.setState({
                                purchased: 0
                            })
                        }> X </Button>)}
                        </td>
                </tr>
            )
        }
    }
}