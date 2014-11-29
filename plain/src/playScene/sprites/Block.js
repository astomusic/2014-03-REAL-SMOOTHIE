
var Block = cc.Sprite.extend({
	ctor:function (resourceName) {
		this._super(resourceName);
		// Block 공통 변수 설정
		this.HP = null; // HP가 0이 되면 사라져야할 녀석
		this.type = null; // BLOCK.TYPE.PIPE || BLOCK.TYPE.FRIEND || BLOCK.TYPE.ENEMY
		this.row = -1;
		this.col = -1;
		this.connectedWith = [];
		this.visitFlag = false;
		this.fixed = false;
		
		this.setScaleX(BLOCK.SIZE.WIDTH/140);
		this.setScaleY(BLOCK.SIZE.HEIGHT/140);
		// 여기에 init()이 있으면 init()이 두 번 호출됨.
	},
	getContainerIndex: function() {
		var levelCol = SMTH.CONTAINER.BOARD._level.col;
		return parseInt(this.row*levelCol)+parseInt(this.col);
	},
	setPositionByRowCol: function(row, col) {
		this.row = row;
		this.col = col;
				
		var position = this._coordinateToPosition(this.row, this.col);
		this.setPosition(position);
	},
	moveToProperPosition: function() {
		var position = this._coordinateToPosition(this.row, this.col);
//		cc.log("x/y: "+this.x+","+this.y+" pos: "+position.x+", "+position.y);
		if (this.x == position.x && this.y == position.y) {
//			cc.log("r/c: "+this.row+","+this.col);
			return;
		}
//		cc.log("x/y: "+position.x+", "+position.y);
//		cc.log("r/c: "+this.row+","+this.col+" pos: "+position.x+", "+position.y);
		this.runAction(cc.Spawn(cc.moveTo(0.2, position)));
	},
	_coordinateToPosition: function(row, col) {
		var width = BLOCK.SIZE.WIDTH;
		var height = BLOCK.SIZE.HEIGHT;
		return cc.p(col*width + width/2 , row*height + height/2);
	},
	
	hurt: function(damage, callback) { // 파이프와 적이 파괴되는 경우를 생각해서 만든거임
		if(!this.fixed) this.HP = this.HP - damage;
		// 라우트가 자신의 파이프가 모두 공격을 완료했다는걸 파악하게 됨.
		callback();
	},

	isPipe : function() {
		return false;
	},
	isEnemy : function() {
		return false;
	},
	isFriend : function() {
		return false;
	}
});