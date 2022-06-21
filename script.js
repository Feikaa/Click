document.getElementById("attack").innerHTML = atk
document.getElementById("attackxp").innerHTML = atkxp
document.getElementById("attackxp_diff").innerHTML = (1/4 * Math.floor(atk + (300 * (Math.pow(2, (atk) / 7))))) - atkxp_calc
document.getElementById("strength").innerHTML = str
document.getElementById("strengthxp").innerHTML = strxp
document.getElementById("strengthxp_diff").innerHTML = (1/4 * Math.floor(str + (300 * (Math.pow(2, (str) / 7))))) - strxp_calc
document.getElementById("kills").innerHTML = "Kills: " + kills
document.getElementById('btn').addEventListener("click", () => {
    on = !on;
    iterate();
}, {once: true})
document.getElementById("attackstyle").addEventListener("change", () => {
    changestyle();
})
var currentArea;
var atkbonus = 0;
var strbonus = 0;
setCurrentArea();
loadHands();
updateInv();
strXP();
atkXP();
var level = (atk + str) / 2
var checkbox = document.getElementById("attackstyle")
if (checkbox.checked) {
    atkbonus += 1
} else {
    strbonus += 1
}
changestyle();

function changestyle() {
    if (checkbox.checked) {
        document.getElementById("attackstyletext").innerHTML = "Strength"
        strbonus += 1;
        if (atkbonus > 0) {
            atkbonus -= 1;
        }
        document.getElementById("strbonus").innerHTML = " +" + strbonus
        if (atkbonus > 0) {
            document.getElementById("atkbonus").innerHTML = " +" + atkbonus
        } else {
            document.getElementById("atkbonus").innerHTML = ""
        }
    } else {
        document.getElementById("attackstyletext").innerHTML = "Attack"
        atkbonus += 1;
        if (strbonus > 0) {
            strbonus -= 1;
        }
        document.getElementById("atkbonus").innerHTML = " +" + atkbonus
        if (strbonus > 0) {
            document.getElementById("strbonus").innerHTML = " +" + strbonus
        } else {
            document.getElementById("strbonus").innerHTML = ""
        }
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
        atktemp = atk + atkbonus
        strtemp = str + strbonus
        if (atkbonus > 0) {
            document.getElementById("atkbonus").innerHTML = " +" + atkbonus
        }
        if (strbonus > 0) {
            document.getElementById("strbonus").innerHTML = " +" + strbonus
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
                    if (main.item.id == "rune_claw") {
                        hit = Math.round(hit * 1.2);
                    } else if (main.item.id == "rune_hasta") {
                        hit = Math.round(hit / 4)
                    }
                }
                dmg.innerHTML = Math.round(hit / 4);
                img.src = "Damage_hitsplat.png"
                if (str < 99) {
                    strxp += hit
                    strxp_calc += hit
                    document.getElementById("strengthxp").innerHTML = strxp
                    document.getElementById("strengthxp_diff").innerHTML = (1/4 * Math.floor(str + (300 * (Math.pow(2, (str) / 7))))) - strxp_calc
                }
                if (main != null) {
                    if (main.item.id == "rune_hasta" && atk < 99) {
                        atkxp += hit
                        atkxp_calc += hit
                        document.getElementById("attackxp").innerHTML = atkxp
                        document.getElementById("attackxp_diff").innerHTML = (1/4 * Math.floor(atk + (300 * (Math.pow(2, (atk) / 7))))) - atkxp_calc
                    }
                }
            }
            var height = "10%";
            var width = "65%";
            var heighttext = "10.5%";
            var widthtext = "65.9%";
            img.width = 50
            img.height = 50
            img.style.position = 'absolute';
            img.style.top = height;
            img.style.left = width;
            if (chance != 0) {
                dmg.style.fontSize = "x-large";
                dmg.style.position = 'absolute';
                dmg.style.zIndex = 1;
                dmg.style.color = "white";
                dmg.style.top = heighttext;
                dmg.style.left = widthtext;
                dmg.style.textAlign = "center";
                document.body.appendChild(dmg);
                strXP()
                if (main != null) {
                    if (main.item.id == "rune_hasta") {
                        atkXP()
                    }
                }
                setTimeout(() => document.body.removeChild(dmg), 1000)
                var total = currentArea.hp;
                var value = currentArea.currentHp;
                var newValue = value - (hit/4)
                $("#enemyhp").css("width",(newValue / total) * 100 + "%",100);
                currentArea.currentHp = newValue
                if ((newValue / total) * 100 <= 0) {
                    rollLoot();
                    $("#enemyhp").css("width","100%",100);
                    currentArea.currentHp = currentArea.hp
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
                if (main != null) {
                    if (main.item.id == "rune_claw") {
                        hit = Math.round(hit * 1.2);
                    } else if (main.item.id == "rune_hasta") {
                        hit = Math.round(hit / 4)
                    }
                }
                dmg.innerHTML = Math.round(hit / 4);
                img.src = "Damage_hitsplat.png"
                if (atk < 99) {
                    atkxp += hit
                    atkxp_calc += hit
                    document.getElementById("attackxp").innerHTML = atkxp
                    document.getElementById("attackxp_diff").innerHTML = (1/4 * Math.floor(atk + (300 * (Math.pow(2, (atk) / 7))))) - atkxp_calc
                }
                if (main != null) {
                    if (main.item.id == "rune_hasta" && str < 99) {
                        strxp += hit
                        strxp_calc += hit
                        document.getElementById("strengthxp").innerHTML = strxp
                        document.getElementById("strengthxp_diff").innerHTML = (1/4 * Math.floor(str + (300 * (Math.pow(2, (str) / 7))))) - strxp_calc
                    }
                }
            }
            var height = "10%";
            var width = "65%";
            var heighttext = "10.5%";
            var widthtext = "65.9%";
            img.width = 50
            img.height = 50
            img.style.position = 'absolute';
            img.style.top = height;
            img.style.left = width;
            if (chance != 0) {
                dmg.style.fontSize = "x-large";
                dmg.style.position = 'fixed';
                dmg.style.zIndex = 1;
                dmg.style.color = "white";
                dmg.style.top = heighttext;
                dmg.style.left = widthtext;
                dmg.style.textAlign = "center";
                document.body.appendChild(dmg);
                atkXP()
                if (main != null) {
                    if (main.item.id == "rune_hasta") {
                        strXP()
                    }
                }
                setTimeout(() => document.body.removeChild(dmg), 1000)  
                var total = currentArea.hp;
                var value = currentArea.currentHp;
                var newValue = value - (hit/4)
                $("#enemyhp").css("width",(newValue / total) * 100 + "%",100);
                currentArea.currentHp = newValue
                if ((newValue / total) * 100 <= 0) {
                    rollLoot();
                    $("#enemyhp").css("width","100%",100);
                    currentArea.currentHp = currentArea.hp
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
    kills++
    document.getElementById("kills").innerHTML = "Kills: " + kills
    if (items.length < 20) {
    var regular = Math.floor(Math.random() * 20);
    var rare = Math.floor(Math.random() * 1000);

    if (regular == 0) {
        var drop = Math.floor(Math.random() * 4);
        if (drop == 0 && !rune_scim_drop) {
            const alert = document.createElement('p');
            alert.innerHTML = "<p style='text-align: left;'>You got a drop: Rune Scimitar</p>"
            document.getElementById('chatbox').appendChild(alert);
            setTimeout(() => document.getElementById('chatbox').removeChild(alert), 10000)
            items.push(new Item("rune_scim", "main", 20));
            updateInv();
            rune_scim_drop = true;
        }
        else if (drop == 1 && !rune_defender_drop) {
            const alert = document.createElement('p');
            alert.innerHTML = "<p style='text-align: left;'>You got a drop: Rune Defender</p>"
            document.getElementById('chatbox').appendChild(alert);
            setTimeout(() => document.getElementById('chatbox').removeChild(alert), 10000)
            items.push(new Item("rune_def", "off", 20));
            updateInv();
            rune_defender_drop = true;
        }
        else if (drop == 2 && !rune_claw_drop) {
            const alert = document.createElement('p');
            alert.innerHTML = "<p style='text-align: left;'>You got a drop: Rune Claws</p>"
            document.getElementById('chatbox').appendChild(alert);
            setTimeout(() => document.getElementById('chatbox').removeChild(alert), 10000)
            items.push(new Item("rune_claw", "both", 40));
            updateInv();
            rune_claw_drop = true;
        }
        else if (drop == 3 && !rune_hasta_drop) {
            const alert = document.createElement('p');
            alert.innerHTML = "<p style='text-align: left;'>You got a drop: Rune Hasta</p>"
            document.getElementById('chatbox').appendChild(alert);
            setTimeout(() => document.getElementById('chatbox').removeChild(alert), 10000)
            items.push(new Item("rune_hasta", "main", 30));
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
        if (main.item.id == "rune_scim") {
            strbonus -= 3;
        } else if (main.item.id == "rune_hasta") {
            atkbonus -= 1;
            strbonus -= 1;
        }
        main = null;
    }
}

function unequipOff() {
    if (offhand != null) {
        items.push(offhand);
        if (offhand.item.id == "rune_def") {
            atkbonus -= 3;
        }
        offhand = null;
    }
}

function equip(item) {
    main = item 
    if (items.indexOf(item) != -1) {
        items.splice(items.indexOf(item), 1)
    }
    document.body.appendChild(item.item)
    if (item.item.id == "rune_scim") {
        strbonus += 3;
    } else if (item.item.id == "rune_hasta") {
        atkbonus += 1;
        strbonus += 1;
    }
    item.hover.innerHTML = "Unequip"
    item.item.style.top = '0px';
    item.item.style.left = '0px';
}

function equipOff(item) {
    offhand = item
    if (items.indexOf(item) != -1) {
        items.splice(items.indexOf(item), 1)
    }
    document.body.appendChild(item.item)
    if (item.item.id == "rune_def") {
        atkbonus += 3;
    }
    item.hover.innerHTML = "Unequip"
    item.item.style.top = '0px';
    item.item.style.left = '60px';
}

function setCurrentArea() {
    var combat = (str + atk) / 2;
    if (combat < 15) {
        currentArea = area1
    } else if (combat < 30) {
        currentArea = area2
    } else if (combat < 45) {
        currentArea = area3
    } else if (combat < 60) {
        currentArea = area4
    } else if (combat < 75) {
        currentArea = area5
    } else if (combat < 99) {
        currentArea = area6
    } else {
        currentArea = area7
    }
}

function loadHands() {
    if (localStorage.getItem("equipped") != null) {
        var toEquip = JSON.parse(localStorage.getItem("equipped"))
        if (toEquip[0].length > 0) {
          equip(new Item(toEquip[0][0], toEquip[0][1], toEquip[0][2]));
        }
        if (toEquip[1].length > 0) {
          equipOff(new Item(toEquip[1][0], "off", toEquip[1][1]))
        }
      }
    if (localStorage.getItem("hp") != null) {
        $("#enemyhp").css("width",(JSON.parse(localStorage.getItem("hp")) / currentArea.hp * 100) + "%",100);
        currentArea.currentHp = JSON.parse(localStorage.getItem("hp"))
    }
}

function save() {
    var inv = []
    for (let i = 0; i < items.length; i++) {
        inv.push([items[i].item.id, items[i].hand, items[i].atkreq])
    }
    var equipped = []
    if (main != null) {
        equipped.push([main.item.id, main.hand, main.atkreq])
    } else {
        equipped.push([])
    }
    if (offhand != null) {
        equipped.push([offhand.item.id, offhand.atkreq])
    } else {
        equipped.push([])
    }
    localStorage.setItem('inv', JSON.stringify(inv))
    localStorage.setItem('str', JSON.stringify(str))
    localStorage.setItem('strxp', JSON.stringify(strxp))
    localStorage.setItem('strxp_calc', JSON.stringify(strxp_calc))
    localStorage.setItem('atk', JSON.stringify(atk))
    localStorage.setItem('atkxp', JSON.stringify(atkxp))
    localStorage.setItem('atkxp_calc', JSON.stringify(atkxp_calc))
    localStorage.setItem('rune_drops', JSON.stringify([rune_scim_drop, rune_defender_drop, rune_claw_drop, rune_hasta_drop]))
    localStorage.setItem('equipped', JSON.stringify(equipped))
    localStorage.setItem('hp', JSON.stringify(currentArea.currentHp))
    localStorage.setItem('kills', JSON.stringify(kills))
}