import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Grid, Segment, Menu, Modal, Header, Icon, Button } from 'semantic-ui-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { bridge } from './schema';
import SimpleForm from './SimpleForm';
import EssentialForm from './EssentialForm';


var submitUrl = 'http://localhost:5000/api/submit';


function downloadFile(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}


function downloadJSON(text) {
    var filename = "data.json";
    downloadFile(filename, text);
}


function callbackPOST(payload, status, setState) {
    if (status == 200) {
        if (isJson(payload)) {
            console.log(payload);
            setState({
                serverStatus: payload
            });
        } else {
            console.log(payload);
            setState({
                serverStatus: payload
            });
        };
    } else if (status > 200) {
        if (isJson(payload)) {
            console.log(payload);
            setState({
                serverStatus: payload
            });
        } else {
            console.log(status);
            setState({
                serverStatus: "Server Error"
            });
        };
    } else {
        setState({
            serverStatus: "Server Unrecheable"
        });
    }
};

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function sendPOST(url, params, setState, callback) {
    var http = new XMLHttpRequest();
    http.open("POST", url, true);
    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function() { //Call a function when the state changes.
        if (http.readyState == 4) {
            callback(http.responseText, http.status, setState);
        }
    }
    http.send(params);
}


class FormContainer extends Component {
    state = {
        selectedTab: 'simpleForm',
        modalData: null,
        serverStatus: 'Unknown',
        copiedToClipboard: false
    };

    openTab = selectedTab => this.setState({
        selectedTab
    });

    onSubmit = data => {
        sendPOST(submitUrl, JSON.stringify(data), this.setState.bind(this), callbackPOST);
        this.setState({
            modalData: data
        })
    };

    closeModal = () => this.setState({
        modalData: null,
        serverStatus: 'Unknown',
        copiedToClipboard: false
    });


    render() {
        const {
            selectedTab,
            modalData,
            serverStatus
        } = this.state;
        return (
            <Grid verticalAlign="middle" centered className="app-container">
                <Grid.Column
                    mobile={ 14 }
                    tablet={ 10 }
                    widescreen={ 8 }
                    largeScreen={ 8 }
                    computer={ 8 }
                >
                    <Header as="h2" textAlign="center" icon>
                        <Icon name="tasks" circular inverted size="large"/>
                        <Header.Content>
                            Awesome-gen-Form
                        </Header.Content>
                        <Header.Subheader>
                            Generate the item you want for your awesome list!
                        </Header.Subheader>
                    </Header>
                    <Segment>
                        <Menu fluid widths={ 2 } pointing secondary>
                            {['simpleForm', 'EssentialForm'].map(tab => (
                                < Menu.Item
                                    key={ tab }
                                    name={ tab }
                                    active={ tab===selectedTab }
                                    onClick={ ()=> this.openTab(tab) }
                                />
                            ))}
                        </Menu>
                        { /* Not very elegant but simple and working tabs system */ }
                        { selectedTab==='simpleForm' && (
                            < SimpleForm
                                schema={ bridge }
                                onSubmit={ this.onSubmit }
                                model={
                                    { version: 0.1,
                                        slug: "hello-world",
                                        title: "Hello World",
                                        category: ["engine"],
                                        sources: { type: "git", url: "fffff" }
                                    }
                                }
                            />
                        )}
                        { selectedTab === 'EssentialForm' && (
                            < EssentialForm
                                schema={ bridge }
                                onSubmit={ this.onSubmit }
                                model={
                                    { version: 0.1,
                                        slug: "hello-world",
                                        title: "Hello World",
                                        category: ["engine"],
                                        sources: { type: "git", url: "fffff" }
                                    }
                                }
                            />
                        )}
                    </Segment>
                    <Modal open={ !!modalData } onClose={ this.closeModal }>
                        <Modal.Header content={ serverStatus }/>
                        <Modal.Content>
                        <pre>
                            { JSON.stringify(modalData, null, 4) }
                        </pre>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button
                                key='download'
                                icon={{ name:'download', size:'large' }}
                                content='Download JSON'
                                color='green'
                                onClick={ ()=> downloadJSON(JSON.stringify(modalData, null, 4)) }
                            />
                            <Button
                                key='submit'
                                icon={ { name: 'cloud upload' , size: 'large' } }
                                content='Submit'
                                color='blue'
                                onClick={ ()=> downloadJSON(JSON.stringify(modalData, null, 4)) }
                            />
                            <CopyToClipboard
                                text={ JSON.stringify(modalData, null, 4) }
                                onCopy={ ()=> this.setState({ copiedToClipboard: true }) }
                            >
                                <Button
                                    key='clipboard'
                                    icon={ { name: 'copy' , size: 'large' } }
                                    color='yellow'
                                    floated='left'
                                />
                            </CopyToClipboard>
                        </Modal.Actions>
                    </Modal>
                </Grid.Column>
            </Grid>
        )
    }
}

export default FormContainer;

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render( <FormContainer/> , wrapper) : false;
