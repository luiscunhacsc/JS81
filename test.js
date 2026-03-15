const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('c:/Users/luisl/CorrectingShift/JS81/js81.html', 'utf8');
const dom = new JSDOM(html, { runScripts: "dangerously" });
let e = null;
try {
   const container = dom.window.document.getElementById('tv-container');
   // Simulate shift down
   container.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'Shift', code: 'ShiftLeft' }));
   // Simulate * down
   container.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: '*', code: 'Digit8' }));
   // See what keyState is!
   console.log("No crash!");
} catch (err) {
   fs.writeFileSync('c:/Users/luisl/CorrectingShift/JS81/error.txt', err.toString() + "\n" + err.stack);
}
