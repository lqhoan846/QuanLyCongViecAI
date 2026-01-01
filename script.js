/* ============================================
   QUẢN LÝ CÔNG VIỆC BẰNG AI - COMPLETE JAVASCRIPT
   Created by: LamQuocHoan
   ============================================ */

// ==================== CONFIGURATION ====================
const CONFIG = {
    APP_NAME: 'QUẢN LÝ CÔNG VIỆC BẰNG AI',
    CREATOR: 'LamQuocHoan',
    MAX_WEEKS_FUTURE: 4,
    MAX_WEEKS_HISTORY: 4,
    UNDO_TIMEOUT: 10000,
    AI_MESSAGE_INTERVAL: 600000, // 10 minutes
    STORAGE_PREFIX: 'taskmanager_',
    TASK_COLORS: 15,
    GEMINI_API_KEY: 'AIzaSyDBjTdRx528XjC58s_T5kdtuHdbQXaTez8' // Thay bằng API key thực
};

// ==================== ICON COLLECTION ====================
const ICON_COLLECTION = [
    '🎉', '🎊', '🌟', '⭐', '✨', '💫', '🔥', '💖', '💕', '💗',
    '💓', '💝', '💘', '🌸', '🌺', '🌻', '🌷', '🌹', '🏵️', '💐',
    '🦋', '🐝', '🐞', '🌈', '☀️', '🌙', '⚡', '💎', '🎀', '🎁',
    '🎈', '🎯', '🏆', '🥇', '🎪', '🎨', '🎭', '🎵', '🎶', '🎸',
    '🎹', '🎺', '🎻', '🥁', '🎤', '🎧', '🎬', '🎮', '🕹️', '🎲',
    '🧩', '🎰', '🎳', '🏀', '⚽', '🏈', '⚾', '🎾', '🏐', '🏉',
    '🎱', '🏓', '🏸', '🥊', '🥋', '⛳', '⛸️', '🎣', '🎽', '🛹',
    '🛷', '🥌', '🎿', '⛷️', '🏂', '🏋️', '🤸', '🤺', '🏇', '⛹️',
    '🧘', '🚴', '🚵', '🤼', '🤽', '🤾', '🤿', '🏄', '🏊', '🚣',
    '🧗', '🪂', '🦸', '🦹', '🧚', '🧜', '🧝', '🧞', '🧟', '🦄',
    '🐉', '🐲', '🦕', '🦖', '🐊', '🐢', '🦎', '🐍', '🐳', '🐋',
    '🐬', '🦭', '🐟', '🐠', '🐡', '🦈', '🐙', '🦑', '🦀', '🦞',
    '🦐', '🦪', '🐌', '🦋', '🐛', '🐜', '🐝', '🪲', '🐞', '🦗',
    '🪳', '🦂', '🕷️', '🕸️', '🐚', '🐾', '🦔', '🐿️', '🦫', '🦨',
    '🦡', '🦦', '🦥', '🐁', '🐀', '🐹', '🐰', '🐇', '🐿️', '🦎',
    '🐸', '🐊', '🐢', '🦎', '🐍', '🐲', '🐉', '🦕', '🦖', '🐳',
    '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈',
    '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦',
    '🥬', '🥒', '🌶️', '🫑', '🌽', '🥕', '🫒', '🧄', '🧅', '🥔',
    '🍠', '🥐', '🥯', '🍞', '🥖', '🥨', '🧀', '🥚', '🍳', '🧈',
    '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🦴', '🌭', '🍔', '🍟',
    '🍕', '🫓', '🥪', '🥙', '🧆', '🌮', '🌯', '🫔', '🥗', '🥘',
    '🫕', '🥫', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🦪',
    '🍤', '🍙', '🍚', '🍘', '🍥', '🥠', '🥮', '🍢', '🍡', '🍧',
    '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫',
    '🍿', '🍩', '🍪', '🌰', '🥜', '🍯', '🥛', '🍼', '🫖', '☕',
    '🍵', '🧃', '🥤', '🧋', '🍶', '🍺', '🍻', '🥂', '🍷', '🥃',
    '🍸', '🍹', '🧉', '🍾', '🧊', '🥄', '🍴', '🍽️', '🥣', '🥡',
    '🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐',
    '🛻', '🚚', '🚛', '🚜', '🏍️', '🛵', '🚲', '🛴', '🛹', '🛼'
];

// ==================== VIETNAMESE HOLIDAYS ====================
const VIETNAMESE_HOLIDAYS = {
    // Format: 'MM-DD': { name: 'Tên lễ', type: 'loại' }
    '01-01': { name: 'Tết Dương lịch', type: 'holiday-new-year' },
    '02-14': { name: 'Valentine', type: 'holiday-valentine' },
    '03-08': { name: 'Quốc tế Phụ nữ', type: 'holiday-women' },
    '04-30': { name: 'Giải phóng miền Nam', type: 'holiday-liberation' },
    '05-01': { name: 'Quốc tế Lao động', type: 'holiday-labor' },
    '06-01': { name: 'Quốc tế Thiếu nhi', type: 'holiday-children' },
    '09-02': { name: 'Quốc khánh', type: 'holiday-national' },
    '10-20': { name: 'Phụ nữ Việt Nam', type: 'holiday-vn-women' },
    '11-20': { name: 'Nhà giáo Việt Nam', type: 'holiday-teacher' },
    '12-25': { name: 'Giáng sinh', type: 'holiday-christmas' }
};

// Lunar holidays (approximate, needs lunar calendar calculation)
const LUNAR_HOLIDAYS = {
    '01-01': { name: 'Tết Nguyên Đán', type: 'holiday-tet' },
    '01-15': { name: 'Tết Nguyên tiêu', type: 'holiday-lantern' },
    '03-10': { name: 'Giỗ Tổ Hùng Vương', type: 'holiday-ancestors' },
    '05-05': { name: 'Tết Đoan Ngọ', type: 'holiday-dragon' },
    '07-15': { name: 'Vu Lan', type: 'holiday-vulan' },
    '08-15': { name: 'Tết Trung Thu', type: 'holiday-midautumn' },
    '12-23': { name: 'Ông Táo chầu trời', type: 'holiday-kitchen' }
};

