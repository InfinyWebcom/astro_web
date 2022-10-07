import React, { Component } from 'react';
import YourDailyFeed from './DailyFeed'
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    root: {
        width: "100%",
        overflowX: "auto"
    },
    table: {
        minWidth: 700
    },
    row: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.background.default
        }
    },
    responsiveScroll: {
        overflowX: 'auto',
        overflow: 'auto',
        height: '100%',
        maxHeight: '380px',
        minHeight: '380px'
    },
});

class DailyFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { title, dailyFeedData, classes } = this.props
        return (
            <div className={"jr-card jr-full-card"}>
                <div className={"jr-card-header d-flex align-items-center"}>
                    <div className="mr-auto">
                        <h3 className="card-heading d-inline-block mb-0">{title}</h3>
                    </div>
                </div>
                <YourDailyFeed data={dailyFeedData} title={title} className={classes.responsiveScroll} />
            </div>
        );
    }

}

export default withStyles(styles)(DailyFeed);