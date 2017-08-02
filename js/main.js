///<reference path='lib/phaser.comments.d.ts' />

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'bum', { preload: preload, create: create, update: update, render: render });

        function preload() {
            game.load.image('bum', 'assets/bum.png');
            game.load.image('poo', 'assets/poo.png');
            game.load.audio('fart', 'assets/fart.ogg')
        }

        var fart;
        var bum;
        var poo;
      
        function create() {

            game.physics.startSystem(Phaser.Physics.ARCADE);

            game.stage.backgroundColor = '#000000';

            poo = game.add.emitter(400,300,300);
            poo.setXSpeed(0);
            poo.setYSpeed(200,300);
                        
            poo.frequency = 10;
            poo.makeParticles('poo');
            poo.gravity = 0;

            bum = game.add.sprite(400, 300, 'bum');
            bum.anchor.setTo(0.5, 0.5);

            poo.emitX = bum.x;
            poo.emitY = bum.y ;

            fart = game.add.audio('fart');
            fart.fadeOut(100);

            //  Enable Arcade Physics for the sprite
            game.physics.enable(bum, Phaser.Physics.ARCADE);

            //  Tell it we don't want physics to manage the rotation
            bum.body.allowRotation = false;

        }

        function update() {

            bum.rotation = game.physics.arcade.angleToPointer(bum) - Math.PI/2;
            var bumcorrect = bum.rotation + Math.PI / 2;
            
            if(game.input.mousePointer.isDown || game.input.pointer1.isDown ){
              
              poo.on = true;
      
              if (fart.isPlaying !== true) {fart.play()};
              poo.setYSpeed(300*Math.sin(bumcorrect) + (-50*Math.cos(bumcorrect)),500*Math.sin(bumcorrect) + (50*Math.cos(bumcorrect)));
              poo.setXSpeed(-50*Math.sin(bumcorrect) + (300*Math.cos(bumcorrect)),50*Math.sin(bumcorrect) + 500*Math.cos(bumcorrect));
            

            }
            else {
              poo.on = false;
              fart.stop();
            }



        }

        function render() {

         //   game.debug.spriteInfo(bum, 32, 32);

        }