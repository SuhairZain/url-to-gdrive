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
        useProxy: {
            alignItems: 'center',
            backgroundColor: '#fff',
            display: 'flex',
            marginLeft: 4,
            width: '50%'
        },
        proxy: {
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 8
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
            proxy: 'https://sz-node-proxy.herokuapp.com/{url}',
            useProxy: false
        }
    }

    validUrl = (url) => {
        return !(new RegExp('/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/').test(url))
    };

    renderButton = (url, name, proxy, useProxy) => {
        if(this.validUrl(url)) {
            //noinspection JSUnresolvedVariable
            gapi.savetodrive.render('save-drive-button', {
                src: useProxy? proxy.replace('{url}', url) : url,
                filename: name,
                sitename: 'SZ - URL to GDrive'
            });
        } else {
            alert('Invalid URL. Please enter a valid URL.')
        }
    };

    componentDidMount = () => {
        const {url, name, proxy, useProxy} = this.state;
        this.renderButton(url, name, proxy, useProxy);
    };

    getNameFromUrl = (url) => {
        return url.substr(url.lastIndexOf('/') + 1).replace(new RegExp('_', 'g'), ' ')
    };

    handleUrlChange = (evt) => {
        const url = evt.target.value;
        const {proxy, useProxy} = this.state;

        const name = this.validUrl(url)?this.getNameFromUrl(url):'INVALID URL';
        this.setState({
            ...this.state,
            url: url,
            name: name
        });
        this.renderButton(url, name, proxy, useProxy)
    };

    onFileNameChange = (evt) => {
        const {url, proxy, useProxy} = this.state;
        this.setState({
            ...this.state,
            name: evt.target.value
        });
        this.renderButton(url, evt.target.value, proxy, useProxy)
    };

    onProxyChange = (e) => {
        const proxy = e.target.value;
        const {url, name, useProxy} = this.state;
        this.setState({
            ...this.state,
            proxy
        });
        this.renderButton(url, name, proxy, useProxy)
    };

    onUseProxyChange = () => {
        const {url, name, proxy, useProxy} = this.state;
        this.setState({
            ...this.state,
            useProxy: !useProxy
        });
        this.renderButton(url, name, proxy, !useProxy)
    };

    render() {
        const {url, name, useProxy, proxy} = this.state;

        return (
            <div style={this.styles.root}>
                <div style={this.styles.content}>
                    <span style={this.styles.title}>Upload from a Url to your Google Drive</span>
                    <div style={this.styles.fields}>
                        <input value={url} onChange={this.handleUrlChange}/>
                        <div style={this.styles.nameAndProxy}>
                            <input
                                value={name}
                                onChange={this.onFileNameChange} style={this.styles.nameInput}/>
                            <div style={this.styles.useProxy}>
                                <input
                                    type="checkbox"
                                    onChange={this.onUseProxyChange}
                                    checked={useProxy}/>
                                <span>Use proxy. Use this option on fail.</span>
                            </div>
                        </div>
                        <div style={{...this.styles.proxy, opacity: useProxy ? 1 : 0}}>
                            <input
                                value={proxy}
                                onChange={this.onProxyChange}/>
                        </div>
                    </div>
                    <div id="save-drive-button"></div>
                </div>
                <div style={this.styles.footer}>
                    <a style={this.styles.footerLink} href="https://github.com/SuhairZain/url-to-gdrive">Source</a>
                    <a style={this.styles.footerLink} href="http://superuser.com/a/740154">Inspiration</a>
                </div>
            </div>
        );
    }
}

export default App;
