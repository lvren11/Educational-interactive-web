import React, { useRef, useEffect, useImperativeHandle,forwardRef} from 'react';
window.requestNextAnimationFrame =
   (function () {
      var originalWebkitRequestAnimationFrame = undefined,
          wrapper = undefined,
          callback = undefined,
          geckoVersion = 0,
          userAgent = navigator.userAgent,
          index = 0,
          self = this;

      // Workaround for Chrome 10 bug where Chrome
      // does not pass the time to the animation function
      
      if (window.webkitRequestAnimationFrame) {
         // Define the wrapper

         wrapper = function (time) {
           if (time === undefined) {
              time = +new Date();
           }
           self.callback(time);
         };

         // Make the switch
          
         originalWebkitRequestAnimationFrame = window.webkitRequestAnimationFrame;    

         window.webkitRequestAnimationFrame = function (callback, element) {
            self.callback = callback;

            // Browser calls the wrapper and wrapper calls the callback
            
            originalWebkitRequestAnimationFrame(wrapper, element);
         }
      }

      // Workaround for Gecko 2.0, which has a bug in
      // mozRequestAnimationFrame() that restricts animations
      // to 30-40 fps.

      if (window.mozRequestAnimationFrame) {
         // Check the Gecko version. Gecko is used by browsers
         // other than Firefox. Gecko 2.0 corresponds to
         // Firefox 4.0.
         
         index = userAgent.indexOf('rv:');

         if (userAgent.indexOf('Gecko') != -1) {
            geckoVersion = userAgent.substr(index + 3, 3);

            if (geckoVersion === '2.0') {
               // Forces the return statement to fall through
               // to the setTimeout() function.

               window.mozRequestAnimationFrame = undefined;
            }
         }
      }
      
      return window.requestAnimationFrame   ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame    ||
         window.oRequestAnimationFrame      ||
         window.msRequestAnimationFrame     ||

         function (callback, element) {
            var start,
                finish;

            window.setTimeout( function () {
               start = +new Date();
               callback(start);
               finish = +new Date();

               self.timeout = 1000 / 60 - (finish - start);

            }, self.timeout);
         };
      }
   )
