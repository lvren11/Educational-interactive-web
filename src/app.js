import axios from 'axios';
// import StorageHelper from './component/Storage';

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};
let begin_log = false;
let log_value = [];
console.log = (function (oriLogFunc) {
  return function () {
    //判断配置文件是否开启日志调试
    try{
      if(arguments && arguments.length > 1){
        if(arguments[1]){
          let file_path = arguments[2];
          let json = {}
          for(let i = 0;i < log_value.length; i++){
            let a = log_value[i].split("  ");
            json[a[0]] = a[1]; 
          }
          begin_log = false;
          axios.post('/api/putlog',{
              "logvalue":json,
              "snumber":file_path
          }).then(function(response){
            oriLogFunc.call(console, "success");
          }).catch(function(error){
              console.error("error:",error)
          });
          log_value.splice(0,log_value.length);
        }
      }
      else{
        let _log = arguments[0];
        if(_log === "不记录"){
          begin_log = false;
        }
        if(_log === "开始记录"){
          begin_log = true;
        }
        if(begin_log){
          let islogget = _log.split("/")[0] === "2022" ? true : false;
          if(islogget){
            log_value.push(_log);
          }
        }
        oriLogFunc.call(console, ...arguments);
      }
    }catch(e){
      console.error('console.log error', e);
    }
  }
})(console.log);

(function(window){

  'use strict'
  
  //判断当前浏览器是否支持history和pushState,据我测试当前大部分浏览器都支持
  
  if(window.history && window.history.pushState)
  
  {
  
  window.onpopstate = function(){
  
  window.history.pushState({},null,"");
  
  //window.history.forward(1); 这句我没理解什么意思，不加也可以实现，所以注释掉了
  
  }
  
  }
  
  })(window);

  
// window.onbeforeunload = function(){
//   StorageHelper.clear('UseTime');
//   StorageHelper.clear('web_user_id');
//   StorageHelper.clear('web_user');
//   StorageHelper.clear('x-auth-token');
// };
