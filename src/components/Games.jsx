import { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import "../Styles/games.css";
import { Container } from "./Navbar";
import { Link } from "react-router-dom";

function Games({id}){
    const [gamesData,setGamesData] = useState([]);
    const {toggle,inputValue} = useContext(Container);
    const input = inputValue;


    const Api = `https://api.rawg.io/api/games`;
    const Apikey = "6c02bff12c9046f5ad4ed383d6af9c5f";
    const GamesApi = async() => {
       try {
         const data = await axios.get(Api,{
             params : {
                key : Apikey,
                search: input
            }
        })
        const results = data.data.results 
        setGamesData(results)
        console.log(results)
        } catch (error) {
            console.log(error)
            }
       }

    useEffect(() => {
        GamesApi()
    },[input])


    return (
        <Fragment>
            <div className="games_container" id={!toggle? "mainBgColor" : "secondaryBgColor"}>
                {gamesData.map((games) => (
                    <Link to={`/${games.id}`} key={games.id} style={{textDecoration:"none"}} id={!toggle? "mainBgColor" : "secondaryBgColor"}>
                    <div className="container">
                     <img src={games.background_image} alt="background_image"/>
                     <h4>{games.name}</h4>
                    </div>
                    </Link>
                ))}
            </div>
        </Fragment>
    )
}

export default Games;