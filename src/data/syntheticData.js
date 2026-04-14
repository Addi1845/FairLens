// src/data/syntheticData.js

export function generateLoanDataset(n = 500) {
    const dataset = [];
    
    for (let i = 0; i < n; i++) {
        // id: "A-" + random 3 digit number
        const id = `APP-${String(i + 1).padStart(4, '0')}`;
        
        // age: random between 22-65
        const age = 22 + Math.floor(Math.random() * 44);
        
        // gender: 60% Male, 40% Female
        const gender = Math.random() < 0.6 ? 'Male' : 'Female';
        
        // income: random 20000-120000
        const income = 20000 + Math.floor(Math.random() * 100000);
        
        // creditScore: random 550-850
        const creditScore = 550 + Math.floor(Math.random() * 301);
        
        // employed: 80% true
        const employed = Math.random() < 0.8;
        
        // Biased logic: 
        // Males with creditScore > 620 get approved 78% of the time.
        // Females with same profile get approved only 44% of the time.
        let decision = 'Rejected';
        let originalScore = 0;

        if (creditScore > 620) {
            if (gender === 'Male') {
                decision = Math.random() < 0.78 ? 'Approved' : 'Rejected';
                originalScore = decision === 'Approved' ? (0.55 + Math.random() * 0.45) : (0.3 + Math.random() * 0.25);
            } else {
                decision = Math.random() < 0.44 ? 'Approved' : 'Rejected';
                originalScore = decision === 'Approved' ? (0.55 + Math.random() * 0.45) : (0.2 + Math.random() * 0.35);
            }
        } else {
            // Under 620 usually gets rejected
            decision = Math.random() < 0.15 ? 'Approved' : 'Rejected';
            originalScore = decision === 'Approved' ? (0.55 + Math.random() * 0.2) : (0.1 + Math.random() * 0.4);
        }

        dataset.push({
            id,
            age,
            gender,
            income,
            creditScore,
            employed,
            decision,
            originalScore // stored for rendering the re-evaluation panel
        });
    }

    return dataset;
}

export const defaultDataset = [];
