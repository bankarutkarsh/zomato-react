import React from 'react'
import '../Styles/Home.css'
import axios from 'axios'
import navHook from './nav'
import { Analytics } from '@vercel/analytics/react';

class Home extends React.Component{

    navigateFilterPage = (id) => {
        this.props.navigate(`/Filters?type=${id}`);
    }

    constructor(){
        super();
        this.state = {
            locations: [],
            mealtypes: [],
            restaurant: [],
            InputText: undefined,
            suggestions: []
        }
    }
        
    componentDidMount(){
        axios({
            url: 'https://zomato-apivercel.vercel.app/mealtypes',
            method: 'GET',
            headers: { 'Content-Type': 'Application/JSON'}
        })
        .then(res => {
            this.setState({mealtypes: res.data.mealtype})
        })
        .catch(err => {console.log(err)})

        axios({
            url: 'https://zomato-apivercel.vercel.app/locations',
            method: 'GET',
            headers: { 'Content-Type': 'Application/JSON'}
        })
        .then(res =>{
            this.setState({locations: res.data.locations})
        })
        .catch(err => console.log(err))
    }
    
    handleLocation = (location) => {
        
        

        axios({
            url: `https://zomato-apivercel.vercel.app/restaurants/${location.target.value}`,
            method: 'GET',
            headers: { 'Content-Type': 'Application/JSON'}
        })

            .then(res => {
                this.setState({ restaurant: res.data.restaurants })
            })
            .catch(err => console.log(err))

    }

    handleInput = (event) => {
        const { restaurant } = this.state;
        const inputText = event.target.value;

        let suggestions = [];

        suggestions = restaurant.filter(item => item.name.toLowerCase().includes(inputText.toLowerCase()));
        this.setState({ inputText, suggestions });
    }

    showSuggestions = () => {
        const { suggestions, inputText } = this.state;

        if (suggestions.length === 0 && inputText === undefined) {
            return null;
        }

        if (suggestions.length > 0 && inputText === '') {
            return null;
        }

        if (suggestions.length === 0 && inputText) {
            return (
                <li> No Search Results Found </li>
            )
        }

            return(
                suggestions.map((item) => (
                    <li onClick={() => this.selectRestaurant(item._id)}>
                        <img className='sugg_img' src={`${item.thumb}`} alt='No images to display' />
                        <span className='fw-bolder sugg_title'>{`${item.name}`}</span> <br />
                        <span className='sugg_loca'>{`${item.locality}`}</span> <hr className='sugg_line' />
                    </li>
                ))
            );
    }

    selectRestaurant = (value) => {
        this.props.navigate(`/Details?restaurant=${value}`);
    }

    render(){

        const{ locations,mealtypes} = this.state;

        return(
            
            <div>
                <Analytics />
                {/*<!--Upper Part-->*/}
                <div className="Hupper_part p-0 center ">
                    {/*<!--Backgound Image-->*/}
                    <div className="HBgImage img-fluid p-1">
                        {/*<!--Login Button-->*/}
                        {/* <div className="d-grid Hbuttons gap-2 d-md-flex justify-content-md-end my-4">
                                <button className="btn Hlogin me-md-2" type="button">Login</button>
                                <button className="btn Hlogin btn-outline-light" type="button">Create an account</button>
                        </div> */}
                        {/*<!--Edureka Logo-->*/}
                        <div className="divCir row d-grid justify-content-md-center me-0">
                            <div className="Hcircle my-1">
                                <div className="HlogoHome text-danger">
                                    e!
                                </div>
                            </div>
                        </div>
                        {/*<!--content and buttons-->*/}
                        <div className="row my-1 me-0">
                            <h2 className="Hsubheading text-light text-center my-3">Find the best restaurants, cafés, and bars</h2>
                        </div>
                        <div className="row justify-content-md-center mx-0 my-3">
                            <div className="Hdropdown col-3">
                                <select className="form-select form-select-lg Hdropdownlist" onChange={this.handleLocation}>
                                    { locations.map((item) => {
                                    return(
                                        <option value={item.city_id}>{ item.name }</option>
                                        )
                                    })};   
                                </select>
                            </div>

                            <div className="searchbar col-5 my-3">
                                <i className="bi bi-search Hicon">
                                    <input className="Hsearch" type="text" placeholder="Search for restaurants" onChange={this.handleInput}/>
                                    <ul className='suggestion'>{this.showSuggestions()}</ul>
                                </i>
                                
                            </div>
                        </div>
                    </div> 
                </div>
                {/*<!--Lower Part-->*/}
                <div className="Hlower_part">
                    <div className="row justify-content-md-center mx-0">
                        <div className="Hheading mx-0">
                            <h3>Quick Searches</h3>
                            <p>Discover restaurants by type of meal</p>
                        </div>
                    </div>

                    {/*<!--Boxes-->*/}
                    <div className="container Hbox_section">
                        <div className="row"></div>
                        <div className="d-flex flex-wrap">   
                            {
                                mealtypes.map((meal) => {
                                    return(
                                            <div className="Hbox d-flex" onClick={() => this.navigateFilterPage(meal.name)}>
                                                <div className="Himage">
                                                    <img src={`./images/${meal.image}`} alt={meal.name}/>
                                                </div>
                                                <div className="Hcontent">
                                                    <h4>{meal.name}</h4>
                                                    <p className="Hdescp">{meal.content}</p>
                                                </div>
                                            </div>
                                        )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default navHook(Home);