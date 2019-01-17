//游戏引擎
function GameEngine(){
	if( !GameEngine.instance ){
		GameEngine.instance = {
			body : $id("main"),
			oUl : $id("options"),
			enemes : new Set(),//引擎上定义一个属性 值是一个集合  用来存放所有的敌机
			level : 0,
			init : function(){ //引擎的入口，也是整个程序的入口
				//使用委托完成记录游戏等级
				this.oUl.onclick=function(e){
					var e=e||event;
					var target=e.target||e.srcElement;
					if(target.tagName=="LI"){
						this.level=target.getAttribute("level");
						this.oUl.remove();
						this.autoplay()
					}
				}.bind(this)
/*				this.oUl.addEventListener( "click" , function(e){
					var e = e || event;
					var target = e.target ||e.srcElement;
					if( target.tagName == "LI" ){
						//记录等级
						this.level = target.getAttribute("level");
						//菜单消失   
						this.oUl.remove();
						//引擎动画出场
						this.autoplay();
					}
				}.bind(this) )*/
			},
			autoplay : function(){ //引擎的动画
				//创建logo
				var logo = create("div");
				logo.className = "logo";
				this.append( logo );
				//创建动画飞机  loading
				var loading = create("div");
				loading.className = "loading";
				this.append( loading );
				
				//设置loading动画
				var index = 1;
				var timer = setInterval( function(){
					loading.style.backgroundImage = `url(images/loading${++index}.png)`;
					if( index == 3 ){
						index = 0;
					}
				},600 )
				
				//背景动画
				var count = 0;
				setInterval( function(){
					//改变引擎的背景图的位置  
					this.body.style.backgroundPositionY = ++count + "px";
				}.bind(this),50 )
				
				
				//经过3秒钟后  logo和loading消失  游戏开始 （战斗机出场）
				setTimeout( function(){
					logo.remove();
					loading.remove();
					clearInterval( timer );
					// 游戏开始
					this.gameStart();
				}.bind(this),3000 )
			},
			append : function(obj){ //向引擎的body中添加一个元素
				this.body.appendChild( obj );
			},
			gameStart : function(){
				//alert("游戏开始啦")
				//创建一个战斗机
				new MyPlane().init().fire().move("mouse");
				
				//敌机出场
				this.autoCreateEnemy();
			},
			autoCreateEnemy : function(){//自动创建敌机
				setInterval( function(){//小敌机创建
					if( Math.random() > 0.2 ){
						//将move方法的返回值存入到集合中  move方法返回了new出来的对象
						//this.enemes.add( new Enemy("small").init().move() ) ;
						var en = new Enemy("small");
						this.enemes.add( en );
						en.init();
						en.move();
					}
				}.bind(this),800 )
				
				setInterval( function(){//中型敌机创建
					if( Math.random() > 0.5 ){
						this.enemes.add( new Enemy("middle").init().move() ) ;
					}
				}.bind(this),1500 )
				
				setInterval( function(){//大敌机创建
					if( Math.random() > 0.7 ){
						this.enemes.add( new Enemy("large").init().move() ) ;
					}
				}.bind(this),5000 )
			},
			width : function(){ //获取引擎的宽度
				return this.body.offsetWidth;
			},
			height : function(){ //获取引擎的高度
				return this.body.offsetHeight;
			},
			left : function(){ //获取引擎的left
				return this.body.offsetLeft;
			},
			top : function(){ //获取引擎的top值
				return this.body.offsetTop;
			}
		}
	}
	
	return GameEngine.instance;
}