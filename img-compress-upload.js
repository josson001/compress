/*
* @Author: ww
* @Date:   2018-04-24 13:59:42
* @Last Modified by:   ww
* @Last Modified time: 2018-04-27 10:48:28
*/
function  pictureCompression(obj){
	this.el=obj.imageCompress;
	this.maxWidth=obj.maxWidth;
	this.maxHeight=obj.maxHeight;
	this.allowCompressRate=obj.allowCompressRate;
	this.eleFile=this.el.querySelector(".file");
	this.preview =this.el.querySelector(".preview");
	this.upLoad = this.el.querySelector(".up-load");
	this.uploading=obj.uploading;
	// 选择的文件对象
	this.file = null;
	this.fileSize=null;
	// 图片原始尺寸
	this.originWidth = null;
    this.originHeight = null;
  // 目标尺寸
    this.targetWidth = null;
    this.targetHeight = null;
    this.compressRate = null;
    this.reader = new FileReader();
    this.newUrl = null;
    this.readerNum=0;
    this.compressArr=[];
    this.init();
};
pictureCompression.prototype={
	constructor:pictureCompression,
	init:function(){
		this.imgCompressChange();
	},
	//计算图片压缩比
	getCompressRate:function(allowCompressRate){ //计算压缩比率，size单位为KB
        var compressRate = 1;
        if(allowCompressRate === 3){
             compressRate = 0.5;
        } else if(allowCompressRate === 2){
             compressRate = 0.7;
        } else if(allowCompressRate === 1){
             compressRate = 0.92;
        } 
        return compressRate;
    },
    readerOnload:function(compressArr,that){
    	this.reader.readAsDataURL(compressArr[that.readerNum]);
    	this.reader.onload=function(e){
    		var img = new Image();
    		 img.src = e.target.result;
    		  that.imgCompressLoad(img);
    		  
    		  that.readerNum++;
    		  if(that.readerNum<compressArr.length){
    		  	that.readerOnload(compressArr,that)
    		}
    	}
    },
	 //input框change
	imgCompressChange:function(){
	 	var that=this;
	 	this.eleFile.addEventListener('change', function(event) {
            that.preview.innerHTML = "" ;
           	that.compressArr=[];
           	that.readerNum=0;
            console.log(event.target.files);
            that.file = event.target.files;
            that.readerOnload(that.file,that)
        }) 
	 },
	  // base64地址图片加载完毕后
	imgCompressLoad:function(img){
	    var that = this; 
	    var file = null;
	    var fileSize=null;
	    // 缩放图片需要的canvas
	    var canvas = document.createElement('canvas');
	    var context = canvas.getContext('2d');
	    // base64地址图片加载完毕后
	    img.onload = function() {
	        // 图片原始尺寸
	        console.log("x");
	        console.log(this.width);
	        console.log(this.height);
	        var originWidth = this.width;
	        var originHeight = this.height;

	        // 目标尺寸
	        var targetWidth = originWidth,
	            targetHeight = originHeight;
	        if(originWidth > that.maxWidth || originHeight > that.maxHeight) {
	            if(originWidth / originHeight > that.maxWidth / that.maxHeight) {
	                // 更宽，按照宽度限定尺寸
	                targetWidth = that.maxWidth;
	                targetHeight = Math.round(that.maxWidth * (originHeight / originWidth));
	            } else {
	                targetHeight = that.maxHeight;
	                targetWidth = Math.round(that.maxHeight * (originWidth / originHeight));
	            }
	        }
	        // canvas对图片进行缩放
	        canvas.width = targetWidth;
	        canvas.height = targetHeight;
	        // 清除画布
	        context.clearRect(0, 0, targetWidth, targetHeight);
	        // 图片压缩
	        context.drawImage(img, 0, 0, targetWidth, targetHeight);
	        /*第一个参数是创建的img对象；第二个参数是左上角坐标，后面两个是画布区域宽高*/
	        //压缩后的图片base64 url
	        /*canvas.toDataURL(mimeType, qualityArgument),mimeType 默认值是'image/jpeg';
	         * qualityArgument表示导出的图片质量，只要导出为jpg和webp格式的时候此参数才有效果，默认值是0.92*/
	        var compressRate = that.getCompressRate(that.allowCompressRate);
	        var newUrl = canvas.toDataURL('image/jpeg', compressRate);//base64 格式
	        //console.log(canvas.toDataURL('image/jpeg', 0.92));
	// 　　　that.preview.style.backgroundImage +='url(' + newUrl + ')';
	        that.preview.innerHTML += "<img src = "+ newUrl +">";
	        that.compressArr.push(newUrl);
   		}
 	}
}
//maxWidth最大宽度,maxHeight，最大高度。主要作为判断标准的;
//allowCompressRate 的值 0(不压缩),1(小),2(中),3(大)
// 按照以下配置
// var imageCompress=document.getElementsByClassName("image-compress");
// var compression=new pictureCompression({
// 	imageCompress:imageCompress[0],
// 	maxWidth:750,
// 	maxHeight:750,
// 	allowCompressRate:1,
// })
//在外面操作数据，用实例对象
// upLoad.onclick=function(){
// 	console.log(compression.compressArr);
// }