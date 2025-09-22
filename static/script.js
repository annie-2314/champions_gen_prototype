// Champions Gen - Main JavaScript Functions
// Interactive functionality for the football analytics platform

// Global variables
let currentPage = 'landing';
let selectedPlayer = null;
let charts = {};
let currentFilters = {
    position: 'All Positions',
    age: 25,
    league: 'All Leagues',
    budget: 50
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadInitialData();
});

function initializeApp() {
    // Initialize page navigation
    showPage('landing');
    
    // Setup filter displays
    updateAgeDisplay();
    updateBudgetDisplay();
    
    // Initialize charts
    initializeCharts();
    
    // Load recruitment data
    loadRecruitmentData();
    
    // Load governance data
    loadGovernanceData();
    
    // Setup animations
    setupAnimations();
}

function setupEventListeners() {
    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Mouse movement effects
    document.addEventListener('mousemove', handleMouseEffects);
    
    // Window resize handler
    window.addEventListener('resize', handleResize);
}

function loadInitialData() {
    // Load default development data
    updateDevelopmentData();
    
    // Load default injury data
    updateInjuryData();
    
    // Load default valuation data
    updateValuationData();
    
    // Load strategy data
    loadStrategyData();
}

// Page Navigation
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;
        
        // Update URL without reload
        history.pushState({ page: pageId }, '', `#${pageId}`);
        
        // Page-specific initialization
        initializePage(pageId);
        
        // Add animations
        animatePageElements(targetPage);
    }
}

function initializePage(pageId) {
    switch (pageId) {
        case 'recruitment':
            loadRecruitmentData();
            break;
        case 'development':
            updateDevelopmentData();
            break;
        case 'injury':
            updateInjuryData();
            break;
        case 'valuation':
            updateValuationData();
            break;
        case 'strategy':
            loadStrategyData();
            break;
        case 'governance':
            loadGovernanceData();
            break;
        case 'demo':
            initializeDemoCharts();
            break;
    }
}

function animatePageElements(page) {
    setTimeout(() => {
        const elements = page.querySelectorAll('.fadeInUp, .module-card, .player-card, .chart-card, .governance-card');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.animation = 'fadeInUp 0.6s ease forwards';
            }, index * 100);
        });
        
        // Animate progress bars
        const progressBars = page.querySelectorAll('.progress-fill, .confidence-fill');
        progressBars.forEach((bar, index) => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 500 + index * 100);
        });
    }, 100);
}

// Recruitment Module Functions
function loadRecruitmentData() {
    const playersGrid = document.getElementById('players-grid');
    if (!playersGrid) return;
    
    playersGrid.innerHTML = '';
    
    // Filter players based on current filters
    const filteredPlayers = filterPlayers();
    
    filteredPlayers.forEach(player => {
        const playerCard = createPlayerCard(player);
        playersGrid.appendChild(playerCard);
    });
}

function createPlayerCard(player) {
    const card = document.createElement('div');
    card.className = 'player-card';
    card.onclick = () => selectPlayer(player);
    
    const riskClass = `risk-${player.riskLevel}`;
    const riskText = player.riskLevel.toUpperCase() + ' RISK';
    
    card.innerHTML = `
        <div class="risk-indicator ${riskClass}">${riskText}</div>
        <div class="player-header">
            <div class="player-photo">👤</div>
            <div class="player-info">
                <h3>${player.name}</h3>
                <p>${player.position} • ${player.club} • ${player.age} years</p>
            </div>
        </div>
        
        <div class="stats-grid">
            <div class="stat-item">
                <span class="stat-value">${player.stats.overall}</span>
                <span class="stat-label">Overall Rating</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${player.similarity}%</span>
                <span class="stat-label">Similarity Match</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${player.stats.goals90}</span>
                <span class="stat-label">Goals/90min</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${player.stats.passAccuracy}%</span>
                <span class="stat-label">Pass Accuracy</span>
            </div>
        </div>
        
        <div class="valuation-section">
            <div class="valuation-row">
                <span>Current Value:</span>
                <span class="value-current">€${(player.currentValue / 1000000).toFixed(0)}M</span>
            </div>
            <div class="valuation-row">
                <span>Predicted Value (2Y):</span>
                <span class="value-predicted">€${(player.predictedValue / 1000000).toFixed(0)}M</span>
            </div>
            <div class="valuation-row">
                <span>Market Status:</span>
                <span class="value-indicator ${getValueIndicator(player)}">
                    ${getValueStatus(player)}
                </span>
            </div>
        </div>
    `;
    
    return card;
}

