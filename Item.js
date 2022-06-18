class Item {
        constructor(name, hand) {
        this.item = document.createElement('div');
        this.icon = document.createElement('img');
        this.hover = document.createElement("span");
        this.hand = hand
        this.build(name)
    }

    build(name) {
        var thathand = this.hand
        var that = this
        this.item.appendChild(this.icon)
        this.item.className = "tooltip"
        this.item.id = name
        this.icon.src = name + ".png";
        this.icon.width = 50;
        this.icon.height = 50;
        this.item.style.position = 'absolute';
        this.item.style.top = 0 + (60 * Math.floor((items.length / 5))) + 'px';
        this.item.style.left = 0 + (60 * (items.length % 5)) + 'px';    
        this.item.addEventListener('click', function handleClick() {
            if (thathand == "main") {
                if (main != that) {
                    unequipMain();
                    equip(that);
                } else {
                    unequipMain();
                }
            } else if (thathand == "off") {
                if (offhand != that) {
                    unequipOff();
                    equipOff(that);
                    if (main != null && main.hand == "both") {
                        unequipMain();
                    }
                } else {
                    unequipOff();
                }
            } else if (thathand == "both") {
                if (main != that) {
                    unequipMain();
                    unequipOff();
                    equip(that);
                } else {
                    unequipMain();
                }
            }
            updateInv();
        })
        this.hover.id = "hover";
        this.hover.className = "tooltiptextnobg"
        this.hover.innerHTML = "Equip"
        this.hover.style.top = '20px'
        this.hover.style.left = '5px'
        this.item.appendChild(this.hover)
    }
    
}