import { Fragment, useState,createContext} from "react";
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

function Navbar() {
    const[toggle,setToggle] = useState(false)
    const[inputValue,setInputValue] = useState("")
   

    return(
       <Container.Provider value={{toggle,inputValue}}>
         <Fragment>
            <div className={!toggle? "mainBgColor" : "secondaryBgColor"}>
                <nav className="navbar">
                    <h2 className={!toggle? "mainColor" : "secondaryColor"}>
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

                        <div className="nav_search">
                            <input type="text" placeholder="Search for a game..." onChange={(e) => setInputValue(e.target.value)}/>
                            <AiOutlineSearch color="black"/>
                        </div>

                        <div className="nav_mode" onClick={() => setToggle(!toggle)}>
                            <h3 className={!toggle? "b_mode" : "w_mode"}>{toggle? "LightMode" : "DarkMode"}</h3>
                            <BiMoon fontSize={23} id="mode" color="#fff"  className={toggle?  "display" : "noDisplay"}/>
                             <BsCloudSun fontSize={23} id="mode"  color="#fff"  className={toggle? "noDisplay" :   "display"}/>
                        </div>
                </nav>
            </div>

            <Routes>
                <Route path="" element={<Games/>}/>
                <Route path="Action" element={<Action/>}/>
                <Route path="Adventure" element={<Adventure/>}/>
                <Route path="Puzzle" element={<Puzzle/>}/>
                <Route path="Racing" element={<Racing/>}/>
                <Route path="Shooter" element={<Shooter/>}/>
                <Route path="Sports" element={<Sports/>}/>
                <Route path=":id" element={<Details/>}/>
            </Routes>
        </Fragment>
       </Container.Provider>
    )
}

export default Navbar;