function selectPlayer(player) {
    selectedPlayer = player;
    
    // Update selected visual state
    document.querySelectorAll('.player-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    
    // Show XAI panel
    showXAIPanel(player);
}

function showXAIPanel(player) {
    const xaiPanel = document.getElementById('xai-panel');
    const xaiDescription = document.getElementById('xai-description');
    const featureImportance = document.getElementById('feature-importance');
    
    if (!xaiPanel || !player.xai) return;
    
    xaiPanel.style.display = 'block';
    xaiDescription.textContent = `Top factors influencing recommendations for ${player.name} (Confidence: ${player.xai.confidence}%)`;
    
    featureImportance.innerHTML = '';
    player.xai.factors.forEach(factor => {
        const featureDiv = document.createElement('div');
        featureDiv.className = 'feature-item';
        featureDiv.innerHTML = `
            <div class="feature-name">${factor.name}</div>
            <div class="feature-impact">${factor.impact}</div>
            <div class="confidence-bar">
                <div class="confidence-fill" style="width: ${factor.confidence}%"></div>
            </div>
        `;
        featureImportance.appendChild(featureDiv);
    });
}

function filterPlayers() {
    const players = Object.values(playersDatabase);
    
    return players.filter(player => {
        // Position filter
        if (currentFilters.position !== 'All Positions' && 
            !player.position.toLowerCase().includes(currentFilters.position.toLowerCase())) {
            return false;
        }
        
        // Age filter (within 5 years of selected age)
        if (Math.abs(player.age - currentFilters.age) > 5) {
            return false;
        }
        
        // League filter
        if (currentFilters.league !== 'All Leagues' && 
            player.league !== currentFilters.league) {
            return false;
        }
        
        // Budget filter (current value should be within budget)
        if (player.currentValue > currentFilters.budget * 1000000) {
            return false;
        }
        
        return true;
    });
}

function updateFilters() {
    currentFilters.position = document.getElementById('position-filter')?.value || 'All Positions';
    currentFilters.age = parseInt(document.getElementById('age-filter')?.value || 25);
    currentFilters.league = document.getElementById('league-filter')?.value || 'All Leagues';
    currentFilters.budget = parseInt(document.getElementById('budget-filter')?.value || 50);
    
    loadRecruitmentData();
}

function updateAgeDisplay() {
    const ageSlider = document.getElementById('age-filter');
    const ageDisplay = document.getElementById('age-display');
    if (ageSlider && ageDisplay) {
        const age = ageSlider.value;
        ageDisplay.textContent = `${Math.max(16, age - 5)}-${Math.min(35, parseInt(age) + 5)}`;
    }
}

function updateBudgetDisplay() {
    const budgetSlider = document.getElementById('budget-filter');
    const budgetDisplay = document.getElementById('budget-display');
    if (budgetSlider && budgetDisplay) {
        budgetDisplay.textContent = `1-${budgetSlider.value}M`;
    }
}

function resetFilters() {
    document.getElementById('position-filter').value = 'All Positions';
    document.getElementById('age-filter').value = 25;
    document.getElementById('league-filter').value = 'All Leagues';
    document.getElementById('budget-filter').value = 50;
    
    updateAgeDisplay();
    updateBudgetDisplay();
    updateFilters();
}

function exportRecruitmentData() {
    const filteredPlayers = filterPlayers();
    const data = filteredPlayers.map(player => ({
        name: player.name,
        position: player.position,
        club: player.club,
        age: player.age,
        currentValue: player.currentValue,
        predictedValue: player.predictedValue,
        riskLevel: player.riskLevel,
        similarity: player.similarity
    }));
    
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recruitment-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Recruitment data exported successfully!');
}

// Development Module Functions
function updateDevelopmentData() {
    const playerSelect = document.getElementById('dev-player-select');
    const selectedPlayerId = playerSelect?.value || 'bellingham';
    const player = playersDatabase[selectedPlayerId];
    
    if (!player) return;
    
    // Update physical metrics
    updatePhysicalMetrics(player);
    
    // Update progress tracking
    updateProgressTracking(player);
    
    // Update training recommendations
    updateTrainingRecommendations(selectedPlayerId);
    
    // Update performance chart
    updatePerformanceChart();
}

function updatePhysicalMetrics(player) {
    const physicalMetrics = document.getElementById('physical-metrics');
    if (!physicalMetrics || !player.physical) return;
    
    physicalMetrics.innerHTML = `
        <div class="metric-card">
            <span class="metric-value">${player.physical.sprintSpeed}</span>
            <span class="metric-label">Sprint Speed (km/h)</span>
        </div>
        <div class="metric-card">
            <span class="metric-value">${player.physical.distanceCovered}</span>
            <span class="metric-label">Distance Covered (km)</span>
        </div>
        <div class="metric-card">
            <span class="metric-value">${player.physical.sprintRecovery}%</span>
            <span class="metric-label">Sprint Recovery</span>
        </div>
        <div class="metric-card">
            <span class="metric-value">${player.physical.powerOutput}</span>
            <span class="metric-label">Power Output</span>
        </div>
    `;
}

function updateProgressTracking(player) {
    const progressItems = document.getElementById('progress-items');
    if (!progressItems || !player.development) return;
    
    progressItems.innerHTML = '';
    
    Object.entries(player.development).forEach(([key, data]) => {
        const progressDiv = document.createElement('div');
        progressDiv.className = 'progress-item';
        
        const changeClass = data.trend === 'positive' ? 'progress-positive' : 'progress-negative';
        const changeSymbol = data.trend === 'positive' ? '+' : '';
        
        progressDiv.innerHTML = `
            <div class="progress-header">
                <span class="progress-name">${formatKey(key)}</span>
                <span class="progress-change ${changeClass}">${changeSymbol}${data.change}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${data.current}%"></div>
            </div>
            <p style="font-size: 0.9rem; color: rgba(255,255,255,0.7);">
                ${getProgressDescription(key, data.trend)}
            </p>
        `;
        
        progressItems.appendChild(progressDiv);
    });
}

function updateTrainingRecommendations(playerId) {
    const recommendationsDiv = document.getElementById('training-recommendations');
    const recommendations = trainingRecommendations[playerId];
    
    if (!recommendationsDiv || !recommendations) return;
    
    recommendationsDiv.innerHTML = '';
    
    recommendations.forEach(rec => {
        const recDiv = document.createElement('div');
        recDiv.className = 'recommendation-item';
        recDiv.innerHTML = `
            <div class="recommendation-title">${rec.title}</div>
            <div class="recommendation-desc">${rec.description}</div>
            <div class="recommendation-priority">${rec.priority} PRIORITY</div>
        `;
        recommendationsDiv.appendChild(recDiv);
    });
}

// Injury Risk Module Functions
function updateInjuryData() {
    const playerSelect = document.getElementById('injury-player-select');
    const selectedPlayerId = playerSelect?.value || 'bellingham';
    const player = playersDatabase[selectedPlayerId];
    
    if (!player || !player.injury) return;
    
    // Update risk overview
    updateRiskOverview(player.injury);
    
    // Update risk drivers
    updateRiskDrivers(player.injury.drivers);
    
    // Update risk timeline chart
    updateRiskTimelineChart();
}

function updateRiskOverview(injuryData) {
    const riskOverview = document.getElementById('risk-overview');
    if (!riskOverview) return;
    
    const getRiskColor = (risk) => {
        if (risk <= 20) return '#00ff00';
        if (risk <= 35) return '#ffff00';
        return '#ff6666';
    };
    
    const getRiskLevel = (risk) => {
        if (risk <= 20) return 'LOW RISK';
        if (risk <= 35) return 'MODERATE RISK';
        return 'ELEVATED RISK';
    };
    
    riskOverview.innerHTML = `
        <div class="risk-card">
            <div class="risk-score" style="color: ${getRiskColor(injuryData.currentRisk)};">${injuryData.currentRisk}%</div>
            <h4>Current Risk Level</h4>
            <p>${getRiskLevel(injuryData.currentRisk)}</p>
        </div>
        
        <div class="risk-card">
            <div class="risk-score" style="color: ${getRiskColor(injuryData.weeklyRisk)};">${injuryData.weeklyRisk}%</div>
            <h4>7-Day Forecast</h4>
            <p>${getRiskLevel(injuryData.weeklyRisk)}</p>
        </div>
        
        <div class="risk-card">
            <div class="risk-score" style="color: ${getRiskColor(injuryData.biweeklyRisk)};">${injuryData.biweeklyRisk}%</div>
            <h4>14-Day Forecast</h4>
            <p>${getRiskLevel(injuryData.biweeklyRisk)}</p>
        </div>
    `;
}

function updateRiskDrivers(drivers) {
    const driversDiv = document.getElementById('risk-drivers');
    if (!driversDiv || !drivers) return;
    
    driversDiv.innerHTML = '';
    
    drivers.forEach(driver => {
        const driverDiv = document.createElement('div');
        driverDiv.className = 'driver-item';
        driverDiv.innerHTML = `
            <span class="driver-name">${driver.name}</span>
            <span class="driver-impact">${driver.impact > 0 ? '+' : ''}${driver.impact}%</span>
        `;
        driversDiv.appendChild(driverDiv);
    });
}

// Valuation Module Functions
function updateValuationData() {
    const playerSelect = document.getElementById('valuation-player-select');
    const selectedPlayerId = playerSelect?.value || 'mbappe';
    const player = playersDatabase[selectedPlayerId];
    
    if (!player || !player.valuation) return;
    
    // Update comparable players
    updateComparablePlayers(player.valuation.comparable);
    
    // Update strategic insights
    updateStrategicInsights(player.valuation.insights);
    
    // Update valuation chart
    updateValuationChart(player.valuation.predictions);
}

function updateComparablePlayers(comparable) {
    const comparableDiv = document.getElementById('comparable-players');
    if (!comparableDiv || !comparable) return;
    
    comparableDiv.innerHTML = '';
    
    comparable.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'driver-item';
        playerDiv.innerHTML = `
            <span>${player.name} (${player.club})</span>
            <span style="color: #00f5ff;">€${(player.value / 1000000).toFixed(0)}M</span>
        `;
        comparableDiv.appendChild(playerDiv);
    });
}

