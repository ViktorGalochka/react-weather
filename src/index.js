import React, {useState} from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import {render} from "@testing-library/react";

const Weather = () => {
    const [data, setData] = useState(false);
    const [temp, setTemp] = useState("");
    const [minTemp, setMinTemp] = useState("");
    const [maxTemp, setMaxTemp] = useState("");
    const [city, setCity] = useState("");
    const [icon, setIcon] = useState("");
    const [humidity, setHumidity] = useState("");

    const search = (e) => {
        setCity(e.target.value);
        e.code === 'Enter' ? setData(true): setData(false);
    }

    const getData = (city) => {
        axios({
            method: "GET",
            url: `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${city}&APPID=b2745f9629915a9b867daa35359e4893`
        }).then((res) => {
            let icon = res.data.weather[0].icon;
            let temp = Math.round(parseInt(res.data.main.temp));
            let minTemp = Math.round(parseInt(res.data.main.temp_min));
            let maxTemp = Math.round(parseInt(res.data.main.temp_max));
            let wet = res.data.main.humidity;
            setTemp(temp);
            setIcon(icon);
            setHumidity(wet);
            setMinTemp(minTemp);
            setMaxTemp(maxTemp);
            setData(true);
        }).catch((err) => {
            console.log(err);
            setData(false);
        })
    }

    return (
        <div className='wrapper'>
            <div className='controllers'>
            <input
                type='submit'
                className="btn"
                value='GET'
                onClick={() => {
                    getData(city);
                }}
            >
            </input>
                <input
                    type="text"
                    value={city ? city : ''}
                    onChange={(e) => {
                        search(e);
                        }
                    }
                    onKeyDown={(e) => {
                        if(e.code === 'Enter') {
                            search(e);
                        }
                    }}
                />
            </div>
            <div className = {data ? 'show' : 'hide'}>
                <p className='city'>{city}</p>
                <p className='temp'>{temp}C°</p>
                <p>Min temperature: {minTemp}C°</p>
                <p>Max temperature: {maxTemp}C°</p>
                <img src= {icon ? `http://openweathermap.org/img/w/${icon}.png` : ''}
                alt=''
                />
                <p className='humidity'>Humidity: {humidity}%</p>
            </div>
        </div>
    )
}

render(<Weather/>, document.querySelector('#root'))

reportWebVitals();
