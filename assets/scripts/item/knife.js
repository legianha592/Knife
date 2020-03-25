// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        _isMove : false,
        speed: 100,
    },

    onLoad(){

    },

    start () {

    },

    moveKnife(){
        // this.onEnable();
        this._isMove = true;
    },

    init(callback){
        // this.onEnable();
        this.callback = callback;
    },

    update (dt) {
        if(this._isMove){
            this.node.y += this.speed;
        }
    },

    onEnable: function () {
        cc.log("inside enable")
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
    },

    onDisable: function () {
        this.disableCollision();
    },

    disableCollision(){
        cc.log("inside disable")
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    },

    onCollisionEnter: function (other, self) {
        console.log('on collision enter');
        // self.node.parent = other.node;

        self.tag = 10;
        var boolean = true;
        if (self.tag == other.tag){
            boolean = false;
        }

        cc.log("tag = ", other.tag, self.tag)
        // let world = self.world;
        // console.log("world : ",world);

        this._isMove = false;

        this.disableCollision();
        this.callback(boolean);
   
    },
});
