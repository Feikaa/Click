document.getElementById("attack").innerHTML = atk
document.getElementById("attackxp").innerHTML = atkxp
document.getElementById("attackxp_diff").innerHTML = (1/4 * Math.floor(atk + (300 * (Math.pow(2, (atk) / 7))))) - atkxp_calc
document.getElementById("strength").innerHTML = str
document.getElementById("strengthxp").innerHTML = strxp
document.getElementById("strengthxp_diff").innerHTML = (1/4 * Math.floor(str + (300 * (Math.pow(2, (str) / 7))))) - strxp_calc
document.getElementById('btn').addEventListener("click", () => {
    on = !on;
    iterate();
}, {once: true})
document.getElementById("attackstyle").addEventListener("change", () => {
    changestyle();
})
updateInv();
strXP();
atkXP();
var checkbox = document.getElementById("attackstyle")

function changestyle() {
    if (checkbox.checked) {
        document.getElementById("attackstyletext").innerHTML = "Strength"
    } else {
        document.getElementById("attackstyletext").innerHTML = "Attack"
    }
}

function iterate() {
    if (on) {
        document.getElementById('btn').style.background = "green"
        document.getElementById('btn').innerHTML = "Attacking!"
        loop()
    } else {
        document.getElementById('btn').style.background = "greenyellow"
        document.getElementById('btn').innerHTML = "Attack!"
    }
}

