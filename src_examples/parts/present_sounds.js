import AudioKeyboardResponsePlugin from '@jspsych/plugin-audio-keyboard-response';

import snd_440 from './assets/sounds/440.mp3';
import snd_550 from './assets/sounds/550.mp3';
import get_fixcross from '../stimuli/fixation_cross';

/**
 * @returns {import('jspsych').TimelineDescription}
 */
export default function get_sound_trials(jsPsych, n_trials) {
    return {
        timeline: [
            get_fixcross(500),
            {
                type: AudioKeyboardResponsePlugin,
                choices: 'NO_KEYS',
                trial_ends_after_audio: true,
                stimulus: jsPsych.timelineVariable('snd'),
                prompt: '<h1>+</h1>',
            },
        ],
        timeline_variables: [
            { snd: snd_440 },
            { snd: snd_550 },
        ],
        sample: {
            type: ('fixed-repetitions'),
            size: n_trials / 2,
        },
    };
}
