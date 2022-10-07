import React from 'react';
import FeedCell from "./FeedCell";

const DailyFeed = ({ data, className, title }) => {

    return (
        <div className={"daily-feed-body " + className}>
            {data.length > 0 ? data.map((data, index) => {
                return (
                    <FeedCell key={index} feed={data} />
                );
            }) : <div className={"d-flex justify-content-center align-items-center " + className}><h3>{`No ${title} Found!`}</h3></div>}
        </div>
    );
};

export default DailyFeed;