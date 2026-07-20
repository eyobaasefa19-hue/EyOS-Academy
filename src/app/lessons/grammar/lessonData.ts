// 1. TYPES & INTERFACES (TypeScript Strict Typing)
export interface GrammarRule {
  subject: string;
  verb: string;
  amharic: string;
  example: string;
}

export interface VocabItem {
  word: string;
  type: string;
  amharic: string;
  pronunciation: string;
  example: string;
}

export interface ConversationItem {
  role: string;
  text: string;
  translation: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  amharicHint?: string;
}

export interface GrammarLesson {
  id: string;
  title: string;
  cefrLevel: string;
  category: string;
  xpReward: number;
  amharicOverview: string;
  englishOverview: string;
  grammar: {
    title: string;
    rules: GrammarRule[];
    commonMistake: string;
  };
  vocabulary: VocabItem[];
  conversations: ConversationItem[];
  questions: QuizQuestion[];
}

// 2. READING STORIES (20 Stories)
export const readingStories = [
  { id: 1, title: "Airport Operations", content: "The ground handler works at the terminal. He checks the cargo manifest every morning." },
  { id: 2, title: "Mobile Coding", content: "A developer builds full-stack apps on a smartphone. He uses GitHub and Vercel to deploy projects." },
  { id: 3, title: "Football Match", content: "The referee blows the whistle. The player understands the offside rule perfectly." },
  { id: 4, title: "Music Production", content: "She produces Amharic Afrobeat music. The track plays at 110 BPM." },
  { id: 5, title: "Aviation Tech", content: "Modern stealth fighter jets fly very fast. They use advanced biomimicry designs." },
  { id: 6, title: "Satellite Setup", content: "He configures the satellite transponder. The TV shows live sports broadcasts." },
  { id: 7, title: "Smart Guide", content: "The Addis Airport Smart Guide bot helps travelers. It provides quick logistics data." },
  { id: 8, title: "Database Schema", content: "The system connects to a Supabase project. Prisma manages the relational database." },
  { id: 9, title: "Daily Flight", content: "The airplane takes off at 8:00 AM. The pilot speaks to the control tower." },
  { id: 10, title: "Video Editing", content: "The modular architecture supports heavy video editing. The app renders files quickly." },
  { id: 11, title: "Ground Support", content: "The team operates airport ground support equipment. They load the cargo safely." },
  { id: 12, title: "Language Learning", content: "The student practices English grammar. He repeats the words every day." },
  { id: 13, title: "Morning Routine", content: "I wake up early. I drink coffee and start coding my new application." },
  { id: 14, title: "Security Check", content: "The security agent scans the luggage. Passengers wait in the line patiently." },
  { id: 15, title: "Tech Startup", content: "The EdTech startup provides online courses. Students learn new skills easily." },
  { id: 16, title: "Match Analysis", content: "The coach analyzes the football game. The team practices new strategies." },
  { id: 17, title: "Cargo Loading", content: "Workers read the abbreviations on the boxes. They pack everything tightly." },
  { id: 18, title: "Server Response", content: "The API fetches data from the server. The user interface updates instantly." },
  { id: 19, title: "Training Day", content: "Trainees prepare for the aviation exams. They study appearance and practical skills." },
  { id: 20, title: "Evening Relax", content: "After work, he listens to Reggaeton. The rhythm helps him relax." }
];

