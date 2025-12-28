namespace SpriteKind {
    export const edifici = SpriteKind.create()
    export const NPC = SpriteKind.create()
}

function obtenir_preu(nom_producte: string): number {
    if (nom_producte == "Llenya _kg_") {
        return 1
    } else if (nom_producte == "Gallines") {
        return 6
    } else if (nom_producte == "Patates _kg_") {
        return 0.75
    } else if (nom_producte == "Cabres") {
        return 5
    } else if (nom_producte == "Ous") {
        return 0.25
    } else if (nom_producte == "Cavalls") {
        return 12
    }
    
    return 0
}

let quantitat_actual = 1
let producte_actual = ""
let menu_quantitat = miniMenu.createMenu(null)
let menu1 = miniMenu.createMenu(null)
let menu_pagament = miniMenu.createMenu(null)
function accio_menu_pagament(selection: string, selectedIndex: any) {
    
    if (menu_pagament) {
        menu_pagament.close()
    }
    
    let valor_unitari_compra = obtenir_preu(producte_actual)
    let valor_unitari_pago = obtenir_preu(selection)
    let valor_total_operacio = quantitat_actual * valor_unitari_compra
    let unitats_a_pagar = valor_total_operacio / valor_unitari_pago
    if (selection != "Patates _kg_" && selection != "Llenya _kg_") {
        unitats_a_pagar = Math.round(unitats_a_pagar)
    } else {
        unitats_a_pagar = Math.round(unitats_a_pagar * 100) / 100
    }
    
    game.showLongText("Per aconseguir " + ("" + quantitat_actual) + " " + producte_actual + ", has de donar " + ("" + unitats_a_pagar) + " " + selection, DialogLayout.Bottom)
    controller.moveSprite(nena, 100, 100)
}

function obrir_selector_pagament() {
    
    let tots_els_productes = ["Llenya _kg_", "Gallines", "Patates _kg_", "Cabres", "Ous", "Cavalls"]
    let llista_opcions = []
    for (let producte of tots_els_productes) {
        if (producte != producte_actual) {
            llista_opcions.push(miniMenu.createMenuItem(producte))
        }
        
    }
    menu_pagament = miniMenu.createMenu(miniMenu.createMenuItem("Cargando..."))
    menu_pagament.setMenuItems(llista_opcions)
    menu_pagament.setTitle("Quin producte vols donar?")
    menu_pagament.setMenuStyleProperty(miniMenu.MenuStyleProperty.Width, 140)
    menu_pagament.setMenuStyleProperty(miniMenu.MenuStyleProperty.Height, 150)
    menu_pagament.x = 129
    menu_pagament.y = 180
    menu_pagament.onButtonPressed(controller.A, function on_pagament_pressed(selection: string, selectedIndex: any) {
        accio_menu_pagament(selection, selectedIndex)
    })
}

function accio_menu_quantitat(selection: any, selected_index: any) {
    
    if (selection == "+ Més") {
        quantitat_actual += 1
        menu_quantitat.setTitle("Canviant: " + producte_actual + " (" + ("" + quantitat_actual) + ")")
    } else if (selection == "- Menys") {
        if (quantitat_actual > 1) {
            quantitat_actual -= 1
            menu_quantitat.setTitle("Canviant: " + producte_actual + " (" + ("" + quantitat_actual) + ")")
        }
        
    } else if (selection == "CONFIRMAR") {
        menu_quantitat.close()
        obrir_selector_pagament()
    }
    
}

function obrir_selector_quantitat(nom_producte: string) {
    
    producte_actual = nom_producte
    quantitat_actual = 1
    menu_quantitat = miniMenu.createMenu(miniMenu.createMenuItem("+ Més"), miniMenu.createMenuItem("- Menys"), miniMenu.createMenuItem("CONFIRMAR"))
    menu_quantitat.setTitle("Canviant: " + producte_actual + " (" + ("" + quantitat_actual) + ")")
    menu_quantitat.setMenuStyleProperty(miniMenu.MenuStyleProperty.Width, 140)
    menu_quantitat.setMenuStyleProperty(miniMenu.MenuStyleProperty.Height, 130)
    menu_quantitat.x = 129
    menu_quantitat.y = 190
    menu_quantitat.onButtonPressed(controller.A, function on_button_pressed(selection: any, selectedIndex: any) {
        accio_menu_quantitat(selection, selectedIndex)
    })
}

function accio_menu_principal(selection: string, selectedIndex: any) {
    
    if (menu1) {
        menu1.close()
    }
    
    obrir_selector_quantitat(selection)
}

sprites.onOverlap(SpriteKind.Player, SpriteKind.NPC, function on_overlap(sprite: Sprite, otherSprite: Sprite) {
    
    sprite.y += 5
    controller.moveSprite(nena, 0, 0)
    menu1 = miniMenu.createMenu(miniMenu.createMenuItem("Llenya _kg_"), miniMenu.createMenuItem("Gallines"), miniMenu.createMenuItem("Patates _kg_"), miniMenu.createMenuItem("Cabres"), miniMenu.createMenuItem("Ous"), miniMenu.createMenuItem("Cavalls"))
    menu1.setTitle("Quin producte vols intercanviar?")
    menu1.setMenuStyleProperty(miniMenu.MenuStyleProperty.Width, 140)
    menu1.setMenuStyleProperty(miniMenu.MenuStyleProperty.Height, 150)
    menu1.x = 129
    menu1.y = 180
    menu1.onButtonPressed(controller.A, function on_button_pressed(selection: string, selectedIndex: any) {
        accio_menu_principal(selection, selectedIndex)
    })
})
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
let nena : Sprite = null
//  Mapa
tiles.setCurrentTilemap(tilemap`
    map
    `)
//  Sprites
let casa_intercanvi = sprites.create(assets.image`
        casa_intercanvi
        `, SpriteKind.edifici)
casa_intercanvi.setPosition(129, 130)
let venedor = sprites.create(assets.image`
    venedor-front
    `, SpriteKind.NPC)
venedor.setPosition(129, 140)
nena = sprites.create(assets.image`
    nena-front
    `, SpriteKind.Player)
nena.setPosition(129, 250)
//  Ajusts de càmara i moviment de la nena
scene.cameraFollowSprite(nena)
controller.moveSprite(nena, 100, 100)
