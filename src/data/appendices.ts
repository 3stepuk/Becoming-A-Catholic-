export interface Appendix {
  id: string;
  letter: string;
  title: string;
  subtitle?: string;
  summary: string;
  content: {
    lead?: string;
    callouts?: { title: string; text: string; type?: 'info' | 'warning' | 'quote' }[];
    table?: { headers: string[]; rows: [string, string][] };
    sections?: { heading: string; body: string | string[] }[];
    points?: string[];
  };
}

export const APPENDICES: Appendix[] = [
  {
    id: 'app-a',
    letter: 'A',
    title: 'First Pastoral Check',
    subtitle: 'The route before the route',
    summary: 'Do this early, before anyone begins planning an Easter date.',
    content: {
      lead: 'Do this early, before anyone begins planning an Easter date.',
      callouts: [
        {
          title: 'FIRST QUESTION',
          text: 'Have you ever been baptised with water in the name of the Father, and of the Son, and of the Holy Spirit?\n\nIf the answer may be yes, the priest must investigate before treating you as unbaptised. A valid Baptism is never repeated. If you are already validly baptised, the correct route is Reception into Full Communion or another appropriate pathway.',
          type: 'quote',
        },
        {
          title: 'DO NOT SET A BAPTISM DATE TOO EARLY',
          text: 'The catechumenate is readiness-based. The Easter Vigil is the normal time for initiation, but no one should be rushed to fit a calendar. The period of catechumenate can be extended when faith, conversion, canonical matters or pastoral circumstances require it.',
          type: 'warning',
        },
      ],
      table: {
        headers: ['Area', 'What to establish'],
        rows: [
          ['Baptism status', 'Never baptised / unsure / evidence of a possible prior Baptism. Record places, dates, denomination and witnesses if known.'],
          ['Age', "If aged 14 or over, the parish follows diocesan arrangements concerning the bishop's role in adult initiation."],
          ['Marriage history', 'Current marriage, previous marriages, civil marriages or unions of either party must be disclosed early. Do not assume Baptism automatically resolves a prior bond.'],
          ['Previous Christian formation', 'What has the person already learned or practised? Do not teach as though every inquirer begins from the same place.'],
          ['Freedom and motive', 'Is the person freely seeking Christ, or mainly responding to pressure from a spouse, family or wedding plan?'],
          ['Life situation', 'Work, caring responsibilities, disability, language, literacy, neurodiversity, health and transport may require adaptation.'],
          ['Safeguarding', 'Use appropriate parish safeguarding arrangements. Private spiritual matters are not for group disclosure.'],
          ['Sponsor', 'Identify a suitable person to accompany the inquirer and later, if appropriate, serve as godparent.'],
        ],
      },
    },
  },
  {
    id: 'app-b',
    letter: 'B',
    title: 'The Major Rites',
    subtitle: 'Acceptance, Election, Scrutinies and the Easter Vigil',
    summary: 'The approved liturgical book controls the wording and celebration. This is only a map.',
    content: {
      lead: 'The approved liturgical book controls the wording and celebration. This is only a map.',
      sections: [
        {
          heading: '1. Rite of Acceptance into the Order of Catechumens',
          body: 'After the beginnings of faith and conversion, the inquirers publicly express their intention to follow Christ. The Church accepts them, signs them with the Cross, welcomes them to hear the Word of God and enrols them among the catechumens. Their names are recorded as required.',
        },
        {
          heading: '2. Celebrations during the Catechumenate',
          body: 'The rite provides celebrations of the Word, blessings, minor exorcisms and other rites. These are prayers of the Church, not theatrical extras. They help the catechumen grow in faith, freedom and conversion.',
        },
        {
          heading: '3. Rite of Election or Enrolment of Names',
          body: 'Normally on the First Sunday of Lent, after testimony and discernment, the Church calls catechumens judged ready for the final preparation. In Nottingham this is celebrated diocesanly at the Cathedral. From this rite they are called the elect.',
        },
        {
          heading: '4. Scrutinies',
          body: "On the Third, Fourth and Fifth Sundays of Lent, the scrutinies ordinarily pray for the elect's purification, deliverance from sin and strengthening in Christ. They are not public examinations and do not ask the elect to reveal private sins.",
        },
        {
          heading: "5. Presentations and Holy Saturday preparation",
          body: "The Creed and Lord's Prayer are entrusted to the elect according to the rite. Other preparation rites may take place on Holy Saturday.",
        },
        {
          heading: '6. Sacraments of Initiation',
          body: 'Normally at the Easter Vigil, the elect profess the faith, are baptised, then confirmed and receive the Eucharist. Christian initiation is one sacramental whole.',
        },
        {
          heading: '7. Mystagogy',
          body: 'During the Easter season, the neophytes deepen their understanding through lived experience of the sacraments, Scripture, community, charity and mission.',
        },
      ],
      callouts: [
        {
          title: 'AT SUNDAY MASS',
          text: 'Catechumens participate in the Liturgy of the Word. Where the parish celebrates the dismissal provided by the rite, they are sent to continue reflecting on the Word with the Church\'s prayer; they are not "sent away" because they are unwelcome.',
          type: 'info',
        },
      ],
    },
  },
  {
    id: 'app-c',
    letter: 'C',
    title: 'Sponsor and Godparent',
    subtitle: 'A real Christian companion, not simply a ceremonial name',
    summary: 'A sponsor accompanies the inquirer and catechumen, knows the person sufficiently to witness to growth in faith and intention, and helps them become part of Catholic life.',
    content: {
      lead: 'A sponsor accompanies the inquirer and catechumen, knows the person sufficiently to witness to growth in faith and intention, and helps them become part of Catholic life. The sponsor at Acceptance and the godparent at Election and initiation may be the same person, but the rite allows another suitable person to take the later role.',
      callouts: [
        {
          title: 'GOOD SPONSOR',
          text: 'Choose someone whose Catholic life you would be happy to imitate in ten years, not merely the person who would be most flattered to be asked.',
          type: 'quote',
        },
      ],
      table: {
        headers: ['What matters', 'In practice'],
        rows: [
          ['Chosen and willing', 'The person is genuinely chosen for the role and intends to fulfil it.'],
          ['Catholic life', 'A Catholic who is confirmed, has received the Eucharist and lives a life of faith in keeping with the role.'],
          ['Age', 'Ordinarily at least sixteen, unless lawful provision or a just exception applies.'],
          ['Canonical freedom', 'Not bound by a canonical penalty legitimately imposed or declared.'],
          ['Relationship', 'A godparent may not be the father or mother of the person being baptised. Other family relationships are handled according to the law, the rite and pastoral judgement.'],
          ['Practical accompaniment', 'Prays, attends rites, introduces parish life, discusses the conversations, models Sunday worship and remains present after Baptism.'],
        ],
      },
    },
  },
  {
    id: 'app-d',
    letter: 'D',
    title: 'Things to Know Clearly',
    subtitle: 'Forty concise answers',
    summary: 'These are not an examination. A catechumen should increasingly understand these truths and be able to explain them in ordinary words.',
    content: {
      lead: 'These are not an examination. A catechumen should increasingly understand these truths and be able to explain them in ordinary words.',
      sections: [
        {
          heading: 'Interactive Flashcard and Quick-Reference System',
          body: 'All 40 questions and concise answers are available in the interactive Drills and Q&A modules of this companion. Catechumens and sponsors are encouraged to practice these regular recall points alongside Sunday catechesis.',
        },
      ],
    },
  },
  {
    id: 'app-e',
    letter: 'E',
    title: 'Readiness Discernment',
    subtitle: 'Acceptance, Election and Initiation',
    summary: 'Readiness is not perfect memory, social confidence or a fixed number of weeks.',
    content: {
      lead: 'Readiness is not perfect memory, social confidence or a fixed number of weeks.',
      sections: [
        {
          heading: 'Before Acceptance into the Catechumenate',
          body: [
            '• Has heard the first proclamation of Jesus Christ and shows an initial faith or desire for faith.',
            '• Freely intends to continue exploring the Christian life and shows the beginnings of conversion.',
            '• Has some experience of prayer and contact with the Christian community.',
            '• Understands that Acceptance begins a real catechumenal commitment but does not guarantee a fixed Baptism date.',
          ],
        },
        {
          heading: 'Before Election',
          body: [
            '• Has a developed intention to receive Baptism, Confirmation and the Eucharist.',
            '• Has sufficient knowledge of Christian teaching according to capacity, not merely memorised vocabulary.',
            '• Has grown in prayer, Sunday worship, charity and participation in parish life.',
            '• Shows genuine conversion: a willingness to turn from grave sin and live according to the Gospel.',
            '• Has resolved major canonical or pastoral questions sufficiently for initiation to proceed.',
            "• Godparent, catechists and parish can give honest testimony to the person's readiness.",
          ],
        },
        {
          heading: 'Before the Sacraments of Initiation',
          body: [
            '• Professes the Catholic faith sincerely and freely.',
            '• Understands the sacramental meaning of Baptism, Confirmation and Eucharist.',
            '• Has celebrated the Lenten rites and entered a serious period of prayer and conversion.',
            '• Has a sincere sorrow for sin and intention to live a Christian life.',
            '• Knows the practical shape of the Easter Vigil without being expected to memorise every response.',
            '• Is not being rushed merely because Easter has arrived.',
          ],
        },
      ],
      callouts: [
        {
          title: 'PASTORAL PRINCIPLE',
          text: "Difficulty, disability, limited English, anxiety or a need for more time calls for adaptation, not humiliation. Readiness is judged according to the person's capacity and genuine response to grace.",
          type: 'info',
        },
        {
          title: 'DO NOT',
          text: 'Do not demand disclosure of private sins to catechists or groups, use public interrogation, shame an inquirer for questions, or treat attendance sheets as proof of conversion.',
          type: 'warning',
        },
      ],
    },
  },
  {
    id: 'app-f',
    letter: 'F',
    title: 'A Simple Rule of Christian Life',
    subtitle: 'Start before Baptism. Continue after it.',
    summary: 'Keep the rule small enough to be faithful.',
    content: {
      lead: 'Start before Baptism. Continue after it. Keep the rule small enough to be faithful.',
      callouts: [
        {
          title: 'A GOOD RULE IS BORING ENOUGH TO LAST',
          text: 'Ordinary faithfulness - Sunday Mass, short daily prayer, Scripture, charity, friendship and regular Confession after Baptism - forms a stronger disciple than occasional bursts of religious intensity.',
          type: 'quote',
        },
      ],
      table: {
        headers: ['Rhythm', 'Simple practice'],
        rows: [
          ['Daily', 'Make the Sign of the Cross; pray the Our Father; read a short passage of Scripture; ask for grace to live the Gospel.'],
          ['Morning and night', 'Offer the day to God; at night give thanks, review the day peacefully and ask mercy for failures.'],
          ['Sunday', 'Attend Mass faithfully. Before initiation, participate without receiving Communion; after initiation, receive worthily when properly disposed.'],
          ['Weekly', 'Do one deliberate work of mercy or service; speak to another Catholic rather than trying to learn the faith entirely alone.'],
          ['Regularly after Baptism', 'Receive the Sacrament of Penance; learn a realistic rhythm rather than waiting until fear or crisis.'],
          ['At home', 'Keep a crucifix or holy image visible; learn the Creed; use the Bible; let faith become part of ordinary decisions and relationships.'],
          ['With the parish', 'Build real relationships, join one suitable form of service or formation, and learn whom to ask when you need help.'],
          ['When things go wrong', 'Begin again. Return to prayer, Mass and Confession rather than letting a difficult week become permanent distance.'],
        ],
      },
    },
  },
  {
    id: 'app-g',
    letter: 'G',
    title: 'Special Cases and Danger of Death',
    subtitle: 'Do not force every person through the same route',
    summary: 'Canonical and pastoral guidance for varied circumstances and emergency baptism.',
    content: {
      lead: 'Do not force every person through the same route.',
      sections: [
        {
          heading: 'Already baptised',
          body: 'Use Reception into Full Communion or another appropriate pathway. Do not treat a validly baptised Christian as a catechumen awaiting Baptism.',
        },
        {
          heading: 'Child of catechetical age',
          body: 'The RCIA contains a distinct form adapted for children who have reached catechetical age. Do not simply hand an adult book to a child.',
        },
        {
          heading: 'Uncatechised baptised Catholic',
          body: 'This is not the unbaptised catechumenate. Preparation for Confirmation and Eucharist is adapted to the person\'s baptismal status.',
        },
        {
          heading: 'Marriage or prior bond',
          body: 'Tell the priest early. Natural and sacramental marriage bonds require proper canonical discernment. Do not promise that Baptism by itself solves a marriage case.',
        },
        {
          heading: 'Disability or learning need',
          body: 'Adapt pace, language, format and response expectations while preserving the substance of faith and sacramental readiness.',
        },
        {
          heading: 'Danger of death',
          body: 'Contact a priest immediately. The Church provides an abbreviated initiation for a person in danger of death. Canon law allows adult Baptism in danger of death with a basic knowledge of principal truths, manifested intention to receive Baptism and a promise to observe the Christian religion. The priest determines what can be celebrated.',
        },
        {
          heading: 'Death of a catechumen',
          body: 'If a catechumen dies before Baptism, contact the parish. The Church treats catechumens as Christian faithful for the purposes of ecclesiastical funerals and commends them confidently to God\'s mercy.',
        },
        {
          heading: 'Uncertainty about prior Baptism',
          body: "Do not simply baptise again. The priest investigates the facts and, if necessary, follows the Church's norms concerning doubtful Baptism.",
        },
      ],
      callouts: [
        {
          title: 'EMERGENCY',
          text: 'If an unbaptised person is in immediate danger of death and no priest or deacon can be reached, any person can baptise validly with true water, the proper Trinitarian formula and the intention to do what the Church does. Contact the parish afterwards so the Baptism can be recorded and the remaining rites supplied as appropriate.',
          type: 'warning',
        },
      ],
    },
  },
  {
    id: 'app-h',
    letter: 'H',
    title: 'Sources and Parish Authority',
    subtitle: 'Teaching spine and canonical foundations',
    summary: 'This booklet is a parish catechetical companion. It does not replace the approved liturgical books, diocesan directions, canon law, the Catechism of the Catholic Church or the pastoral judgement of the bishop and parish priest.',
    content: {
      lead: 'This booklet is a parish catechetical companion. It does not replace the approved liturgical books, diocesan directions, canon law, the Catechism of the Catholic Church or the pastoral judgement of the bishop and parish priest.',
      sections: [
        {
          heading: 'Primary sources',
          body: [
            '• Sacred Scripture, with the Sunday Lectionary and the biblical texts indicated throughout this book.',
            '• Catechism of the Catholic Church, especially 1-1065 (the profession of faith), 1066-1690 (liturgy and sacraments), 1691-2557 (life in Christ and prayer), and especially 1213-1284 on Baptism.',
            '• Rite of Christian Initiation of Adults, approved for use in England and Wales, including its General Introduction and Introductory Material.',
            '• Code of Canon Law, especially canons 206; 788-789; 849-878, particularly 851, 864-866 and 872-874; and the norms governing the other sacraments and marriage where applicable.',
            '• Current directions of the Diocese of Nottingham, including the diocesan Rite of Election and arrangements made by the bishop for adult initiation.',
            '• Parish safeguarding policy and current diocesan safeguarding requirements.',
            '• Deharbe, A Full Catechism of the Catholic Religion, used only as a traditional catechetical reference for concise question-and-answer structure; current magisterial, liturgical and canonical sources govern doctrine and discipline.',
          ],
        },
        {
          heading: 'Authority order for practical use',
          body: [
            '1. The approved liturgical books and universal law of the Church.',
            '2. Current diocesan norms and directions of the bishop.',
            '3. The pastoral judgement of the parish priest.',
            '4. This catechumenate companion as the ordinary parish teaching spine.',
          ],
        },
      ],
      callouts: [
        {
          title: 'FINAL PRINCIPLE',
          text: 'The goal is not to manufacture a person who can pass a Catholic quiz. The goal is a disciple who freely believes in Jesus Christ, turns from sin, desires Baptism, is sufficiently formed in the faith and Christian life, and is ready to enter the sacramental and missionary life of the Church.',
          type: 'quote',
        },
      ],
    },
  },
];
