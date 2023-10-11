/**
 * Constantes utilisées dans le module Auth
 */
export const AuthConstantes = Object.freeze({
  REGEX_MOT_DE_PASSE: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  EMAIL_VALIDE: 'test@mail.fr',
  MOT_DE_PASSE_VALIDE: 'M0tD3P4553!',
  MSG_ERREUR_LOGIN: 'Identifiants invalides !',
});