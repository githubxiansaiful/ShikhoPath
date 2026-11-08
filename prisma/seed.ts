import { PrismaClient, UserRole, UserStatus, LearningLevel, BillingInterval, IELTSModuleType, IELTSTestType, MockTestType, ExampleType, PracticeType, VocabularyStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting ShikhoPath database seeding...');

  // 1. Password Hashing
  const defaultPassword = await bcrypt.hash('SuperAdmin@123', 10);
  const adminPassword = await bcrypt.hash('Admin@123', 10);
  const studentPassword = await bcrypt.hash('Student@123', 10);

  // 2. Seed Users
  console.log('Creating initial users...');
  const superAdmin = await prisma.user.upsert({
    where: { email: 'superadmin@shikhopath.com' },
    update: {},
    create: {
      email: 'superadmin@shikhopath.com',
      name: 'ShikhoPath Super Admin',
      passwordHash: defaultPassword,
      role: UserRole.SUPER_ADMIN,
      status: UserStatus.ACTIVE,
      emailVerified: new Date(),
      preferredLanguage: 'en',
      twoFactorEnabled: false,
      profile: {
        create: {
          bio: 'Platform System Architect and Administrator',
          country: 'Bangladesh',
          currentLevel: LearningLevel.ADVANCED,
          targetLevel: LearningLevel.ADVANCED,
        },
      },
      preference: {
        create: {
          language: 'en',
          theme: 'light',
          emailNotifications: true,
        },
      },
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@shikhopath.com' },
    update: {},
    create: {
      email: 'admin@shikhopath.com',
      name: 'Content & Learning Manager',
      passwordHash: adminPassword,
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
      emailVerified: new Date(),
      preferredLanguage: 'bn',
      profile: {
        create: {
          bio: 'Senior Academic Coordinator',
          country: 'Bangladesh',
          currentLevel: LearningLevel.ADVANCED,
          targetLevel: LearningLevel.ADVANCED,
        },
      },
      preference: {
        create: {
          language: 'bn',
          theme: 'light',
          emailNotifications: true,
        },
      },
    },
  });

  const student = await prisma.user.upsert({
    where: { email: 'student@shikhopath.com' },
    update: {},
    create: {
      email: 'student@shikhopath.com',
      name: 'Tanvir Ahmed',
      passwordHash: studentPassword,
      role: UserRole.USER,
      status: UserStatus.ACTIVE,
      emailVerified: new Date(),
      preferredLanguage: 'bn',
      profile: {
        create: {
          bio: 'University student preparing for IELTS Academic',
          country: 'Bangladesh',
          currentLevel: LearningLevel.PRE_INTERMEDIATE,
          targetLevel: LearningLevel.ADVANCED,
          learningGoal: 'Prepare for IELTS and achieve Band 7.5+',
          dailyTimeMinutes: 45,
          ieltsTargetBand: 7.5,
        },
      },
      preference: {
        create: {
          language: 'bn',
          theme: 'light',
          emailNotifications: true,
          dailyReminder: true,
          reminderTime: '21:00',
        },
      },
    },
  });

  // 3. Seed Permissions
  console.log('Seeding permissions...');
  const permissionsData = [
    { name: 'users:manage', group: 'Users', description: 'Create, edit, suspend users and grant access' },
    { name: 'courses:manage', group: 'Courses', description: 'Create and edit courses and modules' },
    { name: 'lessons:manage', group: 'Lessons', description: 'Manage bilingual lesson contents' },
    { name: 'grammar:manage', group: 'Grammar', description: 'Manage grammar rules and exercises' },
    { name: 'vocabulary:manage', group: 'Vocabulary', description: 'Manage vocabulary lists and flashcards' },
    { name: 'ielts:manage', group: 'IELTS', description: 'Manage IELTS reading, listening, writing tasks' },
    { name: 'mock_tests:manage', group: 'Mock Tests', description: 'Configure mock exams and scoring rules' },
    { name: 'subscriptions:manage', group: 'Subscriptions', description: 'Configure plans, manual overrides' },
    { name: 'system:settings', group: 'System', description: 'Super Admin global settings' },
  ];

  for (const perm of permissionsData) {
    await prisma.permission.upsert({
      where: { name: perm.name },
      update: { description: perm.description },
      create: perm,
    });
  }

  // 4. Seed Subscription Plans & Features
  console.log('Seeding subscription plans...');
  const freePlan = await prisma.subscriptionPlan.upsert({
    where: { code: 'FREE' },
    update: {},
    create: {
      code: 'FREE',
      nameEn: 'Free Starter Plan',
      nameBn: 'ফ্রি স্টার্টার প্ল্যান',
      descriptionEn: 'Essential English fundamentals, daily vocabulary, and sample IELTS tests.',
      descriptionBn: 'মৌলিক ইংরেজি শিক্ষা, প্রতিদিনের শব্দভাণ্ডার এবং সীমিত আইইএলটিএস প্র্যাকটিস।',
      priceAmount: 0.00,
      currency: 'BDT',
      billingInterval: BillingInterval.MONTHLY,
      isActive: true,
      isPublic: true,
      order: 1,
    },
  });

  const premiumMonthly = await prisma.subscriptionPlan.upsert({
    where: { code: 'PREMIUM_MONTHLY' },
    update: {},
    create: {
      code: 'PREMIUM_MONTHLY',
      nameEn: 'Premium Pro (Monthly)',
      nameBn: 'প্রিমিয়াম প্রো (মাসিক)',
      descriptionEn: 'Full access to all courses, Grammar Academy, AI Tutor, and full IELTS mock tests.',
      descriptionBn: 'সকল কোর্স, সম্পূর্ণ ব্যাকরণ একাডেমি, এআই টিউটর এবং আনলিমিটেড মক টেস্ট সুবিধা।',
      priceAmount: 499.00,
      currency: 'BDT',
      billingInterval: BillingInterval.MONTHLY,
      isActive: true,
      isPublic: true,
      order: 2,
    },
  });

  const premiumYearly = await prisma.subscriptionPlan.upsert({
    where: { code: 'PREMIUM_YEARLY' },
    update: {},
    create: {
      code: 'PREMIUM_YEARLY',
      nameEn: 'Premium Pro (Yearly - Best Value)',
      nameBn: 'প্রিমিয়াম প্রো (বার্ষিক - সেরা মূল্য)',
      descriptionEn: 'Complete 1-year unlimited access with priority AI feedback and 2 months free.',
      descriptionBn: 'সম্পূর্ণ ১ বছরের আনলিমিটেড অ্যাক্সেস, প্রায়োরিটি এআই ফিডব্যাক এবং ২ মাস ফ্রি।',
      priceAmount: 4990.00,
      currency: 'BDT',
      billingInterval: BillingInterval.YEARLY,
      isActive: true,
      isPublic: true,
      order: 3,
    },
  });

  // Features for Free vs Premium
  const freeFeatures = [
    { featureKey: 'selected_courses', featureNameEn: 'Selected Basic Courses', featureNameBn: 'নির্বাচিত বেসিক কোর্সসমূহ', isEnabled: true, limitValue: 3 },
    { featureKey: 'grammar_academy', featureNameEn: 'Basic Grammar Topics', featureNameBn: 'প্রাথমিক ব্যাকরণ বিষয়সমূহ', isEnabled: true, limitValue: 5 },
    { featureKey: 'vocabulary_builder', featureNameEn: 'Daily 5 Words', featureNameBn: 'দৈনিক ৫টি শব্দ', isEnabled: true, limitValue: 5 },
    { featureKey: 'ai_tutor', featureNameEn: 'AI English Tutor', featureNameBn: 'এআই ইংলিশ টিউটর', isEnabled: true, limitValue: 5 },
    { featureKey: 'mock_tests', featureNameEn: 'Practice Mock Tests', featureNameBn: 'মক টেস্ট প্র্যাকটিস', isEnabled: true, limitValue: 1 },
  ];

  for (const f of freeFeatures) {
    await prisma.planFeature.upsert({
      where: { planId_featureKey: { planId: freePlan.id, featureKey: f.featureKey } },
      update: {},
      create: { ...f, planId: freePlan.id },
    });
  }

  const premiumFeatures = [
    { featureKey: 'all_courses', featureNameEn: 'All Courses & Modules', featureNameBn: 'সকল কোর্স এবং মডিউল', isEnabled: true, limitValue: null },
    { featureKey: 'grammar_academy', featureNameEn: 'Complete Grammar Academy', featureNameBn: 'সম্পূর্ণ ব্যাকরণ একাডেমি', isEnabled: true, limitValue: null },
    { featureKey: 'vocabulary_builder', featureNameEn: 'Full Spaced-Repetition Vocabulary', featureNameBn: 'সম্পূর্ণ স্পেসড-রিপিটিশন ভোকাবুলারি', isEnabled: true, limitValue: null },
    { featureKey: 'ai_tutor', featureNameEn: 'Unlimited AI Tutor & Essay Grading', featureNameBn: 'আনলিমিটেড এআই টিউটর ও প্রবন্ধ মূল্যায়ন', isEnabled: true, limitValue: null },
    { featureKey: 'mock_tests', featureNameEn: 'Full Computer-Delivered Mock Tests', featureNameBn: 'পূর্ণাঙ্গ কম্পিউটার-বেসড মক টেস্ট', isEnabled: true, limitValue: null },
    { featureKey: 'speaking_feedback', featureNameEn: 'AI Speaking & Pronunciation Feedback', featureNameBn: 'এআই স্পিকিং এবং উচ্চারণ ফিডব্যাক', isEnabled: true, limitValue: null },
  ];

  for (const f of premiumFeatures) {
    await prisma.planFeature.upsert({
      where: { planId_featureKey: { planId: premiumMonthly.id, featureKey: f.featureKey } },
      update: {},
      create: { ...f, planId: premiumMonthly.id },
    });
    await prisma.planFeature.upsert({
      where: { planId_featureKey: { planId: premiumYearly.id, featureKey: f.featureKey } },
      update: {},
      create: { ...f, planId: premiumYearly.id },
    });
  }

  // Assign Free subscription to student
  await prisma.subscription.upsert({
    where: { id: 'student-demo-subscription' },
    update: {},
    create: {
      id: 'student-demo-subscription',
      userId: student.id,
      planId: freePlan.id,
      status: 'ACTIVE',
      startDate: new Date(),
    },
  });

  // 5. Seed Course Categories & Courses
  console.log('Seeding course categories and courses...');
  const catGeneral = await prisma.courseCategory.upsert({
    where: { slug: 'general-english' },
    update: {},
    create: {
      slug: 'general-english',
      nameEn: 'General English',
      nameBn: 'সাধারণ ইংরেজি',
      descriptionEn: 'Daily communication, practical dialogues, and natural conversations.',
      descriptionBn: 'দৈনন্দিন যোগাযোগ, বাস্তবিক ডায়ালগ এবং সাবলীল কথোপকথন।',
      icon: 'BookOpen',
      order: 1,
    },
  });

  const catGrammar = await prisma.courseCategory.upsert({
    where: { slug: 'grammar-academy' },
    update: {},
    create: {
      slug: 'grammar-academy',
      nameEn: 'Grammar Academy',
      nameBn: 'গ্রামার একাডেমি',
      descriptionEn: 'Master English rules from parts of speech to complex sentence mastery.',
      descriptionBn: 'পার্টস অফ স্পিচ থেকে জটিল বাক্য গঠনের পূর্ণাঙ্গ ব্যাকরণ কোর্স।',
      icon: 'GraduationCap',
      order: 2,
    },
  });

  const catIELTS = await prisma.courseCategory.upsert({
    where: { slug: 'ielts-prep' },
    update: {},
    create: {
      slug: 'ielts-prep',
      nameEn: 'IELTS Preparation',
      nameBn: 'আইইএলটিএস প্রস্তুতি',
      descriptionEn: 'Strategies, practice tests, and scoring mastery for Academic and General.',
      descriptionBn: 'একাডেমিক এবং জেনারেল উভয় বিভাগের জন্য সর্বোচ্চ ব্যান্ড স্কোর অর্জনের কৌশল।',
      icon: 'Award',
      order: 3,
    },
  });

  const catProfessional = await prisma.courseCategory.upsert({
    where: { slug: 'professional-english' },
    update: {},
    create: {
      slug: 'professional-english',
      nameEn: 'Professional English',
      nameBn: 'পেশাদার ইংরেজি',
      descriptionEn: 'Workplace emails, job interview tactics, meetings, and business presentations.',
      descriptionBn: 'কর্মক্ষেত্রের ইমেইল, চাকরির ইন্টারভিউ, মিটিং এবং ব্যবসায়িক উপস্থাপনা।',
      icon: 'Briefcase',
      order: 4,
    },
  });

  // Sample Course: English Foundations
  const courseFoundations = await prisma.course.upsert({
    where: { slug: 'beginner-english-foundation' },
    update: {},
    create: {
      slug: 'beginner-english-foundation',
      categoryId: catGeneral.id,
      titleEn: 'English Foundations for Beginners',
      titleBn: 'নতুনদের জন্য ইংরেজি বুনিয়াদি কোর্স',
      descriptionEn: 'Learn sentence building, basic tenses, and everyday phrases with Bengali explanations.',
      descriptionBn: 'বাংলা ব্যাখ্যার মাধ্যমে বাক্য গঠন, প্রাথমিক কাল এবং নিত্যদিনের প্রয়োজনীয় বাক্য শিখুন।',
      level: LearningLevel.BEGINNER,
      durationHours: 12,
      isPremium: false,
      isPublished: true,
      order: 1,
    },
  });

  // Module & Lesson
  const mod1 = await prisma.courseModule.upsert({
    where: { id: 'mod-1-foundations' },
    update: {},
    create: {
      id: 'mod-1-foundations',
      courseId: courseFoundations.id,
      titleEn: 'Module 1: Everyday Greetings and Introductions',
      titleBn: 'মডিউল ১: দৈনন্দিন সম্ভাষণ ও আত্মপরিচয়',
      descriptionEn: 'Master the art of introducing yourself confidently.',
      descriptionBn: 'আত্মবিশ্বাসের সাথে নিজের পরিচয় দেওয়ার নিয়মাবলী শিখুন।',
      order: 1,
    },
  });

  const lesson1 = await prisma.lesson.upsert({
    where: { slug: 'self-introduction-mastery' },
    update: {},
    create: {
      slug: 'self-introduction-mastery',
      moduleId: mod1.id,
      titleEn: 'How to Introduce Yourself Confidently',
      titleBn: 'কীভাবে আত্মবিশ্বাসের সাথে নিজের পরিচয় দেবেন',
      descriptionEn: 'Step-by-step framework to speak about yourself in English.',
      descriptionBn: 'ইংরেজি ভাষায় নিজের সম্পর্কে বলার সহজ ও কার্যকরী ধাপসমূহ।',
      durationMinutes: 15,
      isPremium: false,
      isPublished: true,
      order: 1,
      contents: {
        create: [
          {
            type: 'TEXT',
            titleEn: 'Key Formula for Introductions',
            titleBn: 'পরিচয় দেওয়ার প্রধান ফর্মুলা',
            contentEn: '1. Greeting: "Hello, good morning/afternoon!"\n2. Name: "I am Tanvir" or "My name is Tanvir."\n3. Occupation: "I am a software engineer."\n4. Origin: "I am from Dhaka, Bangladesh."\n5. Closing: "Nice to meet you!"',
            contentBn: '১. শুভেচ্ছা বিনিময়: "Hello, good morning!"\n২. নাম: "My name is..." (কখনও "Myself Tanvir" বলবেন না, এটি ব্যাকরণগত ভুল)\n৩. পেশা: "I am a student / job seeker."\n৪. জন্মস্থান: "I am from Dhaka."\n৫. ইতি টানা: "Pleased to meet you!"',
            order: 1,
          },
        ],
      },
    },
  });

  // 6. Seed Grammar Academy
  console.log('Seeding Grammar Academy...');
  const gramCatTenses = await prisma.grammarCategory.upsert({
    where: { slug: 'tenses-academy' },
    update: {},
    create: {
      slug: 'tenses-academy',
      nameEn: 'Tenses Masterclass',
      nameBn: 'টেন্স বা কাল শিক্ষা',
      descriptionEn: 'Learn all 12 English tenses with deep Bangla grammatical clarity.',
      descriptionBn: 'সহজ বাংলা অর্থ ও উদাহরণের মাধ্যমে ইংরেজির ১২টি কাল আয়ত্ত করুন।',
      order: 1,
    },
  });

  const topicPresentSimple = await prisma.grammarTopic.upsert({
    where: { slug: 'present-simple-tense' },
    update: {},
    create: {
      slug: 'present-simple-tense',
      categoryId: gramCatTenses.id,
      titleEn: 'Present Simple Tense',
      titleBn: 'প্রেজেন্ট সিম্পল টেন্স (সাধারণ বর্তমান)',
      descriptionEn: 'Habits, daily routines, scientific facts, and general truths.',
      descriptionBn: 'অভ্যাস, প্রতিদিনের রুটিন, বৈজ্ঞানিক সত্য এবং সাধারণ সত্য বর্ণনা করতে।',
      level: LearningLevel.BEGINNER,
      order: 1,
    },
  });

  const grammarLesson1 = await prisma.grammarLesson.upsert({
    where: { slug: 'present-simple-rules' },
    update: {},
    create: {
      slug: 'present-simple-rules',
      topicId: topicPresentSimple.id,
      titleEn: 'Rules and Structures of Present Simple Tense',
      titleBn: 'প্রেজেন্ট সিম্পল টেন্সের নিয়ম এবং গঠনপ্রণালী',
      explanationEn: 'We use the Present Simple Tense to describe habits, routines, facts, and general truths. When the subject is third person singular (he, she, it, or singular noun), add -s or -es to the base verb.',
      explanationBn: 'বর্তমানকালে কোনো কাজ সাধারণত ঘটে, নিয়মিত অভ্যাস, চিরন্তন সত্য বা বৈজ্ঞানিক সত্য বোঝাতে Present Simple Tense ব্যবহার করা হয়। সাবজেক্ট Third Person Singular Number (he, she, it বা কোনো একক নাম) হলে মূল verb এর শেষে s বা es যোগ করতে হয়।',
      structureEn: 'Affirmative: Subject + Verb(s/es) + Object\nNegative: Subject + do/does + not + base Verb + Object\nInterrogative: Do/Does + Subject + base Verb + Object?',
      structureBn: 'হ্যাঁ-বোধক: Subject + Verb(s/es) + Object\nনা-বোধক: Subject + do/does not + Verb এর মূল রূপ + Object\nপ্রশ্নবোধক: Do/Does + Subject + Verb এর মূল রূপ + Object?',
      commonMistakesEn: 'Mistake: "He go to school." -> Correct: "He goes to school."\nMistake: "She does not likes apples." -> Correct: "She does not like apples."',
      commonMistakesBn: 'ভুল: "He go to office." -> সঠিক: "He goes to office." (Third person singular এ s/es আবশ্যক)\nভুল: "Does he plays cricket?" -> সঠিক: "Does he play cricket?" (Does ব্যবহার করলে verb-এ আর s/es বসে না)',
      isPremium: false,
      order: 1,
      examples: {
        create: [
          {
            type: ExampleType.POSITIVE,
            sentenceEn: 'I read newspaper every morning.',
            sentenceBn: 'আমি প্রতিদিন সকালে পত্রিকা পড়ি।',
            explanationEn: 'Expresses a routine action of the first person.',
            explanationBn: 'দৈনন্দিন অভ্যাস প্রকাশ করছে।',
            order: 1,
          },
          {
            type: ExampleType.POSITIVE,
            sentenceEn: 'The sun rises in the east.',
            sentenceBn: 'সূর্য পূর্ব দিকে উদিত হয়।',
            explanationEn: 'Universal scientific fact.',
            explanationBn: 'চিরন্তন সত্য ঘটনা।',
            order: 2,
          },
          {
            type: ExampleType.NEGATIVE,
            sentenceEn: 'He does not eat junk food.',
            sentenceBn: 'সে ফাস্ট ফুড খায় না।',
            explanationEn: 'Use "does not" + base verb for third person singular.',
            explanationBn: 'He এর পর does not এবং verb এর মূল রূপ বসে।',
            order: 3,
          },
          {
            type: ExampleType.QUESTION,
            sentenceEn: 'Do you study English every day?',
            sentenceBn: 'তুমি কি প্রতিদিন ইংরেজি চর্চা করো?',
            explanationEn: 'Questions start with "Do" for second person singular/plural.',
            explanationBn: 'সাধারণ প্রশ্নের জন্য Do দিয়ে শুরু করা হয়েছে।',
            order: 4,
          },
        ],
      },
      exercises: {
        create: [
          {
            type: PracticeType.MCQ,
            questionEn: 'She _____ English very fluently.',
            questionBn: 'তিনি খুব সাবলীলভাবে ইংরেজি _____।',
            options: ['speak', 'speaks', 'speaking', 'is speak'],
            correctAnswer: 'speaks',
            explanationEn: '"She" is a third person singular subject, so the verb takes "s" -> "speaks".',
            explanationBn: '"She" থার্ড পারসন সিঙ্গুলার হওয়ায় verb এর সাথে s যোগ হবে -> "speaks"।',
            order: 1,
          },
          {
            type: PracticeType.MCQ,
            questionEn: 'They _____ not live in this neighborhood anymore.',
            questionBn: 'তারা আর এই এলাকায় বাস করে না।',
            options: ['does', 'do', 'is', 'are'],
            correctAnswer: 'do',
            explanationEn: '"They" is third person plural, which uses auxiliary verb "do".',
            explanationBn: '"They" প্লুরাল সাবজেক্টের সাথে নেগেটিভে "do" বসে।',
            order: 2,
          },
        ],
      },
    },
  });

  // 7. Seed Vocabulary Builder
  console.log('Seeding Vocabulary Builder...');
  const catVocabIELTS = await prisma.vocabularyCategory.upsert({
    where: { slug: 'high-frequency-ielts' },
    update: {},
    create: {
      slug: 'high-frequency-ielts',
      nameEn: 'High-Frequency Academic IELTS Words',
      nameBn: 'আইইএলটিএস অতিপ্রয়োজনীয় শব্দভাণ্ডার',
      order: 1,
    },
  });

  const vocabWords = [
    {
      word: 'Resilient',
      phonetic: '/rɪˈzɪl.jənt/',
      partOfSpeech: 'Adjective',
      definitionEn: 'Able to withstand or recover quickly from difficult conditions.',
      meaningBn: 'সহনশীল, প্রতিকূল অবস্থা কাটিয়ে ওঠার ক্ষমতাসম্পন্ন।',
      exampleEn: 'The local economy proved surprisingly resilient despite international challenges.',
      exampleBn: 'আন্তর্জাতিক প্রতিকূলতা সত্ত্বেও স্থানীয় অর্থনীতি বিস্ময়করভাবে সহনশীল প্রমাণিত হয়েছিল।',
      synonyms: ['tough', 'adaptable', 'flexible', 'buoyant'],
      antonyms: ['fragile', 'vulnerable', 'weak'],
      difficultyLevel: LearningLevel.INTERMEDIATE,
      ieltsRelevance: true,
      categoryId: catVocabIELTS.id,
    },
    {
      word: 'Ubiquitous',
      phonetic: '/juːˈbɪk.wɪ.təs/',
      partOfSpeech: 'Adjective',
      definitionEn: 'Present, appearing, or found everywhere simultaneously.',
      meaningBn: 'সর্বব্যাপী, সর্বত্র বিদ্যমান।',
      exampleEn: 'Smartphones have become ubiquitous in modern urban societies.',
      exampleBn: 'আধুনিক শহুরে সমাজে স্মার্টফোন সর্বত্র বিদ্যমান বা সর্বব্যাপী হয়ে উঠেছে।',
      synonyms: ['omnipresent', 'pervasive', 'universal'],
      antonyms: ['rare', 'scarce', 'seldom'],
      difficultyLevel: LearningLevel.ADVANCED,
      ieltsRelevance: true,
      categoryId: catVocabIELTS.id,
    },
    {
      word: 'Pragmatic',
      phonetic: '/præɡˈmæt.ɪk/',
      partOfSpeech: 'Adjective',
      definitionEn: 'Dealing with things sensibly and realistically based on practical considerations.',
      meaningBn: 'বাস্তবধর্মী, বাস্তববাদী বা ফলপ্রসূ।',
      exampleEn: 'We need to adopt a pragmatic approach rather than relying solely on theoretical ideas.',
      exampleBn: 'শুধুমাত্র তাত্ত্বিক ধারণার ওপর নির্ভর না করে আমাদের একটি বাস্তবসম্মত পন্থা গ্রহণ করা উচিত।',
      synonyms: ['practical', 'realistic', 'sensible'],
      antonyms: ['idealistic', 'impractical'],
      difficultyLevel: LearningLevel.UPPER_INTERMEDIATE,
      ieltsRelevance: true,
      categoryId: catVocabIELTS.id,
    },
  ];

  for (const w of vocabWords) {
    const vocabRecord = await prisma.vocabulary.upsert({
      where: { word: w.word },
      update: {},
      create: w,
    });

    // Add to student vocabulary list
    await prisma.userVocabulary.upsert({
      where: { userId_vocabularyId: { userId: student.id, vocabularyId: vocabRecord.id } },
      update: {},
      create: {
        userId: student.id,
        vocabularyId: vocabRecord.id,
        status: VocabularyStatus.LEARNING,
        repetitions: 1,
        intervalDays: 2,
      },
    });
  }

  // 8. Seed IELTS Mock Test
  console.log('Seeding IELTS Mock Test Center...');
  const ieltsModReading = await prisma.iELTSModule.upsert({
    where: { id: 'ielts-mod-reading' },
    update: {},
    create: {
      id: 'ielts-mod-reading',
      moduleType: IELTSModuleType.READING,
      titleEn: 'Academic Reading Mastery',
      titleBn: 'একাডেমিক রিডিং মাস্টারক্লাস',
      descriptionEn: 'Skimming, scanning, True/False/Not Given, and Headings strategies.',
      descriptionBn: 'স্কিমিং, স্ক্যানিং, ট্রু/ফলস/নট গিভেন এবং হেডিংস মেলানোর কৌশল।',
      order: 1,
    },
  });

  const mockTest1 = await prisma.mockTest.upsert({
    where: { slug: 'cambridge-academic-mock-01' },
    update: {},
    create: {
      slug: 'cambridge-academic-mock-01',
      titleEn: 'ShikhoPath Cambridge Academic Mock Exam #01',
      titleBn: 'শিখোপথ কেমব্রিজ একাডেমিক মক পরীক্ষা ০১',
      type: MockTestType.FULL,
      testType: IELTSTestType.ACADEMIC,
      durationMinutes: 160,
      totalMarks: 9.0,
      isPremium: false,
      isPublished: true,
    },
  });

  // 9. Seed System Settings & Feature Flags
  console.log('Seeding system settings and feature flags...');
  const settings = [
    { key: 'site_name', value: 'ShikhoPath', description: 'Platform official brand name' },
    { key: 'platform_mode', value: 'production_ready', description: 'System operating mode' },
    { key: 'default_language', value: 'bn', description: 'Default fallback language' },
    { key: 'support_email', value: 'support@shikhopath.com', description: 'Platform support address' },
    { key: 'maintenance_mode', value: 'false', description: 'Maintenance banner and lock' },
  ];

  for (const s of settings) {
    await prisma.systemSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }

  const flags = [
    { key: 'enable_ai_tutor', isEnabled: true, description: 'Enable personal AI conversational tutor' },
    { key: 'enable_turnstile', isEnabled: false, description: 'Cloudflare Turnstile bot protection' },
    { key: 'enable_mock_tests', isEnabled: true, description: 'Enable computer-delivered mock test engine' },
  ];

  for (const f of flags) {
    await prisma.featureFlag.upsert({
      where: { key: f.key },
      update: { isEnabled: f.isEnabled },
      create: f,
    });
  }

  console.log('✅ ShikhoPath database seeding completed successfully!');
  console.log('----------------------------------------------------');
  console.log('Super Admin: superadmin@shikhopath.com / SuperAdmin@123');
  console.log('Admin:       admin@shikhopath.com / Admin@123');
  console.log('Student:     student@shikhopath.com / Student@123');
  console.log('----------------------------------------------------');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
