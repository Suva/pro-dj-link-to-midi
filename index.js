#!/usr/bin/env node

const link = require('pro-dj-link')
const os = require('os')
const midi = require('easymidi')
const NanoTimer  = require('nanotimer')
const timer = new NanoTimer()
const program = require('commander')

program
  .name('djlink2midi')
  .version('1.0.2')
  .option('-i, --interface <iface>', 'Network interface to use')
  .option('-m, --midi <midi>', 'Midi interface to use')
  .option('-r, --resolution <resolution>', 'Midi clock resolution', parseInt, 24)
  .option('-c, --correction <resolution>', 'BPM correction in percent', parseFloat, 0)
  .parse(process.argv)

if(!program.interface) {
  console.log("Please specify network interface with -i option from:")
  Object.keys(os.networkInterfaces()).forEach((iface) => console.log("\t'" + iface + "'"))
  console.log()
}

if(!program.midi) {
  console.log("Please specify MIDI interface to with -m option from:")
  midi.getOutputs().forEach((iface) => console.log("\t'" + iface + "'"))
  console.log()
}

if(!program.midi || !program.interface) {
  process.exit(1)
}

const clockOutput = new midi.Output(program.midi)

const vcdj = new link.VirtualCdj(program.interface)

let currentBpm = 0

console.log("Program started")
console.log("Using network interface: " + program.interface)
console.log("Using MIDI interface:    " + program.midi)
console.log("Waiting for players to report tempo...")

function updateTempo(bpm) {
  if(currentBpm) {
    timer.clearInterval()
  } else {
    console.log("Starting timer")
  }
  currentBpm = bpm
  timer.setInterval(() => clockOutput.send('clock'), '', 60 / (bpm + program.correction / 100 * bpm) / program.resolution + 's')
  console.log("Setting bpm to: " + (program.correction !== 0 ? (bpm + ' + ' + program.correction + '%') : bpm))
}

vcdj.bpm.subscribe((bpm) => {
  if(currentBpm !== bpm) {
    updateTempo(bpm)
  }
})

updateTempo(120)