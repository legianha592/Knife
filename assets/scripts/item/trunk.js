

cc.Class({
    extends: cc.Component,

    properties: {
        item: cc.Sprite,
        itemAtlas: cc.SpriteAtlas,

    },

    init(stage){
        var name = "trunk_brake("+stage+")";
        this.item.spriteFrame = this.itemAtlas.getSpriteFrame(name)
    },

    onEnable(){
        cc.log("inside trunk enable")
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
    },

    start () {

    },

    // update (dt) {},
});
