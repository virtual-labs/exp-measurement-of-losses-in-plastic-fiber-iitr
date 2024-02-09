
var canvas, ctx;
var flag;
var axes = {};
var vmaxs;  //in volt
var tmaxs; // in msec  0.001; //in sec
var voltperdiv,timeperdiv;

//------------------------------------------------Oscilloscope Power On/Off function--------------------------------------------------------//
function mainswt() {
    var bttn = document.getElementById('onff').value;
    if (bttn == "Power:Off") {

        document.getElementById("onff").value = "Power:On";
		document.getElementById("onff").style.color="white";
		document.getElementById("onff").style.backgroundColor="green";
        

        document.getElementById("chhn1").disabled = true;
        document.getElementById("chhn2").disabled = true;
        document.getElementById("dual").disabled = true;
        document.getElementById("grnd").disabled = true;
        
        document.getElementById("sinecrv").disabled = false;
		document.getElementById("add").disabled = false;
        document.getElementById("rectifiedop").disabled = true;
		drawAxis();
        drawGrid(ctx);
    }
    else {
        document.getElementById("onff").value = "Power:Off";
		document.getElementById("onff").style.color="white";
		document.getElementById("onff").style.backgroundColor="red";
		ctx.clearRect(0, 0, canvas.width, canvas.height);
        document.getElementById("sinecrv").disabled = true;
        document.getElementById("rectifiedop").disabled = true;
		if(i>2) for(var t=3;t<i;t++) document.getElementById(t).remove();
		i=3;l1=[];l2=[];l3=[];flag=0;
		count=1;
        document.getElementById("resistor").disabled=true;
        document.getElementById("chhn1").disabled = true;
        document.getElementById("chhn2").disabled = true;
        document.getElementById("dual").disabled = true;
        document.getElementById("grnd").disabled = true;

        

    }
}
//------------------------------------------------Amp1perdiv(volt/div)--------------------------------------------------------//
function amp1pdiv()
{
    voltperdiv = document.getElementById("amp-knob1").value;
  vmaxs = parseFloat(voltperdiv)*4;//volt 

    if (flag == 1) {
        drawsine();
    }
     if (flag == 2) {
        drawhlfrectifier();
    }

   if(flag==3){
        bthdhlfrc();
    }
    if(flag==4){
       grndhlfrc();
    }
}
//------------------------------------------------timeperdiv(ms/div)--------------------------------------------------------//
function timepdiv() {
    timeperdiv = document.getElementById("fq-knob").value ;
	tmaxs =parseFloat(timeperdiv)*10*Math.pow(10,-3); //1sec

   if (flag == 1) {
        drawsine();
    }
    if (flag == 2) {
        drawhlfrectifier();
    }
if(flag==3){
        bthdhlfrc();
    }
    if(flag==4){
       grndhlfrc();
    }
}
//
//alert(tmaxs);

//---------------------------------------------------------Drawing Axis----------------------------------------------------------------------------------//          
function drawAxis() {

    canvas = document.getElementById("mycanvas");
    ctx = canvas.getContext("2d");

    
   voltperdiv1 = document.getElementById("amp-knob1").value;
   vmaxs1 = parseFloat(voltperdiv1)*4;//volt 
  voltperdiv2 = document.getElementById("amp-knob2").value;
  vmaxs2 = parseFloat(voltperdiv2)*4;//volt 
     
    axes.x0 = 0.5 + 0.0 * canvas.width;//260.5
    axes.y0 = 0.5 + 0.5 * canvas.height;//175.5
    // axes.scale = 50;
    axes.xscale = (canvas.width) / ( tmaxs); 	// x pix per s
    axes.N = 201;
     if(flag==1){
          axes.yscale = (canvas.height) / (2* vmaxs1);    // y pix per V 
     }
     if(flag==2){
         axes.yscale = (canvas.height) / (2*  vmaxs2);    // y pix per V 
     }
    if(flag==3){
         axes.yscale = (canvas.height) / (2*  vmaxs1);    // y pix per V 
         axes.yscale = (canvas.height) / (2*  vmaxs2);    // y pix per V 
     }
    axes.doNegativeX = true;
    ctx.lineWidth = 0.5;
    ctx.lineWidth = ticklinewidth;
    ctx.strokeStyle = tickcolor;

    drawHorizontalAxis();
    drawVerticalAxis();
    drawVerticalAxisTicks();
    drawHorizontalAxisTicks();
}

