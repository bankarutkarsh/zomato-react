import React from 'react';
import '../Styles/filter.css';
import '../Styles/Navbar.css';
import Modal from 'react-modal';
import axios from "axios";


const customStyles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.9)"
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '10px',
    },
};

const logModal = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.9)"
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '10px',
      width: '35%',
      height: '48%',
    },
};

class Navbar extends React.Component{

    constructor() {
        super();

        this.state = {
            loginModal : false,
            registrationModal : false,
            accCheck : false,
            loginFail : false,
            email: undefined, 
            password: undefined, 
            name: undefined,
            users: undefined,
            loggedUser:undefined
        };
        this.validate = this.validate.bind(this);
    }

    handleModal = (state, value) => {
        this.setState({ [state]: value })
    }

    google = () => {
        window.open("http://localhost:5500/auth/google", "_self");
    };

    logout = () => {
        window.open("http://localhost:5500/auth/logout", "_self");
    };

    // Insert to Name
    setName = (i) => {
        this.setState({ name: i.target.value });
    }

    // Insert to Mail
    setMail = (i) => {
        this.setState({ email: i.target.value });
    }

    // Insert to Password
    setPassword = (i) => {
        this.setState({ password: i.target.value });
    }

    // Registration details
    registration = () => {
        
        const { email, password, name } = this.state;

        const regObj = {
            email: email, 
            password: password, 
            name: name
        }

        axios({
            url: 'http://localhost:5500/signup',
            method: 'POST',
            headers: { 'Content-Type': 'application/JSON' },
            data: regObj
        })
            .then(res => {
            this.setState({ users: res.data.details._id })
            })
            .catch(err => console.log(err))
    }

    validate= (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        
        const loginObj = {
            email: email, 
            password: password
        }

        axios({
            url: 'http://localhost:5500/login',
            method: 'POST',
            headers: { 'Content-Type': 'application/JSON' },
            data: loginObj
        })
            .then(res => {
                if(!res.data.isAuthenticated){
                    this.handleModal("loginFail",true)
                }
                else{
                    this.setState({loggedUser: res.data})
                    console.log(res.data.user);
                    this.handleModal('loginModal', false)
                    this.handleModal('accCheck', false)
                }         
            })
            .catch(err => console.log(err))
    }
    

