import Layout from '../../components/Layout';
import Admin from '../../components/auth/Admin';
import { Container, Row, Col} from 'reactstrap';
import Link from 'next/link'; 
import adminImg from './admin.svg';

const AdminIndex = () => {
    return (
        <Layout>
            <Admin>
            <Container>
                <Row>
                    <Col xs="6">
                        <div className="row">
                            <div className="col-md-12 pt-5 pb-5">
                                    <h1 style={{color: '#565757'}}>Admin's Dashboard</h1>
                            </div>
                            <div className="col-md-6">
                                <ul className="list-group">
                                    <li style={{backgroundColor: '#98B1D8', margin: '5px 0', borderRadius: '10px'}} className="list-group-item">
                                        <Link href="/admin/crud/category-tag">
                                            <a style={{color: 'white'}}>Create Category</a>
                                        </Link>
                                    </li>

                                    <li style={{backgroundColor: '#98B1D8', margin: '5px 0', borderRadius: '10px'}} className="list-group-item">
                                        <Link href="/admin/crud/category-tag">
                                            <a style={{color: 'white'}}>Create Tag</a>
                                        </Link>
                                    </li>

                                    <li style={{backgroundColor: '#98B1D8', margin: '5px 0', borderRadius: '10px'}} className="list-group-item">
                                        <Link href="/admin/crud/blogCreate">
                                            <a style={{color: 'white'}}>Create Blog</a>
                                        </Link>
                                        
                                    </li>

                                    <li style={{backgroundColor: '#98B1D8', margin: '5px 0', borderRadius: '10px'}} className="list-group-item">
                                        <Link href="/admin/crud/blogRead">
                                            <a style={{color: 'white'}}>Update/Delete Blog</a>
                                        </Link>
                                    </li>
                                </ul>
                                <p style={{color: 'orange', marginTop: '1rem'}}>NOTE:  You have to create atleast one 'Tag' and atleast one 'Category'.</p>
                            </div>
                        </div>
                    </Col>
                    <Col xs="6">
                        <img width="700" src={adminImg} alt="admin-image" />
                    </Col>
                </Row>
            </Container>
            </Admin>
        </Layout>
    );
};

export default AdminIndex;