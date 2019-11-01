import React from "react";
const Result = ({ rate, date, table }) => {
    return (
        <div className="main">
            <h3>
                Kurs średni NBP: <span>{rate}</span>{" "}
            </h3>
            <h3>
                z dnia: <span>{date}</span>{" "}
            </h3>
            <h3>
                tabela Nr: <span>{table}</span>
            </h3>
        </div>
    );
};

export default Result;