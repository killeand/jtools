export default class RouteFlags {
    static Has(value, test) {
        return (value & test) == test;
    }
    static TestAll(value) {
        const RetVal = {};
        const Keys = Object.keys(this);

        for (let i = 0; i < Keys.length; i++) {
            RetVal[`is${Keys[i]}`] = this.Has(value, this[Keys[i]]);
        }

        return RetVal;
    }
    static Index = 0x1; // Index route, meaning it is the primary child of a sub route to be shown
    static Always = 0x2; // Route will always be shown in the menu
    static Authed = 0x4; // Route will only be shown when authed in menu
    static Admin = 0x8; // Route will only be shown when an admin in menu
    static Hidden = 0x10; // Route will never be shown in the menu, but will be routable
    static External = 0x20; // Route is an external site/resource, use a tags in menu and do not add to routes
}
