// 1. READING STORIES (20 Stories)
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

// 2. LESSON MODULES & QUIZ (50 Questions)
export const lessonModules = [
  {
    id: 1,
    title: "Present Simple",
    questions: [
      // Basic Routines
      { id: 1, question: "I ___ to the airport every day.", options: ["go", "goes"], correctAnswer: 0, amharicHint: "ለ 'I' ግሱ 's' አይጨመርለትም" },
      { id: 2, question: "He ___ the cargo manifest carefully.", options: ["check", "checks"], correctAnswer: 1, amharicHint: "ለ 'He' ግሱ 's' ይጨመርለታል" },
      { id: 3, question: "They ___ mobile applications.", options: ["builds", "build"], correctAnswer: 1, amharicHint: "ለብዙ ቁጥር (They) ግሱ 's' አይወስድም" },
      { id: 4, question: "She ___ fluent English.", options: ["speak", "speaks"], correctAnswer: 1, amharicHint: "ለ 'She' ግሱ 's' ይወስዳል" },
      { id: 5, question: "We ___ ground support equipment.", options: ["operates", "operate"], correctAnswer: 1, amharicHint: "ለ 'We' ግሱ 's' አያስፈልገውም" },
      
      // Tech & Dev
      { id: 6, question: "The developer ___ code on his smartphone.", options: ["writes", "write"], correctAnswer: 0, amharicHint: "አንድ ሰው ስለሆነ 's' ይወስዳል" },
      { id: 7, question: "Vercel ___ the website automatically.", options: ["deploys", "deploy"], correctAnswer: 0, amharicHint: "Vercel (It) ስለሆነ 's' ይወስዳል" },
      { id: 8, question: "I ___ Supabase for my database.", options: ["use", "uses"], correctAnswer: 0, amharicHint: "ለ 'I' ግሱ መደበኛውን ቅርፅ ይይዛል" },
      { id: 9, question: "The Telegram bot ___ passengers.", options: ["guide", "guides"], correctAnswer: 1, amharicHint: "Bot (It) ስለሆነ" },
      { id: 10, question: "You ___ the GitHub repository.", options: ["updates", "update"], correctAnswer: 1, amharicHint: "ለ 'You' 's' አያስፈልግም" },

      // Aviation & Cargo
      { id: 11, question: "The airplane ___ at 10 AM.", options: ["arrives", "arrive"], correctAnswer: 0, amharicHint: "Airplane (It) ስለሆነ" },
      { id: 12, question: "Pilots ___ uniforms.", options: ["wears", "wear"], correctAnswer: 1, amharicHint: "Pilots (ብዙ ቁጥር) ስለሆኑ" },
      { id: 13, question: "The agent ___ the passenger's ticket.", options: ["scans", "scan"], correctAnswer: 0, amharicHint: "Agent (አንድ ሰው) ስለሆነ" },
      { id: 14, question: "Aviation logistics ___ careful planning.", options: ["require", "requires"], correctAnswer: 1, amharicHint: "ሎጂስቲክስ (ነጠላ ሀሳብ)" },
      { id: 15, question: "We ___ the cargo weight.", options: ["measure", "measures"], correctAnswer: 0, amharicHint: "ለ 'We' መደበኛ ግስ" },

      // Football & Hobbies
      { id: 16, question: "The referee ___ the offside rule.", options: ["knows", "know"], correctAnswer: 0, amharicHint: "Referee (He/She) ስለሆነ" },
      { id: 17, question: "Fans ___ the football match on TV.", options: ["watch", "watches"], correctAnswer: 0, amharicHint: "Fans (They) ስለሆኑ" },
      { id: 18, question: "The transponder ___ the satellite signal.", options: ["receives", "receive"], correctAnswer: 0, amharicHint: "Transponder (It) ስለሆነ" },
      { id: 19, question: "I ___ Amharic Afrobeat music.", options: ["listens", "listen"], correctAnswer: 1, amharicHint: "ለ 'I' መደበኛ ግስ" },
      { id: 20, question: "Stealth jets ___ radar detection.", options: ["avoids", "avoid"], correctAnswer: 1, amharicHint: "Jets (ብዙ ቁጥር) ስለሆኑ" },

      // Negative Sentences
      { id: 21, question: "He ___ not like delays.", options: ["do", "does"], correctAnswer: 1, amharicHint: "ለ 'He' አፍራሽ ሲሆን 'does not' እንጠቀማለን" },
      { id: 22, question: "They ___ not work on Sundays.", options: ["do", "does"], correctAnswer: 0, amharicHint: "ለ 'They' አፍራሽ ሲሆን 'do not' እንጠቀማለን" },
      { id: 23, question: "I ___ not code in Python.", options: ["do", "does"], correctAnswer: 0, amharicHint: "ለ 'I' 'do not'" },
      { id: 24, question: "The app ___ not crash.", options: ["does", "do"], correctAnswer: 0, amharicHint: "ለ 'It' (The app) 'does not'" },
      { id: 25, question: "We ___ not lose the luggage.", options: ["does", "do"], correctAnswer: 1, amharicHint: "ለ 'We' 'do not'" },

      // Questions (Interrogative)
      { id: 26, question: "___ you speak English?", options: ["Do", "Does"], correctAnswer: 0, amharicHint: "ለ 'You' ጥያቄ ሲሆን 'Do' እንጠቀማለን" },
      { id: 27, question: "___ she work at the terminal?", options: ["Do", "Does"], correctAnswer: 1, amharicHint: "ለ 'She' ጥያቄ ሲሆን 'Does' እንጠቀማለን" },
      { id: 28, question: "___ they understand the database schema?", options: ["Does", "Do"], correctAnswer: 1, amharicHint: "ለ 'They' ጥያቄ ሲሆን 'Do' እንጠቀማለን" },
      { id: 29, question: "___ the flight depart on time?", options: ["Does", "Do"], correctAnswer: 0, amharicHint: "ለ 'It' (the flight) 'Does'" },
      { id: 30, question: "___ I need a ticket?", options: ["Do", "Does"], correctAnswer: 0, amharicHint: "ለ 'I' 'Do'" },

      // Verb "To Be"
      { id: 31, question: "I ___ ready for the exam.", options: ["am", "is"], correctAnswer: 0, amharicHint: "ለ 'I' 'am'" },
      { id: 32, question: "He ___ a senior developer.", options: ["are", "is"], correctAnswer: 1, amharicHint: "ለ 'He' 'is'" },
      { id: 33, question: "The passengers ___ at the gate.", options: ["is", "are"], correctAnswer: 1, amharicHint: "ለብዙ ቁጥር 'are'" },
      { id: 34, question: "It ___ a fast stealth jet.", options: ["are", "is"], correctAnswer: 1, amharicHint: "ለ 'It' 'is'" },
      { id: 35, question: "We ___ excited about the project.", options: ["am", "are"], correctAnswer: 1, amharicHint: "ለ 'We' 'are'" },

      // Mixed Practice
      { id: 36, question: "The video editor ___ rendering.", options: ["finish", "finishes"], correctAnswer: 1, amharicHint: "Editor (It/He/She) ስለሆነ" },
      { id: 37, question: "My smartphone ___ the app easily.", options: ["runs", "run"], correctAnswer: 0, amharicHint: "Smartphone (It) ስለሆነ" },
      { id: 38, question: "Good students ___ every day.", options: ["studies", "study"], correctAnswer: 1, amharicHint: "Students (They)" },
      { id: 39, question: "Aviation training ___ strict rules.", options: ["has", "have"], correctAnswer: 0, amharicHint: "Training (It) ስለሆነ 'has'" },
      { id: 40, question: "Cargo handlers ___ heavy boxes.", options: ["lifts", "lift"], correctAnswer: 1, amharicHint: "Handlers (They)" },
      { id: 41, question: "The bot ___ with users.", options: ["chats", "chat"], correctAnswer: 0, amharicHint: "Bot (It)" },
      { id: 42, question: "Satellite dishes ___ the signal.", options: ["catch", "catches"], correctAnswer: 0, amharicHint: "Dishes (They)" },
      { id: 43, question: "The football player ___ fast.", options: ["runs", "run"], correctAnswer: 0, amharicHint: "Player (He/She)" },
      { id: 44, question: "We ___ the API documentation.", options: ["reads", "read"], correctAnswer: 1, amharicHint: "ለ 'We' መደበኛ ግስ" },
      { id: 45, question: "She ___ modular architectures.", options: ["designs", "design"], correctAnswer: 0, amharicHint: "ለ 'She' 's' ይጨመራል" },
      { id: 46, question: "The airport ___ busy at night.", options: ["is", "are"], correctAnswer: 0, amharicHint: "Airport (It)" },
      { id: 47, question: "They ___ not miss the deadline.", options: ["do", "does"], correctAnswer: 0, amharicHint: "ለ 'They' 'do not'" },
      { id: 48, question: "___ he configure the server?", options: ["Do", "Does"], correctAnswer: 1, amharicHint: "ለ 'He' ጥያቄ 'Does'" },
      { id: 49, question: "I ___ my code before deployment.", options: ["test", "tests"], correctAnswer: 0, amharicHint: "ለ 'I' መደበኛ ግስ" },
      { id: 50, question: "The startup ___ educational tools.", options: ["creates", "create"], correctAnswer: 0, amharicHint: "Startup (It)" }
    ]
  }
];

