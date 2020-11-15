import React from "react";
import { Description } from "../../../Services/Description";
import ProceedButton from "../../ProceedButton/ProceedButton";

const webpURL = "../../../../public/images/homescreen_1.webp";
const pngURL = "../../../../public/images/homescreen_1.png";

const HomePageLayout = (props: any) => {
    return (
        <div className="site-layout-content">
            <h3>{props.name}</h3>
            <div className="content">
                <div>
                    {Description}
                    <ProceedButton />
                </div>
                <picture>
                    <source srcSet={webpURL} type="image/webp"/>
                    <img src={pngURL} alt=""/>
                </picture>
            </div>
        </div>
    )
}

export default HomePageLayout;