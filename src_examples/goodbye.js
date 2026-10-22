import { initJsPsychWithJatos } from '../lib/jatos.ts';
import get_bye from './parts/bye';

const jsPsych = initJsPsychWithJatos();

jsPsych.run([
    get_bye(),
]);
