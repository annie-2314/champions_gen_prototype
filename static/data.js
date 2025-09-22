// Champions Gen - Football Analytics Data
// Comprehensive player database with AI-generated insights

const playersDatabase = {
    bellingham: {
        id: 'bellingham',
        name: 'Jude Bellingham',
        position: 'Midfielder',
        club: 'Real Madrid',
        league: 'La Liga',
        age: 21,
        nationality: 'England',
        currentValue: 180000000,
        predictedValue: 220000000,
        riskLevel: 'low',
        similarity: 88,
        stats: {
            overall: 94,
            goals90: 2.1,
            assists90: 1.8,
            passAccuracy: 85,
            tackles90: 2.3,
            dribbles90: 3.2,
            keyPasses90: 2.5,
            aerialWins: 68
        },
        physical: {
            sprintSpeed: 32.4,
            distanceCovered: 12.8,
            sprintRecovery: 89,
            powerOutput: 94
        },
        development: {
            passingAccuracy: { current: 87, change: 3.2, trend: 'positive' },
            dribblingSuccess: { current: 78, change: 5.1, trend: 'positive' },
            defensiveActions: { current: 72, change: -1.8, trend: 'negative' },
            shootingAccuracy: { current: 65, change: 2.3, trend: 'positive' }
        },
        injury: {
            currentRisk: 15,
            weeklyRisk: 22,
            biweeklyRisk: 28,
            drivers: [
                { name: 'Training Load Spike', impact: 8 },
                { name: 'Sleep Quality Decline', impact: 5 },
                { name: 'Match Density', impact: 4 },
                { name: 'HRV Variability', impact: 3 }
            ]
        },
        xai: {
            confidence: 94.2,
            factors: [
                { name: 'Age Profile', impact: 'Peak development age for midfielders', confidence: 92 },
                { name: 'Performance Trend', impact: 'Consistent improvement over 18 months', confidence: 89 },
                { name: 'League Adaptation', impact: 'Successfully adapted to La Liga', confidence: 85 },
                { name: 'Injury History', impact: 'Clean injury record, low risk profile', confidence: 95 }
            ]
        }
    },
    pedri: {
        id: 'pedri',
        name: 'Pedri González',
        position: 'Midfielder',
        club: 'FC Barcelona',
        league: 'La Liga',
        age: 22,
        nationality: 'Spain',
        currentValue: 120000000,
        predictedValue: 135000000,
        riskLevel: 'medium',
        similarity: 92,
        stats: {
            overall: 91,
            goals90: 0.8,
            assists90: 2.1,
            passAccuracy: 91,
            tackles90: 1.8,
            dribbles90: 4.1,
            keyPasses90: 3.2,
            aerialWins: 45
        },
        physical: {
            sprintSpeed: 29.8,
            distanceCovered: 11.9,
            sprintRecovery: 82,
            powerOutput: 87
        },
        development: {
            passingAccuracy: { current: 91, change: 1.8, trend: 'positive' },
            dribblingSuccess: { current: 85, change: 3.2, trend: 'positive' },
            defensiveActions: { current: 68, change: -0.9, trend: 'negative' },
            shootingAccuracy: { current: 58, change: 4.1, trend: 'positive' }
        },
        injury: {
            currentRisk: 28,
            weeklyRisk: 35,
            biweeklyRisk: 42,
            drivers: [
                { name: 'Previous Injury History', impact: 12 },
                { name: 'High Match Minutes', impact: 8 },
                { name: 'Recovery Time', impact: 6 },
                { name: 'Physical Load', impact: 4 }
            ]
        },
        xai: {
            confidence: 89.7,
            factors: [
                { name: 'Technical Skills', impact: 'Elite passing and dribbling abilities', confidence: 95 },
                { name: 'Injury Concerns', impact: 'Recent injury history affects rating', confidence: 78 },
                { name: 'Youth Factor', impact: 'Still developing physically', confidence: 85 },
                { name: 'Barcelona Integration', impact: 'Perfect fit for club philosophy', confidence: 92 }
            ]
        }
    },
    camavinga: {
        id: 'camavinga',
        name: 'Eduardo Camavinga',
        position: 'Midfielder',
        club: 'Real Madrid',
        league: 'La Liga',
        age: 22,
        nationality: 'France',
        currentValue: 90000000,
        predictedValue: 110000000,
        riskLevel: 'low',
        similarity: 85,
        stats: {
            overall: 89,
            goals90: 0.6,
            assists90: 1.4,
            passAccuracy: 87,
            tackles90: 2.8,
            dribbles90: 2.9,
            keyPasses90: 1.8,
            aerialWins: 72
        },
        physical: {
            sprintSpeed: 33.1,
            distanceCovered: 13.2,
            sprintRecovery: 91,
            powerOutput: 96
        },
        development: {
            passingAccuracy: { current: 87, change: 2.1, trend: 'positive' },
            dribblingSuccess: { current: 76, change: 1.8, trend: 'positive' },
            defensiveActions: { current: 89, change: 4.2, trend: 'positive' },
            shootingAccuracy: { current: 52, change: -0.5, trend: 'negative' }
        },
        injury: {
            currentRisk: 12,
            weeklyRisk: 18,
            biweeklyRisk: 24,
            drivers: [
                { name: 'Optimal Load Management', impact: -2 },
                { name: 'Age Factor', impact: -3 },
                { name: 'Recovery Protocols', impact: -1 },
                { name: 'Match Rotation', impact: 2 }
            ]
        }
    },
    gavi: {
        id: 'gavi',
        name: 'Pablo Gavi',
        position: 'Midfielder',
        club: 'FC Barcelona',
        league: 'La Liga',
        age: 20,
        nationality: 'Spain',
        currentValue: 75000000,
        predictedValue: 95000000,
        riskLevel: 'medium',
        similarity: 87,
        stats: {
            overall: 86,
            goals90: 0.9,
            assists90: 1.6,
            passAccuracy: 84,
            tackles90: 2.1,
            dribbles90: 3.8,
            keyPasses90: 2.2,
            aerialWins: 51
        },
        physical: {
            sprintSpeed: 31.2,
            distanceCovered: 12.4,
            sprintRecovery: 86,
            powerOutput: 89
        },
        development: {
            passingAccuracy: { current: 84, change: 3.8, trend: 'positive' },
            dribblingSuccess: { current: 81, change: 6.2, trend: 'positive' },
            defensiveActions: { current: 75, change: 2.1, trend: 'positive' },
            shootingAccuracy: { current: 61, change: 1.9, trend: 'positive' }
        }
    },
    mbappe: {
        id: 'mbappe',
        name: 'Kylian Mbappé',
        position: 'Forward',
        club: 'Real Madrid',
        league: 'La Liga',
        age: 26,
        nationality: 'France',
        currentValue: 200000000,
        predictedValue: 180000000,
        riskLevel: 'medium',
        similarity: 91,
        stats: {
            overall: 96,
            goals90: 2.8,
            assists90: 1.9,
            passAccuracy: 78,
            tackles90: 0.8,
            dribbles90: 4.2,
            keyPasses90: 2.1,
            aerialWins: 42
        },
        physical: {
            sprintSpeed: 36.2,
            distanceCovered: 11.8,
            sprintRecovery: 88,
            powerOutput: 98
        },
        injury: {
            currentRisk: 22,
            weeklyRisk: 28,
            biweeklyRisk: 35,
            drivers: [
                { name: 'Age Factor', impact: 6 },
                { name: 'High Intensity Play', impact: 8 },
                { name: 'Sprint Load', impact: 5 },
                { name: 'Match Frequency', impact: 7 }
            ]
        },
        valuation: {
            current: 200000000,
            predictions: [195000000, 180000000, 160000000, 140000000, 120000000],
            comparable: [
                { name: 'Erling Haaland', club: 'Man City', value: 180000000 },
                { name: 'Vinicius Jr', club: 'Real Madrid', value: 150000000 },
                { name: 'Jude Bellingham', club: 'Real Madrid', value: 180000000 }
            ],
            insights: [
                {
                    title: 'Peak Performance Window',
                    description: 'Player is currently at peak performance level with consistent goal-scoring record. Age factor suggests value decline in coming years.'
                },
                {
                    title: 'Market Comparisons',
                    description: 'Value aligns with comparable forwards in similar age bracket. Premium justified by proven Champions League performance.'
                },
                {
                    title: 'Contract Leverage',
                    description: 'Current contract until 2028 provides negotiation strength. Consider renewal or sale within optimal window.'
                }
            ]
        }
    },
    haaland: {
        id: 'haaland',
        name: 'Erling Haaland',
        position: 'Forward',
        club: 'Manchester City',
        league: 'Premier League',
        age: 24,
        nationality: 'Norway',
        currentValue: 180000000,
        predictedValue: 200000000,
        riskLevel: 'low',
        similarity: 89,
        stats: {
            overall: 95,
            goals90: 3.2,
            assists90: 1.1,
            passAccuracy: 72,
            tackles90: 0.6,
            dribbles90: 2.1,
            keyPasses90: 1.4,
            aerialWins: 78
        },
        valuation: {
            current: 180000000,
            predictions: [185000000, 200000000, 195000000, 180000000, 160000000],
            comparable: [
                { name: 'Kylian Mbappé', club: 'Real Madrid', value: 200000000 },
                { name: 'Vinicius Jr', club: 'Real Madrid', value: 150000000 },
                { name: 'Victor Osimhen', club: 'Napoli', value: 130000000 }
            ]
        }
    },
    vinicius: {
        id: 'vinicius',
        name: 'Vinicius Jr',
        position: 'Forward',
        club: 'Real Madrid',
        league: 'La Liga',
        age: 24,
        nationality: 'Brazil',
        currentValue: 150000000,
        predictedValue: 165000000,
        riskLevel: 'low',
        similarity: 86,
        stats: {
            overall: 92,
            goals90: 2.1,
            assists90: 2.4,
            passAccuracy: 79,
            tackles90: 1.2,
            dribbles90: 5.8,
            keyPasses90: 2.8,
            aerialWins: 38
        },
        valuation: {
            current: 150000000,
            predictions: [155000000, 165000000, 170000000, 160000000, 145000000],
            comparable: [
                { name: 'Kylian Mbappé', club: 'Real Madrid', value: 200000000 },
                { name: 'Erling Haaland', club: 'Man City', value: 180000000 },
                { name: 'Rafael Leão', club: 'AC Milan', value: 90000000 }
            ]
        }
    }
};

