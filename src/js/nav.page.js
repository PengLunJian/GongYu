/**
 *
 * @constructor
 */
function SideNavMenu() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.config = arguments['config'] ? arguments['config'] : [];
    this.active = arguments['active'] ? arguments['active'] : "active";
    this.sideNavItem = arguments['sideNavItem'] ? arguments['sideNavItem'] : ".nav-item";
    this.init();
}
/**
 *
 * @returns {SideNavMenu}
 */
SideNavMenu.prototype.init = function () {
    this.bindSideNavMenu();
    this.bindSideNavLink();
    this.sideNavItemSelect();
    this.bindStartHtmlLink();
    sessionStorage.removeItem('status');
    return this;
}
/**
 *
 * @returns {SideNavMenu}
 */
SideNavMenu.prototype.sideNavItemSelect = function () {
    var _this = this;
    var $_iframeMain = $('#webApp', parent.document).find(".iframe-main");
    $(document).on("click", this.sideNavItem, function () {
        $(_this.sideNavItem).removeClass(_this.active);
        $(this).addClass(_this.active);
        $_iframeMain.attr("src", this.link);
    });
    return this;
}
/**
 *
 * @param params
 * @returns {SideNavMenu}
 */
SideNavMenu.prototype.bindSideNavMenu = function () {
    var _this = this;
    var LOGIN_DATA = localStorage.getItem("loginData");
    var JSON_MENU = JSON.parse(LOGIN_DATA)['Menus'];

    JSON_MENU.push({
        Name: '设备',
        SystemKey: 'Desktop',
        Url: 'equipment.html'
    });

    var TEMP_HTML = '<ul class="nav-block">'
        + '<li class="nav-item"><span>@</span></li>';

    var OFFSET_TIME_STR = "?v=" + new Date().getTime();
    $(JSON_MENU).each(function () {

        TEMP_HTML += '<li class="nav-item">'
            + '<i class="icon-' + this['SystemKey'] + '">'
            + '</i><span>' + this['Name'] + '</span></li>';

        _this.config.push(this['Url'] + OFFSET_TIME_STR);
    });
    TEMP_HTML += '</ul>';
    $(".side-nav").append(TEMP_HTML);
    return this;
}
/**
 *
 * @returns {SideNavMenu}
 */
SideNavMenu.prototype.bindSideNavLink = function () {
    var _this = this;
    var SELECTOR = this.sideNavItem + ":gt(0)";
    $(SELECTOR).each(function () {
        var index = $(this).index() - 1;
        this.link = _this.config[index];
    });
    return this;
}
/**
 *
 * @returns {SideNavMenu}
 */
SideNavMenu.prototype.bindStartHtmlLink = function () {
    var $_WEB_APP = $('#webApp', parent.document);
    var $_iframeMain = $_WEB_APP.find(".iframe-main");
    var SELECTOR = this.sideNavItem + ':eq(1)';
    var SRC = $(SELECTOR)[0].link;
    $(SELECTOR).addClass("active");
    $_iframeMain.attr("src", SRC);
    return this;
}
/**
 *
 * @type {SideNavMenu}
 */
var sideNavMenu = new SideNavMenu();
