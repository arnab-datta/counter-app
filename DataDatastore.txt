import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import ProgressIndicatorDialog from '../Dialogs/ProgressIndicatorDialog';
import MessageDialog from '../Dialogs/MessageDialog';
import CreateEntryPanel from './CreateEntryPanel';
import DataFileHandler from './DataFileHandler';
import Form from '@rjsf/material-ui';
import { JSONSchema7 } from "json-schema";

interface IProps {
    match: any;
    csrf_token: string;

    stopRedirectUser: () => void;
}

interface IState {
    jsonData: JSONSchema7;
    selectedDatastoreID: string;
    selectedDataModelType: string;
    selectedDataModelInstance: string;
    dataEntriesTableColumns: any[];
    dataEntriesTableRows: Array<{
        id: number,
        datastoreName: string,
        modelName: string,
        lastModifiedTime: string,
        entryCount: string
    }>;
    showProgressIndicator: boolean;
    showConfirmationDialog: boolean;
    showMessageDialog: boolean;
    showDatastoreButtons: boolean;
    showCreateEntryPanel: boolean;
    hasUnsavedData: boolean;
    redirectUser: boolean;
    dialogTitle: string;
    dialogMessages: Array<string>;
}


export default class DataDatastore extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            jsonData: {},
            selectedDatastoreID: '',
            selectedDataModelType: '',
            selectedDataModelInstance: '',
            dataEntriesTableColumns: [],
            dataEntriesTableRows: [],
            showProgressIndicator: false,
            showConfirmationDialog: false,
            showMessageDialog: false,
            showDatastoreButtons: false,
            showCreateEntryPanel: false,
            hasUnsavedData: false,
            redirectUser: false,
            dialogTitle: '',
            dialogMessages: ['']
        }

        this.getDataEntryStructure = this.getDataEntryStructure.bind(this);
    }

    componentDidMount() {
        //Make sure we remove the redirect user at DataApplication so we dont
        //continously redirect the user to this component.
        this.props.stopRedirectUser();

        //Obtain necessary parts of the datatore ID.
        var datastoreID = this.props.match.params.datastoreID;
        var datastoreIDAsArray = datastoreID.split('|');
        var dataModelType = datastoreIDAsArray[1];
        var dataModelInstance = datastoreIDAsArray[2];


        this.getDataEntryStructure(datastoreID, dataModelType, dataModelInstance);
    }


    public async createEntry(entryData: any) {

        this.setState({
            showCreateEntryPanel: false,
            showProgressIndicator: true
        });

        /* 
        TODO
        //data = the json model associated with the modelType
        var modelType: any = this.state.datastoreModelTypes.find(el => el.name === modelTypeName);
        var data = JSON.stringify(modelType.schema);


        const response = await fetch(`${process.env.REACT_APP_MOCK_SERVER_URL}data-model-instances/v1/${applicationName}/${modelTypeName}/${instanceName}`, {
            method: 'PUT',
            headers: {
                'X-CSRF-TOKEN': this.props.csrf_token
            },
            body: data
        });

        if (response.status === 401) {
            window.location.assign(window.location.origin + "/");
            return false;
        }

        var titleText: string = "";
        var bodyText: Array<string> = [];

        var rBody = await response.json();

        if (rBody.status && rBody.status === "error") {
            titleText = "Error";
            bodyText.push(rBody.generalError);
        } else {
            titleText = "Datastore created";
            bodyText.push("Datastore created successfully.");
        }

        */
       var titleText = "Title";
       var bodyText = ["Body"];
       
        this.setState({
            showProgressIndicator: false,
            showMessageDialog: true,
            dialogTitle: titleText,
            dialogMessages: bodyText
        });

    }


    async getDataEntryStructure(datastoreID: string, dataModelType: string, dataModelInstance: string) {

        var applicationName = this.props.match.params.application;

        const response = await fetch(`${process.env.REACT_APP_MOCK_SERVER_URL}data-entry-structure/v1/${applicationName}/${dataModelType}/${dataModelInstance}/${datastoreID}`,
            {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': this.props.csrf_token
                }
            }
        );

        if (response.status === 401) {
            window.location.assign(window.location.origin + "/");
            return false;
        }

        const data = await response.json();

        if (data && data.status && data.status === 'error') {
            var titleText: string = "Error";
            var bodyText: Array<string> = [];

            bodyText.push(data.generalError);

            this.setState({
                showProgressIndicator: false,
                showMessageDialog: true,
                showDatastoreButtons: false,
                dialogTitle: titleText,
                dialogMessages: bodyText
            });
        } else {

            // var json = {parameters:- name: application in: path required: true schema: type: string - name: model - name in: path required: true schema: type: string - name: instance - name in: path required: true schema: type: string - name: data - store - id in: path required: true schema: type: string get: tags: - Entries summary: returns the key and value structures for a datastore instance. operationId: getEntryStructure responses: '200': description: OK content: application / json: schema: $ref: '#/components/schemas/EntryStructureSet'};
            // var json = {
            //     "properties": {
            //         "key1": {
            //             "title": "key1",
            //             "type": "string"
            //         },
            //         "key2": {
            //             "title": "key2",
            //             "type": "string"
            //         },
            //         "limit": {
            //             "title": "Limit Entries",
            //             "type": "number",
            //             "default": 255
            //         }
            //     },
            //     "required": ["key1"]
            // };

            var json = {
                "properties": {
                    "key1 match criteria": {
                        "oneOf": [
                            {
                                "type": "string",
                                "title": "ALL"
                            },
                            {
                                "type": "string",
                                "title": "BEST"
                            },
                            {
                                "type": "string",
                                "title": "EXACT"
                            },
                            {
                                "type": "string",
                                "title": "STARTS_WITH"
                            }
                        ]
                    },
                    "key2": {
                        "title": "key2",
                        "type": "string"
                    },
                    "limit": {
                        "title": "Limit Entries",
                        "type": "number",
                        "default": 255
                    }
                },
                "required": ["key1 match criteria"]
            };

            this.setState({
                jsonData: json as JSONSchema7,
                showDatastoreButtons: true
            });
            var columnNames: Array<any> = [];
            var tableColumns: Array<any> = [];
            var keys = data[0]["keys"];
            var valueSchemaProperties = data[0]["value-schema"]["properties"];

            //Obtain all the column names from the keys and value-schema properties
            for (let i = 0; i < keys.length; i++) {
                columnNames.push(keys[i]["key-name"]);
            }
            for (var valueSchemaProperty in valueSchemaProperties) {
                columnNames.push(valueSchemaProperty);
            }

            //Set the width of the table headers based on how many column items exist in relation to the overall
            //width of the grid table.
            //TODO - obtain the width of the grid table from css value
            var numberOfColumns = columnNames.length;
            var overallWidthOfGridTable = 1260;
            var columnWidth = overallWidthOfGridTable / numberOfColumns;

            //Create the table columns
            for (let i = 0; i < columnNames.length; i++) {
                var columnName = columnNames[i];
                tableColumns.push({ field: columnName, headerName: columnName, sortable: false, width: columnWidth });
            }



            this.setState({
                dataEntriesTableColumns: tableColumns,
                selectedDatastoreID: datastoreID,
                selectedDataModelType: dataModelType,
                selectedDataModelInstance: dataModelInstance
            })
        }
    }

    public render() {

        var selectedDatastoreID = this.state.selectedDatastoreID;

        var columns = this.state.dataEntriesTableColumns;
        var rows = this.state.dataEntriesTableRows;

        return (
            <div className="datastore-datastore">
                <div className="title-group">
                    <h2>{selectedDatastoreID}</h2>
                    <DataFileHandler
                            csrf_token={this.props.csrf_token}
                            applicationName={this.props.match.params.application}
                            datastoreID={selectedDatastoreID}
                            dataModelType={this.state.selectedDataModelType}
                            dataModelInstance={this.state.selectedDataModelInstance}
                        />
                    {this.state.showDatastoreButtons && (
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() =>
                                this.setState({
                                    showCreateEntryPanel: true
                                })
                            }> Create Entry </Button>
                    )}
                </div>
                <div className="search-form">
                    <Form schema={this.state.jsonData as JSONSchema7} />
                </div>
                <div className="data-grid">
                    <DataGrid rows={rows} columns={columns} disableColumnMenu={true} hideFooter={true} />
                </div>
                {this.state.showProgressIndicator && (
                    <ProgressIndicatorDialog
                        open={true}
                    />
                )}
                {this.state.showMessageDialog && (
                    <MessageDialog
                        open={true}
                        titleMessage={this.state.dialogTitle}
                        bodyMessages={this.state.dialogMessages}
                        handleClose={() =>
                            this.setState({
                                showMessageDialog: false
                            })
                        }
                    />
                )}
                {this.state.showCreateEntryPanel && (
                    <CreateEntryPanel
                        schema={this.state.jsonData}
                        handleConfirm={(entryData: any) =>
                            this.createEntry(entryData)
                        }
                        handleClose={() =>
                            this.setState({
                                showCreateEntryPanel: false
                            })
                        }
                    />
                )}
            </div >
        );
    }
}