function loop() {
    if (on) {
        atktemp = atk
        if (offhand != null) {
            if (offhand.id == "rune_def") {
                atktemp += 3
            }
        }
        strtemp = str
        if (main != null) {
            if (main.id == "rune_scim") {
                strtemp += 3
            }
            else if (main.id == "rune_hasta") {
                atktemp += 1
                strtemp += 1
            }
        }
        if (checkbox.checked) {
            const dmg = document.createElement("div");
            var chance = Math.round(Math.random() * atktemp)
            var img = document.createElement("img");
            if (chance == 0) {
                img.src = "0hitsplat.png"
            }
            else {
                var hit = Math.round(Math.random() * strtemp + 1) * 4
                if (main != null) {
                    if (main.id == "rune_claw") {
                        hit = Math.round(hit * 1.5);
                    } else if (main.id == "rune_hasta") {
                        hit = Math.round(hit / 4)
                    }
                }
                dmg.innerHTML = Math.round(hit / 4);
                img.src = "Damage_hitsplat.png"
                strxp += hit
                strxp_calc += hit
                document.getElementById("strengthxp").innerHTML = strxp
                document.getElementById("strengthxp_diff").innerHTML = (1/4 * Math.floor(str + (300 * (Math.pow(2, (str) / 7))))) - strxp_calc
                if (main != null) {
                    if (main.id == "rune_hasta") {
                        atkxp += hit
                        atkxp_calc += hit
                        document.getElementById("attackxp").innerHTML = atkxp
                        document.getElementById("attackxp_diff").innerHTML = (1/4 * Math.floor(atk + (300 * (Math.pow(2, (atk) / 7))))) - atkxp_calc
                    }
                }
            }
            var height = 130;
            var width = 800;
            var heighttext = height + 9;
            var widthtext = width + 19;
            img.width = 50
            img.height = 50
            img.style.position = 'absolute';
            img.style.top = height + 'px';
            img.style.left = width + 'px';
            if (chance != 0) {
                dmg.style.fontSize = "x-large";
                dmg.style.position = 'absolute';
                dmg.style.zIndex = 1;
                dmg.style.color = "white";
                dmg.style.top = heighttext + 'px';
                dmg.style.left = widthtext + 'px';
                dmg.style.textAlign = "center";
                document.body.appendChild(dmg);
                strXP()
                if (main != null) {
                    if (main.id == "rune_hasta") {
                        atkXP()
                    }
                }
                setTimeout(() => document.body.removeChild(dmg), 1000)
                $("#enemyhp").css("width",($("#enemyhp").width() / $("#enemyhp").offsetParent().width() * 100) - (hit/4) + "%",100);
                if ($("#enemyhp").width() / $("#enemyhp").offsetParent().width() * 100 <= 0) {
                    rollLoot();
                    $("#enemyhp").css("width","100%",100);
                }
            }

            document.body.appendChild(img);

            setTimeout(() => document.body.removeChild(img), 1000)

        } else {
            const dmg = document.createElement("div");
            var chance = Math.round(Math.random() * atktemp)
            var img = document.createElement("img");
            if (chance == 0) {
                img.src = "0hitsplat.png"
            }
            else {
                var hit = Math.round(Math.random() * strtemp + 1) * 4
                hit = 400
                if (main != null) {
                    if (main.id == "rune_claw") {
                        hit = Math.round(hit * 1.5);
                    } else if (main.id == "rune_hasta") {
                        hit = Math.round(hit / 4)
                    }
                }
                dmg.innerHTML = Math.round(hit / 4);
                img.src = "Damage_hitsplat.png"
                atkxp += hit
                atkxp_calc += hit
                document.getElementById("attackxp").innerHTML = atkxp
                document.getElementById("attackxp_diff").innerHTML = (1/4 * Math.floor(atk + (300 * (Math.pow(2, (atk) / 7))))) - atkxp_calc
                if (main != null) {
                    if (main.id == "rune_hasta") {
                        strxp += hit
                        strxp_calc += hit
                        document.getElementById("strengthxp").innerHTML = strxp
                        document.getElementById("strengthxp_diff").innerHTML = (1/4 * Math.floor(str + (300 * (Math.pow(2, (str) / 7))))) - strxp_calc
                    }
                }
            }
            var height = 130;
            var width = 800;
            var heighttext = height + 9;
            var widthtext = width + 19;
            img.width = 50
            img.height = 50
            img.style.position = 'absolute';
            img.style.top = height + 'px';
            img.style.left = width + 'px';
            if (chance != 0) {
                dmg.style.fontSize = "x-large";
                dmg.style.position = 'fixed';
                dmg.style.zIndex = 1;
                dmg.style.color = "white";
                dmg.style.top = heighttext + 'px';
                dmg.style.left = widthtext + 'px';
                dmg.style.textAlign = "center";
                document.body.appendChild(dmg);
                $("#enemyhp").css("width",($("#enemyhp").width() / $("#enemyhp").offsetParent().width() * 100) - (hit/4) + "%",100);
                atkXP()
                if (main != null) {
                    if (main.id == "rune_hasta") {
                        strXP()
                    }
                }
                setTimeout(() => document.body.removeChild(dmg), 1000)  
                if ($("#enemyhp").width() / $("#enemyhp").offsetParent().width() * 100 <= 0) {
                    rollLoot();
                    $("#enemyhp").css("width","100%",100);
                }
            }

            document.body.appendChild(img);

            setTimeout(() => document.body.removeChild(img), 1000)
        }
        if (atkxp_calc >= (1/4 * Math.floor(atk + 300 * (Math.pow(2, (atk) / 7))))) {
            atk += 1
            document.getElementById("attack").innerHTML = atk
            atkxp_calc = 0
            document.getElementById("attackxp_diff").innerHTML = (1/4 * Math.floor(atk + (300 * (Math.pow(2, (atk) / 7))))) - atkxp_calc
        }
        if (strxp_calc >= (1/4 * Math.floor(str + 300 * (Math.pow(2, (str) / 7))))) {
            str += 1
            document.getElementById("strength").innerHTML = str
            strxp_calc = 0
            document.getElementById("strengthxp_diff").innerHTML = (1/4 * Math.floor(str + (300 * (Math.pow(2, (str) / 7))))) - strxp_calc
        }
        save()
        setTimeout(loop, 1200)
    }
}

