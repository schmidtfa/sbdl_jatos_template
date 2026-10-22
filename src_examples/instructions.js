import get_hello from './parts/hello';
import get_instructions from './parts/instructions';
import { initJsPsychWithJatos } from '../lib/jatos.ts';

const jsPsych = initJsPsychWithJatos();

jsPsych.run([
    get_hello(),
    get_instructions(),
]);
