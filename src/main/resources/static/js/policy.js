"use strict";

/**policy.js */
var container = document.querySelector("#container");
var webFooter = document.querySelector("#web-footer");
var webHeader = document.querySelector("#web-header"); // var goUrl = document.getElementsByClassName("goUrl")

var goUrl = getElementsByClass("goUrl", "a");
var device = ""; // 区别wap和web

var afterDeviceCheck = function afterDeviceCheck(deviceInfo) {
  var deviceInfo = deviceInfo || {};
  var isWXminiprogram = deviceInfo.isWXminiprogram;
  var os = deviceInfo.Os;

  if (!isWXminiprogram && (os == "PAD" || os == "PC")) {
    device = "web";
    includeLinkStyle("./css/webStyle.css");
    includeLinkStyle("./css/policy/web.css");
    webFooter.style.display = "block";
    webHeader.style.display = "block";
  } else {
    device = "wap";
    includeLinkStyle("./css/wapStyle.css");
    includeLinkStyle("./css/policy/wap.css"); // rem改变html-font-size

    var html = document.querySelector("html");
    html.style.fontSize = html.offsetWidth / 37.5 + "px";
  }

  window.onload = function () {
    container.style.display = "block";
  };
};

getAppInfo(true); // 匹配跳转

for (var i = 0; i < goUrl.length; i++) {
  if (window.location.href.match(/yun.139.com/i)) {
    goUrl[i].href = "https://yun.139.com";
  } else if (window.location.href.match(/miniprogram.mail.10086.cn/i)) {
    goUrl[i].href = "https://miniprogram.mail.10086.cn/viewtest/mcloudweb";
  }
}