function flicker(){
    $("#xp-increase-fx-flicker").css("opacity", "1");
    $("#xp-increase-fx-flicker").animate({"opacity":Math.random()}, 100, flicker);
  }
  
  $(document).ready(function(){
    flicker();
  });
  
  function strXP(){
    $("#xp-increase-fx2").css("display","inline-block");
    $("#xp-bar-fill2").css("box-shadow",/*"0px 0px 15px #06f,*/ "-5px 0px 10px #fff inset");
    setTimeout(function(){$("#xp-bar-fill2").css("-webkit-transition","all 2s ease");
    $("#xp-bar-fill2").css("width",(strxp_calc / (1/4 * Math.floor(str + 300 * (Math.pow(2, (str) / 7))))) * 100 + "%");},100);
    setTimeout(function(){$("#xp-increase-fx2").fadeOut(500);$("#xp-bar-fill2").css({"-webkit-transition":"all 0.5s ease","box-shadow":""});},100);
  }
  
  function atkXP(){
    $("#xp-increase-fx").css("display","inline-block");
    $("#xp-bar-fill").css("box-shadow",/*"0px 0px 15px #06f,*/ "-5px 0px 10px #fff inset");
    setTimeout(function(){$("#xp-bar-fill").css("-webkit-transition","all 2s ease");
    $("#xp-bar-fill").css("width",(atkxp_calc / (1/4 * Math.floor(atk + 300 * (Math.pow(2, (atk) / 7))))) * 100 + "%");},100);
    setTimeout(function(){$("#xp-increase-fx").fadeOut(500);$("#xp-bar-fill").css({"-webkit-transition":"all 0.5s ease","box-shadow":""});},100);
  }
  
  
function rollLoot() {
    if (items.length < 20) {
    var regular = Math.floor(Math.random() * 20);
    var rare = Math.floor(Math.random() * 1000);
    regular = 0

    if (regular == 0) {
        var drop = Math.floor(Math.random() * 4);
        drop = 0
        if (drop == 0 && !rune_scim_drop) {
            const alert = document.createElement('p');
            alert.innerHTML = "<p style='text-align: left;'>You got a drop: Rune Scimitar</p>"
            document.getElementById('chatbox').appendChild(alert);
            setTimeout(() => document.getElementById('chatbox').removeChild(alert), 10000)
            items.push(new Item("rune_scim"));
            updateInv();
            rune_scim_drop = true;
        }
        else if (drop == 1 && !rune_defender_drop) {
            const alert = document.createElement('p');
            alert.innerHTML = "<p style='text-align: left;'>You got a drop: Rune Defender</p>"
            document.getElementById('chatbox').appendChild(alert);
            setTimeout(() => document.getElementById('chatbox').removeChild(alert), 10000)
            const rune_def = document.createElement('div');
            const icon = document.createElement('img');
            rune_def.appendChild(icon)
            rune_def.className = "tooltip"
            rune_def.id = "rune_def"
            icon.src = "Rune_defender.png";
            icon.width = 50;
            icon.height = 50;
            rune_def.style.position = 'absolute';
            rune_def.style.top = 0 + (60 * Math.floor((items.length / 5))) + 'px';
            rune_def.style.left = 0 + (60 * (items.length % 5)) + 'px';    
            rune_def.addEventListener('click', function handleClick(event) {
                if (offhand != rune_def) {
                    unequipOff();
                    equipOff(rune_def);
                    if (main != null && main.id == "rune_claw") {
                        unequipMain();
                    }
                    updateInv();
                } else {
                    unequipOff();
                    updateInv();
                }
            })
            const hover = document.createElement("span")
            hover.id = "hover";
            hover.className = "tooltiptextnobg"
            hover.innerHTML = "Equip"
            hover.style.top = '20px'
            hover.style.left = '5px'
            rune_def.appendChild(hover)
            items.push(rune_def);
            updateInv();
            rune_defender_drop = true;
        }
        else if (drop == 2 && !rune_claw_drop) {
            const alert = document.createElement('p');
            alert.innerHTML = "<p style='text-align: left;'>You got a drop: Rune Claws</p>"
            document.getElementById('chatbox').appendChild(alert);
            setTimeout(() => document.getElementById('chatbox').removeChild(alert), 10000)
            const rune_claw = document.createElement('div');
            const icon = document.createElement('img');
            rune_claw.appendChild(icon)
            rune_claw.className = "tooltip"
            rune_claw.id = "rune_claw"
            icon.src = "Rune_claws.png";
            icon.width = 50;
            icon.height = 50;
            rune_claw.style.position = 'absolute';
            rune_claw.style.top = 0 + (60 * Math.floor((items.length / 5))) + 'px';
            rune_claw.style.left = 0 + (60 * (items.length % 5)) + 'px';    
            rune_claw.addEventListener('click', function handleClick(event) {
                if (main != rune_claw) {
                    unequipMain();
                    unequipOff();
                    equip(rune_claw);
                    updateInv();
                } else {
                    unequipMain();
                    updateInv();
                }
            })
            const hover = document.createElement("span")
            hover.id = "hover";
            hover.className = "tooltiptextnobg"
            hover.innerHTML = "Equip"
            hover.style.top = '20px'
            hover.style.left = '5px'
            rune_claw.appendChild(hover)
            items.push(rune_claw);
            updateInv();
            rune_claw_drop = true;
        }
        else if (drop == 3 && !rune_hasta_drop) {
            const alert = document.createElement('p');
            alert.innerHTML = "<p style='text-align: left;'>You got a drop: Rune Hasta</p>"
            document.getElementById('chatbox').appendChild(alert);
            setTimeout(() => document.getElementById('chatbox').removeChild(alert), 10000)
            const rune_hasta = document.createElement('div');
            const icon = document.createElement('img');
            rune_hasta.appendChild(icon)
            rune_hasta.className = "tooltip"
            rune_hasta.id = "rune_hasta"
            icon.src = "Rune_hasta.png";
            icon.width = 50;
            icon.height = 50;
            rune_hasta.style.position = 'absolute';
            rune_hasta.style.top = 0 + (60 * Math.floor((items.length / 5))) + 'px';
            rune_hasta.style.left = 0 + (60 * (items.length % 5)) + 'px';    
            rune_hasta.addEventListener('click', function handleClick(event) {
                if (main != rune_hasta) {
                    unequipMain();
                    equip(rune_hasta);
                    updateInv();
                } else {
                    unequipMain();
                    updateInv();
                }
            })
            const hover = document.createElement("span")
            hover.id = "hover";
            hover.className = "tooltiptextnobg"
            hover.innerHTML = "Equip"
            hover.style.top = '20px'
            hover.style.left = '5px'
            rune_hasta.appendChild(hover)
            items.push(rune_hasta);
            updateInv();
            rune_hasta_drop = true;
        }
    }
}
}

