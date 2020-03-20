

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

    start () {

    },

    // update (dt) {},
});
