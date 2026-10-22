import ImageKeyboardResponsePlugin from '@jspsych/plugin-image-keyboard-response';

import get_fixcross from '../stimuli/fixation_cross';

import img_correct from './assets/images/correct.png';
import img_incorrect from './assets/images/incorrect.png';

export default function get_images_trials(jsPsych, n_trials) {
    return {
        timeline: [
            get_fixcross(300),
            {
                type: ImageKeyboardResponsePlugin,
                trial_duration: 1000,
                stimulus: jsPsych.timelineVariable('img'),
                stimulus_width: 600,
                choices: jsPsych.NO_KEYS,
            }],
        timeline_variables: [
            { img: img_correct },
            { img: img_incorrect },
        ],
        sample: {
            type: 'fixed-repetitions',
            size: n_trials / 2,
        },
    };
}