();
const Car = (props,ref) => {
  
  const canvasRef = useRef(null);
  const [value, setValue] = React.useState(props.value);
  const [state, setState] = React.useState(props.state);
  const [selectedValue, setSelectedValue] = React.useState(props.selectedvalue);
  const [begin,setbegin] = React.useState(false);
  useImperativeHandle(ref, () => ({
    // changeVal 就是暴露给父组件的方法
    start,
    init
  }));
  // start()
  const start =(state,value,selectedValue) =>{
    setState({...state});
    setValue({...value});
    setSelectedValue(selectedValue);
    setbegin(true);
  }
  const init =() =>{
    setbegin(false);
  }
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d'); //获得上下文
    ctx.font = '13px Helvetica';
    var wChar= ctx.measureText('m').width;

    //orígenes
    var orgX=4*wChar, 
      orgY=canvas.height-2.5*wChar, 
      orgYY=orgY-8*wChar, 
    //escala
      escala=(canvas.width-wChar-orgX)/100.0, //máximo 100 metros
      escalaY=(orgYY-wChar)/42.0,  //máximo 
      escalaYY=(orgYY-3*wChar)/10.0,  //acelaración
    //parámetros
      masa=3000, //masa del vehículo
      mu=0.5, //coeficiente cinético de rozamiento
      dist=70,  //distancia al obstáculo
      v0=200/9,  //80 km/h
      tr=0.9, //tiempo de reacción
      v=v0, //velocidad
      x=0, //posición
    //movimiento del bloque
      dt=0.01,
      t=0.0,
      pos=[],
    //tipos de movimiento
      tipo=0,
      nPuntos=0;
    var bPaused=true;
    var selectvalue = selectedValue;
    drawGrid('lightgray', 10, 10);  
    dispositivo(ctx);
    function drawGrid(color, stepx, stepy) {
      ctx.save()
      ctx.strokeStyle = color;
      ctx.fillStyle = '#ffffff';
      ctx.lineWidth = 0.5;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
   
      for (var i = stepx + 0.5; i < canvas.width; i += stepx) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
   
      for (var i = stepy + 0.5; i < canvas.height; i += stepy) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }
      ctx.restore();
    }
    function dispositivo(g){
      var x1, y1;
    //regla horizontal
      g.fillStyle='lightgray';
      g.fillRect(0, orgY, canvas.width, canvas.height-orgY);
      g.strokeStyle='black';
      g.strokeRect(0, orgY, canvas.width, canvas.height-orgY);
      g.textAlign='center';
      g.textBaseline='top';
      g.fillStyle='black';
      g.beginPath();
      for(var i=0; i<=100; i+=10){
        x1=orgX+i*escala;
        g.moveTo(x1, orgY+wChar);
        g.lineTo(x1, orgY);
        g.fillText(i, x1, orgY+wChar-2);
        for(var j=1; j<10; j++){
          x1=orgX+(i+j)*escala;
          g.moveTo(x1, orgY+wChar/2);
          g.lineTo(x1, orgY);
          if(j==5){
            g.moveTo(x1, orgY+3*wChar/4);
            g.lineTo(x1, orgY);
          }
        }
      }
      g.stroke();
    //vehículo
      var x2, y2;
      var ancho=5*wChar;
      x1=orgX+x*escala-ancho;
      g.fillStyle='black';
      y1=orgY-2*wChar;
      g.beginPath();
      g.arc(x1+wChar, y1+wChar, wChar, 0, 2*Math.PI);
      g.stroke();
      g.beginPath();
      g.arc(x1+wChar, y1+wChar, 2, 0, 2*Math.PI);
      g.fill();
      var angulo=-x/(wChar/escala);
      if(tipo==1){
        angulo=0;
      }
      g.fillRect(x1+wChar-2, y1-wChar/2, 4, wChar/2);
      g.beginPath();
      for(var i=0; i<8; i++){
        x2=x1+wChar+wChar*Math.cos(angulo+i*Math.PI/4);
        y2=y1+wChar-wChar*Math.sin(angulo+i*Math.PI/4);
        g.moveTo(x1+wChar, y1+wChar);
        g.lineTo(x2, y2);
      }
      g.stroke();
      g.fillRect(x1+ancho-wChar-2, y1-wChar/2, 4, wChar/2);
      g.beginPath();
      g.arc(x1+ancho-wChar, y1+wChar, wChar, 0, 2*Math.PI);
      g.stroke();
      g.beginPath();
      g.arc(x1+ancho-wChar, y1+wChar, 2, 0, 2*Math.PI);
      g.fill();
      g.beginPath();
      for(var i=0; i<8; i++){
        x2=x1+ancho-wChar+wChar*Math.cos(angulo+i*Math.PI/4);
        y2=y1+wChar-wChar*Math.sin(angulo+i*Math.PI/4);
        g.moveTo(x1+ancho-wChar, y1+wChar);
        g.lineTo(x2, y2);
      }
      g.stroke();
      g.fillRect(x1-wChar, y1-4-wChar/2, ancho+wChar, 4);
      g.fillStyle='lightgray';
      g.fillRect(x1-wChar/2, y1-2*wChar, ancho-wChar, wChar);
      g.strokeStyle='black';
      g.strokeRect(x1-wChar/2, y1-2*wChar, ancho-wChar, wChar);
      g.fillRect(x1+ancho-2.5*wChar, y1-4-2.5*wChar, 1.5*wChar, 2*wChar);
      g.strokeRect(x1+ancho-2.5*wChar, y1-4-2.5*wChar, 1.5*wChar, 2*wChar);
      g.fillStyle='cyan';
      g.fillRect(x1+ancho-2*wChar, y1-2.5*wChar, wChar/2, wChar);
    //frenos
      if(t>tr){
        g.lineWidth='3';
        g.strokeStyle='red';
        g.beginPath();
        g.moveTo(x1-6, y1-wChar/2);
        g.lineTo(x1-6, y1+wChar);
        g.moveTo(x1-3, y1+wChar-6);
        g.lineTo(x1-3, y1+wChar+4);
        g.moveTo(x1+ancho-2*wChar-6, y1-wChar/2);
        g.lineTo(x1+ancho-2*wChar-6, y1+wChar);
        g.moveTo(x1+ancho-2*wChar-3, y1+wChar-6);
        g.lineTo(x1+ancho-2*wChar-3, y1+wChar+4);
        g.stroke();
        g.lineWidth=1;		
      }
    //obstáculo
      g.fillStyle='black';
      x2=orgX+dist*escala;
      g.fillRect(x2, orgY-4*wChar, 2*wChar, 4*wChar);
      
    //fuerzas
      if(state.checkedD){
        x1=orgX+x*escala;
        var lonFuerza=5*wChar*masa/5000;
        dibujaFlecha(wChar, g, -Math.PI/2, x1-ancho/2, y1-1.5*wChar, lonFuerza, 'blue');
        dibujaFlecha(wChar, g, Math.PI/2, x1-ancho/2, y1-1.5*wChar, lonFuerza, 'blue');
        lonFuerza=5*wChar*masa*mu/5000;
        if(tipo==1){
          dibujaFlecha(wChar, g, Math.PI, x1-ancho/2, y1-1.5*wChar, lonFuerza, 'red');
        }
      }
      if(x>=dist){
        x1=orgX+x*escala;
        g.save();	
        g.translate(x1, orgY-3*wChar);	
        estrella(wChar, g,'red');
        g.scale(0.5,0.5);
        estrella(wChar, g, 'yellow');
        g.restore();
      }
    }
    function estrella(wChar, g, color){
      g.strokeStyle='black';
      g.fillStyle=color;
      g.beginPath();
      g.moveTo(0, -3*wChar);
      g.lineTo(-wChar,-wChar);
      g.lineTo(-3*wChar,0);
      g.lineTo(-wChar, wChar);
      g.lineTo(0,3*wChar);
      g.lineTo(wChar, wChar);
      g.lineTo(3*wChar,0);
      g.lineTo(wChar, -wChar);
      g.closePath();
      g.fill();
      g.stroke();
    }
    function dibujaFlecha(wChar, g, fi, x1, y1, longitud, color){
        if(longitud==0) return;
      var x2=x1+longitud*Math.cos(fi);
        var y2=y1-longitud*Math.sin(fi);
        g.strokeStyle=color;
     //flecha
      g.fillStyle=color;
      g.beginPath();
      g.arc(x1,y1,2,0,2*Math.PI)
      g.fill();
      g.beginPath();	    
      g.moveTo(x1, y1);
      g.lineTo(x2, y2);
        var x3=x2-wChar*Math.cos(fi-Math.PI/6);
        var y3=y2+wChar*Math.sin(fi-Math.PI/6);
        g.moveTo(x2, y2);
      g.lineTo(x3, y3);
        x3=x2-wChar*Math.sin(-fi+Math.PI/3);
        y3=y2+wChar*Math.cos(-fi+Math.PI/3);
        g.moveTo(x2, y2);
      g.lineTo( x3, y3);
      g.stroke();
    }
    function onstart(state, value, selectedValue) {
      //evitar superar el máximo y mínimo en los controles
      selectvalue = selectedValue;
      var vIni=parseFloat(value.velocidad);  
      dist=parseFloat(value.distancia);  
      tr=parseFloat(value.tiempo);  
      mu=parseFloat(value.rozamiento);  
      masa=parseFloat(value.masa);
     
     //valores iniciales	
      x=0.0;
      v0=vIni*1000/3600;
      v=v0;
      t=0.0;
      tipo=0;
      pos.length=0;
      nPuntos=0;
      bPaused = false;
      window.requestNextAnimationFrame(animate);
    }
    function update() {
      t+=dt;
      switch(tipo){
            case 0:
                x=v0*t;
                v=v0;
                if(t>tr){
                  tipo=1;
                }
                break;
            case 1:
                x=v0*tr+v0*(t-tr)-0.5*mu*9.8*(t-tr)*(t-tr);
                v=v0-mu*9.8*(t-tr);
                if(v<=0){
                  v=0.0;
                  bPaused=true;
                }
                if(x>=dist){
                  bPaused=true;
                }
                break;
            default:
                break;
        }
    }
     
    function animate(time) {
      if (!bPaused) {
        update();
        ctx.clearRect(0,0,canvas.width,canvas.height);
        drawGrid('lightgray', 10, 10);  
        dispositivo(ctx);
        if(selectvalue == 'a'){
          graficaVelocidad(ctx);
        }
        if(selectvalue == 'b'){
          graficaAceleracion(ctx);
        }
        window.requestNextAnimationFrame(animate);
      }
    }
    function graficaVelocidad(g){
      //eje horizontal
      var x1, y1;
      g.fillStyle='black';
      g.strokeStyle='black';
      g.textAlign='left';
      g.textBaseline='top';
      g.fillText('v(m/s)', orgX+2, 2);
      g.fillText('x(m)', canvas.width-2.5*wChar, orgYY);
      g.beginPath();
      g.moveTo(orgX, orgYY);
      g.lineTo(canvas.width, orgYY);
      g.moveTo(orgX, orgYY);
      g.lineTo(orgX, 0);
      g.textAlign='right';
      g.textBaseline='middle';
      for(var i=0; i<=40; i+=10){
        y1=orgYY-i*escalaY;
        g.moveTo(orgX-wChar, y1);
        g.lineTo(orgX, y1);
        g.fillText(i, orgX-wChar-2, y1);
        for(var j=1; j<10; j++){
          y1=orgYY-(i+j)*escalaY;
          g.moveTo(orgX-wChar/2, y1);
          g.lineTo(orgX, y1);
          if(j==5){
            g.moveTo(orgX-3*wChar/4, y1);
            g.lineTo(orgX, y1);	
          }   
        }
      }
      g.stroke();
      x1=orgX+escala*x;
      y1=orgYY-escalaY*v;
      g.textAlign='left';
      g.textBaseline='bottom';
      g.fillText(v0.toFixed(2), orgX+2, orgYY-escalaY*v0-2);  
      if(t<tr){  //tiempo de reacción
        nPuntos++;
        g.fillStyle='red'; 
        g.beginPath();
        g.arc(x1, y1, 2, 0, 2*Math.PI);
        g.fill();
        pos.push({x:x1, y:y1});
        g.strokeStyle='red';
        g.beginPath();
        g.moveTo(pos[0].x,pos[0].y);
        for(var i=1; i<pos.length; i++){
          g.lineTo(pos[i].x,pos[i].y);
        }
        g.stroke();
      }else{  //frenado después de reaccionar
        g.fillStyle='red';   
        g.beginPath();
        g.arc(x1, y1, 2, 0, 2*Math.PI);
        g.fill();
        pos.push({x:x1, y:y1});
        g.strokeStyle='red';
        g.beginPath();
        g.moveTo(pos[0].x,pos[0].y);
        for(var i=1; i<nPuntos; i++){
          g.lineTo(pos[i].x,pos[i].y);
        }
        g.stroke();
        g.fillStyle='blue';   
        g.beginPath();
        g.arc(x1, y1, 2, 0, 2*Math.PI);
        g.fill();
        g.strokeStyle='blue';
        g.beginPath();
        g.moveTo(pos[nPuntos-1].x,pos[nPuntos-1].y);
        for(var i=nPuntos; i<pos.length; i++){
          g.lineTo(pos[i].x,pos[i].y);
        }
        g.stroke();
        var x2=orgX+escala*v0*tr;
        var y2=orgYY-escalaY*v0;
        g.save();
        g.strokeStyle='red';
        g.setLineDash([5]);
        g.beginPath();
        g.moveTo(x2, y2);
        g.lineTo(x2, orgYY);
        g.stroke();
        g.restore();
        g.fillStyle='black';
        g.textAlign='right';
        g.fillText((v0*tr).toFixed(2), x2-2,orgYY-2);
        //g.textBaseline='top';    
        //g.textAlign='left';
        //g.fillText(v.toFixed(2), orgX, y1+2);  
      }
      g.fillStyle='black';
      g.textAlign='left';
      g.fillText(x.toFixed(2), x1+2, orgYY-2);
      g.save();
      g.setLineDash([5]);
      g.beginPath();
      g.moveTo(x1, y1);
      g.lineTo(x1, orgYY);
      g.moveTo(x1, y1);
      g.lineTo(orgX, y1);
      g.stroke();
      g.textBaseline='top';    
      g.font = 'bold 15px Helvetica';
      g.textAlign='right';
      g.fillText('t(s): '+t.toFixed(2), canvas.width-wChar, 2);
      g.fillText('v(m/s): '+v.toFixed(2), canvas.width-wChar, 2*wChar);  
      g.restore();
      g.lineWidth=3;
      g.strokeStyle='red';
      g.beginPath();
      g.moveTo(canvas.width-8*wChar, 5*wChar);
      g.lineTo(canvas.width-6*wChar, 5*wChar);
      g.stroke();
      g.strokeStyle='blue';
      g.beginPath();
      g.moveTo(canvas.width-8*wChar, 6.5*wChar);
      g.lineTo(canvas.width-6*wChar, 6.5*wChar);
      g.stroke();
      g.lineWidth=1;
      g.fillStyle='black';
      g.textBaseline='middle';   
      g.fillText('reaction', canvas.width-5*wChar, 5*wChar);
      g.fillText('braking', canvas.width-5*wChar, 6.5*wChar);
    }
      
    function graficaAceleracion(g){
    //eje horizontal
      var x1, y1;
      g.fillStyle='black';
      g.strokeStyle='black';
      g.textAlign='left';
      g.fillText('a(m/s\u00B2)', orgX+2, 2);
      g.fillText('x(m)', canvas.width-2.5*wChar, orgYY);
      g.beginPath();
      g.moveTo(orgX, orgYY);
      g.lineTo(orgX, 0);
      g.moveTo(orgX, orgYY);
      g.lineTo(canvas.width, orgYY);
      g.textAlign='right';
      g.textBaseline='middle';
      for(var i=0; i<=10; i++){
        y1=orgYY-i*escalaYY;
        g.moveTo(orgX-wChar, y1);
        g.lineTo(orgX, y1);
        g.fillText(i-10, orgX-wChar-2, y1);
        y1=orgYY-(i+0.5)*escalaYY;
        g.moveTo(orgX-wChar/2, y1);
        g.lineTo(orgX, y1);
      }
      g.stroke();
      x1=orgX+escala*x;
      if(t<tr){  //tiempo de reacción
        y1=orgYY-10*escalaYY; //origen de aceleraciones
        g.fillStyle='red'; 
        g.beginPath();
        g.arc(x1, y1, 2, 0, 2*Math.PI);
        g.fill();
        g.strokeStyle='red';
        g.beginPath();
        g.moveTo(orgX,y1);
        g.lineTo(x1,y1);
        g.stroke();
      }else{  //frenado después de reaccionar
        y1=3*wChar; //origen de aceleraciones
        g.strokeStyle='red';   
        var x2=orgX+escala*(v0*tr);
        g.beginPath();
        g.moveTo(orgX,y1);
        g.lineTo(x2,y1);
        g.stroke();
        y1=orgYY-escalaYY*(10-mu*9.8);
        g.fillStyle='blue';   
        g.beginPath();
        g.arc(x1, y1, 2, 0, 2*Math.PI);
        g.fill();
        g.strokeStyle='blue';
        g.beginPath();
        g.moveTo(x1,y1);
        g.lineTo(x2,y1);
        g.stroke();		
        g.save();
        g.setLineDash([5]);
        g.beginPath();
        g.moveTo(x1, y1);
        g.lineTo(x1, orgYY);
        g.moveTo(x1, y1);
        g.lineTo(orgX, y1);		
        g.stroke();
        g.beginPath();
        g.strokeStyle='red';
        g.moveTo(x2, orgYY-escalaYY*10);
        g.lineTo(x2, orgYY);
        g.stroke();
        g.restore();
        g.fillStyle='black';
        g.textAlign='left';
        g.textBaseline='bottom';
        g.fillText(x.toFixed(2), x1+2, orgYY-2);
        g.fillText((-mu*9.8).toFixed(2), orgX+2, y1-2);
        g.fillText((v0*tr).toFixed(2), x2+2, orgYY-2);
      }
      g.save();
      g.textBaseline='top';    
      g.font = 'bold 15px Helvetica';
      g.textAlign='right';
      g.textBaseline='top';
      g.fillStyle='black';
      g.fillText('t(s): '+t.toFixed(2), canvas.width-wChar, 2);
      g.fillText('v(m/s): '+v.toFixed(2), canvas.width-wChar, 2*wChar);  
      g.restore();
      g.lineWidth=3;
      g.strokeStyle='red';
      g.beginPath();
      g.moveTo(canvas.width-8*wChar, 5*wChar);
      g.lineTo(canvas.width-6*wChar, 5*wChar);
      g.stroke();
      g.strokeStyle='blue';
      g.beginPath();
      g.moveTo(canvas.width-8*wChar, 6.5*wChar);
      g.lineTo(canvas.width-6*wChar, 6.5*wChar);
      g.stroke();
      g.lineWidth=1;
      g.fillStyle='black';
      g.textAlign='left';
      g.textBaseline='middle';   
      g.fillText('reaction', canvas.width-5*wChar, 5*wChar);
      g.fillText('braking', canvas.width-5*wChar, 6.5*wChar);
    }
    if (begin){
      onstart(state, value, selectedValue)
    }
  }, [selectedValue, value, begin])
  
  return (<canvas ref={canvasRef} {...props}/>)
}

export default forwardRef(Car);