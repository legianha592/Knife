
cc.Class({
    extends: cc.Component,

    properties: {
        itemKnife: cc.Prefab,
        listKnife_position: cc.Node,
        knifePrefab: cc.Prefab,
        trunk: cc.Prefab,
        trunk_position: cc.Node,
        background: cc.Node,
        destination: cc.Node,
        knife_position: cc.Node,
        knife_2: cc.Node,
        lbl_time: cc.Label,
        lbl_stage: cc.Label,
        lbl_point: cc.Label,
        lbl_apple: cc.Label,
        _isForward: true,
        point: 0,
        distance_to_round: 550, //khoang cach tu dao den vong tron
        flying_time: 0.1, //thoi gian dao bay tu vi tri xuat phat den vong tron
    },

    calculateMinDistance(){
        var scale = 1;
        var a = Math.pow(this.item_trunk.width/2, 2);
        var b = Math.pow(this.knife_2.getChildByName("box").width/2*scale, 2);
        //khoang cach dung giua 2 tiep diem phai la 2 min_distance nhung thay xa qua nen de 3/2, do hieu ung hinh anh chuoi kiem nam kha xa tiep diem
        this.min_distance = 3/2*Math.sqrt((a*b)/(a+b));
        cc.log("min distance = ", this.min_distance)
    },

    update(dt){
        this.time += dt;
        if (this.time>=1){
            this.time = 0;
            if (Number(this.lbl_time.string)>0){
                this.lbl_time.string = Number(this.lbl_time.string)-1;
            }
            else{
                setTimeout(this.openPopupEndGame.bind(this), 300)
            }
            this.count_time_loop--;
        }
        if (this.count_time_loop == 0){
            this.count_time_loop = this.time_loop;
            this.switchTheLoop()
        }
        if (this._isForward){
            this.total_time_forward += dt;
        }
        else{
            this.total_time_backward += dt;
        }
        this.trunk_position.angle = this.speed_backward*this.total_time_backward + this.speed_forward*this.total_time_forward;
        this.destination.angle = this.speed_backward*this.total_time_backward + this.speed_forward*this.total_time_forward;
        // cc.log("time = ", this.run_time, this.speed_forward)
    },

    moveKnife(){
        this.addDestination();
        // this.knife.moveKnife();
    },

    addLife(){
        this.listKnife_position.removeAllChildren()
        this.list_life = [];
        var pos_x = 0;
        var pos_y = 0;
        for (var i=0; i<this.number_knife; i++){
            var item = cc.instantiate(this.itemKnife);
            item.x = pos_x;
            item.y = pos_y+30*i;

            this.listKnife_position.addChild(item);
            this.list_life.push(item);
        }
    },

    remainLife(){
        this.number_knife--;
        this.list_life[this.number_knife].color = new cc.color(0, 0, 0);
        if (this.number_knife === 0){
            // hieu ung hinh anh +1 dao cuoi va hien popup de xac nhan qua ban
            setTimeout(this.setupNewStage.bind(this), 300);
            this.updatePoint();
        }
        // cc.log(this.number_knife)
    },

    updatePoint(){
        this.point += Number((1000*(Number(this.lbl_time.string)/this.list_character.concept[this.index].total_time)).toFixed(0));
        this.lbl_point.string = this.point;
        this.index++;
    },

    addDestination(){
        var point = this.destination.convertToNodeSpaceAR(cc.v2(750/2+this.item_trunk.x, 1334/2+this.trunk_position.y-this.item_trunk.height/2));
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
                cc.moveBy(0.1, 0, 300),
                cc.spawn(
                    cc.moveBy(0.3, 300, -300),
                    cc.rotateBy(0.3, 500),
                ),
                cc.fadeOut(0.01),
                cc.rotateTo(0.01, 0),
                cc.moveBy(0.01, -300, 0),
                cc.fadeIn(0.01)
            ));
            
            setTimeout(this.openPopupEndGame.bind(this), 300);
        }
        else{
            //tiep tuc setup 1 con dao khac
            this.knife_2.runAction(cc.sequence(cc.moveBy(0.1, 0, 550-141-128), cc.fadeOut(0.01), cc.moveBy(0.01, 0, -(550-141-128)), cc.fadeIn(0.01)));
            this.list_point.push(point);
            this.addKnife();
            this.remainLife()
        }
        cc.log("list point = ", this.list_point)
    },

    openPopupEndGame(){
        var self = this;
        Common.showPopup('popupEndGame', function(popup){
            popup.appear();
            popup.init(self.point, self.list_character.concept[self.index].level, self.newBest, function(){
                self.setupNewStage();
            });
        })
    },

    addKnife(){
        //add dao phi
        this.knife = cc.instantiate(this.knife_2);

        var callFunction = function(){
            //var point = node.convertToNodeSpaceAR (cc.v2(x, y)) => chuyen he quy chieu tu x, y tren mat phang toa do (goc duoi trai) sang he quy chieu node, tra ve 1 object(point)
            var point = this.destination.convertToNodeSpaceAR(cc.v2(750/2+this.item_trunk.x, 1334/2+this.trunk_position.y-this.item_trunk.height/2))
            cc.log("point = ", point)     
            this.knife.x = point.x
            this.knife.y = point.y
            this.knife.angle = -this.speed_forward*this.total_time_forward-this.speed_backward*this.total_time_backward;
            this.knife.parent = this.destination

            // cc.log("destination = ", this.destination)
        }
        
        setTimeout(callFunction.bind(this), 100);

        // this.knife.node.y = -this.distance_to_round-this.item_trunk.height/2;
        this.knife_position.addChild(this.knife);    
    },

    addTrunk(){
        this.trunk_position.removeAllChildren()
        setTimeout(this.destination.removeAllChildren(), 100)
        this.item_trunk = cc.instantiate(this.trunk);
        var comp = this.item_trunk.getComponent("trunk");
        comp.init(this.list_character.concept[this.index].level);

        this.item_trunk.x = 0; 
        this.item_trunk.y = 0;
        this.trunk_position.addChild(this.item_trunk);
        // cc.log("item trunk = ", this.lbl_stage.string, this.item_trunk)
        this.addExistKnife();
    },

    addExistKnife(){
        if (this.exist_knife>0){
            var angle = 360/this.exist_knife;
            for (var i=0; i<this.exist_knife; i++){
                this.destination.angle += angle;
                var point = this.destination.convertToNodeSpaceAR(cc.v2(750/2+this.item_trunk.x, 1334/2+this.trunk_position.y-this.item_trunk.height/2));
                var existKnife = cc.instantiate(this.knife_2);
                existKnife.x = point.x;
                existKnife.y = point.y;
                existKnife.angle = -this.destination.angle;

                this.destination.addChild(existKnife);
                this.list_point.push(point);
            }
        }
    }, 

    setupNewStage(){
        // cc.log("list character = ", this.list_character)
        this.lbl_stage.string = "STAGE " + this.list_character.concept[this.index].level;
        this.backward = this.list_character.concept[this.index].backward;
        this.speed_forward = this.list_character.concept[this.index].speed_forward;
        this.speed_backward = this.list_character.concept[this.index].speed_backward;
        this.time_loop = this.list_character.concept[this.index].time_loop;
        this.time = 0;
        this.lbl_time.string = this.list_character.concept[this.index].total_time;
        this.number_knife = this.list_character.concept[this.index].number_knife;
        this.number_fruit = this.list_character.concept[this.index].number_fruit;
        this.exist_knife = this.list_character.concept[this.index].exist_knife;

        this.list_point = [];
        this.count_time_loop = -1;
        this.total_time_forward = 0;
        this.total_time_backward = 0;
        this.addTrunk();
        this.addLife();
        this.calculateMinDistance();
        this.setupBackward();
        cc.log("destination = ", this.list_point)
    },

    setupBackward(){
        if (this.backward === true){
            this.count_time_loop = this.time_loop;
            this._isForward = true;
        }
    },

    switchTheLoop(){
        if (this._isForward === true){
            this._isForward = false;
        }
        else{
            this._isForward = true;
        }
    },

    start () {
        this.run_time = 0;
        this.point = 0;
        var self = this;
        this.list_character = ""
        this.getJson(function(example){
            console.log("DONE!");
            self.list_character = example.json;
            self.index = 0;
            self.setupNewStage()
            cc.log("list jason = ", self.list_character);
        })
    },

    getJson(callback){
        var self = this;
        var url = cc.url.raw('resources/setup_level.json');
        cc.loader.load( url, function( err, res) {
            if(err === null){
                var json = JSON.stringify(res);
                var example = JSON.parse(json);
                console.log("example = ", example);
                if(callback){
                    callback(example);
                }
            }else{
                console.log("err = ", err.message);
            }
        });
    }
});
