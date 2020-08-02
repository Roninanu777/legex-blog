import { useState } from 'react';
import Layout from '../../../components/Layout';
import { forgotPassword } from '../../../actions/auth';

const ForgotPassword = () => {
    const [values, setValues] = useState({
        email: '',
        message: '',
        error: '',
        showForm: true
    });

    const { email, message, error, showForm } = values;

    const handleChange = name => e => {
        setValues({ ...values, message: '', error: '', [name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, message: '', error: '' });
        forgotPassword({ email }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, message: data.message, email: '', showForm: false });
            }
        });
    };

    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-success">{message}</div> : '');

    const passwordForgotForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group pt-5">
                <input
                    type="email"
                    onChange={handleChange('email')}
                    className="form-control"
                    value={email}
                    placeholder="Type your email"
                    required
                />
            </div>
            <div>
                <button className="btn btn-primary">Submit</button>
            </div>
        </form>
    );

    return (
    <Layout>
        <div className="container-fluid">
            <h2 className="text-center pt-4 pb-4">Forgot Password</h2>
    
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {showError()}
                    {showMessage()}
                </div>
            </div>
    
            <div className="row">
                <div className="col-md-6 offset-md-3">
                 {showForm && passwordForgotForm()}
                </div>
            </div>
        </div>
    </Layout>
    );
};

export default ForgotPassword;