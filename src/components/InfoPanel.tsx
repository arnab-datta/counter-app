import React from 'react';
import {
    Container,
    Button
} from '@material-ui/core';
import Ability from './Ability';


interface IProps {
    powerData: any[]
    selectedPowers: any
    powerRank: number
}

interface IState {
    abilities: any[]
}

export default class InfoPanel extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            abilities: []
        };
    }
    componentDidMount() {
        this.parseAbilities();
    }

    componentDidUpdate() {
        //power was either purchased or sold
    }

    render() {
        return (
            <Container >
                {/* Todo - update to data grid*/}
                <table>
                    <tr>
                        <th>Ability</th>
                        <th>Action</th>
                        <th>Atk</th>
                        <th>Dmg</th>
                        <th>Effect</th>
                        <th>Detail</th>
                    </tr>
                    {this.state.abilities.forEach(function (a) {
                        (<Ability
                            name={a["name"]}
                            action={a["action"]}
                            atk={a["atk"]}
                            dmg={a["dmg"]}
                            effect={a["effect"]}
                            condition={a["condition"]}
                            detail={a["detail"]}
                        />)
                    })
                    }

                </table>

                <table>
                    <tr>
                        <th>Buff</th>
                        <th>Value</th>
                        <th>Effect</th>
                        <th>Detail</th>
                    </tr>
                </table>
            </Container>
        );
    }


    private parseAbilities() {

        var abilities = [];
        var buffs = [];
        //todo - get Powers to give you the appropriate abilities and buffs

        this.props.powerData.forEach(power => {
            if (this.props.selectedPowers[power["Power"]]) {
                if (power["row"] === "Ability") {
                    //we have this power
                    //todo - determine rank
                    var ability: any;
                    ability["name"] = power["Power"];
                    ability["action"] = power["Action"];
                    ability["dmg"] = power["r5"];
                    ability["atk"] = "1d20";
                    ability["effect"] = power["Effect"];
                    ability["detail"] = power["Detail"];
                    var tags: String = power["Tags"];
                    ability["tags"] = tags.split(" ");
                    ability["condition"] = power["Condition"];
                    abilities.push(ability);
                } else if (power["row"] === "Buff") {
                    var buff: any;
                    buff["value"] = power["r5"];
                    buff["effect"] = power["Effect"];
                    buff["detail"] = power["Detail"];
                    var tags: String = power["Tags"];
                    buff["tags"] = tags.split(" ");
                    buff["condition"] = power["Condition"];
                    buffs.push(buff);
                }
            }
        });
        /*
                name = { a["name"]}
                atk = { a["atk"]}
                dmg = { a["dmg"]}
                effect = { a["effect"]}
                condition = { a["condition"]}
                detail = { a["detail"]}
        
                */

    }
}
