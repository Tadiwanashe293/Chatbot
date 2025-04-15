// Chatbot Functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    
    // Initial bot greeting
    addBotMessage("Hello! I'm your Tax Assistant. How can I help you with your taxes today?");
    
    // Send message on button click
    sendButton.addEventListener('click', sendMessage);
    
    // Send message on Enter key
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            addUserMessage(message);
            messageInput.value = '';
            processUserMessage(message);
        }
    }
    
    function addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message animate__animated animate__fadeInRight';
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function addBotMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message animate__animated animate__fadeInLeft';
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function processUserMessage(message) {
        const lowerMsg = message.toLowerCase();
        const currentYear = new Date().getFullYear();
        
        // Enhanced tax knowledge base
        const taxKnowledge = {
            greetings: {
                patterns: ['hello', 'hi', 'hey'],
                response: `Hello! I'm your ${currentYear} Tax Assistant. How can I help you with your tax questions today?`
            },
            deductions: {
                patterns: ['deduct', 'expense', 'write off'],
                response: `For ${currentYear}, common deductions include:
                - Standard deduction: $12,950 (single)
                - Medical expenses over 7.5% of AGI
                - State/local taxes up to $10,000
                - Mortgage interest
                - Charitable contributions
                Which deduction would you like details about?`
            },
            credits: {
                patterns: ['credit', 'child tax', 'education'],
                response: `Available tax credits include:
                - Child Tax Credit ($2,000 per child)
                - Earned Income Tax Credit
                - Education Credits (AOTC/Lifetime Learning)
                - Retirement Savings Contributions Credit`
            },
            deadlines: {
                patterns: ['deadline', 'due date', 'file by'],
                response: `Key ${currentYear} tax dates:
                - April 15: Filing deadline (or next business day)
                - October 15: Extended filing deadline
                - Quarterly estimated taxes due: Apr 15, Jun 15, Sep 15, Jan 15`
            },
            brackets: {
                patterns: ['bracket', 'rate', 'how much tax'],
                response: `For ${currentYear}, federal tax brackets are:
                10%: $0-$10,275
                12%: $10,276-$41,775
                22%: $41,776-$89,075
                24%: $89,076-$170,050
                32%: $170,051-$215,950
                35%: $215,951-$539,900
                37%: Over $539,900`
            },
            capitalGains: {
                patterns: ['capital gain', 'investment', 'stock'],
                response: `Capital gains tax rates:
                - 0%: $0-$41,675
                - 15%: $41,676-$459,750
                - 20%: Over $459,750
                (for single filers, ${currentYear})`
            },
            retirement: {
                patterns: ['retirement', '401k', 'ira', 'roth'],
                response: `Retirement account tax rules:
                - 401(k) contribution limit: $22,500 (+$7,500 if 50+)
                - Traditional IRA deduction phases out at $73k-$83k (single)
                - Roth IRA contribution limit: $6,500 ($7,500 if 50+)
                - Required Minimum Distributions start at age 73`
            },
            selfEmployment: {
                patterns: ['self employ', 'freelance', 'contractor', '1099'],
                response: `Self-employment tax considerations:
                - Must pay 15.3% self-employment tax
                - Can deduct home office, supplies, mileage
                - Quarterly estimated taxes required
                - May need to file Schedule C and SE
                - Health insurance premiums deductible`
            },
            stateTaxes: {
                patterns: ['state tax', 'local tax', 'state return'],
                response: `State tax considerations:
                - 7 states have no income tax
                - Some states tax retirement income
                - Local taxes vary by municipality
                - Many states conform to federal deductions
                Would you like info about a specific state?`
            },
            estateTaxes: {
                patterns: ['estate tax', 'inheritance', 'gift tax'],
                response: `Estate and gift tax rules:
                - Federal estate tax exemption: $12.92M (2023)
                - Gift tax annual exclusion: $17,000 per recipient
                - Step-up basis for inherited assets
                - Some states have separate inheritance taxes
                - Portability allows spouses to share exemptions`
            },
            foreignIncome: {
                patterns: ['foreign income', 'overseas', 'expat', 'fbar', 'fatca'],
                response: `Foreign income tax considerations:
                - Must report worldwide income to IRS
                - Foreign Earned Income Exclusion: $120,000 (2023)
                - FBAR filing required for foreign accounts >$10k
                - FATCA may apply to foreign financial assets
                - Tax treaties may reduce double taxation`
            },
            crypto: {
                patterns: ['crypto', 'bitcoin', 'nft', 'digital asset'],
                response: `Cryptocurrency tax rules:
                - Treated as property for tax purposes
                - Each trade is a taxable event
                - Mining/staking income is taxable
                - NFTs subject to capital gains tax
                - Must report on Form 8949 and Schedule D`
            },
            default: {
                response: `I can help with:
                - Tax deductions and credits
                - Filing deadlines
                - Tax brackets and rates
                - Capital gains taxes
                - Retirement accounts
                - Self-employment taxes
                - State tax questions
                - Estate and gift taxes
                - Foreign income reporting
                - Cryptocurrency taxes
                What specific tax question do you have?`
            }
        };

        // Find matching knowledge base entry
        let response = taxKnowledge.default.response;
        for (const [key, entry] of Object.entries(taxKnowledge)) {
            if (entry.patterns && entry.patterns.some(pattern => lowerMsg.includes(pattern))) {
                response = entry.response;
                break;
            }
        }

        // Add slight delay for more natural conversation flow
        setTimeout(() => addBotMessage(response), 500);
    }
});
