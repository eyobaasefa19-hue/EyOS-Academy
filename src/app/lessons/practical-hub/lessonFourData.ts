// lesson-four-data.ts
// ይህ ዳታ የውይይት መድረኮችን ይዟል። ኮዳችንን ንፁህ ለማድረግ ለብቻው ተቀምጧል።

export const dialogueScenarios = [
  {
    id: 1,
    title: "Daily Conversation: Meeting a Colleague",
    contextAmh: "በሥራ ቦታ አዲስ የሥራ ባልደረባ ሲያገኙ የሚደረግ ውይይት።",
    dialogues: [
      { speaker: "Person A", textEng: "Good afternoon! My name is Eyob. I just joined the cargo operations team.", textAmh: "እንደምን ዋሉ! ስሜ እዮብ ይባላል። አሁን ነው የካርጎ ኦፕሬሽን ቡድኑን የተቀላቀልኩት።" },
      { speaker: "Person B", textEng: "Welcome to the team, Eyob! Nice to meet you. My name is Samuel.", textAmh: "ወደ ቡድኑ እንኳን ደህና መጣህ እዮብ! ስለተዋወቅን ደስ ብሎኛል። ስሜ ሳሙኤል ይባላል።" },
      { speaker: "Person A", textEng: "Nice to meet you too, Samuel. I am excited to work with you all safely and quickly.", textAmh: "እኔም ስለተዋወቅን ደስ ብሎኛል ሳሙኤል፤ ከእናንተ ጋር በደኅንነት እና በፈጣን ሁኔታ ለመሥራት ጓጉቻለሁ።" },
      { speaker: "Person B", textEng: "That's great! Let me show you how we check the cargo manifest first.", textAmh: "በጣም ጥሩ! በመጀመሪያ የጭነት ዝርዝር ሰነዱን (ካርጎ ማኒፌስቱን) እንዴት እንደምንፈትሽ ላሳይህ።" }
    ]
  },
  {
    id: 2,
    title: "Tech Startup: Discussing App Deployment",
    contextAmh: "ስለ አዲስ የሞባይል አፕሊኬሽን ዲፕሎይመንት (Deployment) የሚደረግ ውይይት።",
    dialogues: [
      { speaker: "Person A", textEng: "Did you push the new Prisma schema to the GitHub repository?", textAmh: "አዲሱን የፕሪስማ ስኪማ ወደ ጊትሃብ ሪፖዚተሪ ገፋኸው (Push አደረግከው)?" },
      { speaker: "Person B", textEng: "Yes, I did. I managed to do the whole setup directly from my smartphone.", textAmh: "አዎ አድርጌዋለሁ። ሙሉ ስራውን በቀጥታ ከስማርት ስልኬ ላይ ማድረግ ችያለሁ።" },
      { speaker: "Person A", textEng: "That is impressive. Is the backend connected to our Supabase project?", textAmh: "ያ በጣም የሚገርም ነው። ባክ-ኤንዱ ከሱፓቤዝ (Supabase) ፕሮጀክታችን ጋር ተገናኝቷል?" },
      { speaker: "Person B", textEng: "Exactly. Now we just need to wait for Vercel to finish the deployment.", textAmh: "በትክክል:: አሁን ቨርሴል (Vercel) ዲፕሎይመንቱን እስኪጨርስ መጠበቅ ብቻ ነው ያለብን።" }
    ]
  },
  {
    id: 3,
    title: "Sports Talk: Explaining the Offside Rule",
    contextAmh: "የእግር ኳስ ጨዋታን በሚመለከቱበት ወቅት ስለ ህግጋት የሚደረግ ውይይት።",
    dialogues: [
      { speaker: "Person A", textEng: "Why did the referee disallow that goal? It looked perfectly fine to me.", textAmh: "ዳኛው ያቺን ጎል ለምን ሻራት? ለእኔ ምንም ችግር የሌለባት ትመስል ነበር።" },
      { speaker: "Person B", textEng: "The striker was in an offside position before the ball was passed.", textAmh: "ኳሷ ከመሰጠቷ በፊት አጥቂው ከጨዋታ ውጪ (ኦፍሳይድ) ቦታ ላይ ነበር።" },
      { speaker: "Person A", textEng: "Oh, I see. So he was behind the last defender?", textAmh: "ኦ፣ ገባኝ። ስለዚህ ከመጨረሻው ተከላካይ ጀርባ ነበር ማለት ነው?" },
      { speaker: "Person B", textEng: "Yes, exactly. It requires a very quick eye to spot that during a fast game.", textAmh: "አዎ፣ ልክ ነው። በፈጣን ጨዋታ ጊዜ ያንን ለማየት በጣም ፈጣን አይን ይጠይቃል።" },
      { speaker: "Person A", textEng: "I will pay more attention to the defensive line next time.", textAmh: "በቀጣይ ጊዜ ለመከላከያ መስመሩ የተሻለ ትኩረት እሰጣለሁ።" }
    ]
  },
  {
    id: 4,
    title: "Music Studio: Producing Afrobeat",
    contextAmh: "በሙዚቃ ስቱዲዮ ውስጥ ስለ አዲስ ትራክ ቅንብር የሚደረግ ውይይት።",
    dialogues: [
      { speaker: "Person A", textEng: "I have a new idea for an Amharic Afrobeat and Reggaeton mix.", textAmh: "ለአማርኛ አፍሮቢት እና ሬጌቶን ቅይጥ አዲስ ሀሳብ አለኝ።" },
      { speaker: "Person B", textEng: "Sounds interesting. What BPM (Beats Per Minute) are you targeting?", textAmh: "የሚስብ ይመስላል። የትኛውን ቢፒኤም (BPM) ነው ያሰብከው?" },
      { speaker: "Person A", textEng: "Let's set it to 110 BPM. It gives it a nice, relaxed rhythm for short videos.", textAmh: "በ 110 ቢፒኤም እናድርገው። ለአጫጭር ቪዲዮዎች ጥሩ እና ዘና ያለ ሪትም ይሰጠዋል።" },
      { speaker: "Person B", textEng: "Perfect. I will add some heavy bass and traditional percussions.", textAmh: "አሪፍ። እኔ ደግሞ ከበድ ያለ ቤዝ እና ባህላዊ የከበሮ ድምፆችን እጨምርበታለሁ።" }
    ]
  },
  {
    id: 5,
    title: "Aviation Tech: Stealth Aircrafts",
    contextAmh: "ስለ ዘመናዊ የጦር አውሮፕላኖች እና ቴክኖሎጂ የሚደረግ ውይይት።",
    dialogues: [
      { speaker: "Person A", textEng: "Have you read the article about the new generation of stealth fighter jets?", textAmh: "ስለ አዲሱ ትውልድ ስውር ተዋጊ ጄቶች የተፃፈውን ፅሁፍ አነበብከው?" },
      { speaker: "Person B", textEng: "Yes! The way they use biomimicry in their design is fascinating.", textAmh: "አዎ! በዲዛይናቸው ላይ ከተፈጥሮ የተቀዳ ንድፍን (Biomimicry) የሚጠቀሙበት መንገድ አስደናቂ ነው።" },
      { speaker: "Person A", textEng: "It helps them avoid radar detection completely.", textAmh: "ይህም በራዳር እይታ ውስጥ ሙሉ በሙሉ እንዳይገቡ ይረዳቸዋል።" },
      { speaker: "Person B", textEng: "True. The engineering behind modern military aviation is incredibly advanced.", textAmh: "እውነት ነው። ከዘመናዊ ወታደራዊ አቪዬሽን ጀርባ ያለው የምህንድስና ጥበብ እጅግ የላቀ ነው።" }
    ]
  },
  {
    id: 6,
    title: "Home Tech: Adjusting the Transponder",
    contextAmh: "የቴሌቪዥን ሳተላይት ሲግናልን ስለማስተካከል የሚደረግ ውይይት።",
    dialogues: [
      { speaker: "Person A", textEng: "I can't find the channel broadcasting the live football match.", textAmh: "የእግር ኳስ ጨዋታውን በቀጥታ የሚያስተላልፈውን ቻናል ማግኘት አልቻልኩም።" },
      { speaker: "Person B", textEng: "You probably need to manually configure the satellite transponder settings.", textAmh: "ምናልባት የሳተላይት ትራንስፖንደሩን መቼቶች (Settings) በራስህ ማስተካከል ሊኖርብህ ይችላል።" },
      { speaker: "Person A", textEng: "What frequency and symbol rate should I enter?", textAmh: "ምን አይነት ፍሪኩዌንሲ እና ሲምቦል ሬት (Symbol Rate) ላስገባ?" },
      { speaker: "Person B", textEng: "Enter 11105 for the frequency and 45000 for the symbol rate. Then scan it.", textAmh: "ለፍሪኩዌንሲ 11105 እንዲሁም ለሲምቦል ሬት 45000 አስገባ። ከዚያ ስካን (Scan) አድርገው።" }
    ]
  },
  {
    id: 7,
    title: "Airport Logistics: Smart Guide App",
    contextAmh: "በአውሮፕላን ማረፊያ ውስጥ ስለሚጠቅም አዲስ መተግበሪያ የሚደረግ ውይይት።",
    dialogues: [
      { speaker: "Person A", textEng: "Travelers often get confused about where to find ground support equipment.", textAmh: "ተጓዦች የምድር ላይ ድጋፍ መስጫ መሳሪያዎችን የት እንደሚያገኙ ብዙ ጊዜ ይምታታባቸዋል።" },
      { speaker: "Person B", textEng: "That is why the Addis Airport Smart Guide bot is very useful.", textAmh: "የአዲስ ኤርፖርት ስማርት ጋይድ (Smart Guide) ቦት በጣም ጠቃሚ የሆነው ለዚህ ነው።" },
      { speaker: "Person A", textEng: "Does it provide logistics data in real-time?", textAmh: "የሎጂስቲክስ መረጃዎችን በወቅቱ (Real-time) ይሰጣል?" },
      { speaker: "Person B", textEng: "Yes, and it also includes affiliate links for nearby hotel bookings.", textAmh: "አዎ፣ በተጨማሪም በአቅራቢያ ላሉ የሆቴል ምዝገባዎች አጋር ሊንኮችን ያካትታል።" }
    ]
  },
  {
    id: 8,
    title: "Career Goal: Aviation Aptitude Test",
    contextAmh: "ስለ አየር መንገድ መግቢያ ፈተና ዝግጅት የሚደረግ ውይይት።",
    dialogues: [
      { speaker: "Person A", textEng: "I am taking the comprehensive admissions exam for Ethiopian Airlines tomorrow.", textAmh: "ነገ የኢትዮጵያ አየር መንገድን አጠቃላይ የመግቢያ ፈተና እወስዳለሁ።" },
      { speaker: "Person B", textEng: "Good luck! Have you prepared for the written aptitude component?", textAmh: "መልካም ዕድል! ለፅሁፍ የአፕቲቲውድ (Aptitude) ክፍሉ ተዘጋጅተሃል?" },
      { speaker: "Person A", textEng: "Yes, I have been studying hard. I also prepared my uniform for the appearance test.", textAmh: "አዎ፣ ጠንክሬ ሳጠና ነበር። ለገፅታ (Appearance) ፈተናውም የደንብ ልብሴን አዘጋጅቻለሁ።" },
      { speaker: "Person B", textEng: "You will do great. Just stay calm during the practical components.", textAmh: "ጥሩ ውጤት ታመጣለህ። በተግባራዊ ክፍሎቹ ጊዜ ብቻ አትደናገጥ (ረጋ በል)።" }
    ]
  },
  {
    id: 9,
    title: "At the Restaurant: Ordering Food",
    contextAmh: "በምግብ ቤት ውስጥ ምግብ ለማዘዝ የሚደረግ ውይይት።",
    dialogues: [
      { speaker: "Person A", textEng: "Excuse me, could we see the menu, please?", textAmh: "ይቅርታ፣ ማውጫውን (Menu) ማየት እንችላለን?" },
      { speaker: "Person B", textEng: "Certainly! Here is the menu. Today's special is roasted chicken with vegetables.", textAmh: "በእርግጥ! ማውጫው ይኸው። የዛሬው ልዩ ምግብ የተጠበሰ ዶሮ ከአትክልት ጋር ነው።" },
      { speaker: "Person A", textEng: "That sounds delicious. I will have that, and a glass of fresh juice.", textAmh: "የሚያጣፍጥ ይመስላል። እሱን አምጣልኝ፣ እና አንድ ብርጭቆ ትኩስ ጁስ።" },
      { speaker: "Person B", textEng: "Right away. Your order will be ready in fifteen minutes.", textAmh: "እሺ አሁን። ትዕዛዝዎ በአስራ አምስት ደቂቃ ውስጥ ይደርሳል።" }
    ]
  },
  {
    id: 10,
    title: "Travel: Asking for Directions",
    contextAmh: "በአዲስ ቦታ አቅጣጫን ለመጠየቅ የሚደረግ ውይይት።",
    dialogues: [
      { speaker: "Person A", textEng: "Excuse me, I am a bit lost. Can you tell me how to get to the main terminal?", textAmh: "ይቅርታ፤ ትንሽ ጠፍቶብኛል። ወደ ዋናው ተርሚናል እንዴት እንደምሄድ ሊነግሩኝ ይችላሉ?" },
      { speaker: "Person B", textEng: "Of course. Go straight down this hallway, and turn left at the security check.", textAmh: "በእርግጥ። በዚህ መተላለፊያ ቀጥታ ይሂዱ፣ እና በፍተሻ ጣቢያው ጋር ወደ ግራ ይታጠፉ።" },
      { speaker: "Person A", textEng: "Is it far from here? Should I take the shuttle?", textAmh: "ከዚህ ይርቃል? የውስጥ ትራንስፖርት (Shuttle) መውሰድ አለብኝ?" },
      { speaker: "Person B", textEng: "No, it's just a five-minute walk. You don't need a shuttle.", textAmh: "አይ፣ የአምስት ደቂቃ የእግር መንገድ ነው። ትራንስፖርት አያስፈልግዎትም።" }
    ]
  }
];
