<<<<<<< HEAD
// server/services/recommendationEngine.js

/**
 * Filters and ranks credit cards based on user inputs.
 * This is a simplified recommendation logic for demonstration purposes.
 * In a real application, this would involve more sophisticated algorithms,
 * possibly weighting different factors.
 * @param {Object} userInputs - Object containing collected user preferences (monthlyIncome, spendingHabits, preferredBenefits, creditScore).
 * @param {Array} allCreditCards - An array of all available credit card objects.
=======

/**
 
 
 
 * @param {Object} userInputs 
 * @param {Array} allCreditCards 
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
 * @returns {Array} An array of top 3-5 recommended credit card objects,
 * each augmented with key reasons and reward simulation.
*/
exports.getTopRecommendations = (userInputs, allCreditCards) => {
    let filteredCards = [...allCreditCards]; // Start with all cards

<<<<<<< HEAD
    // --- 1. Filtering Logic ---

    // Filter by Monthly Income (basic check)
=======
   

    
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
    if (userInputs.monthlyIncome) {
        filteredCards = filteredCards.filter(card => {
            const eligibility = card.eligibility_criteria || '';
            const incomeMatch = eligibility.match(/Monthly Income > Rs\.? (\d+,?\d*)/i);
            const itrMatch = eligibility.match(/ITR > Rs\.? (\d+,?\d*)/i);

            let requiredIncome = 0;
            if (incomeMatch) requiredIncome = parseInt(incomeMatch[1].replace(/,/g, ''));
            if (itrMatch) { // Convert annual ITR to monthly for comparison
                const requiredItr = parseInt(itrMatch[1].replace(/,/g, ''));
                if (requiredItr > 0) requiredIncome = Math.max(requiredIncome, requiredItr / 12);
            }

            return userInputs.monthlyIncome >= requiredIncome;
        });
    }

<<<<<<< HEAD
    // Filter by Credit Score (very basic, assuming scores like "650" or "unknown")
    if (userInputs.creditScore && userInputs.creditScore !== 'unknown') {
        const userScore = parseInt(userInputs.creditScore);
        // This is a placeholder for actual score-based filtering
        // For simplicity, let's assume cards don't explicitly list min score here,
        // so we'll just keep all if user has a score, or filter based on a hypothetical threshold.
        // For now, let's not filter too aggressively based on score if not explicit in data.
    }


    // --- 2. Scoring/Ranking Logic ---
    // Assign a score to each card based on how well it matches user preferences
=======
   
    if (userInputs.creditScore && userInputs.creditScore !== 'unknown') {
        const userScore = parseInt(userInputs.creditScore);
       
    }


    
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47

    const scoredCards = filteredCards.map(card => {
        let score = 0;
        const keyReasons = [];
<<<<<<< HEAD
        let rewardSimulation = 0; // Initialize reward simulation

        // A. Reward Type & Rate Preference
        if (userInputs.preferredBenefits && userInputs.preferredBenefits.length > 0) {
            userInputs.preferredBenefits.forEach(benefit => {
                if (card.special_perks && card.special_perks.toLowerCase().includes(benefit)) {
                    score += 20; // High score for direct benefit match
                    keyReasons.push(`Strong match for your preferred benefit: **${benefit}**`);
                }
                if (card.reward_type && card.reward_type.toLowerCase().includes(benefit.split(' ')[0])) { // e.g., 'cashback'
=======
        let rewardSimulation = 0; 

        
        if (userInputs.preferredBenefits && userInputs.preferredBenefits.length > 0) {
            userInputs.preferredBenefits.forEach(benefit => {
                if (card.special_perks && card.special_perks.toLowerCase().includes(benefit)) {
                    score += 20; 
                    keyReasons.push(`Strong match for your preferred benefit: **${benefit}**`);
                }
                if (card.reward_type && card.reward_type.toLowerCase().includes(benefit.split(' ')[0])) { 
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
                    score += 10;
                    keyReasons.push(`Offers ${card.reward_type} rewards, which you prefer.`);
                }
            });
        }

<<<<<<< HEAD
        // B. Spending Habits Matching
=======
       
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
        let totalSimulatedSpend = 0;
        if (userInputs.spendingHabits && Object.keys(userInputs.spendingHabits).length > 0) {
            const spending = userInputs.spendingHabits;
            let monthlySpends = 0;
            for (const category in spending) {
                monthlySpends += spending[category];
<<<<<<< HEAD
                // Reward simulation for specific categories (simplified)
                if (card.reward_rate && card.reward_rate.toLowerCase().includes(category)) {
                     // Very basic simulation: if card mentions category in reward rate, assume higher earning
                    if (card.reward_type === 'Cashback' && card.reward_rate.includes('%')) {
                        const cashbackRate = parseFloat(card.reward_rate.match(/(\d+\.?\d*)%/)[1]);
                        rewardSimulation += (spending[category] * cashbackRate / 100) * 12; // Annual cashback
=======
                
                if (card.reward_rate && card.reward_rate.toLowerCase().includes(category)) {
                     g
                    if (card.reward_type === 'Cashback' && card.reward_rate.includes('%')) {
                        const cashbackRate = parseFloat(card.reward_rate.match(/(\d+\.?\d*)%/)[1]);
                        rewardSimulation += (spending[category] * cashbackRate / 100) * 12; 
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
                        score += 15;
                        keyReasons.push(`High earnings on your **${category}** spending.`);
                    } else if (card.reward_type === 'Reward Points' && card.reward_rate.includes('points per Rs.')) {
                        const pointsPerSpendMatch = card.reward_rate.match(/(\d+) points per Rs\.? (\d+)/);
                        if(pointsPerSpendMatch){
                             const points = parseInt(pointsPerSpendMatch[1]);
                             const spendAmount = parseInt(pointsPerSpendMatch[2]);
<<<<<<< HEAD
                             // Assume 1 point = 0.25 Rs (common redemption value) for simulation
                             rewardSimulation += ((spending[category] / spendAmount) * points * 0.25) * 12; // Annual value
=======
                             
                             rewardSimulation += ((spending[category] / spendAmount) * points * 0.25) * 12; 
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
                             score += 15;
                             keyReasons.push(`Good reward points accumulation on your **${category}** spending.`);
                        }
                    }
                }
            }
<<<<<<< HEAD
            // Also consider overall spending if card offers general rewards
=======
          
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
            if (card.reward_type === 'Cashback' && card.reward_rate.toLowerCase().includes('all spends')) {
                const cashbackRate = parseFloat(card.reward_rate.match(/(\d+\.?\d*)%/)[1]);
                rewardSimulation += (monthlySpends * cashbackRate / 100) * 12;
            } else if (card.reward_type === 'Reward Points' && card.reward_rate.toLowerCase().includes('spent')) {
                 const pointsPerSpendMatch = card.reward_rate.match(/(\d+) points per Rs\.? (\d+)/);
                 if(pointsPerSpendMatch){
                    const points = parseInt(pointsPerSpendMatch[1]);
                    const spendAmount = parseInt(pointsPerSpendMatch[2]);
                    rewardSimulation += ((monthlySpends / spendAmount) * points * 0.25) * 12;
                 }
            }
<<<<<<< HEAD
            score += (monthlySpends / 1000) * 0.5; // Small score for higher overall spending
        }

        // C. Fees Consideration (lower fees, higher score)
        if (card.joining_fee === 0 && card.annual_fee === 0) {
            score += 10;
            keyReasons.push('**Zero joining and annual fees.**');
        } else if (card.annual_fee < userInputs.monthlyIncome * 0.01) { // Annual fee is less than 1% of monthly income
=======
            score += (monthlySpends / 1000) * 0.5;
        }

        
        if (card.joining_fee === 0 && card.annual_fee === 0) {
            score += 10;
            keyReasons.push('**Zero joining and annual fees.**');
        } else if (card.annual_fee < userInputs.monthlyIncome * 0.01) { 
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
            score += 5;
            if (card.annual_fee > 0 && !keyReasons.includes('**Zero joining and annual fees.**')) {
                 keyReasons.push('Reasonable annual fee for the benefits offered.');
            }
        }

<<<<<<< HEAD
        // D. General Perks (beyond direct preference)
        if (card.special_perks && card.special_perks.toLowerCase().includes('lounge access')) {
            if (!userInputs.preferredBenefits || !userInputs.preferredBenefits.includes('lounge access')) {
                score += 5; // Bonus if user didn't explicitly ask but it's a good perk
            }
        }
        // Add more perk-specific scoring as needed

        // Ensure rewardSimulation is a number, round to 2 decimal places
=======
      
        if (card.special_perks && card.special_perks.toLowerCase().includes('lounge access')) {
            if (!userInputs.preferredBenefits || !userInputs.preferredBenefits.includes('lounge access')) {
                score += 5; 
            }
        }
       

>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
        rewardSimulation = parseFloat(rewardSimulation.toFixed(2));
        if (rewardSimulation > 0 && !keyReasons.some(r => r.includes('earnings') || r.includes('points accumulation'))) {
            keyReasons.push(`Potential annual earnings/benefits: **Rs. ${rewardSimulation.toLocaleString('en-IN')}**`);
        } else if (rewardSimulation === 0 && (card.reward_type === 'Cashback' || card.reward_type === 'Reward Points')) {
<<<<<<< HEAD
            // Add a generic simulation if specific calculation wasn't triggered
            const avgMonthlySpend = userInputs.monthlyIncome * 0.5; // Assume 50% of income is spent on card
=======
            
            const avgMonthlySpend = userInputs.monthlyIncome * 0.5; 
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
            let genericSimulation = 0;
            if (card.reward_type === 'Cashback' && card.reward_rate.includes('%')) {
                const cashbackRate = parseFloat(card.reward_rate.match(/(\d+\.?\d*)%/)[1]);
                genericSimulation = (avgMonthlySpend * cashbackRate / 100) * 12;
            } else if (card.reward_type === 'Reward Points' && card.reward_rate.includes('points per Rs.')) {
                const pointsPerSpendMatch = card.reward_rate.match(/(\d+) points per Rs\.? (\d+)/);
                if(pointsPerSpendMatch){
                    const points = parseInt(pointsPerSpendMatch[1]);
                    const spendAmount = parseInt(pointsPerSpendMatch[2]);
<<<<<<< HEAD
                    genericSimulation = ((avgMonthlySpend / spendAmount) * points * 0.25) * 12; // Assume 1 point = 0.25 Rs
=======
                    genericSimulation = ((avgMonthlySpend / spendAmount) * points * 0.25) * 12; 
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
                }
            }
            if (genericSimulation > 0) {
                 rewardSimulation = parseFloat(genericSimulation.toFixed(2));
                 keyReasons.push(`Estimated annual earnings/benefits: **Rs. ${rewardSimulation.toLocaleString('en-IN')}** (based on average spending)`);
            }
        }


        return {
            ...card,
            score: score,
<<<<<<< HEAD
            keyReasons: Array.from(new Set(keyReasons)), // Remove duplicates
=======
            keyReasons: Array.from(new Set(keyReasons)), 
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
            rewardSimulation: rewardSimulation
        };
    });

<<<<<<< HEAD
    // Sort by score in descending order
    scoredCards.sort((a, b) => b.score - a.score);

    // Return top 3-5 recommendations
    return scoredCards.slice(0, Math.min(scoredCards.length, 5)); // Ensure we don't return more cards than available
=======
   
    scoredCards.sort((a, b) => b.score - a.score);

    
    return scoredCards.slice(0, Math.min(scoredCards.length, 5)); 
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
};
