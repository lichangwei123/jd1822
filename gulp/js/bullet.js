//子弹
function Bullet(){
	//定义子弹属性
	this.body = create("div");
	this.init = function(){
		this.body.className = "bullet";
		new GameEngine().append( this.body );
		
		//设置子弹的初始位置
		this.left( new MyPlane().width() /2 + new MyPlane().left() - this.width()/2 );
		this.top( new MyPlane().top() - this.height() );
		return this;
	}
	this.move = function(){
		//子弹运动的定时器
		this.timer = setInterval( function(){
			this.top( this.top()-8 );
			if( this.top() < - this.height() ){//边界处理  如果子弹运动出引擎可视区，就删除该子弹并停止定时器
				this.destroy();
				clearInterval( this.timer );
				return;//可以去掉
			}
			
			//在子弹的移动中  用当前移动的子弹和所有的敌机做碰撞检测
			//问题 ：如何在子弹运动的定时器中找到所有的敌机？？
			//获取所有的敌机
			var enemes = new GameEngine().enemes;
			//遍历所有的敌机  完成子弹和敌机的碰撞    for...of 遍历值
			for( var en of enemes ){
				if( pz( this.body , en.body ) ){
					//当敌机和子弹发生碰撞后 ， 子弹销毁  
					this.destroy();
					//停止当前子弹的定时器
					clearInterval( this.timer );
					//敌机受伤  
					en.hurt();
				}
			}
		}.bind(this),30 )
	}
	this.destroy = function(){//子弹销毁
		this.body.className = "bullet_die";
		setTimeout( function(){
			this.body.remove();
		}.bind(this),500 )
	}
	this.width = function(){
		//获取子弹的宽度
		return this.body.offsetWidth;
	}
	this.height = function(){
		//获取子弹的高度
		return this.body.offsetHeight;
	}
	this.left = function(val){
		//获取或设置子弹的left值
		if( val || val == 0 ){
			this.body.style.left = val + "px";
			return;
		}
		return this.body.offsetLeft;
	}
	this.top = function(val){
		//获取或设置子弹的top值
		if( val || val == 0 ){
			this.body.style.top = val + "px";
			return;
		}
		return this.body.offsetTop;
	}
}