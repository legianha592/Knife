
cc.Class({
    extends: cc.Component,

    properties: {

    },

    setNamePopup: function (name) {
        this.name = name;
    },

    appear:function () {
        console.log("xxxx");
        if(this.node.getChildByName("bg_dark") === undefined ||
        this.node.getChildByName("bg_dark") === null){
            return;
        }
        this.bg_dark = this.node.getChildByName("bg_dark");
        if(this.bg_dark === undefined){
            console.log("bg_dark : thêm vào nhé!");
        }else{
            function onTouchDown (event) {
                return true;
            }
            this.node.on('touchstart', onTouchDown, this.bg_dark);
            
            this.bg_dark.runAction(cc.fadeTo(0.15,150));
        }

        this.background = this.node.getChildByName("bg_popup");
        if(this.background === undefined){
            console.log("background : thêm vào nhé!");
        }else {
            this.background.opacity = 0;
            var action = cc.fadeIn(0.75).easing(cc.easeBackOut());
            this.background.runAction(cc.sequence(action,cc.callFunc(function(){
                // TODO
            },this)));

            var exit = this.background.getChildByName("btn_close");
            if(exit === undefined){
                console.log("exit : thêm vào nhé!");
            }else{
                var self = this;
                const size = cc.view.getVisibleSize();
                //exit.y = size.height/2 + exit.height*2;
                //exit.runAction(cc.moveTo(0.25,
                 //   cc.v2(exit.x,size.height/2 - 20 - exit.height/2))).easing(cc.easeSineOut());
                function onTouchDown (touch,event) {
                    //var locationInNode = exit.convertToNodeSpace(touch.getLocation());
                    //var rect = exit.getComponent(cc.Sprite).spriteFrame.getRect();
                    //if (!rect.contains(locationInNode)){
                    //    self.disappear();
                    //    return true;
                    //}
                    return false;
                }
                this.node.on('touchstart', onTouchDown, exit);
            }
        }
    },

    disappear(){
        this.node.destroy();
    },
});
