import { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import "../Styles/games.css";
import { Container } from "./Navbar";
import {AiOutlineTwitter, AiFillGithub, AiFillLinkedin} from "react-icons/ai";
import { Link } from "react-router-dom";
import btm_img from "./btm_img.jpg";

function Adventure(){
   const [adventureData,setAdventureData] = useState([]);
    const {toggle,inputValue} = useContext(Container);
    const input = inputValue;
    const backgroundImage = btm_img;

    const Api = "https://api.rawg.io/api/games";
    const Apikey = "6c02bff12c9046f5ad4ed383d6af9c5f";
    const AdventuregameApi = async() => {
       try {
         const data = await axios.get(Api,{
             params : {
                key : Apikey,
                genres: "adventure",
                search: input
            }
        })
        const results = data.data.results
        setAdventureData(results)
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
            <div className="games_container" id={!toggle? "secondaryBgColor" : "mainBgColor" }>
                {adventureData.map((games) => (
                    <Link to={`/${games.id}`} key={games.id} style={{textDecoration:"none"}}>
                     <div className="container" id={!toggle? "secondaryColor" : "mainColor"}>
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
        </Fragment>
    )
}

export default Adventure;