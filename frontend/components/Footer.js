import React, { Component } from 'react';
import styled from 'styled-components';
import icon from './icon_dark_circle.webp';

class Footer extends Component {
    render() {
        return (
            <footer style={{backgroundColor: 'white', boxShadow: '0px 1px 8px 0px rgba(168,168,168,1)', flexShrink: '0',display: 'flex', justifyContent: 'center'}}>
                <div>
                    <img src={icon} alt='company-icon' />
                </div>
            </footer>
        )
    }
}

export default Footer;