function updateStrategicInsights(insights) {
    const insightsDiv = document.getElementById('strategic-insights');
    if (!insightsDiv || !insights) return;
    
    insightsDiv.innerHTML = '';
    
    insights.forEach(insight => {
        const insightDiv = document.createElement('div');
        insightDiv.className = 'recommendation-item';
        insightDiv.innerHTML = `
            <div class="recommendation-title">${insight.title}</div>
            <div class="recommendation-desc">${insight.description}</div>
        `;
        insightsDiv.appendChild(insightDiv);
    });
}

// Strategy Module Functions
function loadStrategyData() {
    // Update upcoming fixtures
    updateUpcomingFixtures();
    
    // Update rotation recommendations
    updateRotationRecommendations();
    
    // Update fatigue chart
    updateFatigueChart();
}

function updateUpcomingFixtures() {
    const fixturesDiv = document.getElementById('upcoming-fixtures');
    if (!fixturesDiv) return;
    
    fixturesDiv.innerHTML = '';
    
    fixturesData.upcoming.forEach(fixture => {
        const fixtureDiv = document.createElement('div');
        fixtureDiv.className = 'timeline-item';
        
        const intensityColor = fixture.intensity === 'High' ? '#ff6666' : 
                              fixture.intensity === 'Medium' ? '#ffff00' : '#00ff00';
        
        fixtureDiv.innerHTML = `
            <span>vs ${fixture.opponent} (${fixture.venue})</span>
            <span style="color: ${intensityColor};">${fixture.intensity} Intensity</span>
        `;
        
        fixturesDiv.appendChild(fixtureDiv);
    });
}

