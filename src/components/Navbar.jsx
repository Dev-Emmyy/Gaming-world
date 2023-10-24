import { Fragment, useState,createContext,useEffect} from "react";
import axios from "axios";
import {AiOutlineSearch} from "react-icons/ai";
import {BiMoon} from "react-icons/bi";
import {BsCloudSun} from "react-icons/bs";
import {Routes,Route,NavLink} from "react-router-dom";
import Action from "./Action";
import Adventure from "./Adventure";
import Games from "./Games";
import Puzzle from "./Puzzle";
import Racing from "./Racing";
import Shooter from "./Shooter";
import Sports from "./Sports";
import Details from "./Details";

import "../Styles/NavbarStyle.css";
export const Container = createContext()


const API_URL = "https://api.rawg.io/api/games";
const Apikey = "6c02bff12c9046f5ad4ed383d6af9c5f";

function Navbar() {
    const [backgroundImage, setBackgroundImage] = useState("");
    const[toggle,setToggle] = useState(false);
    const[inputValue,setInputValue] = useState("");

     const fetchRandomImage = async () => {
    try {
      const { data } = await axios.get(API_URL, {
        params: {
          key: Apikey,
          ordering: "random", 
          page_size: 60,
        },
      });

       const randomIndex = Math.floor(Math.random() * data.results.length);
    const randomGame = data.results[randomIndex];

    if (randomGame && randomGame.background_image) {
      setBackgroundImage(randomGame.background_image);
    } else {
      console.log("No background image found in the API response.");
    }
  } catch (error) {
    console.log("Error fetching random image:", error);
  }
};

    useEffect(() => {
        fetchRandomImage();
        const interval = setInterval(fetchRandomImage, 10000); 
        return () => clearInterval(interval);
    }, []);



    return(
       <Container.Provider value={{toggle,inputValue}}>
         <Fragment>
          <div
            className={!toggle ? "mainBgColor" : "secondaryBgColor"}
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height:"300px",
              position: "relative",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
            }}
          >

                <div className="overlay"></div>
                <nav className="navbar">
                    <h2 className="mainBgColor">
                        Gaming World
                    </h2>

                        <div id="nav_link" className={!toggle? "mainBgColor" : "secondaryBgColor"}>
                        <NavLink to="/">
                        <span className="link">Top-Games</span>
                        </NavLink>

                        <NavLink to="/Action">
                        <span className="link">Action</span>
                        </NavLink>

                         <NavLink to="/Adventure">
                        <span  className="link">Adventure</span>
                        </NavLink>

                         <NavLink to="/Puzzle">
                        <span  className="link">Puzzle</span>
                        </NavLink>

                         <NavLink to="/Racing">
                        <span  className="link">Racing</span>
                        </NavLink>

                         <NavLink to="/Shooter">
                        <span  className="link">Shooter</span>
                        </NavLink>

                         <NavLink to="/Sports">
                        <span  className="link">Sports</span>
                        </NavLink>
                        </div>

                        <div className="nav_search" >
                            <input type="text" placeholder="Search for a game..." onChange={(e) => setInputValue(e.target.value)}/>
                            <AiOutlineSearch color="black"/>
                        </div>

                        <div className="nav_mode" onClick={() => setToggle(!toggle)}>
                            <h3 className={!toggle? "w_mode" : "b_mode"}>{toggle? "LightMode" : "DarkMode"}</h3>
                             <BsCloudSun fontSize={23} id="mode"  color="#fff"  className={toggle? "noDisplay" :  "display"}/>
                             <BiMoon fontSize={23} id="mode" color="#fff"  className={toggle?  "display"  : "noDisplay"}/>
                        </div>
                </nav>
            </div>

           <Routes>
            <Route path="/*" element={<Games />} key="games" />
            <Route path="/Action" element={<Action />} key="action" />
            <Route path="/Adventure" element={<Adventure />} key="adventure" />
            <Route path="/Puzzle" element={<Puzzle />} key="puzzle" />
            <Route path="/Racing" element={<Racing />} key="racing" />
            <Route path="/Shooter" element={<Shooter />} key="shooter" />
            <Route path="/Sports" element={<Sports />} key="sports" />
            <Route path="/:id" element={<Details/>}key="details" />
          </Routes>

        </Fragment>
       </Container.Provider>
    )
}

export default Navbar;