function drawGrid(ctx) {
	
    var w = ctx.canvas.width;
    var h = ctx.canvas.height;
    ctx.beginPath();//added afterwards
    for (var x = 0; x < w; x += 24) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
    }

    for (var y = 0; y < h; y += 24) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
    }
	ctx.strokeStyle = "#a8a4a4";
   // ctx.strokeStyle = "gray";
    ctx.stroke();
}

var axismargin = 30,
        axisorigin = {x: 0, y: 0},
        axisright = 520,
        horzntickspcng = 6,
        vrtcltickspcng = 6,
        axiswidth = axisright, //520
        axisheight = axisorigin.y, //350
        numofvrtcltick = axisheight / vrtcltickspcng, //175
        numofhorzntick = axiswidth / horzntickspcng, //57.77777777777778
        tickwidth = 10,
        ticklinewidth = 0.5,
        tickcolor = 'black',
        axislinewidth = 1.0,
        axiscolor = 'gray';
//alert(numofvrtcltick);
//------------------------------------------------------Horizontal Axis----------------------------------------------------------------------------------//
function drawHorizontalAxis() {
//axes.y0=175.5,w=520
    var y0 = axes.y0-9, w = ctx.canvas.width;
    ctx.beginPath();
    ctx.strokeStyle = "rgb(128,128,128)";
    ctx.moveTo(0, y0);
    ctx.lineTo(w, y0);  // X axis
    ctx.stroke();

}
//------------------------------------------------------Vertical Axis------------------------------------------------------------------------------------//          
function drawVerticalAxis() {
//axes.x0=260.5,h=350
    var x0 = axes.x0+214, h = ctx.canvas.height;
    ctx.beginPath();
    ctx.strokeStyle = "rgb(128,128,128)";
    ctx.moveTo(x0, 0);
    ctx.lineTo(x0, h);  // Y axis
    ctx.stroke();

}
//-------------------------------------------------------Vertical Ticks--------------------------------------------------------------------------------//         
function drawVerticalAxisTicks() {
    var deltaX;//5

    for (var i = 1; i < 63; ++i) {
        ctx.beginPath();

        if (i % 5 === 0)
            deltaX = tickwidth / 3;
        else
            deltaX = tickwidth / 3;

        ctx.moveTo(axisorigin.x + 214 - deltaX,
                axisorigin.y + 1 + i * vrtcltickspcng);

        ctx.lineTo(axisorigin.x + 214 + deltaX,
                axisorigin.y + 1 + i * vrtcltickspcng);
        ctx.stroke();

    }
}
//-------------------------------------------------------Horizontal Ticks----------------------------------------------------------------------------------//     
function drawHorizontalAxisTicks() {
    var deltaY;//5

    for (var i = 1; i < numofhorzntick; ++i) {
        ctx.beginPath();

        if (i % 5 === 0)
            deltaY = tickwidth / 3;
        else
            deltaY = tickwidth / 3;

        ctx.moveTo(axisorigin.x + i * horzntickspcng,
                axisorigin.y + 350 - 183 - deltaY);

        ctx.lineTo(axisorigin.x + i * horzntickspcng,
                axisorigin.y + 350 - 183 + deltaY);

        ctx.stroke();
    }

}


function chnlo(){
drawsine();
}

function chnlt(){
 drawhlfrectifier();   
}

function bthd(){
    bthdhlfrc();
}
  
  function grnds(){
    grndhlfrc();
}
