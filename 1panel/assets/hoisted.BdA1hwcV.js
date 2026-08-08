import"./hoisted.C3N0MqV1.js";(function(){if(window.self===window.top||window.__iframeHighlightInitialized)return;window.__iframeHighlightInitialized=!0,console.log("Iframe 高亮脚本已加载");var r=document.createElement("div");r.id="iframe-highlight-overlay",r.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 999999;
    overflow: hidden;
  `;var l=document.createElement("div");l.id="iframe-highlight-box",l.style.cssText=`
    position: absolute;
    border: 2px dashed #007AFF;
    background: rgba(0, 122, 255, 0.08);
    pointer-events: none;
    display: none;
    transition: all 0.1s ease;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.8);
    border-radius: 2px;
  `;var i=document.createElement("div");i.id="iframe-selected-box",i.style.cssText=`
    position: absolute;
    border: 2px solid #007AFF;
    pointer-events: none;
    display: none;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.9), 0 0 8px rgba(255, 107, 53, 0.4);
    border-radius: 2px;
    z-index: 1000000;
  `;var a=document.createElement("div");a.id="iframe-tag-label",a.style.cssText=`
    position: absolute;
    background: #007AFF;
    color: white;
    padding: 2px 6px;
    font-size: 11px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    border-radius: 2px;
    pointer-events: none;
    display: none;
    white-space: nowrap;
    z-index: 1000001;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    font-weight: 500;
  `;var s=document.createElement("div");s.id="iframe-selected-label",s.style.cssText=`
    position: absolute;
    background: #007AFF;
    color: white;
    padding: 3px 8px;
    font-size: 11px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    border-radius: 3px;
    pointer-events: none;
    display: none;
    white-space: nowrap;
    z-index: 1000002;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
    font-weight: 600;
  `,r.appendChild(l),r.appendChild(i),r.appendChild(a),r.appendChild(s),document.body.appendChild(r);var y=null,c=!1;function u(n){if(console.log("updateSelectedHighlight called with:",n),!n){i.style.display="none",s.style.display="none",y=null,console.log("Cleared selected highlight");return}y=n;var e=n.getBoundingClientRect();console.log("Selected element rect:",e),i.style.display="block",i.style.left="".concat(e.left-2,"px"),i.style.top="".concat(e.top-2,"px"),i.style.width="".concat(e.width+4,"px"),i.style.height="".concat(e.height+4,"px"),s.style.display="block",s.textContent="✓ <".concat(n.tagName.toLowerCase(),">");var t=e.top-28,o=e.left;t<5&&(t=e.bottom+5);var d=s.offsetWidth||100;o+d>window.innerWidth-10&&(o=window.innerWidth-d-10),s.style.left="".concat(Math.max(5,o),"px"),s.style.top="".concat(t,"px"),console.log("Selected highlight positioned at:",{left:i.style.left,top:i.style.top,width:i.style.width,height:i.style.height})}function v(n){if(!(n instanceof Element))throw new Error("Argument must be a DOM element");for(var e=[],t=n;t!==document.documentElement;){var o="";if(t.id&&document.querySelectorAll("#".concat(t.id)).length===1){e.unshift("#".concat(t.id));break}var d=Array.from(t.classList).filter(function(m){return!m.startsWith("js-")}),h=d.length>0?".".concat(d[0]):"",g=t.tagName.toLowerCase();if(h)o=h;else{var p=Array.from(t.parentNode.children),b=p.findIndex(function(m){return m===t})+1;o="".concat(g,":nth-child(").concat(b,")")}e.unshift(o),t=t.parentElement}return t===document.documentElement&&e.unshift("html"),e.join(" > ")}function x(n){var e;if(n.tagName==="INPUT"||n.tagName==="TEXTAREA")return n.value||n.placeholder||"";var t=((e=n.textContent)===null||e===void 0?void 0:e.trim())||"";return t.length>50?t.substring(0,50)+"...":t}function E(n){for(var e={},t=0;t<n.attributes.length;t++){var o=n.attributes[t];e[o.name]=o.value}return e}function C(n){if(c){var e=n.target;if(!(!e||e===r||e===l||e===a||e===i||e===s)&&!(e===document.documentElement||e===document.body)){if(e===y){l.style.display="none",a.style.display="none";return}var t=e.getBoundingClientRect(),o=v(e),d=x(e),h=E(e);l.style.display="block",l.style.left="".concat(t.left-2,"px"),l.style.top="".concat(t.top-2,"px"),l.style.width="".concat(t.width+4,"px"),l.style.height="".concat(t.height+4,"px"),a.style.display="block",a.textContent="<".concat(e.tagName.toLowerCase(),">");var g=t.top-22,p=t.left;g<0&&(g=t.bottom+5),p+a.offsetWidth>window.innerWidth&&(p=window.innerWidth-a.offsetWidth-5),a.style.left="".concat(Math.max(0,p),"px"),a.style.top="".concat(g,"px");var b={tagName:e.tagName.toLowerCase(),rect:{left:t.left,top:t.top,right:t.right,bottom:t.bottom,width:t.width,height:t.height,x:t.x,y:t.y},selector:o,text:d,attributes:h,url:window.location.href,path:window.location.pathname,timestamp:Date.now()};try{window.parent.postMessage({type:"iframe-element-hover",data:b,source:"iframe-highlight-injector"},"*")}catch(m){console.warn("无法发送消息到父窗口:",m)}}}}function L(n){if(c){var e=n.relatedTarget;if(!(e&&(e===l||e===a||e===r||e===i||e===s))){l.style.display="none",a.style.display="none";try{window.parent.postMessage({type:"iframe-element-hover",data:null,source:"iframe-highlight-injector"},"*")}catch(t){console.warn("无法发送消息到父窗口:",t)}}}}function k(n){var e=n.target;if(!(!e||e===r||e===l||e===a||e===i||e===s)&&!(e===document.documentElement||e===document.body)){["input","textarea","select","button","a"].includes(e.tagName.toLowerCase()),c&&(n.preventDefault(),n.stopPropagation());var t=e.getBoundingClientRect(),o=v(e),d=x(e),h=E(e);console.log("Element clicked:",{tagName:e.tagName,selector:o,rect:t}),u(e),l.style.display="none",a.style.display="none";var g={tagName:e.tagName.toLowerCase(),rect:{left:t.left,top:t.top,right:t.right,bottom:t.bottom,width:t.width,height:t.height,x:t.x,y:t.y},selector:o,text:d,attributes:h,url:window.location.href,path:window.location.pathname,timestamp:Date.now()};try{window.parent.postMessage({type:"iframe-element-click",data:g,source:"iframe-highlight-injector"},"*")}catch(p){console.warn("无法发送消息到父窗口:",p)}}}function T(n){if(console.log("Received message from parent:",n.data),n.data.type==="iframe-highlight-toggle"){var e=n.data.enabled;console.log("Highlight toggle:",e),e?f():w()}else if(n.data.type==="enable-iframe-highlight")console.log("Enable iframe highlight"),f();else if(n.data.type==="disable-iframe-highlight")console.log("Disable iframe highlight"),w();else if(n.data.type==="toggle-iframe-highlight"){var t=n.data.enabled!==void 0?n.data.enabled:!c;console.log("Toggle iframe highlight to:",t),t?f():w()}else if(n.data.type==="update-selected-element"){var o=n.data.selector;if(console.log("Update selected element with selector:",o),o)try{var d=document.querySelector(o);console.log("Found element by selector:",d),u(d)}catch(h){console.warn("Failed to select element:",h),u(null)}else u(null)}else n.data.type==="clear-selected-element"&&(console.log("Clear selected element"),u(null))}function f(){console.log("Enabling highlight"),document.addEventListener("mouseover",C,!0),document.addEventListener("mouseout",L,!0),document.addEventListener("click",k,!0),c=!0,r.style.display="block"}function w(){console.log("Disabling highlight"),c=!1,l.style.display="none",a.style.display="none"}function A(){console.log("Fully disabling highlight"),c=!1,document.removeEventListener("mouseover",C,!0),document.removeEventListener("mouseout",L,!0),document.removeEventListener("click",k,!0),r.style.display="none",l.style.display="none",a.style.display="none",i.style.display="none",s.style.display="none"}f(),window.addEventListener("message",T),window.__iframeHighlightControl={enable:f,disable:w,fullyDisable:A,isEnabled:function(){return c},getSelectedElement:function(){return y},updateSelected:u,sendToggleMessage:function(e){window.parent.postMessage({type:"iframe-highlight-status",enabled:e||c,source:"iframe-highlight-injector"},"*")}};try{window.parent.postMessage({type:"iframe-highlight-ready",data:{url:window.location.href,userAgent:navigator.userAgent,timestamp:Date.now()},source:"iframe-highlight-injector"},"*")}catch(n){console.warn("无法发送就绪消息到父窗口:",n)}window.__iframeHighlightCleanup=function(){A(),window.removeEventListener("message",T),r.parentElement&&r.parentElement.removeChild(r),delete window.__iframeHighlightInitialized,delete window.__iframeHighlightCleanup}})();(function(){if(window.self===window.top||window.__iframeHighlightInitialized)return;window.__iframeHighlightInitialized=!0,console.log("Iframe 高亮脚本已加载");var r=document.createElement("div");r.id="iframe-highlight-overlay",r.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 999999;
    overflow: hidden;
  `;var l=document.createElement("div");l.id="iframe-highlight-box",l.style.cssText=`
    position: absolute;
    border: 2px dashed #007AFF;
    background: rgba(0, 122, 255, 0.08);
    pointer-events: none;
    display: none;
    transition: all 0.1s ease;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.8);
    border-radius: 2px;
  `;var i=document.createElement("div");i.id="iframe-selected-box",i.style.cssText=`
    position: absolute;
    border: 2px solid #007AFF;
    pointer-events: none;
    display: none;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.9), 0 0 8px rgba(255, 107, 53, 0.4);
    border-radius: 2px;
    z-index: 1000000;
  `;var a=document.createElement("div");a.id="iframe-tag-label",a.style.cssText=`
    position: absolute;
    background: #007AFF;
    color: white;
    padding: 2px 6px;
    font-size: 11px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    border-radius: 2px;
    pointer-events: none;
    display: none;
    white-space: nowrap;
    z-index: 1000001;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    font-weight: 500;
  `;var s=document.createElement("div");s.id="iframe-selected-label",s.style.cssText=`
    position: absolute;
    background: #007AFF;
    color: white;
    padding: 3px 8px;
    font-size: 11px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    border-radius: 3px;
    pointer-events: none;
    display: none;
    white-space: nowrap;
    z-index: 1000002;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
    font-weight: 600;
  `,r.appendChild(l),r.appendChild(i),r.appendChild(a),r.appendChild(s),document.body.appendChild(r);var y=null,c=!1;function u(n){if(console.log("updateSelectedHighlight called with:",n),!n){i.style.display="none",s.style.display="none",y=null,console.log("Cleared selected highlight");return}y=n;var e=n.getBoundingClientRect();console.log("Selected element rect:",e),i.style.display="block",i.style.left="".concat(e.left-2,"px"),i.style.top="".concat(e.top-2,"px"),i.style.width="".concat(e.width+4,"px"),i.style.height="".concat(e.height+4,"px"),s.style.display="block",s.textContent="✓ <".concat(n.tagName.toLowerCase(),">");var t=e.top-28,o=e.left;t<5&&(t=e.bottom+5);var d=s.offsetWidth||100;o+d>window.innerWidth-10&&(o=window.innerWidth-d-10),s.style.left="".concat(Math.max(5,o),"px"),s.style.top="".concat(t,"px"),console.log("Selected highlight positioned at:",{left:i.style.left,top:i.style.top,width:i.style.width,height:i.style.height})}function v(n){if(!(n instanceof Element))throw new Error("Argument must be a DOM element");for(var e=[],t=n;t!==document.documentElement;){var o="";if(t.id&&document.querySelectorAll("#".concat(t.id)).length===1){e.unshift("#".concat(t.id));break}var d=Array.from(t.classList).filter(function(m){return!m.startsWith("js-")}),h=d.length>0?".".concat(d[0]):"",g=t.tagName.toLowerCase();if(h)o=h;else{var p=Array.from(t.parentNode.children),b=p.findIndex(function(m){return m===t})+1;o="".concat(g,":nth-child(").concat(b,")")}e.unshift(o),t=t.parentElement}return t===document.documentElement&&e.unshift("html"),e.join(" > ")}function x(n){var e;if(n.tagName==="INPUT"||n.tagName==="TEXTAREA")return n.value||n.placeholder||"";var t=((e=n.textContent)===null||e===void 0?void 0:e.trim())||"";return t.length>50?t.substring(0,50)+"...":t}function E(n){for(var e={},t=0;t<n.attributes.length;t++){var o=n.attributes[t];e[o.name]=o.value}return e}function C(n){if(c){var e=n.target;if(!(!e||e===r||e===l||e===a||e===i||e===s)&&!(e===document.documentElement||e===document.body)){if(e===y){l.style.display="none",a.style.display="none";return}var t=e.getBoundingClientRect(),o=v(e),d=x(e),h=E(e);l.style.display="block",l.style.left="".concat(t.left-2,"px"),l.style.top="".concat(t.top-2,"px"),l.style.width="".concat(t.width+4,"px"),l.style.height="".concat(t.height+4,"px"),a.style.display="block",a.textContent="<".concat(e.tagName.toLowerCase(),">");var g=t.top-22,p=t.left;g<0&&(g=t.bottom+5),p+a.offsetWidth>window.innerWidth&&(p=window.innerWidth-a.offsetWidth-5),a.style.left="".concat(Math.max(0,p),"px"),a.style.top="".concat(g,"px");var b={tagName:e.tagName.toLowerCase(),rect:{left:t.left,top:t.top,right:t.right,bottom:t.bottom,width:t.width,height:t.height,x:t.x,y:t.y},selector:o,text:d,attributes:h,url:window.location.href,path:window.location.pathname,timestamp:Date.now()};try{window.parent.postMessage({type:"iframe-element-hover",data:b,source:"iframe-highlight-injector"},"*")}catch(m){console.warn("无法发送消息到父窗口:",m)}}}}function L(n){if(c){var e=n.relatedTarget;if(!(e&&(e===l||e===a||e===r||e===i||e===s))){l.style.display="none",a.style.display="none";try{window.parent.postMessage({type:"iframe-element-hover",data:null,source:"iframe-highlight-injector"},"*")}catch(t){console.warn("无法发送消息到父窗口:",t)}}}}function k(n){var e=n.target;if(!(!e||e===r||e===l||e===a||e===i||e===s)&&!(e===document.documentElement||e===document.body)){["input","textarea","select","button","a"].includes(e.tagName.toLowerCase()),c&&(n.preventDefault(),n.stopPropagation());var t=e.getBoundingClientRect(),o=v(e),d=x(e),h=E(e);console.log("Element clicked:",{tagName:e.tagName,selector:o,rect:t}),u(e),l.style.display="none",a.style.display="none";var g={tagName:e.tagName.toLowerCase(),rect:{left:t.left,top:t.top,right:t.right,bottom:t.bottom,width:t.width,height:t.height,x:t.x,y:t.y},selector:o,text:d,attributes:h,url:window.location.href,path:window.location.pathname,timestamp:Date.now()};try{window.parent.postMessage({type:"iframe-element-click",data:g,source:"iframe-highlight-injector"},"*")}catch(p){console.warn("无法发送消息到父窗口:",p)}}}function T(n){if(console.log("Received message from parent:",n.data),n.data.type==="iframe-highlight-toggle"){var e=n.data.enabled;console.log("Highlight toggle:",e),e?f():w()}else if(n.data.type==="enable-iframe-highlight")console.log("Enable iframe highlight"),f();else if(n.data.type==="disable-iframe-highlight")console.log("Disable iframe highlight"),w();else if(n.data.type==="toggle-iframe-highlight"){var t=n.data.enabled!==void 0?n.data.enabled:!c;console.log("Toggle iframe highlight to:",t),t?f():w()}else if(n.data.type==="update-selected-element"){var o=n.data.selector;if(console.log("Update selected element with selector:",o),o)try{var d=document.querySelector(o);console.log("Found element by selector:",d),u(d)}catch(h){console.warn("Failed to select element:",h),u(null)}else u(null)}else n.data.type==="clear-selected-element"&&(console.log("Clear selected element"),u(null))}function f(){console.log("Enabling highlight"),document.addEventListener("mouseover",C,!0),document.addEventListener("mouseout",L,!0),document.addEventListener("click",k,!0),c=!0,r.style.display="block"}function w(){console.log("Disabling highlight"),c=!1,l.style.display="none",a.style.display="none"}function A(){console.log("Fully disabling highlight"),c=!1,document.removeEventListener("mouseover",C,!0),document.removeEventListener("mouseout",L,!0),document.removeEventListener("click",k,!0),r.style.display="none",l.style.display="none",a.style.display="none",i.style.display="none",s.style.display="none"}f(),window.addEventListener("message",T),window.__iframeHighlightControl={enable:f,disable:w,fullyDisable:A,isEnabled:function(){return c},getSelectedElement:function(){return y},updateSelected:u,sendToggleMessage:function(e){window.parent.postMessage({type:"iframe-highlight-status",enabled:e||c,source:"iframe-highlight-injector"},"*")}};try{window.parent.postMessage({type:"iframe-highlight-ready",data:{url:window.location.href,userAgent:navigator.userAgent,timestamp:Date.now()},source:"iframe-highlight-injector"},"*")}catch(n){console.warn("无法发送就绪消息到父窗口:",n)}window.__iframeHighlightCleanup=function(){A(),window.removeEventListener("message",T),r.parentElement&&r.parentElement.removeChild(r),delete window.__iframeHighlightInitialized,delete window.__iframeHighlightCleanup}})();
