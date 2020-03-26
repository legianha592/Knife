

cc.Class({
    extends: cc.Component,

    properties: {
        item: cc.Sprite,
        itemAtlas: [cc.SpriteAtlas],

    },

    init(stage){
        var name = "item_trunk("+stage+")";
        var number
        if (stage>20){
            number = 2;
        }
        else if (stage<11){
            number = 0;
        }
        else{
            number = 1;
        }
        this.item.spriteFrame = this.itemAtlas[number].getSpriteFrame(name)
    },

    onEnable(){
        cc.log("inside trunk enable")
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
    },

    start () {

    },

    // update (dt) {},
});
