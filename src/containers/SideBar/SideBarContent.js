import React, { Component } from 'react';
import CustomScrollbars from 'util/CustomScrollbars';
import Navigation from "../../components/Navigation";
import { getOrderCount } from 'actions/auth';
import { connect } from 'react-redux'
class SideBarContent extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    this.props.getOrderCount({}, '')
  }
  render() {
    const navigationMenus = [
      {
        name: 'sidebar.main',
        type: 'section',
        children: [
          {
            name: 'sidebar.dashboard',
            icon: 'view-dashboard',
            type: 'item',
            link: '/admin/dashboard',

          },
          {
            name: 'Astrologers',
            icon: 'folder',
            type: 'item',
            link: '/admin/astrologer'

          },
          {
            name: 'Consumers',
            icon: 'account',
            type: 'item',
            link: '/admin/consumers'
          },
          {
            name: 'AstroShop',
            icon: 'store',
            type: 'collapse',
            // disable: true,
            children: [
              {
                name: 'Services',
                type: 'item',
                link: '/admin/astroshops/services'
              },
              {
                name: 'Products',
                type: 'item',
                link: '/admin/astroshops/products'
              }
            ]

          },
          {
            name: 'Tip Of The Day',
            icon: 'assignment',
            type: 'item',
            link: '/admin/tod'
          },
          {
            name: 'Orders',
            icon: 'shopping-cart',
            type: 'item',
            link: '/admin/orders',
            // disable: true,
            isBadge: true
          },
          {
            name: 'Service Requests',
            icon: 'label',
            type: 'item',
            link: '/admin/serviceRequests',
            // disable: true,
          },
          {
            name: 'Broadcasts',
            icon: 'volume-up',
            type: 'item',
            link: '/admin/broadcasts'
          },

          {
            name: 'Financials',
            icon: 'store',
            type: 'collapse',
            children: [
              {
                name: 'Settlements',
                type: 'item',
                link: '/admin/financials/settlements'
              },
              {
                name: 'Transactions',
                type: 'item',
                link: '/admin/financials/transactions'
              }
            ]

          },
          // {
          //   name: 'Support Tickets',
          //   icon: 'comments',
          //   type: 'item',
          //   link: '/admin/ticketing-systems'
          // },
          {
            name: 'Referrals',
            icon: 'flower-alt',
            type: 'item',
            link: '/admin/referrals'
          },
          // {
          //   name: 'Call Requests',
          //   icon: 'phone',
          //   type: 'item',
          //   link: '/admin/call_requests'
          // },
          {
            name: 'Blogs',
            icon: 'blogger',
            type: 'item',
            link: '/admin/blogs'
          }

        ]
      }
    ];

    return (
      <CustomScrollbars className=" scrollbar">
        <Navigation menuItems={navigationMenus} orderCount={this.props.orderCount} />
      </CustomScrollbars>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { orderCount } = auth;
  return { orderCount }
}
export default connect(mapStateToProps, { getOrderCount })(SideBarContent);
