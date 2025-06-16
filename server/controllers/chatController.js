

const userSessionService = require('../services/userSessionService');
const llmService = require('../services/llmService'); 
const { v4: uuidv4 } = require('uuid'); 

/**
 * Handles incoming chat messages from the user.
 * Manages the conversation flow, updates user session, and interacts with the LLM.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
exports.handleChatMessage = async (req, res) => {
    const { sessionId: clientSessionId, message } = req.body;

    
    let sessionId = clientSessionId;
    if (!sessionId) {
        sessionId = uuidv4();
    }

    try {
       
        let userSession = await userSessionService.getUserSession(sessionId);

       
        if (!userSession) {
            userSession = await userSessionService.createUserSession(sessionId);
        }

        
        userSession.chatHistory.push({ role: 'user', content: message });

        
        const llmContext = {
            chatHistory: userSession.chatHistory,
            userInputs: userSession.userInputs,
          
        };

       
        const llmResponse = await llmService.getLLMResponseAndExtractInputs(llmContext, message);

       
        if (llmResponse.text) {
             userSession.chatHistory.push({ role: 'assistant', content: llmResponse.text });
        }


       
        if (Object.keys(llmResponse.extractedInputs).length > 0) {
            
            Object.assign(userSession.userInputs, llmResponse.extractedInputs);

          
            if (llmResponse.toolCalls && llmResponse.toolCalls.length > 0) {
                 userSession.chatHistory.push({
                     role: 'assistant',
                     tool_calls: llmResponse.toolCalls,
                 });
                 
                 userSession.chatHistory.push({
                    role: 'tool',
                    tool_call_id: llmResponse.toolCalls[0].id, 
                    content: JSON.stringify(llmResponse.extractedInputs) 
                 });
            }
        }


        
        await userSessionService.updateUserSession(sessionId, userSession);

        
        res.json({
            sessionId: sessionId,
            response: llmResponse.text,
            userInputs: userSession.userInputs,
            conversationComplete: llmResponse.conversationComplete 
        });

    } catch (error) {
        console.error('Error handling chat message:', error);
        res.status(500).json({ error: 'Failed to process chat message.' });
    }
};
