import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: space-between;
`;

const Container = styled.section`
    margin-top: 5rem;
    margin-bottom: 5rem;
    width: 60%;
    align-self: center;
`;

const Layout = ({ children }) => {
    return (
        <Wrapper>
            <Header />
            <Container>
                {children}
            </Container>
            <Footer />
        </Wrapper>
    );
};

export default Layout;