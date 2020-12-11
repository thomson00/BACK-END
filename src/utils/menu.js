import store from '../store/index';

const headerMenu = [
    {
        icon: 'icon-dashboard',
        key: 'Dashboard',
        text: 'menu.dashboard'
    },
    {
        icon: 'icon-membermanagement',
        key: 'MemberManagement',
        text: 'menu.member_management'
    },
    {
        icon: 'icon-funding',
        key: 'FundingManagement',
        text: 'menu.funding_management'
    },
    {
        icon: 'icon-Rebate-Report-Management',
        key: 'RebateReportManagement',
        text: 'menu.RebateReportManagement'
    },
    {
        icon: 'icon-Orders-Report-Management',
        key: 'OrdersReportManagement',
        text: 'menu.OrdersReportManagement'
    },
    {
        icon: 'icon-notification',
        key: 'NotificationManagement',
        text: 'menu.notifications_management',
        hide: true
    },
    {
        icon: 'icon-promotion',
        key: 'PromotionManagement',
        text: 'menu.promotion_management'
    },
    {
        icon: 'icon-marketing',
        key: 'MarketingManagement',
        text: 'menu.referral_center'
    },
    {
        icon: 'icon-crmsettings',
        key: 'CRMSettings',
        text: 'menu.crm_settings'
    },
    {
        icon: 'icon-usermanagement',
        key: 'UserManagement',
        text: 'menu.user_management'
    },
    {
        icon: 'icon-promotion',
        key: 'SalesPromotionManagement',
        text: 'menu.promotion_management'
    },
    {
        icon: 'icon-crmsettings',
        key: 'SalesProfile',
        text: 'menu.profile',
        hide: true
    },
    {
        icon: 'icon-crmsettings',
        key: 'AdminProfile',
        text: 'menu.profile',
        hide: true
    }
];

export const hasPermission = ({ name, full_access = false }) => {
    const permissionList = store.state.permissionList;
    const hasReadOnlyPermission = `${name}-ReadOnly`;
    const hasFullAccessPermission = `${name}-FullAccess`;
    const isExist = permissionList.find(val => {
        if (full_access === true) {
            return val === hasFullAccessPermission;
        } else {
            return val === hasFullAccessPermission || val === hasReadOnlyPermission;
        }
    });
    return isExist !== undefined;
};

export const getHeaderMenu = () => {
    let filterHeaderMenu;
    if (store.state.role !== 'sale') {
        filterHeaderMenu = headerMenu.filter(item => item.key !== 'Dashboard');
    }
    return filterHeaderMenu.filter(item => {
        return hasPermission({ name: item.key }) === true && !item.hide;
    });
};
