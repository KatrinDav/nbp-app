import React from "react";
const Option = ({ value, name }) => {
    return (
        <>
            <option value={value}>
                {value} - {name}
            </option>
        </>
    );
};

export default Option;