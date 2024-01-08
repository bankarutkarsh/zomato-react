import React from 'react';
import '../Styles/filter.css';
import queryString from 'query-string';
import axios from 'axios';
import navHook from './nav'

class Filter extends React.Component{

    constructor(){
        super();
        this.state = {
            mealtype: [],
            restaurant: [],
            locations: [],
            cuisine: [],
            location: undefined,
            lcost:0,
            hcost:undefined,
            page:1,
            sort:1
        }
    }

    componentDidMount(){
        const q = queryString.parse(window.location.search);

        const { type } = q;

        this.setState ({mealtype: type});

        axios({
            url: 'http://localhost:5500/filter',
            method: 'POST',
            headers: { 'Content-Type': 'Application/JSON'}
        })
        .then(res => {
            this.setState({restaurant: res.data.restaurants})
        })
        .catch(err => { console.log(err)})

        axios({
            url: 'http://localhost:5500/locations',
            method: 'GET',
            headers: {'Content-Type': 'Application/JSON'}
        })
        .then(res => {
            this.setState({locations: res.data.locations})
        })
        .catch(err => {console.log(err)})

    }

    
    handleLocationChange = (loc) =>{

        const location = loc.target.value;
        const {mealtype} = this.state;

        const filterObj = {
            mealtype: mealtype,
            location: location
        }

        axios({
            url: 'http://localhost:5500/filter',
            method: 'POST',
            headers: {'Content-Type': 'Application/JSON'},
            data: filterObj
        })
        .then(res => {
            this.setState({restaurant: res.data.restaurants,location})
        })
        .catch(err => {console.log(err)})

    }
    
    handlepage = (page) =>{

        
        const {mealtype,location,sort,lcost,hcost} = this.state;

        const filterObj = {
            mealtype: mealtype,
            location: location,
            page,
            sort,
            lcost,
            hcost
        }

        axios({
            url: 'http://localhost:5500/filter',
            method: 'POST',
            headers: {'Content-Type': 'Application/JSON'},
            data: filterObj
        })
        .then(res => {
            this.setState({restaurant: res.data.restaurants,page})
        })
        .catch(err => {console.log(err)})

    }        

    handlesort = (sort) =>{

        const {mealtype,location,page,lcost,hcost} = this.state;

        const filterObj = {
            mealtype: mealtype,
            location: location,
            page,
            sort,
            lcost,
            hcost
        }

        axios({
            url: 'http://localhost:5500/filter',
            method: 'POST',
            headers: {'Content-Type': 'Application/JSON'},
            data: filterObj
        })
        .then(res => {
            this.setState({restaurant: res.data.restaurants,sort})
        })
        .catch(err => {console.log(err)})

    }        

    handleCost = (lcost,hcost) =>{

        const {mealtype,location,page,sort} = this.state;

        const filterObj = {
            mealtype: mealtype,
            location: location,
            page,
            sort,
            lcost,
            hcost
        }

        axios({
            url: 'http://localhost:5500/filter',
            method: 'POST',
            headers: {'Content-Type': 'Application/JSON'},
            data: filterObj
        })
        .then(res => {
            this.setState({restaurant: res.data.restaurants,lcost,hcost})
        })
        .catch(err => {console.log(err)})

    }       

    handleCuisineChange = (i) =>{

        let tempCuisine = this.state.cuisine.slice();
        if(tempCuisine.indexOf(i)===-1){
            tempCuisine.push(i);
        }else{
            tempCuisine.splice(tempCuisine.indexOf(i),1);
        }

        const {mealtype,location,page,sort,lcost,hcost} = this.state;



        const filterObj = {
            mealtype: mealtype,
            location: location,
            page,
            sort,
            lcost,
            hcost,
            cuisine: tempCuisine.length > 0 ? tempCuisine : undefined
        }

        axios({
            url: 'http://localhost:5500/filter',
            method: 'POST',
            headers: {'Content-Type': 'Application/JSON'},
            data: filterObj
        })
        .then(res => {
            this.setState({restaurant: res.data.restaurants,cuisine: tempCuisine})
        })
        .catch(err => {console.log(err)})

    }       

    handleDetailsPage = (resId) => {
        this.props.navigate(`/Details?restaurant=${resId}`);
    }