// ==================== AI MESSAGES ====================
const AI_MESSAGES = {
    greetings: [
        "Chào {name}! Hôm nay của cậu thế nào rồi? 🌟",
        "Hey {name}! Tui ở đây sẵn sàng giúp cậu nè! 💪",
        "{name} ơi, cậu đang làm tốt lắm đó! ✨",
        "Yo {name}! Có gì mới không nè? 🎉",
        "{name} à, nhớ nghỉ ngơi đúng giờ nha! 😊"
    ],
    morning: [
        "Chào buổi sáng {name}! Chúc cậu một ngày tràn đầy năng lượng! ☀️",
        "{name} ơi, sáng nay cậu ăn sáng chưa? 🥐",
        "Good morning {name}! Cà phê hay trà nè? ☕",
        "Buổi sáng tươi đẹp quá {name} nhỉ! 🌅",
        "{name} ơi, hôm nay mình cùng cố gắng nhé! 💪"
    ],
    afternoon: [
        "{name} ơi, buổi chiều rồi, nghỉ ngơi chút đi! ☕",
        "Chiều rồi {name} à, cậu có đói bụng không? 🍔",
        "{name}, cậu đang làm việc gì thế? 🤔",
        "Buổi chiều năng suất nha {name}! 📊",
        "{name} ơi, còn bao nhiêu việc nữa thế? 📝"
    ],
    evening: [
        "Tối rồi {name} ơi, đừng thức khuya quá nha! 🌙",
        "{name} à, hôm nay cậu làm được nhiều việc không? ⭐",
        "Chúc {name} buổi tối thật chill! 🎵",
        "{name} ơi, nhớ ăn tối đàng hoàng nha! 🍜",
        "Tối nay {name} có kế hoạch gì không? 🎬"
    ],
    taskAdded: [
        "Tuyệt vời {name}! Tui đã thêm công việc vào lịch rồi! 🎉",
        "Done {name} ơi! Việc mới đã được thêm! ✅",
        "Xong rồi nè {name}! Cậu siêng quá! 💪",
        "{name} à, công việc đã được sắp xếp gọn gàng! 📋",
        "OK {name}! Tui đã note lại rồi nhé! 📝"
    ],
    taskDeleted: [
        "Đã xóa công việc rồi {name} ơi! 🗑️",
        "{name} à, việc đó đã được remove! ✨",
        "Xong rồi {name}, việc đã được dọn dẹp! 🧹",
        "{name} ơi, tui đã xóa giúp cậu rồi! ✅"
    ],
    taskEdited: [
        "Đã cập nhật công việc cho {name} rồi! ✏️",
        "{name} ơi, thay đổi đã được lưu! 💾",
        "OK {name}! Công việc đã được chỉnh sửa! ✅"
    ],
    encouragement: [
        "{name} ơi, cậu đang làm rất tốt! Tiếp tục phát huy nha! 🌟",
        "Tui tin {name} sẽ hoàn thành xuất sắc! 💪",
        "{name} à, mỗi bước nhỏ đều là tiến bộ! 🚀",
        "Cậu giỏi lắm {name}! Tui tự hào về cậu! 🏆",
        "{name} ơi, đừng quên nghỉ ngơi để có sức làm việc nha! 😊"
    ],
    reminder: [
        "{name} ơi, đừng quên việc \"{task}\" vào lúc {time} nha! 📌",
        "Nhắc {name} nè: \"{task}\" lúc {time} đó! ⏰",
        "{name} à, sắp tới giờ \"{task}\" rồi! 🔔"
    ],
    conflict: [
        "Ê {name}, định phân thân chi thuật à? Trùng lịch rồi nè! 🤯",
        "{name} ơi, thời gian này đã có việc khác rồi! 😅",
        "Oops {name}! Lịch bị trùng rồi, chọn lại giờ đi! ⚠️"
    ],
    error: [
        "{name} ơi, cậu nhập thiếu thông tin rồi! Cho tui biết thêm nha! 🤔",
        "Hmm {name}, tui chưa hiểu lắm. Nhập lại giúp tui nhé! 😊",
        "{name} à, nhớ ghi rõ công việc + ngày giờ nha! 📝"
    ],
    pastError: [
        "{name} ơi, không thể quay ngược thời gian đâu! Chọn thời gian tương lai nha! ⏰",
        "Ủa {name}, đó là quá khứ rồi mà! 😅"
    ],
    futureError: [
        "{name} ơi, chỉ được lên lịch trong 4 tuần tới thôi nha! 📅",
        "{name} à, xa quá rồi! Tui chỉ quản lý được 4 tuần tới thôi! 🗓️"
    ]
};

