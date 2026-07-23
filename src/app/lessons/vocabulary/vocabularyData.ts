export interface VocabularyItem {
  word: string;
  amharicType: string;
  englishType: string;
  meaning: string;
  exampleEng: string;
  exampleAmh: string;
  category: "Aviation" | "Tech" | "General";
}

export const lessonTwoVocabulary: VocabularyItem[] = [
  {
    word: "Explore",
    amharicType: "ግስ",
    englishType: "Verb",
    meaning: "አዲስ ነገርን ለማወቅ መፈለግ፣ መመርመር ወይም መቃኘት::",
    exampleEng: "I want to explore new technologies and software development.",
    exampleAmh: "አዳዲስ ቴክኖሎጂዎችን እና የሶፍትዌር ልማትን መመርመር/ማወቅ እፈልጋለሁ::",
    category: "General"
  },
  {
    word: "Essential",
    amharicType: "ቅፅል",
    englishType: "Adjective",
    meaning: "በጣም አስፈላጊ ወይም ግዴታ የሆነ ነገር::",
    exampleEng: "Learning English is essential for global communication.",
    exampleAmh: "እንግሊዝኛን መማር ለአለም አቀፍ ተግባቦት በጣም አስፈላጊ ነው::",
    category: "General"
  },
  {
    word: "Deploy",
    amharicType: "ግስ",
    englishType: "Verb",
    meaning: "የተሰራን የሶፍትዌር ምርት ወይም ድረ-ገፅ ለተጠቃሚዎች ክፍት ማድረግ/መልቀቅ::",
    exampleEng: "Developers deploy their Next.js projects on Vercel with a single click.",
    exampleAmh: "ዴቨሎፐሮች የ Next.js ፕሮጀክቶቻቸውን በአንድ ክሊክ ቨርሴል ላይ ዲፕሎይ ያደርጋሉ::",
    category: "Tech"
  },
  {
    word: "Manifest",
    amharicType: "ስም",
    englishType: "Noun",
    meaning: "በአውሮፕላን ወይም በመርከብ የሚጓጓዙ ዕቃዎችና ጭነቶች ሙሉ ዝርዝር መግለጫ ሰነድ::",
    exampleEng: "The cargo supervisor reviews the weight limits on the flight manifest.",
    exampleAmh: "የካርጎ ሱፐርቫይዘሩ በበረራ ማኒፌስቱ ላይ የተገለጹትን የክብደት ገደቦች ይከልሳል::",
    category: "Aviation"
  },
  {
    word: "Aviation",
    amharicType: "ስም",
    englishType: "Noun",
    meaning: "ከአውሮፕላን በረራ፣ ዲዛይን እና አጠቃላይ የኢንዱስትሪው አሰራር ጋር የተያያዘ ሳይንስ::",
    exampleEng: "Ethiopian Airlines provides world-class aviation training for ground crew.",
    exampleAmh: "የኢትዮጵያ አየር መንገድ ለምድር ሰራተኞች አለም አቀፍ ደረጃውን የጠበቀ የአቪዬሽን ስልጠና ይሰጣል::",
    category: "Aviation"
  },
  {
    word: "Refactor",
    amharicType: "ግስ",
    englishType: "Verb",
    meaning: "የሶፍትዌርን ውጫዊ ስራ ሳይቀይሩ የውስጥ ኮዱን ይበልጥ እንዲነበብና እንዲፈጥን አድርጎ ማስተካከል።",
    exampleEng: "I need to refactor this complex Prisma schema into modular files.",
    exampleAmh: "ይህንን የተወሳሰበ የፕሪስማ ስኪማ በክፍሎች የተከፋፈለ ኮድ እንዲሆን ሪፋክተር ማድረግ አለብኝ::",
    category: "Tech"
  },
  {
    word: "Offside",
    amharicType: "ስም",
    englishType: "Noun",
    meaning: "በእግር ኳስ ጨዋታ አንድ ተጫዋች ኳሷ ከመመረቷ በፊት ከተከላካዮች ጀርባ ሲገኝ የሚሰጥ የህግ ጥሰት::",
    exampleEng: "The striker scores a goal, but the referee disallows it due to an offside rule.",
    exampleAmh: "አጥቂው ጎል አስቆጠረ፣ ነገር ግን ዳኛው ከጨዋታ ውጪ (ኦፍሳይድ) በመሆኑ ሳይቀበለው ቀረ::",
    category: "General"
  },
  {
    word: "Optimize",
    amharicType: "ግስ",
    englishType: "Verb",
    meaning: "አንድን ነገር ይበልጥ ውጤታማ፣ ፈጣን እና ፍፁም በሆነ መልኩ ማሻሻል::",
    exampleEng: "We must optimize the video rendering speed on mobile devices.",
    exampleAmh: "በሞባይል ስልኮች ላይ የቪዲዮ ማቀነባበሪያ (ሬንደሪንግ) ፍጥነትን ማሻሻል አለብን::",
    category: "Tech"
  },
  {
    word: "Terminal",
    amharicType: "ስም",
    englishType: "Noun",
    meaning: "ተሳፋሪዎች የሚሳፈሩበት ወይም የካርጎ ጭነቶች የሚስተናገዱበት ትልቅ የአውሮፕላን ማረፊያ ህንፃ::",
    exampleEng: "The new cargo terminal processes thousands of tons of goods daily.",
    exampleAmh: "አዲሱ የካርጎ ተርሚናል በቀን በሺዎች የሚቆጠሩ ቶን ዕቃዎችን ያስተናግዳል::",
    category: "Aviation"
  },
  {
    word: "Schema",
    amharicType: "ስም",
    englishType: "Noun",
    meaning: "የመረጃ ቋት (Database) አደረጃጀት እና በመረጃዎች መካከል ያለውን ግንኙነት የሚያሳይ ንድፍ::",
    exampleEng: "The relational schema defines how user profiles connect to their scores.",
    exampleAmh: "የሪሌሽናል ስኪማው የተጠቃሚዎች መገለጫ ከውጤታቸው ጋር እንዴት እንደሚገናኝ ይገልጻል::",
    category: "Tech"
  },
  {
    word: "Logistics",
    amharicType: "ስም",
    englishType: "Noun",
    meaning: "የቁሳቁሶችን፣ የጭነቶችንና የሰዎችን ዝውውር በተደራጀ መንገድ የማቀድና የማስተዳደር ስራ::",
    exampleEng: "Efficient logistics prevent cargo delays at the airport distribution center.",
    exampleAmh: "ቀልጣፋ ሎጂስቲክስ በአውሮፕላን ማረፊያው የማከፋፈያ ማዕከል ላይ የጭነት መዘግየትን ይከላከላል::",
    category: "Aviation"
  },
  {
    word: "Prototype",
    amharicType: "ስም",
    englishType: "Noun",
    meaning: "አንድን ሙሉ ሶፍትዌር ወይም ምርት ከመስራት በፊት የሚዘጋጅ የመጀመሪያ የሙከራ ሞዴል::",
    exampleEng: "The Telegram bot serves as a smart guide prototype for travelers.",
    exampleAmh: "የቴሌግራም ቦቱ ለተጓዦች እንደ ስማርት መሪ የመጀመሪያ የሙከራ ሞዴል ሆኖ ያገለግላል::",
    category: "Tech"
  },
  {
    word: "Biomimicry",
    amharicType: "ስም",
    englishType: "Noun",
    meaning: "ከተፈጥሮ እና ከእንስሳት አወቃቀር በመነሳት ዘመናዊ ቴክኖሎጂዎችን የመንደፍ ጥበብ::",
    exampleEng: "Engineers study birds to apply biomimicry principles to stealth jet designs.",
    exampleAmh: "ኢንጂነሮች ከተፈጥሮ የተቀዱ ህጎችን በስውር ተዋጊ ጄቶች ዲዛይን ላይ ለመተግበር ወፎች ያጠናሉ::",
    category: "Tech"
  },
  {
    word: "Stealth",
    amharicType: "ቅፅል",
    englishType: "Adjective",
    meaning: "የጠላት ራዳር በቀላሉ እንዳያየው ተደርጎ በልዩ ቴክኖሎጂ የተሰራ (በተለይ ለጦር አውሮፕላን)::",
    exampleEng: "The military forces deploy advanced stealth aircraft for secret missions.",
    exampleAmh: "የጦር ኃይሉ ለሚስጥራዊ ተልእኮዎች የላቁ በራዳር የማይታዩ ስውር አውሮፕላኖችን ያሰማራል::",
    category: "Aviation"
  },
  {
    word: "Transponder",
    amharicType: "ስም",
    englishType: "Noun",
    meaning: "የሳተላይት ወይም የራዲዮ ሲግናሎችን ተቀብሎ በራስ-ሰር ሌላ ሲግናል የሚያስተላልፍ መሳሪያ::",
    exampleEng: "You need to change the transponder frequency to find sports channels.",
    exampleAmh: "የስፖርት ቻናሎችን ለማግኘት የትራንስፖንደሩን ፍሪኩዌንሲ መቀየር አለብህ::",
    category: "General"
  },
  {
    word: "Modular",
    amharicType: "ቅፅል",
    englishType: "Adjective",
    meaning: "እያንዳንዱ ክፍል ራሱን ችሎ እንዲሰራ ተደርጎ የተዋቀረ የሶፍትዌር ወይም የህንፃ ዲዛይን::",
    exampleEng: "Building a modular video editor makes it easier to update individual tools.",
    exampleAmh: "ሞዱላር የቪዲዮ ኤዲተር መስራት ነጠላ መገልገያዎችን በቀላሉ ለማሻሻል ይረዳል::",
    category: "Tech"
  },
  {
    word: "Aptitude",
    amharicType: "ስም",
    englishType: "Noun",
    meaning: "አንድን የተወሰነ ስራ ወይም ትምህርት ለመማር ያለን ተፈጥሮአዊ ዝንባሌና ብቃት የመለኪያ ፈተና::",
    exampleEng: "The airline admissions process includes a strict written aptitude test.",
    exampleAmh: "የአየር መንገዱ የቅበላ ሂደት ጥብቅ የጽሑፍ የአፕቲቲውድ ፈተናን ያጠቃልላል::",
    category: "Aviation"
  },
  {
    word: "Architecture",
    amharicType: "ስም",
    englishType: "Noun",
    meaning: "የአንድ ውስብስብ የሶፍትዌር ሲስተም ወይም መተግበሪያ አጠቃላይ መዋቅራዊ ንድፍ::",
    exampleEng: "Clean code architecture ensures the app scales well over time.",
    exampleAmh: "ፅዱ የኮድ አርክቴክቸር አፕሊኬሽኑ በጊዜ ሂደት በጥሩ ሁኔታ እንዲያድግ ያደርጋል::",
    category: "Tech"
  },
  {
    word: "Synchronize",
    amharicType: "ግስ",
    englishType: "Verb",
    meaning: "በተለያዩ መሳሪያዎች ላይ ያሉ መረጃዎች ተመሳሳይና እኩል እንዲሆኑ የማድረግ ተግባር::",
    exampleEng: "Git allows you to synchronize your local database modifications with GitHub.",
    exampleAmh: "ጊት በስልክህ ላይ ያደረግከውን የዳታቤዝ ማሻሻያ ከጊትሃብ ጋር ለማመሳሰል (ሲንክ ለማድረግ) ይፈቅድልሃል::",
    category: "Tech"
  },
  {
    word: "Tactics",
    amharicType: "ስም",
    englishType: "Noun",
    meaning: "አንድን ግብ ለማሳካት በጥንቃቄ የታቀደ የተግባር ስልት ወይም የእግር ኳስ አሰላለፍ ዘዴ::",
    exampleEng: "The team changed their defensive tactics during the second half.",
    exampleAmh: "ቡድኑ በሁለተኛው አጋማሽ የደህንነት እና የመከላከል ታክቲኩን ቀይሯል::",
    category: "General"
  },
  {
    word: "Interface",
    amharicType: "ስም",
    englishType: "Noun",
    meaning: "አንድ ተጠቃሚ ከሶፍትዌሩ ጋር የሚገናኝበት የገፅታ እና የቁልፎች ስብስብ (ዲዛይን)::",
    exampleEng: "A dark-mode interface looks gorgeous on modern smartphone screens.",
    exampleAmh: "የዳርክ-ሞድ ኢንተርፌስ በዘመናዊ ስማርት ስልኮች ስክሪን ላይ እጅግ ማራኪ ይታያል::",
    category: "Tech"
  },
  {
    word: "Validation",
    amharicType: "ስም",
    englishType: "Noun",
    meaning: "አንድ መረጃ ትክክል እና ደህንነቱ የተጠበቀ መሆኑን የማረጋገጫ ሂደት::",
    exampleEng: "Input validation prevents invalid email formats from entering the database.",
    exampleAmh: "የኢንፑት ቫሊዴሽን የተሳሳቱ የኢሜይል አይነቶች ወደ ዳታቤዙ እንዳይገቡ ይከላከላል::",
    category: "Tech"
  },
  {
    word: "Repository",
    amharicType: "ስም",
    englishType: "Noun",
    meaning: "የፕሮጀክት ፋይሎችና የኮድ ታሪኮች በደህንነት የሚቀመጡበት ዲጂታል ማከማቻ (ቦታ)::",
    exampleEng: "I always push my local commits to the remote GitHub repository.",
    exampleAmh: "ሁልጊዜም የሰራሁትን ኮድ በሩቅ ወደሚገኘው የጊትሃብ ሪፖዚተሪ እገፋዋለሁ (Push አደርጋለሁ)::",
    category: "Tech"
  },
  {
    word: "Framework",
    amharicType: "ስም",
    englishType: "Noun",
    meaning: "ሶፍትዌርን በፍጥነትና በስርዓት ለመስራት የሚያስችል አስቀድሞ የተዘጋጀ የኮድ መዋቅር::",
    exampleEng: "Flutter is a powerful framework for building cross-platform mobile apps.",
    exampleAmh: "ፍላተር በሁሉም ስልኮች ላይ የሚሰሩ አፖችን ለመስራት የሚያስችል ጠንካራ ፍሬምወርክ ነው::",
    category: "Tech"
  },
  {
    word: "Component",
    amharicType: "ስም",
    englishType: "Noun",
    meaning: "አንድን ትልቅ የዌብ ገፅ ለመስራት የሚያገለግል ራሱን የቻለ ትንሽ የዲዛይን ክፍል::",
    exampleEng: "Each vocabulary card in this app is a reusable React component.",
    exampleAmh: "በዚህ አፕ ውስጥ ያለ እያንዳንዱ የቃላት ካርድ ድጋሚ ጥቅም ላይ ሊውል የሚችል የሪያክት ኮምፖነንት ነው::",
    category: "Tech"
  }
];
