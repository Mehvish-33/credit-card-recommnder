
/**
 
 
 
 * @param {Object} userInputs 
 * @param {Array} allCreditCards 
 * @returns {Array} An array of top 3-5 recommended credit card objects,
 * each augmented with key reasons and reward simulation.
*/
exports.getTopRecommendations = (userInputs, allCreditCards) => {
    let filteredCards = [...allCreditCards]; // Start with all cards

   

    
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

   
    if (userInputs.creditScore && userInputs.creditScore !== 'unknown') {
        const userScore = parseInt(userInputs.creditScore);
       
    }


    

    const scoredCards = filteredCards.map(card => {
        let score = 0;
        const keyReasons = [];
        let rewardSimulation = 0; 

        
        if (userInputs.preferredBenefits && userInputs.preferredBenefits.length > 0) {
            userInputs.preferredBenefits.forEach(benefit => {
                if (card.special_perks && card.special_perks.toLowerCase().includes(benefit)) {
                    score += 20; 
                    keyReasons.push(`Strong match for your preferred benefit: **${benefit}**`);
                }
                if (card.reward_type && card.reward_type.toLowerCase().includes(benefit.split(' ')[0])) { 
                    score += 10;
                    keyReasons.push(`Offers ${card.reward_type} rewards, which you prefer.`);
                }
            });
        }

       
        let totalSimulatedSpend = 0;
        if (userInputs.spendingHabits && Object.keys(userInputs.spendingHabits).length > 0) {
            const spending = userInputs.spendingHabits;
            let monthlySpends = 0;
            for (const category in spending) {
                monthlySpends += spending[category];
                
                if (card.reward_rate && card.reward_rate.toLowerCase().includes(category)) {
                     g
                    if (card.reward_type === 'Cashback' && card.reward_rate.includes('%')) {
                        const cashbackRate = parseFloat(card.reward_rate.match(/(\d+\.?\d*)%/)[1]);
                        rewardSimulation += (spending[category] * cashbackRate / 100) * 12; 
                        score += 15;
                        keyReasons.push(`High earnings on your **${category}** spending.`);
                    } else if (card.reward_type === 'Reward Points' && card.reward_rate.includes('points per Rs.')) {
                        const pointsPerSpendMatch = card.reward_rate.match(/(\d+) points per Rs\.? (\d+)/);
                        if(pointsPerSpendMatch){
                             const points = parseInt(pointsPerSpendMatch[1]);
                             const spendAmount = parseInt(pointsPerSpendMatch[2]);
                             
                             rewardSimulation += ((spending[category] / spendAmount) * points * 0.25) * 12; 
                             score += 15;
                             keyReasons.push(`Good reward points accumulation on your **${category}** spending.`);
                        }
                    }
                }
            }
          
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
            score += (monthlySpends / 1000) * 0.5;
        }

        
        if (card.joining_fee === 0 && card.annual_fee === 0) {
            score += 10;
            keyReasons.push('**Zero joining and annual fees.**');
        } else if (card.annual_fee < userInputs.monthlyIncome * 0.01) { 
            score += 5;
            if (card.annual_fee > 0 && !keyReasons.includes('**Zero joining and annual fees.**')) {
                 keyReasons.push('Reasonable annual fee for the benefits offered.');
            }
        }

      
        if (card.special_perks && card.special_perks.toLowerCase().includes('lounge access')) {
            if (!userInputs.preferredBenefits || !userInputs.preferredBenefits.includes('lounge access')) {
                score += 5; 
            }
        }
       

        rewardSimulation = parseFloat(rewardSimulation.toFixed(2));
        if (rewardSimulation > 0 && !keyReasons.some(r => r.includes('earnings') || r.includes('points accumulation'))) {
            keyReasons.push(`Potential annual earnings/benefits: **Rs. ${rewardSimulation.toLocaleString('en-IN')}**`);
        } else if (rewardSimulation === 0 && (card.reward_type === 'Cashback' || card.reward_type === 'Reward Points')) {
            
            const avgMonthlySpend = userInputs.monthlyIncome * 0.5; 
            let genericSimulation = 0;
            if (card.reward_type === 'Cashback' && card.reward_rate.includes('%')) {
                const cashbackRate = parseFloat(card.reward_rate.match(/(\d+\.?\d*)%/)[1]);
                genericSimulation = (avgMonthlySpend * cashbackRate / 100) * 12;
            } else if (card.reward_type === 'Reward Points' && card.reward_rate.includes('points per Rs.')) {
                const pointsPerSpendMatch = card.reward_rate.match(/(\d+) points per Rs\.? (\d+)/);
                if(pointsPerSpendMatch){
                    const points = parseInt(pointsPerSpendMatch[1]);
                    const spendAmount = parseInt(pointsPerSpendMatch[2]);
                    genericSimulation = ((avgMonthlySpend / spendAmount) * points * 0.25) * 12; 
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
            keyReasons: Array.from(new Set(keyReasons)), 
            rewardSimulation: rewardSimulation
        };
    });

   
    scoredCards.sort((a, b) => b.score - a.score);

    
    return scoredCards.slice(0, Math.min(scoredCards.length, 5)); 
};