// ==================== UTILITY FUNCTIONS ====================
const Utils = {
    // Generate unique ID
    generateId: () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    // Get URL parameter
    getUrlParam: (param) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    },

    // Set URL parameter
    setUrlParam: (param, value) => {
        const url = new URL(window.location);
        url.searchParams.set(param, value);
        window.history.pushState({}, '', url);
    },

    // Format date
    formatDate: (date, format = 'DD/MM/YYYY') => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        
        return format
            .replace('DD', day)
            .replace('MM', month)
            .replace('YYYY', year);
    },

    // Format time
    formatTime: (hours, minutes) => {
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    },

    // Parse Vietnamese date/time from text
    parseVietnameseDateTime: (text) => {
        const result = {
            taskName: '',
            date: null,
            startTime: null,
            endTime: null,
            errors: []
        };

        // Normalize text
        let normalizedText = text.toLowerCase().trim();
        
        // Common Vietnamese abbreviations
        const abbreviations = {
            'hôm nay': new Date().toISOString().split('T')[0],
            'hnay': new Date().toISOString().split('T')[0],
            'h.nay': new Date().toISOString().split('T')[0],
            'ngày mai': new Date(Date.now() + 86400000).toISOString().split('T')[0],
            'mai': new Date(Date.now() + 86400000).toISOString().split('T')[0],
            'ngày mốt': new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
            'mốt': new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
            'thứ 2': 1, 'thứ hai': 1, 't2': 1,
            'thứ 3': 2, 'thứ ba': 2, 't3': 2,
            'thứ 4': 3, 'thứ tư': 3, 't4': 3,
            'thứ 5': 4, 'thứ năm': 4, 't5': 4,
            'thứ 6': 5, 'thứ sáu': 5, 't6': 5,
            'thứ 7': 6, 'thứ bảy': 6, 't7': 6,
            'chủ nhật': 0, 'cn': 0,
            'sáng': '08:00',
            'trưa': '12:00',
            'chiều': '14:00',
            'tối': '19:00',
            'đêm': '22:00'
        };

        // Time patterns
        const timePatterns = [
            /(\d{1,2})[h:.](\d{2})?\s*-\s*(\d{1,2})[h:.](\d{2})?/gi, // 8h-10h, 8:00-10:00
            /từ\s*(\d{1,2})[h:.](\d{2})?\s*đến\s*(\d{1,2})[h:.](\d{2})?/gi, // từ 8h đến 10h
            /(\d{1,2})[h:.](\d{2})?/gi, // 8h, 8:30
            /(\d{1,2})\s*giờ\s*(\d{2})?\s*phút?/gi // 8 giờ 30 phút
        ];

        // Date patterns
        const datePatterns = [
            /(\d{1,2})[\/\-.](\d{1,2})[\/\-.]?(\d{2,4})?/gi, // 25/12/2024, 25-12, 25.12
            /ngày\s*(\d{1,2})[\/\-.]?(\d{1,2})?[\/\-.]?(\d{2,4})?/gi // ngày 25/12
        ];

        // Extract times
        let times = [];
        for (let pattern of timePatterns) {
            const matches = [...normalizedText.matchAll(pattern)];
            for (let match of matches) {
                if (match[3]) { // Has end time
                    result.startTime = Utils.formatTime(parseInt(match[1]), parseInt(match[2] || 0));
                    result.endTime = Utils.formatTime(parseInt(match[3]), parseInt(match[4] || 0));
                } else {
                    times.push(Utils.formatTime(parseInt(match[1]), parseInt(match[2] || 0)));
                }
                normalizedText = normalizedText.replace(match[0], ' ');
            }
        }

        if (times.length >= 2 && !result.startTime) {
            result.startTime = times[0];
            result.endTime = times[1];
        } else if (times.length === 1 && !result.startTime) {
            result.startTime = times[0];
            // Default duration: 1 hour
            const [h, m] = times[0].split(':').map(Number);
            result.endTime = Utils.formatTime(h + 1, m);
        }

        // Check for time keywords
        for (let [key, value] of Object.entries(abbreviations)) {
            if (typeof value === 'string' && value.includes(':') && normalizedText.includes(key)) {
                if (!result.startTime) {
                    result.startTime = value;
                    const [h, m] = value.split(':').map(Number);
                    result.endTime = Utils.formatTime(h + 2, m);
                }
                normalizedText = normalizedText.replace(key, ' ');
            }
        }

        // Extract date
        for (let pattern of datePatterns) {
            const matches = [...normalizedText.matchAll(pattern)];
            for (let match of matches) {
                let day = parseInt(match[1]);
                let month = parseInt(match[2] || new Date().getMonth() + 1);
                let year = parseInt(match[3] || new Date().getFullYear());
                
                if (year < 100) year += 2000;
                
                result.date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                normalizedText = normalizedText.replace(match[0], ' ');
            }
        }

        // Check for date keywords
        for (let [key, value] of Object.entries(abbreviations)) {
            if (normalizedText.includes(key)) {
                if (typeof value === 'string' && value.includes('-')) {
                    result.date = value;
                } else if (typeof value === 'number') {
                    // Day of week
                    const today = new Date();
                    const currentDay = today.getDay();
                    let diff = value - currentDay;
                    if (diff <= 0) diff += 7;
                    const targetDate = new Date(today.getTime() + diff * 86400000);
                    result.date = targetDate.toISOString().split('T')[0];
                }
                normalizedText = normalizedText.replace(new RegExp(key, 'gi'), ' ');
            }
        }

        // Extract task name (remaining text)
        result.taskName = normalizedText
            .replace(/\s+/g, ' ')
            .replace(/[,.\-:]/g, '')
            .trim();

        // Shorten task name if too long
        if (result.taskName.length > 50) {
            result.taskName = result.taskName.substring(0, 47) + '...';
        }

        // Capitalize first letter
        if (result.taskName) {
            result.taskName = result.taskName.charAt(0).toUpperCase() + result.taskName.slice(1);
        }

        // Validate
        if (!result.taskName) {
            result.errors.push('Tên công việc');
        }
        if (!result.date) {
            result.errors.push('Ngày');
        }
        if (!result.startTime) {
            result.errors.push('Giờ bắt đầu');
        }
        if (!result.endTime) {
            result.errors.push('Giờ kết thúc');
        }

        return result;
    },

    // Get day name in Vietnamese
    getDayName: (dayIndex) => {
        const days = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
        return days[dayIndex];
    },

    // Get week start (Monday)
    getWeekStart: (date) => {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(d.setDate(diff));
    },

    // Get week end (Sunday)
    getWeekEnd: (date) => {
        const weekStart = Utils.getWeekStart(date);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        return weekEnd;
    },

    // Convert solar to lunar date (simplified)
    solarToLunar: (year, month, day) => {
        // This is a simplified approximation
        // For accurate conversion, use a proper lunar calendar library
        const lunarData = Utils.calculateLunar(year, month, day);
        return lunarData;
    },

    calculateLunar: (year, month, day) => {
        // Simplified lunar calculation
        // In production, use a proper Vietnamese lunar calendar library
        const solarDate = new Date(year, month - 1, day);
        
        // Approximate lunar offset (simplified)
        const lunarOffset = 29.5305882;
        const baseDate = new Date(2024, 0, 22); // Known lunar new year date
        
        const diffDays = Math.floor((solarDate - baseDate) / (1000 * 60 * 60 * 24));
        const lunarDays = diffDays % 30;
        const lunarMonths = Math.floor(diffDays / 30) % 12;
        
        return {
            day: ((lunarDays + 1) % 30) || 1,
            month: ((lunarMonths + 1) % 12) || 1
        };
    },

    // Check if time ranges overlap
    isTimeOverlap: (start1, end1, start2, end2) => {
        const toMinutes = (time) => {
            const [h, m] = time.split(':').map(Number);
            return h * 60 + m;
        };
        
        const s1 = toMinutes(start1);
        const e1 = toMinutes(end1);
        const s2 = toMinutes(start2);
        const e2 = toMinutes(end2);
        
        return (s1 < e2 && e1 > s2);
    },

    // Get random item from array
    randomItem: (array) => {
        return array[Math.floor(Math.random() * array.length)];
    },

    // Get random color index
    getRandomColor: () => {
        return Math.floor(Math.random() * CONFIG.TASK_COLORS) + 1;
    },

    // Debounce function
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Create ripple effect
    createRipple: (event, element) => {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = event.clientX - rect.left - size / 2 + 'px';
        ripple.style.top = event.clientY - rect.top - size / 2 + 'px';
        
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
};

// ==================== STORAGE MANAGER ====================
const Storage = {
    // Get data for specific workspace
    get: (workspaceId, key) => {
        const fullKey = `${CONFIG.STORAGE_PREFIX}${workspaceId}_${key}`;
        const data = localStorage.getItem(fullKey);
        return data ? JSON.parse(data) : null;
    },

    // Set data for specific workspace
    set: (workspaceId, key, value) => {
        const fullKey = `${CONFIG.STORAGE_PREFIX}${workspaceId}_${key}`;
        localStorage.setItem(fullKey, JSON.stringify(value));
    },

    // Remove data
    remove: (workspaceId, key) => {
        const fullKey = `${CONFIG.STORAGE_PREFIX}${workspaceId}_${key}`;
        localStorage.removeItem(fullKey);
    },

    // Get all tasks
    getTasks: (workspaceId) => {
        return Storage.get(workspaceId, 'tasks') || [];
    },

    // Save tasks
    saveTasks: (workspaceId, tasks) => {
        Storage.set(workspaceId, 'tasks', tasks);
    },

    // Get user name
    getUserName: (workspaceId) => {
        return Storage.get(workspaceId, 'userName') || '';
    },

    // Save user name
    saveUserName: (workspaceId, name) => {
        Storage.set(workspaceId, 'userName', name);
    },

    // Check if first visit
    isFirstVisit: (workspaceId) => {
        return !Storage.get(workspaceId, 'visited');
    },

    // Mark as visited
    markVisited: (workspaceId) => {
        Storage.set(workspaceId, 'visited', true);
    },

    // Save last workspace to localStorage
    saveLastWorkspace: (workspaceId) => {
        localStorage.setItem(`${CONFIG.STORAGE_PREFIX}lastWorkspace`, workspaceId);
    },

    // Get last workspace
    getLastWorkspace: () => {
        return localStorage.getItem(`${CONFIG.STORAGE_PREFIX}lastWorkspace`);
    },

    // Cleanup old tasks (older than 4 weeks)
    cleanupOldTasks: (workspaceId) => {
        const tasks = Storage.getTasks(workspaceId);
        const fourWeeksAgo = new Date();
        fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);
        
        const filteredTasks = tasks.filter(task => {
            const taskDate = new Date(task.date);
            return taskDate >= fourWeeksAgo;
        });
        
        Storage.saveTasks(workspaceId, filteredTasks);
    }
};

