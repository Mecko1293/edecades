import { createClientFromRequest } from 'https://deno.land/x/base44/sdk@latest/mod.ts';

export default async function checkAffiliateReplies(req: Request) {
  const base44 = createClientFromRequest(req);
  
  try {
    // Get Gmail access token via the connector
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('gmail');
    
    // List unread messages from affiliate partners
    const affiliatePartners = [
      'retrovgames', 'moddedzone', 'goodrx', 'costplusdrugs', 
      'rxspark', 'blinkhealth', 'gamestop', 'zygor'
    ];
    
    const query = `is:unread in:inbox from:(${affiliatePartners.join(' OR ')})`;
    
    const messagesRes = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages?q=${encodeURIComponent(query)}&maxResults=20`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    
    if (!messagesRes.ok) {
      return { found: 0, error: `Gmail API error: ${messagesRes.status}` };
    }
    
    const messagesData = await messagesRes.json();
    const messageIds = messagesData.messages?.map((m: any) => m.id) || [];
    
    if (messageIds.length === 0) {
      return { found: 0, messages: [] };
    }
    
    // Fetch full message details
    const messages = [];
    for (const messageId of messageIds) {
      const msgRes = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}?format=full`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      
      if (msgRes.ok) {
        const msg = await msgRes.json();
        const headers = msg.payload?.headers || [];
        const fromHeader = headers.find((h: any) => h.name === 'From')?.value || 'Unknown';
        const subjectHeader = headers.find((h: any) => h.name === 'Subject')?.value || '(no subject)';
        
        messages.push({
          id: messageId,
          from: fromHeader,
          subject: subjectHeader
        });
      }
    }
    
    return { found: messages.length, messages };
  } catch (error) {
    return { error: error.message };
  }
}