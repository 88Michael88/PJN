import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'path';

async function connect() {
    try {
        const filepath = path.join(path.dirname(fileURLToPath(import.meta.url)), "/data.json");
        const content = await fs.readFile(filepath, 'utf8');
        const data = JSON.parse(content);

        if (!Array.isArray(data)) {
            throw new Error('Database file must contain a JSON array');
        }

        return data;
    } catch (error) {
        console.error('Failed to connect:', error.message);
        return undefined;
    }
}

const connection = {
    data: await connect(),
    readID(id) {
        return this.data.find(item => item.id === parseInt(id)) ?? null;
    },
    readIDRange(idStart, idEnd) {
        return this.data.filter(
            item => item.id >= idStart && item.id <= idEnd 
        );
    },
};

if (connection.data === undefined) {
    console.error('Error connecting to database');
} else {
    console.log('Connected to database.');
}

export { connection };
