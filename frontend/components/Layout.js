import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: space-between;
`;

const Layout = ({ children }) => {
    return (
        <Wrapper>
            <Header />
            <div className="container">
                {children}
            </div>
            <Footer />
        </Wrapper>
    );
};

export default Layout;