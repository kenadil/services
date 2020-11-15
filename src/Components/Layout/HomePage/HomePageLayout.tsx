import React from "react";
import { Description } from "../../../Services/Description";
import ProceedButton from "../../ProceedButton/ProceedButton";
import Layout from "../Layout";

const webpURL = "https://i.ibb.co/z80MQNQ/homescreen-1.webp";
const homePng = {
  pngUrl: "https://i.ibb.co/SNvFvKj/homescreen-1.png",
  alt: "aye",
};

const HomePageLayout = (props: any) => {
  return (
    <Layout>
      <div className="content">
        <h3>{props.name}</h3>
        <div>
          <p>{Description}</p>
          <ProceedButton />
        </div>
      </div>
      <picture>
        <source
          srcSet={webpURL}
          type="image/webp"
          style={{ width: "23.5vw", maxWidth: "480.5px" }}
        />
        <img
          src={homePng.pngUrl}
          alt={homePng.alt}
          style={{ width: "23.5vw", maxWidth: "480.5px" }}
        />
      </picture>
    </Layout>
  );
};

export default HomePageLayout;