function updateInv() {
    document.getElementById('inventory').innerHTML = "";
    for (let i = 0; i < items.length; i++) {
        items[i].item.style.top = 0 + (60 * Math.floor((i + 1) / 5)) + 'px';
        items[i].item.style.left = 0 + (60 * (i % 5)) + 'px';    
        document.getElementById('inventory').appendChild(items[i].item);
        items[i].hover.innerHTML = "Equip"
        save()
    }
}

function unequipMain() {
    if (main != null) {
        items.push(main);
        main = null;
    }
}

function unequipOff() {
    if (offhand != null) {
        items.push(offhand);
        offhand = null;
    }
}

function equip(item) {
    main = item 
    items.splice(items.indexOf(item), 1)
    document.body.appendChild(item.item)
    item.hover.innerHTML = "Unequip"
    item.item.style.top = '0px';
    item.item.style.left = '0px';
}

function equipOff(item) {
    offhand = item
    items.splice(items.indexOf(item), 1)
    document.body.appendChild(item)
    item.childNodes[1].innerHTML = "Unequip"
    item.style.top = '0px';
    item.style.left = '60px';
}

function save() {
    var inv = []
    for (let i = 0; i < items.length; i++) {
        inv.push(items[i].item.id)
    }
    localStorage.setItem('inv', JSON.stringify(inv))
    localStorage.setItem('str', JSON.stringify(str))
    localStorage.setItem('strxp', JSON.stringify(strxp))
    localStorage.setItem('strxp_calc', JSON.stringify(strxp_calc))
    localStorage.setItem('atk', JSON.stringify(atk))
    localStorage.setItem('atkxp', JSON.stringify(atkxp))
    localStorage.setItem('atkxp_calc', JSON.stringify(atkxp_calc))
    localStorage.setItem('rune_drops', JSON.stringify([rune_scim_drop, rune_defender_drop, rune_claw_drop, rune_hasta_drop]))
    localStorage.setItem('equipped', JSON.stringify([main, offhand]))
}