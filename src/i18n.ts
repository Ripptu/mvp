export type Language = 'en' | 'de' | 'fr';

export const translations = {
  en: {
    nav: {
      about: "About",
      services: "Services",
      bookNow: "Book Now"
    },
    hero: {
      close: "Close",
      hint: "Move pointer to undress"
    },
    vip: {
      navBtn: "VIP Login",
      title: "Members Only",
      subtitle: "Enter your credentials to access the private suite.",
      email: "Email Address",
      password: "Password",
      submit: "Enter",
      request: "Request Access"
    },
    intro: {
      titlePart1: "I AM ",
      titlePart2: "kylie",
      titlePart3: " AFFAIR",
      text: "As an independent companion based in Düsseldorf, I am delighted to meet you here or in other destinations across Europe and beyond. With a genuine love for travel, elegant hotels, and meaningful encounters, I am available for engagements worldwide — wherever sophistication and serenity meet.",
      btn: "Learn About Kylie"
    },
    about: {
      titlePart1: "STYLE & ",
      titlePart2: "presence",
      p1: "There's a quiet strength in elegance — a kind of presence that doesn't need to be announced. That's what defines me.",
      p2: "Style, to me, is a love language — not about trends, but about how something makes you feel. I have a weakness for beautiful things: soft fabrics, timeless accessories, little treasures with a story.",
      p3: "I'm drawn to subtle fragrances, warm light, genuine people and places that feel alive. As a companion, I value authenticity and freedom — encounters that are sincere, kind and a little spontaneous."
    },
    services: {
      titlePart1: "INDEPENDENT ",
      titlePart2: "by nature",
      accordion: [
        { title: "Meet me in Düsseldorf", content: "As my home base, I am regularly available for enchanting encounters in Düsseldorf and the surrounding region. Experience genuine connection and refined company." },
        { title: "Drive Me To You", content: "I can comfortably visit you in nearby metropolitan areas within driving distance, bringing sophistication straight to your hotel or private residence." },
        { title: "Fly Me To You", content: "With a passion for discovering the world, I am available as an elite travel companion for international engagements across Europe and the globe." }
      ]
    },
    destinations: {
      titlePart1: "CITY ",
      titlePart2: "guides",
      cities: [
        { title: "Berlin", date: "Available" },
        { title: "Frankfurt", date: "April 2026" },
        { title: "Munich", date: "May 2026" }
      ]
    },
    contact: {
      titlePart1: "TAKE THE ",
      titlePart2: "next step",
      text: "Ready to turn desire into something unforgettable? Discretion, connection, and authenticity — that's what defines Kylie Affair. Your privacy and satisfaction are my highest priority.",
      labels: {
        name: "Name or Alias",
        email: "Email Address",
        message: "Message & Dates",
        submit: "Book Now"
      },
      placeholders: {
        name: "Mr. Smith",
        email: "contact@secure.com",
        message: "Details of your request..."
      }
    },
    footer: {
      impressum: "Impressum",
      privacy: "Datenschutz",
      faq: "FAQs",
      rights: "All rights reserved."
    },
    faqPage: {
      title: "F.A.Q.",
      questions: [
        { q: "What is the booking process?", a: "After your initial inquiry, we will discretely discuss your desires. For new clients, I ask for a brief introduction. Afterwards, we confirm date, location, and formalities." },
        { q: "Is discretion guaranteed?", a: "Absolutely. Confidentiality and respect for your privacy are the foundation of my service. No data is stored or passed on to third parties." },
        { q: "Do you also accompany on travels?", a: "Yes, international travels and weekend trips are possible by arrangement and are one of my specialties. Flight and hotel arrangements will be discussed individually." },
        { q: "Do you accept card payments?", a: "The conditions and payment methods will be clarified personally in advance to ensure absolute discretion and comfort." }
      ]
    },
    impressumPage: {
      title: "Impressum",
      h1: "Information according to § 5 TMG",
      p1: "Kylie Affair Management\nc/o Musteradresse 123\n10115 Berlin, Germany",
      h2: "Contact",
      p2: "E-Mail: contact@kylie-affair.com\nPhone: On Request",
      disclaimer: "Responsible for content according to § 55 Abs. 2 RStV: Kylie Affair."
    },
    privacyPage: {
      title: "Datenschutz",
      sections: [
        { h: "1. Fundamental Discretion", p: "Discretion is not just a word, but the basis of this service. No unnecessary data is collected or stored. All communication is treated confidentially and destroyed physically and digitally after completion of the assignment, unless otherwise requested." },
        { h: "2. Data Collection on the Website", p: "When simply visiting this website, server log files (such as IP address, browser, time) are temporarily recorded. This serves exclusively for the secure operation of the site and is based on Art. 6 Para. 1 lit. f GDPR." },
        { h: "3. Contact Form & Emails", p: "When you contact me, the data you transmit (e.g. email, name/alias) is encrypted and used only for the purpose of processing the inquiry. A transfer to third parties will not take place under any circumstances." }
      ]
    }
  },
  de: {
    nav: {
      about: "Über mich",
      services: "Services",
      bookNow: "Anfragen"
    },
    hero: {
      close: "Schließen",
      hint: "Bewegen zum Entkleiden"
    },
    vip: {
      navBtn: "VIP Login",
      title: "Private Lounge",
      subtitle: "Bitte logge dich ein, um den internen Bereich zu betreten.",
      email: "E-Mail Adresse",
      password: "Passwort",
      submit: "Eintreten",
      request: "Zugang anfragen"
    },
    intro: {
      titlePart1: "ICH BIN ",
      titlePart2: "kylie",
      titlePart3: " AFFAIR",
      text: "Als unabhängige Escort-Begleitung in Düsseldorf freue ich mich, dich hier oder an anderen Zielen europaweit zu treffen. Mit einer echten Leidenschaft für Reisen, erstklassige Hotels und tiefgründige Begegnungen stehe ich für internationale Arrangements zur Verfügung – überall dort, wo Eleganz und Unbeschwertheit aufeinandertreffen.",
      btn: "Mehr über Kylie"
    },
    about: {
      titlePart1: "STIL & ",
      titlePart2: "Präsenz",
      p1: "In wahrer Eleganz liegt eine ruhige Kraft — eine Präsenz, die sich nicht ankündigen muss. Genau das zeichnet mich aus.",
      p2: "Stil ist für mich eine Sprache der Liebe. Es geht nicht um Trends, sondern darum, wie sich etwas anfühlt. Ich habe eine Schwäche für schöne Dinge: weiche Stoffe, zeitlose Accessoires und kleine Schätze mit Geschichte.",
      p3: "Mich ziehen dezente Düfte, warmes Licht und Orte an, die sich lebendig anfühlen. Als Begleitung schätze ich Authentizität und Freiheit – Begegnungen, die aufrichtig, herzlich und ein wenig spontan sind."
    },
    services: {
      titlePart1: "UNABHÄNGIG ",
      titlePart2: "aus Natur",
      accordion: [
        { title: "Triff mich in Düsseldorf", content: "Als meine Homebase stehe ich in Düsseldorf und der umliegenden Region regelmäßig für bezaubernde Begegnungen zur Verfügung. Erlebe echte Nähe in stilvoller Gesellschaft." },
        { title: "Fahr mich zu dir", content: "Gerne besuche ich dich bequem in nahen Metropolregionen. Ich bringe Diskretion und Klasse direkt in dein Hotel oder deine private Residenz." },
        { title: "Flieg mich zu dir", content: "Mit meiner Leidenschaft für das Entdecken der Welt stehe ich dir als exzellente Reisebegleitung für internationale Treffen quer durch Europa und weltweit zur Seite." }
      ]
    },
    destinations: {
      titlePart1: "CITY ",
      titlePart2: "Guides",
      cities: [
        { title: "Berlin", date: "Verfügbar" },
        { title: "Frankfurt", date: "April 2026" },
        { title: "München", date: "Mai 2026" }
      ]
    },
    contact: {
      titlePart1: "MACHE DEN ",
      titlePart2: "nächsten Schritt",
      text: "Bereit, Sehnsüchte in unvergessliche Momente zu verwandeln? Diskretion, Verbundenheit und Authentizität – dafür steht Kylie Affair. Deine Privatsphäre hat oberste Priorität.",
      labels: {
        name: "Name oder Alias",
        email: "E-Mail Adresse",
        message: "Nachricht & Daten",
        submit: "Anfrage senden"
      },
      placeholders: {
        name: "Mr. Smith",
        email: "kontakt@sicher.com",
        message: "Details zu deiner Anfrage..."
      }
    },
    footer: {
      impressum: "Impressum",
      privacy: "Datenschutz",
      faq: "FAQs",
      rights: "Alle Rechte vorbehalten."
    },
    faqPage: {
      title: "F.A.Q.",
      questions: [
        { q: "Was ist der Buchungsablauf?", a: "Nach deiner ersten Kontaktaufnahme besprechen wir diskret deine Wünsche. Bei Neu-Kunden bitte ich um eine kurze Vorstellung. Anschließend bestätigen wir Datum, Location und Formalitäten." },
        { q: "Ist Diskretion garantiert?", a: "Absolut. Verschwiegenheit und Respekt für deine Privatsphäre sind das Fundament meines Services. Keine Daten werden gespeichert oder an Dritte weitergegeben." },
        { q: "Begleitest du auch auf Reisen?", a: "Ja, internationale Reisen und Wochenendtrips sind nach Absprache möglich und eine meiner Spezialitäten. Flug- und Hotelarrangements werden individuell besprochen." },
        { q: "Akzeptierst du Kartenzahlung?", a: "Die Konditionen und Zahlungsmethoden klären wir persönlich im Vorfeld ab, um absolute Diskretion und Komfort zu gewährleisten." }
      ]
    },
    impressumPage: {
      title: "Impressum",
      h1: "Angaben gemäß § 5 TMG",
      p1: "Kylie Affair Management\nc/o Musteradresse 123\n10115 Berlin, Deutschland",
      h2: "Kontakt",
      p2: "E-Mail: contact@kylie-affair.com\nTelefon: Auf Anfrage",
      disclaimer: "Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV: Kylie Affair."
    },
    privacyPage: {
      title: "Datenschutz",
      sections: [
        { h: "1. Grundlegende Diskretion", p: "Diskretion ist nicht nur ein Wort, sondern die Basis dieser Dienstleistung. Es werden keine unnötigen Daten erhoben oder gespeichert. Jegliche Kommunikation wird vertraulich behandelt und nach Auftragsabschluss physisch sowie digital vernichtet, sofern nicht anders gewünscht." },
        { h: "2. Datenerfassung auf der Website", p: "Beim reinen Besuch dieser Website werden temporär Server-Log-Files (wie IP-Adresse, Browser, Zeitpunkt) erfasst. Dies dient ausschließlich dem sicheren Betrieb der Seite und basiert auf Art. 6 Abs. 1 lit. f DSGVO." },
        { h: "3. Kontaktformular & Mails", p: "Wenn Sie mich kontaktieren, werden die von Ihnen übermittelten Daten (z.B. E-Mail, Name/Alias) verschlüsselt übertragen und nur zum Zweck der Anfragebearbeitung genutzt. Eine Weitergabe an Dritte findet unter keinen Umständen statt." }
      ]
    }
  },
  fr: {
    nav: {
      about: "À propos",
      services: "Services",
      bookNow: "Réserver"
    },
    hero: {
      close: "Fermer",
      hint: "Déplacez pour dévêtir"
    },
    vip: {
      navBtn: "Accès VIP",
      title: "Cercle Privé",
      subtitle: "Entrez vos identifiants pour accéder à la suite privée.",
      email: "Adresse e-mail",
      password: "Mot de passe",
      submit: "Entrer",
      request: "Demander l'accès"
    },
    intro: {
      titlePart1: "JE SUIS ",
      titlePart2: "kylie",
      titlePart3: " AFFAIR",
      text: "En tant que compagne indépendante basée à Düsseldorf, je suis ravie de vous rencontrer ici ou dans d'autres destinations à travers l'Europe. Avec une véritable passion pour les voyages, les hôtels élégants et les belles rencontres, je suis disponible pour des séjours internationaux – là où l'élégance croise la sérénité.",
      btn: "Découvrir Kylie"
    },
    about: {
      titlePart1: "STYLE & ",
      titlePart2: "présence",
      p1: "Il y a une force tranquille dans l'élégance — le genre de présence qui ne s'annonce pas. C'est ce qui me définit.",
      p2: "Le style est, pour moi, un langage d'amour. Ce n'est pas une question de mode, mais de sensation. J'ai un faible pour les belles choses: tissus doux, accessoires intemporels, petits trésors avec une histoire.",
      p3: "Je suis attirée par les parfums subtils, la lumière chaude et les lieux vivants. En tant que compagne, j'apprécie l'authenticité et la liberté — des rencontres sincères, bienveillantes et un brin spontanées."
    },
    services: {
      titlePart1: "INDÉPENDANTE ",
      titlePart2: "par nature",
      accordion: [
        { title: "Rencontrez-moi à Düsseldorf", content: "Ma ville d'attache, où je suis régulièrement disponible pour des rencontres enchanteresses à Düsseldorf et dans sa région. Vivez une réelle intimité." },
        { title: "Je viens à vous", content: "Je vous rends volontiers visite dans les métropoles environnantes, apportant classe et discrétion directement à votre hôtel ou résidence." },
        { title: "Volez avec moi", content: "Passionnée par la découverte du monde, je me tiens à votre disposition pour des voyages internationaux exclusifs à travers l'Europe et le monde." }
      ]
    },
    destinations: {
      titlePart1: "GUIDES ",
      titlePart2: "de la ville",
      cities: [
        { title: "Berlin", date: "Disponible" },
        { title: "Francfort", date: "Avril 2026" },
        { title: "Munich", date: "Mai 2026" }
      ]
    },
    contact: {
      titlePart1: "FAITES LE ",
      titlePart2: "prochain pas",
      text: "Prêt à transformer le désir en quelque chose d'inoubliable ? Discrétion, connexion et authenticité – voilà ce qui définit Kylie Affair. Votre vie privée est absolue.",
      labels: {
        name: "Nom ou Alias",
        email: "Adresse e-mail",
        message: "Message & Dates",
        submit: "Réserver"
      },
      placeholders: {
        name: "M. Smith",
        email: "contact@secure.com",
        message: "Détails de votre demande..."
      }
    },
    footer: {
      impressum: "Mentions légales",
      privacy: "Confidentialité",
      faq: "Questions",
      rights: "Tous droits réservés."
    },
    faqPage: {
      title: "F.A.Q.",
      questions: [
        { q: "Quel est le processus de réservation ?", a: "Après votre première prise de contact, nous discutons très discrètement de vos envies. Nous validons ensuite date, lieu et paiement." },
        { q: "La discrétion est-elle garantie ?", a: "Absolument. La confidentialité et le respect de votre vie privée sont le fondement même de mes services." },
        { q: "M'accompagnez-vous en voyage ?", a: "Oui, les voyages internationaux sont tout à fait possibles et figurent parmi mes spécialités." },
        { q: "Acceptez-vous les paiements par carte ?", a: "Les conditions de paiement sont définies individuellement lors de nos échanges pour garantir votre anonymat." }
      ]
    },
    impressumPage: {
      title: "Mentions légales",
      h1: "Informations selon § 5 TMG",
      p1: "Kylie Affair Management\nc/o Musteradresse 123\n10115 Berlin, Allemagne",
      h2: "Contact",
      p2: "E-Mail: contact@kylie-affair.com\nTéléphone: Sur demande",
      disclaimer: "Responsable du contenu selon § 55 Abs. 2 RStV: Kylie Affair."
    },
    privacyPage: {
      title: "Confidentialité",
      sections: [
        { h: "1. Discrétion fondamentale", p: "La discrétion est la base de ce service. Aucune donnée non nécessaire n'est collectée ou conservée." },
        { h: "2. Collecte de données sur le site web", p: "Les visites techniques sont anonymisées et ne servent qu'au fonctionnement de la plateforme." },
        { h: "3. Formulaire de contact & Mails", p: "Les messages envoyés sont cryptés et les informations ne seront jamais communiquées à des tiers." }
      ]
    }
  }
};
