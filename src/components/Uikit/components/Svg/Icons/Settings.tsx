import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect y="2" width="9" height="2" rx="1" fill="#33D1DA"/>
    <rect x="19" y="2" width="5" height="2" rx="1" fill="#33D1DA"/>
    <circle cx="14" cy="3" r="2" stroke="#33D1DA" strokeWidth="2"/>
    <rect y="20" width="9" height="2" rx="1" fill="#33D1DA"/>
    <rect x="19" y="20" width="5" height="2" rx="1" fill="#33D1DA"/>
    <circle cx="14" cy="21" r="2" stroke="#33D1DA" strokeWidth="2"/>
    <rect width="9" height="2" rx="1" transform="matrix(-1 0 0 1 24 11)" fill="#33D1DA"/>
    <rect width="5" height="2" rx="1" transform="matrix(-1 0 0 1 5 11)" fill="#33D1DA"/>
    <circle r="2" transform="matrix(-1 0 0 1 10 12)" stroke="#33D1DA" strokeWidth="2"/>
    </Svg>
    
  );
};

export default Icon;