//战斗机
function MyPlane(){
	if( !MyPlane.instance ){
		MyPlane.instance = {
			body : create("div"),
			init : function(){
				this.body.className = "my-warplain";
				//找到引擎的body   单例模式体现
				//将战斗机的div添加到引擎中
				new GameEngine().append( this.body );
				//new GameEngine().body.appendChild( this.body )
				
				//设置战斗机的初始位置
				this.body.style.bottom = 0;
				//this.body.style.left = (new GameEngine().body.offsetWidth - this.body.offsetWidth)/2+"px";
				//this.body.style.left = (new GameEngine().width() - this.width())/2+"px";
				this.left( (new GameEngine().width() - this.width())/2 );
				
				//this.fire();
				return this;
			},
			fire : function(){//飞机开火  子弹出场
				setInterval(function(){
					new Bullet().init().move();
				},new GameEngine().level)
				return this;
			},
			move : function(type){ 
				//使用策略模式 完成对参数的判断 根据参数值 设置战斗机的移动方式
				switch(type){
					case "mouse" : {//鼠标控制战斗机的移动
						//设置战斗机的left值
						new GameEngine().body.onmousemove = function(e){
							var e = e || event;
							var x = e.pageX - new GameEngine().left()-this.width()/2;
							//获取战斗机的最大的left值
							var maxL = new GameEngine().width()-this.width();
							//边界处理
							x = Math.min( maxL , Math.max( 0 , x ) );
							//设置战斗机的left值
							this.left( x );
						}.bind(this)
						break;
					}//{}无影响
					case "key" : {//键盘控制战斗机移动
						document.onkeydown = function(e){
							var e = e || event;
							var code = e.keyCode || e.which;
							switch( code ){
								case 37 : {//向左移动
									var x1 = this.left() - 5;
									x1 = Math.max( 0 , x1 );//能够取到最小值0
									this.left( x1 );
									break;
								}
								case 39 : {//向右移动
									var x2 = this.left() + 5;
									var maxL = new GameEngine().width()-this.width();
									x2 = Math.min( x2 , maxL );//能够取到最大值maxL
									this.left( x2 );
									break;
								}
							}
						}.bind(this)
						break;
					}
				}
				
			},
			width : function(){ //获取引擎的宽度
				return this.body.offsetWidth;
			},
			height : function(){ //获取引擎的高度
				return this.body.offsetHeight;
			},
			left : function(val){ //获取或设置引擎的left
				if( val || val == 0 ){//如果有值  就设置飞机的left值  
					this.body.style.left = val + "px";
					return;
				}
				return this.body.offsetLeft;
			},
			top : function(){ //获取引擎的top值
				return this.body.offsetTop;
			}
		}
	}
	
	return MyPlane.instance;
}