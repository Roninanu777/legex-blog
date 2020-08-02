import React, { Component } from 'react';
import styled from 'styled-components';
import icon from './icon_dark_circle.webp';

class Footer extends Component {
    render() {
        return (
            <footer style={{backgroundColor: '#565757', flexShrink: '0',display: 'flex', justifyContent: 'center'}}>
                <div>
                    <img src={icon} alt='company-icon' />
                </div>
            </footer>
        )
    }
}

export default Footer;