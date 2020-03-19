var Popup = require('Popup')

cc.Class({
    extends: Popup,

    properties: {
        point: cc.Label,
        stage: cc.Label,
        newBest: cc.Node,
        restart: cc.Node,
    },


    init(point, stage, boolean, callback){
        this.callback = callback
        cc.log("point and stage = ", point, stage)
        this.point.string = point;
        this.stage.string = "STAGE "+ stage;
        if (boolean === true){
            this.newBest.active = true;
        }
        else{
            this.newBest.active = false;
        }
    },

    onClickRestart(){
        this.callback();
        this.disappear()
    },

    start () {

    },

});
