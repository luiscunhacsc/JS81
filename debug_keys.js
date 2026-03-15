const fs = require('fs');
const code = fs.readFileSync('js81.html', 'utf8');
const scriptMatch = code.match(/<script>([\s\S]*?)<\/script>\s*<\/body>/);
if (!scriptMatch) throw new Error("Could not extract script");
// Mock DOM
let listeners = {};
const container = {
    addEventListener: (event, fn) => { listeners[event] = fn; },
    focus: () => {}
};
const document = {
    getElementById: () => ({ classList: { add: ()=>{}, remove: ()=>{} }, focus: ()=>{}, textContent: "", dataset: {} }),
    addEventListener: () => {}
};
const window = { addEventListener: () => {} };
const loadRomBtn = { addEventListener: () => {} };
const screenModeBtn = { addEventListener: () => {} };
const loadTapeBtn = { addEventListener: () => {} };
const romLoader = { addEventListener: () => {} };
const tapeLoader = { addEventListener: () => {} };
const helpOverlay = { addEventListener: () => {}, classList: { toggle: ()=>{} } };
const aboutOverlay = { addEventListener: () => {}, classList: { toggle: ()=>{} } };
const saveOverlay = { addEventListener: () => {}, classList: { add: ()=>{}, remove: ()=>{} } };
const fullscreenHud = { setAttribute: () => {} };
const screenModeBtn_el = { title: "", textContent: "", disabled: false };
const statusMessageEl = { textContent: "", dataset: {} };
const screenCanvas = { style: {}, getContext: () => ({ createImageData: () => ({data:new Uint8Array(100)}), putImageData: ()=>{} }) };

let injected = `
    let memory = new Uint8Array(65536).fill(0xFF);
    let z80 = { run_instruction: ()=>10, interrupt: ()=>{} };
    let running = true;
    let animationFrameId = null;
    function requestAnimationFrame(fn) {}
    function cancelAnimationFrame() {}
` + scriptMatch[1].replace(/const ctx = /, 'let ctx = ');

try {
    eval(injected);
    console.log("Evaluated script OK.");
    
    // Simulate Shift
    console.log("Triggering ShiftLeft...");
    listeners['keydown']({ key: "Shift", code: "ShiftLeft", preventDefault: ()=>{} });
    console.log("keyState[0xFE]:", keyState[0xFE]);
    
    // Simulate /
    console.log("Triggering Slash...");
    listeners['keydown']({ key: "/", code: "Slash", preventDefault: ()=>{} });
    console.log("keyState[0xFE]:", keyState[0xFE], "keyState[0x7F]:", keyState[0x7F]);
    
    // Check LAST_K
    console.log("LAST_K: row=", memory[0x4025], "col=", memory[0x4026]);

} catch(e) {
    console.error(e);
}