    render(){
        const { loginModal, registrationModal, accCheck, loginFail, loggedUser} = this.state;
        const { user } = this.props;
        return(
            <div>
                {/* <!--Navbar--> 
                <nav className="navbar">*/}
                    <div className="container">
                        {
                            (!user && !loggedUser) ? (
                                <div className="position-absolute float-end" style={{ marginLeft: "50em" }}>
                                    <form className="d-grid Nbuttons gap-2 d-md-flex justify-content-md-end my-4">
                                    <button type="button" className="btn Nlogin me-md-2" onClick={() => {
                                        this.handleModal('loginModal', true);}} style={{ textDecoration: "none" }}>Login</button>
                                    <button type="button" className="btn Nlogin btn-outline-light" onClick={() => {
                                        this.handleModal('registrationModal', true);}}>Create an account</button>
                                    </form>
                                </div>
                            ) :
                            (
                                <div className="position-absolute float-end" style={{ marginLeft: "50em" }}>
                                    { (user) ? (
                                        <form className="d-flex mt-3 Nlogout">
                                    
                                        <img className='img-fluid img-thumbnail circle' alt='thumbnail' src={user.photos[0].value} />
                                        <p className='text-light fw-3 fs-5 mx-3 pt-2'>{user.displayName}</p>
                                        <button type="button" className="btn btn-outline-light fs-5 px-3" onClick={this.logout}>Logout</button>
                                            
                                    </form>
                                ) : (
                                <form className="d-flex mt-4 NLlogout">
                                    
                                    <p className='text-light fw-3 fs-5 mx-3 pt-2'>{loggedUser.user[0].name}</p>
                                    <button type="button" className="btn btn-outline-light fs-5 px-3" 
                                    onClick={() => window.open("http://localhost:3000", "_self")}>Logout</button>
                                        
                                </form>
                            )}
                                </div>
                            )
                        }
                    
                        {/* <div className="position-absolute float-end" style={{ marginLeft: "50em" }}>
                           { (!user) ? (
                                <form className="d-grid Nbuttons gap-2 d-md-flex justify-content-md-end my-4">
                                    <button type="button" className="btn Nlogin me-md-2" onClick={() => {
                                        this.handleModal('loginModal', true);}} style={{ textDecoration: "none" }}>Login</button>
                                    <button type="button" className="btn Nlogin btn-outline-light" onClick={() => {
                                        this.handleModal('registrationModal', true);}}>Create an account</button>
                                </form>
                                ) : (
                                <form className="d-flex mt-3 Nlogout">
                                    
                                    <img className='img-fluid img-thumbnail circle' alt='thumbnail' src={user.photos[0].value} />
                                    <p className='text-light fw-3 fs-5 mx-3 pt-2'>{user.displayName}</p>
                                    <button type="button" className="btn btn-outline-light fs-5 px-3" onClick={this.logout}>Logout</button>
                                        
                                </form>
                            )}
                        </div>                        */}
                    </div>
                {/*/nav>*/}
                
                {/* Login Page */}
                <Modal
                    isOpen={loginModal}
                    style={logModal}
                >   

                    <div onClick={() => this.handleModal('loginModal', false)} className='bi bi-x-lg me-3 Nmodal_cross'></div>
                    <h2 className='fw-bolder ms-3 mt-3 mb-5 head'> Login Page </h2>
                    
                    <div>
                        
                        <button type='button' className='log_but btn btn-outline-primary btn-lg ps-5 mx-5 mb-4' onClick={this.google}>
                            <img src='https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png' alt='2' className='logo_google' />
                            Login with Google
                        </button>
                    </div>

                    <div>
                        
                        <button type='button' className='log_but btn btn-outline-primary btn-lg ps-5 mx-5' onClick={()=> this.handleModal('accCheck', true) }>
                            <img src='https://upload.wikimedia.org/wikipedia/commons/6/6e/Mail_fluent_Icon.svg' alt='3' className='logo_mail' />
                            Login with Zomato Account
                        </button>
                    </div>          
                </Modal>

                {/* Registration Page */}
                <Modal
                    isOpen={registrationModal}
                    style={customStyles}
                >   
                    <div onClick={() => this.handleModal('registrationModal', false)} className='bi bi-x-lg me-3 modal_cross'></div>
                    <h2 className='fw-bolder ms-3 mt-3'> Registration Page </h2>
                    
                    <div style={{"width": "28em"}} className='px-3'>

                        <form  onSubmit={this.registration}>

                            <div class="form-group mt-4">
                                <label className='mb-2' for="name">Name</label>
                                <input type="text" class="form-control" id="name" placeholder="Enter your name" onChange={this.setName} value={this.state.name} style={{borderRadius: '0px'}} />
                            </div>
                        
                            <div class="form-group mt-4">
                                <label className='mb-2' for="email">Email Id</label>
                                <input type="email" class="form-control" id="email" placeholder="Enter Email Id" onChange={this.setMail} value={this.state.email} style={{borderRadius: '0px'}} />
                            </div>

                            <div class="form-group mt-4">
                                <label className='mb-2' for="password">Password</label>
                                <input type="password" class="form-control" id="password" placeholder="Enter Password" onChange={this.setPassword} value={this.state.password} style={{borderRadius: '0px'}} />
                            </div>

                            <div className='next_box' style={{ backgroundColor: "#F5F8FF"}}>
                                <button type='submit' value='submit' className="btn btn-danger" style={{ float: 'right', marginTop: '20px' }} > Sign Up </button>
                            </div>

                        </form> 
                        
                    </div>          
                </Modal>

                <Modal
                    isOpen={accCheck}
                    style={customStyles}
                >   
                    
                    <div onClick={() => this.handleModal('accCheck', false)} className='bi bi-x-lg me-3 modal_cross'></div>
                    <h2 className='fw-bolder ms-3 mt-3'> Login Page </h2>
                    
                    <div style={{"width": "28em"}} className='px-3'>

                        <form onSubmit={this.validate}>

                            <div class="form-group mt-4">
                                <label className='mb-2' for="email">Email Id</label>
                                <input type="email" class="form-control" id="email" placeholder="Enter Email Id" onChange={(i) => this.setState({email: i.target.value})} value={this.state.email} style={{borderRadius: '0px'}} />
                            </div>

                            <div class="form-group mt-4">
                                <label className='mb-2' for="password">Password</label>
                                <input type="password" class="form-control" id="password" placeholder="Enter Password" onChange={(i) => this.setState({password: i.target.value})} value={this.state.password} style={{borderRadius: '0px'}} />
                            </div>

                            <div className='next_box' style={{ backgroundColor: "#F5F8FF"}}>
                                <button type='submit' value='submit' className="btn btn-danger" style={{ float: 'right', marginTop: '20px' }} > Login </button>
                            </div>

                        </form> 
                        
                    </div>          
                </Modal>

                <Modal
                    isOpen={loginFail}
                    style={customStyles}
                >   
                    <div onClick={() => this.handleModal('loginFail', false)} className='bi bi-x-lg me-3 modal_cross'></div>
                    <h2 className='fw-bolder ms-3 mt-3'> Login failed </h2>
                    <div className='next_box' style={{ backgroundColor: "#F5F8FF"}}>
                        <button type='submit' value='submit' className="btn btn-danger" style={{ float: 'right', marginTop: '20px' }} onClick={() => {
                            window.open("http://localhost:3000", "_self");}}> Home </button>
                    </div>      
                </Modal>

            </div>
        )
    }
}

export default Navbar;