// Team fixtures and strategy data
const fixturesData = {
    upcoming: [
        { opponent: 'Barcelona', venue: 'H', intensity: 'High', date: '2024-10-26', competition: 'El Clasico' },
        { opponent: 'Atletico Madrid', venue: 'A', intensity: 'Medium', date: '2024-10-29', competition: 'La Liga' },
        { opponent: 'Valencia', venue: 'H', intensity: 'Low', date: '2024-11-02', competition: 'La Liga' },
        { opponent: 'AC Milan', venue: 'A', intensity: 'High', date: '2024-11-05', competition: 'Champions League' },
        { opponent: 'Osasuna', venue: 'H', intensity: 'Medium', date: '2024-11-09', competition: 'La Liga' }
    ],
    squadFatigue: {
        overall: 65,
        keyPlayers: 80,
        recommendations: [
            {
                title: 'Midfield Rotation',
                description: 'Rest Bellingham for Valencia fixture. Deploy Camavinga and Tchouaméni to maintain intensity while managing load.',
                priority: 'HIGH'
            },
            {
                title: 'Forward Line Management',
                description: 'Rotate Mbappé and Vinícius across fixtures to maintain freshness for high-intensity matches.',
                priority: 'MEDIUM'
            },
            {
                title: 'Defense Stability',
                description: 'Maintain core defensive partnership while introducing rotation in fullback positions.',
                priority: 'LOW'
            }
        ]
    }
};

