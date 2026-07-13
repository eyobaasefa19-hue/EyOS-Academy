"use client";

import { useState } from "react";
import Link from "next/link";

// 100 በላይ የውይይት መስመሮችን (Dialogue Turns) የያዘው ግዙፍ ዳታ በአንድ ላይ እዚህ ተካቷል
const dialogueScenarios = [
  {
    id: 1,
    title: "Daily Conversation: Meeting a Colleague",
    contextAmh: "በሥራ ቦታ አዲስ የሥራ ባልደረባ ሲያገኙ የሚደረግ ውይይት።",
    dialogues: [
      { speaker: "Person A", textEng: "Good afternoon! My name is Eyob. I just joined the cargo operations team.", textAmh: "እንደምን አረፈዱ! ስሜ እዮብ ይባላል። አሁን ነው የካርጎ ኦፕሬሽን ቡድኑን የተቀላቀልኩት።" },
      { speaker: "Person B", textEng: "Welcome to the team, Eyob! Nice to meet you. My name is Samuel.", textAmh: "ወደ ቡድኑ እንኳን ደህና መጣህ እዮብ! ስለተገናኘን ደስ ብሎኛል። ስሜ ሳሙኤል ይባላል።" },
      { speaker: "Person A", textEng: "Nice to meet you too, Samuel. I am excited to work with you all safely and quickly.", textAmh: "እኔም ስለተገናኘን ደስ ብሎኛል ሳሙኤል ከእናንተ ጋር በደኅንነት እና በፈጣን ሁኔታ ለመሥራት ጓጉቻለሁ።" },
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
      { speaker: "Person A", textEng: "Excuse me, I am a bit lost. Can you tell me how to get to the main terminal?", textAmh: "ይቅርታ፣ ትንሽ ጠፍቶብኛል። ወደ ዋናው ተርሚናል እንዴት እንደምሄድ ሊነግሩኝ ይችላሉ?" },
      { speaker: "Person B", textEng: "Of course. Go straight down this hallway, and turn left at the security check.", textAmh: "በእርግጥ። በዚህ መተላለፊያ ቀጥታ ይሂዱ፣ እና በፍተሻ ጣቢያው ጋር ወደ ግራ ይታጠፉ።" },
      { speaker: "Person A", textEng: "Is it far from here? Should I take the shuttle?", textAmh: "ከዚህ ይርቃል? የውስጥ ትራንስፖርት (Shuttle) መውሰድ አለብኝ?" },
      { speaker: "Person B", textEng: "No, it's just a five-minute walk. You don't need a shuttle.", textAmh: "አይ፣ የአምስት ደቂቃ የእግር መንገድ ነው። ትራንስፖርት አያስፈልግዎትም።" }
    ]
  },
  {
    id: 11,
    title: "Healthcare: Doctor Appointment",
    contextAmh: "በህክምና ማዕከል ለቀጠሮ የሚደረግ ውይይት።",
    dialogues: [
      { speaker: "Person A", textEng: "Good morning. I have an appointment with Dr. Sarah at 10:00 AM.", textAmh: "እንደምን አደሩ። ከዶክተር ሳራ ጋር በ 4:00 ሰዓት ቀጠሮ ነበረኝ።" },
      { speaker: "Person B", textEng: "Let me check the system. Yes, your name is on the list. Please have a seat.", textAmh: "ሲስተሙን ልየው። അዎ፣ ስምዎ በዝርዝሩ ውስጥ አለ። እባክዎትን ይቀመጡ።" },
      { speaker: "Person A", textEng: "Thank you. Do I need to fill out any medical forms?", textAmh: "አመሰግናለሁ። ምንም አይነት የህክምና ፎርም መሙላት ያስፈልገኛል?" },
      { speaker: "Person B", textEng: "No, your records are already updated. The doctor will call you soon.", textAmh: "አይ፣ መረጃዎችዎ አስቀድመው ተስተካክለዋል። ዶክተሯ በቅርቡ ትጠራዎታለች።" }
    ]
  },
  {
    id: 12,
    title: "Shopping: Buying Clothes",
    contextAmh: "ልብስ መደብር ውስጥ ግብይት ሲፈፀም የሚደረግ ውይይት።",
    dialogues: [
      { speaker: "Person A", textEng: "I really like this jacket. Do you have it in a medium size?", textAmh: "ይሄ ጃኬት በጣም ወድጄዋለሁ። መካከለኛ (Medium) መጠን አላችሁ?" },
      { speaker: "Person B", textEng: "Let me check the stockroom for you. Yes, we have one left in medium.", textAmh: "እስኪ መጋዘኑን ልይሎት። አዎ፣ በመካከለኛ መጠን አንድ ቀርቶናል።" },
      { speaker: "Person A", textEng: "Great! Can I try it on before I buy it?", textAmh: "አሪፍ! ከመግዛቴ በፊት ለብሼ ልሞክረው እችላለሁ?" },
      { speaker: "Person B", textEng: "Absolutely. The fitting rooms are right there, behind the mirror.", textAmh: "በእርግጥ። ልብስ መሞከሪያ ክፍሎቹ እዛ ጋር፣ ከመስተዋቱ ጀርባ ናቸው።" }
    ]
  },
  {
    id: 13,
    title: "Job Interview: Strengths and Weaknesses",
    contextAmh: "በስራ ቅጥር ቃለ መጠይቅ ወቅት የሚደረግ ውይይት።",
    dialogues: [
      { speaker: "Person A", textEng: "Can you tell me about your biggest strength as a developer?", textAmh: "እንደ ዴቨሎፐር ትልቁ ጥንካሬህ ምን እንደሆነ ልትነግረኝ ትችላለህ?" },
      { speaker: "Person B", textEng: "My biggest strength is my ability to build modular architectures quickly.", textAmh: "ትልቁ ጥንካሬዬ ሞዱላር የሆኑ አሰራሮችን በፍጥነት የመገንባት ችሎታዬ ነው።" },
      { speaker: "Person A", textEng: "That is excellent. And what would you consider your weakness?", textAmh: "ያ በጣም ግሩም ነው። እና ደግሞ ድክመትህ ብለህ የምታስበው ምንድነው?" },
      { speaker: "Person B", textEng: "Sometimes I focus too much on small details, but I am learning to manage my time better.", textAmh: "አንዳንዴ በትንንሽ ዝርዝሮች ላይ በጣም አተኩራለሁ፣ ነገር ግን ጊዜዬን በአግባቡ መጠቀምን እየተማርኩ ነው።" }
    ]
  },
  {
    id: 14,
    title: "At the Bank: Opening an Account",
    contextAmh: "ባንክ ውስጥ አዲስ የባንክ ሂሳብ ለመክፈት የሚደረግ ውይይት።",
    dialogues: [
      { speaker: "Person A", textEng: "Hello, I would like to open a new savings account, please.", textAmh: "ጤና ይስጥልኝ፣ አዲስ የቁጠባ ሂሳብ መክፈት እፈልግ ነበር።" },
      { speaker: "Person B", textEng: "Sure, we can help with that. Do you have your public ID card with you?", textAmh: "እሺ፣ በዚህ ላይ ልንረዳዎ እንችላለን። መታወቂያ ካርድዎን ይዘዋል?" },
      { speaker: "Person A", textEng: "Yes, here is my ID card and my driving license.", textAmh: "አዎ፣ መታወቂያዬ እና የመንጃ ፍቃዴ ይኸው።" },
      { speaker: "Person B", textEng: "Thank you. Please fill out this application form and sign at the bottom.", textAmh: "አመሰግናለሁ። እባክዎን ይህንን የማመልከቻ ቅፅ ይሙሉ እና ከታች ይፈርሙ።" }
    ]
  },
  {
    id: 15,
    title: "Hotel Reception: Checking In",
    contextAmh: "ሆቴል ውስጥ ክፍል ለመያዝ (Check-in) የሚደረግ ውይይት።",
    dialogues: [
      { speaker: "Person A", textEng: "Welcome to the Grand Hotel. How can I help you today?", textAmh: "ወደ ግራንድ ሆቴል እንኳን ደህና መጡ። ዛሬ በምን ልረዳዎ እችላለሁ?" },
      { speaker: "Person B", textEng: "Hi, I have a reservation under the name Eyob. It is for two nights.", textAmh: "ሰላም偏 በእዮብ ስም የተያዘ ቦታ (Reservation) አለኝ። ለሁለት ምሽቶች ነው።" },
      { speaker: "Person A", textEng: "Let me find your booking. Ah, yes. A single room with a city view.", textAmh: "እስኪ ምዝገባዎን ልፈልገው። አሃ፣ አዎ። ባለአንድ አልጋ ክፍል ከከተማ እይታ ጋር።" },
      { speaker: "Person B", textEng: "Perfect. What time is breakfast served in the morning?", textAmh: "አሪፍ። ጠዋት ቁርስ ስንት ሰዓት ነው የሚቀርበው?" },
      { speaker: "Person A", textEng: "Breakfast is served from 6:30 AM to 10:00 AM in the main hall.", textAmh: "ቁርስ ከጠዋቱ 12:30 እስከ 4:00 ሰዓት በዋናው አዳራሽ ይቀርባል።" }
    ]
  },
  {
    id: 16,
    title: "Daily Commute: Taking a Taxi",
    contextAmh: "ታክሲ ውስጥ አቅጣጫ እና ሂሳብ ለመነጋገር የሚደረግ ውይይት።",
    dialogues: [
      { speaker: "Person A", textEng: "Can you take me to the airport cargo terminal, please?", textAmh: "ወደ አየር መንገድ ካርጎ ተርሚናል ሊወስዱኝ ይችላሉ?" },
      { speaker: "Person B", textEng: "Sure. The traffic is a bit heavy right now, so it might take 30 minutes.", textAmh: "እሺ። አሁን ትራፊክ ትንሽ ስለበዛ፣ 30 ደቂቃ ሊወስድብን ይችላል።" },
      { speaker: "Person A", textEng: "That is fine. How much will the fare be?", textAmh: "ችግር የለውም። ሂሳቡ ስንት ይሆናል?" },
      { speaker: "Person B", textEng: "It will be around 300 Birr. Please put your seatbelt on.", textAmh: "ወደ 300 ብር አካባቢ ይሆናል። እባክዎን የደህንነት ቀበቶዎን ያስሩ።" }
    ]
  },
  {
    id: 17,
    title: "Education: Discussing Courses",
    contextAmh: "ስለ ትምህርት እና ኮርሶች ምርጫ የሚደረግ ውይይት።",
    dialogues: [
      { speaker: "Person A", textEng: "Are you planning to take the advanced database management course?", textAmh: "የላቀውን የዳታቤዝ ማኔጅመንት ኮርስ ለመውሰድ እያሰብክ ነው?" },
      { speaker: "Person B", textEng: "I am not sure yet. I am currently focused on finishing my EdTech startup project.", textAmh: "እስካሁን እርግጠኛ አይደለሁም። አሁን ትኩረቴ የኤድ-ቴክ (EdTech) ጅማሬ ፕሮጀክቴን መጨረስ ላይ ነው።" },
      { speaker: "Person A", textEng: "That sounds like a lot of work. The EYOB X TECH AI project, right?", textAmh: "ብዙ ስራ ያለበት ይመስላል። የ EYOB X TECH AI ፕሮጀክት፣ አይደል?" },
      { speaker: "Person B", textEng: "Yes! I am building the folder layouts and monetization frameworks this week.", textAmh: "አዎ! በዚህ ሳምንት የፎልደር አቀማመጦችን እና የገቢ ማስገኛ መዋቅሮችን እየገነባሁ ነው።" }
    ]
  },
  {
    id: 18,
    title: "Weather Talk: Weekend Plans",
    contextAmh: "ስለ አየር ንብረት እና የሳምንት መጨረሻ እቅድ የሚደረግ ውይይት።",
    dialogues: [
      { speaker: "Person A", textEng: "The weather forecast says it will rain heavily this weekend.", textAmh: "የአየር ንብረት ትንበያው በዚህ ሳምንት መጨረሻ ከባድ ዝናብ ይኖራል ይላል።" },
      { speaker: "Person B", textEng: "Really? I was planning to go to the stadium to watch the football match.", textAmh: "በእውነት? የእግር ኳስ ጨዋታውን ለማየት ወደ ስታዲየም ለመሄድ አስቤ ነበር።" },
      { speaker: "Person A", textEng: "You might want to watch it at home on your satellite TV instead.", textAmh: "በሱ ፈንታ ቤት ውስጥ በሳተላይት ቲቪህ ብታየው ይሻልሀል።" },
      { speaker: "Person B", textEng: "Good idea. I will stay indoors and practice my English lessons on my phone.", textAmh: "ጥሩ ሀሳብ። ቤት ውስጥ ሆኜ የእንግሊዝኛ ትምህርቶቼን በስልኬ እለማመዳለሁ።" }
    ]
  },
  {
    id: 19,
    title: "Grocery Shopping: Finding Items",
    contextAmh: "ሱፐርማርኬት ውስጥ ዕቃዎችን ለመፈለግ የሚደረግ ውይይት።",
    dialogues: [
      { speaker: "Person A", textEng: "Excuse me, where can I find the fresh vegetables and fruits?", textAmh: "ይቅርታ偏 ትኩስ አትክልቶች እና ፍራፍሬዎችን የት ላገኛቸው እችላለሁ?" },
      { speaker: "Person B", textEng: "They are in aisle 4, right next to the dairy products.", textAmh: "መተላለፊያ 4 ውስጥ፣ ከወተት ተዋፅኦዎቹ አጠገብ ይገኛሉ።" },
      { speaker: "Person A", textEng: "Thank you. Do you also sell organic coffee beans?", textAmh: "አመሰግናለሁ። ኦርጋኒክ የቡና ፍሬዎችስ ትሸጣላችሁ?" },
      { speaker: "Person B", textEng: "Yes, we do. The coffee section is just behind you on the bottom shelf.", textAmh: "አዎ እንሸጣለን። የቡናው ክፍል ከጀርባዎ በታችኛው መደርደሪያ ላይ ነው።" }
    ]
  },
  {
    id: 20,
    title: "Socializing: Inviting a Friend",
    contextAmh: "ጓደኛን ወደ ፕሮግራም ለመጋበዝ የሚደረግ ውይይት።",
    dialogues: [
      { speaker: "Person A", textEng: "Are you free this Friday evening? We are having a small get-together.", textAmh: "በዚህ አርብ ማታ ትመቻለህ? ትንሽ ስብሰባ (የመዝናኛ ፕሮግራም) አዘጋጅተናል።" },
      { speaker: "Person B", textEng: "I think so. I finish my cargo shift at 5:00 PM.", textAmh: "የምመች ይመስለኛል። የካርጎ ስራ ፈረቃዬን 11:00 ሰዓት ላይ እጨርሳለሁ።" },
      { speaker: "Person A", textEng: "Awesome! We will play some music and eat dinner around 7:00 PM.", textAmh: "አሪፍ! 1:00 ሰዓት አካባቢ ሙዚቃ ከፍተን እራት እንበላለን።" },
      { speaker: "Person B", textEng: "Count me in. Should I bring anything to drink?", textAmh: "እኔንም አስቡኝ። የምጠጣው ነገር ይዤ ልምጣ?" },
      { speaker: "Person A", textEng: "No need, we have plenty of drinks. Just bring yourself!", textAmh: "አያስፈልግም፣ በቂ መጠጥ አለን። ራስህን ብቻ ይዘህ ና!" }
    ]
  }
];