// ==================== AI MANAGER ====================
const AI = {
    userName: '',
    
    // Initialize AI with user name
    init: (name) => {
        AI.userName = name;
    },

    // Get message with name replacement
    getMessage: (category, replacements = {}) => {
        const messages = AI_MESSAGES[category];
        if (!messages) return '';
        
        let message = Utils.randomItem(messages);
        message = message.replace('{name}', AI.userName);
        
        for (let [key, value] of Object.entries(replacements)) {
            message = message.replace(`{${key}}`, value);
        }
        
        return message;
    },

    // Get time-based greeting
    getTimeBasedGreeting: () => {
        const hour = new Date().getHours();
        let category = 'greetings';
        
        if (hour >= 5 && hour < 12) {
            category = 'morning';
        } else if (hour >= 12 && hour <
// ==================== AI MANAGER (continued) ====================
    getTimeBasedGreeting: () => {
        const hour = new Date().getHours();
        let category = 'greetings';
        
        if (hour >= 5 && hour < 12) {
            category = 'morning';
        } else if (hour >= 12 && hour < 18) {
            category = 'afternoon';
        } else {
            category = 'evening';
        }
        
        return AI.getMessage(category);
    },

    // Parse task using AI logic
    parseTask: async (text) => {
        // First try local parsing
        const localResult = Utils.parseVietnameseDateTime(text);
        
        // If local parsing successful, return it
        if (localResult.errors.length === 0) {
            return {
                success: true,
                data: localResult
            };
        }
        
        // If API key is set, try Gemini API
        if (CONFIG.GEMINI_API_KEY && CONFIG.GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY_HERE') {
            try {
                const apiResult = await AI.callGeminiAPI(text);
                if (apiResult.success) {
                    return apiResult;
                }
            } catch (error) {
                console.error('Gemini API error:', error);
            }
        }
        
        // Return local result with errors
        return {
            success: false,
            data: localResult,
            errors: localResult.errors
        };
    },

    // Call Gemini API for parsing
    callGeminiAPI: async (text) => {
        const prompt = `Phân tích câu sau và trích xuất thông tin công việc bằng tiếng Việt. Trả về JSON với format:
{
    "taskName": "tên công việc ngắn gọn",
    "date": "YYYY-MM-DD",
    "startTime": "HH:MM",
    "endTime": "HH:MM"
}

Câu cần phân tích: "${text}"

Lưu ý:
- Hiểu các từ viết tắt tiếng Việt như: hnay = hôm nay, t2 = thứ 2, etc.
- Nếu không có giờ kết thúc, mặc định cộng thêm 1 giờ
- Nếu thiếu thông tin, để giá trị null
- Ngày hôm nay là: ${new Date().toISOString().split('T')[0]}`;

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${CONFIG.GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });

            const data = await response.json();
            const responseText = data.candidates[0].content.parts[0].text;
            
            // Extract JSON from response
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                const errors = [];
                
                if (!parsed.taskName) errors.push('Tên công việc');
                if (!parsed.date) errors.push('Ngày');
                if (!parsed.startTime) errors.push('Giờ bắt đầu');
                if (!parsed.endTime) errors.push('Giờ kết thúc');
                
                return {
                    success: errors.length === 0,
                    data: parsed,
                    errors: errors
                };
            }
        } catch (error) {
            console.error('API parsing error:', error);
        }
        
        return { success: false, errors: ['Không thể phân tích'] };
    },

    // Generate reminder message
    generateReminder: async (taskName, time) => {
        const defaultMessage = `${AI.userName} ơi, đừng quên "${taskName}" vào lúc ${time} nha! 💪`;
        
        if (CONFIG.GEMINI_API_KEY && CONFIG.GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY_HERE') {
            try {
                const prompt = `Tạo một câu nhắc nhở dễ thương cho người bạn tên ${AI.userName} để bạn ấy không quên công việc "${taskName}" vào lúc ${time}. Câu nhắc nên vui vẻ, có emoji và không quá 100 ký tự.`;
                
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${CONFIG.GEMINI_API_KEY}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: prompt
                            }]
                        }]
                    })
                });

                const data = await response.json();
                return data.candidates[0].content.parts[0].text || defaultMessage;
            } catch (error) {
                console.error('Reminder generation error:', error);
            }
        }
        
        return defaultMessage;
    }
};

// ==================== FIREWORKS EFFECT ====================
const Fireworks = {
    canvas: null,
    ctx: null,
    particles: [],
    animationId: null,

    init: () => {
        Fireworks.canvas = document.getElementById('fireworks-canvas');
        Fireworks.ctx = Fireworks.canvas.getContext('2d');
        Fireworks.resize();
        window.addEventListener('resize', Fireworks.resize);
    },

    resize: () => {
        Fireworks.canvas.width = window.innerWidth;
        Fireworks.canvas.height = window.innerHeight;
    },

    createParticle: (x, y, color) => {
        return {
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
            life: 1,
            color: color,
            size: Math.random() * 4 + 2
        };
    },

    explode: (x, y) => {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dfe6e9', '#fd79a8', '#a29bfe'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        for (let i = 0; i < 50; i++) {
            Fireworks.particles.push(Fireworks.createParticle(x, y, color));
        }
        
        if (!Fireworks.animationId) {
            Fireworks.animate();
        }
    },

    animate: () => {
        Fireworks.ctx.clearRect(0, 0, Fireworks.canvas.width, Fireworks.canvas.height);
        
        for (let i = Fireworks.particles.length - 1; i >= 0; i--) {
            const p = Fireworks.particles[i];
            
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.2; // gravity
            p.life -= 0.02;
            
            if (p.life <= 0) {
                Fireworks.particles.splice(i, 1);
                continue;
            }
            
            Fireworks.ctx.beginPath();
            Fireworks.ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            Fireworks.ctx.fillStyle = p.color;
            Fireworks.ctx.globalAlpha = p.life;
            Fireworks.ctx.fill();
        }
        
        Fireworks.ctx.globalAlpha = 1;
        
        if (Fireworks.particles.length > 0) {
            Fireworks.animationId = requestAnimationFrame(Fireworks.animate);
        } else {
            Fireworks.animationId = null;
        }
    },

    // Launch multiple fireworks
    launch: () => {
        const positions = [
            { x: window.innerWidth * 0.3, y: window.innerHeight * 0.4 },
            { x: window.innerWidth * 0.5, y: window.innerHeight * 0.3 },
            { x: window.innerWidth * 0.7, y: window.innerHeight * 0.4 }
        ];
        
        positions.forEach((pos, i) => {
            setTimeout(() => {
                Fireworks.explode(pos.x, pos.y);
            }, i * 200);
        });
    }
};

// ==================== ICON EFFECTS ====================
const IconEffects = {
    container: null,
    
    init: () => {
        IconEffects.container = document.getElementById('icon-effects-container');
    },
    
    spawn: (x, y, count = 10) => {
        const icon = Utils.randomItem(ICON_COLLECTION);
        
        for (let i = 0; i < count; i++) {
            const element = document.createElement('div');
            element.className = 'flying-icon';
            element.textContent = icon;
            element.style.left = (x + (Math.random() - 0.5) * 50) + 'px';
            element.style.top = (y + (Math.random() - 0.5) * 50) + 'px';
            element.style.animationDelay = (Math.random() * 0.3) + 's';
            
            IconEffects.container.appendChild(element);
            
            setTimeout(() => element.remove(), 2000);
        }
    }
};

// ==================== NOTIFICATION MANAGER ====================
const Notification = {
    show: (message, type = 'info', duration = 3000) => {
        const toast = document.getElementById('notification-toast');
        const text = document.getElementById('notification-text');
        
        toast.className = `notification-toast ${type}`;
        text.textContent = message;
        toast.classList.remove('hidden');
        
        setTimeout(() => {
            toast.classList.add('hidden');
        }, duration);
    },

    success: (message) => Notification.show(message, 'success'),
    error: (message) => Notification.show(message, 'error'),
    warning: (message) => Notification.show(message, 'warning'),
    info: (message) => Notification.show(message, 'info')
};

