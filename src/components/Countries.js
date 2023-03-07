import React, { Component } from 'react'
import Cdata from './database/data.json'
import { Dropdown } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

class Countries extends Component {
  constructor() {
    super();
    this.state = {
      Countries: [],
      searchString:'',
      isDarkMode: false // add state for light/dark mode
    };
  }

  componentDidMount() {
    this.setState({data:Cdata})
  }

  searchHandler =(e) =>{
    const searchString = e.target.value.toLocaleLowerCase();
    this.setState({searchString: searchString})
  }

  toggleDarkMode = () => {
    this.setState(prevState => ({ isDarkMode: !prevState.isDarkMode }));
  }

  render() {
    const { isDarkMode } = this.state; // get current mode from state

    const newData = Cdata.filter(country =>{
      return country.name.toLocaleLowerCase().includes(this.state.searchString)
    });
    
    return (
      <div className={`grid grid-cols-4 justify-end p-9 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <div className="fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center">
          <input type="text" className='h-6 bg-white-600 bi bi search text-sm' placeholder='search country' onChange={this.searchHandler}/>
        </div>
        {newData.map((dataitem)=>(
          <div className=''>
            <img src={dataitem.flag} className='h-20 p-3'></img>
            <p>{dataitem.name}</p>
            <p>population:{dataitem.population}</p>
            <p>region:{dataitem.region}</p>
            <p>capital:{dataitem.capital}</p>
          </div>
        ))}
        <div className="sidebar fixed top-0 bottom-0 lg:right-0 p-2 w-[300px] overflow-y-auto text-center ">
          <Dropdown title="Filter by region" className="my-dropdown">
  <Dropdown.Item className="my-dropdown-item">Africa</Dropdown.Item>
  <Dropdown.Item className="my-dropdown-item">America</Dropdown.Item>
  <Dropdown.Item className="my-dropdown-item">Asia</Dropdown.Item>
  <Dropdown.Item className="my-dropdown-item">Europe</Dropdown.Item>
  <Dropdown.Item className="my-dropdown-item">Oceania</Dropdown.Item>
</Dropdown>

          <button onClick={this.toggleDarkMode}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</button>
        </div>
      </div>
    )
  }
}

export default Countries
