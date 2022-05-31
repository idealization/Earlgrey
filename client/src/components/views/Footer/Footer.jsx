import React from "react";
import "../../../css/Footer.css";
import 'bootstrap/dist/css/bootstrap.min.css';



function Footer(props) {
  const {
    title,
    generatingMyFaceIllustNfts,
    projectBy,
    name,
    yimYerin,
    httpsGithubComI,
    x2022CauCapstoneDesign_Cft,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="footer screen">
        <div className="flex-col montserrat-normal-black-20px">
          <div className="flex-row">
            <h1 className="title">{title}</h1>
            <div className="generating-my-face-illust-nf-ts">{generatingMyFaceIllustNfts}</div>
          </div>
          <div className="flex-row-1">
            <div className="project-by">{projectBy}</div>
            <div className="name"><a href="https://github.com/idealization">{name}</a></div>
            <div className="yim-yerin"><a href="https://github.com/lynn06091">{yimYerin}</a></div>
          </div>
          <div className="httpsgithubcomi"><a href="https://github.com/idealization/Earlgrey">{httpsGithubComI}</a></div>
        </div>
        <div className="x2022-cau-capstone-design_cft">{x2022CauCapstoneDesign_Cft}</div>
      </div>
    </div>
  );
}

export default Footer;