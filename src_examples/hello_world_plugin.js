import HelloWorldPlugin from './plugins/example_plugin.ts';
import { initJsPsychWithJatos } from '../lib/jatos.ts';

const jsPsych = initJsPsychWithJatos();

jsPsych.run([
    {
        type: HelloWorldPlugin,
        full_name: 'Zaphod Beeblebrox',
    },
]);
