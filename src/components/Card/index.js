import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
const defaultTableStyles = theme => ({
    root: {},
    paper: {
        borderBottomRightRadius: '15px',
        borderBottomLeftRadius: '15px'
    },
});
class CardBox extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { title, children, classes, className } = this.props
        console.log('title=====', title)
        return (
            <Card className={[classes.paper, className]}>
                {title && <CardHeader title={title}>{title}</CardHeader>}
                <CardContent>
                    {children}
                </CardContent>

            </Card>
        );
    }
}

export default withStyles(defaultTableStyles)(CardBox);