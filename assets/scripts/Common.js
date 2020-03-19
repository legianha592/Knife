var Common = {

    showPopup(name_popup, callback){
        var scene = cc.director.getScene();
        if (cc.isValid(scene) && !cc.isValid(scene.getChildByName(name_popup))){
            cc.loader.loadRes("prefabs/" + name_popup, function(err, popup){
                if (!err){
                    var popupItem = cc.instantiate(popup);
                    if (cc.isValid(popupItem) && cc.isValid(scene)){
                        popupItem.x = cc.director.getWinSize().width/2;
                        popupItem.y = cc.director.getWinSize().height/2;
                        if (callback){
                            var popupComp = popupItem.getComponent(name_popup);
                            popupComp.setNamePopup(name_popup);
                            callback(popupComp);
                            scene.addChild(popupItem, 1000)
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
