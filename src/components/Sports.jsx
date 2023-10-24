import { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import "../Styles/games.css";
import { Container } from "./Navbar";
import { Link } from "react-router-dom";
import {AiOutlineTwitter, AiFillGithub, AiFillLinkedin} from "react-icons/ai";
import BottomBg from "./btm_img.jpg";

function Sports(){
    const [SportsData,setSportsData] = useState([]);
    const {toggle,inputValue} = useContext(Container);
    const input = inputValue;
    const [loading, setLoading] = useState(true);

    const Api = "https://api.rawg.io/api/games";
    const Apikey = "6c02bff12c9046f5ad4ed383d6af9c5f";
    const SportsgameApi = async() => {
       try {
         const data = await axios.get(Api,{
             params : {
                key : Apikey,
                genres: "sports",
                search: input
            }
        })
        const results = data.data.results
        setSportsData(results)
        console.log(results)
        } catch (error) {
            console.log(error)
            }
       }

    useEffect(() => {
        SportsgameApi()
    },[input]);

    useEffect(() => {
        setTimeout(() => {
        setLoading(false);
        }, 5000);
    }, []);


    return (
        <Fragment>
             {loading ? ( // Render loading spinner if loading is true
              <div className="loading-spinner"></div>
            ) : (
            <div id={!toggle? "secondaryBgColor" : "mainBgColor" }>
                <div className="games_container">
                {SportsData.map((games) => (
                    <Link to={`/${games.id}`} key={games.id} style={{textDecoration:"none"}}>
                     <div className="container" id={!toggle? "secondaryColor" : "mainColor"}>
                     <img src={games.background_image} alt="background_image"/>
                     <h4>{games.name}</h4>
                    </div>
                    </Link>
                ))}
            </div>

            <div className="bottom_bg">
            <img src={BottomBg} width="100%" height="350px" />
            <div className="profile_link">
              <div className="contact">
                <h2>Connect Us</h2>
              </div>
              <div className="profile">
                <a href="https://www.linkedin.com/in/ugochukwu-emmanuel-ba798a25a/">
                  <AiFillLinkedin color="#0072b1" fontSize={30} cursor="pointer" fontWeight="bolder" />
                </a>
                <a href="https://twitter.com/9Gunna9">
                  <AiOutlineTwitter color="#1DA1F2" fontSize={30} fontWeight="bolder" />
                </a>
                <a href="https://github.com/Dev-Emmyy">
                  <AiFillGithub color="black" fontSize={30} cursor="pointer" fontWeight="bolder" />
                </a>
              </div>
              <div>
                <h2>My Challenge 1 project, Created by Dev-Emmy</h2>
              </div>
            </div>
          </div>
        </div>
         )}
        </Fragment>
    )
}

export default Sports;