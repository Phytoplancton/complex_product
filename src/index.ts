

import * as s from "./settings/settings.js";
import * as c from "./canvas.js";
import * as visual from "./visual.js";
import "./user_input/sliders.js"


const loop = () => {
    c.ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
    visual.draw()
    requestAnimationFrame(loop)
}
loop();