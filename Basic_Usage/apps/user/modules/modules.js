define([
	'apps/user/modules/edit/app',
	'apps/user/modules/edit_info/app',
	'apps/user/modules/edit_addr/app'],function (edit,editinfo,editaddr){
	return{
		edit:edit,
		editinfo:editinfo,
		editaddr:editaddr
	};
});