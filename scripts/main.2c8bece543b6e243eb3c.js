!function(){var e={715:function(){const e=document.querySelector(".sketch__container"),t=document.querySelector(".sketch__color-picker"),n=document.querySelector(".sketch__checkbox"),o=document.querySelector(".sketch__range"),r=document.querySelector(".sketch__range-text"),c=document.querySelector("#color"),u=document.querySelector("#random"),l=document.querySelector("#eraser"),i=document.querySelector("#fill"),a=document.querySelector("#clear");let d="color";function s(e){e.style.background=t.value}function f(e){e.style.background="#ffffff"}function h(e){e.forEach((e=>{e.addEventListener("mouseover",(()=>{"color"===d?s(e):"random"===d?function(e){e.style.background="#"+Math.floor(16777215*Math.random()).toString(16)}(e):"eraser"===d&&f(e)}))}))}function y(e,n){"color"===e.id||"fill"===e.id?e.style.background=n?t.value:"#f0f6d5":"random"===e.id?e.style.background=n?"linear-gradient(90deg, #52d6fc, #ff0fff)":"#f0f6d5":e.style.background=n?"#ffffff":"#f0f6d5"}function m(e){[c,u,l,i,a].forEach((t=>{t.classList.toggle("active",t===e),y(t,t===e)}))}function v(){const t=o.value,c=n.checked;r.textContent=`${t}x${t}`;const u=function(t,n,o){e.innerHTML="";for(let r=0;r<t*t;r++){const t=document.createElement("div");t.className="sketch__square",t.style.cssText=`width:${n}px; height:${n}px; background:#fff; ${o?"outline:1px solid #000; outline-offset:-1px;":""}`,e.appendChild(t)}return e.querySelectorAll(".sketch__square")}(t,(l=t,e.clientWidth/l),c);var l;h(u),m(document.querySelector(`#${d}`))}[c,u,l,i,a].forEach((e=>{e===c||e===u||e===l?e.addEventListener("click",(()=>{d=e.id,m(e)})):e.addEventListener("click",(()=>{document.querySelectorAll(".sketch__square").forEach(e===i?s:f)})),["mouseenter","mouseleave"].forEach((t=>{e.addEventListener(t,(()=>{e.classList.contains("active")||y(e,"mouseenter"===t)}))}))})),t.addEventListener("input",(()=>{c.classList.contains("active")&&y(c,!0)})),o.addEventListener("input",v),n.addEventListener("click",(()=>{return e=n.checked,void document.querySelectorAll(".sketch__square").forEach((t=>{t.style.outline=e?"1px solid #000":"none",t.style.outlineOffset=e?"-1px":"0"}));var e})),window.onload=v}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var c=t[o]={exports:{}};return e[o](c,c.exports,n),c.exports}n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){"use strict";n(715)}()}();
//# sourceMappingURL=main.2c8bece543b6e243eb3c.js.map