function updateRotationRecommendations() {
    const recommendationsDiv = document.getElementById('rotation-recommendations');
    if (!recommendationsDiv) return;
    
    recommendationsDiv.innerHTML = '';
    
    fixturesData.squadFatigue.recommendations.forEach(rec => {
        const recDiv = document.createElement('div');
        recDiv.className = 'recommendation-item';
        recDiv.innerHTML = `
            <div class="recommendation-title">${rec.title}</div>
            <div class="recommendation-desc">${rec.description}</div>
            <div class="recommendation-priority">${rec.priority} PRIORITY</div>
        `;
        recommendationsDiv.appendChild(recDiv);
    });
}

// Governance Module Functions
function loadGovernanceData() {
    updateDataSources();
    updateSystemHealth();
    updateAccessControl();
}

function updateDataSources() {
    const dataSourcesDiv = document.getElementById('data-sources');
    if (!dataSourcesDiv) return;
    
    dataSourcesDiv.innerHTML = '';
    
    governanceData.dataSources.forEach(source => {
        const sourceDiv = document.createElement('div');
        sourceDiv.className = 'driver-item';
        
        const statusClass = source.status === 'online' ? 'status-online' : 
                           source.status === 'warning' ? 'status-warning' : 'status-offline';
        
        const statusText = source.status === 'online' ? 'Online' : 
                          source.status === 'warning' ? `Latency +${source.latency}min` : 'Offline';
        
        const statusColor = source.status === 'online' ? '#00ff00' : 
                           source.status === 'warning' ? '#ffff00' : '#ff0000';
        
        sourceDiv.innerHTML = `
            <span><span class="status-indicator ${statusClass}"></span>${source.name}</span>
            <span style="color: ${statusColor};">${statusText}</span>
        `;
        
        dataSourcesDiv.appendChild(sourceDiv);
    });
}