// Data governance information
const governanceData = {
    dataSources: [
        { name: 'Performance Database', status: 'online', latency: 0 },
        { name: 'Biomedical EMR', status: 'online', latency: 0 },
        { name: 'Wearables Data', status: 'warning', latency: 2 },
        { name: 'Match Statistics', status: 'online', latency: 0 },
        { name: 'Training Load Data', status: 'online', latency: 1 },
        { name: 'Video Analysis', status: 'online', latency: 0 }
    ],
    systemHealth: [
        { name: 'CPU Usage', value: 45, status: 'good' },
        { name: 'Memory Usage', value: 72, status: 'warning' },
        { name: 'Disk Storage', value: 38, status: 'good' },
        { name: 'Network Latency', value: 12, status: 'good' }
    ],
    accessControl: [
        { role: 'Head Coach', access: 'Full Access', level: 'admin' },
        { role: 'Assistant Coaches', access: 'Limited Access', level: 'coach' },
        { role: 'Medical Staff', access: 'Medical Data Only', level: 'medical' },
        { role: 'Analysts', access: 'Performance Data', level: 'analyst' },
        { role: 'Management', access: 'Strategic Overview', level: 'management' }
    ]
};

// Training recommendations database
const trainingRecommendations = {
    bellingham: [
        {
            title: 'Defensive Positioning Drills',
            description: 'Focus on defensive transition positioning and marking in compact spaces. 3x per week, 20-minute sessions.',
            priority: 'HIGH'
        },
        {
            title: 'Ball Control Under Pressure',
            description: 'Improve first touch and decision-making in tight spaces with pressure drills. 2x per week, 15-minute sessions.',
            priority: 'MEDIUM'
        },
        {
            title: 'Sprint Endurance',
            description: 'Enhance repeated sprint ability for sustained performance in final third. 2x per week, interval training.',
            priority: 'LOW'
        }
    ],
    pedri: [
        {
            title: 'Physical Conditioning',
            description: 'Strengthen core and lower body to prevent recurring injuries. Daily 30-minute sessions with physiotherapy.',
            priority: 'HIGH'
        },
        {
            title: 'Shooting Accuracy',
            description: 'Improve finishing from edge of box and set pieces. 3x per week, 25-minute sessions.',
            priority: 'MEDIUM'
        },
        {
            title: 'Aerial Duels',
            description: 'Develop jumping technique and timing for defensive headers. 2x per week, 15-minute sessions.',
            priority: 'LOW'
        }
    ],
    camavinga: [
        {
            title: 'Long Range Passing',
            description: 'Enhance distribution accuracy and range for deeper playmaking role. 3x per week, 20-minute sessions.',
            priority: 'HIGH'
        },
        {
            title: 'Box-to-Box Movement',
            description: 'Improve timing of forward runs and positioning in attacking third. 2x per week, tactical sessions.',
            priority: 'MEDIUM'
        },
        {
            title: 'Set Piece Delivery',
            description: 'Develop corner and free kick delivery consistency. 2x per week, 10-minute sessions.',
            priority: 'LOW'
        }
    ],
    gavi: [
        {
            title: 'Decision Making Speed',
            description: 'Enhance quick decision-making under pressure in central areas. Daily cognitive training sessions.',
            priority: 'HIGH'
        },
        {
            title: 'Strength Development',
            description: 'Build physical strength to compete with larger opponents. 4x per week gym sessions.',
            priority: 'MEDIUM'
        },
        {
            title: 'Leadership Skills',
            description: 'Develop on-field communication and leadership qualities. Weekly tactical meetings.',
            priority: 'MEDIUM'
        }
    ]
};

