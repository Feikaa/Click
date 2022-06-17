class RuneScim {
    constructor(rune_scim, icon, hover) {
        this.rune_scim = rune_scim
        this.icon = icon
        this.hover = hover
    }
    
    get rune_scim() {
        return this.rune_scim;
    }
    get icon() {
        return this.icon;
    }
    get hover() {
        return this.hover;
    }

    build() {
        this.rune_scim.appendChild(this.icon)
        this.rune_scim.className = "tooltip"
        this.rune_scim.id = "rune_scim"
        this.icon.src = "Rune_scimitar.png";
        this.icon.width = 50;
        this.icon.height = 50;
        this.rune_scim.style.position = 'absolute';
        this.rune_scim.style.top = 0 + (60 * Math.floor((items.length / 5))) + 'px';
        this.rune_scim.style.left = 0 + (60 * (items.length % 5)) + 'px';    
        this.rune_scim.addEventListener('click', function handleClick(event) {
            if (main != RuneScim) {
                unequipMain();
                equip(RuneScim);
                updateInv();
            } else {
                unequipMain();
                updateInv();
            }
        })
        this.hover.id = "hover";
        this.hover.className = "tooltiptextnobg"
        this.hover.innerHTML = "Equip"
        this.hover.style.top = '20px'
        this.hover.style.left = '5px'
        this.rune_scim.appendChild(this.hover)
    }
}