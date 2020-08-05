import React, { Component } from 'react';
import styled from 'styled-components';
import icon from './icon_dark_circle.webp';
import arrowblue from './arrowblue.svg';
import arrowwhite from './arrowwhite.svg';
import instagram from './instagram.svg';
import facebook from './facebook.svg';
import linkedin from './linkedin.svg';
import medium from './medium.svg';

const LeftFooterContent = styled.section`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    color: white;
    font-family: 'Lato', sans-serif;
`;

const Button = styled.button`
    border: none;
    outline: none;
    background-color: #347cbf;
    margin-left: 3px;
`;

const Subscribe = styled.div`
    display: flex;
`;

const SocialSite = styled.div`
    margin-top: 5rem;
    width: 10vw;
    display: flex;
    justify-content: space-between;
`;

const SocialImg = styled.img`
    width: 24px;
`;

const FooterContent = styled.div`
    width: 60%;
    margin: 1rem 1rem 0rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const RightFooterContent = styled.section`
    display: flex;
    justify-content: space-between;
    font-family: 'Lato', sans-serif;
`;

const Ul = styled.ul`
    list-style: none;
    color: white;
`;

class Footer extends Component {
    render() {
        return (
            <footer style={{backgroundColor: '#0A1725', display: 'flex', justifyContent: 'center'}}>
                <FooterContent>
                    <LeftFooterContent>
                        <img src={icon} style={{marginBottom: '2rem'}} alt='company-icon' />
                        <p>See all services<a href="#"><img style={{marginLeft: '4rem'}} src={arrowblue} alt="arrow" /></a></p>
                        <p style={{fontSize: '1.4rem'}}>Learn new. Everyday.</p>
                        <Subscribe>
                            <input style={{paddingLeft: '.5rem',paddingRight: '3rem', outline: 'none'}} type="email" placeholder="Email address" />
                            <Button type="submit"><img src={arrowwhite} alt="arrow" /></Button>
                        </Subscribe>
                        <SocialSite>
                            <SocialImg src={facebook} alt="facebook" />
                            <SocialImg src={instagram} alt="instagram" />
                            <SocialImg src={linkedin} alt="linkedin" />
                            <SocialImg src={medium} alt="medium" />
                        </SocialSite>
                        <p className="text-muted mt-3">&copy; Legexhub Technology Pvt Ltd.</p>
                    </LeftFooterContent>
                    <RightFooterContent>
                        <Ul className="d-inline-block">
                            <h5 className="text-white">Company</h5>
                            <li><a className="text-white-50" href="#">About us</a></li>
                            <li><a className="text-white-50" href="#">Newsroom</a></li>
                            <li><a className="text-white-50" href="#">Client Stories</a></li>
                            <li><a className="text-white-50" href="#">Resources</a></li>
                            <li><a className="text-white-50" href="#">Careers</a></li>
                        </Ul>
                        <Ul className="d-inline-block">
                            <h5 className="text-white">Offerings</h5>
                            <li><a className="text-white-50" href="#">Consulting</a></li>
                            <li><a className="text-white-50" href="#">Compliances</a></li>
                            <li><a className="text-white-50" href="#">Dispute Resolution</a></li>
                            <li><a className="text-white-50" href="#">e-Discovery</a></li>
                            <li><a className="text-white-50" href="#">Legal services</a></li>
                        </Ul>
                        <Ul className="d-inline-block">
                            <h5 className="text-white">Support</h5>
                            <li><a className="text-white-50" href="#">Help</a></li>
                            <li><a className="text-white-50" href="#">Privacy</a></li>
                            <li><a className="text-white-50" href="#">Terms</a></li>
                            <li><a className="text-white-50" href="#">Sitemap</a></li>
                        </Ul>
                    </RightFooterContent>
                </FooterContent>
            </footer>
        )
    }
}

export default Footer;