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
    },

    onLoad(){

    },

    start () {

    },

    // moveKnife(){
    //     this._isMove = true;
    // },

    // init(callback){
    //     this.callback = callback;
    // },

    // update (dt) {
    //     // if(this._isMove){
    //     //     this.node.y += this._speed;
    //     // }
    // },

    // onEnable: function () {
    //     cc.director.getCollisionManager().enabled = true;
    //     cc.director.getCollisionManager().enabledDebugDraw = true;
    // },

    // onDisable: function () {
    //     this.disableCollision();
    // },

    // disableCollision(){
    //     cc.director.getCollisionManager().enabled = false;
    //     cc.director.getCollisionManager().enabledDebugDraw = false;
    // },

    // onCollisionEnter: function (other, self) {
    //     // console.log('on collision enter');
    //     // self.node.parent = other.node;

    //     // let world = self.world;
    //     // console.log("world : ",world);

    //     this._isMove = false;
    //     this.disableCollision();
    //     this.callback()
    // },
});
