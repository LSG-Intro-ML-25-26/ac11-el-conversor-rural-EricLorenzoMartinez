// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "map":
            case "map1":return tiles.createTilemap(hex`1000100009090909090909090909090909090909090d08080808080d0d08080808080d0909060a0b0a0b0b02060a0c0b0a0a020909060b0b0b0b0b02060b0c0b0a0a020909060b0b0b0c0c02060c0c0b0c0c020909060b0c0c0c0a02060c0b0b0c0c020909060a0b0b0b030d0d050a0c0c0a020909060b0a0a0a020d0d060a0a0a0c020909060b0b0b0b020d0d060a0b0a0c020909060b0b0b0a010d0d070a0b0a0c020909060b0a0c0c0c02060c0c0b0a0c020909060a0c0c0c0c02060a0c0b0c0c020909060b0a0a0a0a02060c0a0c0a0a020909060b0b0b0c0c02060c0c0c0a0a0209090d04040404040d0d04040404040d09090909090909090d0d09090909090909`, img`
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 . . . . . . . . . . . . . . 2 
2 . . . . . . . . . . . . . . 2 
2 . . . . . . . . . . . . . . 2 
2 . . . . . . . . . . . . . . 2 
2 . . . . . . . . . . . . . . 2 
2 . . . . . . . . . . . . . . 2 
2 . . . . . . 2 2 . . . . . . 2 
2 . . . . . . 2 2 . . . . . . 2 
2 . . . . . . . . . . . . . . 2 
2 . . . . . . . . . . . . . . 2 
2 . . . . . . . . . . . . . . 2 
2 . . . . . . . . . . . . . . 2 
2 . . . . . . . . . . . . . . 2 
2 . . . . . . . . . . . . . . 2 
2 2 2 2 2 2 2 . . 2 2 2 2 2 2 2 
`, [myTiles.transparency16,sprites.castle.tilePath7,sprites.castle.tilePath4,sprites.castle.tilePath1,sprites.castle.tilePath2,sprites.castle.tilePath3,sprites.castle.tilePath6,sprites.castle.tilePath9,sprites.castle.tilePath8,sprites.builtin.forestTiles0,sprites.castle.tileDarkGrass2,sprites.castle.tileDarkGrass3,sprites.castle.tileDarkGrass1,sprites.castle.tilePath5], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
