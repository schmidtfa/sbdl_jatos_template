import { initJsPsychWithJatos } from '../lib/jatos.ts';
import get_images_trials from './parts/show_images';

const jsPsych = initJsPsychWithJatos();

jsPsych.run([
    get_images_trials(jsPsych, 10),
]);
