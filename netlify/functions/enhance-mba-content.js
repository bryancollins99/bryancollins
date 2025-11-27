const Anthropic = require('@anthropic-ai/sdk');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { tool, inputs } = JSON.parse(event.body);
    
    // Initialize Anthropic client with API key from environment variable
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY
    });

    let systemPrompt = '';
    let userPrompt = '';

    // Generate prompts based on the tool type
    switch(tool) {
      case 'ansoff':
        systemPrompt = 'You are an expert business strategist helping content creators develop growth strategies using the ANSOFF Matrix. Provide specific, actionable, and creative expansion ideas. Return your response as valid JSON with this exact structure: {"penetration": ["idea1", "idea2", "idea3"], "development": ["idea1", "idea2", "idea3"], "productDevelopment": ["idea1", "idea2", "idea3"], "diversification": ["idea1", "idea2", "idea3"]}';
        userPrompt = `A creator has the following business:
Product/Content: ${inputs.product}
Primary Audience: ${inputs.audience}

They have entered these initial ideas:
- Market Penetration (existing product + existing market): ${inputs.penetration || 'Not specified'}
- Market Development (existing product + new market): ${inputs.development || 'Not specified'}
- Product Development (new product + existing market): ${inputs.productDev || 'Not specified'}
- Diversification (new product + new market): ${inputs.diversification || 'Not specified'}

For each quadrant, provide 3-5 specific, actionable strategies that expand on their ideas. Make them concrete and tailored to content creators. Return ONLY valid JSON, no other text.`;
        break;

      case 'bcg':
        systemPrompt = 'You are an expert in portfolio management helping content creators analyze their products using the BCG Matrix. Provide strategic recommendations. Return your response as valid JSON with this exact structure: {"stars": ["rec1", "rec2", "rec3"], "questionMarks": ["rec1", "rec2", "rec3"], "cashCows": ["rec1", "rec2", "rec3"], "dogs": ["rec1", "rec2", "rec3"]}';
        userPrompt = `A creator has categorized their products as follows:
- Stars (high growth + high share): ${inputs.stars || 'Not specified'}
- Question Marks (high growth + low share): ${inputs.questionMarks || 'Not specified'}
- Cash Cows (low growth + high share): ${inputs.cashCows || 'Not specified'}
- Dogs (low growth + low share): ${inputs.dogs || 'Not specified'}

For each category, provide 3-5 strategic recommendations and resource allocation advice. Make them specific and actionable. Return ONLY valid JSON, no other text.`;
        break;

      case 'swot':
        systemPrompt = 'You are a strategic business analyst helping content creators perform SWOT analysis. Provide strategic insights and action items. Return your response as valid JSON with this exact structure: {"strengths": ["insight1", "insight2", "insight3"], "weaknesses": ["insight1", "insight2", "insight3"], "opportunities": ["insight1", "insight2", "insight3"], "threats": ["insight1", "insight2", "insight3"]}';
        userPrompt = `A creator has identified:
Strengths: ${inputs.strengths || 'Not specified'}
Weaknesses: ${inputs.weaknesses || 'Not specified'}
Opportunities: ${inputs.opportunities || 'Not specified'}
Threats: ${inputs.threats || 'Not specified'}

For each area, provide 3-5 additional insights they may have missed and strategic actions to leverage/address them. Be specific and actionable. Return ONLY valid JSON, no other text.`;
        break;

      case 'business-model-canvas':
        systemPrompt = 'You are a business model expert helping content creators design sustainable business models. Provide strategic insights for each building block. Return your response as valid JSON with this exact structure: {"customerSegments": ["insight1", "insight2"], "valuePropositions": ["insight1", "insight2"], "channels": ["insight1", "insight2"], "customerRelationships": ["insight1", "insight2"], "revenueStreams": ["insight1", "insight2"], "keyResources": ["insight1", "insight2"], "keyActivities": ["insight1", "insight2"], "keyPartners": ["insight1", "insight2"], "costStructure": ["insight1", "insight2"]}';
        userPrompt = `A creator has defined their business model:
Customer Segments: ${inputs.customerSegments || 'Not specified'}
Value Propositions: ${inputs.valuePropositions || 'Not specified'}
Channels: ${inputs.channels || 'Not specified'}
Customer Relationships: ${inputs.customerRelationships || 'Not specified'}
Revenue Streams: ${inputs.revenueStreams || 'Not specified'}
Key Resources: ${inputs.keyResources || 'Not specified'}
Key Activities: ${inputs.keyActivities || 'Not specified'}
Key Partners: ${inputs.keyPartners || 'Not specified'}
Cost Structure: ${inputs.costStructure || 'Not specified'}

Provide 2-3 strategic insights or recommendations for each building block. Focus on alignment and gaps. Return ONLY valid JSON, no other text.`;
        break;

      case 'porters':
        systemPrompt = 'You are a competitive strategy expert helping content creators analyze their market using Porter\'s Five Forces. Provide strategic recommendations. Return your response as valid JSON with this exact structure: {"entrants": ["rec1", "rec2", "rec3"], "buyers": ["rec1", "rec2", "rec3"], "substitutes": ["rec1", "rec2", "rec3"], "suppliers": ["rec1", "rec2", "rec3"], "rivalry": ["rec1", "rec2", "rec3"]}';
        userPrompt = `A creator has analyzed their competitive forces:
Threat of New Entrants (${inputs.entrantsRating}): ${inputs.entrantsAnalysis || 'Not specified'}
Bargaining Power of Buyers (${inputs.buyersRating}): ${inputs.buyersAnalysis || 'Not specified'}
Threat of Substitutes (${inputs.substitutesRating}): ${inputs.substitutesAnalysis || 'Not specified'}
Bargaining Power of Suppliers (${inputs.suppliersRating}): ${inputs.suppliersAnalysis || 'Not specified'}
Competitive Rivalry (${inputs.rivalryRating}): ${inputs.rivalryAnalysis || 'Not specified'}

For each force, provide 3-4 strategic recommendations to improve their competitive position. Be specific and actionable. Return ONLY valid JSON, no other text.`;
        break;

      case 'mckinsey':
        systemPrompt = 'You are an organizational effectiveness consultant helping content creators align their business using the McKinsey 7S Framework. Identify gaps and alignment issues. Return your response as valid JSON with this exact structure: {"sharedValues": ["insight1", "insight2"], "strategy": ["insight1", "insight2"], "structure": ["insight1", "insight2"], "systems": ["insight1", "insight2"], "style": ["insight1", "insight2"], "staff": ["insight1", "insight2"], "skills": ["insight1", "insight2"]}';
        userPrompt = `A creator has mapped their organization:
Shared Values: ${inputs.sharedValues || 'Not specified'}
Strategy: ${inputs.strategy || 'Not specified'}
Structure: ${inputs.structure || 'Not specified'}
Systems: ${inputs.systems || 'Not specified'}
Style: ${inputs.style || 'Not specified'}
Staff: ${inputs.staff || 'Not specified'}
Skills: ${inputs.skills || 'Not specified'}

Analyze alignment between the 7 elements. For each element, provide 2-3 insights on how well it aligns with other elements and specific improvement recommendations. Return ONLY valid JSON, no other text.`;
        break;

      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Invalid tool specified' })
        };
    }

    // Call Claude API
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      temperature: 0.7,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt
        }
      ]
    });

    let enhancedContent = message.content[0].text;
    
    // Parse JSON response
    try {
      // Extract JSON from response (Claude sometimes wraps it in markdown)
      const jsonMatch = enhancedContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        enhancedContent = JSON.parse(jsonMatch[0]);
      } else {
        enhancedContent = JSON.parse(enhancedContent);
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      // Return raw text if JSON parsing fails
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
          success: true,
          enhancedContent: message.content[0].text,
          isRawText: true
        })
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        success: true,
        enhancedContent 
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: 'Failed to enhance content',
        message: error.message 
      })
    };
  }
};

