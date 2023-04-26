import { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import "../Styles/games.css";
import { Container } from "./Navbar";
import { Link } from "react-router-dom";

function Shooter(){
   const [shooterData,setShooterData] = useState([])
    const {toggle,inputValue} = useContext(Container)
    const input = inputValue;

    const Api = "https://api.rawg.io/api/games";
    const Apikey = "6c02bff12c9046f5ad4ed383d6af9c5f";
    const AdventuregameApi = async() => {
       try {
         const data = await axios.get(Api,{
             params : {
                key : Apikey,
                genres: "shooter",
                search: input
            }
        })
        const results = data.data.results
        setShooterData(results)
        console.log(results)
        } catch (error) {
            console.log(error)
            }
       }

    useEffect(() => {
        AdventuregameApi()
    },[input])


    return (
        <Fragment>
            <div className="games_container" id={!toggle? "mainBgColor" : "secondaryBgColor"}>
                {shooterData.map((games) => (
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

export default Shooter;