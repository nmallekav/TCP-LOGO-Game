class canvas {
    constructor() {
        let gfg = new Array(30);
        for (var i = 0; i < gfg.length; i++)
            gfg[i] = new Array(30);

        for (var i = 0; i < gfg.length; i++){
            for (var j = 0; j < gfg[i].length; j++) {
                if (i == 0 || i == gfg.length - 1)
                    gfg[i][j] = "-"
                else if (j == 0 || j == gfg[i].length - 1)
                    gfg[i][j] = "|"
                else
                    gfg[i][j] = " "
            }
        }

        this.gfg = gfg
        this.row = 15
        this.col = 15
        this.brushMode = "*"
        this.currDirection = 0
        this.directions = [[1,0], [1,1], [0,1], [1,-1], [-1,0], [-1,-1], [0,-1], [1,-1]]
    }

    step(num) {
        while (num > 0 && (this.row >= 0 && this.row < this.gfg.length) && (this.col >= 0 && this.col < this.gfg[0].length)) {
            if (this.brushMode != "hover")
                this.gfg[this.row][this.col] = this.brushMode
            this.row += this.directions[this.currDirection][0]
            this.col += this.directions[this.currDirection][1]
            if (this.row < 0 || this.row >= this.gfg.length || this.col < 0 || this.col >= this.gfg[0].length) {
                this.row -= this.directions[this.currDirection][0]
                this.col -= this.directions[this.currDirection][1]
            }
            
            num -= 1
        }
    }

    changeDirections(dir, num) {
        if (dir == "left")
            this.currDirection = ((this.currDirection - num) + this.directions.length)%this.directions.length
        else
            this.currDirection = ((this.currDirection + num) + this.directions.length)%this.directions.length
    }

    setBrushMode(mode) {
        if (mode == "hover\r\n")
            this.brushMode = "hover"
        else if (mode == "draw\r\n")
            this.brushMode = "*"
        else if (mode == "eraser\r\n")
            this.brushMode = " "
    }

    getCoord() {
        return "(" + this.row + "," + this.col + ")"
    }

    render() {
        var str = ""
        for (var i = 0; i < this.gfg.length; i++){
            for (var j = 0; j < this.gfg[i].length; j++) {
                str += this.gfg[i][j]
            }
            str += '\n'
        }

        return str
    }

    clear() {
        for (var i = 0; i < this.gfg.length; i++){
            for (var j = 0; j < this.gfg[i].length; j++) {
                if (i == 0 || i == this.gfg.length - 1)
                    this.gfg[i][j] = "-"
                else if (j == 0 || j == this.gfg[i].length - 1)
                    this.gfg[i][j] = "|"
                else
                    this.gfg[i][j] = " "
            }
        }
    }
}

module.exports = canvas