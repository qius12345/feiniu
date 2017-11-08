//requirejs config

var host = location.host;

var version = new Date().getTime();

if(host.indexOf("beta2.fn") !== -1 || host.indexOf("beta1.fn") !== -1 || host.indexOf("dev1.fn") !== -1 || document.referrer.indexOf("pmadmin.feiniu.com") !== -1 || location.hash === "#debugopen"){

	var basePath = static_domain + "/product/js/";

}else{

	var basePath = static_domain + "/product/js_build/";

}

var pathsJson = null,
	shimJson = null;

var merge = function() {
	if (arguments.length > 0) {
		var re = arguments[0];
		for (var i = 1; i < arguments.length; i++) {
			var o = arguments[i];
			for (var p in o) {
				if (o[p] != undefined) {
					re[p] = o[p];
				}
			}
		}
		return re;
	}
	return undefined;
};

shimJson = {
	"base64": {
		deps: ["jquery"],
		exports: 'BASE'
	},
	'underscore':{
	    exports: '_'
	},
	'backbone': {
	    deps: ['underscore', 'jquery'],
	    exports: 'Backbone'
	},
    "ckeditor":["lib/ckeditor/4.5.9_full/ckeditor"],
    
    "qrcode" : ["lib/jquery/qrcode/qrcode"],
	
    'dialog':{
        deps: ['jquery','defaults','popup'],
        exports: 'dialog'
    },
    'pubartpul':{
        deps: ['jquery','dialog','drag'],
        exports: 'pubartpul'
    },
	'arrivalshop':{
		deps: ['jquery','fnDialog','pubartpul'],
	    exports: 'arrivalshop'
	}

};

pathsJson = {

	css: "../css",

	idigger: "lib/idigger",

	upLogger: "lib/upLogger",

	jquery: "lib/jquery/1.11.1/jquery-1.11.1",

	artDialog: "lib/artdialog/jquery.artDialog",
	
	ckeditor : "lib/ckeditor/4.5.9_full/ckeditor",
	
    qrcode : "lib/jquery/qrcode/qrcode",

	underscore: "lib/underscore/1.8.3/underscore",

	backbone: "lib/backbone/1.2.3/backbone",

	base64: "lib/jquery/base64/jquery.base64",

	arrivalshop: 'lib/arrivalshop',

	pubartpul: "widget/pubartpul",

	dialog: "widget/pubdialog",

	drag: "widget/pubdrag",

	popup:"widget/pubpopup",

	defaults:"widget/pubConfig",

	patibility:"widget/patibility",

	fnDialog: static_domain+'/js/controller/member/fnDialog',

	index_rush: front_domain + '/js/tpl/index_rush.tpl',

	index_floor: front_domain + '/js/tpl/index_floor.tpl',

	index_floor_tab: front_domain + '/js/tpl/index_floor_tab.tpl',

	index_recommend: front_domain + '/js/tpl/index_recommend.tpl',

	index_channel: front_domain + '/js/tpl/index_channel.tpl',

	index_brand: front_domain + '/js/tpl/index_brand.tpl',

	index_ad: front_domain + '/js/tpl/index_ad.tpl',

	pub_dist_list: front_domain + '/js/tpl/pub_dist_list.tpl',

	pub_search_autolist: front_domain + '/js/tpl/pub_search_autolist.tpl',

	pub_category: front_domain + '/js/tpl/pub_category.tpl'
};

//如果是edit模式,追加一些配置信息
if (current_mode === 'edit') {

	pathsJson = merge(pathsJson, {

		'jquery.ui.custom': front_domain + '/js/jquery-ui/js/jquery-ui-1.10.0.custom.min',

		'jquery.ui.core': front_domain + '/js/jquery-ui/js/jquery.ui.core',

		'jquery.ui.widget': front_domain + '/js/jquery-ui/js/jquery.ui.widget',

		'jquery.ui.mouse': front_domain + '/js/jquery-ui/js/jquery.ui.mouse',

		'jquery.ui.sortable': front_domain + '/js/jquery-ui/js/jquery.ui.sortable',

		'easyui': front_domain + '/js/easyui/jquery.easyui.min',

		'easyui.1.4.4': front_domain + '/js/easyui/jquery.easyui.1.4.4.min',

		'easyui_lang_zh_CN': front_domain + '/js/easyui/locale/easyui-lang-zh_CN',

		'jquery.validatebox': front_domain + '/js/easyui/plugins/jquery.validatebox',

		'spectrum': front_domain + '/js/spectrum/spectrum',

		'upload_pic_index': front_domain + '/js/pmadmin/upload_pic_index',

		'edit_index': front_domain + '/js/pmadmin/edit_index',

		'indexv7_valid': front_domain + '/js/pmadmin/indexv7_valid',

		'widget_common': front_domain + '/js/pmadmin/widget_common',

		'jquery_image_maps': front_domain + '/js/pmadmin/jquery_image_maps',

		'edit_market': 'lib/pmadmin/edit_market',

		'market_widget_edit': 'lib/pmadmin/market_widget_edit',
		'header_edit_base': front_domain + '/js/header_edit/base',

		'spectrum': front_domain+ '/js/spectrum/spectrum',

		'tp_edit': front_domain + '/js/view-edit/js/pubTpEdit',

		'pub_view': front_domain + '/js/view-edit/js/pubView'

	});

	shimJson = merge(shimJson, {

		'jquery.ui.custom': ['lib/jquery/1.11.1/jquery-1.11.1'],

		'jquery.ui.core': ['lib/jquery/1.11.1/jquery-1.11.1'],

		'jquery.ui.widget': ['jquery.ui.core'],

		'jquery.ui.mouse': ['jquery.ui.widget'],

		'jquery.ui.sortable': ['jquery.ui.mouse'],

		'easyui': ['lib/jquery/1.11.1/jquery-1.11.1'],

		'easyui.1.4.4': ['lib/jquery/1.11.1/jquery-1.11.1'],

		'spectrum': ['lib/jquery/1.11.1/jquery-1.11.1'],

		'upload_pic_index': ['lib/jquery/1.11.1/jquery-1.11.1'],

		'easyui_lang_zh_CN': ['easyui.1.4.4'],

		'header_edit_base': ['easyui'],

		'jquery.validatebox': ['easyui.1.4.4']
	});

}

require.config({

	waitSeconds: 2000,

	baseUrl: basePath, //所有模块的查找根路径   当加载纯.js文件(依赖字串以/开头，或者以.js结尾，或者含有协议)

	paths: pathsJson,

	urlArgs: 'version=' + (host.indexOf("beta2.fn") !== -1 ? (new Date().getTime()):time_stamp), //time_stamp

	shim: shimJson
});