var result=`/* 
* 你好，我是XXX
* 只用文字作做我介绍太单调了
* 我就用代码来介绍吧
* 首先准备一些样式
*/
*{
 transition: all 1s;
}
#code{
   background:rgba(226,229,246,0.8);
   border: 3px solid #aaa;
   box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
   font-size:20px;
   position:fixed;
}

/*太靠上了我们往下挪一点*/
#code{
 padding: 16px;
 margin-top:40px;
}
 
/*我需要一点代码高亮*/
.token.selector{
    color: #690;
}
.token.property{
    color: #905;
}
.token.function{
    color: #DD4A68;
}

/*我来介绍一下自己吧*/
/*我需要一张白纸*/
#paper{
    position:fixed;
    right:0;
    width:50%;
    height:95%;
    background: rgba(226,229,246,0.8);
    box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
    display:flex;
    justify-content:center;
    align-items:center;
    padding:16px;
    margin:15px 30px 30px 30px;
}
#paper > .content{
    background:white;
    height:100%;
    width:100%;
}
/* 于是我就可以在白纸上写字了，请看右边 */
`
result2=`/*
*接下来我用marked.js把Markdown变成HTML
*/`
var result3=`
/*
*最后加点樱花
*这就是我会动的简历
*谢谢观看
*/

`
var md=`
# 自我介绍

我叫 XXX
1998 年 2 月出生
XXX 学校毕业


# 技能介绍

熟悉 JavaScript CSS

# 项目介绍

  1. XXX 轮播
  2. XXX 简历
  3. XXX 画板

# 联系方式

  - QQ xxxxxxxx
  - Email xxxxxxxx
  - 手机 xxxxxxx
`

//回调函数
writeCode('', result, () => {
    creatPaper(() => {
            writeMark(md,()=>{
                writeCode(result,result2,()=>{
                    toHtml(()=>{
                        writeCode(result+result2,result3,()=>{
                            flower()
                        })
                    })
                })
            })
        })
})






/***********************以下为封装的函数***************************** */
//添加白纸函数
function creatPaper(fn){
    var paper=document.createElement('div')
    paper.id='paper'
    var content=document.createElement('pre')
    content.className='content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn.call()
}

//把code写到#code和style标签里
function writeCode(prefix,code,fn){ 
    let domCode=document.querySelector('#code')
    let n = 0
    domCode.innerHTML=prefix||''
    let id = setInterval(() => {
        n += 1
        domCode.innerHTML = Prism.highlight(prefix+code.substring(0, n), Prism.languages.css, 'css');
        styleTag.innerHTML = prefix+code.substring(0, n)
        domCode.scrollTop=domCode.scrollHeight
        if (n >= code.length) {
            window.clearInterval(id)
            fn.call()
        }
    }, 70)
}
//白纸写字函数
function writeMark(markdown,fn){
    let domPaper=document.querySelector('#paper>.content')
    let n=0
    let id = setInterval(() => {
        n += 1
        domPaper.innerHTML = markdown.substring(0, n)
        domPaper.scrollTop=domPaper.scrollHeight
        if (n >= markdown.length) {
            window.clearInterval(id)
            fn.call()
        }
    }, 100)
}
//转化为html
function toHtml(fn){
    var div = document.createElement('div')  
    div.className = 'html markdown-body'
    div.innerHTML = marked(md)
    let markdownContainer = document.querySelector('#paper > .content')
    markdownContainer.replaceWith(div)
    fn.call()
  }
//添加樱花
function flower(fn){
    var script = document.createElement('script')  
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", "./js/yinghua.js");
    document.body.insertBefore(script, document.body.lastChild);
}