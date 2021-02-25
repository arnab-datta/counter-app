import React from 'react';
import {
    Container,
    Button
} from '@material-ui/core';
import { DataGrid, RowsProp, ColDef, CellParams } from '@material-ui/data-grid';



interface IProps {
    abilities: any[]
    buffs: any[]
}

interface IState {

}

export default class InfoPanel extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            abilityList: [],
            buffList: []
        };
    }


    render() {
        const rows: RowsProp = [];
        const columns: ColDef[] = [
            { field: 'name', headerName: 'Name', width: 250 },
            { field: 'action', headerName: 'Action', width: 120 },
            { field: 'atk', headerName: 'Atk', width: 120 },
            { field: 'dmg', headerName: 'Roll', width: 180 },
            { field: 'effect', headerName: 'Effect', width: 150 },
            {
                field: 'detail', headerName: 'Detail', width: 100,
                renderCell: (params: CellParams) => (
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => alert(params.value)}
                    >?</Button>
                )
            }
        ];

        for (let i = 0; i < this.props.abilities.length; i++) {
            var a = this.props.abilities[i];
            rows.push(
                {
                    id: i,
                    name: a["name"],
                    action: a["action"],
                    atk: a["atk"],
                    dmg: a["dmg"],
                    effect: a["effect"],
                    detail: a["detail"]
                }
            )

        }
        return (
            <div style={{ height: 300, width: '100%' }}>
                <DataGrid
                    hideFooter={true}
                    hideFooterPagination={true}
                    rows={rows}
                    columns={columns} />
            </div>

        )
    }

}
