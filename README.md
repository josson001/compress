# compress
Pure  web  image-compress middleware  
# **图片压缩上传**
### 1.引入js文件img-compress-upload.js。
### 2.按照以下html结构写html。

```
<div class="image-compress">
<!--唯一顶层元素-->
    <div class="preview">
        <!--可在此处添加img标签，用来占位-->
    </div>
    <label>
        <input class="file" type="file" accept="image/*" multiple>
        <!--下边的是支持手机拍照上传-->
        <!-- <input type="file" accept="image/*" capture="camera" > -->
        <!-- 可在此处添加标签，添加内容，类名不要修改，可以添加类名，或用这个类名添加css样式 -->
        上传图片
    </label>
</div> 
```
### 3.css

```
body{
        font-size: 100px;
        /*给rem做参考的，需要根据自己的实际写*/
    }
.preview {
        display: inline-block;
    }            
.file {
        position: absolute;
        left: -1000px;
        top:0;
        /*这里是为了隐藏input框*/
    }
.preview img{
        width: 4.99rem;
        height: 6.66rem; 
        /*可以定义图片的样式*/
    }
```
### 4.js调用

```
//maxWidth最大宽度,maxHeight，最大高度。主要作为判断标准的;
//allowCompressRate允许压缩的值 0(不压缩),1(小),2(中),3(大)
// 按照以下配置
var imageCompress=document.getElementsByClassName("image-compress");
var compression=new pictureCompression({
	imageCompress:imageCompress[0],
	maxWidth:800,
	maxHeight:800,
	allowCompressRate:1,
})
//在外面操作数据，用实例对象
upLoad.onclick=function(){
	console.log(compression.compressArr);
	//可以根据数组的长度，来判断是否已经保存了值。
}
```
