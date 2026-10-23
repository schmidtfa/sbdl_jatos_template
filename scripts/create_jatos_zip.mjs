import fs from 'fs';
import os from 'os';
import path from 'path';
import fs_extra from 'fs-extra';
import { ZipArchive } from 'archiver';
import { v5 as uuidv5 } from 'uuid';
import { globSync } from 'glob';

const pkg_name = process.env.npm_package_name;

if (!pkg_name || pkg_name === 'your_experiment_name_goes_here') {
    throw new Error('Please set a proper name in package.json!');
}

const zipit = () => new Promise((resolve) => {
    const tmpdir = os.tmpdir() + path.sep;

    const this_tmp = fs.mkdtempSync(tmpdir);
    const final_dir = path.join(this_tmp, pkg_name);

    fs.mkdirSync(final_dir);

    fs_extra.copySync('dist', final_dir);

    const root_uuid = '00000000-0000-0000-0000-000000000000';

    const uuid_namespace = uuidv5(pkg_name, root_uuid);

    const jatos_jas = {
        version: '3',
        data: {
            uuid: uuidv5(pkg_name, uuid_namespace),
            title: pkg_name,
            description: '',
            groupStudy: false,
            dirName: pkg_name,
            comments: '',
            jsonData: null,
            componentList: [],
        },
    };

    globSync(path.join(final_dir, '*.html')).forEach((html_file) => {
        const f_name = path.parse(html_file).base;
        const title = path.parse(html_file).name;

        if (f_name === 'index.html') {
            return;
        }

        const this_data = {
            uuid: uuidv5(f_name, uuid_namespace),
            title: title,
            htmlFilePath: f_name,
            reloadable: false,
            active: true,
            comments: '',
            jsonData: null,
        };

        jatos_jas.data.componentList.push(this_data);
    });

    const jatos_jas_str = JSON.stringify(jatos_jas);

    fs.writeFileSync(path.join(this_tmp, `${pkg_name}.jas`),
        jatos_jas_str);

    const final_zip = fs.createWriteStream('jatos.zip');
    const archive = new ZipArchive();
    archive.pipe(final_zip);

    archive.on('error', (err) => {
        throw err;
    });

    final_zip.on('finish', () => {
        resolve();
    });

    archive.directory(this_tmp + path.sep, false);
    archive.finalize();
});

await zipit();