// 3. MASTER GRAMMAR LESSONS ARRAY (8 Dynamic Tense Modules - Total 100 Questions)
export const allGrammarLessons: GrammarLesson[] = [
  {
    id: "l1",
    title: "Lesson 01: Present Simple",
    cefrLevel: "A1",
    category: "Grammar & Practical",
    xpReward: 500,
    amharicOverview: "የአሁኑን ጊዜ (Present Simple) ዘወትር ለምናደርጋቸው ድርጊቶች፣ ልማዶች፣ የዕለት ተዕለት ውሎዎች እና ሁልጊዜም እውነት ለሆኑ እውነታዎች ለመግለፅ እንጠቀምበታለን።",
    englishOverview: "We use the Present Simple to talk about habits, permanent situations, daily routines, and general facts.",
    grammar: {
      title: "Verb 'To Be' & Sentence Structure",
      rules: [
        { subject: "I", verb: "am (work/code/go)", amharic: "እኔ ነኝ / እሰራለሁ", example: "I deploy the app on Vercel." },
        { subject: "He/She/It", verb: "is (works/codes/goes)", amharic: "እሱ/እሷ/እሱ ነው / ይሰራል", example: "He checks the cargo manifest." },
        { subject: "We/You/They", verb: "are (work/code/go)", amharic: "እኛ/እናንተ/እነሱ ናቸው / እንሰራለን", example: "They operate ground support equipment." }
      ],
      commonMistake: "❌ Don't say: 'He code on his phone.' \n✅ Say: 'He codes on his phone.'\n\n❌ Don't say: 'They works everyday.'\n✅ Say: 'They work everyday.'"
    },
    vocabulary: [
      { word: "Explore", type: "Verb", amharic: "አዲስ ነገርን ማወቅ/መረመር", pronunciation: "/ɪkˈsplɔːr/", example: "I explore new frameworks." },
      { word: "Essential", type: "Adjective", amharic: "በጣም አስፈላጊ/ግዴታ", pronunciation: "/ɪˈsen.ʃəl/", example: "English is essential for aviation." },
      { word: "Aviation", type: "Noun", amharic: "የአቪዬሽን/የበረራ ኢንዱስትሪ", pronunciation: "/ˌeɪ.viˈeɪ.ʃən/", example: "He studies aviation operations." },
      { word: "Cargo", type: "Noun", amharic: "በአውሮፕላን የሚጓጓዝ ጭነት", pronunciation: "/ˈkɑːr.ɡoʊ/", example: "The cargo is heavy." },
      { word: "Deploy", type: "Verb", amharic: "ሶፍትዌርን ክፍት ማድረግ", pronunciation: "/dɪˈplɔɪ/", example: "We deploy the application." }
    ],
    conversations: [
      { role: "Airport Agent", text: "Good morning! Can I see your passport and ticket, please?", translation: "እንደምን አደሩ! እባክዎን ፓስፖርትዎን እና ቲኬትዎን ላሳይ?" },
      { role: "Passenger (You)", text: "Sure, here they are. I am flying to Washington, D.C.", translation: "እንዴታ፣ ይኸውልዎት። ወደ ዋሽንግተን ዲሲ እየበረርኩ ነው።" }
    ],
    questions: [
      { id: 1, question: "I ___ to the airport every day.", options: ["go", "goes"], correctAnswer: 0, amharicHint: "ለ 'I' ግሱ 's' አይጨመርለትም" },
      { id: 2, question: "He ___ the cargo manifest carefully.", options: ["check", "checks"], correctAnswer: 1, amharicHint: "ለ 'He' ግሱ 's' ይጨመርለታል" },
      { id: 3, question: "They ___ mobile applications.", options: ["builds", "build"], correctAnswer: 1, amharicHint: "ለብዙ ቁጥር (They) ግሱ 's' አይወስድም" },
      { id: 4, question: "She ___ fluent English.", options: ["speak", "speaks"], correctAnswer: 1, amharicHint: "ለ 'She' ግሱ 's' ይወስዳል" },
      { id: 5, question: "The developer ___ code on his smartphone.", options: ["writes", "write"], correctAnswer: 0, amharicHint: "አንድ ሰው ስለሆነ 's' ይወስዳል" },
      { id: 6, question: "Water ___ at 100 degrees Celsius.", options: ["boils", "boil"], correctAnswer: 0, amharicHint: "ለተፈጥሯዊ እውነታ Present Simple እንጠቀማለን" },
      { id: 7, question: "We ___ Supabase for our database backend.", options: ["use", "uses"], correctAnswer: 0, amharicHint: "ለ 'We' ግሱ አይቀየርም" },
      { id: 8, question: "Ethiopian Airlines ___ flights worldwide.", options: ["operates", "operate"], correctAnswer: 0, amharicHint: "አንድ ድርጅት (It) ስለሆነ 's' ይጨምራል" },
      { id: 9, question: "I do not ___ coffee in the evening.", options: ["drink", "drinks"], correctAnswer: 0, amharicHint: "ከ 'do not' በኋላ መደበኛ ግስ ይቀመጣል" },
      { id: 10, question: "___ you work at the airport terminal?", options: ["Do", "Does"], correctAnswer: 0, amharicHint: "ለ 'You' ጥያቄ 'Do' እንጠቀማለን" },
      { id: 11, question: "Does he ___ the satellite dish manually?", options: ["adjust", "adjusts"], correctAnswer: 0, amharicHint: "በ 'Does' ጥያቄ ውስጥ ግሱ 's' አይወስድም" },
      { id: 12, question: "Pilots ___ rigorous training before flying.", options: ["undergo", "undergoes"], correctAnswer: 0, amharicHint: "ብዙ ቁጥር (Pilots) ስለሆነ 'undergo'" },
      { id: 13, question: "The sun ___ in the east.", options: ["rises", "rise"], correctAnswer: 0, amharicHint: "ለተፈጥሮ እውነት Present Simple" }
    ]
  },
  {
    id: "l2",
    title: "Lesson 02: Present Continuous",
    cefrLevel: "A1-A2",
    category: "Grammar & Practical",
    xpReward: 500,
    amharicOverview: "Present Continuous አሁን ተናጋሪው እየተናገረ ባለበት ቅፅበት እየተከናወኑ ያሉ ድርጊቶችን ለመግለፅ ያገለግላል።",
    englishOverview: "We use the Present Continuous for actions that are happening right now at the exact moment of speaking.",
    grammar: {
      title: "am/is/are + Verb(-ing)",
      rules: [
        { subject: "I", verb: "am + verb(-ing)", amharic: "እኔ እያደረግኩ ነው", example: "I am loading the aircraft cargo right now." },
        { subject: "He/She/It", verb: "is + verb(-ing)", amharic: "እሱ/እሷ እየሰራ/ች ነው", example: "He is updating the Prisma database schema." },
        { subject: "We/You/They", verb: "are + verb(-ing)", amharic: "እኛ/እነሱ እያደረጉ ነው", example: "They are testing the API response." }
      ],
      commonMistake: "❌ Don't say: 'I loading the cargo now.' \n✅ Say: 'I am loading the cargo now.'\n\n❌ Don't say: 'He is code continuous.'\n✅ Say: 'He is coding right now.'"
    },
    vocabulary: [
      { word: "Inspecting", type: "Verb", amharic: "በመመርመር ላይ ያለ", pronunciation: "/ɪnˈspektɪŋ/", example: "He is inspecting the ground support unit." },
      { word: "Rendering", type: "Verb", amharic: "ቪዲዮ በማዘጋጀት ላይ ያለ", pronunciation: "/ˈrendərɪŋ/", example: "The video application is rendering the file." },
      { word: "Verifying", type: "Verb", amharic: "በማረጋገጥ ላይ ያለ", pronunciation: "/ˈverɪfaɪɪŋ/", example: "We are verifying the flight manifest." }
    ],
    conversations: [
      { role: "Supervisor", text: "What are you doing at the runway right now?", translation: "አሁን መንደርደሪያው ላይ ምን እያደረግክ ነው?" },
      { role: "Developer (You)", text: "I am testing the new flight tracking feature on my device.", translation: "በስልኬ ላይ አዲሱን የበረራ መከታተያ አገልግሎት እያየሁ ነው።" }
    ],
    questions: [
      { id: 1, question: "Look! The plane ___ on the runway right now.", options: ["is landing", "lands"], correctAnswer: 0, amharicHint: "አሁን እየተከናወነ ያለ ድርጊት" },
      { id: 2, question: "I ___ my Next.js code at this moment.", options: ["am debugging", "debugs"], correctAnswer: 0, amharicHint: "ለ 'I' 'am + ing'" },
      { id: 3, question: "They ___ the cargo boxes onto the ULD container.", options: ["are loading", "loads"], correctAnswer: 0, amharicHint: "ለ 'They' 'are + ing'" },
      { id: 4, question: "She ___ not responding to the API call.", options: ["is", "are"], correctAnswer: 0, amharicHint: "ለ 'She' አፍራሽ 'is not'" },
      { id: 5, question: "___ you writing a new prompt for the video bot?", options: ["Are", "Is"], correctAnswer: 0, amharicHint: "ለ 'You' ጥያቄ 'Are'" },
      { id: 6, question: "Listen! The engine ___ a strange sound.", options: ["is making", "makes"], correctAnswer: 0, amharicHint: "አሁን በሁነቱ እየተሰማ ያለ" },
      { id: 7, question: "We ___ the Next.js app to Vercel right now.", options: ["are deploying", "deploy"], correctAnswer: 0, amharicHint: "'Right now' የሚያሳየው አሁን እየተከናወነ ያለውን ነው" },
      { id: 8, question: "The ground handlers ___ the safety gear.", options: ["are wearing", "wears"], correctAnswer: 0, amharicHint: "የብዙ ቁጥር እያደረጉት ያለ ድርጊት" },
      { id: 9, question: "Why ___ he adjusting the satellite frequency?", options: ["is", "are"], correctAnswer: 0, amharicHint: "ለ 'He' መጠይቅ 'is'" },
      { id: 10, question: "I am not ___ video editing at the moment.", options: ["doing", "do"], correctAnswer: 0, amharicHint: "ከ 'am not' በኋላ 'ing' ግስ ይከተላል" },
      { id: 11, question: "The system ___ real-time telemetry data.", options: ["is streaming", "streams"], correctAnswer: 0, amharicHint: "አሁን እየተከናወነ ያለ የሲስተም ሂደት" },
      { id: 12, question: "Are they ___ the Telegram bot menu buttons?", options: ["updating", "update"], correctAnswer: 0, amharicHint: "ከ 'Are' ጥያቄ በኋላ 'ing' ግስ" },
      { id: 13, question: "The plane's radar ___ targets accurately.", options: ["is tracking", "track"], correctAnswer: 0, amharicHint: "አሁን በመከታተል ላይ ያለ" }
    ]
  },
  {
    id: "l3",
    title: "Lesson 03: Past Simple",
    cefrLevel: "A2",
    category: "Grammar & Practical",
    xpReward: 550,
    amharicOverview: "Past Simple ባለፈው ጊዜ ተጀምረው ሙሉ በሙሉ የተጠናቀቁ ድርጊቶችን ለመግለፅ ያገለግላል።",
    englishOverview: "Used for actions that started and completed in the past at a specific time.",
    grammar: {
      title: "Regular (-ed) & Irregular Verbs (V2)",
      rules: [
        { subject: "All Subjects (Regular)", verb: "verb + ed", amharic: "መደበኛ ግሶች (-ed የሚጨምሩ)", example: "I deployed the app yesterday." },
        { subject: "All Subjects (Irregular)", verb: "Past Form (V2)", amharic: "መደበኛ ያልሆኑ ግሶች", example: "The flight took off at 8:00 AM." },
        { subject: "Negative (All Subjects)", verb: "did not + base verb", amharic: "አፍራሽ አረፍተ ነገር", example: "We did not miss the cargo delivery." }
      ],
      commonMistake: "❌ Don't say: 'I did went to work.' \n✅ Say: 'I went to work.'\n\n❌ Don't say: 'He deployeded the code.'\n✅ Say: 'He deployed the code.'"
    },
    vocabulary: [
      { word: "Departed", type: "Verb (Past)", amharic: "ተነሳ / ተጓዘ", pronunciation: "/dɪˈpɑːrtɪd/", example: "The jet departed on schedule." },
      { word: "Configured", type: "Verb (Past)", amharic: "አስተካከለ / አዋቀረ", pronunciation: "/kənˈfɪɡərd/", example: "I configured the Prisma ORM." },
      { word: "Submitted", type: "Verb (Past)", amharic: "አስገባ / አስረከበ", pronunciation: "/səbˈmɪtɪd/", example: "He submitted the exam results." }
    ],
    conversations: [
      { role: "Team Lead", text: "Did you push the latest update last night?", translation: "ትላንት ማታ የመጨረሻውን አፕዴት ገፋኸው?" },
      { role: "You", text: "Yes, I built and pushed the code directly to GitHub.", translation: "አዎ፣ ኮዱን ሰርቼ ቀጥታ ወደ GitHub ገፍቼዋለሁ።" }
    ],
    questions: [
      { id: 1, question: "Yesterday, the cargo plane ___ on time.", options: ["arrived", "arrives"], correctAnswer: 0, amharicHint: "ትላንት የተፈፀመ ድርጊት (Past Simple)" },
      { id: 2, question: "I ___ my Grade 12 national exam last year.", options: ["completed", "complete"], correctAnswer: 0, amharicHint: "ባለፈው ዓመት የተጠናቀቀ" },
      { id: 3, question: "They did not ___ the flight schedule.", options: ["change", "changed"], correctAnswer: 0, amharicHint: "ከ 'did not' በኋላ መደበኛ ግስ (Base Form) ይቀመጣል" },
      { id: 4, question: "___ you inspect the baggage scanning machine?", options: ["Did", "Do"], correctAnswer: 0, amharicHint: "ባለፈው ጊዜ ለተደረገ ጥያቄ 'Did'" },
      { id: 5, question: "The referee ___ the final whistle 5 minutes ago.", options: ["blew", "blows"], correctAnswer: 0, amharicHint: "የ 'blow' ያለፈው ጊዜ 'blew' ነው" },
      { id: 6, question: "We ___ the Supabase authentication last week.", options: ["integrated", "integrate"], correctAnswer: 0, amharicHint: "ባለፈው ሳምንት የተጠናቀቀ (Past)" },
      { id: 7, question: "The pilot ___ the aircraft safely despite heavy rain.", options: ["landed", "lands"], correctAnswer: 0, amharicHint: "ያለፈ ጊዜ መደበኛ ግስ (-ed)" },
      { id: 8, question: "I ___ a new Telegram bot using ManyBot yesterday.", options: ["created", "create"], correctAnswer: 0, amharicHint: "ትላንት የተደረገ ድርጊት" },
      { id: 9, question: "Did they ___ the ULD container weight limit?", options: ["check", "checked"], correctAnswer: 0, amharicHint: "ከ 'Did' በኋላ የመጀመሪያው የግስ ቅርጽ ይከተላል" },
      { id: 10, question: "He ___ the satellite dish position two hours ago.", options: ["shifted", "shift"], correctAnswer: 0, amharicHint: "ከሁለት ሰዓት በፊት የተፈፀመ" },
      { id: 11, question: "The flight crew ___ early at the departure gate.", options: ["met", "meet"], correctAnswer: 0, amharicHint: "የ 'meet' ያለፈው ጊዜ 'met' ነው" },
      { id: 12, question: "I did not ___ any syntax errors in the console.", options: ["find", "found"], correctAnswer: 0, amharicHint: "ከ 'did not' በኋላ base verb 'find'" },
      { id: 13, question: "The match ___ in a 2-2 draw last Sunday.", options: ["ended", "ends"], correctAnswer: 0, amharicHint: "ያለፈው እሁድ የተደረገ" }
    ]
  },
  {
    id: "l4",
    title: "Lesson 04: Past Continuous",
    cefrLevel: "A2-B1",
    category: "Grammar & Practical",
    xpReward: 550,
    amharicOverview: "Past Continuous ባለፈው ጊዜ ውስጥ በአንድ የተወሰነ ወቅት ሲከናወን የነበረን ድርጊት ለመግለፅ ያገለግላል።",
    englishOverview: "Used for ongoing actions that were happening at a specific continuous period in the past.",
    grammar: {
      title: "was / were + Verb(-ing)",
      rules: [
        { subject: "I / He / She / It", verb: "was + verb(-ing)", amharic: "ሲያደርግ / ስታደርግ / ስሰራ ነበር", example: "I was coding when the plane arrived." },
        { subject: "We / You / They", verb: "were + verb(-ing)", amharic: "ሲያደርጉ / ስናደርግ ነበር", example: "They were loading cargo all morning." }
      ],
      commonMistake: "❌ Don't say: 'They was working late.' \n✅ Say: 'They were working late.'\n\n❌ Don't say: 'I was code when you called.'\n✅ Say: 'I was coding when you called.'"
    },
    vocabulary: [
      { word: "Interrupt", type: "Verb", amharic: "ማቋረጥ", pronunciation: "/ˌɪntəˈrʌpt/", example: "The flight announcement interrupted our conversation." },
      { word: "Simultaneously", type: "Adverb", amharic: "በአንድ ጊዜ/በተመሳሳይ ሰዓት", pronunciation: "/ˌsɪmlˈteɪniəsli/", example: "Two tasks were running simultaneously." }
    ],
    conversations: [
      { role: "Colleague", text: "What were you doing at 8 PM yesterday?", translation: "ትላንት ማታ 2 ሰዓት ላይ ምን እያደረግክ ነበር?" },
      { role: "You", text: "I was testing my mobile video editing app.", translation: "የሞባይል ቪዲዮ ማቀናበሪያ አፕሊኬሽኔን እያሞከርኩ ነበር።" }
    ],
    questions: [
      { id: 1, question: "I ___ code when the phone rang.", options: ["was writing", "were writing"], correctAnswer: 0, amharicHint: "ለ 'I' 'was + ing'" },
      { id: 2, question: "They ___ the runway lights while it was raining.", options: ["were checking", "was checking"], correctAnswer: 0, amharicHint: "ለ 'They' 'were + ing'" },
      { id: 3, question: "She ___ not sleeping at midnight; she was studying.", options: ["was", "were"], correctAnswer: 0, amharicHint: "ለ 'She' 'was not'" },
      { id: 4, question: "What ___ you doing when the server crashed?", options: ["were", "was"], correctAnswer: 0, amharicHint: "ለ 'You' 'were'" },
      { id: 5, question: "The ground handlers ___ moving containers at 5 AM.", options: ["were", "was"], correctAnswer: 0, amharicHint: "Handlers (ብዙ ቁጥር) 'were'" },
      { id: 6, question: "While I ___ the database, the internet went down.", options: ["was syncing", "were syncing"], correctAnswer: 0, amharicHint: "ለ 'I' 'was + ing'" },
      { id: 7, question: "The engine ___ loudly when the technician opened the hatch.", options: ["was vibrating", "were vibrating"], correctAnswer: 0, amharicHint: "አንድ ሞተር (It) ስለሆነ 'was'" },
      { id: 8, question: "We ___ football on satellite TV when power cut out.", options: ["were watching", "was watching"], correctAnswer: 0, amharicHint: "ለ 'We' 'were + ing'" },
      { id: 9, question: "Was the pilot ___ with ATC during turbulence?", options: ["communicating", "communicate"], correctAnswer: 0, amharicHint: "ከ 'Was' በኋላ 'ing' ግስ ይከተላል" },
      { id: 10, question: "The developers ___ not sleeping; they were fixing bugs.", options: ["were", "was"], correctAnswer: 0, amharicHint: "Developers (ብዙ ቁጥር) 'were'" },
      { id: 11, question: "At 10 PM last night, I ___ rendering my video project.", options: ["was", "am"], correctAnswer: 0, amharicHint: "ትላንት ማታ ለነበረ ድርጊት 'was'" },
      { id: 12, question: "Were you ___ the flight manifest when I arrived?", options: ["reviewing", "reviews"], correctAnswer: 0, amharicHint: "ከ 'Were' ጥያቄ በኋላ 'ing'" },
      { id: 13, question: "The AI model ___ high-resolution prompt details.", options: ["was processing", "were processing"], correctAnswer: 0, amharicHint: "ለነጠላ አካል 'was + ing'" }
    ]
  },
  {
    id: "l5",
    title: "Lesson 05: Present Perfect",
    cefrLevel: "B1",
    category: "Grammar & Practical",
    xpReward: 600,
    amharicOverview: "Present Perfect አሁን ገና የተጠናቀቀ፣ ውጤቱ አሁን ላይ የሚታይ ወይም የህይወት ልምድን (Experience) ለመግለፅ ያገለግላል።",
    englishOverview: "Used for recent events, life experiences, or past actions with a direct relevance to the present.",
    grammar: {
      title: "has / have + Past Participle (V3)",
      rules: [
        { subject: "I / We / You / They", verb: "have + V3", amharic: "አድርጌአለሁ / አድርገዋል", example: "I have deployed 5 full-stack apps." },
        { subject: "He / She / It", verb: "has + V3", amharic: "አድርጓል / አድርጋለች", example: "The plane has just landed on Runway 1." }
      ],
      commonMistake: "❌ Don't say: 'I have deploy the code.' \n✅ Say: 'I have deployed the code.'\n\n❌ Don't say: 'He have finished the exam.'\n✅ Say: 'He has finished the exam.'"
    },
    vocabulary: [
      { word: "Deployed", type: "Verb (V3)", amharic: "የተዘረጋ / ስራ ላይ የዋለ", pronunciation: "/dɪˈplɔɪd/", example: "We have deployed the new features." },
      { word: "Achieved", type: "Verb (V3)", amharic: "ያከናወነ / ያሳካ", pronunciation: "/əˈtʃiːvd/", example: "He has achieved a high score." }
    ],
    conversations: [
      { role: "Client", text: "Have you uploaded the database schema?", translation: "የዳታቤዝ ስኪማውን ጭነኸዋል?" },
      { role: "You", text: "Yes, I have already completed and verified it.", translation: "አዎ፣ ቀድሜ አጠናቅቄ አረጋግጨዋለሁ።" }
    ],
    questions: [
      { id: 1, question: "I ___ already finished my aviation exam.", options: ["have", "has"], correctAnswer: 0, amharicHint: "ለ 'I' 'have + V3'" },
      { id: 2, question: "The pilot ___ just requested permission to land.", options: ["has", "have"], correctAnswer: 0, amharicHint: "Pilot (He/She) 'has'" },
      { id: 3, question: "We have ___ three new mobile UI components.", options: ["built", "build"], correctAnswer: 0, amharicHint: "ከ 'have' በኋላ V3 ቅርፅ (built) ይቀመጣል" },
      { id: 4, question: "Have you ever ___ a stealth fighter jet?", options: ["seen", "saw"], correctAnswer: 0, amharicHint: "የ 'see' V3 ቅርፅ 'seen' ነው" },
      { id: 5, question: "They have not ___ the manifest files yet.", options: ["received", "receive"], correctAnswer: 0, amharicHint: "ከ 'have not' በኋላ V3" },
      { id: 6, question: "He has ___ his Supabase account successfully.", options: ["connected", "connect"], correctAnswer: 0, amharicHint: "ከ 'has' በኋላ V3" },
      { id: 7, question: "___ you configured the satellite transponder?", options: ["Have", "Has"], correctAnswer: 0, amharicHint: "ለ 'You' ጥያቄ 'Have'" },
      { id: 8, question: "The flight team has ___ all cargo loading protocols.", options: ["verified", "verify"], correctAnswer: 0, amharicHint: "V3 Verb" },
      { id: 9, question: "I have never ___ such an efficient Flutter framework.", options: ["used", "use"], correctAnswer: 0, amharicHint: "የህይወት ልምድ ለመግለጽ V3" },
      { id: 10, question: "She has ___ the video rendering process.", options: ["optimized", "optimize"], correctAnswer: 0, amharicHint: "ከ 'has' በኋላ 'optimized'" },
      { id: 11, question: "We have ___ our target score in the test.", options: ["exceeded", "exceed"], correctAnswer: 0, amharicHint: "V3" },
      { id: 12, question: "Has the airplane ___ off yet?", options: ["taken", "took"], correctAnswer: 0, amharicHint: "የ 'take' V3 'taken' ነው" }
    ]
  },
  {
    id: "l6",
    title: "Lesson 06: Future Simple",
    cefrLevel: "A2-B1",
    category: "Grammar & Practical",
    xpReward: 500,
    amharicOverview: "Future Simple (will) ወደፊት ለሚደረጉ ውሳኔዎች፣ ግምቶች ወይም ድንገተኛ ውሳኔዎች (Instant decisions) ያገለግላል።",
    englishOverview: "Used for future predictions, promises, or spontaneous decisions made at the moment.",
    grammar: {
      title: "will + Base Verb",
      rules: [
        { subject: "All Subjects", verb: "will + verb", amharic: "ወደፊት አደርጋለሁ/ይሆናል", example: "I will refactor the codebase tomorrow." },
        { subject: "Negative", verb: "will not (won't) + verb", amharic: "አላደርግም/አይሆንም", example: "The flight won't be delayed." }
      ],
      commonMistake: "❌ Don't say: 'I will coding tomorrow.' \n✅ Say: 'I will code tomorrow.'\n\n❌ Don't say: 'He will to come.'\n✅ Say: 'He will come.'"
    },
    vocabulary: [
      { word: "Predict", type: "Verb", amharic: "መተንበይ / መገመት", pronunciation: "/prɪˈdɪkt/", example: "We predict high traffic on the app." },
      { word: "Guarantee", type: "Verb", amharic: "ዋስትና መስጠት", pronunciation: "/ˌɡærənˈtiː/", example: "This setup will guarantee speed." }
    ],
    conversations: [
      { role: "Manager", text: "When will you launch the Smart Guide bot?", translation: "የስማርት ጋይድ ቦቱን መቼ ታስጀምረዋለህ?" },
      { role: "You", text: "I will launch it by Friday afternoon.", translation: "እስከ አርብ ከሰዓት በኋላ አስጀምረዋለሁ።" }
    ],
    questions: [
      { id: 1, question: "I ___ send you the API document tomorrow.", options: ["will", "am"], correctAnswer: 0, amharicHint: "ለወደፊት ጊዜ 'will'" },
      { id: 2, question: "The aircraft ___ depart as soon as cargo loading finishes.", options: ["will", "is"], correctAnswer: 0, amharicHint: "ወደፊት ለሚከናወን ድርጊት" },
      { id: 3, question: "They ___ not miss the technical review.", options: ["won't", "don't"], correctAnswer: 0, amharicHint: "Future Negative 'won't'" },
      { id: 4, question: "Will you ___ the new Prisma schema tonight?", options: ["push", "pushed"], correctAnswer: 0, amharicHint: "ከ 'will' በኋላ መደበኛ ግስ" },
      { id: 5, question: "I think it ___ rain at the airport later.", options: ["will", "does"], correctAnswer: 0, amharicHint: "ለወደፊት ግምት (Prediction)" },
      { id: 6, question: "We ___ test the canvas rendering engine soon.", options: ["will", "are"], correctAnswer: 0, amharicHint: "ወደፊት ለሚሆን 'will'" },
      { id: 7, question: "The technician ___ fix the ground power unit.", options: ["will", "was"], correctAnswer: 0, amharicHint: "ለወደፊት ቃል ኪዳን/ውሳኔ" },
      { id: 8, question: "Will they ___ the satellite dish angle?", options: ["adjust", "adjusted"], correctAnswer: 0, amharicHint: "ከ 'will' በኋላ መደበኛ ግስ" },
      { id: 9, question: "I promises I ___ complete the module on time.", options: ["will", "did"], correctAnswer: 0, amharicHint: "ለቃል ኪዳን (Promise) 'will'" },
      { id: 10, question: "The football match ___ start in 20 minutes.", options: ["will", "has"], correctAnswer: 0, amharicHint: "ወደፊት የሚከናወን" },
      { id: 11, question: "She ___ assist you with your baggage check-in.", options: ["will", "is"], correctAnswer: 0, amharicHint: "የወደፊት እገዛ" },
      { id: 12, question: "The server ___ automatically restart after update.", options: ["will", "would"], correctAnswer: 0, amharicHint: "Future Simple" }
    ]
  },
  {
    id: "l7",
    title: "Lesson 07: Going To",
    cefrLevel: "A2-B1",
    category: "Grammar & Practical",
    xpReward: 500,
    amharicOverview: "Be Going To ቀድመው የታቀዱ እቅዶችን (Prior Plans) ወይም አሁን ባሉ ማስረጃዎች መሰረት ወደፊት የሚሆኑ ነገሮችን ለመግለፅ ያገለግላል።",
    englishOverview: "Used for future intentions, pre-planned actions, or predictions based on current evidence.",
    grammar: {
      title: "am/is/are + going to + Base Verb",
      rules: [
        { subject: "I", verb: "am going to + verb", amharic: "ልያደርግ አቅጃለሁ", example: "I am going to build a React Native app." },
        { subject: "He / She", verb: "is going to + verb", amharic: "ሊያደርግ/ልታደርግ ነው", example: "He is going to inspect the flight gear." },
        { subject: "We / They", verb: "are going to + verb", amharic: "ልናደርግ/ሊያደርጉ ነው", example: "They are going to update the server." }
      ],
      commonMistake: "❌ Don't say: 'I going to code.' \n✅ Say: 'I am going to code.'\n\n❌ Don't say: 'He is going to coding.'\n✅ Say: 'He is going to code.'"
    },
    vocabulary: [
      { word: "Intention", type: "Noun", amharic: "እቅድ / ሐሳብ", pronunciation: "/ɪnˈtenʃn/", example: "My intention is to master Full Stack development." },
      { word: "Schedule", type: "Verb/Noun", amharic: "መርሐግብር ማውጣት", pronunciation: "/ˈskedʒuːl/", example: "We are going to schedule the flight." }
    ],
    conversations: [
      { role: "Developer Friend", text: "What are your plans for this weekend?", translation: "ለዚህ ቅዳሜና እሁድ ምን አቅደሃል?" },
      { role: "You", text: "I am going to optimize my Next.js performance.", translation: "የኔክስት ጄኤስ አፕሊኬሽኔን ፍጥነት ለማሻሻል አቅጃለሁ።" }
    ],
    questions: [
      { id: 1, question: "I ___ going to study aviation logistics tonight.", options: ["am", "is"], correctAnswer: 0, amharicHint: "ለ 'I' 'am going to'" },
      { id: 2, question: "Look at those dark clouds! It ___ going to rain.", options: ["is", "are"], correctAnswer: 0, amharicHint: "በእርግጠኝነት ለሚታይ ማስረጃ 'It is going to'" },
      { id: 3, question: "They are going to ___ a new Supabase database.", options: ["create", "created"], correctAnswer: 0, amharicHint: "ከ 'going to' በኋላ መደበኛ ግስ" },
      { id: 4, question: "___ she going to attend the ground handling exam?", options: ["Is", "Are"], correctAnswer: 0, amharicHint: "ለ 'She' ጥያቄ 'Is'" },
      { id: 5, question: "We are not going to ___ the production server.", options: ["stop", "stopped"], correctAnswer: 0, amharicHint: "መደበኛ ግስ" },
      { id: 6, question: "I am going to ___ my mobile development workspace.", options: ["upgrade", "upgraded"], correctAnswer: 0, amharicHint: "ከ 'going to' በኋላ Base Verb" },
      { id: 7, question: "The airline is going to ___ new cargo routes.", options: ["open", "opens"], correctAnswer: 0, amharicHint: "የታቀደ እቅድ" },
      { id: 8, question: "Are you going to ___ your prompt engineering skills?", options: ["enhance", "enhanced"], correctAnswer: 0, amharicHint: "መደበኛ ግስ" },
      { id: 9, question: "He is going to ___ his Grade 12 certificates tomorrow.", options: ["collect", "collects"], correctAnswer: 0, amharicHint: "ለ 'He' ከ 'going to' በኋላ 'collect'" },
      { id: 10, question: "They are going to ___ the new football stadium.", options: ["visit", "visiting"], correctAnswer: 0, amharicHint: "የታቀደ ጉብኝት" },
      { id: 11, question: "The pilot is going to ___ the pre-flight checklist.", options: ["review", "reviewed"], correctAnswer: 0, amharicHint: "Base Verb" },
      { id: 12, question: "I am not going to ___ any code without testing.", options: ["deploy", "deployed"], correctAnswer: 0, amharicHint: "Negative Intention" }
    ]
  },
  {
    id: "l8",
    title: "Lesson 08: Future Continuous",
    cefrLevel: "B1-B2",
    category: "Grammar & Practical",
    xpReward: 650,
    amharicOverview: "Future Continuous በወደፊት ጊዜ ውስጥ በተወሰነ ወቅት ሲከናወን የሚቆይን ወይም የሚቀጥልን ድርጊት ለመግለፅ ያገለግላል።",
    englishOverview: "Used for action that will be in progress at a specific point of time in the future.",
    grammar: {
      title: "will be + Verb(-ing)",
      rules: [
        { subject: "All Subjects", verb: "will be + verb(-ing)", amharic: "በወደፊት ሰዓት እያደረግኩ/ከበርኩ እሆናለሁ", example: "At 10 AM tomorrow, I will be loading the plane." },
        { subject: "Negative", verb: "will not be + verb(-ing)", amharic: "እያደረግኩ አልሆንም", example: "I will not be sleeping during the shift." }
      ],
      commonMistake: "❌ Don't say: 'I will be load the cargo.' \n✅ Say: 'I will be loading the cargo.'\n\n❌ Don't say: 'They will being working.'\n✅ Say: 'They will be working.'"
    },
    vocabulary: [
      { word: "Duration", type: "Noun", amharic: "የጊዜ ርዝማኔ", pronunciation: "/djuˈreɪʃn/", example: "The duration of the flight is 3 hours." },
      { word: "Continuous", type: "Adjective", amharic: "የማያቋርጥ / የሚቀጥል", pronunciation: "/kənˈtɪnjuəs/", example: "Future continuous tense." }
    ],
    conversations: [
      { role: "Shift Supervisor", text: "Will you be working at Terminal 1 tomorrow afternoon?", translation: "ነገ ከሰዓት በተርሚናል 1 እያሰራህ ትሆናለህ?" },
      { role: "You", text: "Yes, I will be supervising the baggage crew at that time.", translation: "አዎ፣ በዚያ ሰዓት የጓዝ ሰራተኞቹን እየተከታተልኩ እሆናለሁ።" }
    ],
    questions: [
      { id: 1, question: "At 3 PM tomorrow, I ___ coding my app.", options: ["will be", "will"], correctAnswer: 0, amharicHint: "ወደፊት በዚያ ሰዓት 'will be + ing'" },
      { id: 2, question: "This time next week, they ___ flying to Europe.", options: ["will be", "are"], correctAnswer: 0, amharicHint: "በወደፊት ጊዜ የሚቀጥል ድርጊት" },
      { id: 3, question: "She will be ___ the flight manifest during her shift.", options: ["reviewing", "review"], correctAnswer: 0, amharicHint: "ከ 'will be' በኋላ 'ing'" },
      { id: 4, question: "___ you be using the smartphone dev environment tonight?", options: ["Will", "Do"], correctAnswer: 0, amharicHint: "ለወደፊት ጥያቄ 'Will'" },
      { id: 5, question: "The server will be ___ system backup at midnight.", options: ["running", "run"], correctAnswer: 0, amharicHint: "'will be + ing'" },
      { id: 6, question: "Tomorrow morning, we will be ___ ground equipment.", options: ["operating", "operate"], correctAnswer: 0, amharicHint: "ከ 'will be' በኋላ 'ing'" },
      { id: 7, question: "He will not be ___ satellite signals at 2 AM.", options: ["tracking", "track"], correctAnswer: 0, amharicHint: "Future Continuous Negative" },
      { id: 8, question: "At this exact time tomorrow, I will be ___ my flight.", options: ["boarding", "board"], correctAnswer: 0, amharicHint: "'will be + ing'" },
      { id: 9, question: "Will the team be ___ new AI features during the stream?", options: ["demonstrating", "demonstrate"], correctAnswer: 0, amharicHint: "ከ 'will ... be' በኋላ 'ing'" },
      { id: 10, question: "They will be ___ foreign language courses next month.", options: ["attending", "attend"], correctAnswer: 0, amharicHint: "የወደፊት የትምህርት ሂደት" },
      { id: 11, question: "I will be ___ the database tables at midnight.", options: ["migrating", "migrate"], correctAnswer: 0, amharicHint: "Future Continuous" },
      { id: 12, question: "The referee will be ___ the football match live.", options: ["officiating", "officiate"], correctAnswer: 0, amharicHint: "'will be + ing'" }
    ]
  }
];

// 4. BACKWARDS COMPATIBILITY EXPORTS
export const staticLessonData = allGrammarLessons[0];
export const lessonModules = [
  {
    id: 1,
    title: "Present Simple",
    questions: allGrammarLessons[0].questions
  }
];
