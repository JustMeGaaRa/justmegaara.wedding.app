import fs from 'fs';
import path from 'path';

export interface Guest {
  name: string;
  id: string;
}

export function getGuests(): Guest[] {
  const filePath = path.join(process.cwd(), 'data', 'guests.csv');
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lines = fileContent.split('\n');
    
    // Skip header and empty lines
    const guests: Guest[] = [];
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        // Simple comma split (assuming names don't have commas for now based on example)
        // If names have commas, we'd need a more robust parser
        const parts = line.split(',');
        if (parts.length >= 2) {
            guests.push({
                name: parts[0].trim(),
                id: parts[1].trim()
            });
        }
    }
    return guests;
  } catch (error) {
    console.error('Error reading guests CSV:', error);
    return [];
  }
}

export function getGuestById(id: string): Guest | undefined {
  const guests = getGuests();
  return guests.find(g => g.id === id);
}
