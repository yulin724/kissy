/*
Copyright (c) 2009, Kissy UI Library. All rights reserved.
MIT Licensed.
http://kissy.googlecode.com/

Date: 2009-09-07 22:43:06
Revision: 138
*/
var KISSY=window.KISSY||{};KISSY.Editor=function(a,b){var c=KISSY.Editor;if(!(this instanceof c)){return new c(a,b)}else{if(!c._isReady){c._setup()}return new c.Instance(a,b)}};(function(b){var a=YAHOO.lang;a.augmentObject(b,{version:"0.1",lang:{},mods:{},plugins:{},add:function(c,e,d){this.mods[c]={name:c,fn:e,details:d||{}};return this},addPlugin:function(f,j){var d=typeof f=="string"?[f]:f,e=this.plugins,h,g,c;for(g=0,c=d.length;g<c;++g){h=d[g];if(!e[h]){e[h]=a.merge(j,{name:h})}}},_isReady:false,_setup:function(){this._loadModules();this._isReady=true},_attached:{},_loadModules:function(){var f=this.mods,e=this._attached,d,c;for(d in f){c=f[d];if(!e[d]&&c){e[d]=c;if(c.fn){c.fn(this)}}}}})})(KISSY.Editor);KISSY.Editor.add("config",function(a){a.config={base:"",language:"en",theme:"default",toolbar:["source","undo","redo","fontName","fontSize","bold","italic","underline","strikeThrough","foreColor","backColor","","link","smiley","image","blockquote","","insertOrderedList","insertUnorderedList","outdent","indent","justifyLeft","justifyCenter","justifyRight","","maximize"]}});KISSY.Editor.add("lang~en",function(a){a.lang.en={source:{text:"Source",title:"Source"},undo:{text:"Undo",title:"Undo (Ctrl+Z)"},redo:{text:"Redo",title:"Redo (Ctrl+Y)"},fontName:{text:"Font Name",title:"Font",options:{Default:"Arial",Arial:"Arial","Times New Roman":"Times New Roman","Arial Black":"Arial Black","Arial Narrow":"Arial Narrow","Comic Sans MS":"Comic Sans MS","Courier New":"Courier New",Garamond:"Garamond",Georgia:"Georgia",Tahoma:"Tahoma","Trebuchet MS":"Trebuchet MS",Verdana:"Verdana"}},fontSize:{text:"Font Size",title:"Font size",options:{Default:"2","8":"1","10":"2","12":"3","14":"4","18":"5","24":"6","36":"7"}},bold:{text:"Bold",title:"Bold (Ctrl+B)"},italic:{text:"Italic",title:"Italick (Ctrl+I)"},underline:{text:"Underline",title:"Underline (Ctrl+U)"},strikeThrough:{text:"Strikeout",title:"Strikeout"},link:{href:"URL:",text:"Text:",target:"Open link in new window",remove:"Remove link"},blockquote:{text:"Blockquote",title:"Insert blockquote"},smiley:{text:"Smiley",title:"Insert smiley"},image:{text:"Image",title:"Insert or modify image..."},insertOrderedList:{text:"Numbered List",title:"Numbered List (Ctrl+7)"},insertUnorderedList:{text:"Bullet List",title:"Bullet List (Ctrl+8)"},outdent:{text:"Decrease Indent",title:"Decrease Indent"},indent:{text:"Increase Indent",title:"Increase Indent"},justifyLeft:{text:"Left Justify",title:"Left Justify (Ctrl+L)"},justifyCenter:{text:"Center Justify",title:"Center Justify (Ctrl+E)"},justifyRight:{text:"Right Justify",title:"Right Justify (Ctrl+R)"},foreColor:{text:"Text Color",title:"Text Color"},backColor:{text:"Text Background Color",title:"Text Background Color"},maximize:{text:"Maximize",title:"Maximize"},common:{ok:"OK",cancel:"Cancel"}}});KISSY.Editor.add("core~plugin",function(a){a.PLUGIN_TYPE={CUSTOM:0,TOOLBAR_SEPARATOR:1,TOOLBAR_BUTTON:2,TOOLBAR_MENU_BUTTON:4,TOOLBAR_SELECT:8,FUNC:16}});KISSY.Editor.add("core~dom",function(b){var a=YAHOO.env.ua;b.Dom={getText:function(c){return c?(c.textContent||""):""},setItemUnselectable:function(g){var d,f,c,h,e;d=g.getElementsByTagName("*");for(f=-1,c=d.length;f<c;++f){e=(f==-1)?g:d[f];h=e.nodeName;if(h&&h!="INPUT"){e.setAttribute("unselectable","on")}}return g}};if(a.ie){b.Dom.getText=function(c){return c?(c.innerText||""):""}}});KISSY.Editor.add("core~color",function(d){var c="toString",a=parseInt,b=RegExp;d.Color={KEYWORDS:{black:"000",silver:"c0c0c0",gray:"808080",white:"fff",maroon:"800000",red:"f00",purple:"800080",fuchsia:"f0f",green:"008000",lime:"0f0",olive:"808000",yellow:"ff0",navy:"000080",blue:"00f",teal:"008080",aqua:"0ff"},re_RGB:/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,re_hex:/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,re_hex3:/([0-9A-F])/gi,toRGB:function(e){if(!this.re_RGB.test(e)){e=this.toHex(e)}if(this.re_hex.exec(e)){e="rgb("+[a(b.$1,16),a(b.$2,16),a(b.$3,16)].join(", ")+")"}return e},toHex:function(i){i=this.KEYWORDS[i]||i;if(this.re_RGB.exec(i)){var h=(b.$1>>0)[c](16),f=(b.$2>>0)[c](16),e=(b.$3>>0)[c](16);i=[h.length==1?"0"+h:h,f.length==1?"0"+f:f,e.length==1?"0"+e:e].join("")}if(i.length<6){i=i.replace(this.re_hex3,"$1$1")}if(i!=="transparent"&&i.indexOf("#")<0){i="#"+i}return i.toLowerCase()}}});KISSY.Editor.add("core~command",function(f){var d=YAHOO.env.ua,b={backColor:d.gecko?"hiliteColor":"backColor"},c="bold,italic,underline,strikeThrough",a="styleWithCSS",e="execCommand";f.Command={exec:function(h,g,i){g=b[g]||g;this._preExec(h,g);h[e](g,false,i)},_preExec:function(h,g){if(d.gecko){var i=c.indexOf(g)===-1;h[e](a,false,i)}}}});KISSY.Editor.add("core~range",function(a){a.Range={getSelectionRange:function(e){var d=e.document,c,b;if(e.getSelection){c=e.getSelection();if(c.getRangeAt){b=c.getRangeAt(0)}else{b=d.createRange();b.setStart(c.anchorNode,c.anchorOffset);b.setEnd(c.focusNode,c.focusOffset)}}else{if(d.selection){b=d.selection.createRange()}}return b},getStartContainer:function(b){return b.startContainer||b.parentElement()},getSelectedText:function(b){if("text" in b){return b.text}return b.toString()}}});KISSY.Editor.add("core~instance",function(h){var a=YAHOO.util,d=a.Dom,e=YAHOO.lang,c="kissy-editor",f='<div class="kissy-editor-toolbar"></div><iframe frameborder="0"></iframe><div class="kissy-editor-statusbar"></div>',b='<!DOCTYPE html><html><head><title>Rich Text Area</title><meta http-equiv="Content-Type" content="text/html; charset=GBK18030" /><link type="text/css" href="{CONTENT_CSS}" rel="stylesheet" /></head><body>{CONTENT}</body></html>',i="themes",g="content.css";h.Instance=function(j,k){this.textarea=d.get(j);this.config=e.merge(h.config,k||{});this.sourceMode=false;this.toolbar=new h.Toolbar(this);this._init()};e.augmentObject(h.Instance.prototype,{_init:function(){this._renderUI();this._initPlugins()},_renderUI:function(){this._renderContainer();this._setupContentPanel()},_initPlugins:function(){var k,l,m=h.plugins,j=[];for(k in m){j[k]=m[k]}this.plugins=j;this.toolbar.init();for(k in j){l=j[k];if(l.inited){continue}l.editor=this;if(l.init){l.init()}l.inited=true}},_renderContainer:function(){var l=this.textarea,o=d.getRegion(l),n=(o.right-o.left)+"px",j=(o.bottom-o.top)+"px",k=document.createElement("div"),m;k.className=c;k.style.width=n;k.innerHTML=f;m=k.childNodes[1];m.style.width=n;m.style.height=j;m.setAttribute("frameBorder",0);l.style.display="none";d.insertBefore(k,l);this.container=k;this.toolbar.domEl=k.childNodes[0];this.contentWin=m.contentWindow;this.contentDoc=m.contentWindow.document;this.statusbar=k.childNodes[2]},_setupContentPanel:function(){var l=this.contentDoc,k=this.config,j=k.base+i+"/"+k.theme+"/"+g;l.open();l.write(b.replace("{CONTENT_CSS}",j).replace("{CONTENT}",this.textarea.value));l.close();l.designMode="on"},execCommand:function(j,k){this.contentWin.focus();h.Command.exec(this.contentDoc,j,k)},getData:function(){if(this.sourceMode){return this.textarea.value}return this.getContentDocData()},getContentDocData:function(){var k=this.contentDoc.body,j="",l=h.plugins.save;if(h.Dom.getText(k)){j=k.innerHTML;if(l&&l.filterData){j=l.filterData(j)}}return j},getSelectionRange:function(){return h.Range.getSelectionRange(this.contentWin)}})});KISSY.Editor.add("core~toolbar",function(n){var b=YAHOO.util,g=b.Dom,m=b.Event,i=YAHOO.lang,f=YAHOO.env.ua.ie,k=n.PLUGIN_TYPE,h='<div class="kissy-toolbar-separator kissy-inline-block"></div>',l='<div class="kissy-toolbar-button kissy-inline-block" title="{TITLE}"><div class="kissy-toolbar-button-outer-box"><div class="kissy-toolbar-button-inner-box"><span class="kissy-toolbar-item kissy-toolbar-{NAME}">{TEXT}</span></div></div></div>',j='<div class="kissy-toolbar-menu-button-caption kissy-inline-block"><span class="kissy-toolbar-item kissy-toolbar-{NAME}">{TEXT}</span></div><div class="kissy-toolbar-menu-button-dropdown kissy-inline-block"></div>',e="kissy-toolbar-menu-button",d="kissy-toolbar-select",c="kissy-toolbar-button-active",a=document.createElement("div");n.Toolbar=function(o){this.editor=o;this.config=o.config;this.lang=n.lang[this.config.language]};i.augmentObject(n.Toolbar.prototype,{init:function(){var q=this.config.toolbar,p=this.editor.plugins,s;for(var r=0,o=q.length;r<o;++r){s=q[r];if(s){if(!(s in p)){continue}this._addItem(p[s])}else{this._addSeparator()}}},_addItem:function(r){var q,o=r.type,s=this.lang;if(!r.lang){r.lang=i.merge(s.common,this.lang[r.name]||{})}a.innerHTML=l.replace("{TITLE}",r.lang.title||"").replace("{NAME}",r.name).replace("{TEXT}",r.lang.text||"");r.domEl=q=a.firstChild;if(o==k.TOOLBAR_MENU_BUTTON||o==k.TOOLBAR_SELECT){this._renderMenuButton(r);if(o==k.TOOLBAR_SELECT){this._renderSelect(r)}}this._bindItemUI(r);this._addToToolbar(q);r.editor=this.editor;if(r.init){r.init()}r.inited=true},_renderMenuButton:function(r){var q=r.domEl,o=q.getElementsByTagName("span")[0].parentNode;g.addClass(q,e);o.innerHTML=j.replace("{NAME}",r.name).replace("{TEXT}",r.lang.text||"")},_renderSelect:function(o){g.addClass(o.domEl,d)},_bindItemUI:function(q){var o=q.domEl;if(q.exec){m.on(o,"click",function(){q.exec()})}m.on(o,"mousedown",function(){g.addClass(o,c)});m.on(o,"mouseup",function(){g.removeClass(o,c)});m.on(o,"mouseout",function(s){var r=m.getRelatedTarget(s),p;try{if(o.contains){p=o.contains(r)}else{if(o.compareDocumentPosition){p=o.compareDocumentPosition(r)&8}}}catch(s){p=false}if(p){return}g.removeClass(o,c)})},_addSeparator:function(){a.innerHTML=h;this._addToToolbar(a.firstChild)},_addToToolbar:function(o){if(f){o=n.Dom.setItemUnselectable(o)}this.domEl.appendChild(o)}})});KISSY.Editor.add("core~menu",function(e){var f=YAHOO.util,c=f.Dom,b=f.Event,d="visibility",a="kissy-drop-menu";e.Menu={generateDropMenu:function(i,h,k){var j=document.createElement("div"),g=this;j.className=a;j.style[d]="hidden";document.body.appendChild(j);b.on(h,"click",function(l){b.stopPropagation(l);g._hide(i.activeDropMenu);if(i.activeDropMenu!=j){g._setDropMenuPosition(h,j,k);g._show(j);i.activeDropMenu=j}else{i.activeDropMenu=null}});b.on([document,i.contentDoc],"click",function(){g._hide(i.activeDropMenu);i.activeDropMenu=null});this._initResizeEvent(h,j,k);return j},_setDropMenuPosition:function(g,i,l){var h=c.getRegion(g),k=h.left,j=h.bottom;if(l){k+=l[0];j+=l[1]}i.style.left=k+"px";i.style.top=j+"px"},_isVisible:function(g){if(!g){return false}return g.style[d]!="hidden"},_hide:function(g){if(g){g.style[d]="hidden"}},_show:function(g){if(g){g.style[d]="visible"}},_initResizeEvent:function(i,j,k){var h=this,g;b.on(window,"resize",function(){if(g){clearTimeout(g)}g=setTimeout(function(){if(h._isVisible(j)){h._setDropMenuPosition(i,j,k)}},50)})}}});KISSY.Editor.add("plugins~base",function(b){var c=b.PLUGIN_TYPE,a="bold,italic,underline,strikeThrough,insertOrderedList,insertUnorderedList";b.addPlugin(a.split(","),{type:c.TOOLBAR_BUTTON,exec:function(){this.editor.execCommand(this.name)}})});KISSY.Editor.add("plugins~font",function(j){var a=YAHOO.util,c=a.Dom,i=a.Event,b=YAHOO.env.ua.ie,f=j.PLUGIN_TYPE,g='<ul class="kissy-select-list">{LI}</ul>',e='<li class="kissy-option" data-value="{VALUE}"><span class="kissy-option-checkbox"></span><span style="{STYLE}">{KEY}</span></li>',h="kissy-option-selected",d="Default";j.addPlugin(["fontName","fontSize"],{type:f.TOOLBAR_SELECT,selectedValue:"",selectHead:null,selectList:null,options:[],init:function(){var k=this.domEl;this.options=this.lang.options;this.selectHead=k.getElementsByTagName("span")[0];this._initSelectList(k);this._setSelectedOption(this.options[d])},_initSelectList:function(k){this.selectList=j.Menu.generateDropMenu(this.editor,k,[1,0]);this._renderSelectList();this._bindPickEvent()},_renderSelectList:function(){var m="",k=this.options,l,n;for(l in k){if(l==d){continue}n=k[l];m+=e.replace("{VALUE}",n).replace("{STYLE}",this._getOptionStyle(l,n)).replace("{KEY}",l)}this.selectList.innerHTML=g.replace("{LI}",m);c.addClass(this.selectList,"kissy-drop-menu-"+this.name);if(b){j.Dom.setItemUnselectable(this.selectList)}},_bindPickEvent:function(){var k=this;i.on(this.selectList,"click",function(l){var m=i.getTarget(l),n;if(m.nodeName!="LI"){m=c.getAncestorByTagName(m,"li")}if(!m){return}n=m.getAttribute("data-value");if(n){k._setSelectedOption(n);k.editor.execCommand(k.name,k.selectedValue)}})},_setSelectedOption:function(k){this.selectedValue=k;this.selectHead.innerHTML=this._getOptionKey(k);this._updateSelectedOption(k)},_getOptionStyle:function(k,l){if(this.name=="fontName"){return"font-family:"+l}else{return"font-size:"+k+"px"}},_getOptionKey:function(m){var k=this.options,l;for(l in k){if(l==d){continue}if(k[l]==m){return l}}},_updateSelectedOption:function(o){var l=this.selectList.getElementsByTagName("li"),m,k=l.length,n;for(m=0;m<k;++m){n=l[m];if(n.getAttribute("data-value")==o){c.addClass(n,h)}else{c.removeClass(n,h)}}}})});KISSY.Editor.add("plugins~color",function(l){var b=YAHOO.util,h=b.Dom,k=b.Event,e=YAHOO.env.ua.ie,j=l.PLUGIN_TYPE,d='<table class="kissy-palette-table"><tbody>{TR}</tbody></table>',c='<td class="kissy-palette-cell"><div class="kissy-palette-colorswatch" title="{COLOR}" style="background-color:{COLOR}"></div></td>',i=["000","444","666","999","CCC","EEE","F3F3F3","FFF"],g=["F00","F90","FF0","0F0","0FF","00F","90F","F0F"],f=["F4CCCC","FCE5CD","FFF2CC","D9EAD3","D0E0E3","CFE2F3","D9D2E9","EAD1DC","EA9999","F9CB9C","FFE599","B6D7A8","A2C4C9","9FC5E8","B4A7D6","D5A6BD","E06666","F6B26B","FFD966","93C47D","76A5AF","6FA8DC","8E7CC3","C27BAD","CC0000","E69138","F1C232","6AA84F","45818E","3D85C6","674EA7","A64D79","990000","B45F06","BF9000","38761D","134F5C","0B5394","351C75","741B47","660000","783F04","7F6000","274E13","0C343D","073763","20124D","4C1130"],a="kissy-palette-cell-selected";l.addPlugin(["foreColor","backColor"],{type:j.TOOLBAR_MENU_BUTTON,color:"",_indicator:null,dropMenu:null,init:function(){var n=this.domEl,m=n.getElementsByTagName("span")[0].parentNode;this.color=(this.name=="foreColor")?"#000000":"#ffffff";h.addClass(n,"kissy-toolbar-color-button");m.innerHTML='<div class="kissy-toolbar-color-button-indicator" style="border-bottom-color:'+this.color+'">'+m.innerHTML+"</div>";this._indicator=m.firstChild;this._initDropMenu(n)},_initDropMenu:function(m){this.dropMenu=l.Menu.generateDropMenu(this.editor,m,[1,0]);this._generatePalettes();if(e){l.Dom.setItemUnselectable(this.dropMenu)}this._bindPickEvent();this._updateSelectedColor(this.color)},_generatePalettes:function(){var m="";m+=this._getPaletteTable(i);m+=this._getPaletteTable(g);m+=this._getPaletteTable(f);this.dropMenu.innerHTML=m},_getPaletteTable:function(o){var q,n=o.length,p,m="<tr>";for(q=0,n=o.length;q<n;++q){if(q!=0&&q%8==0){m+="</tr><tr>"}p=l.Color.toRGB("#"+o[q]).toUpperCase();m+=c.replace(/{COLOR}/g,p)}m+="</tr>";return d.replace("{TR}",m)},_bindPickEvent:function(){var m=this;k.on(this.dropMenu,"click",function(o){var p=k.getTarget(o),n=p.getAttribute("title");if(n&&n.indexOf("RGB")===0){m.setColor(l.Color.toHex(n));m.editor.execCommand(m.name,m.color)}})},setColor:function(m){this.color=m;this._indicator.style.borderBottomColor=m;this._updateSelectedColor(m)},_updateSelectedColor:function(q){var o,m,p,n=this.dropMenu.getElementsByTagName("div");for(o=0,m=n.length;o<m;++o){p=n[o];if(l.Color.toHex(p.style.backgroundColor)==q){h.addClass(p.parentNode,a)}else{h.removeClass(p.parentNode,a)}}}})});KISSY.Editor.add("plugins~link",function(p){var a=YAHOO.util,h=a.Dom,o=a.Event,j=YAHOO.lang,b=YAHOO.env.ua.ie,k=p.PLUGIN_TYPE,d=p.Range,g=new Date().getTime(),n="kissy-link-dialog",l="kissy-link-dialog-newlink-mode",e="kissy-link-dialog-ok",c="kissy-link-dialog-cancel",i="kissy-link-dialog-remove",f="http://",m=['<form onsubmit="return false"><ul>','<li class="kissy-link-dialog-href"><label>{href}</label><input name="href" size="40" value="http://" type="text" /></li>','<li class="kissy-link-dialog-text"><label>{text}</label><input name="text" size="40" type="text" /></li>','<li class="kissy-link-dialog-target"><input name="target" id="target_"',g,' type="checkbox" /> <label for="target_"',g,">{target}</label></li>",'<li class="kissy-link-dialog-actions">','<button name="ok" class="',e,'">{ok}</button>','<button name="cancel" class="',c,'">{cancel}</button>','<span class="',i,'">{remove}</span>',"</li>","</ul></form>"].join("");p.addPlugin("link",{type:k.TOOLBAR_BUTTON,dialog:null,form:null,init:function(){this._renderUI();this._bindUI()},_renderUI:function(){var q=p.Menu.generateDropMenu(this.editor,this.domEl,[1,0]),r=this.lang;q.className+=" "+n;q.innerHTML=m.replace(/\{([^}]+)\}/g,function(s,t){return r[t]?r[t]:t});this.dialog=q;this.form=q.getElementsByTagName("form")[0]},_bindUI:function(){var r=this.form,q=this;o.on(this.domEl,"click",function(){q._syncUI()});o.on(this.dialog,"click",function(s){var t=o.getTarget(s);switch(t.className){case e:q._createLink(r.href.value,r.text.value,r.target.checked);break;case c:break;case i:q._unLink();break;default:o.stopPropagation(s)}})},_syncUI:function(){var t=this.editor,u=this.form,r=t.getSelectionRange(),q=d.getStartContainer(r),s;if(q.nodeType==3){s=q.parentNode;if(s.nodeName=="A"){u.href.value=s.href;u.text.value=p.Dom.getText(s);u.target.checked=s.target==="_blank";h.removeClass(u,l);return}}u.href.value=f;u.text.value=d.getSelectedText(r);h.addClass(u,l)},_createLink:function(q,y,w){if(q.length<7){this._unLink();return}if(!y){y=q}var v=this.editor,t=v.getSelectionRange(),r=d.getStartContainer(t),u;if(r.nodeType==3){u=r.parentNode;if(u.nodeName=="A"){u.href=q;u.innerHTML=y;if(w){u.setAttribute("target","_blank")}else{u.removeAttribute("target")}return}}var s=d.getSelectedText(t);if(!s){if(!b){var x=document.createElement("A");x.innerHTML=y;t.insertNode(x)}else{t.pasteHTML('<a href="'+q+'">'+y+"</a>")}}v.execCommand("createLink",q)},_unLink:function(){this.editor.execCommand("unLink")}})});KISSY.Editor.add("plugins~blockquote",function(a){var b=a.PLUGIN_TYPE;a.addPlugin("blockquote",{type:b.TOOLBAR_BUTTON,exec:function(){alert("todo")}})});KISSY.Editor.add("plugins~image",function(a){var b=a.PLUGIN_TYPE;a.addPlugin("image",{type:b.TOOLBAR_BUTTON,exec:function(){alert("todo")}})});KISSY.Editor.add("plugins~smiley",function(a){var b=a.PLUGIN_TYPE;a.addPlugin("smiley",{type:b.TOOLBAR_BUTTON,exec:function(){alert("todo")}})});KISSY.Editor.add("plugins~indent",function(a){var b=a.PLUGIN_TYPE;a.addPlugin(["indent","outdent"],{type:b.TOOLBAR_BUTTON,exec:function(){this.editor.execCommand(this.name)}})});KISSY.Editor.add("plugins~justify",function(d){var f=YAHOO.util,b=f.Dom,g=d.PLUGIN_TYPE,a=YAHOO.env.ua,e={blockquote:1,div:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,hr:1,p:1,address:1,center:1,pre:1,form:1,fieldset:1,caption:1,table:1,tbody:1,tr:1,th:1,td:1,ul:1,ol:1,dl:1,dt:1,dd:1,li:1},c={type:g.TOOLBAR_BUTTON,exec:function(){this.editor.execCommand(this.name)}};if(a.ie){c.exec=function(m){var i=m.getSelectionRange(),l,k;if(i.parentElement){l=i.parentElement()}else{if(i.item){l=i.item(0)}else{return}}if(h(l)){k=l}else{k=j(l)}if(k){k.style.textAlign=this.name.substring(7).toLowerCase()}function j(n){return b.getAncestorBy(n,function(o){return h(o)})}function h(n){return e[n.nodeName.toLowerCase()]}}}d.addPlugin(["justifyLeft","justifyCenter","justifyRight"],c)});KISSY.Editor.add("plugins~undo",function(a){var b=a.PLUGIN_TYPE;a.addPlugin(["undo","redo"],{type:b.TOOLBAR_BUTTON,exec:function(){this.editor.execCommand(this.name)}})});KISSY.Editor.add("plugins~save",function(c){var d=YAHOO.util,b=d.Event,e=c.PLUGIN_TYPE,a={b:{tag:"strong"},i:{tag:"em"},u:{tag:"span",style:"text-decoration:underline"},strike:{tag:"span",style:"text-decoration:line-through"}};c.addPlugin("save",{type:e.FUNC,init:function(){var g=this.editor,f=g.textarea,h=f.form;if(h){b.on(h,"submit",function(){if(!g.sourceMode){f.value=g.getData()}})}},filterData:function(f){f=f.replace(/<(\/?)([^>]+)>/g,function(h,j,g){g=g.toLowerCase();var k=a[g],i=g;if(g.indexOf(" ")==-1&&k){i=k.tag;if(!j&&k.style){i+=' style="'+k.style+'"'}}return"<"+j+i+">"});return f}})});KISSY.Editor.add("plugins~source",function(a){var b=a.PLUGIN_TYPE;a.addPlugin("source",{type:b.TOOLBAR_BUTTON,init:function(){var c=this.editor;this.iframe=c.contentWin.frameElement;this.textarea=c.textarea;this.iframe.parentNode.appendChild(c.textarea)},exec:function(){var c=this.editor,d=c.sourceMode;if(d){c.contentDoc.body.innerHTML=this.textarea.value}else{this.textarea.value=c.getContentDocData()}this.textarea.style.display=d?"none":"";this.iframe.style.display=d?"":"none";c.sourceMode=!d}})});KISSY.Editor.add("plugins~maximize",function(a){var b=a.PLUGIN_TYPE;a.addPlugin("maximize",{type:b.TOOLBAR_BUTTON,exec:function(){alert("todo")}})});