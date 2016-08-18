/**
 * Created by SuhairZain on 4/6/16.
 */

import React, {Component} from 'react';

class App extends React.Component {
    styles = {
        root: {
            backgroundColor: '#f44336',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%'
        },
        content: {
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'center',
            overflowY: 'auto'
        },
        title: {
            color: '#FFFFFF',
            fontSize: '3em',
            marginBottom: 24
        },
        fields: {
            display: 'flex',
            flexDirection: 'column',
            width: '60%'
        },
        inputAndButton: {
            display: 'flex',
            width: '100%'
        },
        nameAndProxy: {
            display: 'flex',
            margin: '8px 0',
            width: '100%'
        },
        nameInput: {
            marginRight: 4,
            width: '50%'
        },
        proxy: {
            alignItems: 'center',
            backgroundColor: '#fff',
            display: 'flex',
            marginLeft: 4,
            width: '50%'
        },
        footer: {
            backgroundColor: '#d32f2f',
            display: 'flex',
            justifyContent: 'space-around'
        },
        footerLink: {
            color: '#ffcdd2'
        }
    };

    constructor(props){
        super(props);

        const url = 'http://s3.amazonaws.com/akamai.netstorage/HD_downloads/earth_night_rotate_1080.mov';

        this.state = {
            url: url,
            name: this.getNameFromUrl(url),
            proxy: false
        }
    }

    validUrl = (url) => {
        return !(new RegExp('/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/').test(url))
    };

    renderButton = (proxy) => {
        const {url, name} = this.state;
        if(proxy===undefined)
            proxy = this.state.proxy;

        if(this.validUrl(url)) {
            gapi.savetodrive.render('save-drive-button', {
                src: proxy?'https://sz-node-proxy.herokuapp.com/' + url: url,
                filename: name,
                sitename: 'SZ - URL to GDrive'
            });
        } else {
            alert('Invalid URL. Please enter a valid URL.')
        }
    };

    componentDidMount = () => {
        this.renderButton();
    };

    getNameFromUrl = (url) => {
        return url.substr(url.lastIndexOf('/') + 1).replace(new RegExp('_', 'g'), ' ')
    };

    handleUrlChange = (evt) => {
        const url = evt.target.value;

        this.setState({
            ...this.state,
            url: url,
            name: this.validUrl(url)?this.getNameFromUrl(url):'INVALID URL'
        });
        this.renderButton(url)
    };

    onFileNameChange = (evt) => {
        this.setState({
            ...this.state,
            name: evt.target.value
        });
        this.renderButton()
    };

    onProxyChange = () => {
        const proxy = this.state.proxy;
        this.setState({
            ...this.state,
            proxy: !proxy
        });
        this.renderButton(!proxy)
    };

    render() {
        return (
            <div style={this.styles.root}>
                <div style={this.styles.content}>
                    <span style={this.styles.title}>Upload from a Url to your Google Drive</span>
                    <div style={this.styles.fields}>
                        <input value={this.state.url} onChange={this.handleUrlChange}/>
                        <div style={this.styles.nameAndProxy}>
                            <input
                                value={this.state.name}
                                onChange={this.onFileNameChange} style={this.styles.nameInput}/>
                            <div style={this.styles.proxy}>
                                <input
                                    type="checkbox"
                                    onChange={this.onProxyChange}
                                    checked={this.state.proxy}/>
                                <span>Use proxy. Use this option on fail.</span>
                            </div>
                        </div>
                    </div>
                    <div id="save-drive-button"></div>
                </div>
                <div style={this.styles.footer}>
                    <a style={this.styles.footerLink} href="https://github.com/SuhairZain">Source</a>
                    <a style={this.styles.footerLink} href="http://superuser.com/a/740154">Inspiration</a>
                </div>
            </div>
        );
    }
}

export default App;
