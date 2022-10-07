import React from 'react';
import ContentLoader from "react-content-loader"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
const MyLoader = () => (
    <Card>
        <ContentLoader
            speed={1}
            width={'100%'}
            height={400}
            viewBox="0 0 1209 400"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="5%" y="17" rx="0" ry="0" width="90%" height="42" />
            <rect x="5%" y="78" rx="0" ry="0" width="90%" height="42" />
            <rect x="5%" y="147" rx="0" ry="0" width="90%" height="42" />
            <rect x="5%" y="208" rx="0" ry="0" width="90%" height="42" />
            <rect x="5%" y="266" rx="0" ry="0" width="90%" height="42" />
            <rect x="5%" y="327" rx="0" ry="0" width="90%" height="42" />
        </ContentLoader>

    </Card>

)


export default MyLoader