/**
 * 新增权限步骤:
 * 1.在permissionID数组中添加权限对象
 * ** name: 权限名称
 * ** id: 权限ID
 * ** useless: 权限是否有效/使用
 * ** singlePermission: 是否为单一权限
 *
 * 2.在permissionList数组中添加权限分支对象用于页面权限树的显示
 * ** showName: 显示名称
 * ** name: 权限名称
 * ** checked: 是否选中
 * ** sonAllChecked: 子权限是否全部选中
 * ** templates: 可选权限
 * ** template: 当前已选权限
 * ** showSonAccess: 是否显示子权限
 * ** son: 子权限集合
 * ** read_only: 只读
 * ** search_only: 只查
 *
 * 3.判断当前权限是否为特殊权限,如果是则需要在permissionTable.vue文件的nonEssentialPermission属性中添加对应的权限名称
 */
const permissionID = [
    {
        name: 'UserManagement-ReadOnly',
        id: 1,
        useless: false
    },
    {
        name: 'LoginManagement-FullAccess',
        id: 2,
        useless: false,
        singlePermission: true
    }
];
const permissionList = [
    {
        showName: 'UserManagement.AdminUser.member_management',
        name: 'Member Management',
        checked: false,
        sonAllChecked: false,
        templates: ['Read Only', 'Full Access'],
        template: '',
        showSonAccess: false,
        read_only: 0,
        search_only: 0,
        son: [
            {
                showName: 'UserManagement.AdminUser.member_detail',
                name: 'Member Detail',
                checked: false,
                sonTemplates: [],
                template: '',
                read_only: 0,
                search_only: 0
            },
            {
                showName: 'UserManagement.AdminUser.pending_customer',
                name: 'Pending Customer',
                checked: false,
                sonTemplates: [],
                template: '',
                read_only: 0,
                search_only: 0
            }
        ]
    }
];
// 获取权限
export const getPermissionList = () => {
    return permissionList.filter(item => {
        return item;
    });
};

// 获取可用权限
export const getPermissions = () => {
    return permissionID.filter(item => {
        return item.useless === false;
    });
};

// 获取可用权限ID
export const getPermissionID = name => {
    const usefulPermissions = getPermissions();
    return usefulPermissions
        .filter(item => {
            if (item.name === name) {
                return item.id;
            }
        })
        .map(item => {
            return item.id;
        });
};
