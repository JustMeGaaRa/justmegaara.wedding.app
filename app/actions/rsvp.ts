'use server'

import { saveRSVP } from "@/lib/airtable";
import { getQuestionnaire } from "@/lib/questionnaire";

export async function submitRSVP(invitationId: string, guestName: string, answers: Record<number, string>, decision: 'yes' | 'no') {
    try {
        const questions = getQuestionnaire();
        await saveRSVP(invitationId, guestName, questions, answers, decision);
        return { success: true };
    } catch (error) {
        console.error('RSVP Action Error:', error);
        return { success: false, error: 'Failed to save RSVP' };
    }
}
