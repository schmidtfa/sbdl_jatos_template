import 'jspsych';
import 'jspsych/css/jspsych.css'

if(typeof jatos !== 'undefined') {
    jatos.onLoad(function() {
        require('src_files/' + entry_js);
    });
}
else
{
    require('src_files/' + entry_js);
}