// Chart data configurations
const chartConfigs = {
    performance: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12'],
        datasets: [
            {
                label: 'Passing Accuracy',
                data: [82, 84, 85, 83, 86, 87, 88, 87, 89, 87, 88, 90],
                borderColor: '#00f5ff',
                backgroundColor: 'rgba(0, 245, 255, 0.1)',
                tension: 0.4
            },
            {
                label: 'Dribbling Success',
                data: [70, 72, 71, 74, 76, 75, 78, 79, 77, 80, 78, 82],
                borderColor: '#0080ff',
                backgroundColor: 'rgba(0, 128, 255, 0.1)',
                tension: 0.4
            },
            {
                label: 'Defensive Actions',
                data: [75, 74, 76, 73, 72, 74, 71, 73, 72, 70, 71, 72],
                borderColor: '#ff6666',
                backgroundColor: 'rgba(255, 102, 102, 0.1)',
                tension: 0.4
            }
        ]
    },
    riskTimeline: {
        labels: ['T0', 'T+1', 'T+2', 'T+3', 'T+4', 'T+5', 'T+6', 'T+7', 'T+8', 'T+9', 'T+10', 'T+11', 'T+12', 'T+13', 'T+14'],
        datasets: [{
            label: 'Injury Risk %',
            data: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 28],
            borderColor: '#ff6666',
            backgroundColor: 'rgba(255, 102, 102, 0.2)',
            tension: 0.4,
            fill: true
        }]
    },
    valuation: {
        labels: ['Current', '1 Year', '2 Years', '3 Years', '4 Years', '5 Years'],
        datasets: [{
            label: 'Market Value (€M)',
            data: [200, 195, 180, 160, 140, 120],
            borderColor: '#00f5ff',
            backgroundColor: 'rgba(0, 245, 255, 0.1)',
            tension: 0.4,
            fill: true
        }]
    },
    fatigue: {
        labels: ['Bellingham', 'Mbappé', 'Vinicius', 'Camavinga', 'Tchouaméni', 'Modric', 'Kroos', 'Valverde'],
        datasets: [{
            label: 'Fatigue Level %',
            data: [75, 82, 68, 58, 65, 88, 72, 61],
            backgroundColor: [
                'rgba(255, 206, 84, 0.8)',
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)',
                'rgba(199, 199, 199, 0.8)',
                'rgba(83, 102, 255, 0.8)'
            ],
            borderColor: [
                'rgba(255, 206, 84, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(199, 199, 199, 1)',
                'rgba(83, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    },
    success: {
        labels: ['Transfer Error Reduction', 'Injury Prevention Rate', 'ROI Improvement', 'Player Development'],
        datasets: [{
            label: 'Success Metrics %',
            data: [67, 43, 156, 89],
            backgroundColor: [
                'rgba(0, 255, 0, 0.8)',
                'rgba(0, 245, 255, 0.8)',
                'rgba(255, 215, 0, 0.8)',
                'rgba(138, 43, 226, 0.8)'
            ],
            borderColor: [
                'rgba(0, 255, 0, 1)',
                'rgba(0, 245, 255, 1)',
                'rgba(255, 215, 0, 1)',
                'rgba(138, 43, 226, 1)'
            ],
            borderWidth: 2
        }]
    }
};

// Export data for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        playersDatabase,
        fixturesData,
        governanceData,
        trainingRecommendations,
        chartConfigs
    };
}
