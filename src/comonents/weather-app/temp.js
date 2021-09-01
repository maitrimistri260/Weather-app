/* api.openweathermap.org/data/2.5/weather?q=mumbai&appid=a894e5bbda4895f37250622c693be985 */

import React , {useState, useEffect} from 'react';
import './style.css';
import WeatherCard from './weathercard';

const Temp = () => {

    const [searchValue, setSearchValue] = useState("mumbai");
    const [tempInfo, setTempInfo] = useState();
    
    const getWeatherInfo = async() => {
        try {
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=143160f674daca78a6acc9934fe36e7c`;

            

            let res = await fetch(url);
            let data = await res.json();
            const {temp, humidity, pressure} = data.main;
            const {main: weathermood } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;

            const myNewWeatherInfo = {
                temp, 
                humidity, 
                pressure, 
                weathermood, 
                name, 
                speed, 
                country, 
                sunset
            };

            setTempInfo(myNewWeatherInfo);

            // console.log(data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getWeatherInfo();
        
    },);

    return (
        <>
            <div className="wrap">
            
                <div className="search">
                    <input type="search"
                        placeholder="search..."
                        autoFocus
                        id="search"
                        className="searchTerm"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />

                    <button className="searchButton" type="button" onClick={getWeatherInfo}>
                        Search
                    </button>


                </div>

            </div>

            {/* {temp card} */}
            <WeatherCard {...tempInfo}/>
            
        </>
    );

}
export default Temp;
