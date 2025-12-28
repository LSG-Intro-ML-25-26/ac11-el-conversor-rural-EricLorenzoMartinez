namespace SpriteKind {
    export const edifici = SpriteKind.create()
    export const NPC = SpriteKind.create()
}

//  VARIABLES GLOBALS I CONFIGURACIÓ
let quantitat_actual = 1
let producte_actual = ""
let nena : Sprite = null
//  Creació dels objectes menú buits inicials
let menu_quantitat = miniMenu.createMenu(null)
let menu1 = miniMenu.createMenu(null)
let menu_pagament = miniMenu.createMenu(null)
//  FUNCIONS D'AJUDA (LÒGICA I CÀLCULS)
function obtenir_preu(nom_producte: string): number {
    /** 
    Retorna el valor en Llenya de cada producte.
    Permet gestionar l'intercanvi bidireccional.
    
 */
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

//  SISTEMA DE MENÚS
//  Menú de pagament
function accio_menu_pagament(selection: string, selectedIndex: any) {
    /** 
    Calcula el canvi final, aplicant l'arrodoniment segons si es
    material divisible o no.
    
 */
    
    if (menu_pagament) {
        menu_pagament.close()
    }
    
    let valor_unitari_compra = obtenir_preu(producte_actual)
    let valor_unitari_pago = obtenir_preu(selection)
    let valor_total_operacio = quantitat_actual * valor_unitari_compra
    let unitats_a_pagar = valor_total_operacio / valor_unitari_pago
    if (selection != "Patates _kg_" && selection != "Llenya _kg_") {
        unitats_a_pagar = Math.round(unitats_a_pagar)
        if (unitats_a_pagar == 0) {
            unitats_a_pagar = 1
        }
        
    } else {
        unitats_a_pagar = Math.round(unitats_a_pagar * 100) / 100
    }
    
    game.showLongText("Per aconseguir " + ("" + quantitat_actual) + " " + producte_actual + ", has de donar " + ("" + unitats_a_pagar) + " " + selection, DialogLayout.Bottom)
    controller.moveSprite(nena, 100, 100)
}

function obrir_selector_pagament() {
    /** Genera el menú de pagament excloent el producte que es vol. */
    
    let tots_els_productes = ["Llenya _kg_", "Gallines", "Patates _kg_", "Cabres", "Ous", "Cavalls"]
    let llista_opcions = []
    for (let producte of tots_els_productes) {
        if (producte != producte_actual) {
            llista_opcions.push(miniMenu.createMenuItem(producte))
        }
        
    }
    menu_pagament = miniMenu.createMenu(miniMenu.createMenuItem(""))
    menu_pagament.setMenuItems(llista_opcions)
    menu_pagament.setTitle("Quin producte vols donar?")
    menu_pagament.setMenuStyleProperty(miniMenu.MenuStyleProperty.Width, 150)
    menu_pagament.setMenuStyleProperty(miniMenu.MenuStyleProperty.Height, 70)
    menu_pagament.setFlag(SpriteFlag.RelativeToCamera, true)
    menu_pagament.x = 80
    menu_pagament.y = 60
    menu_pagament.onButtonPressed(controller.A, function on_pagament_pressed(selection: string, selectedIndex: any) {
        accio_menu_pagament(selection, selectedIndex)
    })
}

//  Menú de quantitat
function accio_menu_quantitat(selection: any, selected_index: any) {
    /** Gestiona el comptador de quantitat */
    
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
    /** Obre el menú de quantitat */
    
    producte_actual = nom_producte
    quantitat_actual = 1
    menu_quantitat = miniMenu.createMenu(miniMenu.createMenuItem("+ Més"), miniMenu.createMenuItem("- Menys"), miniMenu.createMenuItem("CONFIRMAR"))
    menu_quantitat.setTitle("Canviant: " + producte_actual + " (" + ("" + quantitat_actual) + ")")
    menu_quantitat.setMenuStyleProperty(miniMenu.MenuStyleProperty.Width, 150)
    menu_quantitat.setMenuStyleProperty(miniMenu.MenuStyleProperty.Height, 70)
    menu_quantitat.setFlag(SpriteFlag.RelativeToCamera, true)
    menu_quantitat.x = 80
    menu_quantitat.y = 60
    menu_quantitat.onButtonPressed(controller.A, function on_button_pressed(selection: any, selectedIndex: any) {
        accio_menu_quantitat(selection, selectedIndex)
    })
}

//  Menú principal
function accio_menu_principal(selection: string, selectedIndex: any) {
    /** Gestiona les accions de la selecció del menú principal */
    
    if (menu1) {
        menu1.close()
    }
    
    if (selection == "SORTIR") {
        controller.moveSprite(nena, 100, 100)
    } else {
        obrir_selector_quantitat(selection)
    }
    
}

//  ESDEVENIMENTS I CONTROLS
sprites.onOverlap(SpriteKind.Player, SpriteKind.NPC, function on_overlap(sprite: Sprite, otherSprite: Sprite) {
    /** 
    Es dispara quan la nena toca el venedor.
    Atura el jugador i obre el menú principal.
    
 */
    
    sprite.y += 5
    controller.moveSprite(nena, 0, 0)
    menu1 = miniMenu.createMenu(miniMenu.createMenuItem("Llenya _kg_"), miniMenu.createMenuItem("Gallines"), miniMenu.createMenuItem("Patates _kg_"), miniMenu.createMenuItem("Cabres"), miniMenu.createMenuItem("Ous"), miniMenu.createMenuItem("Cavalls"), miniMenu.createMenuItem("SORTIR"))
    menu1.setTitle("Quin producte vols intercanviar?")
    menu1.setMenuStyleProperty(miniMenu.MenuStyleProperty.Width, 150)
    menu1.setMenuStyleProperty(miniMenu.MenuStyleProperty.Height, 100)
    menu1.setFlag(SpriteFlag.RelativeToCamera, true)
    menu1.x = 80
    menu1.y = 60
    menu1.onButtonPressed(controller.A, function on_button_pressed(selection: string, selectedIndex: any) {
        accio_menu_principal(selection, selectedIndex)
    })
})
//  Animacions de moviment
controller.up.onEvent(ControllerButtonEvent.Pressed, function on_up_pressed() {
    animation.runImageAnimation(nena, assets.animation`nena-animation-up`, 100, true)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function on_left_pressed() {
    animation.runImageAnimation(nena, assets.animation`nena-animation-left`, 100, true)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function on_right_pressed() {
    animation.runImageAnimation(nena, assets.animation`nena-animation-right`, 100, true)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function on_down_pressed() {
    animation.runImageAnimation(nena, assets.animation`nena-animation-down`, 100, true)
})
//  INICIALITZACIÓ DEL JOC
tiles.setCurrentTilemap(tilemap`map`)
let casa_intercanvi = sprites.create(assets.image`casa_intercanvi`, SpriteKind.edifici)
casa_intercanvi.setPosition(129, 130)
let venedor = sprites.create(assets.image`venedor-front`, SpriteKind.NPC)
venedor.setPosition(129, 140)
nena = sprites.create(assets.image`nena-front`, SpriteKind.Player)
nena.setPosition(129, 250)
scene.cameraFollowSprite(nena)
controller.moveSprite(nena, 100, 100)
