import React from 'react';
import { List } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';

import IntlMessages from "../../util/IntlMessages";
const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 1,
    marginLeft: theme.spacing.unit * 2,
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`,
  },
});
const NavMenuItem = props => {
  const { name, icon, link, isBadge, classes, orderCount, disable } = props;
  const handleClick = (e) => {
    if (disable) e.preventDefault()
  }
  return (
    <List component="div" className='nav-menu-item'>
      <NavLink onClick={handleClick} className="prepend-icon nav-menu-link" disable={disable} to={link}>
        {!!icon && (
          <i className={(disable ? 'text-grey' : 'text-secondary') + ' zmdi zmdi-hc-fw  zmdi-' + icon} />
        )}
        <span className={disable ? 'text-grey' : '' + " nav-text text-uppercase"}><IntlMessages id={name} /></span>{' '}
        {isBadge && orderCount > 0 && <span> <Badge className={classes.margin} badgeContent={orderCount} color="secondary"></Badge></span>}
      </NavLink>

    </List>
  )
};

export default withStyles(styles)(NavMenuItem);