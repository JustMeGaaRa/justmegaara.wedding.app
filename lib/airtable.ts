import Airtable from 'airtable';
import { QuestionnaireQuestion } from './questionnaire';

const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID || '';
const tableName = process.env.AIRTABLE_TABLE_NAME || 'RSVP';

if (!apiKey) {
    console.warn('AIRTABLE_API_KEY is not defined');
}

const getTable = () => {
    if (!apiKey || !baseId) return null;
    const base = new Airtable({ apiKey }).base(baseId);
    return base(tableName);
};

export async function getRSVP(invitationId: string) {
    const table = getTable();
    if (!table) return null;

    try {
        const records = await table
            .select({
                filterByFormula: `{invitation_id} = '${invitationId}'`,
                maxRecords: 1,
            })
            .firstPage();

        if (records.length === 0) return null;

        return {
            id: records[0].id,
            fields: records[0].fields,
        };
    } catch (error) {
        console.error('Error fetching RSVP from Airtable:', error);
        return null;
    }
}

export async function getAllRSVPs() {
    const table = getTable();
    if (!table) return [];

    try {
        const records = await table.select().all();
        return records.map(r => ({
            id: r.id,
            fields: r.fields as {
                invitation_id: string;
                guest_name: string;
                opens?: number;
                has_rsvp?: boolean;
                [key: string]: any;
            }
        }));
    } catch (error) {
        console.error('Error fetching all RSVPs:', error);
        return [];
    }
}

export async function trackOpen(invitationId: string, guestName: string) {
    const table = getTable();
    if (!table) return;

    try {
        const existing = await getRSVP(invitationId);

        if (existing) {
            const currentOpens = (existing.fields['opens'] as number) || 0;
            await table.update(existing.id, {
                opens: currentOpens + 1
            });
            console.log(`Incremented opens for ${invitationId} to ${currentOpens + 1}`);
        } else {
            await table.create({
                invitation_id: invitationId,
                guest_name: guestName,
                opens: 1,
                has_rsvp: false
            });
            console.log(`Created tracking record for ${invitationId}`);
        }
    } catch (error) {
        console.error('Error tracking open in Airtable:', error);
    }
}

export async function saveRSVP(
    invitationId: string,
    guestName: string,
    questions: QuestionnaireQuestion[],
    answers: Record<number, string>,
    decision: 'yes' | 'no'
) {
    const table = getTable();
    if (!table) {
        console.error('Airtable is not initialized. Check AIRTABLE_API_KEY and AIRTABLE_BASE_ID.');
        throw new Error('Airtable not configured');
    }

    const fields: any = {
        invitation_id: invitationId,
        guest_name: guestName,
        has_rsvp: true,
        decision: decision,
    };

    // Map answers by question id
    questions.forEach((q, idx) => {
        if (answers[idx] !== undefined) {
            fields[q.id] = answers[idx];
        }
    });

    try {
        const existing = await getRSVP(invitationId);

        if (existing) {
            await table.update(existing.id, fields);
            console.log(`Updated RSVP for ${invitationId}`);
        } else {
            await table.create(fields);
            console.log(`Created new RSVP for ${invitationId}`);
        }
    } catch (error) {
        console.error('Error saving RSVP to Airtable:', error);
        throw error;
    }
}
