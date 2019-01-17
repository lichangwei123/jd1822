//敌机
function Enemy(type){
	this.type = type;//确定敌机的类型 
	this.body = create("div");
	this.init = function(){
		switch( this.type ){//判断敌机类型
			case "small":{
				this.speed = 7;//速度
				this.hp = 1;//血值
				this.imgs = ["plain1_die1.png","plain1_die2.png","plain1_die3.png"];//存放小敌机销毁图片
				this.body.className = "enemy-small";//修饰敌机样式
				new GameEngine().append( this.body );//将敌机添加到引擎中
				//设置敌机的初始位置
				this.left( rand( 0,new GameEngine().width()-this.width() ) );//敌机left值随机
				this.top(-this.height());
				break;
			}
			case "middle":{
				this.imgs = ["plain2_die1.png","plain2_die2.png","plain2_die3.png","plain2_die4.png"];//存放中敌机销毁图片
				this.speed = 5;//速度
				this.hp = 3;//血值
				this.body.className = "enemy-middle";
				new GameEngine().append( this.body );
				//设置敌机的初始位置
				this.left( rand( 0,new GameEngine().width()-this.width() ) );
				this.top(-this.height());
				break;
			}
			case "large":{
				this.imgs = ["plain3_die1.png","plain3_die2.png","plain3_die3.png","plain3_die4.png","plain3_die5.png","plain3_die6.png"];//存放大敌机销毁图片
				this.speed = 2;//速度
				this.hp = 6;//血值
				this.body.className = "enemy-large";
				new GameEngine().append( this.body );
				//设置敌机的初始位置
				this.left( rand( 0,new GameEngine().width()-this.width() ) );
				this.top(-this.height());
				break;
			}
		}
		return this;
	}
	this.move = function(){
		this.timer = setInterval( function(){
			//this.body.style.top = this.body.offsetTop + this.speed + "px";
			this.top( this.top() + this.speed );
			if( this.top() > new GameEngine().height() ){//边界处理
				this.destroy();//敌机销毁
				clearInterval( this.timer );
			}
		}.bind(this),30 )
		
		return this;
	}
	this.destroy = function(){//敌机销毁
		//当敌机销毁时 不再做和子弹的碰撞检测  将当前销毁的敌机从集合中删除
		new GameEngine().enemes.delete( this );
		
		//当敌机销毁后  定时敌机运动的定时器 
		clearInterval( this.timer );
		//经过一段时间的变化  可以让敌机销毁
		//变化过程就是敌机销毁过程   ：   改变敌机的图片
		var timer = setInterval( function(){
			//控制敌机销毁时  爆炸图片的变化
			if( this.imgs.length == 0 ){//当数组的长度变为0时  停止变化的定时器  并将敌机删除
				clearInterval( timer );
				this.body.remove()
			}
			
			//shift()  删除数组中的头部元素 并返回该元素  改变原数组
			this.body.style.backgroundImage = `url(images/${ this.imgs.shift() })`;
		}.bind(this) , 500 )
	}
	this.hurt = function(){//敌机受伤
		/*--this.hp 
		if( this.hp == 0 ){
			this.destroy();
		}*/
		--this.hp == 0 ? this.destroy() :"";
	}
	this.width = function(){
		//获取敌机的宽度
		return this.body.offsetWidth;
	}
	this.height = function(){
		//获取敌机的高度
		return this.body.offsetHeight;
	}
	this.left = function(val){
		//获取或设置敌机的left值
		if( val || val == 0 ){
			this.body.style.left = val + "px";
			return;
		}
		return this.body.offsetLeft;
	}
	this.top = function(val){
		//获取或设置敌机的top值
		if( val || val == 0 ){
			this.body.style.top = val + "px";
			return;
		}
		return this.body.offsetTop;
	}
}