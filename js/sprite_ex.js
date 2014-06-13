enchant();


SpriteEX = Class.create(enchant.Sprite, {

	initialize : function(json_data)
	{
		Sprite.call(this);
		
		this._sprites = json_data;
		
		this.addEventListener(enchant.Event.ENTER_FRAME, this._rotateFrameSequence);
	},

	_rotateFrameSequence: function()
	{
		if (this._frameSequence.length !== 0)
		{
			var nextFrame = this._frameSequence.shift();
			if(nextFrame === null)
			{
				this._frameSequence = [];
			}
			else
			{
				this._sprite = this._sprites.frames[nextFrame];
				
				this._width	= this._sprite.sourceSize.w;
				this._height= this._sprite.sourceSize.h;


				this._frameSequence.push(nextFrame);
			}
		}
	},

	cvsRender: function(ctx)
	{
		var image = this._image, sprite=this._sprite, iw, ih, elem, sx, sy, sw, sh, dx, dy;

		if(!sprite){ return; }


		if(sprite.rotated)
		{
			w = sprite.frame.h;
			h = sprite.frame.w;
		}
		else
		{
			w = sprite.frame.w;
			h = sprite.frame.h;
		}

		if (image && w !== 0 && h !== 0)
		{
			iw = image.width, ih = image.height;
			if (iw < w || ih < h) {
			    ctx.fillStyle = enchant.Surface._getPattern(image);
			    ctx.fillRect(0, 0, w, h);
			}
			else
			{
				elem = image._element;
				sx = sprite.frame.x;
				sy = Math.min(sprite.frame.y, ih - h);

				// IE9 doesn't allow for negative or 0 widths/heights when drawing on the CANVAS element
				sw = Math.max(0.01, Math.min(iw - sx, w));
				sh = Math.max(0.01, Math.min(ih - sy, h));
				
				if(sprite.rotated)
				{
					ctx.translate( 0, sprite.sourceSize.h );
					ctx.rotate(-Math.PI/2);
					dx = sprite.sourceSize.h - sprite.spriteSourceSize.h - sprite.spriteSourceSize.y;
					dy = sprite.spriteSourceSize.x;
				}
				else
				{
					dx = sprite.spriteSourceSize.x;
					dy = sprite.spriteSourceSize.y;
				}
				
				ctx.drawImage(elem, sx, sy, sw, sh, dx, dy, w, h);
		    }
		}
	},

});



