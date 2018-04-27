/*
* @Author: ww
* @Date:   2018-04-24 14:22:14
* @Last Modified by:   ww
* @Last Modified time: 2018-04-27 11:10:36
*/
var imageCompress=document.getElementsByClassName("image-compress");
var compression=new pictureCompression({
	imageCompress:imageCompress[0],
	maxWidth:800,
	maxHeight:800,
	allowCompressRate:1,
})
//在外面操作数据，用实例对象
upLoad.onclick=function(){
	console.log(compression.compressArr[0]);
}
