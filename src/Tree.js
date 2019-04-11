class Tree
{
    constructor()
    {
        this.container = new PIXI.Container();
        this.lane = new PIXI.Graphics();
        this.lane.beginFill(0x47e554);
        this.lane.drawRect(0, 0, renderer.width, renderer.height/10);
        this.lane.endFill();

        this.container.addChild(this.lane);
        this.type = "tree";
        this.items = [];
        (function()
            {
                let numberOfTrees = getRandomInt(3, 6);
                for (let i = 0; i <= numberOfTrees; i++)
                {
                    this.tree = new PIXI.Sprite(PIXI.loader.resources["pngs/tree.png"].texture);
                    this.tree.x = getRandomInt(20, renderer.width-20);
                    this.tree.y = 5;
                    this.tree.width = 30;
                    this.tree.height = 30;
                    if(!this.items.some((item) => {return  hitTestRectangle(this.tree, item)}))  // check tree positions doubling
                    {
                        this.items.push(this.tree);
                        this.container.addChild(this.tree);
                    }
                }
        }.bind(this))();

    }
    update()
    {
    }

}