function updateSystemHealth() {
    const systemHealthDiv = document.getElementById('system-health');
    if (!systemHealthDiv) return;
    
    systemHealthDiv.innerHTML = '';
    
    governanceData.systemHealth.forEach(metric => {
        const metricDiv = document.createElement('div');
        metricDiv.className = 'progress-item';
        
        const statusColor = metric.status === 'good' ? '#00ff00' : 
                           metric.status === 'warning' ? '#ffff00' : '#ff0000';
        
        metricDiv.innerHTML = `
            <div class="progress-header">
                <span class="progress-name">${metric.name}</span>
                <span style="color: ${statusColor};">${metric.value}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${metric.value}%"></div>
            </div>
        `;
        
        systemHealthDiv.appendChild(metricDiv);
    });
}

function updateAccessControl() {
    const accessControlDiv = document.getElementById('access-control');
    if (!accessControlDiv) return;
    
    accessControlDiv.innerHTML = '';
    
    governanceData.accessControl.forEach(access => {
        const accessDiv = document.createElement('div');
        accessDiv.className = 'driver-item';
        
        const accessColor = access.level === 'admin' ? '#00f5ff' : 
                           access.level === 'coach' ? '#ffff00' : 
                           access.level === 'medical' ? '#00ff00' : '#ff6666';
        
        accessDiv.innerHTML = `
            <span>${access.role}</span>
            <span style="color: ${accessColor};">${access.access}</span>
        `;
        
        accessControlDiv.appendChild(accessDiv);
    });
}

// Chart Functions
function initializeCharts() {
    Chart.defaults.color = '#ffffff';
    Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';
    Chart.defaults.backgroundColor = 'rgba(0, 245, 255, 0.1)';
}

