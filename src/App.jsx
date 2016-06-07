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
            fontSize: '3em'
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

    handleUrlChange = (evt) => {
        gapi.savetodrive.render('save-drive-button', {
            src: 'https://cors-anywhere.herokuapp.com/' + evt.target.value,
            filename: 'My Statement.pdf',
            sitename: 'My Company Name'
        });
    };

    render() {
        return (
            <div style={this.styles.root}>
                <div style={this.styles.content}>
                    <span style={this.styles.title}>Upload from a Url to Google Drive</span>
                    <div id="save-drive-button"></div>
                    <input onChange={this.handleUrlChange}/>
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