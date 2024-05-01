import React from "react";
import Slider from "react-slick";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import hero_right from "../assets/images/hero_right.png";



export const Banner = () => {
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return(
        <Slider {...settings}>
            <Box maxWidth="l" className="mt-[-10.5%] single-slider slider-height slider-padding bg-sky-blue flex items-center text-black">
                <Box className="container">
                    <Box className="grid grid-cols-1 md:grid-cols-2 items-center">
                        <Box className="col-span-1 md:col-span-1">
                            <Box className="hero__caption">
                                <Typography 
                                    data-animation="fadeInUp"
                                    data-delay=".4s"
                                    variant="h6"
                                    className=""
                                    paragraph
                                    sx={{
                                        fontWeight: 300,
                                        fontSize: "14px"
                                    }}
                                >
                                    Become Focused &amp; Calm
                                </Typography>
                                <Typography 
                                    variant="h1" 
                                    data-animation="fadeInUp" 
                                    data-delay=".6s"
                                    className=""
                                    sx={{
                                        fontSize: "38px",
                                        fontWeight: 700
                                    }}
                                >
                                    Get things done<br />
                                    with 
                                    <span>{" "}
                                        <Typography
                                            variant="h6"
                                            className="inline text-[#BA324F]"
                                            sx={{
                                                fontSize: "38px",
                                                fontWeight: 700
                                            }}
                                        >
                                            TaskMaster
                                        </Typography>
                                    </span>
                                </Typography>
                                <Typography 
                                    variant="h5" 
                                    paragraph 
                                    data-animation="fadeInUp" 
                                    data-delay=".8s"
                                    sx={{
                                        fontWeight: 300
                                    }}
                                >
                                    The best task manager <br/>and to-do list app.
                                </Typography>
                                <Box className="slider-btns">
                                    <Link
                                        data-animation="fadeInLeft" 
                                        data-delay="1.0s" to="industries.html"
                                    >
                                        <Button 
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                        >
                                            Start Now
                                        </Button>
                                    </Link>
                                    <Link data-animation="fadeInRight" data-delay="1.0s" className="popup-video video-btn ani-btn" to="https://www.youtube.com/watch?v=1aP-TXUpNoU">
                                        {/* <i className="fas fa-play"></i> */}
                                    </Link>
                                </Box>
                            </Box>
                        </Box>
                        <Box className="col-span-1 md:col-span-1">
                            <Box className="hero__img hidden lg:block float-right" data-animation="fadeInRight" data-delay="1s">
                                <img src={hero_right} alt="hero" />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box maxWidth="l" className="mt-[-10.5%] single-slider slider-height slider-padding bg-sky-blue flex items-center">
                <Box className="container">
                <Box className="grid grid-cols-1 md:grid-cols-2 items-center">
                        <Box className="col-span-1 md:col-span-1">
                            <Box className="hero__caption">
                            <Typography 
                                    data-animation="fadeInUp"
                                    data-delay=".4s"
                                    variant="h6"
                                    className=""
                                    paragraph
                                    sx={{
                                        fontWeight: 300,
                                        fontSize: "14px"
                                    }}
                                >
                                    Become Focused &amp; Calm
                                </Typography>
                                <Typography 
                                    variant="h1" 
                                    data-animation="fadeInUp" 
                                    data-delay=".6s"
                                    className=""
                                    sx={{
                                        fontSize: "38px",
                                        fontWeight: 700
                                    }}
                                >
                                    Get things done<br />
                                    with 
                                    <span>{" "}
                                        <Typography
                                            variant="h6"
                                            className="inline text-[#BA324F]"
                                            sx={{
                                                fontSize: "38px",
                                                fontWeight: 700
                                            }}
                                        >
                                            TaskMaster
                                        </Typography>
                                    </span>
                                </Typography>
                                <Typography 
                                    variant="h5" 
                                    paragraph 
                                    data-animation="fadeInUp" 
                                    data-delay=".8s"
                                    sx={{
                                        fontWeight: 300
                                    }}
                                >
                                    The best task manager <br/>and to-do list app.
                                </Typography>
                                <Box className="slider-btns">
                                    <Link
                                        data-animation="fadeInLeft" 
                                        data-delay="1.0s" to="industries.html"
                                    >
                                        <Button 
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                        >
                                            Start Now
                                        </Button>
                                    </Link>
                                    <Link data-animation="fadeInRight" data-delay="1.0s" className="popup-video video-btn ani-btn" to="https://www.youtube.com/watch?v=1aP-TXUpNoU">
                                        {/* <i className="fas fa-play"></i> */}
                                    </Link>
                                </Box>
                            </Box>
                        </Box>
                        <Box className="col-span-1 md:col-span-1">
                            <Box className="hero__img hidden lg:block float-right" data-animation="fadeInRight" data-delay="1s">
                                <img src={hero_right} alt="hero" />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Slider>
    )
}