    render(){
        const {mealtype,restaurant,locations} = this.state;
        return(
            <div>
                {/* <!--Navbar--> */}
                <div className='Dnav'>

                        <div className="Dlogo">
                            e!
                        </div>

                        {/* <div  className="DloginButDiv">
                            <button type="button" className="DloginBut">
                            Login</button> 
                        </div>

                        <div type="button" className="DaccountButDiv" >
                            <button className="DaccountBut">
                                Create an account</button>
                        </div> */}
                    </div>

                {/* <!--Filter Page--> */}
                <div className="container mb-5">
                                           
                        { mealtype?
                            <h2 className="filter-heading mt-3">{mealtype} Places {
                                locations.name? locations.name : " "
                            }</h2>
                            :
                            <h2 className="filter-heading mt-3">XYZ Places in Mumbai</h2>
                        }   
                    {/* <!--Filters--> */}
                    <div className="filter-box mt-2 pb-4">
                        <h5 className="filter-heading mt-2">Filters</h5>

                        <p className="filter-subheading">Select Location</p>

                        <select className="form-control selectLocation" onChange={this.handleLocationChange}>
                            {locations.map((item) => {
                                return(
                                    <option value={item.city_id}>{ item.name }</option>
                                )
                            })}                            
                        </select>

                        <p className="filter-subheading mt-4">Cuisine</p>

                        <input type="checkbox" id="North_Indian" name="Cuisine" value="North Indian" onChange={() => this.handleCuisineChange(1)} />
                         <label for="North_Indian" className="filter-content"> North Indian</label> <br />
                        <input type="checkbox" id="South_Indian" name="Cuisine" value="South Indian" onChange={() => this.handleCuisineChange(2)}/>
                         <label for="South_Indian" className="filter-content">South Indian</label> <br />
                        <input type="checkbox" id="Chinese" name="Cuisine" value="Chinese" onChange={() => this.handleCuisineChange(3)}/>
                         <label for="Chinese" className="filter-content">Chinese</label> <br />
                        <input type="checkbox" id="Fast_Food" name="Cuisine" value="Fast Food" onChange={() => this.handleCuisineChange(4)}/>
                         <label for="Fast_Food" className="filter-content">Fast Food</label> <br />
                        <input type="checkbox" id="Street_Food" name="Cuisine" value="Street Food" onChange={() => this.handleCuisineChange(5)}/>
                         <label for="Street_Food" className="filter-content">Street Food</label> <br />
                        
                        <p className="filter-subheading mt-4">Cost For Two</p>

                        <input type="radio" id="500" name="costfortwo" value="Less than 500" onClick={() => this.handleCost(1,500)}/>
                         <label for="500" className="filter-content">Less than `500</label> <br />
                        <input type="radio" id="1000" name="costfortwo" value="500 to 1000" onClick={() => this.handleCost(500,1000)}/>
                         <label for="1000" className="filter-content">` 500 to ` 1000</label> <br />
                        <input type="radio" id="1500" name="costfortwo" value="1000 to 1500" onClick={() => this.handleCost(1000,1500)}/>
                         <label for="1500" className="filter-content">` 1000 to ` 1500</label> <br />
                        <input type="radio" id="2000" name="costfortwo" value="1500 to 2000" onClick={() => this.handleCost(1500,2000)}/>
                         <label for="2000" className="filter-content">` 1500 to ` 2000</label> <br />
                        <input type="radio" id="2000+" name="costfortwo" value="2000+" onClick={() => this.handleCost(2000,2500)}/>
                         <label for="2000+" className="filter-content">` 2000+</label> <br />

                        <h5 className="filter-heading mt-4">Sort</h5>

                        <input type="radio" id="ltoh" name="Sort" value="Price low to high" onClick={() => this.handlesort(1)} /> <label for="ltoh" className="filter-content">Price low to high</label> <br />
                        <input type="radio" id="htol" name="Sort" value="Price high to low" onClick={() => this.handlesort(-1)}/> <label for="htol" className="filter-content">Price high to low</label> <br />

                    </div>

                    {/* <!--Filter Result--> */}
                    <div className="result-box mt-2">

                    { (restaurant.length != 0) ? 
                        restaurant.map((item)=>{
                            return(
                                    <div className="results" onClick={() => this.handleDetailsPage(item._id)}>
                                    <div className="d-flex">
                                        <div className="lt-box">
                                            <img src={'./images/breakfast.png'} className="img-fluid img-qs" />
                                        </div>
                                        <div className="rt-box">
                                            <h4 className="result-heading">{item.name}</h4>
                                            <p className="result-subheading">{item.locality}</p>
                                            <p className="result-text">{item.address}</p>
                                        </div>
                                    </div>
                                    
                                    <hr style= {{ color: 'grey' }} />

                                    <div className="d-flex">
                                        <div className="ll-box">
                                            <p className="result-text">CUISINES:</p>
                                            <p className="result-text">COST FOR TWO:</p>
                                        </div>
                                        <div className="rl-box">
                                            <p className="result-text-blue">{item.Cuisine.map((data) => `${data.name}     `)}</p>
                                            <p className="result-text-blue">₹{item.cost}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : 
                        <div className="results">
                                <div className='No_Elements'> 
                                    Sorry. No result found 
                                </div>
                        </div>
                    }

                        {/* <!--Pagination--> */}
                        <div className="mt-5">
                            <ul className="pagination justify-content-center">
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        <span> { "<" } </span>
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#" onClick={() => this.handlepage(1)}>1</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="#" onClick={() => this.handlepage(2)}>2</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="#" onClick={() => this.handlepage(3)}>3</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="#" onClick={() => this.handlepage(4)}>4</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="#" onClick={() => this.handlepage(5)}>5</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                    <span> { ">" } </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

export default navHook(Filter);