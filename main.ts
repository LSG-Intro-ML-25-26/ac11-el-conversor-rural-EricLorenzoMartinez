namespace SpriteKind {
    export const edifici = SpriteKind.create()
}

//  ANIMACIONS NENA
//  Amunt
controller.up.onEvent(ControllerButtonEvent.Pressed, function on_up_pressed() {
    animation.runImageAnimation(nena, assets.animation`
            nena-animation-up
            `, 100, true)
})
//  Esquerra
controller.left.onEvent(ControllerButtonEvent.Pressed, function on_left_pressed() {
    animation.runImageAnimation(nena, assets.animation`
            nena-animation-left
            `, 100, true)
})
//  Dreta
controller.right.onEvent(ControllerButtonEvent.Pressed, function on_right_pressed() {
    animation.runImageAnimation(nena, assets.animation`
            nena-animation-right
            `, 100, true)
})
//  Abaix
controller.down.onEvent(ControllerButtonEvent.Pressed, function on_down_pressed() {
    animation.runImageAnimation(nena, assets.animation`
            nena-animation-down
            `, 100, true)
})
//  Declaració sprites
let nena : Sprite = null
let casa_intercanvi : Sprite = null
let venedor : Sprite = null
//  Mapa
tiles.setCurrentTilemap(tilemap`
    map
    `)
//  Sprites
casa_intercanvi = sprites.create(assets.image`
        casa_intercanvi
        `, SpriteKind.edifici)
casa_intercanvi.setPosition(129, 130)
venedor = sprites.create(assets.image`
        venedor-front
        `, SpriteKind.Player)
venedor.setPosition(129, 140)
nena = sprites.create(assets.image`
    nena-front
    `, SpriteKind.Player)
nena.setPosition(129, 250)
//  Ajusts de càmara i moviment de la nena
scene.cameraFollowSprite(nena)
controller.moveSprite(nena, 100, 100)
