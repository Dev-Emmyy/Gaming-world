import { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import "../Styles/games.css";
import { Container } from "./Navbar";
import { Link } from "react-router-dom";
import {AiOutlineTwitter, AiFillGithub, AiFillLinkedin} from "react-icons/ai";
import btm_img from "./btm_img.jpg";

function Games({id}){
    const [gamesData,setGamesData] = useState([]);
    const {toggle,inputValue} = useContext(Container);
    const input = inputValue;
    const backgroundImage = btm_img;

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
           {loading ? ( // Render loading spinner if loading is true
              <div className="loading-spinner"></div>
            ) : (
            <div id={!toggle? "secondaryBgColor" :  "mainBgColor"}>
                <div className="games_container">
                    {gamesData.map((games) => (
                    <Link to={`/${games.id}`} key={games.id} style={{textDecoration:"none"}} >
                    <div className="container" id={!toggle? "secondaryColor" :  "mainColor"}>
                     <img src={games.background_image} alt="background_image"/>
                     <h4>{games.name}</h4>
                    </div>
                    </Link>
                ))}
                </div>

                <div className="bottom_bg" style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height:"300px",
                }}>
                <h2>Connect with me</h2>
                <div className="iconContainer">
                    <a href="https://twitter.com/9gunna9">
                        <AiOutlineTwitter fontSize={30} color="#1DA1F2"/>
                    </a>
                     <a href="https://github.com/Dev-Emmyy">
                        <AiFillGithub fontSize={30} color="000"/>
                    </a>
                     <a href="https://www.linkedin.com/in/ugochukwu-emmanuel-ba798a25a/">
                        <AiFillLinkedin fontSize={30} color="#0A66C2"/>
                    </a>
                </div>
                <h2>Built by Dev-Emmy</h2>
              </div>
            </div>
             )}
        </Fragment>
    )
}

export default Games;