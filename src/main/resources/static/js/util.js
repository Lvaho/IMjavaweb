"use strict";

function getAppInfo(isAsyn) {
  var isAsyn = isAsyn || false;
  var UA = navigator.userAgent;
  var browser = {
    versions: function () {
      var u = UA; // var app = navigator.appVersion

      return {
        // 移动终端浏览器版本信息
        trident: u.indexOf("Trident") > -1,
        // IE内核
        presto: u.indexOf("Presto") > -1,
        // opera内核
        webKit: u.indexOf("AppleWebKit") > -1,
        // 苹果、谷歌内核
        gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1,
        // 火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/),
        // 是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        // ios终端
        android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1,
        // android终端或uc浏览器
        isFireFox: /(?:Firefox)/.test(u),
        iPhone: u.indexOf("iPhone") > -1,
        // 是否为iPhone或者QQHD浏览器
        iPad: u.indexOf("iPad") > -1,
        // 是否iPad
        webApp: u.indexOf("Safari") == -1 // 是否web应该程序，没有头部与底部

      };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  };
  browser.isTablet = /(?:iPad|PlayBook)/.test(UA) || browser.versions.android && !/(?:Mobile)/.test(UA) || browser.versions.isFireFox && /(?:Tablet)/.test(UA); // 针对部分浏览器做移动端强判断

  if ((browser.versions.android || browser.versions.iPhone) && !browser.isTablet) browser.versions.mobile = true;
  var resultApp = {
    Browser: "unknown",
    Os: "unknown",
    devModel: "unknown",
    osVersion: "unknown"
  };

  if (browser.isTablet) {
    resultApp.Os = "PAD";
  } else if (browser.versions.mobile) {
    // 判断是否是移动设备打开。browser代码在下面
    var ua = UA.toLowerCase(); // 获取判断用的对象

    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      resultApp.Browser = "wechat";
    } else if (ua.indexOf("peopleandroid") > -1) {
      resultApp.Browser = "peoplesAPP";
    } else if (ua.indexOf("peopleios") > -1) {
      resultApp.Browser = "peoplesIosAPP";
    } else if (ua.match(/MCloudApp/i) == "mcloudapp" || ua.indexOf("mcloudapp") !== -1) {
      // 在和彩云客户端打开
      resultApp.Browser = "mcloud";
    } else if (ua.match(/WeiBo/i) == "weibo") {
      // 在新浪微博客户端打开
      resultApp.Browser = "weibo";
    } else if (ua.match(/QQ/i) == "qq") {
      //       在Android上
      //       QQ内置环境的ua中有关键字 MQQBrowser， 并且后面有一个QQ字符，QQ浏览器则没有。
      //       因此在Android上区分，需要用正则判断ua中包含MQQBrowser并且之后包含QQ，则是QQ内置浏览器，ua中包含MQQBrowser但是不包含QQ则是QQ浏览器
      //       在ios上
      //       QQ内置浏览器的ua包含一个空格加QQ，但是不包含MQQBrowser
      //       QQ浏览器ua包含MQQBrowser但是不包含单独的QQ
      if (browser.versions.ios) {
        if (ua.match(/QQBrowser/i) == "qqbrowser") resultApp.Browser = "qqBrowser";else resultApp.Browser = "qq";
      } else if (browser.versions.android) {
        if (/qqbrowser/i.test(ua) && /QQ/i.test(ua.split("qqbrowser"))) resultApp.Browser = "qq";else if (ua.match(/QQBrowser/i) !== "qqbrowser") resultApp.Browser = "qq";else resultApp.Browser = "qqBrowser";
      }
    } else if (ua.indexOf("ucbrowser") > -1) {
      resultApp.Browser = "uc";
    } else if (ua.indexOf("baiduboxapp") > -1) {
      resultApp.Browser = "baidu";
    } else if (ua.indexOf("baiduboxapp") > -1) {
      resultApp.Browser = "baidu";
    } else if (ua.indexOf("sogoumobilebrowser") > -1) {
      resultApp.Browser = "sogou";
    } else if (ua.indexOf("vivobrowser") > -1) {
      resultApp.Browser = "vivo";
    } else if (ua.indexOf("miuibrowser") > -1) {
      resultApp.Browser = "miuibrowser";
    } else if (ua.indexOf("oppobrowser") > -1) {
      resultApp.Browser = "oppo";
    } else if (ua.indexOf("mzbrowser") > -1) {
      resultApp.Browser = "Meizu";
    } else if (ua.indexOf("quark") > -1) {
      resultApp.Browser = "quark";
    } else if (ua.indexOf("liebaofast") > -1) {
      resultApp.Browser = "liebao";
    } else if (ua.indexOf("mozilla") > -1 && ua.indexOf("fxios") > -1) {
      resultApp.Browser = "firefox";
    } else if (ua.indexOf("samsungbrowser") > -1 || ua.indexOf("qhbrowser") > -1) {
      resultApp.Browser = "samsung";
    } else if (ua.indexOf("oneplus") > -1) {
      // 如果均不是其独有标识的浏览器，则在华为手机中视为华为浏览器
      resultApp.Browser = "oneplus";
    } else if (ua.indexOf("huawei") > -1) {
      // 如果均不是其独有标识的浏览器，则在华为手机中视为华为浏览器
      resultApp.Browser = "huawei";
    } else if (ua.indexOf("qihoobrowser") > -1 || ua.indexOf("qhbrowser") > -1 || ua.indexOf("360") > -1) {
      resultApp.Browser = "360";
    } else if (ua.indexOf("mozilla") > -1 && ua.indexOf("firefox") > -1) {
      resultApp.Browser = "redmiFirefox";
    } else if (/chrome/i.test(ua)) {
      resultApp.Browser = "chrome";
    } else if (/CriOS/i.test(ua) && !(/chrome/i.test(ua) && /webkit/i.test(ua) && /mozilla/i.test(ua))) {
      resultApp.Browser = "chrome";
    } else if (/webkit/i.test(ua) && /safari/i.test(ua) && !(/chrome/i.test(ua) && /webkit/i.test(ua) && /mozilla/i.test(ua))) {
      resultApp.Browser = "safari";
    }

    if (ua.indexOf("redmi") > -1) {
      resultApp.device = "redmi";
    }

    if (ua.indexOf("huawei") > -1) {
      resultApp.device = "huawei";
    } // 识别设备的操作系统


    if (browser.versions.ios) {
      // 是否在IOS浏览器打开
      resultApp.Os = "ios";
    } else if (browser.versions.android) {
      // 是否在安卓浏览器打开
      resultApp.Os = "android";
    } else resultApp.Os = "unknown";
    /** 获取设备型号 */
    //    根据括号进行分割


    var left = UA.indexOf("(");
    var right = UA.indexOf(")");
    var str = UA.substring(left + 1, right);
    var Str = str.split(";");

    if (UA.indexOf("iPhone") !== -1 || UA.indexOf("iPad") !== -1) {
      left = Str[1].indexOf("OS");
      right = Str[1].indexOf("like");
      resultApp.osVersion = "ios " + Str[1].substring(left + 3, right - 1).replace(/_/g, ".");
      resultApp.devModel = Str[0];
    } else {
      var versionIndex = "";

      for (var i = 0; i < Str.length; i++) {
        if (Str[i].indexOf("Android") !== -1) {
          resultApp.osVersion = Str[i].substring(1, Str[i].length);
          versionIndex = i;
          break;
        }
      }

      if (Str[Str.length - 1].indexOf("Build/") !== -1) {
        resultApp.devModel = Str[Str.length - 1].substring(1, Str[Str.length - 1].indexOf("Build/") - 1);
      } else {
        if (versionIndex) resultApp.devModel = Str[versionIndex + 1].substring(1, Str[versionIndex + 1].length);else resultApp.devModel = Str[Str.length - 1].substring(0, 9);
      }
    }
    /** */

  } else {
    // 否则就是PC浏览器打开
    resultApp.Os = "PC";
  }

  if (!isAsyn) return resultApp;else {
    if (wx && wx.miniProgram) {
      try {
        wx.miniProgram.getEnv(function (res) {
          if (res.miniprogram) {
            resultApp.isWXminiprogram = true;
            afterDeviceCheck(resultApp);
            return resultApp;
          } else {
            resultApp.isWXminiprogram = false;
            afterDeviceCheck(resultApp);
            return resultApp;
          }
        });
      } catch (e) {
        afterDeviceCheck(resultApp);
        return resultApp;
      } finally {
        afterDeviceCheck(resultApp);
        return resultApp;
      }
    } else {
      afterDeviceCheck(resultApp);
      return resultApp;
    }
  }
} // 引入css样式文件


function includeLinkStyle(url) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = url;
  document.getElementsByTagName("head")[0].appendChild(link);
}
/**getElementsByClass兼容问题*/


function getElementsByClass(classStr) {
  var eleName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "*";

  if (document.getElementsByClassName) {
    return document.getElementsByClassName(classStr);
  } else {
    var node = document.getElementsByTagName(eleName);
    var ele = [];

    for (var i = 0; i < node.length; i++) {
      if (hasClass(node[i], classStr)) {
        ele.push(node[i]);
      }
    }

    return ele;
  }
}

function hasClass(ele, classStr) {
  var classSet = ele.className.split(/\s+/);

  for (var i = 0; i < classSet.length; i++) {
    if (classSet[i] == classStr) {
      return true;
    }
  }

  return false;
}