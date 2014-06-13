enchant();


window.onload = function(){
	var game = new Core(320, 320);
	game.fps = 10;

	game.preload("chara1x.png");
	game.preload("chara1x.json");

	game.onload = function()
	{
		game.rootScene.backgroundColor  = '#7ecef4';
		
		var bearX = new SpriteEX( JSON.parse(game.assets["chara1x.json"]) );
		bearX.image = game.assets["chara1x.png"];
		bearX.x = 10;
		bearX.y = 10;
		bearX.frame = ["b1","b1","b2","b2","b3","b3"];
		game.rootScene.addChild(bearX);
		
		bearX.addEventListener(enchant.Event.ENTER_FRAME, function()
		{
			this.x += 1;
		});
	};

	game.start();
};