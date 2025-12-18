namespace SpriteKind {
    export const edifici = SpriteKind.create()
}
// Amunt
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-up`,
    100,
    true
    )
})
// ANIMACIONS NENA
// Esquerra
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-left`,
    100,
    true
    )
})
// Dreta
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-right`,
    100,
    true
    )
})
// Abaix
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-down`,
    100,
    true
    )
})
let nena: Sprite = null
tiles.setCurrentTilemap(tilemap`map`)
let casa_intercanvi = sprites.create(assets.image`casa_intercanvi`, SpriteKind.edifici)
casa_intercanvi.setPosition(129, 130)
let venedor = sprites.create(assets.image`venedor-front`, SpriteKind.Player)
venedor.setPosition(129, 140)
nena = sprites.create(assets.image`nena-front`, SpriteKind.Player)
nena.setPosition(129, 250)
scene.cameraFollowSprite(nena)
controller.moveSprite(nena, 100, 100)
