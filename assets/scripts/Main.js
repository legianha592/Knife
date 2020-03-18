
cc.Class({
    extends: cc.Component,

    properties: {
        itemKnife: cc.Prefab,
        listKnife: cc.Node,
        knifePrefab: cc.Prefab,
        round: cc.Node,
        destination: cc.Node,
        knife_2: cc.Node,
        number_knife: 10,
        time: 0,
        speed: 60, //toc do quay cua vong tron
        distance_to_round: 90, //khoang cach tu dao den vong tron
        flying_time: 0.1, //thoi gian dao bay tu vi tri xuat phat den vong tron
        current_knife: 0,
    },

    calculateMinDistance(){
        var scale = 0.5;
        var a = Math.pow(this.round.width/2, 2);
        var b = Math.pow(this.knife.node.width/2*scale, 2);
        //khoang cach dung giua 2 tiep diem phai la 2 min_distance nhung thay xa qua nen bo 2 di, do hieu ung hinh anh chuoi kiem nam kha xa tiep diem
        this.min_distance = Math.sqrt((a*b)/(a+b));
        // cc.log("min distance = ", this.min_distance)
    },

    update(dt){
        this.time += dt;
        this.round.angle = this.speed*this.time;
        this.destination.angle = this.speed*this.time;
    },

    moveKnife(){
        this.addDestination();
        // this.knife.moveKnife();
    },

    addLife(){
        var pos_x = -220;
        var pos_y = -220;
        for (var i=0; i<this.number_knife; i++){
            var item = cc.instantiate(this.itemKnife);
            item.x = pos_x;
            item.y = pos_y+25*i;

            this.node.addChild(item);
            this.list_life.push(item);
        }
    },

    remainLife(){
        this.number_knife--;
        this.list_life[this.number_knife].color = new cc.color(0, 0, 0);
    },

    addDestination(){
        var point = this.destination.convertToNodeSpaceAR(cc.v2(480+this.round.x, 320+this.round.y-this.round.height/2));
        //check xem diem den tiep theo co thoa man khong va cham hay khong
        var check = false;
        for (var i=0; i<this.list_point.length; i++){
            let distance = Math.sqrt(Math.pow(point.x-this.list_point[i].x, 2)+Math.pow(point.y-this.list_point[i].y, 2));
            cc.log("list distance ", i, " = ",  distance);
            if (distance < this.min_distance){
                check = true;
                break;
            }
        }
        if (check === true){
            //xu li cho con dao bay ra ngoai
            this.knife_2.runAction(cc.sequence(
                cc.moveBy(0.1, 0, 90),
                cc.spawn(
                    cc.moveBy(0.3, 120, -90),
                    cc.rotateBy(0.3, 500),
                ),
                cc.fadeOut(0.01),
                cc.rotateTo(0.01, 0),
                cc.moveBy(0.01, -120, 0),
                cc.fadeIn(0.01)
            ));
        }
        else{
            //tiep tuc setup 1 con dao khac
            this.knife_2.runAction(cc.sequence(cc.moveBy(0.1, 0, 90), cc.fadeOut(0.01), cc.moveBy(0.01, 0, -90), cc.fadeIn(0.01)));
            this.list_point.push(point);
            this.remainLife();
            this.addKnife(this.tag)
        }
        cc.log("list point = ", this.list_point)
    },

    addKnife(tag){
        //add dao phi
        this.knife = cc.instantiate(this.knifePrefab).getComponent("knife");
        this.knife.init(tag, () => {
            var callFunction = function(){
                //var point = node.convertToNodeSpaceAR (cc.v2(x, y)) => chuyen he quy chieu tu x, y tren mat phang toa do (goc duoi trai) sang he quy chieu node, tra ve 1 object(point)
                var point = this.destination.convertToNodeSpaceAR(cc.v2(480+this.round.x, 320+this.round.y-this.round.height/2))
                cc.log("point = ", point)     
                this.knife.node.x = point.x
                this.knife.node.y = point.y
                this.knife.node.angle = -this.speed*this.time
                this.knife.node.parent = this.destination

                // cc.log("destination = ", this.destination)
            }.bind(this);
            
            setTimeout(callFunction, 100);
        });
        this.knife.node.y = -this.distance_to_round-this.round.height/2;
        this.node.addChild(this.knife.node);    
        this.tag++;
    },

    start () {
        this.list_point = [];
        this.list_life = [];
        this.addKnife(this.tag);
        this.addLife();
        this.calculateMinDistance();
    },

});
