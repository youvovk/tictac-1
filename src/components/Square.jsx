import React from "react";
import classNames from "classnames";

const Square = ({ className, value, onClick }) => {
    return (
        <div className="board-row">
            <div onClick={onClick} className={classNames("square", className)}>
                {value && <img src={value} alt="Player Icon" />}
            </div>
        </div>
    );
};

export default Square;