// ==================== CALENDAR MANAGER ====================
const Calendar = {
    currentWeekStart: null,
    
    init: () => {
        Calendar.currentWeekStart = Utils.getWeekStart(new Date());
        Calendar.renderThisWeek();
        Calendar.renderNextWeek();
    },

    // Get days of a week
    getWeekDays: (weekStart) => {
        const days = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(weekStart);
            date.setDate(date.getDate() + i);
            days.push(date);
        }
        return days;
    },

    // Check if date is today
    isToday: (date) => {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    },

    // Get holiday for date
    getHoliday: (date) => {
        const monthDay = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        return VIETNAMESE_HOLIDAYS[monthDay] || null;
    },

    // Create day element
    createDayElement: (date, isMini = false) => {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day';
        dayDiv.dataset.date = date.toISOString().split('T')[0];
        
        if (Calendar.isToday(date)) {
            dayDiv.classList.add('today');
        }
        
        const holiday = Calendar.getHoliday(date);
        if (holiday) {
            dayDiv.classList.add('holiday', holiday.type);
        }
        
        // Lunar date calculation
        const lunar = Utils.solarToLunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
        
        // Day header
        const header = document.createElement('div');
        header.className = 'day-header';
        
        const dayName = document.createElement('div');
        dayName.className = 'day-name';
        dayName.textContent = Utils.getDayName(date.getDay());
        
        const dayDate = document.createElement('div');
        dayDate.className = 'day-date';
        dayDate.textContent = `(${Utils.formatDate(date, 'DD/MM/YYYY')})`;
        
        const lunarDate = document.createElement('div');
        lunarDate.className = 'lunar-date';
        lunarDate.textContent = `${lunar.day}/${lunar.month} ÂL`;
        
        header.appendChild(dayName);
        header.appendChild(dayDate);
        header.appendChild(lunarDate);
        
        if (holiday) {
            const holidayBadge = document.createElement('div');
            holidayBadge.className = 'holiday-badge';
            holidayBadge.textContent = holiday.name;
            header.appendChild(holidayBadge);
        }
        
        // Day content (tasks area)
        const content = document.createElement('div');
        content.className = 'day-content';
        content.dataset.date = date.toISOString().split('T')[0];
        
        // Hour grid (invisible, for positioning)
        const hourGrid = document.createElement('div');
        hourGrid.className = 'hour-grid';
        for (let h = 0; h < 24; h++) {
            const slot = document.createElement('div');
            slot.className = 'hour-slot';
            slot.dataset.hour = h;
            hourGrid.appendChild(slot);
        }
        content.appendChild(hourGrid);
        
        // Current time indicator (if today)
        if (Calendar.isToday(date)) {
            const now = new Date();
            const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();
            const percentage = (minutesSinceMidnight / (24 * 60)) * 100;
            
            const timeLine = document.createElement('div');
            timeLine.className = 'current-time-line';
            timeLine.style.top = percentage + '%';
            content.appendChild(timeLine);
        }
        
        dayDiv.appendChild(header);
        dayDiv.appendChild(content);
        
        return dayDiv;
    },

    // Render this week
    renderThisWeek: () => {
        const container = document.getElementById('this-week-calendar');
        container.innerHTML = '';
        
        const days = Calendar.getWeekDays(Calendar.currentWeekStart);
        days.forEach(date => {
            container.appendChild(Calendar.createDayElement(date, false));
        });
        
        // Render tasks
        Calendar.renderTasks();
    },

    // Render next week
    renderNextWeek: () => {
        const container = document.getElementById('next-week-calendar');
        container.innerHTML = '';
        
        const nextWeekStart = new Date(Calendar.currentWeekStart);
        nextWeekStart.setDate(nextWeekStart.getDate() + 7);
        
        const days = Calendar.getWeekDays(nextWeekStart);
        days.forEach(date => {
            container.appendChild(Calendar.createDayElement(date, true));
        });
        
        // Render tasks
        Calendar.renderTasks();
    },

    // Render tasks on calendar
    renderTasks: () => {
        const tasks = Storage.getTasks(App.workspaceId);
        
        // Clear existing tasks
        document.querySelectorAll('.task-item').forEach(el => el.remove());
        
        tasks.forEach(task => {
            Calendar.renderTask(task);
        });
    },

    // Render single task
    renderTask: (task, animate = false) => {
        const dayContent = document.querySelector(`.day-content[data-date="${task.date}"]`);
        if (!dayContent) return;
        
        const taskEl = document.createElement('div');
        taskEl.className = `task-item task-color-${task.color}`;
        taskEl.dataset.taskId = task.id;
        
        if (animate) {
            taskEl.classList.add('adding');
        }
        
        // Calculate position based on time
        const [startH, startM] = task.startTime.split(':').map(Number);
        const [endH, endM] = task.endTime.split(':').map(Number);
        
        const startMinutes = startH * 60 + startM;
        const endMinutes = endH * 60 + endM;
        const duration = endMinutes - startMinutes;
        
        const topPercent = (startMinutes / (24 * 60)) * 100;
        const heightPercent = (duration / (24 * 60)) * 100;
        
        taskEl.style.top = topPercent + '%';
        taskEl.style.height = Math.max(heightPercent, 3) + '%'; // Minimum 3%
        
        // Task content
        const timeEl = document.createElement('div');
        timeEl.className = 'task-time';
        timeEl.textContent = `${task.startTime} - ${task.endTime}`;
        
        const nameEl = document.createElement('div');
        nameEl.className = 'task-name';
        nameEl.textContent = task.name;
        
        taskEl.appendChild(timeEl);
        taskEl.appendChild(nameEl);
        
        // Event listeners
        taskEl.addEventListener('click', (e) => {
            e.stopPropagation();
            Calendar.onTaskClick(task, e);
        });
        
        taskEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
            Calendar.onTaskRightClick(task, e);
        });
        
        dayContent.appendChild(taskEl);
    },

    // Handle task click
    onTaskClick: async (task, event) => {
        // Spawn icon effects
        IconEffects.spawn(event.clientX, event.clientY, 15);
        
        // Show reminder
        const reminder = await AI.generateReminder(task.name, task.startTime);
        const reminderToast = document.getElementById('reminder-toast');
        const reminderText = document.getElementById('reminder-text');
        
        reminderText.textContent = reminder;
        reminderToast.classList.remove('hidden');
        
        setTimeout(() => {
            reminderToast.classList.add('hidden');
        }, 5000);
        
        // Update AI message
        App.updateAIMessage('encouragement');
    },

    // Handle task right click
    onTaskRightClick: (task, event) => {
        App.selectedTask = task;
        
        const contextMenu = document.getElementById('context-menu');
        contextMenu.style.left = event.clientX + 'px';
        contextMenu.style.top = event.clientY + 'px';
        contextMenu.classList.remove('hidden');
        
        // Close menu on click outside
        const closeMenu = (e) => {
            if (!contextMenu.contains(e.target)) {
                contextMenu.classList.add('hidden');
                document.removeEventListener('click', closeMenu);
            }
        };
        
        setTimeout(() => {
            document.addEventListener('click', closeMenu);
        }, 10);
    },

    // Check for time conflicts
    checkConflict: (newTask, excludeId = null) => {
        const tasks = Storage.getTasks(App.workspaceId);
        
        for (let task of tasks) {
            if (task.id === excludeId) continue;
            if (task.date !== newTask.date) continue;
            
            if (Utils.isTimeOverlap(newTask.startTime, newTask.endTime, task.startTime, task.endTime)) {
                return task;
            }
        }
        
        return null;
    },

    // Add new task
    addTask: (taskData, forceReplace = false) => {
        const tasks = Storage.getTasks(App.workspaceId);
        
        // Check for conflict
        if (!forceReplace) {
            const conflict = Calendar.checkConflict(taskData);
            if (conflict) {
                App.showConflictModal(taskData, conflict);
                return false;
            }
        }
        
        // Validate date range
        const taskDate = new Date(taskData.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Check if past
        if (taskDate < today) {
            Notification.warning(AI.getMessage('pastError'));
            App.updateAIMessage('pastError');
            return false;
        }
        
        // Check if too far in future
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 28);
        if (taskDate > maxDate) {
            Notification.warning(AI.getMessage('futureError'));
            App.updateAIMessage('futureError');
            return false;
        }
        
        // Create task object
        const task = {
            id: Utils.generateId(),
            name: taskData.taskName,
            date: taskData.date,
            startTime: taskData.startTime,
            endTime: taskData.endTime,
            color: Utils.getRandomColor(),
            createdAt: new Date().toISOString()
        };
        
        tasks.push(task);
        Storage.saveTasks(App.workspaceId, tasks);
        
        // Render task with animation
        Calendar.renderTask(task, true);
        
        // Launch fireworks
        Fireworks.launch();
        
        // Show success notification
        Notification.success('Đã thêm công việc thành công!');
        App.updateAIMessage('taskAdded');
        
        return true;
    },

    // Delete task
    deleteTask: (taskId) => {
        const tasks = Storage.getTasks(App.workspaceId);
        const taskIndex = tasks.findIndex(t => t.id === taskId);
        
        if (taskIndex === -1) return;
        
        const deletedTask = tasks[taskIndex];
        tasks.splice(taskIndex, 1);
        Storage.saveTasks(App.workspaceId, tasks);
        
        // Animate removal
        const taskEl = document.querySelector(`.task-item[data-task-id="${taskId}"]`);
        if (taskEl) {
            taskEl.classList.add('removing');
            setTimeout(() => taskEl.remove(), 300);
        }
        
        // Show undo toast
        App.showUndoToast(deletedTask);
        
        App.updateAIMessage('taskDeleted');
    },

    // Edit task
    editTask: (taskId, newData) => {
        const tasks = Storage.getTasks(App.workspaceId);
        const taskIndex = tasks.findIndex(t => t.id === taskId);
        
        if (taskIndex === -1) return;
        
        // Check for conflict (excluding self)
        const conflict = Calendar.checkConflict(newData, taskId);
        if (conflict) {
            App.showConflictModal(newData, conflict);
            return false;
        }
        
        tasks[taskIndex] = {
            ...tasks[taskIndex],
            name: newData.taskName || newData.name,
            date: newData.date,
            startTime: newData.startTime,
            endTime: newData.endTime
        };
        
        Storage.saveTasks(App.workspaceId, tasks);
        
        // Re-render calendars
        Calendar.renderThisWeek();
        Calendar.renderNextWeek();
        
        Notification.success('Đã cập nhật công việc!');
        App.updateAIMessage('taskEdited');
        
        return true;
    },

    // Restore task
    restoreTask: (task) => {
        const tasks = Storage.getTasks(App.workspaceId);
        tasks.push(task);
        Storage.saveTasks(App.workspaceId, tasks);
        
        Calendar.renderTask(task, true);
        Notification.success('Đã khôi phục công việc!');
    }
};

