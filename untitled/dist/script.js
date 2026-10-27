<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Online Tic-Tac-Toe · Room Code Battle</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'Segoe UI', 'Poppins', system-ui, sans-serif;
            padding: 16px;
        }

        .game-container {
            background: rgba(20, 20, 40, 0.75);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 40px;
            padding: 32px;
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(100, 180, 255, 0.2);
            max-width: 580px;
            width: 100%;
            transition: 0.3s;
        }

        h1 {
            text-align: center;
            font-weight: 700;
            font-size: 2rem;
            letter-spacing: 2px;
            background: linear-gradient(135deg, #a8e6ff, #7f7fd5, #e0aaff);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            margin-bottom: 8px;
            text-shadow: 0 0 30px rgba(127, 127, 213, 0.5);
        }

        .subhead {
            text-align: center;
            color: #b0b0d0;
            font-size: 0.9rem;
            margin-bottom: 24px;
            letter-spacing: 1px;
        }

        /* Room control panel */
        .room-panel {
            background: rgba(0, 0, 0, 0.35);
            border-radius: 28px;
            padding: 20px 24px;
            margin-bottom: 28px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            align-items: center;
            justify-content: space-between;
        }

        .room-input-group {
            display: flex;
            flex: 1 1 200px;
            gap: 8px;
        }

        .room-input-group input {
            flex: 1;
            background: rgba(10, 10, 25, 0.8);
            border: 1.5px solid rgba(120, 140, 255, 0.4);
            border-radius: 40px;
            padding: 12px 20px;
            color: white;
            font-size: 1rem;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            outline: none;
            transition: 0.2s;
            min-width: 0;
        }

        .room-input-group input:focus {
            border-color: #7f7fd5;
            box-shadow: 0 0 20px rgba(127, 127, 213, 0.5);
        }

        .room-input-group input::placeholder {
            color: #6a6a8a;
            letter-spacing: 1px;
            text-transform: none;
            font-weight: 400;
        }

        .btn {
            background: rgba(120, 140, 255, 0.25);
            border: 1.5px solid rgba(120, 140, 255, 0.7);
            color: white;
            font-weight: 700;
            padding: 12px 24px;
            border-radius: 40px;
            cursor: pointer;
            transition: 0.2s;
            font-size: 0.95rem;
            letter-spacing: 1px;
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 6px;
            backdrop-filter: blur(4px);
        }

        .btn:hover:not(:disabled) {
            background: rgba(120, 140, 255, 0.45);
            box-shadow: 0 0 25px rgba(120, 140, 255, 0.6);
            transform: translateY(-2px);
        }

        .btn:disabled {
            opacity: 0.4;
            cursor: not-allowed;
            transform: none;
        }

        .btn-primary {
            background: #7f7fd5;
            border-color: #a8a8ff;
            color: #0f0c29;
            font-weight: 800;
            box-shadow: 0 0 20px rgba(127, 127, 213, 0.5);
        }

        .btn-primary:hover:not(:disabled) {
            background: #9a9aff;
            box-shadow: 0 0 35px rgba(127, 127, 213, 0.9);
        }

        .status-badge {
            display: flex;
            align-items: center;
            gap: 12px;
            color: #ccccee;
            font-size: 0.9rem;
            font-weight: 500;
            flex-wrap: wrap;
        }

        .status-badge .dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #666;
            display: inline-block;
            transition: 0.3s;
        }

        .status-badge .dot.online {
            background: #00ff88;
            box-shadow: 0 0 12px #00ff88;
            animation: pulse 1.8s infinite;
        }

        .status-badge .dot.waiting {
            background: #ffaa00;
            box-shadow: 0 0 12px #ffaa00;
            animation: pulse 1.8s infinite;
        }

        @keyframes pulse {
            0% { opacity: 0.7; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.15); }
            100% { opacity: 0.7; transform: scale(1); }
        }

        /* Players bar */
        .players-bar {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            gap: 16px;
            flex-wrap: wrap;
        }

        .player-card {
            flex: 1;
            min-width: 140px;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 20px;
            padding: 12px 18px;
            border: 1.5px solid rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            gap: 12px;
            transition: 0.3s;
        }

        .player-card.active-turn {
            border-color: #00ff88;
            box-shadow: 0 0 25px rgba(0, 255, 136, 0.3);
            background: rgba(0, 255, 136, 0.08);
        }

        .player-icon {
            font-size: 1.8rem;
            width: 44px;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 14px;
        }

        .player-info {
            display: flex;
            flex-direction: column;
        }

        .player-name {
            font-weight: 700;
            font-size: 1rem;
            color: white;
        }

        .player-symbol {
            font-size: 1.2rem;
            font-weight: 800;
        }

        .symbol-x { color: #ff6b9d; text-shadow: 0 0 15px #ff6b9d; }
        .symbol-o { color: #6bc5ff; text-shadow: 0 0 15px #6bc5ff; }

        /* Board */
        .board-wrapper {
            display: flex;
            justify-content: center;
            margin: 8px 0 24px;
            position: relative;
        }

        .board {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            background: rgba(0, 0, 0, 0.4);
            padding: 18px;
            border-radius: 32px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.5);
            width: 100%;
            max-width: 380px;
            aspect-ratio: 1 / 1;
            pointer-events: none;
        }

        .board.active {
            pointer-events: auto;
        }

        .cell {
            background: rgba(30, 30, 55, 0.9);
            border-radius: 20px;
            border: 2px solid rgba(120, 140, 255, 0.15);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3.5rem;
            font-weight: 800;
            cursor: pointer;
            transition: 0.15s;
            aspect-ratio: 1 / 1;
            user-select: none;
            box-shadow: 0 5px 0 rgba(0, 0, 0, 0.4);
            position: relative;
        }

        .cell:hover {
            background: rgba(50, 50, 90, 0.9);
            border-color: rgba(120, 140, 255, 0.5);
            transform: scale(1.02);
        }

        .cell:active {
            transform: scale(0.98);
        }

        .cell.win {
            background: rgba(0, 255, 136, 0.15);
            border-color: #00ff88;
            box-shadow: 0 0 35px rgba(0, 255, 136, 0.6);
            animation: winPulse 1s infinite;
        }

        @keyframes winPulse {
            0% { box-shadow: 0 0 20px rgba(0, 255, 136, 0.4); }
            50% { box-shadow: 0 0 50px rgba(0, 255, 136, 0.9); }
            100% { box-shadow: 0 0 20px rgba(0, 255, 136, 0.4); }
        }

        .cell.disabled {
            cursor: not-allowed;
            opacity: 0.8;
        }

        .cell.disabled:hover {
            transform: none;
            background: rgba(30, 30, 55, 0.9);
            border-color: rgba(120, 140, 255, 0.15);
        }

        /* Game status text */
        .game-status {
            text-align: center;
            font-size: 1.3rem;
            font-weight: 700;
            color: #ddd;
            margin-bottom: 12px;
            min-height: 2.2rem;
            letter-spacing: 1px;
            text-shadow: 0 0 20px rgba(127, 127, 213, 0.3);
        }

        .game-status.win {
            color: #00ff88;
            text-shadow: 0 0 25px #00ff88;
        }

        .game-status.lose {
            color: #ff6b9d;
            text-shadow: 0 0 25px #ff6b9d;
        }

        .game-status.draw {
            color: #ffaa00;
            text-shadow: 0 0 25px #ffaa00;
        }

        /* Footer controls */
        .footer-controls {
            display: flex;
            justify-content: center;
            gap: 12px;
            margin-top: 8px;
            flex-wrap: wrap;
        }

        .footer-controls .btn {
            padding: 12px 28px;
            font-size: 0.9rem;
        }

        /* Connection info */
        .connection-info {
            text-align: center;
            margin-top: 16px;
            font-size: 0.75rem;
            color: #6a6a8a;
            letter-spacing: 0.5px;
            word-break: break-all;
        }

        /* Toast */
        .toast {
            position: fixed;
            top: 24px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(20, 20, 40, 0.95);
            border: 1px solid #7f7fd5;
            color: white;
            padding: 14px 28px;
            border-radius: 40px;
            font-weight: 600;
            z-index: 1000;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(8px);
            transition: opacity 0.3s, transform 0.3s;
            opacity: 0;
            pointer-events: none;
            font-size: 0.95rem;
        }

        .toast.show {
            opacity: 1;
            transform: translateX(-50%) translateY(10px);
        }

        /* Responsive */
        @media (max-width: 480px) {
            .game-container { padding: 20px 16px; border-radius: 28px; }
            h1 { font-size: 1.6rem; }
            .cell { font-size: 2.8rem; border-radius: 16px; }
            .board { padding: 12px; gap: 8px; }
            .room-panel { padding: 16px; flex-direction: column; align-items: stretch; }
            .room-input-group { flex-direction: column; }
            .btn { justify-content: center; }
            .player-card { padding: 10px 14px; }
        }
    </style>
</head>
<body>
    <div class="game-container">
        <h1>⭕ Tic-Tac-Toe · Online ❌</h1>
        <div class="subhead">Enter a room code to invite a friend for a live match</div>

        <!-- Room control panel -->
        <div class="room-panel">
            <div class="room-input-group">
                <input type="text" id="roomCodeInput" placeholder="Enter room code (e.g., ABC123)" maxlength="8" autocomplete="off" spellcheck="false">
            </div>
            <div style="display: flex; gap: 8px;">
                <button class="btn" id="createRoomBtn" title="Create a new room">✨ Create</button>
                <button class="btn" id="joinRoomBtn" title="Join an existing room">🚪 Join</button>
            </div>
        </div>

        <!-- Connection status and room info -->
        <div class="status-badge" style="margin-bottom: 16px; justify-content: space-between;">
            <div>
                <span class="dot" id="statusDot"></span>
                <span id="statusText">Disconnected</span>
            </div>
            <div id="roomDisplay" style="font-family: monospace; font-size: 1rem; color: #a8a8ff;"></div>
        </div>

        <!-- Player info bar -->
        <div class="players-bar" id="playersBar">
            <div class="player-card" id="player1Card">
                <div class="player-icon">👤</div>
                <div class="player-info">
                    <span class="player-name">Player 1</span>
                    <span class="player-symbol symbol-x">X</span>
                </div>
            </div>
            <div class="player-card" id="player2Card">
                <div class="player-icon">👤</div>
                <div class="player-info">
                    <span class="player-name">Player 2</span>
                    <span class="player-symbol symbol-o">O</span>
                </div>
            </div>
        </div>

        <!-- Game status -->
        <div class="game-status" id="gameStatus">Waiting for opponent...</div>

        <!-- Board -->
        <div class="board-wrapper">
            <div class="board" id="board">
                <div class="cell" data-index="0"></div>
                <div class="cell" data-index="1"></div>
                <div class="cell" data-index="2"></div>
                <div class="cell" data-index="3"></div>
                <div class="cell" data-index="4"></div>
                <div class="cell" data-index="5"></div>
                <div class="cell" data-index="6"></div>
                <div class="cell" data-index="7"></div>
                <div class="cell" data-index="8"></div>
            </div>
        </div>

        <!-- Bottom controls -->
        <div class="footer-controls">
            <button class="btn" id="restartBtn">🔄 Restart</button>
            <button class="btn" id="leaveBtn">🚪 Leave Room</button>
        </div>

        <div class="connection-info">
            ⚡ Real-time sync via public WebSocket · No registration required
        </div>
    </div>

    <!-- Toast container -->
    <div class="toast" id="toast"></div>

    <script type="importmap">
        {
            "imports": {}
        }
    </script>

    <script>
        // --- Game state management ---
        const state = {
            // Network related
            ws: null,
            roomCode: '',
            playerId: 'p' + Math.random().toString(36).substring(2, 8), // Random player ID
            isCreator: false,
            connected: false,
            opponentJoined: false,
            
            // Game related
            board: Array(9).fill(null), // 'X' or 'O' or null
            mySymbol: null, // 'X' or 'O'
            opponentSymbol: null,
            currentTurn: 'X', // 'X' or 'O'
            gameActive: false,
            gameOver: false,
            winner: null, // 'X', 'O', 'draw'
            winningLine: [],
            
            // Player count in room
            playersCount: 0
        };

        // DOM elements
        const els = {
            roomCodeInput: document.getElementById('roomCodeInput'),
            createRoomBtn: document.getElementById('createRoomBtn'),
            joinRoomBtn: document.getElementById('joinRoomBtn'),
            restartBtn: document.getElementById('restartBtn'),
            leaveBtn: document.getElementById('leaveBtn'),
            statusDot: document.getElementById('statusDot'),
            statusText: document.getElementById('statusText'),
            roomDisplay: document.getElementById('roomDisplay'),
            gameStatus: document.getElementById('gameStatus'),
            board: document.getElementById('board'),
            cells: document.querySelectorAll('.cell'),
            player1Card: document.getElementById('player1Card'),
            player2Card: document.getElementById('player2Card'),
            toast: document.getElementById('toast')
        };

        // Winning combinations
        const WIN_LINES = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        // --- Utility functions ---
        function showToast(msg, duration = 2500) {
            els.toast.textContent = msg;
            els.toast.classList.add('show');
            clearTimeout(els.toast._timeout);
            els.toast._timeout = setTimeout(() => {
                els.toast.classList.remove('show');
            }, duration);
        }

        function generateRoomCode() {
            const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Exclude easily confused characters
            let code = '';
            for (let i = 0; i < 6; i++) {
                code += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return code;
        }

        // --- WebSocket connection ---
        // Using a public WebSocket relay service for demonstration
        // Note: This is a public broadcast channel; all clients receive messages, filtered by room code.
        // For production, replace with your own WebSocket server.
        const WS_URL = 'wss://socketsbay.com/wss/v2/1/demo/';

        function connectWebSocket(onOpen, onMessage, onError, onClose) {
            try {
                const ws = new WebSocket(WS_URL);
                ws.onopen = () => {
                    console.log('WebSocket connected');
                    if (onOpen) onOpen(ws);
                };
                ws.onmessage = (event) => {
                    try {
                        const data = JSON.parse(event.data);
                        if (onMessage) onMessage(data, ws);
                    } catch (e) {
                        // Ignore non-JSON messages
                    }
                };
                ws.onerror = (err) => {
                    console.error('WebSocket error:', err);
                    if (onError) onError(err);
                };
                ws.onclose = () => {
                    console.log('WebSocket closed');
                    if (onClose) onClose();
                };
                return ws;
            } catch (e) {
                console.error('Connection failed:', e);
                if (onError) onError(e);
                return null;
            }
        }

        // Send message to room (broadcast via public channel, filtered by room code)
        function sendToRoom(message) {
            if (!state.ws || state.ws.readyState !== WebSocket.OPEN) {
                showToast('Not connected to server, please check your network', 3000);
                return;
            }
            const payload = {
                room: state.roomCode,
                sender: state.playerId,
                ...message
            };
            state.ws.send(JSON.stringify(payload));
        }

        // --- Game logic ---
        function resetGameState() {
            state.board = Array(9).fill(null);
            state.currentTurn = 'X';
            state.gameActive = false;
            state.gameOver = false;
            state.winner = null;
            state.winningLine = [];
            renderBoard();
            updateGameStatus();
        }

        function checkWinner(board) {
            for (const line of WIN_LINES) {
                const [a, b, c] = line;
                if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                    return { winner: board[a], line };
                }
            }
            if (board.every(cell => cell !== null)) {
                return { winner: 'draw', line: [] };
            }
            return null;
        }

        function handleCellClick(index) {
            // Check if move is allowed
            if (!state.gameActive) {
                showToast('Game has not started or has ended');
                return;
            }
            if (state.gameOver) {
                showToast('Game is over, please restart');
                return;
            }
            if (!state.mySymbol) {
                showToast('You are still waiting for your symbol assignment...');
                return;
            }
            if (state.currentTurn !== state.mySymbol) {
                showToast('Not your turn yet');
                return;
            }
            if (state.board[index] !== null) {
                showToast('This cell is already taken');
                return;
            }

            // Send move request
            sendToRoom({
                type: 'move',
                index: index,
                symbol: state.mySymbol
            });
        }

        // Process opponent or own move (from broadcast)
        function applyMove(index, symbol, isMyMove) {
            if (state.board[index] !== null) return;
            if (state.gameOver) return;
            
            // Check turn validity
            if (symbol !== state.currentTurn) return;
            
            // Apply move
            state.board[index] = symbol;
            
            // Check win
            const result = checkWinner(state.board);
            if (result) {
                state.gameOver = true;
                state.gameActive = false;
                state.winner = result.winner;
                state.winningLine = result.line || [];
                
                // Show result
                if (result.winner === 'draw') {
                    els.gameStatus.textContent = '🤝 Draw!';
                    els.gameStatus.className = 'game-status draw';
                } else {
                    const isMeWinner = result.winner === state.mySymbol;
                    els.gameStatus.textContent = isMeWinner ? '🎉 You win!' : '😢 You lose...';
                    els.gameStatus.className = `game-status ${isMeWinner ? 'win' : 'lose'}`;
                }
            } else {
                // Switch turn
                state.currentTurn = state.currentTurn === 'X' ? 'O' : 'X';
            }
            
            renderBoard();
            updateGameStatus();
            updatePlayerTurnHighlight();
        }

        // Restart game
        function restartGame() {
            if (!state.connected) {
                showToast('Please join a room first');
                return;
            }
            if (!state.opponentJoined) {
                showToast('Opponent has not joined yet');
                return;
            }
            
            // Only the room creator can restart
            if (!state.isCreator) {
                showToast('Only the room host can restart the game');
                return;
            }
            
            sendToRoom({ type: 'restart' });
            
            // Reset locally (broadcast will sync to all players)
            resetGameState();
            state.currentTurn = 'X';
            state.gameActive = true;
            state.gameOver = false;
            state.winner = null;
            state.winningLine = [];
            renderBoard();
            updateGameStatus();
            updatePlayerTurnHighlight();
            showToast('Game restarted!');
        }

        // --- Rendering ---
        function renderBoard() {
            els.cells.forEach((cell, i) => {
                const val = state.board[i];
                cell.textContent = val || '';
                cell.classList.remove('win', 'disabled');
                
                if (val === 'X') {
                    cell.style.color = '#ff6b9d';
                    cell.style.textShadow = '0 0 20px #ff6b9d';
                } else if (val === 'O') {
                    cell.style.color = '#6bc5ff';
                    cell.style.textShadow = '0 0 20px #6bc5ff';
                } else {
                    cell.style.color = '';
                    cell.style.textShadow = '';
                }
                
                // Highlight winning line
                if (state.winningLine.includes(i)) {
                    cell.classList.add('win');
                }
                
                // Disabled state
                if (state.gameOver || !state.gameActive || !state.mySymbol || state.currentTurn !== state.mySymbol) {
                    cell.classList.add('disabled');
                }
            });
            
            // Whether the board is clickable
            if (state.gameActive && !state.gameOver && state.mySymbol && state.currentTurn === state.mySymbol) {
                els.board.classList.add('active');
            } else {
                els.board.classList.remove('active');
            }
        }

        function updateGameStatus() {
            if (!state.connected) {
                els.gameStatus.textContent = 'Please create or join a room';
                els.gameStatus.className = 'game-status';
                return;
            }
            if (!state.opponentJoined) {
                els.gameStatus.textContent = 'Waiting for opponent...';
                els.gameStatus.className = 'game-status';
                return;
            }
            if (state.gameOver) {
                // Already set in applyMove
                return;
            }
            if (!state.mySymbol) {
                els.gameStatus.textContent = 'Assigning symbols...';
                els.gameStatus.className = 'game-status';
                return;
            }
            
            const turnText = state.currentTurn === state.mySymbol ? 'Your turn' : "Opponent's turn...";
            els.gameStatus.textContent = `Your symbol: ${state.mySymbol} · ${turnText}`;
            els.gameStatus.className = 'game-status';
        }

        function updatePlayerTurnHighlight() {
            const p1Card = els.player1Card;
            const p2Card = els.player2Card;
            
            p1Card.classList.remove('active-turn');
            p2Card.classList.remove('active-turn');
            
            // Get both symbols
            const p1Symbol = state.opponentJoined ? (state.isCreator ? 'X' : 'O') : 'X';
            const p2Symbol = state.opponentJoined ? (state.isCreator ? 'O' : 'X') : 'O';
            
            if (state.gameActive && !state.gameOver) {
                if (state.currentTurn === 'X') {
                    if (p1Symbol === 'X') p1Card.classList.add('active-turn');
                    if (p2Symbol === 'X') p2Card.classList.add('active-turn');
                } else {
                    if (p1Symbol === 'O') p1Card.classList.add('active-turn');
                    if (p2Symbol === 'O') p2Card.classList.add('active-turn');
                }
            }
            
            // Update player card labels
            if (state.opponentJoined) {
                if (state.isCreator) {
                    document.querySelector('#player1Card .player-name').textContent = 'You (Host)';
                    document.querySelector('#player2Card .player-name').textContent = 'Opponent';
                } else {
                    document.querySelector('#player1Card .player-name').textContent = 'Opponent (Host)';
                    document.querySelector('#player2Card .player-name').textContent = 'You';
                }
            } else {
                document.querySelector('#player1Card .player-name').textContent = 'Waiting...';
                document.querySelector('#player2Card .player-name').textContent = 'Waiting...';
            }
            
            // Update symbol display
            document.querySelector('#player1Card .player-symbol').textContent = p1Symbol;
            document.querySelector('#player2Card .player-symbol').textContent = p2Symbol;
            document.querySelector('#player1Card .player-symbol').className = `player-symbol ${p1Symbol === 'X' ? 'symbol-x' : 'symbol-o'}`;
            document.querySelector('#player2Card .player-symbol').className = `player-symbol ${p2Symbol === 'X' ? 'symbol-x' : 'symbol-o'}`;
        }

        function updateUI() {
            // Status indicator
            if (state.connected) {
                if (state.opponentJoined) {
                    els.statusDot.className = 'dot online';
                    els.statusText.textContent = 'Connected · Opponent joined';
                } else {
                    els.statusDot.className = 'dot waiting';
                    els.statusText.textContent = 'Connected · Waiting for opponent';
                }
            } else {
                els.statusDot.className = 'dot';
                els.statusText.textContent = 'Disconnected';
            }
            
            // Room code display
            if (state.roomCode) {
                els.roomDisplay.textContent = `Room: ${state.roomCode}`;
            } else {
                els.roomDisplay.textContent = '';
            }
            
            updatePlayerTurnHighlight();
            renderBoard();
            updateGameStatus();
        }

        // --- Network message handling ---
        function handleMessage(data, ws) {
            // Filter out messages not for our room
            if (data.room !== state.roomCode) return;
            
            switch (data.type) {
                case 'join':
                    // A player joined the room
                    if (data.sender !== state.playerId) {
                        if (!state.opponentJoined) {
                            state.opponentJoined = true;
                            state.playersCount = 2;
                            
                            // Assign symbols: host is X, joiner is O
                            if (state.isCreator) {
                                state.mySymbol = 'X';
                                state.opponentSymbol = 'O';
                            } else {
                                state.mySymbol = 'O';
                                state.opponentSymbol = 'X';
                            }
                            
                            // Start game
                            state.gameActive = true;
                            state.currentTurn = 'X';
                            resetGameState(); // Reset board
                            state.gameActive = true;
                            state.currentTurn = 'X';
                            state.gameOver = false;
                            state.winner = null;
                            state.winningLine = [];
                            
                            updateUI();
                            showToast(`Opponent ${data.sender.substring(0,4)} joined! Game started`);
                            
                            // Broadcast current state to opponent
                            sendToRoom({ type: 'sync', board: state.board, turn: state.currentTurn, mySymbol: state.mySymbol });
                        }
                    }
                    break;
                    
                case 'sync':
                    // Sync state
                    if (data.sender !== state.playerId && data.board) {
                        state.board = data.board;
                        state.currentTurn = data.turn;
                        state.gameOver = false;
                        state.gameActive = true;
                        state.opponentJoined = true;
                        
                        if (state.isCreator) {
                            state.mySymbol = 'X';
                            state.opponentSymbol = 'O';
                        } else {
                            state.mySymbol = 'O';
                            state.opponentSymbol = 'X';
                        }
                        
                        renderBoard();
                        updateUI();
                    }
                    break;
                    
                case 'move':
                    // Apply move
                    if (data.index !== undefined && data.symbol) {
                        if (state.gameOver) return;
                        applyMove(data.index, data.symbol, data.sender === state.playerId);
                    }
                    break;
                    
                case 'restart':
                    // Restart
                    if (data.sender !== state.playerId) {
                        resetGameState();
                        state.gameActive = true;
                        state.currentTurn = 'X';
                        state.gameOver = false;
                        state.winner = null;
                        state.winningLine = [];
                        renderBoard();
                        updateUI();
                        showToast('Opponent restarted the game');
                    }
                    break;
                    
                case 'leave':
                    // Opponent left
                    if (data.sender !== state.playerId) {
                        state.opponentJoined = false;
                        state.gameActive = false;
                        state.gameOver = true;
                        state.mySymbol = null;
                        state.opponentSymbol = null;
                        state.playersCount = 1;
                        resetGameState();
                        updateUI();
                        showToast('Opponent left the room');
                    }
                    break;
                    
                case 'ping':
                    // Heartbeat, ignore
                    break;
            }
        }

        // --- Join/Create room ---
        function createRoom() {
            const code = generateRoomCode();
            state.roomCode = code;
            state.isCreator = true;
            state.connected = false;
            state.opponentJoined = false;
            state.mySymbol = 'X';
            state.opponentSymbol = 'O';
            state.playersCount = 1;
            
            initConnection(code, true);
        }

        function joinRoom() {
            const code = els.roomCodeInput.value.trim().toUpperCase();
            if (!code || code.length < 4) {
                showToast('Please enter a valid room code (at least 4 characters)');
                return;
            }
            
            state.roomCode = code;
            state.isCreator = false;
            state.connected = false;
            state.opponentJoined = false;
            state.playersCount = 0;
            
            initConnection(code, false);
        }

        function initConnection(code, isCreator) {
            // Close old connection
            if (state.ws) {
                state.ws.close();
                state.ws = null;
            }
            
            els.statusText.textContent = 'Connecting...';
            els.statusDot.className = 'dot waiting';
            
            const ws = connectWebSocket(
                (socket) => {
                    state.ws = socket;
                    state.connected = true;
                    
                    // Send join message
                    sendToRoom({ type: 'join', isCreator: isCreator });
                    
                    // If not creator, request sync
                    if (!isCreator) {
                        sendToRoom({ type: 'sync-request' });
                    }
                    
                    // Set up heartbeat
                    setInterval(() => {
                        if (state.ws && state.ws.readyState === WebSocket.OPEN) {
                            sendToRoom({ type: 'ping' });
                        }
                    }, 30000);
                    
                    updateUI();
                    showToast(isCreator ? `Room ${code} created! Invite a friend with this code` : `Joined room ${code}, waiting for host to start`);
                    
                    // Update input
                    els.roomCodeInput.value = code;
                },
                (data) => {
                    handleMessage(data, state.ws);
                },
                (err) => {
                    state.connected = false;
                    updateUI();
                    showToast('Failed to connect to server, please try again', 3000);
                },
                () => {
                    state.connected = false;
                    updateUI();
                }
            );
            
            if (!ws) {
                showToast('Cannot connect to server, please check your network', 3000);
            }
        }

        function leaveRoom() {
            if (state.roomCode && state.ws) {
                // Send leave message
                sendToRoom({ type: 'leave' });
                state.ws.close();
                state.ws = null;
            }
            
            state.roomCode = '';
            state.connected = false;
            state.opponentJoined = false;
            state.mySymbol = null;
            state.opponentSymbol = null;
            state.playersCount = 0;
            resetGameState();
            updateUI();
            els.roomCodeInput.value = '';
            showToast('Left the room');
        }

        // --- Initialize event listeners ---
        function init() {
            // Create room
            els.createRoomBtn.addEventListener('click', createRoom);
            
            // Join room
            els.joinRoomBtn.addEventListener('click', joinRoom);
            
            // Enter key to join
            els.roomCodeInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') joinRoom();
            });
            
            // Restart
            els.restartBtn.addEventListener('click', restartGame);
            
            // Leave room
            els.leaveBtn.addEventListener('click', leaveRoom);
            
            // Board clicks
            els.cells.forEach(cell => {
                cell.addEventListener('click', () => {
                    const index = parseInt(cell.dataset.index);
                    handleCellClick(index);
                });
            });
            
            // Initial UI
            updateUI();
            
            // Auto-uppercase room code input
            els.roomCodeInput.addEventListener('input', (e) => {
                e.target.value = e.target.value.toUpperCase();
            });
        }

        // Start
        init();
    </script>
</body>
</html>