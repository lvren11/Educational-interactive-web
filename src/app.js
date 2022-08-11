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
          oriLogFunc.call(console, file_path);
          oriLogFunc.call(console, json); //直接输出要的log数据
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