// ==================== HISTORY & FUTURE MANAGER ====================
const HistoryFuture = {
    // Get past weeks data
    getPastWeeks: () => {
        const weeks = [];
        const today = new Date();
        
        for (let i = 1; i <= 4; i++) {
            const weekStart = new Date(today);
            weekStart.setDate(weekStart.getDate() - (i * 7));
            const actualStart = Utils.getWeekStart(weekStart);
            const actualEnd = Utils.getWeekEnd(weekStart);
            
            weeks.push({
                start: actualStart,
                end: actualEnd,
                tasks: HistoryFuture.getTasksForWeek(actualStart, actualEnd)
            });
        }
        
        return weeks;
    },

    // Get future weeks data
    getFutureWeeks: () => {
        const weeks = [];
        const today = new Date();
        const currentWeekStart = Utils.getWeekStart(today);
        
        for (let i = 2; i <= 5; i++) { // Start from week after next
            const weekStart = new Date(currentWeekStart);
            weekStart.setDate(weekStart.getDate() + (i * 7));
            const actualEnd = Utils.getWeekEnd(weekStart);
            
            weeks.push({
                start: weekStart,
                end: actualEnd,
                tasks: HistoryFuture.getTasksForWeek(weekStart, actualEnd)
            });
        }
        
        return weeks;
    },

    // Get tasks for a specific week
    getTasksForWeek: (weekStart, weekEnd) => {
        const tasks = Storage.getTasks(App.workspaceId);
        const startStr = weekStart.toISOString().split('T')[0];
        const endStr = weekEnd.toISOString().split('T')[0];
        
        return tasks.filter(task => {
            return task.date >= startStr && task.date <= endStr;
        });
    },

    // Render weeks container
    renderWeeksContainer: (containerId, weeks, type) => {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        
        weeks.forEach((week, index) => {
            const card = document.createElement('div');
            card.className = 'week-card fade-scale';
            card.style.animationDelay = (index * 0.1) + 's';
            card.dataset.weekIndex = index;
            card.dataset.type = type;
            
            const range = document.createElement('div');
            range.className = 'week-range';
            range.textContent = `${Utils.formatDate(week.start)} - ${Utils.formatDate(week.end)}`;
            
            const count = document.createElement('div');
            count.className = 'week-tasks-count';
            count.textContent = `${week.tasks.length} công việc`;
            
            card.appendChild(range);
            card.appendChild(count);
            
            card.addEventListener('click', () => {
                HistoryFuture.showWeekDetail(week, type);
            });
            
            container.appendChild(card);
        });
    },

    // Show week detail
    showWeekDetail: (week, type) => {
        const containerId = type === 'history' ? 'history-weeks-container' : 'future-weeks-container';
        const detailId = type === 'history' ? 'history-detail-view' : 'future-detail-view';
        const contentId = type === 'history' ? 'history-detail-content' : 'future-detail-content';
        
        document.getElementById(containerId).classList.add('hidden');
        document.getElementById(detailId).classList.remove('hidden');
        
        const content = document.getElementById(contentId);
        content.innerHTML = '';
        
        // Header
        const header = document.createElement('div');
        header.className = 'detail-header';
        header.textContent = `${Utils.formatDate(week.start)} - ${Utils.formatDate(week.end)}`;
        content.appendChild(header);
        
        // Grid
        const grid = document.createElement('div');
        grid.className = 'detail-grid';
        
        const days = Calendar.getWeekDays(week.start);
        days.forEach(date => {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'detail-day';
            
            const dayHeader = document.createElement('div');
            dayHeader.className = 'detail-day-header';
            dayHeader.innerHTML = `${Utils.getDayName(date.getDay())}<br>${Utils.formatDate(date, 'DD/MM')}`;
            dayDiv.appendChild(dayHeader);
            
            // Tasks for this day
            const dayTasks = week.tasks.filter(t => t.date === date.toISOString().split('T')[0]);
            dayTasks.forEach(task => {
                const taskDiv = document.createElement('div');
                taskDiv.className = `detail-task task-color-${task.color}`;
                taskDiv.innerHTML = `<strong>${task.startTime}</strong> ${task.name}`;
                dayDiv.appendChild(taskDiv);
            });
            
            if (dayTasks.length === 0) {
                const empty = document.createElement('div');
                empty.className = 'empty-state';
                empty.innerHTML = '<i class="fas fa-inbox"></i><p>Trống</p>';
                empty.style.padding = '10px';
                empty.style.fontSize = '0.7rem';
                dayDiv.appendChild(empty);
            }
            
            grid.appendChild(dayDiv);
        });
        
        content.appendChild(grid);
    },

    // Back to weeks list
    backToWeeksList: (type) => {
        const containerId = type === 'history' ? 'history-weeks-container' : 'future-weeks-container';
        const detailId = type === 'history' ? 'history-detail-view' : 'future-detail-view';
        
        document.getElementById(containerId).classList.remove('hidden');
        document.getElementById(detailId).classList.add('hidden');
    }
};

