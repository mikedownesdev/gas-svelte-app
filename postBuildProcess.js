import fs from 'fs';
import path from 'path';

function processDir(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);

        if (fs.statSync(filePath).isDirectory()) {
            processDir(filePath);
        } else if (filePath.endsWith('.ts')) {
            let content = fs.readFileSync(filePath, 'utf8');
            // Remove import statements
            content = content.replace(/^import .+ from .+;$/gm, '');
            // Remove export statements or comment them out
            content = content.replace(/^export .+;$/gm, '');
            fs.writeFileSync(filePath, content, 'utf8');
        }
    }
}

processDir('./dist/server');