// 3. STATIC LESSON DATA (30+ Vocabulary words & Grammar)
export const staticLessonData = {
  id: "l1",
  title: "Lesson 01: Master The Present Simple",
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
    { word: "Manifest", type: "Noun", amharic: "የዕቃዎች ዝርዝር ሰነድ", pronunciation: "/ˈmæn.ɪ.fest/", example: "Check the cargo manifest." },
    { word: "Deploy", type: "Verb", amharic: "ሶፍትዌርን ክፍት ማድረግ", pronunciation: "/dɪˈplɔɪ/", example: "We deploy the application." },
    { word: "Terminal", type: "Noun", amharic: "የአየር መንገድ ማረፊያ ህንፃ", pronunciation: "/ˈtɜːrmɪnl/", example: "Meet me at Terminal 2." },
    { word: "Refactor", type: "Verb", amharic: "ኮድን ማስተካከል/ማሻሻል", pronunciation: "/riːˈfæktər/", example: "I refactor the software architecture." },
    { word: "Offside", type: "Noun", amharic: "ከጨዋታ ውጪ (በእግር ኳስ)", pronunciation: "/ˌɔːfˈsaɪd/", example: "The player was in an offside position." },
    { word: "Transponder", type: "Noun", amharic: "የሳተላይት ሲግናል መቀበያ", pronunciation: "/trænˈspɒndər/", example: "Configure the TV transponder." },
    { word: "Stealth", type: "Adjective", amharic: "በራዳር የማይታይ", pronunciation: "/stelθ/", example: "Stealth jets are advanced." },
    { word: "Biomimicry", type: "Noun", amharic: "ከተፈጥሮ የተቀዳ ዲዛይን", pronunciation: "/ˌbaɪoʊˈmɪmɪkri/", example: "The jet uses biomimicry." },
    { word: "Schema", type: "Noun", amharic: "የዳታቤዝ መዋቅር", pronunciation: "/ˈskiːmə/", example: "Push the Prisma schema." },
    { word: "Prototype", type: "Noun", amharic: "የመጀመሪያ ሞዴል", pronunciation: "/ˈproʊtətaɪp/", example: "The Telegram bot is a prototype." },
    { word: "Aptitude", type: "Noun", amharic: "የተፈጥሮ ችሎታ/ፈተና", pronunciation: "/ˈæptɪtuːd/", example: "He passed the aptitude test." },
    { word: "Modular", type: "Adjective", amharic: "በክፍል የተከፋፈለ", pronunciation: "/ˈmɒdʒələr/", example: "A modular video editor." },
    { word: "Runway", type: "Noun", amharic: "የአውሮፕላን መንደርደሪያ", pronunciation: "/ˈrʌnweɪ/", example: "The plane is on the runway." },
    { word: "Equipment", type: "Noun", amharic: "መሳሪያዎች", pronunciation: "/ɪˈkwɪpmənt/", example: "Ground support equipment." },
    { word: "Routine", type: "Noun", amharic: "የዘወትር ተግባር", pronunciation: "/ruːˈtiːn/", example: "Coding is my daily routine." },
    { word: "Broadcast", type: "Noun", amharic: "ስርጭት", pronunciation: "/ˈbrɔːdkæst/", example: "The live sports broadcast." },
    { word: "Abbreviation", type: "Noun", amharic: "አህፅሮተ ቃል", pronunciation: "/əˌbriːviˈeɪʃn/", example: "Learn airline abbreviations." },
    { word: "Architecture", type: "Noun", amharic: "የሶፍትዌር አሰራር ንድፍ", pronunciation: "/ˈɑːrkɪtektʃər/", example: "Enterprise-grade architecture." },
    { word: "Rhythm", type: "Noun", amharic: "የሙዚቃ ምት", pronunciation: "/ˈrɪðəm/", example: "Afrobeat has a great rhythm." },
    { word: "Configure", type: "Verb", amharic: "ማስተካከል/ማዋቀር", pronunciation: "/kənˈfɪɡər/", example: "Configure the server settings." },
    { word: "Logistics", type: "Noun", amharic: "የዕቃ አቅርቦት እና ስርጭት", pronunciation: "/ləˈdʒɪstɪks/", example: "Aviation logistics is complex." },
    { word: "Handler", type: "Noun", amharic: "አስተናጋጅ/አንቀሳቃሽ", pronunciation: "/ˈhændlər/", example: "A ground support handler." },
    { word: "Render", type: "Verb", amharic: "ቪዲዮን አቀነባብሮ ማውጣት", pronunciation: "/ˈrendər/", example: "Render the video file." },
    { word: "Relational", type: "Adjective", amharic: "ተዛማጅ (ለዳታቤዝ)", pronunciation: "/rɪˈleɪʃənl/", example: "A relational database." },
    { word: "Affiliate", type: "Noun", amharic: "አጋር", pronunciation: "/əˈfɪliət/", example: "Add affiliate links to the bot." },
    { word: "Strategy", type: "Noun", amharic: "ስልት", pronunciation: "/ˈstrætədʒi/", example: "Plan a good startup strategy." }
  ],

  conversations: [
    { role: "Airport Agent", text: "Good morning! Can I see your passport and ticket, please?", translation: "እንደምን አደሩ! እባክዎን ፓስፖርትዎን እና ቲኬትዎን ላሳይ?" },
    { role: "Passenger (You)", text: "Sure, here they are. I am flying to Washington, D.C.", translation: "እንዴታ፣ ይኸውልዎት። ወደ ዋሽንግተን ዲሲ እየበረርኩ ነው።" },
    { role: "Tech Lead", text: "Did you push the Prisma schema to Supabase?", translation: "የፕሪስማ ስኪማውን ወደ ሱፓቤዝ ገፋኸው (Push አደረግከው)?" },
    { role: "Developer (You)", text: "Yes, I deployed it directly from my smartphone.", translation: "አዎ፣ ቀጥታ ከስማርት ስልኬ ላይ ዲፕሎይ አድርጌዋለሁ።" }
  ]
};