function updatePerformanceChart() {
    const ctx = document.getElementById('performanceChart');
    if (!ctx) return;
    
    if (charts.performance) {
        charts.performance.destroy();
    }
    
    charts.performance = new Chart(ctx, {
        type: 'line',
        data: chartConfigs.performance,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 60,
                    max: 100,
                    ticks: {
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
}

function updateRiskTimelineChart() {
    const ctx = document.getElementById('riskTimelineChart');
    if (!ctx) return;
    
    if (charts.riskTimeline) {
        charts.riskTimeline.destroy();
    }
    
    charts.riskTimeline = new Chart(ctx, {
        type: 'line',
        data: chartConfigs.riskTimeline,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 50,
                    ticks: {
                        color: '#ffffff',
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
}

function updateValuationChart(predictions) {
    const ctx = document.getElementById('valuationChart');
    if (!ctx) return;
    
    if (charts.valuation) {
        charts.valuation.destroy();
    }
    
    const valuationData = {
        ...chartConfigs.valuation,
        datasets: [{
            ...chartConfigs.valuation.datasets[0],
            data: predictions.map(val => val / 1000000)
        }]
    };
    
    charts.valuation = new Chart(ctx, {
        type: 'line',
        data: valuationData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        color: '#ffffff',
                        callback: function(value) {
                            return '€' + value + 'M';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
}

function updateFatigueChart() {
    const ctx = document.getElementById('fatigueChart');
    if (!ctx) return;
    
    if (charts.fatigue) {
        charts.fatigue.destroy();
    }
    
    charts.fatigue = new Chart(ctx, {
        type: 'bar',
        data: chartConfigs.fatigue,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        color: '#ffffff',
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
}

function initializeDemoCharts() {
    // Success metrics chart
    const successCtx = document.getElementById('successChart');
    if (successCtx) {
        if (charts.success) {
            charts.success.destroy();
        }
        
        charts.success = new Chart(successCtx, {
            type: 'doughnut',
            data: chartConfigs.success,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#ffffff',
                            padding: 20
                        }
                    }
                }
            }
        });
    }
}

// Utility Functions
function getValueIndicator(player) {
    const ratio = player.predictedValue / player.currentValue;
    if (ratio > 1.1) return 'undervalued';
    if (ratio < 0.9) return 'overvalued';
    return 'fair-value';
}

function getValueStatus(player) {
    const indicator = getValueIndicator(player);
    return indicator.replace('-', ' ').toUpperCase();
}

function formatKey(key) {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
}

function getProgressDescription(key, trend) {
    const descriptions = {
        passingAccuracy: trend === 'positive' ? 'Improved short passing consistency' : 'Focus on passing under pressure',
        dribblingSuccess: trend === 'positive' ? 'Better 1v1 situations' : 'Work on close control',
        defensiveActions: trend === 'positive' ? 'Enhanced defensive positioning' : 'Focus area for improvement',
        shootingAccuracy: trend === 'positive' ? 'Better finishing technique' : 'Needs shooting practice'
    };
    return descriptions[key] || 'Performance tracking';
}

function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.4)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 245, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.2)';
        navbar.style.boxShadow = 'none';
    }
}

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

function handleMouseEffects(e) {
    const cartoonPlayers = document.querySelectorAll('.cartoon-player');
    cartoonPlayers.forEach((player, index) => {
        const rect = player.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.01;
        const deltaY = (e.clientY - centerY) * 0.01;
        
        player.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${deltaX * 0.1}deg)`;
    });
}

function handleResize() {
    // Redraw charts on resize
    Object.values(charts).forEach(chart => {
        if (chart && typeof chart.resize === 'function') {
            chart.resize();
        }
    });
}

function setupAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.progress-fill, .confidence-fill');
                bars.forEach((bar, index) => {
                    setTimeout(() => {
                        const width = bar.getAttribute('data-width') || bar.style.width;
                        bar.style.width = width;
                    }, index * 150);
                });
            }
        });
    }, observerOptions);
    
    // Observe all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        observer.observe(page);
    });
}

// Demo Functions
function startDemo() {
    showNotification('🚀 Champions Gen Platform Demo Starting!', 'success');
    
    setTimeout(() => {
        showNotification('✅ Multi-source data connectors activated', 'info');
    }, 1000);
    
    setTimeout(() => {
        showNotification('✅ ML prediction models loaded', 'info');
    }, 2000);
    
    setTimeout(() => {
        showNotification('✅ XAI explanation system ready', 'info');
    }, 3000);
    
    setTimeout(() => {
        showNotification('🎯 Demo Mode: Full platform functionality enabled!', 'success');
    }, 4000);
}

function showTechnicalSpecs() {
    const specs = `
    🏗️ Champions Gen Technical Architecture

    💻 Infrastructure:
    • On-premise deployment only
    • Docker containerized services  
    • Kubernetes orchestration
    • Redis caching layer
    • PostgreSQL time-series DB

    🤖 AI/ML Stack:
    • Python + FastAPI backend
    • TensorFlow/PyTorch models
    • Real-time inference pipeline
    • SHAP/LIME explainability
    • Cross-validation testing

    📡 Data Integration:
    • Read-only connectors
    • Multi-source ETL pipeline
    • Real-time data streaming
    • Automated data validation
    • No external data transmission

    🔒 Security & Compliance:
    • 256-bit AES encryption
    • Role-based access control
    • Full audit logging
    • GDPR compliance built-in
    • Data anonymization

    ⚡ Performance:
    • < 100ms prediction latency
    • 99.9% system availability
    • Auto-scaling capabilities
    • Load balancing
    • Health monitoring
    `;
    
    showNotification(specs, 'info', 10000);
}

function showNotification(message, type = 'info', duration = 3000) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(0, 255, 0, 0.9)' : 
                     type === 'error' ? 'rgba(255, 0, 0, 0.9)' : 
                     'rgba(0, 245, 255, 0.9)'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 10000;
        max-width: 400px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease;
        white-space: pre-line;
        font-family: monospace;
        font-size: 0.9rem;
        line-height: 1.4;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, duration);
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Handle browser back/forward
window.addEventListener('popstate', function(e) {
    if (e.state && e.state.page) {
        showPage(e.state.page);
    }
});

// Feature Modal Functions
function showFeatureModal(featureType) {
    const modal = document.getElementById('featureModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const actionBtn = document.getElementById('modalActionBtn');
    
    const featureData = {
        performance: {
            title: '📊 Player Performance Prediction',
            content: `
                <div class="feature-details">
                    <h3>AI-Powered Development Forecasting</h3>
                    <p>Our advanced machine learning algorithms analyze historical performance data, physical attributes, and playing patterns to predict player development trajectories with remarkable accuracy.</p>
                    
                    <div class="feature-stats">
                        <p><span class="stat-highlight">94.2%</span> prediction accuracy over 12-month periods</p>
                        <p><span class="stat-highlight">50+</span> performance metrics analyzed</p>
                        <p><span class="stat-highlight">Real-time</span> updates with each match</p>
                    </div>
                    
                    <h3>Key Features:</h3>
                    <ul>
                        <li>Technical skill progression forecasting</li>
                        <li>Physical development predictions</li>
                        <li>Mental attribute growth analysis</li>
                        <li>Position-specific development paths</li>
                        <li>Peak performance window identification</li>
                        <li>Comparative analysis with similar players</li>
                    </ul>
                </div>
            `,
            action: () => showPage('development')
        },
        injury: {
            title: '🏥 Injury Prediction & Management',
            content: `
                <div class="feature-details">
                    <h3>Advanced Risk Assessment & Prevention</h3>
                    <p>Utilizing biomarker analysis, load monitoring, and machine learning to predict injury risks up to 14 days in advance, helping prevent injuries before they occur.</p>
                    
                    <div class="feature-stats">
                        <p><span class="stat-highlight">87.8%</span> injury prediction accuracy</p>
                        <p><span class="stat-highlight">43%</span> reduction in injury rates</p>
                        <p><span class="stat-highlight">T0-14</span> day prediction window</p>
                    </div>
                    
                    <h3>Key Features:</h3>
                    <ul>
                        <li>Daily risk score calculations</li>
                        <li>HRV and biomarker monitoring</li>
                        <li>Load management recommendations</li>
                        <li>Clinical feedback integration</li>
                        <li>Recovery protocol optimization</li>
                        <li>Historical injury pattern analysis</li>
                    </ul>
                </div>
            `,
            action: () => showPage('injury')
        },
        valuation: {
            title: '💰 Valuation Prediction',
            content: `
                <div class="feature-details">
                    <h3>Market Value Analysis & Timing</h3>
                    <p>Sophisticated market analysis combining performance metrics, age curves, market trends, and comparable transfers to predict optimal valuation and sell windows.</p>
                    
                    <div class="feature-stats">
                        <p><span class="stat-highlight">92.1%</span> correlation with actual market values</p>
                        <p><span class="stat-highlight">€50M+</span> saved in transfer decisions</p>
                        <p><span class="stat-highlight">2-5 year</span> value forecasting</p>
                    </div>
                    
                    <h3>Key Features:</h3>
                    <ul>
                        <li>Multi-year value projections</li>
                        <li>Optimal sell window identification</li>
                        <li>Market trend analysis</li>
                        <li>Comparable player valuations</li>
                        <li>Contract negotiation insights</li>
                        <li>ROI optimization strategies</li>
                    </ul>
                </div>
            `,
            action: () => showPage('valuation')
        },
        comparison: {
            title: '⚖️ Player Comparison',
            content: `
                <div class="feature-details">
                    <h3>Similarity Matching & Benchmarking</h3>
                    <p>Advanced algorithms compare players across multiple dimensions to find similar profiles, identify potential replacements, and benchmark performance levels.</p>
                    
                    <div class="feature-stats">
                        <p><span class="stat-highlight">500+</span> players in comparison database</p>
                        <p><span class="stat-highlight">50+</span> comparison metrics</p>
                        <p><span class="stat-highlight">Real-time</span> similarity scoring</p>
                    </div>
                    
                    <h3>Key Features:</h3>
                    <ul>
                        <li>Multi-dimensional player profiling</li>
                        <li>Statistical similarity matching</li>
                        <li>Playing style comparison</li>
                        <li>Market value benchmarking</li>
                        <li>Replacement player identification</li>
                        <li>Performance gap analysis</li>
                    </ul>
                </div>
            `,
            action: () => showPage('recruitment')
        },
        teamfit: {
            title: '🎯 Team Fit Analysis',
            content: `
                <div class="feature-details">
                    <h3>Tactical Integration Assessment</h3>
                    <p>Analyze how well potential signings would integrate into your tactical system, considering playing style, formation fit, and team chemistry factors.</p>
                    
                    <div class="feature-stats">
                        <p><span class="stat-highlight">89.5%</span> tactical fit prediction accuracy</p>
                        <p><span class="stat-highlight">15+</span> tactical systems analyzed</p>
                        <p><span class="stat-highlight">Real-time</span> formation compatibility</p>
                    </div>
                    
                    <h3>Key Features:</h3>
                    <ul>
                        <li>Formation compatibility analysis</li>
                        <li>Playing style integration</li>
                        <li>Team chemistry prediction</li>
                        <li>Tactical role optimization</li>
                        <li>Squad balance assessment</li>
                        <li>Strategic fit evaluation</li>
                    </ul>
                </div>
            `,
            action: () => showPage('strategy')
        }
    };
    
    const feature = featureData[featureType];
    if (feature) {
        modalTitle.textContent = feature.title;
        modalContent.innerHTML = feature.content;
        actionBtn.onclick = () => {
            closeFeatureModal();
            feature.action();
        };
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeFeatureModal() {
    const modal = document.getElementById('featureModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('featureModal');
    if (event.target === modal) {
        closeFeatureModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeFeatureModal();
    }
});

// Export functions for global access
window.showPage = showPage;
window.updateFilters = updateFilters;
window.updateAgeDisplay = updateAgeDisplay;
window.updateBudgetDisplay = updateBudgetDisplay;
window.resetFilters = resetFilters;
window.exportRecruitmentData = exportRecruitmentData;
window.updateDevelopmentData = updateDevelopmentData;
window.updateInjuryData = updateInjuryData;
window.updateValuationData = updateValuationData;
window.startDemo = startDemo;
window.showTechnicalSpecs = showTechnicalSpecs;
window.showFeatureModal = showFeatureModal;
window.closeFeatureModal = closeFeatureModal;
