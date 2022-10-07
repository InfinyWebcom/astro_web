import React from 'react';
import CustomScrollbars from 'util/CustomScrollbars';
import MarketingTableCell from './MarketingTableCell';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({

    responsiveScroll: {
        overflowX: 'auto',
        overflow: 'auto',
        height: '100%',
        maxHeight: '155px',
    },

}));
const MarketingTable = ({ data, desc, subCaption, service }) => {
    console.log('MarketingTable', data, desc)
    const classes = styles();
    return (
        <div className={"table-responsive-material markt-table " + classes.responsiveScroll}>
            <table className={"table default-table table-sm full-table remove-table-border table-hover mb-0 scroll "}>
                <tbody>

                    {data.map(data => {
                        return (
                            <MarketingTableCell key={data.id} data={data} image_url={data.image_url} desc2={`${desc}`} subCaption={subCaption} service={service} />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default MarketingTable;