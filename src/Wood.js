
class Wood
{
    constructor()
    {
        this.container = new PIXI.Container();   // creating container for lane
        this.lane = new PIXI.Graphics();
        this.lane.beginFill(0x2d72c6);   // this lane color blue
        this.lane.drawRect(0, 0, renderer.width, renderer.height/10);  //draw recnangle
        this.lane.endFill();

        this.container.addChild(this.lane);
        this.container.type = "wood";

        this.items = [];
        this.direction = Math.random() < 0.5 ? -1 : 1;

        window.setInterval(function()   
        {
            setTimeout(() => 
            {
                this.wood = new PIXI.Sprite(PIXI.loader.resources["pngs/wood.png"].texture);
                this.wood.width = 120;
                this.wood.height = 40;

                if(this.direction > 0)
                {
                    this.wood.position.set(this.container.width, 0);
                } else {
                    this.wood.position.set(-renderer.width * 0.3, 0);
                }
    
                this.container.addChild(this.wood);
                this.items.push(this.wood);
            }, getRandomInt(1, 3) * 1000);
        }.bind(this), getRandomInt(3000, 6000));
    }

    update()
    {
        this.items.forEach(function(element, index, array) {
            element.position.x -= 0.9 * this.direction;
            if (this.direction > 0)
            {
                if (element.position.x < -renderer.width * 0.3) {
                    element.destroy();
                    array.splice(0, 1);
                }
            }else 
            {
                if (element.position.x > renderer.width * 1.3) {
                    element.destroy();
                    array.splice(0, 1);
                }
            }
            
        }.bind(this));
    }
}

