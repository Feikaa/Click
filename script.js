document.getElementById("attack").innerHTML = atk
document.getElementById("attackxp").innerHTML = atkxp
document.getElementById("attackxp_diff").innerHTML = (1/4 * Math.floor(atk + (300 * (Math.pow(2, (atk) / 7))))) - atkxp_calc
document.getElementById("strength").innerHTML = str
document.getElementById("strengthxp").innerHTML = strxp
document.getElementById("strengthxp_diff").innerHTML = (1/4 * Math.floor(str + (300 * (Math.pow(2, (str) / 7))))) - strxp_calc
document.getElementById('btn').addEventListener("click", () => {
    on = !on;
    iterate();
})
document.getElementById("attackstyle").addEventListener("change", () => {
    changestyle();
    iterate();
})
var checkbox = document.getElementById("attackstyle")

function changestyle() {
    if (checkbox.checked) {
        document.getElementById("attackstyletext").innerHTML = "Strength"
    } else {
        document.getElementById("attackstyletext").innerHTML = "Attack"
    }
    on = false
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
                dmg.innerHTML = Math.round(hit / 4);
                img.src = "Damage_hitsplat.png"
                strxp += hit
                strxp_calc += hit
                document.getElementById("strengthxp").innerHTML = strxp
                document.getElementById("strengthxp_diff").innerHTML = (1/4 * Math.floor(str + (300 * (Math.pow(2, (str) / 7))))) - strxp_calc

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
                dmg.innerHTML = Math.round(hit / 4);
                img.src = "Damage_hitsplat.png"
                atkxp += hit
                atkxp_calc += hit
                document.getElementById("attackxp").innerHTML = atkxp
                document.getElementById("attackxp_diff").innerHTML = (1/4 * Math.floor(atk + (300 * (Math.pow(2, (atk) / 7))))) - atkxp_calc
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
                $("#enemyhp").css("width",($("#enemyhp").width() / $("#enemyhp").offsetParent().width() * 100) - (hit/4) + "%",100);
                atkXP()
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
            document.getElementById("attackxp_diff").innerHTML = (1/4 * Math.floor(atk + (300 * (Math.pow(2, (atk) / 7))))) - strxp_calc
        }
        if (strxp_calc >= (1/4 * Math.floor(str + 300 * (Math.pow(2, (str) / 7))))) {
            str += 1
            document.getElementById("strength").innerHTML = str
            strxp_calc = 0
            document.getElementById("strengthxp_diff").innerHTML = (1/4 * Math.floor(str + (300 * (Math.pow(2, (str) / 7))))) - strxp_calc
        }
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

    if (regular == 0) {
        var drop = Math.floor(Math.random() * 4);
        if (drop == 0 && !rune_scim_drop) {
            const alert = document.createElement('p');
            alert.innerHTML = "<p style='text-align: left;'>You got a drop: Rune Scimitar</p>"
            document.getElementById('chatbox').appendChild(alert);
            setTimeout(() => document.getElementById('chatbox').removeChild(alert), 5000)
            const rune_scim = document.createElement('div');
            const icon = document.createElement('img');
            rune_scim.appendChild(icon)
            rune_scim.className = "tooltip"
            rune_scim.id = "rune_scim"
            icon.src = "Rune_scimitar.png";
            icon.width = 50;
            icon.height = 50;
            rune_scim.style.position = 'absolute';
            rune_scim.style.top = 0 + (60 * Math.floor((items.length / 5))) + 'px';
            rune_scim.style.left = 0 + (60 * (items.length % 5)) + 'px';    
            rune_scim.addEventListener('click', function handleClick(event) {
                if (main != rune_scim) {
                    unequipMain();
                    equip(rune_scim);
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
            rune_scim.appendChild(hover)
            items.push(rune_scim);
            updateInv();
            rune_scim_drop = true;
        }
        else if (drop == 1 && !rune_defender_drop) {
            const alert = document.createElement('p');
            alert.innerHTML = "<p style='text-align: left;'>You got a drop: Rune Defender</p>"
            document.getElementById('chatbox').appendChild(alert);
            setTimeout(() => document.getElementById('chatbox').removeChild(alert), 5000)
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
    }
}
}

function updateInv() {
    document.getElementById('inventory').innerHTML = "";
    for (const item of items) {
        document.getElementById('inventory').appendChild(item);
        hover.innerHTML = "Equip"
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
    document.body.appendChild(item)
    hover.innerHTML = "Unequip"
}

function equipOff(item) {
    offhand = item
    items.splice(items.indexOf(item), 1)
    document.body.appendChild(item)
    hover.innerHTML = "Unequip"
}