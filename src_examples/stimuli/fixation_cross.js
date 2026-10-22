import HtmlKeyboardResponsePlugin from '@jspsych/plugin-html-keyboard-response';
import { JsPsych } from 'jspsych';

export default function get_fixcross(duration) {
    return {
        type: HtmlKeyboardResponsePlugin,
        stimulus: '<h1>+</h1>',
        choices: JsPsych.NO_KEYS,
        trial_duration: duration,
    };
}
