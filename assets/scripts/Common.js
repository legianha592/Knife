var Common = {

    showPopup(name_popup, callback){
        var scene = cc.director.getScene();
        if (cc.isValid(scene) && !cc.isValid(scene.getChildByName(name_popup))){
            cc.loader.loadRes("prefabs/", function(err, popup){
                if (!err){
                    var popupItem = cc.instantiate(popup);
                    if (cc.isValid(popupItem) && cc.isValid(scene)){
                        popupItem.x = cc.director.getScene().width/2;
                        popupItem.y = cc.director.getScene().height/2;
                        if (callback){
                            var popupComp = popupItem.getComponent(name_popup);
                            popupComp.setNamePopup(name_popup);
                            callback(popupComp);
                            scene.addChild(popup, 1000)
                        }
                    }
                }
                else{
                    cc.log("err = ", err)
                }
            })
        }
    }
}
