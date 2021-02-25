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
    action: string;
    atk: number;
    dmg: number;
    effect: string;
    condition: string;
    detail: string;
}

interface IState {

}

export default class Ability extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
        };
    }


    render() {

        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.action}</td>
                <td>{this.props.atk}</td>
                <td>{this.props.dmg}</td>
                <td>{this.props.effect}
                    {this.props.condition && (
                        <i>({this.props.condition})</i>
                    )}</td>
                <td><Button
                 color="primary"
                 variant="contained"
                 onClick={() =>
                     alert(this.props.detail)
                 }>?</Button>
                    </td>
            </tr>
        )
    }
}