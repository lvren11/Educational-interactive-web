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
    getnowtime
}