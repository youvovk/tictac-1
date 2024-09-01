import React from "react";
import classNames from "classnames";

interface SquareProps {
    className: string;
    value: string | null;
    onClick: () => void;
}
const Square:React.FC<SquareProps> = ({className, value, onClick}) => {
    return (
            <div className="board-row">
                <div onClick={onClick} className={classNames("square", className)}>
                    {value && <img src={value} alt="Player Icon"/>}
                </div>
            </div>
        );
};
export default Square;