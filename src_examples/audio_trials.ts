import htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';
import jsPsychPreload from '@jspsych/plugin-preload';

import get_sound_trials from './parts/present_sounds';
import { initJsPsychWithJatos } from '../lib/jatos';

import snd_440 from './parts/assets/sounds/440.mp3';
import snd_550 from './parts/assets/sounds/550.mp3';

const jsPsych = initJsPsychWithJatos();

const preload = {
    type: jsPsychPreload,
    audio: [snd_550, snd_440],
};

jsPsych.run([
    preload,
    {
        type: htmlKeyboardResponse,
        stimulus: '<p>Please press a key...</p>',
    },
    get_sound_trials(jsPsych, 10),
]);
