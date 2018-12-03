<!-- 初始化变量 -->
var bombNum = 10,
	flagCount = 0;
var ul = document.getElementsByTagName("ul")[0];
var li = ul.getElementsByTagName("li");
var num = document.getElementsByClassName("num")[0];
var start = document.getElementsByClassName("startBtn")[0];
var bombOver = document.getElementsByClassName("bombOver")[0];
var gameArea = document.getElementsByClassName("gameArea")[0];
var alertBox = document.getElementsByClassName("alertBox")[0];
var clear = document.getElementsByClassName("clear")[0];
var bombArr = document.getElementsByClassName("bomb");
var alertImg = document.getElementsByClassName("alertImg")[0];
var cellLC02 = document.getElementsByClassName("cellLC02");

<!-- 初始化雷盘 -->
start.onclick = function() {
	if(li.length == 0) {
		init();
		bombOver.style.display = "block";
		gameArea.style.display = "block";
	}else {
		return;
	}
}

clear.onclick = function() {
	location.reload();
};

<!-- 监听ul区域的所有点击事件 -->
ul.onmousedown = function(e) {
	<!--获取事件对象-->
	var event = e || window.event;
	<!--获取事件源对象-->
	var dom = event.target || event.srcElement;
	<!-- 监听、判断和处理点击事件 -->
	if(event.button == 0) {
		leftClick(dom);
	}else if(event.button == 2) {
		rightClick(dom);
	}else {
		alert("不支持滚轮操作！")
	}
};

<!-- 鼠标左键点击事件 -->
function leftClick(dom) {
	if(cellLC02.length == 89) {
		setTimeout(function() {
			alertBox.style.display = "block";
			alertImg.style.backgroundImage = "url('http://img2.imgtn.bdimg.com/it/u=301986227,433951347&fm=26&gp=0.jpg')";
		}, 200);
		return;
	}else {
		if(dom.classList.contains('cellLC02') || dom.classList.contains("cellRC")) {
			return;
		}else {
			if(dom.classList.contains("bomb")) {
				for(var k = 0; k < bombArr.length; k++) {
					bombArr[k].classList.add("cellLC01");
				}
				setTimeout(function() {
					alertBox.style.display = "block";
					alertImg.style.backgroundImage = "url('https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=11523348,149876355&fm=26&gp=0.jpg')";
				}, 500);
			}else {
				var n = 0;
				var posArr = dom && dom.id.split("-");
				var posX = posArr && Number(posArr[0]);
				var posY = posArr && Number(posArr[1]);
				for(var i = posX-1; i <= posX+1; i++) {
					for(var j = posY-1; j <= posY+1; j++) {
						var cellId = document.getElementById(i + "-" + j);
						if(cellId && cellId.classList.contains('bomb')) {
							n++;
						}
					}
				}
				dom.className = "cellLC02";
				dom.innerHTML = n;
				if(n == 0) {
					for(var i = posX-1; i <= posX+1; i++) {
						for(var j = posY-1; j <= posY+1; j++) {
							var aroundId = document.getElementById(i + "-" + j);
							if(aroundId && aroundId.length != 0) {
								if(aroundId.classList.contains('cellRC')) {
									continue;
								}
								if(!aroundId.classList.contains('checked')) {
									aroundId.classList.add('checked');
									leftClick(aroundId);
								}
							}
						}
					}
				}
			}
		}			
	}
}

<!-- 鼠标右键点击事件 -->
function rightClick(dom) {
	if(dom.innerText) {
		return;
	}else if(!dom.classList.contains("cellRC")) {
		dom.classList.add("cellRC");
		flagCount++;
		if(flagCount > 10 && bombNum != 0) {
			for(var k = 0; k < bombArr.length; k++) {
				bombArr[k].classList.add("cellLC01");
			}
			setTimeout(function() {
				alertBox.style.display = "block";
				alertImg.style.backgroundImage = "url('https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=11523348,149876355&fm=26&gp=0.jpg')";
			}, 500);
		}else {
			if(dom.classList.contains("bomb")) {
				bombNum --;
				num.innerHTML = bombNum;
			}
			if(bombNum == 0) {
				setTimeout(function() {
					alertBox.style.display = "block";
					alertImg.style.backgroundImage = "url('http://img2.imgtn.bdimg.com/it/u=301986227,433951347&fm=26&gp=0.jpg')";
				}, 500);
			}
		}
	}else {
		flagCount--;
		dom.classList.remove("cellRC");
		if(dom.classList.contains("bomb")) {
			bombNum ++;
			num.innerHTML = bombNum;
		}
	console.log(bombNum);
	}
}

<!-- 随机布置炸弹的位置 -->
function bombPos() {
	var count = 0;
	var arr = [];
	while(true) {
		var i = Math.floor(Math.random() * 100);
		if(arr.indexOf(i) == -1) {
			arr.push(i);
			li[i].classList.add('bomb');
			count += 1;
			if(count == 10) {
				return arr;
			}
		}else {
			continue;
		}
	}
}

<!-- 生成雷盘并随机布置炸弹位置 -->
function init() {
	for(var i = 0; i < 10; i++) {
		for(var j = 0; j < 10; j++) {
			var li = document.createElement("li");
			li.classList.add("cell");
			li.setAttribute("id", i + "-" + j);
			ul.appendChild(li);
		}
	}
	bombPos();	
	num.innerHTML = 10;
	<!--在ul区域内，屏蔽右键默认事件-->
	ul.oncontextmenu = function() {
		return false;
	};
}







































































































