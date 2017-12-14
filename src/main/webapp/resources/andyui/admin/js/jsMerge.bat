copy base.js+layout.js+browserbase.js+colorbase.js+database.js+loading.js+template.js+keyboard.js+tooltip.js+dailog.js+datagrid.js+tabs.js+switch.js+form.js+accordion.js+pagination.js+datagrid_pagination.js+selector\selector.js+combo.js+spinner.js+mousewheel.js+drag.js+multiSelectBox.js+related.js+alert.js+radiobox.js+checkbox.js+jquery.rippler.js+topnav.js+sidemenu.js+tabsheader.js+scrollbar.js+inputcombo.js+pathurl.js andyui-debug.js /b
copy andyui-debug.js andyui.js/b
uglifyjs andyui.js -m -o andyui.min.1.0.js

set user=/* Version1.1.1 versionDate:%date:~0,10% */
echo %user%>"%%~andyui.tmp"
type andyui.js>>"%%~andyui.tmp"
move "%%~andyui.tmp" andyui.js