import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Norwegian translations
const resourcesNO = {
  translation: {
    // Common
    'app.name': 'Opinion Chat',
    'app.loading': 'Laster...',
    'app.error': 'En feil har oppstått',
    'app.retry': 'Prøv igjen',
    'app.cancel': 'Avbryt',
    'app.save': 'Lagre',
    'app.delete': 'Slett',
    'app.edit': 'Rediger',
    'app.close': 'Lukk',
    'app.send': 'Send',
    'app.search': 'Søk',
    'app.back': 'Tilbake',
    'app.next': 'Neste',
    'app.previous': 'Forrige',
    
    // Authentication
    'auth.login': 'Logg inn',
    'auth.logout': 'Logg ut',
    'auth.register': 'Registrer deg',
    'auth.email': 'E-post',
    'auth.password': 'Passord',
    'auth.confirmPassword': 'Bekreft passord',
    'auth.firstName': 'Fornavn',
    'auth.lastName': 'Etternavn',
    'auth.role': 'Rolle',
    'auth.forgotPassword': 'Glemt passord?',
    'auth.noAccount': 'Har du ikke en konto?',
    'auth.hasAccount': 'Har du allerede en konto?',
    'auth.loginFailed': 'Pålogging mislyktes',
    'auth.registerFailed': 'Registrering mislyktes',
    'auth.passwordMismatch': 'Passordene samsvarer ikke',
    'auth.passwordTooShort': 'Passordet må være minst 8 tegn',
    'auth.unauthorized': 'Ikke autorisert',
    
    // User roles
    'role.admin': 'Administrator',
    'role.moderator': 'Moderator',
    'role.participant': 'Deltaker',
    'role.observer': 'Observatør',
    
    // Chat
    'chat.title': 'Chatter',
    'chat.new': 'Ny chat',
    'chat.join': 'Bli med i chat',
    'chat.leave': 'Forlat chat',
    'chat.participants': 'Deltakere',
    'chat.message': 'Melding',
    'chat.sendMessage': 'Send melding',
    'chat.typeMessage': 'Skriv en melding...',
    'chat.downloadLog': 'Last ned chat-logg',
    'chat.noMessages': 'Ingen meldinger ennå',
    'chat.noChats': 'Ingen chatter funnet',
    'chat.createChat': 'Opprett chat',
    'chat.chatName': 'Chat-navn',
    'chat.chatDescription': 'Beskrivelse (valgfritt)',
    
    // File upload
    'file.upload': 'Last opp fil',
    'file.select': 'Velg fil',
    'file.uploading': 'Laster opp...',
    'file.uploadFailed': 'Opplasting mislyktes',
    'file.fileSize': 'Filstørrelse',
    'file.fileType': 'Filtype',
    'file.download': 'Last ned',
    'file.preview': 'Forhåndsvisning',
    
    // Polls
    'poll.create': 'Opprett avstemning',
    'poll.question': 'Spørsmål',
    'poll.options': 'Alternativer',
    'poll.option': 'Alternativ',
    'poll.addOption': 'Legg til alternativ',
    'poll.removeOption': 'Fjern alternativ',
    'poll.vote': 'Stem',
    'poll.votes': 'Stemmer',
    'poll.results': 'Resultater',
    'poll.singleChoice': 'Enkeltvalg (kun ett alternativ)',
    'poll.multipleChoice': 'Flervalg (flere alternativer)',
    'poll.close': 'Avslutt avstemning',
    'poll.closed': 'Avstemning avsluttet',
    'poll.minOptions': 'En avstemning må ha minst to alternativer',
    'poll.emptyOptions': 'Alle alternativer må fylles ut',
    
    // Help
    'help.title': 'Hjelp',
    'help.getStarted': 'Kom i gang',
    'help.chat': 'Chat',
    'help.files': 'Filer',
    'help.polls': 'Avstemninger',
    'help.roles': 'Brukerroller',
    'help.contact': 'Kontakt support',
  }
};

// English translations
const resourcesEN = {
  translation: {
    // Common
    'app.name': 'Opinion Chat',
    'app.loading': 'Loading...',
    'app.error': 'An error occurred',
    'app.retry': 'Retry',
    'app.cancel': 'Cancel',
    'app.save': 'Save',
    'app.delete': 'Delete',
    'app.edit': 'Edit',
    'app.close': 'Close',
    'app.send': 'Send',
    'app.search': 'Search',
    'app.back': 'Back',
    'app.next': 'Next',
    'app.previous': 'Previous',
    
    // Authentication
    'auth.login': 'Log in',
    'auth.logout': 'Log out',
    'auth.register': 'Register',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm password',
    'auth.firstName': 'First name',
    'auth.lastName': 'Last name',
    'auth.role': 'Role',
    'auth.forgotPassword': 'Forgot password?',
    'auth.noAccount': 'Don\'t have an account?',
    'auth.hasAccount': 'Already have an account?',
    'auth.loginFailed': 'Login failed',
    'auth.registerFailed': 'Registration failed',
    'auth.passwordMismatch': 'Passwords do not match',
    'auth.passwordTooShort': 'Password must be at least 8 characters',
    'auth.unauthorized': 'Unauthorized',
    
    // User roles
    'role.admin': 'Administrator',
    'role.moderator': 'Moderator',
    'role.participant': 'Participant',
    'role.observer': 'Observer',
    
    // Chat
    'chat.title': 'Chats',
    'chat.new': 'New chat',
    'chat.join': 'Join chat',
    'chat.leave': 'Leave chat',
    'chat.participants': 'Participants',
    'chat.message': 'Message',
    'chat.sendMessage': 'Send message',
    'chat.typeMessage': 'Type a message...',
    'chat.downloadLog': 'Download chat log',
    'chat.noMessages': 'No messages yet',
    'chat.noChats': 'No chats found',
    'chat.createChat': 'Create chat',
    'chat.chatName': 'Chat name',
    'chat.chatDescription': 'Description (optional)',
    
    // File upload
    'file.upload': 'Upload file',
    'file.select': 'Select file',
    'file.uploading': 'Uploading...',
    'file.uploadFailed': 'Upload failed',
    'file.fileSize': 'File size',
    'file.fileType': 'File type',
    'file.download': 'Download',
    'file.preview': 'Preview',
    
    // Polls
    'poll.create': 'Create poll',
    'poll.question': 'Question',
    'poll.options': 'Options',
    'poll.option': 'Option',
    'poll.addOption': 'Add option',
    'poll.removeOption': 'Remove option',
    'poll.vote': 'Vote',
    'poll.votes': 'Votes',
    'poll.results': 'Results',
    'poll.singleChoice': 'Single choice (only one option)',
    'poll.multipleChoice': 'Multiple choice (several options)',
    'poll.close': 'Close poll',
    'poll.closed': 'Poll closed',
    'poll.minOptions': 'A poll must have at least two options',
    'poll.emptyOptions': 'All options must be filled out',
    
    // Help
    'help.title': 'Help',
    'help.getStarted': 'Get started',
    'help.chat': 'Chat',
    'help.files': 'Files',
    'help.polls': 'Polls',
    'help.roles': 'User roles',
    'help.contact': 'Contact support',
  }
};

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      no: resourcesNO,
      en: resourcesEN
    },
    lng: 'no', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;
