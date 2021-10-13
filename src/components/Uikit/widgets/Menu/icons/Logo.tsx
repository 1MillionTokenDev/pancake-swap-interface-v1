import React from "react";
import { SvgProps } from "../../../components/Svg/types";

interface LogoProps extends SvgProps {
  isDark: boolean;
}

const Logo: React.FC<LogoProps> = () => {
  return (
    <img src="/images/b1mt.svg" className="b1MT-logo" alt="logo b1MT"/>
  );
};

export default React.memo(Logo, (prev, next) => prev.isDark === next.isDark);
