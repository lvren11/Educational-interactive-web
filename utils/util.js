function timetoformat(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var Hours = date.getHours();
    var Minutes = date.getMinutes();
    var Seconds = date.getSeconds();
    if (month < 10) {
        month = "0" + month;
          }
   if (day < 10) {
         day = "0" + day;
          }
    if (Hours < 10) {
        Hours = "0" + Hours;
        }
    if (Minutes < 10) {
        Minutes = "0" + Minutes;
        }
    if (Seconds < 10) {
        Seconds = "0" + Seconds;
            }
    var s_createtime = year + '/' + month + '/' + day + '-' + Hours + ':' + Minutes + ':' + Seconds + '  ';
    return s_createtime;
}

function arrayToJson(o) {
    var r = [];
    if (typeof o == "string") return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
    if (typeof o == "object") {
      if (!o.sort) {
        for (var i in o)
        r.push(i + ":" + arrayToJson(o[i]));
        if (!!document.all && !/^\n?function\s*toString\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
        r.push("toString:" + o.toString.toString());
        }
        r = "{" + r.join() + "}";
      } else {
        for (var j = 0; j < o.length; j++) {
        r.push(arrayToJson(o[j]));
        }
        r = "[" + r.join() + "]";
      }
      return r;
    }
    return o.toString();
  }

function getnowtime(){
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var Hours = date.getHours();
    var Minutes = date.getMinutes();
    var Seconds = date.getSeconds();
    if (month < 10) {
        month = "0" + month;
          }
   if (day < 10) {
         day = "0" + day;
          }
    if (Hours < 10) {
        Hours = "0" + Hours;
        }
    if (Minutes < 10) {
        Minutes = "0" + Minutes;
        }
    if (Seconds < 10) {
        Seconds = "0" + Seconds;
            }
    var s_createtime = Hours + ':' + Minutes + ':' + Seconds;
    return s_createtime;
}

export default{
    timetoformat,
    getnowtime,
    arrayToJson
}