let _list = new Array();

class Rocket   //Easter Egg
{
    static get list() { return _list; }
    static set list(value) { _list = value; }

    constructor(x, y)
    {
        this.sprite = new PIXI.Sprite(PIXI.loader.resources["pngs/rocket.png"].texture);

        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.rotation = -Math.PI / 2 ;
        this.sprite.position.set(x, y-20);
        this.sprite.scale.set(0.5, 0.5);

        this.speed = 10;
        Rocket.list.push(this);

        stage.addChild(this.sprite);
    }

    update()
    {
        this.sprite.position.y -= this.speed;

        if (this.sprite.position.y < renderer.y * 1.1) {
            this.sprite.destroy();
            Rocket.list.splice(Rocket.list.indexOf(this), 1);
        }
    }
}
