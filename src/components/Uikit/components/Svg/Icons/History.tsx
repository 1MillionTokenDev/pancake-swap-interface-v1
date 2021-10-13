import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="33" height="29" viewBox="0 0 33 29" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M5.55554 14.7778C5.55554 7.59808 11.3758 1.77779 18.5555 1.77779C25.7352 1.77779 31.5555 7.59808 31.5555 14.7778C31.5555 21.9575 25.7352 27.7778 18.5555 27.7778C13.5234 27.7778 8.89801 24.8693 6.73736 20.6869" stroke="#33D1DA" strokeWidth="2" strokeLinecap="round"/>
        <path d="M5.5 17L0 13H11L5.5 17Z" fill="#33D1DA"/>
        <path d="M18.7778 8.23233V15.8687L24.3333 19.1414" stroke="#33D1DA" strokeWidth="2" strokeLinecap="round"/>
    </Svg>
  );
};

export default Icon;