export default function PracticalHubLesson() {
  const [activeTab, setActiveTab] = useState<"reading" | "dialogue" | "writing">("reading");
  
  // Reading Section States
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showReadingResult, setShowReadingResult] = useState(false);

  // Writing Section States
  const [userText, setUserText] = useState("");
  const [aiFeedback, setAiFeedback] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);

  // Quiz Validation
  const handleQuizSubmit = () => {
    if (!selectedAnswer) return;
    setShowReadingResult(true);
  };

  // AI Writing Review Simulation
  const handleWritingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userText.trim()) return;
    setIsReviewing(true);

    try {
      setTimeout(() => {
        setAiFeedback(
          `**Great job on practicing your writing!** Here is a quick review of your text:\n\n` +
          `*   **Grammar Check:** Your sentence structure is good. Ensure proper capitalization.\n` +
          `*   **Vocabulary:** Try using words like *excellent* or *splendid* next time.\n` +
          `*   **Correction:** Always remember to end your sentences with a full stop (.).`
        );
        setIsReviewing(false);
      }, 1500);
    } catch (error) {
      setIsReviewing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-4 sm:p-6 flex flex-col">
      <div className="max-w-3xl w-full mx-auto flex-1 flex flex-col">
        
        {/* Header */}
        <div>
          <Link href="/dashboard" className="text-indigo-400 hover:underline mb-4 inline-block text-sm">
            ← ወደ ዳሽቦርድ ይመለሱ
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-indigo-400 bg-clip-text text-transparent mb-1">
            Lesson 04: Practical English Hub
          </h1>
          <p className="text-sm text-gray-400 mb-6">ማንበብ፣ የዕለት ተዕለት ውይይቶችን መለማመድ እና የጽሑፍ ብቃትዎን በአንድ ቦታ ያሳድጉ።</p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-3 gap-2 bg-[#161B26]/60 p-1.5 rounded-xl border border-gray-800 mb-6">
          <button
            onClick={() => setActiveTab("reading")}
            className={`py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
              activeTab === "reading" ? "bg-emerald-600 text-white shadow-lg" : "text-gray-400 hover:text-white"
            }`}
          >
            📖 Reading
          </button>
          <button
            onClick={() => setActiveTab("dialogue")}
            className={`py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
              activeTab === "dialogue" ? "bg-emerald-600 text-white shadow-lg" : "text-gray-400 hover:text-white"
            }`}
          >
            💬 Dialogue
          </button>
          <button
            onClick={() => setActiveTab("writing")}
            className={`py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
              activeTab === "writing" ? "bg-emerald-600 text-white shadow-lg" : "text-gray-400 hover:text-white"
            }`}
          >
            ✍️ Writing
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-[#161B26]/40 backdrop-blur-md border border-gray-800 rounded-2xl p-5 sm:p-6 min-h-[400px]">
          
          {/* TAB 1: READING */}
          {activeTab === "reading" && (
            <div className="space-y-5">
              <div className="border-l-4 border-emerald-500 pl-3">
                <h2 className="text-lg font-semibold text-emerald-400">Short Story: The New Airport</h2>
                <p className="text-xs text-gray-400">ታሪኩን በጥንቃቄ ያንብቡና ከታች ያለውን ጥያቄ ይመልሱ።</p>
              </div>
              <p className="text-gray-200 text-sm leading-relaxed bg-[#0B0F19]/60 p-4 rounded-xl border border-gray-800/80">
                Abebe started his new job at Addis Ababa Airport today. He is very excited to work with a great team. 
                His task is to handle cargo and manage logistics. He wants to study Aviation Management in the future 
                to grow his career. Everyone welcomed him warmly on his first day.
              </p>
              <div className="pt-2 space-y-3">
                <p className="text-sm font-medium text-gray-300">Question: What is Abebe's future career plan?</p>
                <div className="space-y-2">
                  {[
                    { key: "A", text: "To become a pilot" },
                    { key: "B", text: "To study Aviation Management" },
                    { key: "C", text: "To open a shopping mall" }
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => !showReadingResult && setSelectedAnswer(opt.key)}
                      className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all flex items-center justify-between ${
                        selectedAnswer === opt.key
                          ? "border-indigo-500 bg-indigo-600/20 text-indigo-300"
                          : "border-gray-800 bg-[#0B0F19]/40 text-gray-300 hover:border-gray-700"
                      }`}
                    >
                      <span>{opt.key}. {opt.text}</span>
                    </button>
                  ))}
                </div>
                {!showReadingResult ? (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={!selectedAnswer}
                    className="w-full mt-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 font-medium rounded-xl text-sm transition-all"
                  >
                    መልስህን አስረክብ (Submit)
                  </button>
                ) : (
                  <div className={`p-4 rounded-xl text-sm mt-4 border ${
                    selectedAnswer === "B" ? "bg-emerald-950/40 border-emerald-800 text-emerald-300" : "bg-red-950/40 border-red-800 text-red-300"
                  }`}>
                    {selectedAnswer === "B" 
                      ? "🎉 ትክክል ነህ! Excellent job! Abebe wants to study Aviation Management." 
                      : "❌ የተሳሳተ መልስ። ትክክለኛው መልስ B (To study Aviation Management) ነው።"}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: DIALOGUE (ዳይናሚክ ሉፕ እዚህ ተተክቷል) */}
          {activeTab === "dialogue" && (
            <div className="space-y-8 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-800">
              {dialogueScenarios.map((scenario) => (
                <div key={scenario.id} className="space-y-4 border-b border-gray-800 pb-6 last:border-0">
                  <div className="border-l-4 border-emerald-500 pl-3">
                    <h2 className="text-lg font-semibold text-emerald-400">{scenario.title}</h2>
                    <p className="text-xs text-gray-400">{scenario.contextAmh}</p>
                  </div>
                  
                  <div className="space-y-4 pt-2">
                    {scenario.dialogues.map((dialogue, index) => {
                      const isPersonA = dialogue.speaker === "Person A";
                      return (
                        <div key={index} className="flex gap-3 items-start">
                          <div className={`text-xs px-2.5 py-1 rounded-md font-bold mt-0.5 border ${
                            isPersonA 
                              ? "bg-emerald-600/20 border-emerald-500/30 text-emerald-400" 
                              : "bg-indigo-600/20 border-indigo-500/30 text-indigo-400"
                          }`}>
                            {dialogue.speaker}
                          </div>
                          <div className="flex-1 bg-[#0B0F19]/60 p-3 rounded-xl border border-gray-800 text-sm">
                            <p className="text-white font-medium">"{dialogue.textEng}"</p>
                            <p className="text-xs text-gray-400 mt-1">ትርጉም: {dialogue.textAmh}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: WRITING */}
          {activeTab === "writing" && (
            <div className="space-y-5">
              <div className="border-l-4 border-emerald-500 pl-3">
                <h2 className="text-lg font-semibold text-emerald-400">Writing Practice & Feedback</h2>
                <p className="text-xs text-gray-400">ስለ ራስዎ ወይም ስለ ሥራዎ አጭር አንቀጽ በእንግሊዘኛ ይጻፉ እና አስተያየት ያግኙ።</p>
              </div>
              <form onSubmit={handleWritingSubmit} className="space-y-3 pt-2">
                <textarea
                  value={userText}
                  onChange={(e) => setUserText(e.target.value)}
                  disabled={isReviewing}
                  rows={4}
                  placeholder="Example: My name is Eyob. I live in Addis Ababa. I work at Ethiopian Airlines..."
                  className="w-full bg-[#0B0F19] border border-gray-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors disabled:opacity-50 resize-none leading-relaxed"
                />
                <button
                  type="submit"
                  disabled={isReviewing || !userText.trim()}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 font-medium rounded-xl text-sm transition-all"
                >
                  {isReviewing ? "ጽሑፍዎ እየተገመገመ ነው..." : "ጽሑፉን አርምልኝ (Check Text)"}
                </button>
              </form>

              {aiFeedback && (
                <div className="p-4 bg-[#161B26] border border-gray-800 rounded-xl text-sm text-gray-200 space-y-2 mt-4 leading-relaxed">
                  <p className="font-semibold text-emerald-400">✨ AI Feedback:</p>
                  <p className="whitespace-pre-line text-xs sm:text-sm">{aiFeedback}</p>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer Navigation */}
        <div className="mt-6 flex justify-between items-center">
          <span className="text-xs text-gray-500">Lesson 4 of 4</span>
          <Link href="/dashboard" className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 font-medium rounded-xl text-xs sm:text-sm transition-all">
            ወደ ማውጫ ተመለስ
          </Link>
        </div>

      </div>
    </div>
  );
}