// ==================== MAIN APP ====================
const App = {
    workspaceId: null,
    selectedTask: null,
    deletedTask: null,
    undoTimeout: null,
    aiMessageInterval: null,

    // Initialize app
    init: () => {
        // Check for workspace ID in URL
        const urlId = Utils.getUrlParam('id');
        
        if (urlId) {
            App.workspaceId = urlId;
            Storage.saveLastWorkspace(urlId);
            App.initDashboard();
        } else {
            // Check for last workspace
            const lastWorkspace = Storage.getLastWorkspace();
            if (lastWorkspace) {
                // Optionally redirect to last workspace
                // window.location.href = `?id=${lastWorkspace}`;
            }
            App.initLanding();
        }
        
        // Initialize effects
        Fireworks.init();
        IconEffects.init();
        
        // Start datetime update
        App.updateDateTime();
        setInterval(App.updateDateTime, 1000);
        
        // Add button effects
        App.initButtonEffects();
    },

    // Initialize landing page
    initLanding: () => {
        document.getElementById('landing-page').classList.remove('hidden');
        document.getElementById('dashboard-page').classList.add('hidden');
        
        // Create link button
        document.getElementById('create-link-btn').addEventListener('click', () => {
            const newId = Utils.generateId();
            const newLink = `${window.location.origin}${window.location.pathname}?id=${newId}`;
            
            document.getElementById('generated-link').value = newLink;
            Notification.success('Đã tạo link thành công!');
            
            // Add animation
            document.getElementById('create-link-btn').classList.add('btn-press');
            setTimeout(() => {
                document.getElementById('create-link-btn').classList.remove('btn-press');
            }, 150);
        });
        
        // Copy link button
        document.getElementById('copy-link-btn').addEventListener('click', () => {
            const linkInput = document.getElementById('generated-link');
            if (!linkInput.value) {
                Notification.warning('Chưa có link để sao chép!');
                return;
            }
            
            navigator.clipboard.writeText(linkInput.value).then(() => {
                Notification.success('Đã sao chép link!');
                const btn = document.getElementById('copy-link-btn');
                btn.classList.add('copied');
                btn.innerHTML = '<i class="fas fa-check"></i>';
                
                setTimeout(() => {
                    btn.classList.remove('copied');
                    btn.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            });
        });
    },

    // Initialize dashboard
    initDashboard: () => {
        document.getElementById('landing-page').classList.add('hidden');
        document.getElementById('dashboard-page').classList.remove('hidden');
        
        // Cleanup old tasks
        Storage.cleanupOldTasks(App.workspaceId);
        
        // Check if first visit
        if (Storage.isFirstVisit(App.workspaceId)) {
            App.showWelcomeModal();
        } else {
            const userName = Storage.getUserName(App.workspaceId);
            AI.init(userName);
            App.startAIMessages();
        }
        
        // Initialize calendar
        Calendar.init();
        
        // Setup event listeners
        App.setupDashboardListeners();
    },

    // Show welcome modal
    showWelcomeModal: () => {
        document.getElementById('welcome-modal').classList.remove('hidden');
        
        document.getElementById('start-btn').addEventListener('click', () => {
            const nameInput = document.getElementById('user-name-input');
            const name = nameInput.value.trim();
            
            if (!name) {
                Notification.warning('Cho tui biết tên cậu đi! 😊');
                nameInput.focus();
                return;
            }
            
            // Save user name
            Storage.saveUserName(App.workspaceId, name);
            Storage.markVisited(App.workspaceId);
            
            // Initialize AI
            AI.init(name);
            
            // Close modal
            document.getElementById('welcome-modal').classList.add('hidden');
            
            // Start AI messages
            App.startAIMessages();
            
            // Welcome notification
            Notification.success(`Chào mừng ${name}! 🎉`);
            Fireworks.launch();
        });
        
        // Enter key support
        document.getElementById('user-name-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('start-btn').click();
            }
        });
    },

    // Setup dashboard event listeners
    setupDashboardListeners: () => {
        // Add task button
        document.getElementById('add-task-btn').addEventListener('click', App.handleAddTask);
        
        // Enter key for task input
        document.getElementById('task-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                App.handleAddTask();
            }
        });
        
        // Help button
        document.getElementById('help-btn').addEventListener('click', () => {
            document.getElementById('help-modal').classList.remove('hidden');
        });
        
        // History button
        document.getElementById('history-btn').addEventListener('click', () => {
            const weeks = HistoryFuture.getPastWeeks();
            HistoryFuture.renderWeeksContainer('history-weeks-container', weeks, 'history');
            document.getElementById('history-detail-view').classList.add('hidden');
            document.getElementById('history-weeks-container').classList.remove('hidden');
            document.getElementById('history-modal').classList.remove('hidden');
        });
        
        // Future button
        document.getElementById('future-btn').addEventListener('click', () => {
            const weeks = HistoryFuture.getFutureWeeks();
            HistoryFuture.renderWeeksContainer('future-weeks-container', weeks, 'future');
            document.getElementById('future-detail-view').classList.add('hidden');
            document.getElementById('future-weeks-container').classList.remove('hidden');
            document.getElementById('future-modal').classList.remove('hidden');
        });
        
        // Modal close buttons
        document.querySelectorAll('.modal-close-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const modalId = btn.dataset.close;
                document.getElementById(modalId).classList.add('hidden');
            });
        });
        
        // Modal overlay click to close
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', () => {
                overlay.parentElement.classList.add('hidden');
            });
        });
        
        // Back buttons
        document.querySelectorAll('.back-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const type = btn.dataset.back.includes('history') ? 'history' : 'future';
                HistoryFuture.backToWeeksList(type);
            });
        });
        
        // Context menu actions
        document.querySelector('.context-menu .edit-item').addEventListener('click', () => {
            document.getElementById('context-menu').classList.add('hidden');
            App.showEditModal(App.selectedTask);
        });
        
        document.querySelector('.context-menu .delete-item').addEventListener('click', () => {
            document.getElementById('context-menu').classList.add('hidden');
            Calendar.deleteTask(App.selectedTask.id);
        });
        
        // Edit modal save
        document.getElementById('save-edit-btn').addEventListener('click', () => {
            const name = document.getElementById('edit-task-name').value;
            const date = document.getElementById('edit-task-date').value;
            const start = document.getElementById('edit-task-start').value;
            const end = document.getElementById('edit-task-end').value;
            
            if (!name || !date || !start || !end) {
                Notification.warning('Vui lòng điền đầy đủ thông tin!');
                return;
            }
            
            const success = Calendar.editTask(App.selectedTask.id, {
                name: name,
                date: date,
                startTime: start,
                endTime: end
            });
            
            if (success) {
                document.getElementById('edit-modal').classList.add('hidden');
            }
        });
        
        // Undo button
        document.getElementById('undo-btn').addEventListener('click', () => {
            if (App.deletedTask) {
                Calendar.restoreTask(App.deletedTask);
                App.hideUndoToast();
            }
        });
        
        // Reminder close
        document.querySelector('.reminder-close').addEventListener('click', () => {
            document.getElementById('reminder-toast').classList.add('hidden');
        });
        
        // Conflict modal buttons
        document.getElementById('replace-task-btn').addEventListener('click', () => {
            document.getElementById('conflict-modal').classList.add('hidden');
            // Delete conflicting task and add new one
            Calendar.deleteTask(App.conflictingTask.id);
            Calendar.addTask(App.pendingTask, true);
        });
        
        document.getElementById('edit-task-btn').addEventListener('click', () => {
            document.getElementById('conflict-modal').classList.add('hidden');
            document.getElementById('task-input').focus();
        });
    },

    // Handle add task
    handleAddTask: async () => {
        const input = document.getElementById('task-input');
        const text = input.value.trim();
        
        if (!text) {
            Notification.warning('Vui lòng nhập công việc!');
            return;
        }
        
        // Show loading
        document.getElementById('loading-overlay').classList.remove('hidden');
        
        try {
            const result = await AI.parseTask(text);
            
            document.getElementById('loading-overlay').classList.add('hidden');
            
            if (result.success) {
                const added = Calendar.addTask(result.data);
                if (added) {
                    input.value = '';
                }
            } else {
                const missingInfo = result.errors.join(', ');
                const errorMsg = `${AI.userName} ơi, cậu nhập thiếu: ${missingInfo}. Nhập lại giúp tui nhé! 📝`;
                Notification.warning(errorMsg);
                App.updateAIMessageDirect(errorMsg);
            }
        } catch (error) {
            document.getElementById('loading-overlay').classList.add('hidden');
            Notification.error('Có lỗi xảy ra, vui lòng thử lại!');
            console.error(error);
        }
    },

    // Show conflict modal
    showConflictModal: (newTask, conflictingTask) => {
        App.pendingTask = newTask;
        App.conflictingTask = conflictingTask;
        
        const details = document.getElementById('conflict-details');
        details.innerHTML = `
            <div class="conflict-task">
                <div class="conflict-task-color task-color-${conflictingTask.color}" style="width:20px;height:20px;border-radius:50%;"></div>
                <div class="conflict-task-info">
                    <div class="conflict-task-name">${conflictingTask.name}</div>
                    <div class="conflict-task-time">${conflictingTask.startTime} - ${conflictingTask.endTime}</div>
                </div>
            </div>
        `;
        
        document.getElementById('conflict-modal').classList.remove('hidden');
        App.updateAIMessage('conflict');
    },

    // Show edit modal
    showEditModal: (task) => {
        document.getElementById('edit-task-name').value = task.name;
        document.getElementById('edit-task-date').value = task.date;
        document.getElementById('edit-task-start').value = task.startTime;
        document.getElementById('edit-task-end').value = task.endTime;
        document.getElementById('edit-modal').classList.remove('hidden');
    },

    // Show undo toast
    showUndoToast: (task) => {
        App.deletedTask = task;
        
        const toast = document.getElementById('undo-toast');
        toast.classList.remove('hidden');
        
        // Reset animation
        const progress = toast.querySelector('.undo-progress');
        progress.style.animation = 'none';
        progress.offsetHeight; // Trigger reflow
        progress.style.animation = null;
        
        // Clear previous timeout
        if (App.undoTimeout) {
            clearTimeout(App.undoTimeout);
        }
        
        // Set new timeout
        App.undoTimeout = setTimeout(() => {
            App.hideUndoToast();
        }, CONFIG.UNDO_TIMEOUT);
    },

    // Hide undo toast
    hideUndoToast: () => {
        document.getElementById('undo-toast').classList.add('hidden');
        App.deletedTask = null;
        
        if (App.undoTimeout) {
            clearTimeout(App.undoTimeout);
            App.undoTimeout = null;
        }
    },

    // Update AI message
    updateAIMessage: (category, replacements = {}) => {
        const message = AI.getMessage(category, replacements);
        App.updateAIMessageDirect(message);
    },

    // Update AI message directly
    updateAIMessageDirect: (message) => {
        const messageEl = document.getElementById('ai-message');
        messageEl.style.opacity = '0';
        
        setTimeout(() => {
            messageEl.textContent = message;
            messageEl.style.opacity = '1';
        }, 200);
    },

    // Start periodic AI messages
    startAIMessages: () => {
        // Initial greeting
        App.updateAIMessageDirect(AI.getTimeBasedGreeting());
        
        // Periodic messages
        App.aiMessageInterval = setInterval(() => {
            const categories = ['greetings', 'encouragement'];
            const category = Utils.randomItem(categories);
            App.updateAIMessage(category);
        }, CONFIG.AI_MESSAGE_INTERVAL);
    },

    // Update datetime display
    updateDateTime: () => {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        
        const formatted = now.toLocaleDateString('vi-VN', options);
        document.getElementById('datetime-text').textContent = formatted;
        
        // Update current time line
        const timeLine = document.querySelector('.current-time-line');
        if (timeLine) {
            const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();
            const percentage = (minutesSinceMidnight / (24 * 60)) * 100;
            timeLine.style.top = percentage + '%';
        }
    },

    // Initialize button effects
    initButtonEffects: () => {
        document.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', function(e) {
                // Add press animation
                this.classList.add('btn-press');
                setTimeout(() => this.classList.remove('btn-press'), 150);
                
                // Add ripple effect
                if (!this.classList.contains('context-item')) {
                    Utils.createRipple(e, this);
                }
            });
        });
    }
};

// ==================== INITIALIZE APP ====================
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// ==================== SERVICE WORKER REGISTRATION (Optional) ====================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// ==================== HANDLE PAGE VISIBILITY ====================
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Refresh calendar when page becomes visible
        if (App.workspaceId) {
            Calendar.renderThisWeek();
            Calendar.renderNextWeek();
        }
    }
});

// ==================== HANDLE BEFORE UNLOAD ====================
window.addEventListener('beforeunload', () => {
    // Save any pending data
    if (App.workspaceId) {
        Storage.cleanupOldTasks(App.workspaceId);
    }
});

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', (e) => {
    // Escape to close modals
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.add('hidden');
        });
        document.getElementById('context-menu').classList.add('hidden');
    }
    
    // Ctrl + Enter to add task
    if (e.ctrlKey && e.key === 'Enter') {
        if (document.activeElement.id === 'task-input') {
            App.handleAddTask();
        }
    }
});

// ==================== EXPORT FOR DEBUGGING ====================
window.TaskManagerDebug = {
    App,
    Calendar,
    Storage,
    AI,
    Utils,
    Fireworks,
    IconEffects
};
