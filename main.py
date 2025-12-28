@namespace
class SpriteKind:
    edifici = SpriteKind.create()
    NPC = SpriteKind.create()

def obtenir_preu(nom_producte):
    if nom_producte == "Llenya _kg_":
        return 1
    elif nom_producte == "Gallines":
        return 6
    elif nom_producte == "Patates _kg_":
        return 0.75
    elif nom_producte == "Cabres":
        return 5
    elif nom_producte == "Ous":
        return 0.25
    elif nom_producte == "Cavalls":
        return 12
    return 0
quantitat_actual = 1
producte_actual = ""
menu_quantitat = miniMenu.create_menu(None)
menu1 = miniMenu.create_menu(None)
menu_pagament = miniMenu.create_menu(None)

def accio_menu_pagament(selection, selectedIndex):
    global menu_pagament, producte_actual, quantitat_actual

    if menu_pagament:
        menu_pagament.close()
    
    valor_unitari_compra = obtenir_preu(producte_actual)
    valor_unitari_pago = obtenir_preu(selection)

    valor_total_operacio = quantitat_actual * valor_unitari_compra

    unitats_a_pagar = valor_total_operacio / valor_unitari_pago

    if selection != "Patates _kg_" and selection != "Llenya _kg_":
        unitats_a_pagar = Math.round(unitats_a_pagar)
    else:
        unitats_a_pagar = Math.round(unitats_a_pagar*100) / 100

    game.show_long_text("Per aconseguir " + str(quantitat_actual) + " " + producte_actual + 
                        ", has de donar " + str(unitats_a_pagar) + " " + selection, DialogLayout.BOTTOM)

    controller.move_sprite(nena, 100, 100)

def obrir_selector_pagament():
    global menu_pagament, producte_actual

    tots_els_productes = ["Llenya _kg_", "Gallines", "Patates _kg_", "Cabres", "Ous", "Cavalls"]
    llista_opcions = []

    for producte in tots_els_productes:
        if producte != producte_actual:
            llista_opcions.append(miniMenu.create_menu_item(producte))
    
    menu_pagament = miniMenu.create_menu(miniMenu.create_menu_item("Cargando..."))

    menu_pagament.set_menu_items(llista_opcions)

    menu_pagament.set_title("Quin producte vols donar?")

    menu_pagament.set_menu_style_property(miniMenu.MenuStyleProperty.WIDTH, 140)
    menu_pagament.set_menu_style_property(miniMenu.MenuStyleProperty.HEIGHT, 150)
    menu_pagament.x = 129
    menu_pagament.y = 180

    def on_pagament_pressed(selection, selectedIndex):
        accio_menu_pagament(selection, selectedIndex)
    menu_pagament.on_button_pressed(controller.A, on_pagament_pressed)


def accio_menu_quantitat(selection, selected_index):
    global quantitat_actual

    if selection == "+ Més":
        quantitat_actual += 1
        menu_quantitat.set_title("Canviant: " + producte_actual + " (" + str(quantitat_actual) + ")")
    elif selection == "- Menys":
        if quantitat_actual > 1:
            quantitat_actual -= 1
            menu_quantitat.set_title("Canviant: " + producte_actual + " (" + str(quantitat_actual) + ")")
    elif selection == "CONFIRMAR":
        menu_quantitat.close()
        obrir_selector_pagament()

def obrir_selector_quantitat(nom_producte):
    global producte_actual, quantitat_actual, menu_quantitat

    producte_actual = nom_producte
    quantitat_actual = 1

    menu_quantitat = miniMenu.create_menu(
        miniMenu.create_menu_item("+ Més"),
        miniMenu.create_menu_item("- Menys"),
        miniMenu.create_menu_item("CONFIRMAR")
    )

    menu_quantitat.set_title("Canviant: " + producte_actual + " (" + str(quantitat_actual) + ")")

    menu_quantitat.set_menu_style_property(miniMenu.MenuStyleProperty.WIDTH, 140)
    menu_quantitat.set_menu_style_property(miniMenu.MenuStyleProperty.HEIGHT, 130)
    menu_quantitat.x = 129
    menu_quantitat.y = 190

    def on_button_pressed(selection, selectedIndex):
        accio_menu_quantitat(selection, selectedIndex)
    menu_quantitat.on_button_pressed(controller.A, on_button_pressed)

def accio_menu_principal(selection, selectedIndex):
    global menu1
    if menu1:   
        menu1.close()

    obrir_selector_quantitat(selection)

def on_overlap(sprite, otherSprite):
    global menu1
    sprite.y += 5

    controller.move_sprite(nena, 0, 0)

    menu1 = miniMenu.create_menu(
        miniMenu.create_menu_item("Llenya _kg_"),
        miniMenu.create_menu_item("Gallines"),
        miniMenu.create_menu_item("Patates _kg_"),
        miniMenu.create_menu_item("Cabres"),
        miniMenu.create_menu_item("Ous"),
        miniMenu.create_menu_item("Cavalls")
    )

    menu1.set_title("Quin producte vols intercanviar?")
    menu1.set_menu_style_property(miniMenu.MenuStyleProperty.WIDTH, 140)
    menu1.set_menu_style_property(miniMenu.MenuStyleProperty.HEIGHT, 150)
    menu1.x = 129
    menu1.y = 180

    def on_button_pressed(selection, selectedIndex):
        accio_menu_principal(selection, selectedIndex)
    menu1.on_button_pressed(controller.A, on_button_pressed)
sprites.on_overlap(SpriteKind.player, SpriteKind.NPC, on_overlap)






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

nena: Sprite = None
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
    """), SpriteKind.NPC)
venedor.set_position(129, 140)
nena = sprites.create(assets.image("""
    nena-front
    """), SpriteKind.player)
nena.set_position(129, 250)
# Ajusts de càmara i moviment de la nena
scene.camera_follow_sprite(nena)
controller.move_sprite(nena, 100, 100)