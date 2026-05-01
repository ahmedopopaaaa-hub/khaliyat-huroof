import React, { useState, useEffect, useMemo } from "react";

// Inline SVG Icons
const TrophyIcon = ({ size, className, style }: any) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const ArrowRightIcon = ({ size, className }: any) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const RefreshCwIcon = ({ size, className }: any) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);

const SettingsIcon = ({ size, className }: any) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const CheckIcon = ({ size, className }: any) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const XIcon = ({ size, className }: any) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const TEAM_COLORS = [
  { id: "electric-blue", name: "أزرق كهربائي", hex: "#007BFF" },
  { id: "emerald-green", name: "أخضر زمردي", hex: "#22c55e" },
  { id: "golden-yellow", name: "أصفر ذهبي", hex: "#FFDF00" },
  { id: "crimson-red", name: "أحمر قرمزي", hex: "#DC143C" },
  { id: "deep-orange", name: "برتقالي داكن", hex: "#FF8C00" },
  { id: "purple", name: "بنفسجي", hex: "#9333ea" },
  { id: "pink", name: "وردي", hex: "#EC4899" },
];

const ARABIC_LETTERS = [
  "أ", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط",
  "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "ة", "و", "ي",
];

type Question = { q: string; a: string; image?: string };

type Team = {
  name: string;
  color: (typeof TEAM_COLORS)[0];
};

type CellOwner = "none" | "team1" | "team2";

interface CellData {
  id: number;
  letter: string;
  owner: CellOwner;
  c: number;
  r: number;
  isTransforming?: boolean;
}

const getNeighbors = (c: number, r: number, size: number) => {
  const isEvenRow = r % 2 === 0;
  return [
    { c: c - 1, r },
    { c: c + 1, r },
    { c: isEvenRow ? c - 1 : c, r: r - 1 },
    { c: isEvenRow ? c : c + 1, r: r - 1 },
    { c: isEvenRow ? c - 1 : c, r: r + 1 },
    { c: isEvenRow ? c : c + 1, r: r + 1 },
  ].filter((n) => n.c >= 0 && n.c < size && n.r >= 0 && n.r < size);
};

const checkWin = (cells: CellData[], team: "team1" | "team2", size: number) => {
  const isTeam1 = team === "team1";

  const startNodes = cells.filter(
    (cell) => cell.owner === team && (isTeam1 ? cell.r === 0 : cell.c === 0),
  );

  if (startNodes.length === 0) return false;

  const visited = new Set<number>();
  const queue = [...startNodes];

  while (queue.length > 0) {
    const curr = queue.shift()!;

    if (isTeam1 && curr.r === size - 1) return true;
    if (!isTeam1 && curr.c === size - 1) return true;

    if (!visited.has(curr.id)) {
      visited.add(curr.id);
      const neighbors = getNeighbors(curr.c, curr.r, size);
      for (const n of neighbors) {
        const neighborCell = cells.find(
          (cell) => cell.c === n.c && cell.r === n.r,
        );
        if (
          neighborCell &&
          neighborCell.owner === team &&
          !visited.has(neighborCell.id)
        ) {
          queue.push(neighborCell);
        }
      }
    }
  }

  return false;
};

