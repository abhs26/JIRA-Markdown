var Markdown;if(typeof exports==="object"&&typeof require==="function"){Markdown=exports}else{Markdown={}}(function(){function c(e){return e}function d(e){return false}function b(){}b.prototype={chain:function(g,f){var e=this[g];if(!e){throw new Error("unknown hook "+g)}if(e===c){this[g]=f}else{this[g]=function(h){return f(e(h))}}},set:function(f,e){if(!this[f]){throw new Error("unknown hook "+f)}this[f]=e},addNoop:function(e){this[e]=c},addFalse:function(e){this[e]=d}};Markdown.HookCollection=b;function a(){}a.prototype={set:function(e,f){this["s_"+e]=f},get:function(e){return this["s_"+e]}};Markdown.Converter=function(){var p=this.hooks=new b();p.addNoop("plainLinkText");p.addNoop("preConversion");p.addNoop("postConversion");p.addFalse("generateImageHTML");p.addFalse("generateLinkHTML");p.addFalse("generatePlainLinkHTML");p.addFalse("generateCodeBlockHTML");p.addFalse("generateCodeSpanHTML");var J;var w;var e;var P;var y=4;var f=y-1;var K=function(aj,ah){var ai=ah||" \t\n\r";return aj.replace(new RegExp("^["+ai+"]*|["+ai+"]*$","g"),"")};var D=function(aj,ah){var ai=ah||" \t\n\r";return aj.replace(new RegExp("["+ai+"]*$","g"),"")};var q=function(aj,ah,ai){while(aj.length<ah){aj.push(ai)}};this.makeHtml=function(ah){if(J){throw new Error("Recursive call to converter.makeHtml")}J=new a();w=new a();e=[];P=0;ah=p.preConversion(ah);ah=ah.replace(/@/g,"@T");ah=ah.replace(/\$/g,"@D");ah=ah.replace(/\r\n/g,"\n");ah=ah.replace(/\r/g,"\n");ah="\n\n"+ah+"\n\n";ah=Z(ah);ah=ah.replace(/^[ \t]+$/mg,"");ah=x(ah);ah=v(ah);ah=j(ah);ah=ac(ah);ah=ah.replace(/@D/g,"$$");ah=ah.replace(/@T/g,"@");ah=p.postConversion(ah);e=w=J=null;return ah};function v(ah){ah=ah.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?(?=\s|$)[ \t]*\n?[ \t]*((\n*)["(](.+?)[")][ \t]*)?(?:\n+)/gm,function(ak,am,al,aj,ai,an){am=am.toLowerCase();J.set(am,R(al));if(ai){return aj}else{if(an){w.set(am,an.replace(/"/g,"&quot;"))}}return""});return ah}function x(aj){var ai="p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del";var ah="p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math";aj=aj.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm,ae);aj=aj.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math)\b[^\r]*?.*<\/\2>[ \t]*(?=\n+)\n)/gm,ae);aj=aj.replace(/\n[ ]{0,3}((<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,ae);aj=aj.replace(/\n\n[ ]{0,3}(<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>[ \t]*(?=\n{2,}))/g,ae);aj=aj.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,ae);return aj}function ae(ah,ai){var aj=ai;aj=aj.replace(/^\n+/,"");aj=aj.replace(/\n+$/g,"");aj="\n\n@K"+(e.push(aj)-1)+"K\n\n";return aj}function j(aj,ai){aj=m(aj);aj=A(aj);var ah="<hr />\n";aj=aj.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm,ah);aj=aj.replace(/^[ ]{0,2}([ ]?-[ ]?){3,}[ \t]*$/gm,ah);aj=aj.replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm,ah);aj=ab(aj);aj=g(aj);aj=O(aj);aj=B(aj);aj=h(aj);aj=x(aj);aj=Y(aj,ai);return aj}function s(ah){ah=C(ah);ah=H(ah);ah=X(ah);ah=T(ah);ah=U(ah);ah=aa(ah);ah=ah.replace(/@P/g,"://");ah=R(ah);ah=L(ah);ah=ah.replace(/  +\n/g," <br>\n");return ah}function H(ai){var ah=/(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>)/gi;ai=ai.replace(ah,function(ak){var aj=ak.replace(/(.)<\/?code>(?=.)/g,"$1`");aj=M(aj,ak.charAt(1)=="!"?"\\`*_/":"\\`*_");return aj});return ai}function U(ah){ah=ah.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,l);ah=ah.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?((?:\([^)]*\)|[^()])*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,l);ah=ah.replace(/(\[([^\[\]]+)\])()()()()()/g,l);return ah}function l(an,au,at,ar,aq,ap,am,al){if(al==undefined){al=""}var ak=au;var ai=at.replace(/:\/\//g,"@P");var aj=ar.toLowerCase();var ah=aq;var ao=al;if(ah==""){if(aj==""){aj=ai.toLowerCase().replace(/ ?\n/g," ")}ah="#"+aj;if(J.get(aj)!=undefined){ah=J.get(aj);if(w.get(aj)!=undefined){ao=w.get(aj)}}else{if(ak.search(/\(\s*\)$/m)>-1){ah=""}else{return ak}}}ah=Q(ah);ah=M(ah,"*_");if(ao!=""){ao=W(ao);ao=M(ao,"*_")}var av=p.generateLinkHTML({url:ah,link_text:ai,link_id:aj,title:ao});if(!av){av='<a href="'+ah+'"';if(ao!=""){av+=' title="'+ao+'"'}av+=">"+ai+"</a>"}return av}function T(ah){ah=ah.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,V);ah=ah.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,V);return ah}function W(ah){return ah.replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;")}function V(an,au,at,ar,aq,ap,am,al){var ak=au;var aj=at;var ai=ar.toLowerCase();var ah=aq;var ao=al;if(!ao){ao=""}if(ah==""){if(ai==""){ai=aj.toLowerCase().replace(/ ?\n/g," ")}ah="#"+ai;if(J.get(ai)!=undefined){ah=J.get(ai);if(w.get(ai)!=undefined){ao=w.get(ai)}}else{return ak}}aj=M(W(aj),"*_[]()");ah=M(ah,"*_");ao=W(ao);ao=M(ao,"*_");var av=p.generateImageHTML({url:ah,alt_text:aj,title:ao});if(!av){av='<img src="'+ah+'" alt="'+aj+'"';av+=' title="'+ao+'"';av+=" />"}return av}function m(ah){ah=ah.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm,function(ai,aj){return"<h1>"+s(aj)+"</h1>\n\n"});ah=ah.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm,function(aj,ai){return"<h2>"+s(ai)+"</h2>\n\n"});ah=ah.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm,function(ai,al,ak){var aj=al.length;return"<h"+aj+">"+s(ak)+"</h"+aj+">\n\n"});return ah}function ab(ai){ai+="@0";var ah=/^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(@0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;if(P){ai=ai.replace(ah,function(ak,an,am){var ao=an;var al=(am.search(/[*+-]/g)>-1)?"ul":"ol";var aj=u(ao,al);aj=aj.replace(/\s+$/,"");aj="<"+al+">"+aj+"</"+al+">\n";return aj})}else{ah=/(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(@0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g;ai=ai.replace(ah,function(al,ap,an,ak){var ao=ap;var aq=an;var am=(ak.search(/[*+-]/g)>-1)?"ul":"ol";var aj=u(aq,am);aj=ao+"<"+am+">\n"+aj+"</"+am+">\n";return aj})}ai=ai.replace(/@0/,"");return ai}var z={ol:"\\d+[.]",ul:"[*+-]"};function u(aj,ai){P++;aj=aj.replace(/\n{2,}$/,"\n");aj+="@0";var ah=z[ai];var ak=new RegExp("(^[ \\t]*)("+ah+")[ \\t]+([^\\r]+?(\\n+))(?=(@0|\\1("+ah+")[ \\t]+))","gm");var al=false;aj=aj.replace(ak,function(an,ap,ao,am){var at=am;var au=ap;var ar=/\n\n$/.test(at);var aq=ar||at.search(/\n{2,}/)>-1;if(aq||al){at=j(F(at),true)}else{at=ab(F(at));at=at.replace(/\n$/,"");at=s(at)}al=ar;return"<li>"+at+"</li>\n"});aj=aj.replace(/@0/g,"");P--;return aj}var k="9882b282ede0f5af55034471410cfc46";var ag=new RegExp("^[ ]{0,"+f+"}[|](.+)\\n[ ]{0,"+f+"}[|]([ ]*[-:]+[-| :]*)\\n((?:[ ]*[|].*\\n)*)(?=\\n|"+k+")","gm");var af=new RegExp("^[ ]{0,"+f+"}(\\S.*[|].*)\\n[ ]{0,"+f+"}([-:]+[ ]*[|][-| :]*)\\n((?:.*[|].*\\n)*)(?=\\n|"+k+")","gm");function A(ah){ah+=k;ah=ah.replace(ag,function(aj,ai,al,ak){ak=ak.replace(/^[ ]*[|]/gm,"");return I(aj,ai,al,ak)});ah=ah.replace(k,"");ah+=k;ah=ah.replace(af,I);ah=ah.replace(k,"");return ah}function I(am,al,ak,ai){var an=al;var ar=ak;var az=ai;an=an.replace(/[|][ ]*$/gm,"");ar=ar.replace(/[|][ ]*$/gm,"");az=az.replace(/[|][ ]*$/gm,"");var ax=ar.split(/[ ]*[|][ ]*/);var ay=new Array();for(i=0,len=ax.length;i<len;i++){var aj=ax[i];if(aj.match(/^[ ]*-+:[ ]*$/)){ay.push(' align="right"')}else{if(aj.match(/^[ ]*:-+:[ ]*$/)){ay.push(' align="center"')}else{if(aj.match(/^[ ]*:-+[ ]*$/)){ay.push(' align="left"')}else{ay.push("")}}}}an=C(an);var ah=an.split(/[ ]*[|][ ]*/);var av=ah.length;var aw="<table>\n";aw+="<thead>\n";aw+="<tr>\n";for(i=0,len=ah.length;i<len;i++){aw+="  <th"+ay[i]+">"+s(K(ah[i]))+"</th>\n"}aw+="</tr>\n";aw+="</thead>\n";var at=K(az,"\n").split(/\n/);aw+="<tbody>\n";for(i=0,len=at.length;i<len;i++){var ao=at[i];ao=C(ao);var aq=ao.split(/[ ]*[|][ ]*/,av);q(aq,av,"");aw+="<tr>\n";for(var au=0,ap=aq.length;au<ap;au++){aw+="  <td"+ay[au]+">"+s(K(aq[au]))+"</td>\n"}aw+="</tr>\n"}aw+="</tbody>\n</table>";return aw+"\n"}var N=new RegExp("(?:(\\n\\n)|^\\n?)(([ ]{0,"+f+"}((\\S.*\\n)+)\\n?[ ]{0,"+f+"}:[ ]+)(?:[\\s\\S]+?)($|\\n{2,}(?=\\S)(?![ ]{0,"+f+"}(?:\\S.*\\n)+?\\n?[ ]{0,"+f+"}:[ ]+)(?![ ]{0,"+f+"}:[ ]+)))","g");function g(ah){ah=ah.replace(N,function(ak,aj,ao,an,am,al){var ai=K(t(ao));ai="<dl>\n"+ai+"\n</dl>";if(!aj){aj=""}return aj+ai+"\n\n"});return ah}var o=new RegExp("(?:\\n\\n+|^\\n?)([ ]{0,"+f+"}(?![:][ ]|[ ])(?:\\S.*\\n)+?)(?=\\n?[ ]{0,3}:[ ])","g");var n=new RegExp("\\n(\\n+)?[ ]{0,"+f+"}[:][ ]+([\\s\\S]+?)(?=\\n+(?:[ ]{0,"+f+"}[:][ ]|<dt>|$))","g");function t(ah){ah=ah.replace(/\n{2,}$/,"\n");ah=ah.replace(o,function(ak,aj){var an=K(aj).split(/\n/);var ao="";for(var am=0,ai=an.length;am<ai;am++){var al=an[am];al=s(K(al));ao+="\n<dt>"+al+"</dt>"}return ao+"\n"});ah=ah.replace(n,function(aj,ai,al){var ak=al;if(ai||ak.match(/\n{2,}/)){ak=j(F(ak+"\n\n"));ak="\n"+ak+"\n"}else{ak=D(ak);ak=s(F(ak))}return"\n<dd>"+ak+"</dd>\n"});return ah}function O(aq){aq+="@0";while(true){var am=/(?:\n|^)((`{3,}|~{3,})[ ]*\n)/gm;var an=am.exec(aq);if(an!=null){var ap=am.lastIndex;var ak=am.exec(aq);if(!ak){break}var al=ak.index;var ah=aq.substring(ap,al);var ai=r(false,ah,"");var aj=aq.substring(0,an.index);var ao=aq.substring(am.lastIndex);aq=aj+ad(ai)+ao}else{break}}aq=aq.replace(/@0/,"");return aq}var r=function(ak,ai,aj){if(ak){ai=F(ai)}ai=S(ai);ai=Z(ai);if(ak){ai=ai.replace(/^\n+/g,"");ai=ai.replace(/\n+$/g,"")}var ah=p.generateCodeBlockHTML({codeblock:ai});if(!ah){ah="<pre><code>"+ai+"\n</code></pre>"}return"\n\n"+ah+"\n\n"+aj};function B(ah){ah+="@0";ah=ah.replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=@0))/g,function(ai,ak,aj){var al=ak;var am=aj;return r(true,al,am)});ah=ah.replace(/@0/,"");return ah}function ad(ah){ah=ah.replace(/(^\n+|\n+$)/g,"");return"\n\n@K"+(e.push(ah)-1)+"K\n\n"}function C(ah){ah=ah.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,function(al,an,am,ak,aj){var ao=ak;ao=ao.replace(/^([ \t]*)/g,"");ao=ao.replace(/[ \t]*$/g,"");ao=S(ao);ao=ao.replace(/:\/\//g,"@P");var ai=p.generateCodeSpanHTML({codespan:ao});if(!ai){ai="<code>"+ao+"</code>"}return an+ai});return ah}function S(ah){ah=ah.replace(/&/g,"&amp;");ah=ah.replace(/</g,"&lt;");ah=ah.replace(/>/g,"&gt;");ah=M(ah,"*_{}[]\\",false);return ah}function L(ah){ah=ah.replace(/([\W_]|^)(\*\*|__)(?=\S)([^\r]*?\S[\*_]*)\2([\W_]|$)/g,"$1<strong>$3</strong>$4");ah=ah.replace(/([\W_]|^)(\*|_)(?=\S)([^\r\*_]*?\S)\2([\W_]|$)/g,"$1<em>$3</em>$4");return ah}function h(ah){ah=ah.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm,function(ai,aj){var ak=aj;ak=ak.replace(/^[ \t]*>[ \t]?/gm,"@0");ak=ak.replace(/@0/g,"");ak=ak.replace(/^[ \t]+$/gm,"");ak=j(ak);ak=ak.replace(/(^|\n)/g,"$1  ");ak=ak.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm,function(al,am){var an=am;an=an.replace(/^  /mg,"@0");an=an.replace(/@0/g,"");return an});return ad("<blockquote>\n"+ak+"\n</blockquote>")});return ah}function Y(ao,ah){ao=ao.replace(/^\n+/g,"");ao=ao.replace(/\n+$/g,"");var ap=ao.split(/\n{2,}/g);var am=[];var ai=/@K(\d+)K/;var aj=ap.length;for(var ak=0;ak<aj;ak++){var al=ap[ak];if(ai.test(al)){am.push(al)}else{if(/\S/.test(al)){al=s(al);al=al.replace(/^([ \t]*)/g,"<p>");al+="</p>";am.push(al)}}}if(!ah){aj=am.length;for(var ak=0;ak<aj;ak++){var an=true;while(an){an=false;am[ak]=am[ak].replace(/@K(\d+)K/g,function(aq,ar){an=true;return e[ar]})}}}return am.join("\n\n")}function R(ah){ah=ah.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g,"&amp;");ah=ah.replace(/<(?![a-z\/?\$!])/gi,"&lt;");return ah}function X(ah){ah=ah.replace(/\\(\\)/g,E);ah=ah.replace(/\\([`*_{}\[\]()>#+-.!])/g,E);return ah}function aa(ai){ai=ai.replace(/(^|\s)(https?|ftp)(:\/\/[-A-Z0-9+&@#\/%?=~_|\[\]\(\)!:,\.;]*[-A-Z0-9+&@#\/%=~_|\[\]])($|\W)/gi,"$1<$2$3>$4");var ah=function(al,ak){var am=p.plainLinkText(ak);var aj=p.generatePlainLinkHTML({url:ak,plainLinkText:am});if(!aj){aj='<a href="'+ak+'">'+am+"</a>"}return aj};ai=ai.replace(/<((https?|ftp):[^'">\s]+)>/gi,ah);return ai}function ac(ah){ah=ah.replace(/@E(\d+)E/g,function(ai,ak){var aj=parseInt(ak);return String.fromCharCode(aj)});return ah}function F(ah){ah=ah.replace(/^(\t|[ ]{1,4})/gm,"@0");ah=ah.replace(/@0/g,"");return ah}function Z(ak){if(!/\t/.test(ak)){return ak}var aj=["    ","   ","  "," "],ai=0,ah;return ak.replace(/[\n\t]/g,function(al,am){if(al==="\n"){ai=am+1;return al}ah=(am-ai)%4;ai=am+1;return aj[ah]})}var G=/(?:["'*()[\]:]|@D)/g;function Q(ai){if(!ai){return""}var ah=ai.length;return ai.replace(G,function(aj,ak){if(aj=="@D"){return"%24"}if(aj==":"){if(ak==ah-1||/[0-9\/]/.test(ai.charAt(ak+1))){return":"}}return"%"+aj.charCodeAt(0).toString(16)})}function M(al,ai,aj){var ah="(["+ai.replace(/([\[\]\\])/g,"\\$1")+"])";if(aj){ah="\\\\"+ah}var ak=new RegExp(ah,"g");al=al.replace(ak,E);return al}function E(ah,aj){var ai=aj.charCodeAt(0);return"@E"+ai+"E"}}})();