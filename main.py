@namespace
class SpriteKind:
    edifici = SpriteKind.create()


# ANIMACIONS NENA
# Amunt
def on_up_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-up
            """),
        100,
        True)
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

# Esquerra
def on_left_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-left
            """),
        100,
        True)
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

# Dreta
def on_right_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-right
            """),
        100,
        True)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

# Abaix
def on_down_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-down
            """),
        100,
        True)
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

# Declaració sprites
nena: Sprite = None
casa_intercanvi: Sprite = None
venedor: Sprite = None

# Mapa
tiles.set_current_tilemap(tilemap("""
    map
    """))

# Sprites
casa_intercanvi = sprites.create(assets.image("""
        casa_intercanvi
        """),
    SpriteKind.edifici)
casa_intercanvi.set_position(129, 130)
venedor = sprites.create(assets.image("""
        venedor-front
        """),
    SpriteKind.player)
venedor.set_position(129, 140)
nena = sprites.create(assets.image("""
    nena-front
    """), SpriteKind.player)
nena.set_position(129, 250)
# Ajusts de càmara i moviment de la nena
scene.camera_follow_sprite(nena)
controller.move_sprite(nena, 100, 100)