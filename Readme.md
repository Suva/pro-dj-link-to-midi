Pro DJ Link to MIDI
===================

This program lets you connect to Pro DJ Link network and follow the master tempo from DJ players. It converts
the signal into MIDI clock signal, so you can use use it to sync synthesizers, external effects and the like to your 
players.

Note, this program only sends midi clock data, not time code, so you won't get exact beat quantization, just the tempo.
Also, as the Node.js is not the best option for hard realtime systems, thus you may see some minor clock drift and
jitter. It should be fine for using with effect units, but if very precise sync is important to you, I recommend you
keep searching for a better solution.

## Installation

```
npm install -g djlink2midi
```

On linux systems you may need to install additional packages such as libasound2-dev from your distribution package 
repositories.

## Running

```
Usage: djlink2midi [options]

Options:
  -V, --version                  output the version number
  -i, --interface <iface>        Network interface to use
  -m, --midi <midi>              Midi interface to use
  -r, --resolution <resolution>  Midi clock resolution (default: 24)
  -h, --help                     output usage information
  -c, --correction <percent>     BPM correction in percent (default: 0)

Run command without options to get the list of interfaces available.
```

# Using on Raspberry Pi

This program can be installed on Raspberry PI if you want a simple portable solution for syncing external effects pedals 
to your players.

1. Install the package on the system.
2. Add it to startup by adding the command with correct parameters to /etc/rc.local
3. Connect the Raspberry Pi to the Pro DJ Link network using network switch
4. Connect the Raspberry Pi to your effect processor with class compliant USB MIDI interface.
5. Play a track on your CDJ and make sure the "Master" button on CDJ is pressed.

Your effect device should now be able to receive the midi clock and if capable, should be able to keep tempo with your
players.

# Disclaimer

This software is not created by nor endorsed by any hardware manufacturer. By using this software you acknowledge you
are doing so at your own risk, and I shall not be held liable for any possible damages or issues caused.