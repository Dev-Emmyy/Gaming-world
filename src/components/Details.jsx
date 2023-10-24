import { Fragment, useContext, useEffect, useState } from "react";
import {AiFillLinkedin,AiOutlineTwitter,AiFillGithub} from "react-icons/ai"
import axios from "axios";
import { Container } from "./Navbar";
import { useParams } from "react-router-dom";
import logo from "./logo.png";
import "../Styles/details.css";
import {GoPrimitiveDot} from "react-icons/go";
import BottomBg from "./btm_img.jpg";

function Details(){
    const [detailsData,setDetailsData] = useState({});
    const {toggle} = useContext(Container);
    const backgroundStyle = `${detailsData.background_image}`
    const {id} = useParams();

    const Api = `https://api.rawg.io/api/games/${id}`;
    const Apikey = "6c02bff12c9046f5ad4ed383d6af9c5f";
    const DetailsApi = async() => {
       try {
         const data = await axios.get(Api,{
             params : {
                key : Apikey,
            }
        })
        const results = data.data
        setDetailsData(results)
        console.log(results)
        } catch (error) {
            console.log(error)
            }
       }

    useEffect(() => {
        DetailsApi()
    },[]);


    return (
        <Fragment>
            <div style={{backgroundImage : `url(${backgroundStyle})`,backgroundSize:'cover',backgroundRepeat: 'no-repeat',height: '1200px',backgroundPosition: 'center'}}>
            <div className="details_overlay"></div>
            <div className="details_container">
               <div className="details_container_left">
                <div className="details_timing_part">
                    <p><span>{detailsData.released}</span></p>
                    <p>AVERAGE PLAYTIME: {detailsData.playtime} HOURS</p>
                </div>
                <h1>{detailsData.name}</h1>

                <div className="details_ratings">
                    <h3>Exceptional </h3>
                    <img src={logo} alt="" width="50px"/>
                </div>

                <div className="details_ratings_list">
                {detailsData.ratings && detailsData.ratings.length > 0 && detailsData.ratings.map(rating=> (
                            <p><GoPrimitiveDot color="red"/>{rating.title} <span>{rating.count}</span></p>
                ))}
                 </div>

                <div className="details_about">
                    <h2>About</h2>
                   {detailsData.description_raw && detailsData.description_raw.length > 1300 ? 
                    <p>{detailsData.description_raw.substring(0, 1300)}...</p> : 
                    <p>{detailsData.description_raw}</p>
                    }
                </div>

                <div className="details_info_container">
                    <div>
                        <div className="details_info_title">
                            <h3>Platforms</h3>
                            <div className="details_info">
                                 {detailsData.parent_platforms && detailsData.parent_platforms.length > 0 && detailsData.parent_platforms.map(platform => (
                        <p>{platform.platform.name}</p>
                    ))}
                            </div>
                        </div>

                        <div className="details_info_title">
                            <h3>Genre</h3>
                           <div className="details_info">
                             {detailsData.genres && detailsData.genres.map(genre => (
                        <p>{genre.name}</p>
                    ))}
                           </div>
                        </div>

                        <div className="details_info_title">
                            <h3>Developer</h3>
                            <div className="details_info">
                                {detailsData.developers && detailsData.developers.map(develop => (
                        <p>{develop.name}</p>
                    ))}
                            </div>
                        </div>

                    </div>

                    <div>
                        <div className="details_info_title">
                            <h3>MetaScore</h3>
                            <div className="details_info_score">
                                <p>{detailsData.metacritic}</p>
                            </div>
                        </div>

                        <div className="details_info_title">
                            <h3>Release Date</h3>
                            <div className="details_info_date">
                                <p>{detailsData.released}</p>
                            </div>
                        </div>

                        <div className="details_info_title">
                             <h3>Publishers</h3>
                            <div className="details_info">
                                {detailsData.publishers && detailsData.publishers.map(publish => (
                        <p>{publish.name}</p>
                    ))}
                            </div>
                        </div>

                    </div>
                </div>

               </div>

               <div className="details_container_right">
                <img src={detailsData.background_image_additional} alt="" width="500px" height="300px"/>
                 <div>
                    <div className="details_info_right">
                        <h3>Tags</h3>
                         <div className="details_info_tag">
                            {detailsData.tags && detailsData.tags.map(tag => (
                        <p>{tag.name}</p>
                    ))}
                         </div>
                    </div>

                    <div  className="details_info_right">
                        <h3>Website</h3>
                        <div className="details_info_tag">
                            <p><a href={detailsData.website}>{detailsData.website}</a></p>
                        </div>
                    </div>
                </div>
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
        </div>
        </Fragment>
    )
}

export default Details;