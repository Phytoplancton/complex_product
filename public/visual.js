import * as vects from "./vectors.js";
import * as s from "./settings/settings.js";
import * as c from "./canvas.js";
function canvasSetup() {
    c.ctx.strokeStyle = s.COLOR(s.LINE_ALPHA);
    c.ctx.lineWidth = s.LINE_WIDTH;
    c.ctx.font = s.FONT;
    c.ctx.fillStyle = s.COLOR();
}
function drawVect(vect, label) {
    c.ctx.beginPath();
    c.ctx.moveTo(window.innerWidth / 2, window.innerHeight / 2);
    c.ctx.lineTo(vects.coordToPix(vect)[0], vects.coordToPix(vect)[1]);
    c.ctx.stroke();
    c.ctx.beginPath();
    c.ctx.fillStyle = s.COLOR();
    let len = Math.sqrt(vect[0] ** 2 + vect[1] ** 2);
    c.ctx.fillText(label, vects.coordToPix(vect)[0] + s.TEXT_HEIGHT * vect[0] / len - s.TEXT_HEIGHT * label.length / 4, vects.coordToPix(vect)[1] + s.TEXT_HEIGHT * vect[1] / len + s.TEXT_HEIGHT / 2);
}
function drawUnitCircle() {
    c.ctx.beginPath();
    c.ctx.lineWidth = s.LINE_WIDTH_2;
    c.ctx.arc(window.innerWidth / 2, window.innerHeight / 2, s.SCALE, 0, 2 * Math.PI);
    c.ctx.moveTo(window.innerWidth / 2, 0);
    c.ctx.lineTo(window.innerWidth / 2, window.innerHeight);
    c.ctx.moveTo(0, window.innerHeight / 2);
    c.ctx.lineTo(window.innerWidth, window.innerHeight / 2);
    c.ctx.stroke();
    c.ctx.lineWidth = s.LINE_WIDTH;
}
function name(concat) {
    let out = "";
    for (let i = 0; i < vects.vectors.length; i++) {
        if (i != 0) {
            out += concat;
        }
        out += s.NAMES[i];
    }
    return out;
}
function draw() {
    canvasSetup();
    drawUnitCircle();
    for (let i = 0; i < vects.vectors.length; i++) {
        drawVect(vects.vectors[i], s.NAMES[i]);
    }
    drawVect(vects.product(), name("·"));
    drawVect(vects.sum(), name("+"));
}
export { draw };