export default function App() {
  const [gameState, setGameState] = useState<"auth" | "landing" | "settings" | "playing" | "winner">("auth");
  const [accessCode, setAccessCode] = useState("");
  const [authError, setAuthError] = useState(() => {
    if (typeof window !== "undefined") {
      const reason = sessionStorage.getItem("kick_reason");
      if (reason) {
        sessionStorage.removeItem("kick_reason");
        return reason;
      }
    }
    return "";
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [isCheckingInitial, setIsCheckingInitial] = useState(true);

  // Initial Check Effect
  useEffect(() => {
    const checkStoredCode = async () => {
      const storedCode = localStorage.getItem("userCode");
      
      if (!storedCode) {
        setIsCheckingInitial(false);
        return;
      }
      
      setIsVerifying(true);
      try {
        const response = await fetch(`https://script.google.com/macros/s/AKfycbwCyL5k1vlIE4__QnK0c938s2e76NYrU1axTkSztPa5uX7WLmIM-CjNrcv43G8hg5KjTA/exec?action=check&code=${encodeURIComponent(storedCode)}&t=${Date.now()}`, { cache: 'no-store' });
        const text = await response.text();
        let statusStr = text.trim().toUpperCase();
        
        try {
          const data = JSON.parse(text);
          if (data && data.status != null) {
            statusStr = String(data.status).trim().toUpperCase();
          }
        // eslint-disable-next-line no-empty
        } catch(e) {}
        
        if (statusStr === "FALSE" || statusStr.includes("FALSE")) {
          localStorage.clear();
          setAuthError("تم إلغاء التفعيل");
        } else {
          setGameState("landing");
        }
      } catch (error) {
        // Allow entry on network error
        setGameState("landing");
      } finally {
        setIsVerifying(false);
        setIsCheckingInitial(false);
      }
    };
    
    checkStoredCode();
  }, []);
  const [team1, setTeam1] = useState<Team>({
    name: "الفريق الأول",
    color: TEAM_COLORS[1],
  }); // Green
  const [team2, setTeam2] = useState<Team>({
    name: "الفريق الثاني",
    color: TEAM_COLORS[4],
  }); // Orange
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [cells, setCells] = useState<CellData[]>([]);
  const [activeCell, setActiveCell] = useState<CellData | null>(null);
  const [winner, setWinner] = useState<"team1" | "team2" | null>(null);
  const [gridSize, setGridSize] = useState<number>(5);
  const [logoStyle, setLogoStyle] = useState<"main" | "custom">("main");
  const [customLogoText, setCustomLogoText] = useState<string>("");
  const [rounds, setRounds] = useState<"1" | "3" | "5" | "7" | "infinity">("1");
  const [hostType, setHostType] = useState<"human" | "automated">("human");
  const [startingTeam, setStartingTeam] = useState<
    "random" | "team1" | "team2"
  >("random");
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questionsArray, setQuestionsArray] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  const [questionError, setQuestionError] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isHostView, setIsHostView] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    let timeoutId: any;
    let intervalId: any;

    const performBackgroundCheck = async () => {
      const storedCode = localStorage.getItem("userCode");

      if (storedCode) {
        try {
          const response = await fetch(`https://script.google.com/macros/s/AKfycbwCyL5k1vlIE4__QnK0c938s2e76NYrU1axTkSztPa5uX7WLmIM-CjNrcv43G8hg5KjTA/exec?action=check&code=${encodeURIComponent(storedCode)}&t=${Date.now()}`, { cache: 'no-store' });
          const text = await response.text();
          let statusStr = text.trim().toUpperCase();
          
          try {
            const data = JSON.parse(text);
            if (data && data.status != null) {
              statusStr = String(data.status).trim().toUpperCase();
            }
          // eslint-disable-next-line no-empty
          } catch(e) {}
          
          if (statusStr === "FALSE" || statusStr.includes("FALSE")) {
            localStorage.clear();
            if (timeoutId) clearTimeout(timeoutId);
            if (intervalId) clearInterval(intervalId);
            setGameState("auth");
            setAuthError("تم إلغاء التفعيل");
            return;
          }
        } catch (error) {
          console.error("Background check failed but ignored due to network issue:", error);
        }
      }
    };

    // Wait a bit before first check, then check every 10 seconds
    timeoutId = setTimeout(() => {
      performBackgroundCheck();
    }, 2000);
    intervalId = setInterval(performBackgroundCheck, 10000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  const fetchQuestion = async (letter: string, incrementIndex: boolean = false) => {
    const storageKey = `questions_${letter}`;
    const savedState = localStorage.getItem(storageKey);
    
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        if (parsedState.questions && Array.isArray(parsedState.questions) && typeof parsedState.index === 'number') {
          let nextIndex = parsedState.index;
          if (incrementIndex) {
            nextIndex++;
          }
          
          if (nextIndex < parsedState.questions.length) {
            setQuestionsArray(parsedState.questions);
            setCurrentQuestionIndex(nextIndex);
            setCurrentQuestion(parsedState.questions[nextIndex]);
            setShowAnswer(false);
            setQuestionError(null);
            
            localStorage.setItem(storageKey, JSON.stringify({
              questions: parsedState.questions,
              index: nextIndex
            }));
            return;
          } else {
            localStorage.removeItem(storageKey);
          }
        }
      } catch (e) {
        console.error("Error parsing saved state", e);
        localStorage.removeItem(storageKey);
      }
    }

    setIsLoadingQuestion(true);
    setQuestionError(null);
    setCurrentQuestion(null);
    setShowAnswer(false);
    try {
      const response = await fetch(`https://script.google.com/macros/s/AKfycbyXL9APCjg8ew2aMpG6OsuRWVLjRZnlhHuFhv2HgHoO-Iz0JA34hfVvFMqO7xaZ0WBB/exec?letter=${encodeURIComponent(letter)}`);
      if (!response.ok) {
        throw new Error('فشل في جلب السؤال');
      }
      const data = await response.json();
      
      let newQuestionsArray: Question[] = [];
      if (Array.isArray(data)) {
        newQuestionsArray = [...data].sort(() => Math.random() - 0.5);
      } else if (data && data.question && data.answer) {
        newQuestionsArray = [{ q: data.question, a: data.answer }];
      } else {
        throw new Error('بيانات السؤال غير صالحة');
      }

      if (newQuestionsArray.length > 0) {
        setQuestionsArray(newQuestionsArray);
        setCurrentQuestionIndex(0);
        setCurrentQuestion(newQuestionsArray[0]);
        
        localStorage.setItem(storageKey, JSON.stringify({
          questions: newQuestionsArray,
          index: 0
        }));
      } else {
        throw new Error('لا توجد أسئلة متاحة');
      }
    } catch (error) {
      console.error('Error fetching question:', error);
      setQuestionError('حدث خطأ أثناء جلب السؤال. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoadingQuestion(false);
    }
  };

  useEffect(() => {
    if (activeCell) {
      fetchQuestion(activeCell.letter);
    } else {
      setCurrentQuestion(null);
      setShowAnswer(false);
      setQuestionError(null);
    }
  }, [activeCell]);

  const renderGridIcon = (size: number, isSelected: boolean) => {
    const iconCells = [];
    for (let i = 0; i < size * size; i++) {
      let content = "";
      if (size === 6 && [3, 8, 14, 21, 27, 33].includes(i)) {
        content = (i % 9).toString();
      }
      iconCells.push(
        <div
          key={i}
          className={`rounded-[2px] flex items-center justify-center text-[6px] font-bold transition-colors ${isSelected ? "bg-purple-500 text-white shadow-sm" : "bg-slate-700 text-transparent"}`}
        >
          {content}
        </div>,
      );
    }
    return (
      <div
        className="grid gap-[2px] w-10 h-10 md:w-12 md:h-12 mx-auto mb-2"
        style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
      >
        {iconCells}
      </div>
    );
  };

  const generateCells = () => {
    const size = gridSize;
    let pool: string[] = [];

    if (size === 4) {
      pool = [...ARABIC_LETTERS].sort(() => Math.random() - 0.5).slice(0, 16);
    } else if (size === 5) {
      pool = [...ARABIC_LETTERS].sort(() => Math.random() - 0.5).slice(0, 25);
    } else if (size === 6) {
      const letters = [...ARABIC_LETTERS]
        .sort(() => Math.random() - 0.5)
        .slice(0, 26);
      const numbers = Array.from({ length: 10 }, () =>
        Math.floor(Math.random() * 9 + 1).toString(),
      );
      pool = [...letters, ...numbers].sort(() => Math.random() - 0.5);
    } else if (size === 7) {
      const letters = [...ARABIC_LETTERS].sort(() => Math.random() - 0.5);
      const numbers = Array.from({ length: 21 }, () =>
        Math.floor(Math.random() * 9 + 1).toString(),
      );
      pool = [...letters, ...numbers].sort(() => Math.random() - 0.5);
    }

    const newCells: CellData[] = [];
    let id = 0;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        newCells.push({
          id: id++,
          letter: pool[id - 1],
          owner: "none",
          c,
          r,
          isTransforming: false,
        });
      }
    }
    setCells(newCells);
    setWinner(null);
  };

  useEffect(() => {
    generateCells();
  }, []);

  const handleCellClick = (cell: CellData) => {
    if (winner || cell.isTransforming) return;

    if (activeCell?.id === cell.id) {
      setActiveCell(null);
      return;
    }

    const isNumber = /^\d+$/.test(cell.letter);
    if (isNumber) {
      const randomLetter =
        ARABIC_LETTERS[Math.floor(Math.random() * ARABIC_LETTERS.length)];

      setCells((current) =>
        current.map((c) =>
          c.id === cell.id ? { ...c, isTransforming: true } : c,
        ),
      );

      setTimeout(() => {
        setCells((current) =>
          current.map((c) =>
            c.id === cell.id
              ? { ...c, letter: randomLetter, isTransforming: false }
              : c,
          ),
        );

        setTimeout(() => {
          setActiveCell({ ...cell, letter: randomLetter });
        }, 300);
      }, 300);
    } else {
      setActiveCell(cell);
    }
  };

  const markQuestionAsUsed = (letter: string) => {
    const storageKey = `questions_${letter}`;
    const savedState = localStorage.getItem(storageKey);
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        if (parsedState.questions && typeof parsedState.index === 'number') {
          const nextIndex = parsedState.index + 1;
          if (nextIndex < parsedState.questions.length) {
            localStorage.setItem(storageKey, JSON.stringify({
              questions: parsedState.questions,
              index: nextIndex
            }));
          } else {
            localStorage.removeItem(storageKey);
          }
        }
      } catch (e) {
        console.error("Error parsing saved state", e);
      }
    }
  };

  const handleTeamSelection = (owner: "team1" | "team2" | "none") => {
    if (!activeCell) return;

    const cellId = activeCell.id;
    const cellLetter = activeCell.letter;
    
    if (owner !== "none") {
      markQuestionAsUsed(cellLetter);
    }
    
    setActiveCell(null);

    const newCells = cells.map((c) =>
      c.id === cellId || (cellId >= 1000 && c.letter === cellLetter) ? { ...c, owner } : c,
    );
    setCells(newCells);

    if (owner !== "none" && checkWin(newCells, owner, gridSize)) {
      setWinner(owner);
      setGameState("winner");
      if (owner === "team1") setTeam1Score((prev) => prev + 1);
      if (owner === "team2") setTeam2Score((prev) => prev + 1);
    }
  };

  const getGridDimensions = (cols: number, rows: number) => {
    const W = 86.6025;
    const w = 43.3013;
    const h = 25;
    const gridWidth = cols * W + w;
    const gridHeight = (rows - 1) * 75 + 100;
    return { W, w, h, gridWidth, gridHeight };
  };

  const generateBoundaries = (cols: number, rows: number) => {
    const { W, w, h, gridWidth, gridHeight } = getGridDimensions(cols, rows);
    const pad = 60;

    let topPath = `M -${pad},-${pad} L ${gridWidth + pad},-${pad}`;
    for (let c = cols - 1; c >= 0; c--) {
      const cx = c * W + w;
      topPath += ` L ${cx + w},${h} L ${cx},0`;
    }
    topPath += ` L 0,${h} Z`;

    let bottomPath = `M ${gridWidth + pad},${gridHeight + pad} L -${pad},${gridHeight + pad}`;
    const lastRow = rows - 1;
    const isLastRowOdd = lastRow % 2 === 1;
    for (let c = 0; c < cols; c++) {
      const cx = c * W + w + (isLastRowOdd ? w : 0);
      const cy = lastRow * 75 + 50;
      if (c === 0) {
        bottomPath += ` L ${cx - w},${cy + h}`;
      }
      bottomPath += ` L ${cx},${cy + 2 * h} L ${cx + w},${cy + h}`;
    }
    bottomPath += ` Z`;

    let rightPath = `M ${gridWidth + pad},-${pad} L ${gridWidth + pad},${gridHeight + pad}`;
    for (let r = rows - 1; r >= 0; r--) {
      const isOdd = r % 2 === 1;
      const cx = (cols - 1) * W + w + (isOdd ? w : 0);
      const cy = r * 75 + 50;
      if (r === rows - 1) {
        rightPath += ` L ${cx + w},${cy + h}`;
      } else {
        rightPath += ` L ${cx + w},${cy + h}`;
      }
      rightPath += ` L ${cx + w},${cy - h}`;
    }
    rightPath += ` Z`;

    let leftPath = `M -${pad},${gridHeight + pad} L -${pad},-${pad}`;
    for (let r = 0; r < rows; r++) {
      const isOdd = r % 2 === 1;
      const cx = w + (isOdd ? w : 0);
      const cy = r * 75 + 50;
      if (r === 0) {
        leftPath += ` L ${cx - w},${cy - h}`;
      } else {
        leftPath += ` L ${cx - w},${cy - h}`;
      }
      leftPath += ` L ${cx - w},${cy + h}`;
    }
    leftPath += ` Z`;

    return {
      topPath,
      bottomPath,
      rightPath,
      leftPath,
      gridWidth,
      gridHeight,
      pad,
    };
  };

  const getCellColors = (cell: CellData) => {
    if (cell.owner === "team1") return { bg: team1.color.hex, text: "#ffffff" };
    if (cell.owner === "team2") return { bg: team2.color.hex, text: "#ffffff" };
    return { bg: "#ffffff", text: "#3b0764" }; // deep purple
  };

  const hostCells: CellData[] = useMemo(() => {
    return ARABIC_LETTERS.map((letter, index) => {
      const mainBoardCell = cells.find((c) => c.letter === letter);
      let r = 0,
        c = 0;
      if (index < 6) {
        r = 0;
        c = index;
      } else if (index < 12) {
        r = 1;
        c = index - 6;
      } else if (index < 18) {
        r = 2;
        c = index - 12;
      } else if (index < 24) {
        r = 3;
        c = index - 18;
      } else {
        r = 4;
        c = index - 24 + 1;
      }

      return {
        id: index + 1000,
        letter,
        owner: mainBoardCell ? mainBoardCell.owner : "none",
        c,
        r,
        isTransforming: false,
      };
    });
  }, [cells]);

  const handleAuthSubmit = async () => {
    if (!accessCode.trim()) {
      setAuthError("الرجاء إدخال كود الدخول");
      return;
    }

    setIsVerifying(true);
    setAuthError("");

    try {
      const response = await fetch(`https://script.google.com/macros/s/AKfycbwCyL5k1vlIE4__QnK0c938s2e76NYrU1axTkSztPa5uX7WLmIM-CjNrcv43G8hg5KjTA/exec?action=activate&code=${encodeURIComponent(accessCode)}&t=${Date.now()}`, { cache: 'no-store' });
      const text = await response.text();
      let statusStr = text.trim();
      let messageStr = "كود الدخول غير صحيح أو مستخدم مسبقاً.";
      
      try {
        const data = JSON.parse(text);
        if (data && data.status) {
          statusStr = data.status;
        }
        if (data && data.message) {
          messageStr = data.message;
        }
      // eslint-disable-next-line no-empty
      } catch(e) {}

      if (statusStr === "success" || statusStr === "SUCCESS") {
        localStorage.setItem("userCode", accessCode);
        setGameState("landing");
      } else {
        setAuthError(messageStr);
      }
    } catch (error) {
      setAuthError("حدث خطأ أثناء الاتصال بالخادم. حاول مرة أخرى.");
    } finally {
      setIsVerifying(false);
    }
  };

  if (gameState === "auth") {
    return (
      <div
        className="fixed inset-0 overflow-hidden bg-gradient-to-br from-purple-700 via-fuchsia-700 to-pink-600 text-white font-sans flex flex-col items-center justify-center p-6"
        dir="rtl"
      >
        <div className="flex flex-col items-center justify-center mb-12 relative z-10 w-full select-none">
          <h1 className="text-[80px] font-black w-full text-white text-center flex flex-col items-center leading-none mt-10 max-md:text-[60px] tracking-tighter">
            <span className="text-[#fde047] game-title-text z-30 relative block mb-[-15px]">حروف</span>
            <span className="text-[#22d3ee] game-title-text z-20 relative block mb-[-10px] transform -rotate-3">مع</span>
            <span className="text-[#ef4444] game-title-text z-10 relative block">{logoStyle === "custom" && customLogoText ? customLogoText : "أحمد"}</span>
          </h1>
        </div>

        {/* Auth Box Container */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-[32px] w-full max-w-md shadow-2xl flex flex-col items-center relative z-10">
          <div className="bg-purple-900/50 p-4 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#fde047]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-black mb-2 text-center text-white drop-shadow-md">الوصول مقفل</h2>
          <p className="text-white/80 mb-8 text-center text-[15px] font-medium leading-relaxed">
            يرجى إدخال كود وصول العميل للبدء
          </p>

          <input
            type="text"
            className="w-full text-center text-2xl font-bold bg-white text-purple-900 placeholder:text-purple-300 rounded-2xl px-6 py-4 mb-4 focus:outline-none focus:ring-4 focus:ring-purple-400/50 transition-all shadow-inner disabled:opacity-50"
            placeholder="كود الدخول..."
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isVerifying && !isCheckingInitial && handleAuthSubmit()}
            disabled={isVerifying || isCheckingInitial}
          />

          {authError && <p className="text-red-300 text-sm mb-4 font-bold bg-red-900/30 px-4 py-2 rounded-lg">{authError}</p>}

          <button
            onClick={handleAuthSubmit}
            disabled={isVerifying || isCheckingInitial}
            className="w-full py-4 px-6 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border-2 border-white rounded-2xl text-purple-700 font-black text-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] hover:scale-105 disabled:opacity-75 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            {(isVerifying || isCheckingInitial) ? (
              <svg className="animate-spin h-6 w-6 text-purple-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : "تحقق"}
          </button>
        </div>
      </div>
    );
  }

  if (gameState === "landing") {
    return (
      <div
        className="fixed inset-0 overflow-hidden bg-gradient-to-br from-purple-700 via-fuchsia-700 to-pink-600 text-white font-sans flex flex-col items-center justify-center p-6"
        dir="rtl"
      >
        <div className="flex flex-col items-center justify-center mb-16 relative z-10 w-full select-none">
            <h1 className="text-[120px] font-black w-full text-white mb-8 text-center flex flex-col items-center leading-none mt-10 max-md:text-[80px] tracking-tighter">
              <span className="text-[#fde047] game-title-text z-30 relative block mb-[-20px]">حروف</span>
              <span className="text-[#22d3ee] game-title-text z-20 relative block mb-[-15px] transform -rotate-3">مع</span>
              <span className="text-[#ef4444] game-title-text z-10 relative block">{logoStyle === "custom" && customLogoText ? customLogoText : "أحمد"}</span>
            </h1>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-sm relative z-10">
          <button
            onClick={() => {
              generateCells();
              setGameState("playing");
            }}
            className="w-full py-4 px-6 bg-white hover:bg-gray-50 border border-white rounded-2xl text-purple-700 font-bold text-2xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:scale-105"
          >
            بدء اللعبة
          </button>
          <button
            onClick={() => setGameState("settings")}
            className="w-full py-4 px-6 bg-white hover:bg-gray-50 border border-white rounded-2xl text-purple-700 font-bold text-2xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:scale-105"
          >
            إعدادات
          </button>
          <button
            onClick={() => setShowInstructions(true)}
            className="w-full py-4 px-6 bg-white hover:bg-gray-50 border border-white rounded-2xl text-purple-700 font-bold text-2xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:scale-105"
          >
            شرح اللعبة
          </button>
          <button
            className="w-full py-4 px-6 bg-white hover:bg-gray-50 border border-white rounded-2xl text-purple-700 font-bold text-2xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:scale-105"
          >
            طريقة التفعيل
          </button>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Instructions Modal */}
        {showInstructions && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white text-purple-900 rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl relative" dir="rtl">
              <button
                onClick={() => setShowInstructions(false)}
                className="absolute top-4 left-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                aria-label="إغلاق"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <h2 className="text-3xl font-black mb-6 text-center text-purple-800 flex items-center justify-center gap-2">
                <span>💡</span> كيف تلعب "حروف"؟
              </h2>
              
              <div className="space-y-4 text-lg leading-relaxed text-gray-700">
                <p className="font-bold text-purple-700">أهلاً بك في تحدي الذكاء والسرعة! إليك الطريقة لتصبح بطل اللعبة:</p>
                
                <ul className="space-y-4 list-none pl-0 pr-2">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold mt-1">•</span>
                    <div><strong className="text-purple-800">الهدف من اللعبة:</strong> عليك الإجابة على الأسئلة التي تبدأ بحروف معينة لكي تسيطر على أكبر عدد من الحروف في لوحة اللعب.</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold mt-1">•</span>
                    <div><strong className="text-purple-800">اختيار الحروف:</strong> في كل دور، سيظهر لك حرف عشوائي (أو تختار حرفاً من اللوحة)، وعليك التفكير بسرعة في كلمة تبدأ بهذا الحرف وتكون هي الإجابة الصحيحة للسؤال المعروض.</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold mt-1">•</span>
                    <div><strong className="text-purple-800">تحدي الوقت:</strong> احذر! الوقت يداهمك. كلما أجبت أسرع، كلما ضمنت الفوز بالحرف قبل منافسك.</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold mt-1">•</span>
                    <div><strong className="text-purple-800">المسارات:</strong> حاول تكوين مسار متصل من الحروف التي تمتلكها لكي تغلق الطريق على خصمك وتصل إلى خط النهاية.</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold mt-1">•</span>
                    <div><strong className="text-purple-800">الفائز:</strong> هو الشخص الذي يكمل المسار المطلوب أولاً.</div>
                  </li>
                </ul>
                
                <div className="mt-8 pt-4 flex justify-center">
                  <button
                    onClick={() => setShowInstructions(false)}
                    className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors shadow-lg"
                  >
                    فهمت، هيا نلعب!
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (gameState === "settings") {
    return (
      <div
        className="fixed inset-0 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-fuchsia-900 to-pink-950 text-white font-sans flex items-center justify-center p-0"
        dir="rtl"
      >
        <button
          onClick={() => setGameState("landing")}
          className="absolute top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-slate-800/80 hover:bg-slate-700 border border-slate-600 rounded-xl text-white font-bold transition-all shadow-lg hover:scale-105 backdrop-blur-sm"
        >
          <ArrowRightIcon size={20} />
          رجوع
        </button>
        <div className="w-full h-full max-w-7xl bg-transparent p-6 md:p-10 flex flex-col">
          <h1 className="text-3xl md:text-5xl font-black text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 shrink-0 drop-shadow-lg">
            إعدادات اللعبة
          </h1>

          <div className="mb-4 shrink-0">
            <h2 className="text-lg font-bold mb-2 text-white text-center md:text-right">
              حجم الشبكة
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
              {[4, 5, 6, 7].map((size) => {
                const isSelected = gridSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setGridSize(size)}
                    className={`p-2 md:p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center ${isSelected ? "border-purple-500 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.2)]" : "border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-600"}`}
                  >
                    {renderGridIcon(size, isSelected)}
                    <span
                      className={`text-lg font-bold ${isSelected ? "text-purple-400" : "text-slate-400"}`}
                    >
                      {size}x{size}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-4 flex-1 min-h-0">
            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 flex flex-col h-full">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-3 text-white shrink-0">
                <div
                  className="w-3 h-6 rounded-full shadow-lg"
                  style={{ backgroundColor: team1.color.hex }}
                />
                الفريق الأول
              </h2>
              <div className="mb-4 shrink-0">
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  اسم الفريق
                </label>
                <input
                  type="text"
                  value={team1.name}
                  onChange={(e) => setTeam1({ ...team1, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all"
                />
              </div>
              <div className="mt-auto shrink-0">
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  لون الفريق
                </label>
                <div className="flex flex-wrap gap-2">
                  {TEAM_COLORS.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setTeam1({ ...team1, color })}
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full transition-transform hover:scale-110 flex items-center justify-center shadow-lg ${team1.color.id === color.id ? "ring-2 ring-white ring-offset-2 ring-offset-slate-800" : ""}`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {team1.color.id === color.id && (
                        <CheckIcon size={16} className="text-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 flex flex-col h-full">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-3 text-white shrink-0">
                <div
                  className="w-3 h-6 rounded-full shadow-lg"
                  style={{ backgroundColor: team2.color.hex }}
                />
                الفريق الثاني
              </h2>
              <div className="mb-4 shrink-0">
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  اسم الفريق
                </label>
                <input
                  type="text"
                  value={team2.name}
                  onChange={(e) => setTeam2({ ...team2, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all"
                />
              </div>
              <div className="mt-auto shrink-0">
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  لون الفريق
                </label>
                <div className="flex flex-wrap gap-2">
                  {TEAM_COLORS.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setTeam2({ ...team2, color })}
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full transition-transform hover:scale-110 flex items-center justify-center shadow-lg ${team2.color.id === color.id ? "ring-2 ring-white ring-offset-2 ring-offset-slate-800" : ""}`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {team2.color.id === color.id && (
                        <CheckIcon size={16} className="text-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 flex flex-col h-full">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-3 text-white shrink-0">
                <SettingsIcon size={20} className="text-purple-400" />
                قواعد اللعبة
              </h2>

              <div className="space-y-3 flex-1 flex flex-col justify-between min-h-0">
                <div className="shrink-0">
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    نمط الشعار
                  </label>
                  <div className="flex bg-slate-900 rounded-xl p-1 border border-slate-700">
                    <button
                      onClick={() => setLogoStyle("main")}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${logoStyle === "main" ? "bg-purple-600 text-white shadow-md" : "text-slate-400 hover:text-white"}`}
                    >
                      الرئيسي
                    </button>
                    <button
                      onClick={() => setLogoStyle("custom")}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${logoStyle === "custom" ? "bg-purple-600 text-white shadow-md" : "text-slate-400 hover:text-white"}`}
                    >
                      شعار مخصص
                    </button>
                  </div>
                  {logoStyle === "custom" && (
                    <div className="mt-3">
                      <label className="block text-xs font-medium text-slate-400 mb-1">
                        حروف مع...
                      </label>
                      <input
                        type="text"
                        value={customLogoText}
                        onChange={(e) => setCustomLogoText(e.target.value)}
                        placeholder="أحمد"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                        dir="rtl"
                      />
                    </div>
                  )}
                </div>

                <div className="shrink-0">
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    عدد الجولات
                  </label>
                  <div className="flex gap-1">
                    {["1", "3", "5", "7", "infinity"].map((r) => (
                      <button
                        key={r}
                        onClick={() => setRounds(r as any)}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-xl border transition-all ${rounds === r ? "bg-purple-600/20 border-purple-500 text-purple-300" : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500 hover:bg-slate-800"}`}
                      >
                        {r === "infinity" ? "∞" : r}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="shrink-0">
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    المقدم
                  </label>
                  <div className="flex bg-slate-900 rounded-xl p-1 border border-slate-700">
                    <button
                      onClick={() => setHostType("human")}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${hostType === "human" ? "bg-purple-600 text-white shadow-md" : "text-slate-400 hover:text-white"}`}
                    >
                      بشري
                    </button>
                    <button
                      onClick={() => {
                        setHostType("automated");
                        setIsHostView(false);
                      }}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${hostType === "automated" ? "bg-purple-600 text-white shadow-md" : "text-slate-400 hover:text-white"}`}
                    >
                      آلي
                    </button>
                  </div>
                </div>

                <div className="shrink-0">
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    من سوف يبدأ اللعبة
                  </label>
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => setStartingTeam("random")}
                      className={`w-full py-1.5 text-xs font-bold rounded-xl border transition-all ${startingTeam === "random" ? "bg-purple-600/20 border-purple-500 text-purple-300" : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500 hover:bg-slate-800"}`}
                    >
                      عشوائي
                    </button>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setStartingTeam("team1")}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-xl border transition-all ${startingTeam === "team1" ? "bg-purple-600/20 border-purple-500 text-purple-300" : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500 hover:bg-slate-800"}`}
                      >
                        الفريق الأول
                      </button>
                      <button
                        onClick={() => setStartingTeam("team2")}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-xl border transition-all ${startingTeam === "team2" ? "bg-purple-600/20 border-purple-500 text-purple-300" : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500 hover:bg-slate-800"}`}
                      >
                        الفريق الثاني
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 overflow-hidden bg-gradient-to-br from-purple-600 to-pink-500 text-white font-sans flex"
      dir="rtl"
    >
      {/* Right-Side Scoreboard & Control Panel */}
      {!isHostView && (
        <aside className="w-64 md:w-80 shrink-0 flex flex-col gap-6 bg-slate-900/80 backdrop-blur-xl border-l border-slate-700 h-full p-6 overflow-y-auto shadow-2xl z-10 w-full overflow-x-hidden">
          {/* Logo / Title */}
        <div className="text-center mb-6 mt-4 flex justify-center overflow-visible select-none">
          <h2 className="text-5xl md:text-[70px] font-black text-white text-center flex flex-col items-center leading-none tracking-tighter">
            <span className="text-[#fde047] game-title-text z-30 relative block mb-[-10px]">حروف</span>
            <span className="text-[#22d3ee] game-title-text z-20 relative block mb-[-5px] transform -rotate-3">مع</span>
            <span className="text-[#ef4444] game-title-text z-10 relative block pb-4">{logoStyle === "custom" && customLogoText ? customLogoText : "أحمد"}</span>
          </h2>
        </div>

        {/* Score Trackers */}
        <div className="flex flex-col gap-4">
          <div
            onClick={() => activeCell && handleTeamSelection("team1")}
            className={`bg-slate-800/80 rounded-2xl p-4 border-2 shadow-lg flex flex-col items-center relative overflow-hidden transition-all ${activeCell ? "cursor-pointer hover:scale-105 ring-2 ring-white/50" : ""}`}
            style={{ borderColor: team1.color.hex }}
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{ backgroundColor: team1.color.hex }}
            ></div>
            <h3 className="text-lg font-bold text-white mb-2 relative z-10">
              {team1.name}
            </h3>
            <div
              className="text-5xl font-black relative z-10"
              style={{ color: team1.color.hex }}
            >
              {team1Score}
            </div>
          </div>

          <div
            onClick={() => activeCell && handleTeamSelection("team2")}
            className={`bg-slate-800/80 rounded-2xl p-4 border-2 shadow-lg flex flex-col items-center relative overflow-hidden transition-all ${activeCell ? "cursor-pointer hover:scale-105 ring-2 ring-white/50" : ""}`}
            style={{ borderColor: team2.color.hex }}
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{ backgroundColor: team2.color.hex }}
            ></div>
            <h3 className="text-lg font-bold text-white mb-2 relative z-10">
              {team2.name}
            </h3>
            <div
              className="text-5xl font-black relative z-10"
              style={{ color: team2.color.hex }}
            >
              {team2Score}
            </div>
          </div>
        </div>

        <div className="flex-1"></div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={generateCells}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-white font-bold transition-all shadow-md hover:shadow-lg"
          >
            <RefreshCwIcon size={20} />
            إعادة ترتيب الحروف
          </button>

          <button
            onClick={() => {
              setCells(cells.map((c) => ({ ...c, owner: "none" })));
              setWinner(null);
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-white font-bold transition-all shadow-md hover:shadow-lg"
          >
            <XIcon size={20} />
            تفريغ اللوحة
          </button>

          <button
            onClick={() => setGameState("settings")}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/50 rounded-xl text-purple-300 font-bold transition-all shadow-md hover:shadow-lg mt-2"
          >
            <SettingsIcon size={20} />
            الإعدادات
          </button>

          <button
            onClick={() => setGameState("landing")}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-white font-bold transition-all shadow-md hover:shadow-lg"
          >
            <ArrowRightIcon size={20} />
            رجوع
          </button>
        </div>
      </aside>
      )}

      {/* Main Content Area (Grid + Dashboard) */}
      <div className={`flex-1 flex items-center justify-center ${isHostView ? 'gap-4 md:gap-8' : 'gap-8 md:gap-16'} relative min-h-0 overflow-hidden p-4`}>
        {/* Question Dashboard */}
        {(hostType === "automated" || isHostView) && (
          <div className="w-80 md:w-96 shrink-0 flex flex-col justify-center items-center z-10 relative perspective-1000">
            <div className={`w-full grid transform-style-3d transition-transform duration-700 ${showAnswer ? 'rotate-y-180' : ''}`}>
              
              {/* Front Face (Question) */}
              <div className={`col-start-1 row-start-1 w-full min-h-[20rem] md:min-h-[24rem] bg-red-600 rounded-2xl shadow-[0_10px_40px_rgba(220,38,38,0.4)] border border-red-500/50 flex flex-col items-center p-6 backface-hidden overflow-hidden ${showAnswer ? 'pointer-events-none' : ''}`}>
                {/* Matte finish overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                
                {activeCell ? (
                  isLoadingQuestion ? (
                    <div className="flex-1 flex flex-col items-center justify-center w-full">
                      <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4"></div>
                      <p className="text-xl font-bold text-white drop-shadow-sm">جاري جلب السؤال...</p>
                    </div>
                  ) : questionError ? (
                    <div className="flex-1 flex flex-col items-center justify-center w-full">
                      <p className="text-xl font-bold text-white text-center mb-4 drop-shadow-sm">{questionError}</p>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          fetchQuestion(activeCell.letter);
                        }}
                        className="px-6 py-3 bg-white text-red-600 font-bold rounded-xl shadow-md hover:bg-gray-100 transition-colors"
                      >
                        إعادة المحاولة
                      </button>
                    </div>
                  ) : currentQuestion ? (
                  <>
                    {/* Top Header: Selected Letter inside a small white rounded cell icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-white to-gray-100 flex items-center justify-center mb-4 shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.6)] rounded-[1.5rem] border border-white/50 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent"></div>
                      <span className="text-4xl font-black text-red-600 relative z-10 drop-shadow-sm">{activeCell.letter}</span>
                    </div>

                    {/* Sub-Header: 'السؤال' */}
                    <h3 className="text-3xl font-black text-white mb-2 drop-shadow-sm shrink-0">السؤال</h3>

                    {/* Body Text: Full Question Text */}
                    <div className="flex-1 flex flex-col items-center justify-center w-full">
                      {currentQuestion.image && (
                        <img 
                          src={currentQuestion.image} 
                          alt="صورة السؤال" 
                          className="max-h-48 object-contain rounded-xl mb-4 shadow-lg border-2 border-white/20"
                        />
                      )}
                      <p className="text-xl md:text-2xl font-bold text-white text-center leading-relaxed drop-shadow-sm">
                        {currentQuestion.q}
                      </p>
                    </div>

                    {/* Footer Action: 'الإجابة' and 'سؤال آخر' */}
                    <div className="w-full mt-4 shrink-0 flex gap-3 h-14 relative z-10">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setShowAnswer(true); }}
                        className="flex-1 h-full bg-white text-red-600 font-bold text-xl rounded-xl shadow-md hover:bg-gray-50 transition-colors"
                      >
                        الإجابة
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (activeCell) {
                            fetchQuestion(activeCell.letter, true);
                          }
                        }}
                        className="flex-1 h-full bg-red-800 text-white font-bold text-xl rounded-xl shadow-md hover:bg-red-900 transition-colors border border-red-700"
                      >
                        تغيير السؤال
                      </button>
                    </div>
                  </>
                ) : null) : (
                  <div className="flex-1 flex flex-col items-center justify-center w-full">
                    <div className="w-24 h-24 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md flex items-center justify-center mb-6 shrink-0 shadow-[0_0_25px_rgba(255,255,255,0.2)] rounded-[2rem] border border-white/20 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
                      <span className="text-5xl text-white/80 relative z-10 drop-shadow-sm">؟</span>
                    </div>
                    <p className="text-2xl font-bold text-white text-center leading-relaxed drop-shadow-sm">
                      اختر حرفاً لعرض السؤال
                    </p>
                  </div>
                )}
              </div>

              {/* Back Face (Answer) */}
              <div 
                className={`col-start-1 row-start-1 w-full h-full bg-red-700 rounded-2xl shadow-[0_10px_40px_rgba(220,38,38,0.6)] border border-red-500/50 flex flex-col items-center justify-center p-6 backface-hidden rotate-y-180 cursor-pointer overflow-hidden ${!showAnswer ? 'pointer-events-none' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAnswer(false);
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-tl from-black/20 to-transparent pointer-events-none"></div>
                <h3 className="text-3xl font-black text-white/80 mb-6 drop-shadow-sm shrink-0">الإجابة</h3>
                <div className="flex-1 flex items-center justify-center w-full">
                  <p className="text-3xl md:text-4xl font-black text-white text-center leading-relaxed drop-shadow-md">
                    {currentQuestion?.a}
                  </p>
                </div>
                <p className="text-base text-white/60 mt-6 shrink-0">انقر للعودة</p>
              </div>

            </div>
          </div>
        )}

        {/* Grid Area */}
        <main className="w-full max-w-4xl xl:max-w-5xl flex items-center justify-center relative h-full shrink">
          <div className="relative w-full h-full flex items-center justify-center">
            {(() => {
              const {
                topPath,
                bottomPath,
                rightPath,
                leftPath,
                gridWidth,
                gridHeight,
                pad,
              } = generateBoundaries(isHostView ? 6 : gridSize, isHostView ? 5 : gridSize);
              
              const displayCells = isHostView ? hostCells : cells;

              return (
                <svg
                  viewBox={`-${pad + 40} -${pad + 40} ${gridWidth + 2 * pad + 80} ${gridHeight + 2 * pad + 80}`}
                  className="w-full h-full max-h-[90vh] block object-contain drop-shadow-2xl"
                  style={{ overflow: "visible" }}
                >
                  <defs>
                    <linearGradient id="gold-bezel" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#D4AF37" />
                      <stop offset="25%" stopColor="#FFF2CD" />
                      <stop offset="50%" stopColor="#AA771C" />
                      <stop offset="75%" stopColor="#E6C27A" />
                      <stop offset="100%" stopColor="#8B6508" />
                    </linearGradient>
                    <linearGradient id="gold-bezel-inner" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#8B6508" />
                      <stop offset="50%" stopColor="#FFF2CD" />
                      <stop offset="100%" stopColor="#D4AF37" />
                    </linearGradient>
                    <filter id="gold-shadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000000" floodOpacity="0.6" />
                    </filter>
                    <clipPath id="grid-clip">
                      <rect
                        x={-pad}
                        y={-pad}
                        width={gridWidth + 2 * pad}
                        height={gridHeight + 2 * pad}
                        rx="24"
                      />
                    </clipPath>
                  </defs>

                  {/* Boundary Zones */}
                  <g clipPath="url(#grid-clip)">
                    <path d={topPath} fill={team1.color.hex} />
                    <path d={rightPath} fill={team2.color.hex} />
                    <path d={bottomPath} fill={team1.color.hex} />
                    <path d={leftPath} fill={team2.color.hex} />
                  </g>

                  {/* Thin Gold Perimeter Stroke */}
                  <rect
                    x={-pad}
                    y={-pad}
                    width={gridWidth + 2 * pad}
                    height={gridHeight + 2 * pad}
                    fill="none"
                    stroke="url(#gold-bezel)"
                    strokeWidth="2"
                    rx="24"
                  />

                  {/* Hexagons */}
                  {displayCells.map((cell) => {
                    const colors = getCellColors(cell);
                    const w_half = 43.3013;
                    const cx =
                      cell.c * w_half * 2 +
                      w_half +
                      (cell.r % 2 === 1 ? w_half : 0);
                    const cy = cell.r * 75 + 50;
                    const points = `${cx},${cy - 50} ${cx + 43.3013},${cy - 25} ${cx + 43.3013},${cy + 25} ${cx},${cy + 50} ${cx - 43.3013},${cy + 25} ${cx - 43.3013},${cy - 25}`;

                    return (
                      <g
                        key={cell.id}
                        className={`cursor-pointer transition-transform hover:scale-[1.02]`}
                        style={{ transformOrigin: `${cx}px ${cy}px` }}
                        onClick={() => handleCellClick(cell)}
                      >
                        <polygon
                          points={points}
                          fill={colors.bg}
                          stroke="#000000"
                          strokeWidth="4"
                          strokeLinejoin="round"
                          className={`transition-all duration-300 ${activeCell?.id === cell.id || (activeCell?.letter === cell.letter && !/^[0-9]+$/.test(cell.letter)) ? "animate-cell-highlight" : ""}`}
                        />
                        <text
                          x={cx}
                          y={cy}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize="36"
                          fontWeight="900"
                          fill={colors.text}
                          className={`drop-shadow-sm pointer-events-none font-sans transition-all duration-300 ${cell.isTransforming ? "opacity-0 scale-50" : "opacity-100 scale-100"}`}
                          style={{ transformOrigin: `${cx}px ${cy}px` }}
                        >
                          {cell.letter}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              );
            })()}
          </div>
        </main>
      </div>

      {/* Footer Text & Host Button */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20">
        <div className="text-white/40 text-sm pointer-events-none tracking-wider">
          لعبة الحروف التفاعلية
        </div>
      </div>

      {hostType === "human" && (
        <div className="absolute bottom-8 left-8 md:left-16 z-30">
          <button
            onClick={() => setIsHostView(!isHostView)}
            className="px-8 py-4 bg-red-600 hover:bg-red-700 border-2 border-red-500 rounded-2xl text-lg md:text-xl font-black text-white shadow-[0_10px_30px_rgba(220,38,38,0.4)] transition-all hover:scale-105 hover:-translate-y-1"
          >
            {isHostView ? "العودة للجمهور" : "صفحة المقدم البشري"}
          </button>
        </div>
      )}

      {gameState === "winner" && winner && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4 animate-fade-in"
          dir="rtl"
        >
          <div
            className="w-full max-w-2xl bg-slate-900/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border-4 text-center animate-scale-in"
            style={{
              borderColor:
                winner === "team1" ? team1.color.hex : team2.color.hex,
            }}
          >
            <TrophyIcon
              size={100}
              className="mx-auto mb-8"
              style={{
                color: winner === "team1" ? team1.color.hex : team2.color.hex,
              }}
            />
            <h2 className="text-5xl font-black mb-4 text-white">مبروك!</h2>
            <p className="text-3xl mb-12 text-slate-300">
              لقد فاز{" "}
              <span
                className="font-bold"
                style={{
                  color: winner === "team1" ? team1.color.hex : team2.color.hex,
                }}
              >
                {winner === "team1" ? team1.name : team2.name}
              </span>
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setGameState("playing");
                  setWinner(null);
                }}
                className="px-8 py-4 rounded-xl text-xl font-bold bg-slate-800 text-white hover:bg-slate-700 border border-slate-600 transition-colors shadow-md"
              >
                عرض اللوحة
              </button>
              <button
                onClick={() => {
                  generateCells();
                  setGameState("playing");
                  setWinner(null);
                }}
                className="px-8 py-4 rounded-xl text-xl font-bold text-white transition-transform hover:scale-105 shadow-lg"
                style={{
                  backgroundColor:
                    winner === "team1" ? team1.color.hex : team2.color.hex,
                }}
              >
                العب مرة أخرى
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
